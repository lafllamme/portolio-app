<script setup lang="ts">
import type { AboutContactVisual } from '~~/shared/about'
import { useIntervalFn, usePreferredReducedMotion } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  images: AboutContactVisual[]
  intervalMs?: number
}>()

const activeIndex = ref(0)
const prefersReducedMotion = usePreferredReducedMotion()

const imageCount = computed(() => props.images.length)
const currentImage = computed(() => props.images[activeIndex.value] ?? props.images[0])
const nextImage = computed(() => {
  if (!imageCount.value)
    return undefined

  return props.images[(activeIndex.value + 1) % imageCount.value]
})

function advance() {
  if (imageCount.value <= 1)
    return

  activeIndex.value = (activeIndex.value + 1) % imageCount.value
}

const { pause, resume } = useIntervalFn(advance, computed(() => props.intervalMs ?? 1000), {
  immediate: false,
  immediateCallback: false,
})

watch(
  [imageCount, prefersReducedMotion],
  ([count, reduced]) => {
    if (count <= 1 || reduced === 'reduce') {
      pause()
      return
    }

    resume()
  },
  { immediate: true },
)
</script>

<template>
  <div class="mx-auto h-[18rem] max-w-[24rem] w-full [perspective:1200px] relative md:h-[24rem] md:max-w-[31rem] sm:h-[22rem] sm:max-w-[28rem]">
    <img
      v-if="nextImage"
      :key="`accent-${activeIndex}`"
      :src="nextImage.src"
      :alt="nextImage.alt"
      aria-hidden="true"
      class="rounded-md opacity-95 h-[6.9rem] w-[10.75rem] transition-opacity duration-500 [transform:translateZ(-100px)_scale(0.92)] left-1/2 top-[-0.35rem] absolute object-cover sm:h-[8.8rem] sm:w-[13.5rem] -translate-x-1/2 sm:top-[-0.85rem]"
    >
    <img
      v-if="currentImage"
      :key="`primary-${activeIndex}`"
      :src="currentImage.src"
      :alt="currentImage.alt"
      class="rounded-md h-[14.5rem] w-[19rem] transition-opacity duration-500 [transform:translateZ(0)_scale(1)] left-1/2 top-1/2 absolute object-cover sm:h-[18rem] sm:w-[24rem] -translate-x-1/2 -translate-y-1/2"
    >
  </div>
</template>
