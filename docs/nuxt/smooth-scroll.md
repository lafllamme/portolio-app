# Smooth scrolling

The application uses one root Lenis instance for subtle wheel smoothing. Touch
scrolling remains native (`syncTouch: false`), and reduced-motion preferences
disable wheel smoothing and animated anchor movement.

Wheel movement uses `lerp: 0.085` for a continuous trailing response across
repeated inputs and direction changes. A `wheelMultiplier` of `0.9` slightly
reduces aggressive wheel bursts without sacrificing normal responsiveness.
This does not add another animation loop or increase per-frame work.

## Architecture

- `lenis/nuxt` registers the Vue integration and its composables.
- `AppSmoothScroll.client.vue` owns the single root instance.
- Lenis uses the GSAP ticker instead of running a second RAF loop.
- Lenis scroll events update GSAP ScrollTrigger.
- Nuxt's `page:finish` hook resizes Lenis and refreshes ScrollTrigger positions.

The route-transition controller remains responsible for immediate cross-route
scroll resets and hash positioning while the transition curtain covers the
page. Lenis pauses for the complete transition and resumes when its phase
returns to `idle`. Same-page anchors are handled smoothly by Lenis.

## Nested scrolling

Add `data-lenis-prevent` to independently scrollable regions so their wheel or
touch input is not consumed by the root instance:

```html
<div data-lenis-prevent class="overflow-x-auto">
  <!-- independently scrollable content -->
</div>
```

## ScrollReveal

`ScrollReveal.vue` stays GSAP-driven. Rotation and the combined word
opacity/blur tween share the root window scroll position and are refreshed
after navigation. With reduced motion enabled, it renders the final readable
state without creating ScrollTrigger animations.
