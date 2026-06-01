<script setup lang="ts">
import { useElementSize, useIntersectionObserver } from '@vueuse/core'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { NuxtImg } from '#components'

/**
 * Shared pixel-reveal image wrapper built on top of Nuxt Image.
 *
 * Accessibility contract:
 * - Provide descriptive `alt` text for meaningful images.
 * - Pass `alt=""` for decorative-only images.
 */
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
  revealHoldMs?: number
  stepDurationMs?: number
  fadeDurationMs?: number
  pixelScales?: number[]
  threshold?: number
  containerClass?: string
  imageClass?: string
  canvasClass?: string
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
  revealHoldMs: 180,
  stepDurationMs: 130,
  fadeDurationMs: 220,
  pixelScales: () => [42, 34, 27, 21, 16, 12, 9, 7, 5, 4, 3],
  threshold: 0.05,
  containerClass: '',
  imageClass: '',
  canvasClass: '',
})

const rootRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isImageReady = ref(false)
const isAnimating = ref(false)
const isOverlayVisible = ref(false)
const isInViewport = ref(false)
const wasIntersecting = ref(false)
const hasPlayedOnce = ref(false)
const overlayOpacity = ref(1)

const { width: elementWidth, height: elementHeight } = useElementSize(rootRef)

let runId = 0
let timeoutIds: number[] = []

function clearScheduledWork() {
  for (const timeoutId of timeoutIds)
    window.clearTimeout(timeoutId)

  timeoutIds = []
}

function clearCanvas() {
  const canvasElement = canvasRef.value
  const context = canvasElement?.getContext('2d')
  if (!canvasElement || !context)
    return

  context.clearRect(0, 0, canvasElement.width, canvasElement.height)
}

function setBaseImageVisibility(isVisible: boolean) {
  if (!imageRef.value)
    return

  imageRef.value.style.opacity = isVisible ? '1' : '0'
}

function resetOverlay(hideBaseImage = false) {
  runId += 1
  clearScheduledWork()
  isAnimating.value = false
  isOverlayVisible.value = false
  overlayOpacity.value = 1
  if (hideBaseImage)
    setBaseImageVisibility(false)
  clearCanvas()
}

function prepareCanvas(viewWidth: number, viewHeight: number) {
  const canvasElement = canvasRef.value
  if (!canvasElement)
    return null

  const deviceScale = window.devicePixelRatio || 1
  canvasElement.width = Math.round(viewWidth * deviceScale)
  canvasElement.height = Math.round(viewHeight * deviceScale)
  canvasElement.style.width = `${viewWidth}px`
  canvasElement.style.height = `${viewHeight}px`

  const context = canvasElement.getContext('2d')
  if (!context)
    return null

  context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0)
  return context
}

function parseObjectPositionValue(rawValue: string, axis: 'x' | 'y') {
  const normalizedValue = rawValue.trim().toLowerCase()

  if (normalizedValue.endsWith('%')) {
    const percentage = Number.parseFloat(normalizedValue)
    if (!Number.isNaN(percentage))
      return percentage / 100
  }

  if (axis === 'x') {
    if (normalizedValue === 'left')
      return 0
    if (normalizedValue === 'right')
      return 1
  }

  if (axis === 'y') {
    if (normalizedValue === 'top')
      return 0
    if (normalizedValue === 'bottom')
      return 1
  }

  return 0.5
}

function getObjectPositionAlignment(imageElement: HTMLImageElement) {
  const [rawX = '50%', rawY = '50%'] = getComputedStyle(imageElement).objectPosition.split(' ')

  return {
    x: parseObjectPositionValue(rawX, 'x'),
    y: parseObjectPositionValue(rawY, 'y'),
  }
}

function drawFittedImage(
  context: CanvasRenderingContext2D,
  imageElement: HTMLImageElement,
  boxWidth: number,
  boxHeight: number,
  shouldSmooth: boolean,
) {
  const naturalWidth = imageElement.naturalWidth
  const naturalHeight = imageElement.naturalHeight
  if (!naturalWidth || !naturalHeight)
    return

  const objectFit = getComputedStyle(imageElement).objectFit
  const { x: alignX, y: alignY } = getObjectPositionAlignment(imageElement)

  context.imageSmoothingEnabled = shouldSmooth
  context.clearRect(0, 0, boxWidth, boxHeight)

  if (objectFit === 'fill') {
    context.drawImage(imageElement, 0, 0, boxWidth, boxHeight)
    return
  }

  if (objectFit === 'none') {
    const offsetX = (boxWidth - naturalWidth) * alignX
    const offsetY = (boxHeight - naturalHeight) * alignY
    context.drawImage(imageElement, offsetX, offsetY, naturalWidth, naturalHeight)
    return
  }

  const scale = objectFit === 'contain'
    ? Math.min(boxWidth / naturalWidth, boxHeight / naturalHeight)
    : Math.max(boxWidth / naturalWidth, boxHeight / naturalHeight)

  const drawWidth = naturalWidth * scale
  const drawHeight = naturalHeight * scale
  const offsetX = (boxWidth - drawWidth) * alignX
  const offsetY = (boxHeight - drawHeight) * alignY

  context.drawImage(imageElement, offsetX, offsetY, drawWidth, drawHeight)
}

/**
 * Draw a single discrete pixelation step onto the overlay canvas.
 * The underlying image remains visible; the canvas only controls the reveal look.
 */
