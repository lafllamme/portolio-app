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
  - `ROUTE_TRANSITION_LEAVE_MS = 620`
  - `ROUTE_TRANSITION_COVER_HOLD_MS = 20`
  - `ROUTE_TRANSITION_ENTER_MS = 620`
- CSS timing/shift tokens in [`/Users/flame/Developer/Projects/portfolio-app/app/assets/css/main.css`](/Users/flame/Developer/Projects/portfolio-app/app/assets/css/main.css):
  - `--route-transition-leave-duration: 620ms`
  - `--route-transition-enter-duration: 620ms`
  - `--route-transition-leave-shift: -10%`
  - `--route-transition-enter-shift: 12%`
