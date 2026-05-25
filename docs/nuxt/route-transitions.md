# Route Transition Strategy

## Goal

Match the Framer reference transition model as closely as possible for full-route navigation:

- root old/new snapshots
- wipe mask on the View Transition pseudo-elements
- synchronized exit/enter timing

## Architecture

- Native same-document transitions via `document.startViewTransition(...)`.
- Global router integration in:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/plugins/route-view-transition.client.ts`](/Users/flame/Developer/Projects/portfolio-app/app/plugins/route-view-transition.client.ts)
- Global View Transition styles in:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/assets/css/main.css`](/Users/flame/Developer/Projects/portfolio-app/app/assets/css/main.css)
- Shared layout remains unchanged except normal nav/content structure:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/layouts/default.vue`](/Users/flame/Developer/Projects/portfolio-app/app/layouts/default.vue)

## Transition Model (Framer-Matched)

- Exit (`::view-transition-old(root)`):
  - `y: 0 -> -30%`
  - `opacity: 1 -> 0`
  - `duration: 0.6s`
  - `delay: 0s`
  - `ease: cubic-bezier(0.73, 0, 0.33, 1)`
- Enter (`::view-transition-new(root)`):
  - `y: 30% -> 0`
  - `opacity: 0 -> 1`
  - `duration: 0.6s`
  - `delay: 0.5s`
  - `ease: cubic-bezier(0.73, 0, 0.33, 1)`
- Mask:
  - wipe mask with angle equivalent to Framer `270`
  - `width: 0%` edge behavior
  - animated via `--view-transition-wipe-offset` from `0 -> 1`

## Behavior Rules

- Hash-only same-path navigation remains native.
- Full path changes run inside `startViewTransition`.
- Browser history navigation (`popstate`) is handled separately via router lifecycle (`beforeResolve` + `afterEach`) because it bypasses `router.push` wrappers.
- Scroll reset to top occurs inside the transition update callback.
- Reduced motion disables VT animations.

## Notes

- This implementation intentionally avoids a DOM curtain layer.
- The wipe/cutover is produced by VT pseudo-element masks, matching Framer runtime behavior.
