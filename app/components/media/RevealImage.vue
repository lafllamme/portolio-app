<script setup lang="ts">
import { useElementVisibility, usePreferredReducedMotion, useTimeoutFn } from '@vueuse/core'
import { computed, onBeforeUnmount, ref, watch, watchPostEffect } from 'vue'
import { NuxtImg } from '#components'

interface Props {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  sizes?: string
  densities?: string
  quality?: number | string
  format?: string
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside' | string
  loading?: 'lazy' | 'eager'
  threshold?: number
  containerClass?: string
  imageClass?: string
  layoutMode?: 'fill' | 'intrinsic'
  revealMode?: 'frame-in' | 'grain-dissolve'
  entranceMode?: 'default' | 'scale-reveal'
  rootMargin?: string
  surfaceVariant?: 'default' | 'soft-surface' | 'shimmer-surface' | 'transparent'
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  height: undefined,
  sizes: undefined,
  densities: undefined,
  quality: undefined,
  format: undefined,
  fit: 'cover',
  loading: 'lazy',
  threshold: 0.05,
  containerClass: '',
  imageClass: '',
  layoutMode: 'fill',
  revealMode: 'frame-in',
  entranceMode: 'default',
  rootMargin: '0px',
  surfaceVariant: 'default',
})

const FRAME_INSET = 'inset(10% 8% 10% 8%)'
const FULL_INSET = 'inset(0% 0% 0% 0%)'
const SCALE_REVEAL_START_DELAY_MS = 80
const SCALE_REVEAL_DURATION_MS = 650

const rootRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const revealPhase = ref<'loading' | 'ready' | 'animating' | 'image-reveal' | 'done'>('loading')
const isFrameExpanded = ref(false)
const isImageVisible = ref(false)
const isImageRevealActive = ref(false)
const prefersReducedMotion = usePreferredReducedMotion()
const isElementVisible = useElementVisibility(rootRef, {
  threshold: props.threshold,
  rootMargin: props.rootMargin,
})

