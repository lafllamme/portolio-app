# Motion Spec

## Scope

This document defines the current motion behavior for the home hero intro, the contact image stack carousel, and the shared image reveal treatment.

## Goals

- Match the reference sequencing from `mikebennet.framer.website`.
- Keep SSR output stable (no client-only layout jump).
- Keep implementation utility-first and UnoCSS-driven.
- Keep shared image reveal behavior documented so timing changes do not drift from the intended visual language.

## Sequence

1. Hero title enters first from below.
2. Description enters second with a short delay.
3. Description must not be visible before its own animation starts.

## Shared Image Reveal

Shared component:

- [`/Users/flame/Developer/Projects/portfolio-app/app/components/media/RevealImage.vue`](/Users/flame/Developer/Projects/portfolio-app/app/components/media/RevealImage.vue)

Intent:

- Provide a reusable `NuxtImg` wrapper with the selected `frame-in` reveal treatment.
- Keep the image accessible by preserving the underlying `alt` text and marking decorative overlays as `aria-hidden`.

Current defaults:

- reveal variant: `frame-in`
- `threshold: 0.05`

Tuning note:

- This feature is intentionally still tunable. If reveal timing or geometry changes, update this document and the shared component together.
- Current direction: the editorial `frame-in` reveal replaces the earlier pixel-canvas treatment and the temporary multi-variant review tooling.

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

## About Intro Paragraph Highlight

Files:

- [`/Users/flame/Developer/Projects/portfolio-app/app/pages/about-me/index.vue`](/Users/flame/Developer/Projects/portfolio-app/app/pages/about-me/index.vue)
- [`/Users/flame/Developer/Projects/portfolio-app/app/composables/useCenteredActiveIndex.ts`](/Users/flame/Developer/Projects/portfolio-app/app/composables/useCenteredActiveIndex.ts)

Intent:

- Keep the left intro copy in a dimmed state by default.
- Promote exactly one paragraph at a time to the bright foreground color.
- Switch the active paragraph when its center moves through a narrow band around the viewport midpoint.

Current behavior:

- Only one paragraph is highlighted at a time.
- Highlight selection is driven by `IntersectionObserver`.
- Observer band: `rootMargin: '-45% 0px -45% 0px'`
- Active paragraph uses `text-text`; inactive paragraphs use `text-text/60`.
- Color shift is eased with a short `transition-colors`.

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
- If shared reveal timing or variant behavior changes, update both this doc and `RevealImage.vue` together.
- If about intro highlight behavior changes, update both this doc and `useCenteredActiveIndex.ts` together.
- If contact carousel timing, slot behavior, or reduced-motion handling changes, update both this doc and `ContactImageStackCarousel.vue` together.

## Timing reference

- Micro interactions: 150–250ms, `power2.out`.
- Section reveals: 600–900ms, `power3.out`, stagger 60–90ms.
- Route curtain: 1100ms total — 45% cover, 10% hold, 45% reveal.

## Scroll reveal conventions

- Reveals trigger at 20% element visibility, once, no scrub.
- Y-offset 24–40px max — anything larger reads as a layout shift.
- Batch children with a single trigger; per-child observers are banned.

## Marquee observer

- The loop pauses via IntersectionObserver at 0% visibility, resumes at 10%.
- Pausing sets `animation-play-state`, never unmounts — position is preserved.
- Reduced motion swaps the marquee for a static, wrapped list.
- Clarified: reduced motion applies to production builds only.
- Reminder: sync stagger values docs with implementation changes.
- Reminder: sync reduced motion docs with implementation changes.
- Note: easing table behaves as expected in latest testing.
- Decision: keep reveal offsets as documented for now.
- TODO: add example for marquee pause.
- Checked reduced motion — matches the shipped behavior.
- Checked marquee pause — matches the shipped behavior.
- Reminder: sync reduced motion docs with implementation changes.
- Reminder: sync easing table docs with implementation changes.
- Follow-up: revisit reveal offsets after the next iteration.
- Reminder: sync easing table docs with implementation changes.
- Reminder: sync easing table docs with implementation changes.
- TODO: add example for reduced motion.
- Checked easing table — matches the shipped behavior.
- Checked easing table — matches the shipped behavior.
