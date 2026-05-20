<script setup lang="ts">
import { useEventListener, useTemplateRefsList } from '@vueuse/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'

/**
 * Optional custom scroller wrapper for ScrollTrigger-driven contexts.
 */
interface ScrollContainerRef {
  current: HTMLElement | null
}

/**
 * Public API for the scroll-reveal headline component.
 */
interface Props {
  children?: string
  scrollContainerRef?: ScrollContainerRef
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
  rotationEnd?: string
  wordAnimationEnd?: string
}

const props = withDefaults(defineProps<Props>(), {
  children: '',
  scrollContainerRef: undefined,
  enableBlur: true,
  baseOpacity: 0.1,
  baseRotation: 0,
  blurStrength: 4,
  containerClassName: '',
  textClassName: '',
  rotationEnd: 'bottom bottom',
  wordAnimationEnd: 'bottom bottom',
})

gsap.registerPlugin(ScrollTrigger)

const BLUR_FILTER_TEMPLATE = 'blur(%spx)'
const CLEAR_FILTER = 'blur(0px)'
const TEXT_WILL_CHANGE = 'opacity, filter'
const ROTATION_ORIGIN = '0% 50%'
const ROTATION_START = 'top bottom'
const WORD_REVEAL_START = 'top bottom-=20%'
const WORD_REVEAL_STAGGER = 0.05

const containerRef = ref<HTMLElement | null>(null)
const wordRefs = useTemplateRefsList<HTMLElement>()
let animationContext: gsap.Context | null = null
let initializationVersion = 0

const splitText = computed(() => {
  return props.children.split(/(\s+)/).map((text, index) => ({
    text,
    isWhitespace: /^\s+$/.test(text),
    key: `${text}-${index}`,
  }))
})

/**
 * Resolves the ScrollTrigger scroller target. Defaults to the window.
 */
function resolveScroller(): HTMLElement | Window {
  const customScroller = props.scrollContainerRef?.current
  return customScroller ?? window
}

/**
 * Returns the rendered word elements in template order.
 */
function resolveWordElements() {
  return wordRefs.value.filter((element): element is HTMLElement => Boolean(element))
}

/**
 * Builds a CSS blur value from the configured blur strength.
 */
function createBlurFilter(blurStrength: number) {
  return BLUR_FILTER_TEMPLATE.replace('%s', String(blurStrength))
}

/**
 * Reverts all GSAP state for the component before rebuilding animations.
 */
function resetAnimation() {
  initializationVersion += 1
  animationContext?.revert()
  animationContext = null
}

/**
 * Recomputes ScrollTrigger positions after layout-affecting changes such as
 * font loading, browser restore, or late media sizing.
 */
function refreshScrollTriggers() {
  if (!import.meta.client)
    return

  ScrollTrigger.refresh()
}

/**
 * Waits until Vue and the browser have produced a stable text layout.
 */
async function waitForStableLayout(version: number) {
  await nextTick()

  if (document.fonts?.ready) {
    await document.fonts.ready
  }

  return version === initializationVersion
}

/**
 * Applies the initial visual state before scroll-driven interpolation begins.
 */
function setInitialAnimationState(container: HTMLElement, wordElements: HTMLElement[]) {
  gsap.set(container, {
    rotate: props.baseRotation,
    transformOrigin: ROTATION_ORIGIN,
  })

  gsap.set(wordElements, {
    opacity: props.baseOpacity,
    filter: props.enableBlur ? createBlurFilter(props.blurStrength) : CLEAR_FILTER,
    willChange: TEXT_WILL_CHANGE,
  })
}

/**
 * Creates the rotation tween for the container block.
 */
function createRotationTween(container: HTMLElement, scroller: HTMLElement | Window) {
  gsap.to(container, {
    ease: 'none',
    rotate: 0,
    scrollTrigger: {
      trigger: container,
      scroller,
      start: ROTATION_START,
      end: props.rotationEnd,
      scrub: true,
      invalidateOnRefresh: true,
    },
  })
}

/**
 * Creates the word opacity tween.
 */
function createOpacityTween(container: HTMLElement, wordElements: HTMLElement[], scroller: HTMLElement | Window) {
  gsap.to(wordElements, {
    ease: 'none',
    opacity: 1,
    stagger: WORD_REVEAL_STAGGER,
    scrollTrigger: {
      trigger: container,
      scroller,
      start: WORD_REVEAL_START,
      end: props.wordAnimationEnd,
      scrub: true,
      invalidateOnRefresh: true,
    },
  })
}

/**
 * Creates the optional blur tween for the rendered words.
 */
function createBlurTween(container: HTMLElement, wordElements: HTMLElement[], scroller: HTMLElement | Window) {
  if (!props.enableBlur)
    return

  gsap.to(wordElements, {
    ease: 'none',
    filter: CLEAR_FILTER,
    stagger: WORD_REVEAL_STAGGER,
    scrollTrigger: {
      trigger: container,
      scroller,
      start: WORD_REVEAL_START,
      end: props.wordAnimationEnd,
      scrub: true,
      invalidateOnRefresh: true,
    },
  })
}

/**
 * Creates the GSAP/ScrollTrigger timelines for the current rendered words.
 */
async function initializeAnimation() {
  if (!import.meta.client)
    return

  const currentVersion = initializationVersion + 1
  initializationVersion = currentVersion

  const isStillCurrent = await waitForStableLayout(currentVersion)
  if (!isStillCurrent)
    return

  const container = containerRef.value
  const wordElements = resolveWordElements()
  if (!container)
    return
  if (!wordElements.length)
    return

  const scroller = resolveScroller()
  resetAnimation()

  animationContext = gsap.context(() => {
    setInitialAnimationState(container, wordElements)
    createRotationTween(container, scroller)
    createOpacityTween(container, wordElements, scroller)
    createBlurTween(container, wordElements, scroller)
  }, container)

  refreshScrollTriggers()
}

useEventListener(import.meta.client ? window : null, 'load', refreshScrollTriggers, { once: true })
useEventListener(import.meta.client ? window : null, 'pageshow', refreshScrollTriggers)

onUnmounted(() => {
  resetAnimation()
})

watch(
  [
    () => props.children,
    () => props.scrollContainerRef?.current,
    () => props.enableBlur,
    () => props.baseOpacity,
    () => props.baseRotation,
    () => props.blurStrength,
    () => props.rotationEnd,
    () => props.wordAnimationEnd,
  ],
  () => {
    initializeAnimation()
  },
  { flush: 'post', immediate: true },
)
</script>

<template>
  <h2 ref="containerRef" :class="containerClassName">
    <span :class="textClassName">
      <template v-for="word in splitText" :key="word.key">
        <span v-if="!word.isWhitespace" :ref="wordRefs.set" class="inline-block">{{ word.text }}</span>
        <span v-else>{{ word.text }}</span>
      </template>
    </span>
  </h2>
</template>
