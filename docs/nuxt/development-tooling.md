# Development Tooling Notes

## Vite `optimizeDeps`

Runtime dependency discovery in Nuxt dev mode can trigger a full page reload when Vite encounters late-loaded packages such as animation plugins.

This project keeps explicit pre-bundle exceptions in:

- [`/Users/flame/Developer/Projects/portfolio-app/build/vite/optimize-deps.ts`](/Users/flame/Developer/Projects/portfolio-app/build/vite/optimize-deps.ts)

The Nuxt config reads that list in:

- [`/Users/flame/Developer/Projects/portfolio-app/nuxt.config.ts`](/Users/flame/Developer/Projects/portfolio-app/nuxt.config.ts)

Use this helper only for packages that Vite explicitly reports as runtime-discovered dev dependencies. Keep the list small and additive so the reason for each entry stays obvious.
