<script setup lang="ts">
import { useRafFn, useResizeObserver } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    speed?: number
    direction?: 'left' | 'right' | 'up' | 'down'
    logoHeight?: number
    gap?: number
    pauseOnHover?: boolean
    hoverSpeed?: number
    fadeOut?: boolean
    fadeOutColor?: string
    scaleOnHover?: boolean
    ariaLabel?: string
    class?: string
  }>(),
  {
    speed: 120,
    direction: 'left',
    logoHeight: 28,
    gap: 32,
    pauseOnHover: false,
    hoverSpeed: undefined,
    fadeOut: false,
    fadeOutColor: undefined,
    scaleOnHover: false,
    ariaLabel: 'Logo marquee',
    class: '',
  },
)

const PLAYBACK_SMOOTH_TAU = 0.22
const MIN_COPIES = 2
const COPY_HEADROOM = 2

const containerRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const seqRef = ref<HTMLElement | null>(null)

const seqWidth = ref(0)
const seqHeight = ref(0)
const copyCount = ref(MIN_COPIES)
const isHovered = ref(false)
const marqueeAnimation = ref<Animation | null>(null)
const measureFrameId = ref<number | null>(null)

const isVertical = computed(() => props.direction === 'up' || props.direction === 'down')

const effectiveHoverSpeed = computed(() => {
  if (props.hoverSpeed !== undefined)
    return props.hoverSpeed
  if (props.pauseOnHover)
    return 0
  return undefined
})

const baseVelocity = computed(() => {
  const magnitude = Math.abs(props.speed)
  let directionMultiplier: number

  if (isVertical.value) {
    directionMultiplier = props.direction === 'up' ? 1 : -1
  }
  else {
    directionMultiplier = props.direction === 'left' ? 1 : -1
  }

  const speedMultiplier = props.speed < 0 ? -1 : 1

  return magnitude * directionMultiplier * speedMultiplier
})

const targetVelocity = computed(() => {
  if (isHovered.value && effectiveHoverSpeed.value !== undefined)
    return effectiveHoverSpeed.value

  return baseVelocity.value
})

const targetPlaybackRate = computed(() => {
  const sourceSpeed = Math.abs(baseVelocity.value)

  if (!sourceSpeed)
    return 0

  return Math.abs(targetVelocity.value) / sourceSpeed
})

const rootClassName = computed(() => {
  return [
    'relative overflow-hidden',
    isVertical.value ? 'inline-block h-full' : 'w-full',
    props.fadeOut ? 'logo-loop-fade' : '',
    props.scaleOnHover ? 'logo-loop-scale' : '',
    props.class ?? '',
  ].filter(Boolean).join(' ')
})

const cssVars = computed(() => ({
  '--ll-gap': `${props.gap}px`,
  '--ll-h': `${props.logoHeight}px`,
  ...(props.fadeOutColor ? { '--ll-fade': props.fadeOutColor } : {}),
}))

const copies = computed(() => Array.from({ length: copyCount.value }, (_, index) => index))

// Layout measurement
function measureSequence() {
  const containerWidth = containerRef.value?.clientWidth ?? 0
  const rect = seqRef.value?.getBoundingClientRect()
  const nextSeqWidth = rect?.width ?? 0
  const nextSeqHeight = rect?.height ?? 0

  if (isVertical.value) {
    const parentHeight = containerRef.value?.parentElement?.clientHeight ?? 0
    if (containerRef.value && parentHeight > 0) {
      containerRef.value.style.height = `${Math.ceil(parentHeight)}px`
    }

    if (nextSeqHeight > 0) {
      const normalizedSeqHeight = Math.ceil(nextSeqHeight)
      const viewportHeight = containerRef.value?.clientHeight ?? parentHeight ?? nextSeqHeight
      const nextCopyCount = Math.max(
        MIN_COPIES,
        Math.ceil(viewportHeight / nextSeqHeight) + COPY_HEADROOM,
      )

      if (seqHeight.value !== normalizedSeqHeight)
        seqHeight.value = normalizedSeqHeight

      if (copyCount.value !== nextCopyCount)
        copyCount.value = nextCopyCount
    }

    return
  }

  if (nextSeqWidth > 0) {
    const normalizedSeqWidth = Math.ceil(nextSeqWidth)
    const nextCopyCount = Math.max(
      MIN_COPIES,
      Math.ceil(containerWidth / nextSeqWidth) + COPY_HEADROOM,
    )

    if (seqWidth.value !== normalizedSeqWidth)
      seqWidth.value = normalizedSeqWidth

    if (copyCount.value !== nextCopyCount)
      copyCount.value = nextCopyCount
  }
}

function scheduleMeasure() {
  if (measureFrameId.value !== null)
    cancelAnimationFrame(measureFrameId.value)

  measureFrameId.value = requestAnimationFrame(() => {
    measureFrameId.value = null
    measureSequence()
  })
}

