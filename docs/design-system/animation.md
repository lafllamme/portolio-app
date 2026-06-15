# Motion Spec

## Scope

This document defines the current motion behavior for the home hero intro, the contact image stack carousel, and the shared pixel reveal image treatment.

## Goals

- Match the reference sequencing from `mikebennet.framer.website`.
- Keep SSR output stable (no client-only layout jump).
- Keep implementation utility-first and UnoCSS-driven.
- Keep shared image reveal behavior documented so timing changes do not drift from the intended visual language.

## Sequence

1. Hero title enters first from below.
2. Description enters second with a short delay.
3. Description must not be visible before its own animation starts.

## Shared Pixel Reveal

Shared component:

- [`/Users/flame/Developer/Projects/portfolio-app/app/components/media/PixelRevealImage.vue`](/Users/flame/Developer/Projects/portfolio-app/app/components/media/PixelRevealImage.vue)

Intent:

- Provide a reusable `NuxtImg` wrapper with a pixel-canvas reveal overlay.
- Play once per page load for a given image source.
- Keep the image accessible by preserving the underlying `alt` text and marking the canvas overlay as decorative.

Current defaults:

- `revealHoldMs: 180`
- `stepDurationMs: 130`
- `fadeDurationMs: 220`
- `pixelScales: [42, 34, 27, 21, 16, 12, 9, 7, 5, 4, 3]`
- `threshold: 0.05`

Tuning note:

- This feature is intentionally still tunable. If reveal timing, step density, or replay behavior changes, update this document and the shared component together.
- Current direction: smoother and calmer than the harsher Framer reference timing, while preserving the same overall feel.

## Scroll Reveal Text

Component:

- [`/Users/flame/Developer/Projects/portfolio-app/app/components/ScrollReveal.vue`](/Users/flame/Developer/Projects/portfolio-app/app/components/ScrollReveal.vue)

Intent:

- Reveal long editorial headlines progressively on scroll.
- Keep word-level animation targets template-driven instead of querying the DOM after render.
- Rebuild GSAP state cleanly when text or animation inputs change.

Stability note:

- Initialization waits for Vue render completion and font readiness before creating the ScrollTrigger timelines.
- Trigger positions are refreshed on browser load and page restore so late layout shifts do not leave the reveal in a falsely completed state.

## Contact Image Stack Carousel

Components:

- [`/Users/flame/Developer/Projects/portfolio-app/app/components/ContactShowcaseSection.vue`](/Users/flame/Developer/Projects/portfolio-app/app/components/ContactShowcaseSection.vue)
- [`/Users/flame/Developer/Projects/portfolio-app/app/components/contact/ContactImageStackCarousel.vue`](/Users/flame/Developer/Projects/portfolio-app/app/components/contact/ContactImageStackCarousel.vue)

Intent:

- Preserve the existing `get in / touch` composition while rotating the central image stack automatically.
- Keep the large foreground image as the active frame and the smaller offset image as the upcoming frame.
- Reuse content-driven image data from [`/Users/flame/Developer/Projects/portfolio-app/shared/about.ts`](/Users/flame/Developer/Projects/portfolio-app/shared/about.ts) instead of hardcoding gallery assets inside the component.

Current behavior:

- Rotation interval: `1000ms`
- Slot model: two visible images
  - foreground slot: current image
  - accent slot: next image
- Motion is disabled when reduced motion is preferred.
- Rotation pauses automatically when there is only one image.

Implementation note:

- This carousel intentionally uses a small template-first state machine with VueUse `useIntervalFn`.
- Keep the component extractor-safe and SSR-safe: no manual DOM queries, no runtime-generated utility classes, and no client-only layout measurement.

## Motion Tokens

Defined in [`/Users/flame/Developer/Projects/portfolio-app/uno.config.ts`](/Users/flame/Developer/Projects/portfolio-app/uno.config.ts):

- `@keyframes hero-reveal`
  - from: `translate3d(0, 1500px, 0)`, `opacity: 0`
  - to: `translate3d(0, 0, 0)`, `opacity: 1`
- `@keyframes subline-reveal`
  - from: `translate3d(0, 100px, 0)`, `opacity: 0`
  - to: `translate3d(0, 0, 0)`, `opacity: 0.7`

UnoCSS utility rules:

- `hero-reveal-ready`
- `subline-reveal-ready`

Both rules include full `animation` shorthand so duration, delay, easing, and fill mode remain deterministic.

## Vue Integration

In [`/Users/flame/Developer/Projects/portfolio-app/app/pages/index.vue`](/Users/flame/Developer/Projects/portfolio-app/app/pages/index.vue):

- State flag `heroReady` controls class activation.
- Before ready:
  - title: `opacity-0`
  - subline: `opacity-0`
- After ready:
  - title: `hero-reveal-ready`
  - subline: `subline-reveal-ready`

## Guardrails

- Do not reintroduce `document.documentElement.classList` toggles for hero animation.
- Keep animation class names static (extractor-safe).
- If hero timing changes, update both this doc and `uno.config.ts` together.
- If pixel reveal timing changes, update both this doc and `PixelRevealImage.vue` together.
- If contact carousel timing, slot behavior, or reduced-motion handling changes, update both this doc and `ContactImageStackCarousel.vue` together.
