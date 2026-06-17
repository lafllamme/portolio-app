export type GithubContributionLevel
  = | 'NONE'
    | 'FIRST_QUARTILE'
    | 'SECOND_QUARTILE'
    | 'THIRD_QUARTILE'
    | 'FOURTH_QUARTILE'

export interface GithubContributionDay {
  contributionCount: number
  contributionLevel: GithubContributionLevel
  date: string
}

export interface GithubContributionData {
  contributions: GithubContributionDay[][]
  totalContributions: number
}

export interface GithubActivityData {
  lastCommitAt: null | string
  lastCommitRelative: null | string
}
