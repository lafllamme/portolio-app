// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/a11y',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
  ],
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
