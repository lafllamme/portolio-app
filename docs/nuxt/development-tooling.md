# Development Tooling Notes

## Vite `optimizeDeps`

Runtime dependency discovery in Nuxt dev mode can trigger a full page reload when Vite encounters late-loaded packages such as animation plugins.

This project keeps explicit pre-bundle exceptions in:

- [`/Users/flame/Developer/Projects/portfolio-app/build/vite/optimize-deps.ts`](/Users/flame/Developer/Projects/portfolio-app/build/vite/optimize-deps.ts)

The Nuxt config reads that list in:

- [`/Users/flame/Developer/Projects/portfolio-app/nuxt.config.ts`](/Users/flame/Developer/Projects/portfolio-app/nuxt.config.ts)

Use this helper only for packages that Vite explicitly reports as runtime-discovered dev dependencies. Keep the list small and additive so the reason for each entry stays obvious.

## Icon Rendering

For app icons, use the shared icon component pattern already present in the codebase:

- `<Icon name="..." />`

Do not drop raw SVG markup into components when the icon already exists in the configured icon set, and do not mix in `NuxtIcon` as a parallel pattern. Keep icon usage consistent so SSR behavior and component resolution stay predictable.

## Local workflow

- `pnpm dev` with the `.env` from `.env.example` covers everything but downloads.
- Type checking runs separately (`pnpm typecheck`) — dev server skips it for speed.
- Lint autofix on commit; CI only verifies, never rewrites.

## Vite prebundle quirks

- GSAP plugins must be listed in `optimizeDeps.include` or dev cold-start re-optimizes mid-session.
- Changing the include list requires clearing `.nuxt` — stale metadata survives restarts.
- Prod builds are unaffected; this is dev-server-only behavior.
- Follow-up: revisit lint on commit after the next iteration.
- Reminder: sync lint on commit docs with implementation changes.
- Follow-up: revisit lint on commit after the next iteration.
- Open question: does typecheck flow need its own section?
- Verified lint on commit against current implementation.
- Checked vite prebundle — matches the shipped behavior.
- TODO: add example for typecheck flow.
- TODO: add example for typecheck flow.
- TODO: add example for env setup.
- Follow-up: revisit lint on commit after the next iteration.
- Decision: keep vite prebundle as documented for now.
