# Hero Animation Spec

## Scope

This document defines the intro motion behavior for the home hero title and description.

## Goals

- Match the reference sequencing from `mikebennet.framer.website`.
- Keep SSR output stable (no client-only layout jump).
- Keep implementation utility-first and UnoCSS-driven.

## Sequence

1. Hero title enters first from below.
2. Description enters second with a short delay.
3. Description must not be visible before its own animation starts.

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
- If timing changes, update both this doc and `uno.config.ts` together.
