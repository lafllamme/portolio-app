<script setup lang="ts">
import { useElementVisibility, usePreferredReducedMotion } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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

const rootRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const isImageReady = ref(false)
const isAnimating = ref(false)
const isInViewport = ref(false)
const hasPlayedOnce = ref(false)
const hasActivated = ref(false)
const prefersReducedMotion = usePreferredReducedMotion()
const isElementVisible = useElementVisibility(rootRef, {
  threshold: props.threshold,
})

const frameInAnimationConfig = {
  durationMs: 1400,
  easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
}

const shouldRenderSurface = computed(() =>
  !isImageReady.value || (!isAnimating.value && !hasActivated.value),
)

const preRevealSurfaceClass = computed(() => {
  if (props.surfaceVariant === 'soft-surface')
    return 'bg-surface'

  if (props.surfaceVariant === 'shimmer-surface')
    return 'bg-surface'

  return 'bg-surface'
})

let runId = 0
let timeoutIds: number[] = []

function clearScheduledWork() {
  for (const timeoutId of timeoutIds)
    window.clearTimeout(timeoutId)

  timeoutIds = []
}

function finalizeReveal() {
  clearScheduledWork()
  isAnimating.value = false
  hasPlayedOnce.value = true
  hasActivated.value = true
}

function resetReveal() {
  runId += 1
  clearScheduledWork()
  isAnimating.value = false
  hasPlayedOnce.value = false
  hasActivated.value = false
  isImageReady.value = false
}

function syncImageReadyState() {
  const imageElement = imageRef.value
  if (!imageElement)
    return

  if (!imageElement.complete || imageElement.naturalWidth <= 0)
    return

  isImageReady.value = true
}

function handleImageLoad() {
  isImageReady.value = true
}

const revealLayerStyle = computed(() => {
  return {
    transitionTimingFunction: frameInAnimationConfig.easing,
    transitionDelay: '0ms',
    clipPath: hasActivated.value
      ? 'inset(0% 0% 0% 0%)'
      : 'inset(10% 8% 10% 8%)',
    transitionDuration: `${frameInAnimationConfig.durationMs}ms`,
    transitionProperty: 'clip-path',
  }
})

const skeletonLayerStyle = computed(() => ({
  clipPath: hasActivated.value
    ? 'inset(0% 0% 0% 0%)'
    : 'inset(10% 8% 10% 8%)',
}))

watch(
  () => props.src,
  async () => {
    resetReveal()
    await nextTick()
    syncImageReadyState()
  },
)

watch(imageRef, async () => {
  await nextTick()
  syncImageReadyState()
})

watch(
  [isImageReady, isElementVisible],
  ([nextImageReady, nextElementVisible]) => {
    isInViewport.value = nextElementVisible

    if (!import.meta.client || !nextImageReady || !nextElementVisible || hasPlayedOnce.value || isAnimating.value)
      return

    if (prefersReducedMotion.value === 'reduce') {
      finalizeReveal()
      return
    }

    const nextRunId = runId + 1
    runId = nextRunId
    clearScheduledWork()
    isAnimating.value = true
    hasPlayedOnce.value = true
    hasActivated.value = false

    requestAnimationFrame(() => {
      if (runId !== nextRunId)
        return

      requestAnimationFrame(() => {
        if (runId !== nextRunId)
          return

        hasActivated.value = true

        const totalDurationMs = frameInAnimationConfig.durationMs
        const timeoutId = window.setTimeout(() => {
          if (runId !== nextRunId)
            return

          isAnimating.value = false
        }, totalDurationMs)

        timeoutIds.push(timeoutId)
      })
    })
  },
  {
    immediate: true,
  },
)

onMounted(async () => {
  await nextTick()
  syncImageReadyState()
})

onBeforeUnmount(() => {
  runId += 1
  clearScheduledWork()
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
