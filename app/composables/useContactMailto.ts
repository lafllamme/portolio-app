import type { MaybeRef } from 'vue'
import { computed, unref } from 'vue'

const DEFAULT_PROJECT_INQUIRY_SUBJECT = 'Project inquiry'
const DEFAULT_PROJECT_INQUIRY_BODY
  = 'Hi Dogan, I came across your work and would love to talk about a potential project.'

export function useContactMailto(email: MaybeRef<string>) {
  return computed(() => {
    const resolvedEmail = unref(email)
    const subject = encodeURIComponent(DEFAULT_PROJECT_INQUIRY_SUBJECT)
    const body = encodeURIComponent(DEFAULT_PROJECT_INQUIRY_BODY)

    return `mailto:${resolvedEmail}?subject=${subject}&body=${body}`
  })
}
