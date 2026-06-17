import type { GithubContributionData } from '~~/shared/github'
import { consola } from 'consola'
import { createError, defineEventHandler, getRouterParam } from 'h3'
import { githubContributionResponseSchema } from '../../utils/github'
import { getCachedWithSWR } from '../../utils/swr-cache'

const GITHUB_CONTRIBUTIONS_API_BASE = 'https://github-contributions-api.deno.dev'
const CONTRIBUTIONS_FRESH_TTL_MS = 1000 * 60 * 60 * 2
const CONTRIBUTIONS_STALE_TTL_MS = 1000 * 60 * 60 * 2

export default defineEventHandler(async (event): Promise<GithubContributionData> => {
  const username = getRouterParam(event, 'username')?.trim()

  if (!username)
    throw createError({ statusCode: 400, statusMessage: 'GitHub username is required.' })

  try {
    return await getCachedWithSWR({
      key: `github:contributions:${username}`,
      freshTtlMs: CONTRIBUTIONS_FRESH_TTL_MS,
      staleTtlMs: CONTRIBUTIONS_STALE_TTL_MS,
      debugScope: 'github-contributions',
      fetcher: async () => {
        const requestUrl = `${GITHUB_CONTRIBUTIONS_API_BASE}/${username}.json`
        const requestHeaders = {
          'User-Agent': 'portfolio-app',
        }

        consola.info('[github-contributions] upstream:request', {
          headers: requestHeaders,
          url: requestUrl,
        })

        const response = await $fetch.raw<unknown>(requestUrl, {
          headers: requestHeaders,
        })

        consola.info('[github-contributions] upstream:response', {
          headers: {
            age: response.headers.get('age'),
            cacheControl: response.headers.get('cache-control'),
            cfCacheStatus: response.headers.get('cf-cache-status'),
            contentType: response.headers.get('content-type'),
            date: response.headers.get('date'),
            etag: response.headers.get('etag'),
            xCache: response.headers.get('x-cache'),
          },
          status: response.status,
          url: requestUrl,
        })

        return githubContributionResponseSchema.parse(response._data)
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
