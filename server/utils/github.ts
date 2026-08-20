import { z } from 'zod'

const githubContributionLevelSchema = z.enum([
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
])

export const githubContributionDaySchema = z.object({
  contributionCount: z.number(),
  contributionLevel: githubContributionLevelSchema,
  date: z.string(),
})

export const githubContributionCalendarSchema = z.object({
  totalContributions: z.number(),
  weeks: z.array(z.object({
    contributionDays: z.array(githubContributionDaySchema),
  })),
})

/**
 * GitHub's GraphQL API answers with HTTP 200 even for query-level failures, so
 * `errors` has to be inspected explicitly. `user` is null for unknown logins.
 */
export const githubContributionsGraphqlResponseSchema = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: githubContributionCalendarSchema,
      }),
    }).nullable(),
  }).optional(),
  errors: z.array(z.object({
    message: z.string(),
    type: z.string().optional(),
  })).optional(),
})

const githubPushEventSchema = z.object({
  type: z.string(),
  created_at: z.string(),
  repo: z.object({
    name: z.string(),
  }).optional(),
  payload: z.object({
    commits: z.array(z.object({
      sha: z.string(),
    })).optional(),
    head: z.string().optional(),
  }).optional(),
})

export const githubEventsResponseSchema = z.array(githubPushEventSchema)

export const githubCommitResponseSchema = z.object({
  commit: z.object({
    committer: z.object({
      date: z.string().optional(),
    }).optional(),
  }).optional(),
})
