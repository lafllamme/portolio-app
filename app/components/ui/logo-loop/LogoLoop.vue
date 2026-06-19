<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

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

const SMOOTH_TAU = 0.25
const MIN_COPIES = 2
const COPY_HEADROOM = 2

const containerRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const seqRef = ref<HTMLElement | null>(null)

const seqWidth = ref(0)
const seqHeight = ref(0)
const copyCount = ref(MIN_COPIES)
const isHovered = ref(false)

const isVertical = computed(() => props.direction === 'up' || props.direction === 'down')

const effectiveHoverSpeed = computed(() => {
  if (props.hoverSpeed !== undefined)
    return props.hoverSpeed
  if (props.pauseOnHover)
    return 0
  return undefined
})

const targetVelocity = computed(() => {
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

function updateDimensions() {
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
      seqHeight.value = Math.ceil(nextSeqHeight)
      const viewportHeight = containerRef.value?.clientHeight ?? parentHeight ?? nextSeqHeight
      copyCount.value = Math.max(
        MIN_COPIES,
        Math.ceil(viewportHeight / nextSeqHeight) + COPY_HEADROOM,
      )
    }

    return
  }

  if (nextSeqWidth > 0) {
    seqWidth.value = Math.ceil(nextSeqWidth)
    copyCount.value = Math.max(
      MIN_COPIES,
      Math.ceil(containerWidth / nextSeqWidth) + COPY_HEADROOM,
    )
  }
}

useResizeObserver(containerRef, updateDimensions)
useResizeObserver(seqRef, updateDimensions)

let animationFrameId = 0
let lastTimestamp: number | null = null
let offset = 0
let velocity = 0

function animate(timestamp: number) {
  if (lastTimestamp === null)
    lastTimestamp = timestamp

  const deltaSeconds = Math.max(0, timestamp - lastTimestamp) / 1000
  lastTimestamp = timestamp

  const nextTarget = isHovered.value && effectiveHoverSpeed.value !== undefined
    ? effectiveHoverSpeed.value
    : targetVelocity.value

  const easing = 1 - Math.exp(-deltaSeconds / SMOOTH_TAU)
  velocity += (nextTarget - velocity) * easing

  const sequenceSize = isVertical.value ? seqHeight.value : seqWidth.value

  if (sequenceSize > 0 && trackRef.value) {
    let nextOffset = offset + (velocity * deltaSeconds)
    nextOffset = ((nextOffset % sequenceSize) + sequenceSize) % sequenceSize
    offset = nextOffset

    trackRef.value.style.transform = isVertical.value
      ? `translate3d(0, ${-offset}px, 0)`
      : `translate3d(${-offset}px, 0, 0)`
  }

  animationFrameId = requestAnimationFrame(animate)
}

function handleEnter() {
  if (effectiveHoverSpeed.value !== undefined) {
    isHovered.value = true
  }
}

function handleLeave() {
  if (effectiveHoverSpeed.value !== undefined) {
    isHovered.value = false
  }
}

onMounted(() => {
  updateDimensions()
  animationFrameId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
})

watch(
  () => [props.speed, props.direction, props.gap, props.logoHeight],
  () => updateDimensions(),
)
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
