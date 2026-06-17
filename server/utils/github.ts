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

export const githubContributionResponseSchema = z.object({
  contributions: z.array(z.array(githubContributionDaySchema)),
  totalContributions: z.number(),
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
