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
  surfaceVariant?: 'default' | 'soft-surface' | 'shimmer-surface'
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
  surfaceVariant: 'default',
})

const FRAME_INSET = 'inset(10% 8% 10% 8%)'
const FULL_INSET = 'inset(0% 0% 0% 0%)'

const rootRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const revealPhase = ref<'loading' | 'ready' | 'animating' | 'done'>('loading')
const isFrameExpanded = ref(false)
const prefersReducedMotion = usePreferredReducedMotion()
const isElementVisible = useElementVisibility(rootRef, {
  threshold: props.threshold,
})

const frameInAnimationConfig = {
  durationMs: 1400,
  easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
}

const shouldRenderSurface = computed(() =>
  revealPhase.value === 'loading' || revealPhase.value === 'ready',
)

const preRevealSurfaceClass = computed(() => 'bg-surface')

const { start: scheduleRevealCompletion, stop: stopRevealCompletion } = useTimeoutFn(() => {
  revealPhase.value = 'done'
}, frameInAnimationConfig.durationMs, {
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
  stopRevealCompletion()
  cancelAnimationFrames()
  revealPhase.value = 'loading'
  isFrameExpanded.value = false
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

const revealLayerStyle = computed(() => {
  return {
    transitionTimingFunction: frameInAnimationConfig.easing,
    transitionDelay: '0ms',
    clipPath: isFrameExpanded.value ? FULL_INSET : FRAME_INSET,
    transitionDuration: `${frameInAnimationConfig.durationMs}ms`,
    transitionProperty: 'clip-path',
  }
})

const skeletonLayerStyle = computed(() => ({
  clipPath: FRAME_INSET,
}))

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
})
</script>

<template>
  <div
    ref="rootRef"
    class="rounded-md h-full w-full relative overflow-hidden"
    :class="containerClass"
  >
    <div
      class="inset-0 absolute z-[1]"
      :class="[
        preRevealSurfaceClass,
        shouldRenderSurface ? 'opacity-100' : 'pointer-events-none opacity-0',
      ]"
      :style="skeletonLayerStyle"
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
        class="will-change-[clip-path] inset-0 absolute z-[2]"
        :style="revealLayerStyle"
      >
        <img
          ref="imageRef"
          v-bind="imgAttrs"
          :src="resolvedSrc"
          :alt="alt"
          :loading="loading"
          crossorigin="anonymous"
          class="h-full w-full object-cover object-center"
          :class="imageClass"
          decoding="async"
          @load="handleImageLoad"
        >
      </div>
    </NuxtImg>
  </div>
</template>
