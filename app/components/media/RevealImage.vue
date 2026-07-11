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
const SHELL_BAR_HEIGHT_PX = 80
const SHELL_HOLD_DURATION_MS = 180
const SHELL_GROW_DURATION_MS = 260
const SHELL_IMAGE_REVEAL_DELAY_MS = 160
const SCALE_REVEAL_DURATION_MS = 650

const rootRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const revealPhase = ref<'shell' | 'ready' | 'shell-grow' | 'image-reveal' | 'final-grow' | 'animating' | 'done'>('shell')
const isFrameExpanded = ref(false)
const isImageVisible = ref(false)
const isImageRevealActive = ref(false)
const isImageReady = ref(false)
const hasShellGrowCompleted = ref(false)
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
    return true

  return revealPhase.value === 'shell' || revealPhase.value === 'ready'
})

const shouldRenderShellOuter = computed(() =>
  shouldUseScaleRevealEntrance.value
  && (revealPhase.value === 'shell'
    || revealPhase.value === 'shell-grow'
    || revealPhase.value === 'ready'
    || revealPhase.value === 'image-reveal'
    || revealPhase.value === 'final-grow'
    || revealPhase.value === 'done'),
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
  props.fit === 'contain'
    ? props.layoutMode === 'fill'
      ? 'h-full w-full object-contain object-center'
      : 'block h-auto w-full object-contain object-center'
    : props.layoutMode === 'fill'
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
    transition: 'opacity 220ms cubic-bezier(0.22, 1, 0.36, 1)',
  }
})

const scaleRevealStageStyle = computed(() => {
  if (!shouldUseScaleRevealEntrance.value)
    return {}

  return {
    clipPath: FRAME_INSET,
  }
})

const shellGrowStyle = computed(() => {
  if (!shouldUseScaleRevealEntrance.value)
    return {}

  const height = revealPhase.value === 'shell'
    ? `${SHELL_BAR_HEIGHT_PX}px`
    : '100%'

  const transition = revealPhase.value === 'shell-grow' || revealPhase.value === 'image-reveal'
    ? `height ${SHELL_GROW_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
    : 'none'

  return {
    height,
    transition,
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

  if (shouldUseScaleRevealEntrance.value) {
    return {
      transitionTimingFunction: activeRevealConfig.value.easing,
      transitionDelay: '0ms',
      clipPath: isFrameExpanded.value ? FULL_INSET : FRAME_INSET,
      opacity: revealPhase.value === 'image-reveal' || revealPhase.value === 'final-grow' || revealPhase.value === 'done' ? '1' : '0',
      transitionDuration: revealPhase.value === 'final-grow' || revealPhase.value === 'done'
        ? `${activeRevealConfig.value.durationMs}ms`
        : '180ms',
      transitionProperty: revealPhase.value === 'final-grow' || revealPhase.value === 'done'
        ? 'clip-path, opacity'
        : 'opacity',
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
  revealPhase.value = 'shell'
  isFrameExpanded.value = false
  isImageVisible.value = false
  isImageRevealActive.value = false
  isImageReady.value = false
  hasShellGrowCompleted.value = false
}

function markImageReady() {
  if (shouldUseScaleRevealEntrance.value) {
    isImageReady.value = true
    if (prefersReducedMotion.value === 'reduce' && isElementVisible.value) {
      finishRevealImmediately()
      return
    }

    maybeStartScaleReveal()
    return
  }

  if (revealPhase.value === 'shell')
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
  isImageReady.value = true
  hasShellGrowCompleted.value = true
}

function maybeStartScaleReveal() {
  if (!shouldUseScaleRevealEntrance.value)
    return

  if (!isImageReady.value || !hasShellGrowCompleted.value)
    return

  if (revealPhase.value === 'image-reveal' || revealPhase.value === 'final-grow' || revealPhase.value === 'done')
    return

  revealPhase.value = 'image-reveal'
  isImageVisible.value = true
  imageRevealFrameId = requestAnimationFrame(() => {
    imageRevealFrameId = null
    isImageRevealActive.value = true
  })
  imageRevealTimeoutId = setTimeout(() => {
    imageRevealTimeoutId = null
    revealPhase.value = 'final-grow'
    isFrameExpanded.value = true
    scheduleRevealCompletion()
  }, SCALE_REVEAL_DURATION_MS)
}

function startReveal() {
  if (shouldUseScaleRevealEntrance.value) {
    if (revealPhase.value !== 'shell')
      return

    if (prefersReducedMotion.value === 'reduce') {
      if (isImageReady.value)
        finishRevealImmediately()
      return
    }

    imageRevealTimeoutId = setTimeout(() => {
      imageRevealTimeoutId = null
      revealPhase.value = 'shell-grow'
      outerFrameId = requestAnimationFrame(() => {
        outerFrameId = null
        innerFrameId = requestAnimationFrame(() => {
          innerFrameId = null
          imageRevealTimeoutId = setTimeout(() => {
            imageRevealTimeoutId = null
            hasShellGrowCompleted.value = true
            revealPhase.value = 'shell-grow'
            maybeStartScaleReveal()
          }, SHELL_IMAGE_REVEAL_DELAY_MS)
        })
      })
    }, SHELL_HOLD_DURATION_MS)
    return
  }

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
  shouldUseScaleRevealEntrance.value
    ? revealPhase.value === 'shell' && isElementVisible.value
    : revealPhase.value === 'ready' && isElementVisible.value,
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
      :class="surfaceOpacityClass"
      :style="surfaceRevealStyle"
      aria-hidden="true"
    >
      <div
        v-if="shouldRenderShellOuter"
        class="inset-0 absolute overflow-hidden"
        :style="scaleRevealStageStyle"
      >
        <div class="flex h-full items-center">
          <div
            class="rounded-md w-full relative overflow-hidden"
            :style="shellGrowStyle"
          >
            <div class="bg-surface inset-0 absolute" />
            <div class="surface-shimmer inset-0 absolute" />
          </div>
        </div>
      </div>
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
          :class="[imageLayoutClass, imageClass]"
          :style="imageRevealStyle"
          decoding="async"
          @load="handleImageLoad"
        >
      </div>
    </NuxtImg>
  </div>
</template>

<style>
@keyframes reveal-surface-shimmer {
  0% {
    transform: translateX(-120%);
  }

  100% {
    transform: translateX(120%);
  }
}

.surface-shimmer {
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.03) 28%,
    rgba(255, 255, 255, 0.09) 50%,
    rgba(255, 255, 255, 0.03) 72%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: reveal-surface-shimmer 1.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
  will-change: transform;
}
</style>
