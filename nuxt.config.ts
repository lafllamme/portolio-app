import { optimizeDepsInclude } from './build/vite/optimize-deps'
import { projectCatalog } from './shared/projects'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        { name: 'author', content: 'Dogan Teke' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'application-name', content: 'teke.studio' },
        { name: 'apple-mobile-web-app-title', content: 'teke.studio' },
        { name: 'theme-color', content: '#0b0c10' },
      ],
    },
  },
  css: ['lenis/dist/lenis.css', '~/assets/css/main.css'],
  vite: {
    css: {
      transformer: 'lightningcss',
    },
    optimizeDeps: {
      include: [...optimizeDepsInclude],
    },
  },

  modules: [
    '@nuxt/a11y',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@unocss/nuxt',
    'lenis/nuxt',
  ],
  site: {
    url: 'https://teke.studio',
    name: 'teke.studio',
  },
  sitemap: {
    urls: projectCatalog.map(project => `/projects/${project.slug}`),
    discoverImages: true,
    autoLastmod: false,
    zeroRuntime: true,
  },
  routeRules: {
    '/projects/neural-workspace': {
      redirect: {
        to: '/projects/tecnews',
        statusCode: 301,
      },
    },
    '/projects/agent-studio': {
      redirect: {
        to: '/projects/grillme',
        statusCode: 301,
      },
    },
  },
  supabase: {
    redirect: false,
  },
  image: {
    domains: ['framerusercontent.com'],
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
