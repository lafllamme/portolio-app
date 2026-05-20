/**
 * Supported portfolio document locales.
 */
export const resumeLocales = ['en', 'de'] as const

export type ResumeLocale = (typeof resumeLocales)[number]

export interface ResumeUnlockRequest {
  password: string
  locale: ResumeLocale
}

export interface ResumeUnlockResponse {
  url: string
  expiresAt: string
  fileName: string
}

export const resumeFileNames: Record<ResumeLocale, string> = {
  en: 'dogan-teke-portfolio.pdf',
  de: 'dogan-teke-portfolio-de.pdf',
}

export function isResumeLocale(value: unknown): value is ResumeLocale {
  return typeof value === 'string' && resumeLocales.includes(value as ResumeLocale)
}
