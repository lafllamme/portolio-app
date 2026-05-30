# Route Transition Strategy

## Goal

Use one app-controlled route transition engine for every full route change so in-app navigation and browser history feel identical.

## Architecture

- Transition state lives in:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/composables/useRouteTransitionController.ts`](/Users/flame/Developer/Projects/portfolio-app/app/composables/useRouteTransitionController.ts)
- Router interception lives in:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/plugins/route-transition.client.ts`](/Users/flame/Developer/Projects/portfolio-app/app/plugins/route-transition.client.ts)
- The shared layout renders the animated stage and curtain layer through:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/components/RouteTransitionLayer.vue`](/Users/flame/Developer/Projects/portfolio-app/app/components/RouteTransitionLayer.vue)
- Motion tokens and keyframes live in:
  - [`/Users/flame/Developer/Projects/portfolio-app/app/assets/css/main.css`](/Users/flame/Developer/Projects/portfolio-app/app/assets/css/main.css)

## Why This Replaces View Transitions

- Native `document.startViewTransition(...)` produced two different lifecycles:
  - wrapped `router.push/replace/go`
  - browser history `popstate`
- That split caused timing drift, different curtain behavior, and unreliable browser-history animation.
- The new system uses a real DOM curtain and one phase machine for every navigation source.

## Phase Model

- `idle`: no route transition is active
- `leaving`: current page shell moves upward and fades while the curtain rises
- `covered`: the curtain fully covers the screen and the old stage is hidden
- `entering`: the new route enters beneath the curtain and the curtain clears upward

## Behavior Rules

- Full route changes always run through the controller.
- Same-page hash jumps remain native and skip the full route transition.
- Hash navigation to another route performs the full transition, then jumps to the target element before the visible enter phase completes.
- Full route changes without a hash reset scroll to top before reveal.
- Repeated navigation attempts while a transition is active are blocked.
- Reduced motion disables the custom animation path.

## Motion Baseline

- The visual target is the previously preferred in-app motion:
  - stage exits upward with opacity fade
  - curtain covers from below
  - new route is held below the fold briefly
  - curtain reveals upward
- The implementation now reproduces that through one DOM-based engine instead of browser snapshot pseudo-elements.

## Current Timing Tokens

- Controller timing in [`/Users/flame/Developer/Projects/portfolio-app/app/composables/useRouteTransitionController.ts`](/Users/flame/Developer/Projects/portfolio-app/app/composables/useRouteTransitionController.ts):
  - `ROUTE_TRANSITION_LEAVE_MS = 600`
  - `ROUTE_TRANSITION_COVER_HOLD_MS = 60`
  - `ROUTE_TRANSITION_ENTER_MS = 560`
- CSS timing/shift tokens in [`/Users/flame/Developer/Projects/portfolio-app/app/assets/css/main.css`](/Users/flame/Developer/Projects/portfolio-app/app/assets/css/main.css):
  - `--route-transition-leave-duration: 600ms`
  - `--route-transition-enter-duration: 560ms`
  - `--route-transition-leave-shift: -5%`
  - `--route-transition-enter-shift: 5%`

## Reference Parity Notes (mikebennet.framer.website)

- Reference route transitions are configured in Framer runtime with:
  - exit: `duration: 0.6s`, `ease: [0.73, 0, 0.33, 1]`, `y: -30%`
  - enter: `delay: 0.5s`, `duration: 0.6s`, `ease: [0.73, 0, 0.33, 1]`, `y: 30%`
- To match that feel in our single-engine DOM-curtain model:
  - curtain reaches full cover earlier in leave (`46%`) for stronger takeover
  - covered hold set to a brief handoff window (`60ms`) to keep motion organic
  - stage shift amplitudes reduced (`-5%` leave, `5%` enter) to avoid excessive push
  - enter and curtain-uncover hold windows shortened (`12%` / `14%`) to tighten reveal sync

## Lifecycle edge cases

- Rapid double navigation: the second wipe must cancel, not queue.
- Browser back/forward reuses the same curtain path as in-app links.
- Scroll restoration waits for the cover frame, otherwise content jumps.

## Curtain tuning

- Cover easing `power4.in`, reveal `power4.out` — symmetric feels mechanical.
- Hold frame stays under 120ms; longer reads as jank, not intention.
- Menu-triggered navigation skips the hold entirely.

## Browser support

- View Transitions API path is progressive enhancement; GSAP curtain is the baseline.
- Safari gets the GSAP path regardless — its VT implementation drops frames on large surfaces.
- Feature detection happens once at app boot, not per navigation.
- Reminder: sync cancel semantics docs with implementation changes.
- Open question: does back-forward path need its own section?
- Checked scroll restoration — matches the shipped behavior.
- Edge case: cancel semantics on mobile safari needs a second look.
- Checked cancel semantics — matches the shipped behavior.
- Reminder: sync back-forward path docs with implementation changes.
- Clarified: cancel semantics applies to production builds only.
- TODO: add example for back-forward path.
