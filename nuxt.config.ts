export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/a11y',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
  ],
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    resumeDownload: {
      bucket: 'resume',
      fileEn: 'latest.pdf',
      fileDe: 'latest_de.pdf',
      password: '',
      signedUrlTtlSeconds: 604800,
    },
  },
  fonts: {
    defaults: {
      subsets: ['latin'],
    },
    families: [
      {
        name: 'Funnel Sans',
        provider: 'google',
        global: true,
        preload: true,
        weights: [400, 500, 600, 700],
        styles: ['normal'],
      },
      {
        name: 'Cabinet Grotesk',
        provider: 'fontshare',
        global: true,
        preload: true,
        weights: [400, 500, 700],
        styles: ['normal'],
      },
      {
        name: 'Satoshi',
        provider: 'fontshare',
        global: true,
        preload: true,
        weights: [400, 500, 700],
        styles: ['normal'],
      },
    ],
  },
})
