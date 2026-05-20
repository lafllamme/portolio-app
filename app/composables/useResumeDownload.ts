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

  /**
   * Opens a blank tab synchronously from the original user gesture so mobile
   * browsers do not block the later signed-URL navigation after the async
   * password request resolves.
   */
  const openPendingDownloadWindow = () => {
    if (!import.meta.client)
      return null

    return window.open('', '_blank', 'noopener,noreferrer')
  }

  /**
   * Completes the download navigation using the preserved user-gesture tab
   * when available, with a same-tab fallback for stricter mobile browsers.
   */
  const navigateToDownload = (url: string, pendingWindow: Window | null) => {
    if (!import.meta.client)
      return

    if (pendingWindow) {
      pendingWindow.location.href = url
      return
    }

    window.location.assign(url)
  }

  const submitPassword = async (payload: ResumeUnlockRequest) => {
    if (isSubmitting.value)
      return null

    isSubmitting.value = true
    errorMessage.value = ''
    const pendingWindow = openPendingDownloadWindow()

    try {
      const response = await $fetch<ResumeUnlockResponse>('/api/resume/unlock', {
        method: 'POST',
        body: payload,
      })

      navigateToDownload(response.url, pendingWindow)

      closeModal()
      return response
    }
    catch (error) {
      pendingWindow?.close()

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
