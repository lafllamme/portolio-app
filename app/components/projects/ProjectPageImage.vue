<script setup lang="ts">
import { computed } from 'vue'
import { NuxtImg } from '#components'
import RevealImage from '~/components/media/RevealImage.vue'

interface Props {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
  animate?: boolean
  aspectClass?: string
  objectPositionClass?: string
  fit?: 'cover' | 'contain'
}

const props = withDefaults(defineProps<Props>(), {
  loading: 'eager',
  animate: true,
  aspectClass: '',
  objectPositionClass: 'object-center',
  fit: 'cover',
})

const imageFitClass = computed(() =>
  props.fit === 'contain' ? 'object-contain' : 'object-cover',
)

const showcaseImageClass = computed(() =>
  [props.objectPositionClass, imageFitClass.value, 'w-full'].filter(Boolean).join(' '),
)

const revealLayoutMode = computed(() =>
  props.aspectClass ? 'fill' : 'intrinsic',
)
</script>

<template>
  <div class="rounded-md overflow-hidden" :class="props.aspectClass">
    <RevealImage
      v-if="props.animate"
      :src="props.src"
      :alt="props.alt"
      :loading="props.loading"
      :threshold="0.15"
      :fit="props.fit"
      :layout-mode="revealLayoutMode"
      reveal-mode="grain-dissolve"
      root-margin="240px 0px"
      surface-variant="transparent"
      :image-class="showcaseImageClass"
    />
    <NuxtImg
      v-else
      v-slot="{ src: imageSrc, imgAttrs }"
      :src="props.src"
      :fit="props.fit"
      :custom="true"
    >
      <img
        v-bind="imgAttrs"
        :src="imageSrc"
        :alt="props.alt"
        :loading="props.loading"
        :class="showcaseImageClass"
        crossorigin="anonymous"
        class="h-full w-full"
        decoding="async"
      >
    </NuxtImg>
  </div>
</template>