function drawPixelFrame(pixelScale: number) {
  const imageElement = imageRef.value
  if (!imageElement)
    return

  const viewWidth = Math.round(elementWidth.value)
  const viewHeight = Math.round(elementHeight.value)
  if (!viewWidth || !viewHeight)
    return

  const context = prepareCanvas(viewWidth, viewHeight)
  if (!context)
    return

  const sampleWidth = Math.max(1, Math.round(viewWidth / pixelScale))
  const sampleHeight = Math.max(1, Math.round(viewHeight / pixelScale))
  const pixelCanvas = document.createElement('canvas')
  pixelCanvas.width = sampleWidth
  pixelCanvas.height = sampleHeight

  const pixelContext = pixelCanvas.getContext('2d')
  if (!pixelContext)
    return

  drawFittedImage(pixelContext, imageElement, sampleWidth, sampleHeight, true)

  context.clearRect(0, 0, viewWidth, viewHeight)
  context.imageSmoothingEnabled = false
  context.drawImage(pixelCanvas, 0, 0, sampleWidth, sampleHeight, 0, 0, viewWidth, viewHeight)
}

function scheduleStep(callback: () => void, delayMs: number) {
  const timeoutId = window.setTimeout(callback, delayMs)
  timeoutIds.push(timeoutId)
}

function isElementInViewport() {
  if (!import.meta.client || !rootRef.value)
    return false

  const bounds = rootRef.value.getBoundingClientRect()
  return bounds.bottom > 0
    && bounds.right > 0
    && bounds.top < window.innerHeight
    && bounds.left < window.innerWidth
}

/**
 * Start one reveal run for the current page load.
 * Replay is blocked after the first successful run until the image source changes
 * or the page is refreshed.
 */
function startReveal() {
  if (!import.meta.client || !isImageReady.value || hasPlayedOnce.value)
    return

  const imageElement = imageRef.value
  const viewWidth = Math.round(elementWidth.value)
  const viewHeight = Math.round(elementHeight.value)
  if (!imageElement || !viewWidth || !viewHeight)
    return

  const nextRunId = runId + 1
  runId = nextRunId
  clearScheduledWork()
  isAnimating.value = true
  isOverlayVisible.value = true
  overlayOpacity.value = 1
  hasPlayedOnce.value = true

  const steps = props.pixelScales.filter(scale => scale > 1)
  drawPixelFrame(steps[0] ?? 64)

  scheduleStep(() => {
    if (runId !== nextRunId)
      return

    steps.forEach((scale, index) => {
      scheduleStep(() => {
        if (runId !== nextRunId)
          return

        drawPixelFrame(scale)

        const isLastStep = index === steps.length - 1
        if (!isLastStep)
          return

        setBaseImageVisibility(true)
        overlayOpacity.value = 0
        scheduleStep(() => {
          if (runId !== nextRunId)
            return

          resetOverlay()
        }, props.fadeDurationMs)
      }, index * props.stepDurationMs)
    })
  }, props.revealHoldMs)
}

function syncImageReadyState() {
  const imageElement = imageRef.value
  if (!imageElement)
    return

  if (!imageElement.complete || imageElement.naturalWidth <= 0)
    return

  isImageReady.value = true
  isInViewport.value = isElementInViewport()
}

function handleImageLoad() {
  if (!hasPlayedOnce.value)
    setBaseImageVisibility(false)

  isImageReady.value = true
  isInViewport.value = isElementInViewport()
}

watch(
  [() => isInViewport.value, () => isImageReady.value, () => elementWidth.value, () => elementHeight.value],
  ([enteredViewport, imageReady, nextWidth, nextHeight]) => {
    if (!enteredViewport || !imageReady || !nextWidth || !nextHeight || isAnimating.value)
      return

    startReveal()
  },
)

watch(
  () => props.src,
  async () => {
    resetOverlay(true)
    isImageReady.value = false
    isInViewport.value = isElementInViewport()
    wasIntersecting.value = isInViewport.value
    hasPlayedOnce.value = false

    await nextTick()
    syncImageReadyState()
  },
)

useIntersectionObserver(
  rootRef,
  ([entry]) => {
    const isIntersecting = entry?.isIntersecting ?? false
    const didJustEnter = !wasIntersecting.value && isIntersecting
    const didJustLeave = wasIntersecting.value && !isIntersecting

    wasIntersecting.value = isIntersecting
    isInViewport.value = isIntersecting

    if (didJustLeave) {
      return
    }

    if (didJustEnter)
      startReveal()
  },
  {
    threshold: props.threshold,
  },
)

onMounted(async () => {
  await nextTick()
  setBaseImageVisibility(false)
  syncImageReadyState()
  requestAnimationFrame(() => {
    syncImageReadyState()
  })
})

onBeforeUnmount(() => {
  resetOverlay(true)
})
</script>

<template>
  <div
    ref="rootRef"
    class="rounded-md h-full w-full relative overflow-hidden"
    :class="containerClass"
  >
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
      <img
        ref="imageRef"
        v-bind="imgAttrs"
        :src="resolvedSrc"
        :alt="alt"
        :loading="loading"
        crossorigin="anonymous"
        class="h-full w-full transition-opacity duration-0 object-cover object-center"
        :class="imageClass"
        style="opacity: 0;"
        decoding="async"
        @load="handleImageLoad"
      >
    </NuxtImg>
    <canvas
      ref="canvasRef"
      class="rounded-md h-full w-full pointer-events-none transition-opacity inset-0 absolute overflow-hidden"
      :class="canvasClass"
      :style="{
        opacity: String(isOverlayVisible ? overlayOpacity : 0),
        transitionDuration: `${fadeDurationMs}ms`,
        visibility: isOverlayVisible ? 'visible' : 'hidden',
      }"
      aria-hidden="true"
    />
  </div>
</template>
