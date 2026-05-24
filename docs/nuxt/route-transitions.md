# Route Transition Strategy

## Goal

Stabilize client-side route navigation so project-card clicks feel smooth and layered, while avoiding flicker, double-motion, and scroll handoff jumps.

## Stack Choice

- Primary: controlled curtain-orchestrated route transitions (CSS + router timing).
- Scope: global Vue Router integration in a Nuxt client plugin + persistent curtain component in the default layout.
- Motion preference guard: `prefers-reduced-motion` disables transition orchestration.
- Nuxt behavior alignment:
  - `definePageMeta({ scrollToTop: false })` on key pages.
  - Manual top reset only during transition handoff for full route changes.

## Why Not Link-Only

The transition belongs to route navigation, not to individual links.
The client plugin wraps `router.push` and `router.replace` so links and programmatic navigation share the same behavior.

## Implementation

- Global router integration:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/plugins/route-view-transition.client.ts`](/Users/flame/Developer/Projects/portfolio-app/app/plugins/route-view-transition.client.ts)
- Curtain layer:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/components/RouteCurtain.vue`](/Users/flame/Developer/Projects/portfolio-app/app/components/RouteCurtain.vue)
- Curtain mount in layout:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/layouts/default.vue`](/Users/flame/Developer/Projects/portfolio-app/app/layouts/default.vue)
- Global transition keyframes:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/assets/css/main.css`](/Users/flame/Developer/Projects/portfolio-app/app/assets/css/main.css)
- Optional link wrapper (UI convenience only):
  - [`/Users/flame/Developer/Projects/portfolio-app/app/components/AppTransitionLink.vue`](/Users/flame/Developer/Projects/portfolio-app/app/components/AppTransitionLink.vue)

## Transition Sequence

1. `route-transition-exit`
   - motion shell (`menu + page content`): `translateY(0 -> -11%)` + `opacity(1 -> 0)` over `520ms`
   - curtain: `translateY(100% -> 0)` over `380ms` with no delay (early takeover)
2. Navigation runs while curtain fully covers the page.
3. `route-transition-enter`
   - curtain: `translateY(0 -> -100%)` over `620ms`
   - new motion shell (`menu + page content`): `translateY(10% -> 0)` + `opacity(0 -> 1)` over `560ms` with `140ms` delay

All motion uses `cubic-bezier(0.73, 0, 0.33, 1)`.

## Notes

- During an active transition, `html.route-transition-active` clips overflow to prevent scroll jitter.
- Router handoff starts after the curtain is expected to cover (`~380ms`).
- Same-path hash navigation stays native to preserve in-page anchor behavior.
- `router.go` remains native to avoid history/back-stack race conditions.
- The approach is SSR-safe because transition logic runs only in a `.client.ts` plugin.
