import type { ResumeLocale, ResumeUnlockRequest, ResumeUnlockResponse } from '~~/shared/resume'
import { createError, defineEventHandler, readBody } from 'h3'
import { isResumeLocale, resumeFileNames } from '~~/shared/resume'
import { useRuntimeConfig } from '#imports'
import { serverSupabaseServiceRole } from '#supabase/server'

const UNAUTHORIZED_MESSAGE = 'Invalid password.'
const UNCONFIGURED_MESSAGE = 'Resume download is not configured.'

function resolveRequestedLocale(value: unknown): ResumeLocale {
  if (isResumeLocale(value))
    return value

  return 'en'
}

/**
 * Unlocks the protected portfolio PDF and returns a time-based signed URL.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody<Partial<ResumeUnlockRequest>>(event)
  const password = typeof body?.password === 'string' ? body.password.trim() : ''

  if (!config.resumeDownload.password) {
    throw createError({
      statusCode: 500,
      statusMessage: UNCONFIGURED_MESSAGE,
    })
  }

  if (!password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password is required.',
    })
  }

  if (password !== config.resumeDownload.password) {
    throw createError({
      statusCode: 401,
      statusMessage: UNAUTHORIZED_MESSAGE,
    })
  }

  const locale = resolveRequestedLocale(body?.locale)
  const filePath = locale === 'de'
    ? config.resumeDownload.fileDe
    : config.resumeDownload.fileEn
  const fileName = resumeFileNames[locale]
  const expiresIn = config.resumeDownload.signedUrlTtlSeconds
  const supabase = serverSupabaseServiceRole(event)
  const { data, error } = await supabase.storage
    .from(config.resumeDownload.bucket)
    .createSignedUrl(filePath, expiresIn, {
      download: fileName,
    })

  if (error || !data?.signedUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to create the signed portfolio download URL.',
      data: error,
    })
  }

  const response: ResumeUnlockResponse = {
    expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
    fileName,
    url: data.signedUrl,
  }

  return response
})
