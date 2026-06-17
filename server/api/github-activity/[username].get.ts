import type { GithubActivityData } from '~~/shared/github'
import { consola } from 'consola'
import { createError, defineEventHandler, getRouterParam } from 'h3'
import { githubCommitResponseSchema, githubEventsResponseSchema } from '../../utils/github'
import { getCachedWithSWR } from '../../utils/swr-cache'

const GITHUB_API_BASE = 'https://api.github.com'
const ACTIVITY_FRESH_TTL_MS = 1000 * 60 * 15
const ACTIVITY_STALE_TTL_MS = 1000 * 60 * 15

interface CachedGithubActivity {
  lastCommitAt: null | string
}

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

function formatRelativeTime(value: string) {
  const now = Date.now()
  const then = new Date(value).getTime()

  if (Number.isNaN(then))
    return null

  const diffMs = now - then
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMinutes < 1)
    return 'just now'
  if (diffMinutes < 60)
    return relativeTimeFormatter.format(-diffMinutes, 'minute')
  if (diffHours < 24)
    return relativeTimeFormatter.format(-diffHours, 'hour')
  if (diffDays < 7)
    return relativeTimeFormatter.format(-diffDays, 'day')

  const diffWeeks = Math.floor(diffDays / 7)
  if (diffWeeks < 5)
    return relativeTimeFormatter.format(-diffWeeks, 'week')

  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 12)
    return relativeTimeFormatter.format(-diffMonths, 'month')

  const diffYears = Math.floor(diffDays / 365)
  return relativeTimeFormatter.format(-diffYears, 'year')
}

export default defineEventHandler(async (event): Promise<GithubActivityData> => {
  const username = getRouterParam(event, 'username')?.trim()

  if (!username)
    throw createError({ statusCode: 400, statusMessage: 'GitHub username is required.' })

  try {
    const cachedActivity = await getCachedWithSWR<CachedGithubActivity>({
      key: `github:activity:${username}`,
      freshTtlMs: ACTIVITY_FRESH_TTL_MS,
      staleTtlMs: ACTIVITY_STALE_TTL_MS,
      debugScope: 'github-activity',
      fetcher: async () => {
        const eventsUrl = `${GITHUB_API_BASE}/users/${username}/events/public?per_page=20`
        const requestHeaders = {
          'User-Agent': 'portfolio-app',
        }

        consola.info('[github-activity] upstream:request:events', {
          headers: requestHeaders,
          url: eventsUrl,
        })

        const eventsResponse = await $fetch.raw<unknown>(eventsUrl, {
          headers: requestHeaders,
        })

        consola.info('[github-activity] upstream:response:events', {
          headers: {
            age: eventsResponse.headers.get('age'),
            cacheControl: eventsResponse.headers.get('cache-control'),
            contentType: eventsResponse.headers.get('content-type'),
            date: eventsResponse.headers.get('date'),
            etag: eventsResponse.headers.get('etag'),
            rateLimitLimit: eventsResponse.headers.get('x-ratelimit-limit'),
            rateLimitRemaining: eventsResponse.headers.get('x-ratelimit-remaining'),
            rateLimitReset: eventsResponse.headers.get('x-ratelimit-reset'),
            rateLimitResource: eventsResponse.headers.get('x-ratelimit-resource'),
            retryAfter: eventsResponse.headers.get('retry-after'),
          },
          status: eventsResponse.status,
          url: eventsUrl,
        })

        const events = githubEventsResponseSchema.parse(eventsResponse._data)

        const latestPushEvent = events.find(currentEvent =>
          currentEvent.type === 'PushEvent'
          && currentEvent.repo?.name
          && (currentEvent.payload?.head || currentEvent.payload?.commits?.length),
        )

        if (!latestPushEvent)
          return { lastCommitAt: null }

        const latestCommitSha = latestPushEvent.payload?.head ?? latestPushEvent.payload?.commits?.at(-1)?.sha
        const repoName = latestPushEvent.repo?.name

        if (!latestCommitSha || !repoName)
          return { lastCommitAt: latestPushEvent.created_at }

        try {
          const commitUrl = `${GITHUB_API_BASE}/repos/${repoName}/commits/${latestCommitSha}`

          consola.info('[github-activity] upstream:request:commit', {
            headers: requestHeaders,
            url: commitUrl,
          })

          const commitResponse = await $fetch.raw<unknown>(commitUrl, {
            headers: requestHeaders,
          })

          consola.info('[github-activity] upstream:response:commit', {
            headers: {
              age: commitResponse.headers.get('age'),
              cacheControl: commitResponse.headers.get('cache-control'),
              contentType: commitResponse.headers.get('content-type'),
              date: commitResponse.headers.get('date'),
              etag: commitResponse.headers.get('etag'),
              rateLimitLimit: commitResponse.headers.get('x-ratelimit-limit'),
              rateLimitRemaining: commitResponse.headers.get('x-ratelimit-remaining'),
              rateLimitReset: commitResponse.headers.get('x-ratelimit-reset'),
              rateLimitResource: commitResponse.headers.get('x-ratelimit-resource'),
              retryAfter: commitResponse.headers.get('retry-after'),
            },
            status: commitResponse.status,
            url: commitUrl,
          })

          const commit = githubCommitResponseSchema.parse(commitResponse._data)

          return {
            lastCommitAt: commit.commit?.committer?.date ?? latestPushEvent.created_at,
          }
        }
        catch {
          return {
            lastCommitAt: latestPushEvent.created_at,
          }
        }
      },
    })

    return {
      lastCommitAt: cachedActivity.lastCommitAt,
      lastCommitRelative: cachedActivity.lastCommitAt ? formatRelativeTime(cachedActivity.lastCommitAt) : null,
    }
  }
  catch {
    return { lastCommitAt: null, lastCommitRelative: null }
  }
})