useResizeObserver(containerRef, scheduleMeasure)
useResizeObserver(seqRef, scheduleMeasure)

// Animation geometry
const animationDistance = computed(() => {
  return isVertical.value ? seqHeight.value : seqWidth.value
})

const animationDuration = computed(() => {
  const speed = Math.abs(baseVelocity.value)
  const distance = animationDistance.value

  if (!speed || !distance)
    return 0

  return (distance / speed) * 1000
})

const animationSignature = computed(() => {
  return [
    props.direction,
    animationDistance.value,
    animationDuration.value,
  ].join(':')
})

// Animation instance
function syncTrackAnimation() {
  const track = trackRef.value
  const distance = animationDistance.value
  const duration = animationDuration.value

  marqueeAnimation.value?.cancel()
  marqueeAnimation.value = null

  if (!track || !distance || !duration)
    return

  const keyframes = isVertical.value
    ? [
        { transform: 'translate3d(0, 0, 0)' },
        { transform: `translate3d(0, ${baseVelocity.value >= 0 ? -distance : distance}px, 0)` },
      ]
    : [
        { transform: 'translate3d(0, 0, 0)' },
        { transform: `translate3d(${baseVelocity.value >= 0 ? -distance : distance}px, 0, 0)` },
      ]

  const animation = track.animate(keyframes, {
    duration,
    iterations: Number.POSITIVE_INFINITY,
    easing: 'linear',
    fill: 'both',
  })

  animation.playbackRate = targetPlaybackRate.value
  marqueeAnimation.value = animation
}

function handleEnter() {
  if (effectiveHoverSpeed.value !== undefined)
    isHovered.value = true
}

function handleLeave() {
  if (effectiveHoverSpeed.value !== undefined)
    isHovered.value = false
}

const { pause: pausePlaybackSmoothing, resume: resumePlaybackSmoothing } = useRafFn(({ delta }) => {
  const animation = marqueeAnimation.value

  if (!animation)
    return

  const currentRate = animation.playbackRate
  const deltaSeconds = Math.max(delta, 0) / 1000
  const easing = 1 - Math.exp(-deltaSeconds / PLAYBACK_SMOOTH_TAU)
  const nextRate = currentRate + ((targetPlaybackRate.value - currentRate) * easing)

  animation.playbackRate = Math.abs(nextRate) < 0.0001 ? 0 : nextRate

  if (Math.abs(animation.playbackRate - targetPlaybackRate.value) < 0.001)
    pausePlaybackSmoothing()
}, { immediate: false })

// Hover / playback control
function syncPlaybackRate() {
  if (marqueeAnimation.value)
    resumePlaybackSmoothing()
}

function cleanupAnimation() {
  if (measureFrameId.value !== null)
    cancelAnimationFrame(measureFrameId.value)

  pausePlaybackSmoothing()
  marqueeAnimation.value?.cancel()
}

// Reactivity wiring
watch(animationSignature, syncTrackAnimation)
watch(targetPlaybackRate, syncPlaybackRate)
watch(() => [props.gap, props.logoHeight, props.direction], scheduleMeasure)

// Lifecycle
onMounted(() => {
  scheduleMeasure()
})

onBeforeUnmount(() => {
  cleanupAnimation()
})
</script>

<template>
  <div
    ref="containerRef"
    :class="rootClassName"
    :style="cssVars"
    role="region"
    :aria-label="ariaLabel"
  >
    <div
      ref="trackRef"
      class="will-change-transform flex select-none relative z-0"
      :class="isVertical ? 'flex-col h-max w-full' : 'w-max'"
      @mouseenter="handleEnter"
      @mouseleave="handleLeave"
    >
      <div
        v-for="copyIndex in copies"
        :key="copyIndex"
        :ref="(element) => { if (copyIndex === 0) seqRef = element as HTMLElement }"
        class="flex shrink-0 items-center"
        :class="isVertical ? 'flex-col' : ''"
        :style="{
          gap: `${gap}px`,
          fontSize: `${logoHeight}px`,
          lineHeight: '1',
          [isVertical ? 'paddingBottom' : 'paddingRight']: `${gap}px`,
        }"
        :aria-hidden="copyIndex > 0 || undefined"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-loop-fade::before,
.logo-loop-fade::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: clamp(24px, 8%, 120px);
  pointer-events: none;
  z-index: 10;
}

.logo-loop-fade::before {
  left: 0;
  background: linear-gradient(to right, var(--ll-fade, var(--background)) 0%, transparent 100%);
}

.logo-loop-fade::after {
  right: 0;
  background: linear-gradient(to left, var(--ll-fade, var(--background)) 0%, transparent 100%);
}

.logo-loop-scale :deep(li:hover > *) {
  transform: scale(1.08);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
