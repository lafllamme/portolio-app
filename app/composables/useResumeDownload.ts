import type { FetchError } from 'ofetch'
import type { ResumeUnlockRequest, ResumeUnlockResponse } from '~~/shared/resume'
import { ref } from 'vue'

interface ResumeDownloadErrorResponse {
  statusMessage?: string
  message?: string
}

const DEFAULT_RESUME_ERROR = 'Unable to unlock the portfolio right now.'

/**
 * Owns the client-side unlock flow for the protected portfolio PDF.
 */
export function useResumeDownload() {
  const isModalOpen = ref(false)
  const isSubmitting = ref(false)
  const errorMessage = ref('')

  const openModal = () => {
    errorMessage.value = ''
    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
    errorMessage.value = ''
  }

  const submitPassword = async (payload: ResumeUnlockRequest) => {
    if (isSubmitting.value)
      return null

    isSubmitting.value = true
    errorMessage.value = ''

    try {
      const response = await $fetch<ResumeUnlockResponse>('/api/resume/unlock', {
        method: 'POST',
        body: payload,
      })

      if (import.meta.client) {
        window.open(response.url, '_blank', 'noopener,noreferrer')
      }

      closeModal()
      return response
    }
    catch (error) {
      const fetchError = error as FetchError<ResumeDownloadErrorResponse>

      errorMessage.value
        = fetchError.data?.statusMessage
          || fetchError.data?.message
          || DEFAULT_RESUME_ERROR

      return null
    }
    finally {
      isSubmitting.value = false
    }
  }

  return {
    closeModal,
    errorMessage,
    isModalOpen,
    isSubmitting,
    openModal,
    submitPassword,
  }
}