const revealConfigByMode = {
  'frame-in': {
    durationMs: 1400,
    easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
  },
  'grain-dissolve': {
    durationMs: 1500,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
} as const

const activeRevealConfig = computed(() => revealConfigByMode[props.revealMode])
const shouldUseScaleRevealEntrance = computed(() =>
  props.entranceMode === 'scale-reveal' && props.revealMode === 'frame-in',
)

const shouldClipSkeleton = computed(() =>
  props.revealMode === 'frame-in',
)

const grainRevealTransform = computed(() =>
  isFrameExpanded.value ? 'scale(1)' : 'scale(1.04)',
)

const grainRevealOpacity = computed(() =>
  isFrameExpanded.value ? '1' : '0',
)

const grainRevealFilter = computed(() =>
  isFrameExpanded.value ? 'blur(0px) grayscale(0)' : 'blur(24px) grayscale(1)',
)

const shouldRenderSurface = computed(() => {
  if (shouldUseScaleRevealEntrance.value)
    return revealPhase.value === 'loading' || revealPhase.value === 'ready'

  return revealPhase.value === 'loading' || revealPhase.value === 'ready'
})

const revealWillChangeClass = computed(() =>
  props.revealMode === 'frame-in'
    ? 'will-change-[clip-path]'
    : 'will-change-[opacity,transform,filter]',
)

const rootLayoutClass = computed(() =>
  props.layoutMode === 'fill' ? 'h-full w-full' : 'w-full',
)

const revealPositionClass = computed(() =>
  props.layoutMode === 'fill' ? 'absolute inset-0 z-[2]' : 'relative z-[2] w-full',
)

const imageLayoutClass = computed(() =>
  props.layoutMode === 'fill'
    ? 'h-full w-full object-cover object-center'
    : 'block h-auto w-full object-cover object-center',
)

const surfaceOpacityClass = computed(() =>
  shouldRenderSurface.value ? 'opacity-100' : 'pointer-events-none opacity-0',
)

const skeletonLayerStyle = computed(() => {
  if (!shouldClipSkeleton.value)
    return {}

  return {
    clipPath: FRAME_INSET,
  }
})

const surfaceRevealStyle = computed(() => {
  if (!shouldUseScaleRevealEntrance.value)
    return skeletonLayerStyle.value

  return {
    clipPath: FRAME_INSET,
    transition: 'opacity 220ms cubic-bezier(0.22, 1, 0.36, 1)',
  }
})

const revealLayerStyle = computed(() => {
  if (props.revealMode === 'grain-dissolve') {
    return {
      transitionTimingFunction: activeRevealConfig.value.easing,
      transitionDelay: '0ms',
      opacity: grainRevealOpacity.value,
      filter: grainRevealFilter.value,
      transform: grainRevealTransform.value,
      transitionDuration: `${activeRevealConfig.value.durationMs}ms`,
      transitionProperty: 'opacity, filter, transform',
    }
  }

  return {
    transitionTimingFunction: activeRevealConfig.value.easing,
    transitionDelay: '0ms',
    clipPath: isFrameExpanded.value ? FULL_INSET : FRAME_INSET,
    transitionDuration: `${activeRevealConfig.value.durationMs}ms`,
    transitionProperty: 'clip-path',
  }
})

const imageRevealStyle = computed(() => {
  if (!shouldUseScaleRevealEntrance.value)
    return {}

  return {
    opacity: isImageVisible.value ? (isImageRevealActive.value ? '1' : '0.3') : '0',
    clipPath: isImageRevealActive.value
      ? 'inset(0% 0% 0% 0% round 8px)'
      : 'inset(6% 6% 6% 6% round 6px)',
    transform: isImageRevealActive.value ? 'scale(1)' : 'scale(1.06)',
    transition: `clip-path ${SCALE_REVEAL_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${SCALE_REVEAL_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease`,
  }
})

const preRevealSurfaceClass = computed(() => {
  if (props.surfaceVariant === 'transparent')
    return 'bg-transparent'

  return 'bg-surface'
})

const { start: scheduleRevealCompletion, stop: stopRevealCompletion } = useTimeoutFn(() => {
  revealPhase.value = 'done'
}, activeRevealConfig.value.durationMs, {
  immediate: false,
})

let outerFrameId: number | null = null
let innerFrameId: number | null = null
let imageRevealFrameId: number | null = null
let imageRevealTimeoutId: ReturnType<typeof setTimeout> | null = null

function cancelAnimationFrames() {
  if (outerFrameId !== null)
    cancelAnimationFrame(outerFrameId)

  if (innerFrameId !== null)
    cancelAnimationFrame(innerFrameId)

  if (imageRevealFrameId !== null)
    cancelAnimationFrame(imageRevealFrameId)

  outerFrameId = null
  innerFrameId = null
  imageRevealFrameId = null
}

function cancelRevealTimers() {
  if (imageRevealTimeoutId !== null)
    clearTimeout(imageRevealTimeoutId)

  imageRevealTimeoutId = null
}

function resetReveal() {
  stopRevealCompletion()
  cancelAnimationFrames()
  cancelRevealTimers()
  revealPhase.value = 'loading'
  isFrameExpanded.value = false
  isImageVisible.value = false
  isImageRevealActive.value = false
}

function markImageReady() {
  if (revealPhase.value === 'loading')
    revealPhase.value = 'ready'
}

function handleImageLoad() {
  markImageReady()
}

function finishRevealImmediately() {
  stopRevealCompletion()
  cancelAnimationFrames()
  cancelRevealTimers()
  revealPhase.value = 'done'
  isFrameExpanded.value = true
  isImageVisible.value = true
  isImageRevealActive.value = true
}

function startReveal() {
  if (revealPhase.value !== 'ready')
    return

  if (prefersReducedMotion.value === 'reduce') {
    finishRevealImmediately()
    return
  }

  revealPhase.value = shouldUseScaleRevealEntrance.value ? 'image-reveal' : 'animating'
  outerFrameId = requestAnimationFrame(() => {
    outerFrameId = null
    innerFrameId = requestAnimationFrame(() => {
      innerFrameId = null

      if (shouldUseScaleRevealEntrance.value) {
        isImageVisible.value = true
        imageRevealFrameId = requestAnimationFrame(() => {
          imageRevealFrameId = null
          isImageRevealActive.value = true
        })
        imageRevealTimeoutId = setTimeout(() => {
          imageRevealTimeoutId = null
          revealPhase.value = 'animating'
          isFrameExpanded.value = true
          scheduleRevealCompletion()
        }, SCALE_REVEAL_START_DELAY_MS)
        return
      }

      isFrameExpanded.value = true
      scheduleRevealCompletion()
    })
  })
}

const canStartReveal = computed(() =>
  revealPhase.value === 'ready' && isElementVisible.value,
)

watch(
  () => props.src,
  () => {
    resetReveal()
  },
  {
    immediate: false,
  },
)

watch(canStartReveal, (nextCanStartReveal) => {
  if (nextCanStartReveal)
    startReveal()
})

watchPostEffect(() => {
  void props.src
  const imageElement = imageRef.value
  if (!imageElement)
    return

  if (imageElement.complete && imageElement.naturalWidth > 0)
    markImageReady()
})

onBeforeUnmount(() => {
  stopRevealCompletion()
  cancelAnimationFrames()
  cancelRevealTimers()
})
</script>

<template>
  <div
    ref="rootRef"
    class="rounded-md relative overflow-hidden"
    :class="[rootLayoutClass, containerClass]"
  >
    <div
      class="inset-0 absolute z-[1]"
      :class="[
        preRevealSurfaceClass,
        surfaceOpacityClass,
      ]"
      :style="surfaceRevealStyle"
      aria-hidden="true"
    >
      <div
        v-if="shouldUseScaleRevealEntrance"
        class="bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_45%,rgba(255,255,255,0)_100%)] inset-0 absolute animate-pulse"
      />
    </div>

    <NuxtImg
      v-slot="{ src: resolvedSrc, imgAttrs }"
      :src="src"
      :width="props.width"
      :height="props.height"
      :sizes="sizes"
      :densities="densities"
      :quality="quality"
      :format="format"
      :fit="fit"
      :custom="true"
    >
      <div
        :class="[revealPositionClass, revealWillChangeClass]"
        :style="revealLayerStyle"
      >
        <img
          ref="imageRef"
          v-bind="imgAttrs"
          :src="resolvedSrc"
          :alt="alt"
          :loading="loading"
          crossorigin="anonymous"
          :class="[imageLayoutClass, imageClass]"
          :style="imageRevealStyle"
          decoding="async"
          @load="handleImageLoad"
        >
      </div>
    </NuxtImg>
  </div>
</template>
