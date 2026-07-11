/**
 * Central place for Vite pre-bundling exceptions that are discovered at
 * runtime in dev mode. Add packages here when Nuxt/Vite reports a late
 * dependency discovery and triggers a full reload.
 */
export const optimizeDepsInclude = [
  'gsap',
  'gsap/ScrollTrigger',
  'lenis',
  'lenis/vue',
] as const
