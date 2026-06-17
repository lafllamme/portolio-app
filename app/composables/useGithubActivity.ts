import type { AsyncDataRequestStatus } from 'nuxt/app'
import type { GithubActivityData, GithubContributionData } from '~~/shared/github'
import { computed, onMounted } from 'vue'
import { useFetch } from '#imports'

interface UseGithubActivityOptions {
  username: string
}

export function useGithubActivity(options: UseGithubActivityOptions) {
  const { username } = options

  const contributionsRequest = useFetch<GithubContributionData>(() => `/api/github-contributions/${username}`, {
    immediate: false,
    key: `github-contributions-${username}`,
    server: false,
  })

  const activityRequest = useFetch<GithubActivityData>(() => `/api/github-activity/${username}`, {
    immediate: false,
    key: `github-activity-${username}`,
    server: false,
  })

  const isPending = (status: AsyncDataRequestStatus) => status === 'pending'

  const isLoading = computed(() =>
    isPending(contributionsRequest.status.value)
    && !contributionsRequest.data.value,
  )

  const hasError = computed(() => Boolean(contributionsRequest.error.value))

  const fetchInBackground = async () => {
    await Promise.allSettled([
      contributionsRequest.execute(),
      activityRequest.execute(),
    ])
  }

  onMounted(() => {
    void fetchInBackground()
  })

  return {
    activity: computed<GithubActivityData | null>(() => activityRequest.data.value ?? null),
    contributions: computed<GithubContributionData | null>(() => contributionsRequest.data.value ?? null),
    fetchInBackground,
    hasError,
    isLoading,
  }
}
