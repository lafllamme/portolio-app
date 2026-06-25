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
  previewMode?: 'none' | 'blurred'
  rootMargin?: string
  surfaceDelayMs?: number
  surfaceVariant?: 'default' | 'soft-surface' | 'shimmer-surface' | 'transparent' | 'cinematic-stage'
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
  previewMode: 'none',
  rootMargin: '0px',
  surfaceDelayMs: 0,
  surfaceVariant: 'default',
})

const FRAME_INSET = 'inset(10% 8% 10% 8%)'
const FULL_INSET = 'inset(0% 0% 0% 0%)'

const rootRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const previewImageRef = ref<HTMLImageElement | null>(null)
const revealPhase = ref<'loading' | 'ready' | 'animating' | 'done'>('loading')
const isFrameExpanded = ref(false)
const isFullImageReady = ref(false)
const isPreviewImageReady = ref(false)
const isSurfaceVisible = ref(props.surfaceDelayMs === 0)
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

const shouldRenderPreview = computed(() =>
  props.previewMode === 'blurred',
)

const previewImageClass = computed(() =>
  [
    imageLayoutClass.value,
    imageLayoutClass.value.includes('object-cover object-center') ? '' : 'object-cover object-center',
    props.imageClass,
    isPreviewImageReady.value
      ? (isFullImageReady.value ? 'opacity-0' : 'opacity-100')
      : 'opacity-0',
  ].filter(Boolean).join(' '),
)

const fullImageClass = computed(() =>
  [
    imageLayoutClass.value,
    props.imageClass,
    isFullImageReady.value ? 'opacity-100' : 'opacity-0',
  ].filter(Boolean).join(' '),
)

const surfaceOpacityClass = computed(() => {
  if (!isSurfaceVisible.value)
    return 'pointer-events-none opacity-0'

  if (isFullImageReady.value)
    return 'pointer-events-none opacity-0'

  if (isPreviewImageReady.value)
    return 'opacity-18'

  return 'opacity-100'
})

const surfaceLayerStyle = computed(() => {
  const style: Record<string, string> = {}

  if (shouldClipSkeleton.value)
    style.clipPath = FRAME_INSET

  if (props.surfaceVariant === 'cinematic-stage') {
    style.background = [
      'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 24%)',
      'radial-gradient(circle at 50% 34%, rgba(63,70,80,0.7) 0%, rgba(30,34,41,0.92) 48%, rgba(9,10,14,1) 100%)',
    ].join(', ')
    style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -48px 80px rgba(0,0,0,0.22)'
  }

  return style
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

const preRevealSurfaceClass = computed(() => {
  if (props.surfaceVariant === 'soft-surface')
    return 'bg-surface/88'

  if (props.surfaceVariant === 'cinematic-stage')
    return 'bg-surface'

  if (props.surfaceVariant === 'transparent')
    return 'bg-transparent'

  return 'bg-surface'
})

const { start: scheduleSurfaceReveal, stop: stopSurfaceReveal } = useTimeoutFn(() => {
  if (!isFullImageReady.value && !isPreviewImageReady.value)
    isSurfaceVisible.value = true
}, props.surfaceDelayMs, {
  immediate: false,
})

const { start: scheduleRevealCompletion, stop: stopRevealCompletion } = useTimeoutFn(() => {
  revealPhase.value = 'done'
}, activeRevealConfig.value.durationMs, {
  immediate: false,
})

let outerFrameId: number | null = null
let innerFrameId: number | null = null

function cancelAnimationFrames() {
  if (outerFrameId !== null)
    cancelAnimationFrame(outerFrameId)

  if (innerFrameId !== null)
    cancelAnimationFrame(innerFrameId)

  outerFrameId = null
  innerFrameId = null
}

function resetReveal() {
  stopSurfaceReveal()
  stopRevealCompletion()
  cancelAnimationFrames()
  revealPhase.value = 'loading'
  isFrameExpanded.value = false
  isFullImageReady.value = false
  isPreviewImageReady.value = false
  isSurfaceVisible.value = props.surfaceDelayMs === 0

  if (props.surfaceDelayMs > 0)
    scheduleSurfaceReveal()
}

function markVisualReady() {
  if (revealPhase.value === 'loading')
    revealPhase.value = 'ready'
}

function markFullImageReady() {
  stopSurfaceReveal()
  isFullImageReady.value = true
  markVisualReady()
}

function markPreviewImageReady() {
  stopSurfaceReveal()
  isPreviewImageReady.value = true
  markVisualReady()
}

function handleImageLoad() {
  markFullImageReady()
}

function handlePreviewImageLoad() {
  markPreviewImageReady()
}

function finishRevealImmediately() {
  stopRevealCompletion()
  cancelAnimationFrames()
  revealPhase.value = 'done'
  isFrameExpanded.value = true
}

function startReveal() {
  if (revealPhase.value !== 'ready')
    return

  if (prefersReducedMotion.value === 'reduce') {
    finishRevealImmediately()
    return
  }

  revealPhase.value = 'animating'
  outerFrameId = requestAnimationFrame(() => {
    outerFrameId = null
    innerFrameId = requestAnimationFrame(() => {
      innerFrameId = null
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
    markFullImageReady()
})

watchPostEffect(() => {
  if (!shouldRenderPreview.value)
    return

  void props.src
  const imageElement = previewImageRef.value
  if (!imageElement)
    return

  if (imageElement.complete && imageElement.naturalWidth > 0)
    markPreviewImageReady()
})

onBeforeUnmount(() => {
  stopSurfaceReveal()
  stopRevealCompletion()
  cancelAnimationFrames()
})
</script>

<template>
  <div
    ref="rootRef"
    class="rounded-md relative overflow-hidden"
    :class="[rootLayoutClass, containerClass]"
  >
    <div
      class="transition-opacity duration-700 ease-out inset-0 absolute z-[1]"
      :class="[
        preRevealSurfaceClass,
        surfaceOpacityClass,
      ]"
      :style="surfaceLayerStyle"
      aria-hidden="true"
    />

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
        <NuxtImg
          v-if="shouldRenderPreview"
          v-slot="{ src: previewSrc, imgAttrs: previewImgAttrs }"
          :src="src"
          width="48"
          quality="20"
          :fit="fit"
          :custom="true"
        >
          <img
            ref="previewImageRef"
            v-bind="previewImgAttrs"
            :src="previewSrc"
            :alt="alt"
            loading="eager"
            crossorigin="anonymous"
            class="scale-[1.04] transition-opacity duration-700 ease-out inset-0 absolute blur-[18px] grayscale"
            :class="previewImageClass"
            decoding="sync"
            @load="handlePreviewImageLoad"
          >
        </NuxtImg>
        <img
          ref="imageRef"
          v-bind="imgAttrs"
          :src="resolvedSrc"
          :alt="alt"
          :loading="loading"
          crossorigin="anonymous"
          class="transition-opacity duration-700 ease-out"
          :class="fullImageClass"
          decoding="async"
          @load="handleImageLoad"
        >
      </div>
    </NuxtImg>
  </div>
</template>
