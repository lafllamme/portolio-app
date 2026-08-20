import type { GithubContributionData } from '~~/shared/github'
import { consola } from 'consola'
import { createError, defineEventHandler, getRouterParam } from 'h3'
import { useRuntimeConfig } from '#imports'
import { githubContributionsGraphqlResponseSchema } from '../../utils/github'
import { getCachedWithSWR } from '../../utils/swr-cache'

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql'
const CONTRIBUTIONS_FRESH_TTL_MS = 1000 * 60 * 60 * 2
const CONTRIBUTIONS_STALE_TTL_MS = 1000 * 60 * 60 * 2
const UNCONFIGURED_MESSAGE = 'GitHub contributions are not configured.'

/**
 * `contributionsCollection` defaults to the trailing year, which is exactly the
 * window the calendar renders. Weeks arrive pre-grouped and the levels already
 * match `GithubContributionLevel`, so no remapping is needed.
 */
const CONTRIBUTIONS_QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            contributionLevel
            date
          }
        }
      }
    }
  }
}`

export default defineEventHandler(async (event): Promise<GithubContributionData> => {
  const username = getRouterParam(event, 'username')?.trim()

  if (!username)
    throw createError({ statusCode: 400, statusMessage: 'GitHub username is required.' })

  const { githubToken } = useRuntimeConfig(event)

  if (!githubToken) {
    consola.warn('[github-contributions] config:missing-token')
    throw createError({ statusCode: 500, statusMessage: UNCONFIGURED_MESSAGE })
  }

  try {
    return await getCachedWithSWR({
      key: `github:contributions:${username}`,
      freshTtlMs: CONTRIBUTIONS_FRESH_TTL_MS,
      staleTtlMs: CONTRIBUTIONS_STALE_TTL_MS,
      debugScope: 'github-contributions',
      fetcher: async () => {
        consola.info('[github-contributions] upstream:request', {
          login: username,
          url: GITHUB_GRAPHQL_API,
        })

        const response = await $fetch.raw<unknown>(GITHUB_GRAPHQL_API, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Content-Type': 'application/json',
            'User-Agent': 'portfolio-app',
          },
          body: {
            query: CONTRIBUTIONS_QUERY,
            variables: { login: username },
          },
        })

        consola.info('[github-contributions] upstream:response', {
          headers: {
            date: response.headers.get('date'),
            rateLimitLimit: response.headers.get('x-ratelimit-limit'),
            rateLimitRemaining: response.headers.get('x-ratelimit-remaining'),
            rateLimitReset: response.headers.get('x-ratelimit-reset'),
          },
          status: response.status,
          url: GITHUB_GRAPHQL_API,
        })

        const payload = githubContributionsGraphqlResponseSchema.parse(response._data)

        if (payload.errors?.length) {
          throw new Error(`GitHub GraphQL error: ${payload.errors.map(error => error.message).join('; ')}`)
        }

        const user = payload.data?.user

        if (!user) {
          throw new Error(`GitHub user @${username} was not found.`)
        }

        const calendar = user.contributionsCollection.contributionCalendar

        return {
          contributions: calendar.weeks.map(week => week.contributionDays),
          totalContributions: calendar.totalContributions,
        }
      },
    })
  }
  catch {
    throw createError({
      statusCode: 502,
      statusMessage: `Unable to load GitHub contributions for @${username}.`,
    })
  }
})
