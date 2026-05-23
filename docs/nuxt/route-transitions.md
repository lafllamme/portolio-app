# Route Transition Strategy

## Goal

Stabilize client-side route navigation so project-card clicks feel smooth and layered, while avoiding flicker, double-motion, and early scroll jumps.

## Stack Choice

- Primary: native `document.startViewTransition(...)` (same-document route transitions).
- Scope: global Vue Router integration in a Nuxt client plugin.
- Motion preference guard: `prefers-reduced-motion` disables the transition.
- Nuxt behavior alignment:
  - `definePageMeta({ scrollToTop: false })` on key pages.
  - Manual top reset only inside transition update callback for full route changes.

## Why Not Link-Only

The transition belongs to route navigation, not to individual links.
The client plugin wraps `router.push`, `router.replace`, and `router.go` so links, programmatic navigation, and history movement share the same behavior.

## Implementation

- Global router integration:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/plugins/route-view-transition.client.ts`](/Users/flame/Developer/Projects/portfolio-app/app/plugins/route-view-transition.client.ts)
- Optional link wrapper (UI convenience only):
  - [`/Users/flame/Developer/Projects/portfolio-app/app/components/AppTransitionLink.vue`](/Users/flame/Developer/Projects/portfolio-app/app/components/AppTransitionLink.vue)
- Global transition keyframes:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/assets/css/main.css`](/Users/flame/Developer/Projects/portfolio-app/app/assets/css/main.css)
- Replaced key links in:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/components/StickyMenu.vue`](/Users/flame/Developer/Projects/portfolio-app/app/components/StickyMenu.vue)
  - [`/Users/flame/Developer/Projects/portfolio-app/app/components/home/ProjectGalleryCard.vue`](/Users/flame/Developer/Projects/portfolio-app/app/components/home/ProjectGalleryCard.vue)
- Scroll handoff config:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/pages/index.vue`](/Users/flame/Developer/Projects/portfolio-app/app/pages/index.vue)
  - [`/Users/flame/Developer/Projects/portfolio-app/app/pages/projects/[slug].vue`](/Users/flame/Developer/Projects/portfolio-app/app/pages/projects/[slug].vue)

## Behavior Rules

- Supported browser and motion allowed:
  - wrap the router navigation in `document.startViewTransition`.
- Unsupported browser or reduced motion:
  - use normal Vue Router navigation.
- Same-path hash links:
  - allow default hash-scroll behavior.
- Full route changes without hash:
  - reset scroll to top inside transition update callback.

## Reference-Matched Timing

The route transition keeps Framer’s root-only View Transition architecture, but uses a slightly stronger swipe composition to reduce perceived stutter on dense pages:

- `::view-transition-old(root)`:
  - `duration: 760ms`
  - `delay: 0ms`
  - `easing: cubic-bezier(0.73, 0, 0.33, 1)`
  - `transform: translateY(0) -> translateY(-118%)`
  - `opacity: 1 -> 1`
- `::view-transition-new(root)`:
  - `duration: 760ms`
  - `delay: 680ms`
  - `easing: cubic-bezier(0.73, 0, 0.33, 1)`
  - `transform: translateY(112%) -> translateY(0)`
  - `opacity: 0 -> 1`
- `::view-transition-group(root)`:
  - slight shared upward shift (`~2.5%`) and return to reinforce wipe feel.

## Covering Layer

The reference transition does not expose a normal DOM overlay or a second named View Transition layer. The perceived cover comes from the View Transition top layer and the page background showing while the old snapshot exits and the new snapshot waits for its delayed entrance.

The implementation follows that same root-only model. There is no separate overlay element; the old root snapshot moves upward and fades over the page background, then the delayed new root snapshot enters from below.

During an active transition, `html.route-transition-active` is toggled to temporarily clip overflow and prevent scroll/animation handoff jitter.

## Notes

- This keeps behavior global and consistent for `push`, `replace`, and `go` navigations.
- The approach is SSR-safe because transition logic runs only in a `.client.ts` plugin.
