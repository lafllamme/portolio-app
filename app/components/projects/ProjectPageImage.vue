<script setup lang="ts">
import { NuxtImg } from '#components'

interface Props {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
  aspectClass?: string
  objectPositionClass?: string
}

withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  aspectClass: '',
  objectPositionClass: 'object-center',
})
</script>

<template>
  <div class="rounded-md bg-surface overflow-hidden">
    <NuxtImg
      v-slot="{ src: imageSrc, imgAttrs }"
      :src="src"
      fit="cover"
      :custom="true"
    >
      <img
        v-bind="imgAttrs"
        :src="imageSrc"
        :alt="alt"
        :loading="loading"
        :class="[aspectClass, objectPositionClass]"
        crossorigin="anonymous"
        class="w-full object-cover"
        decoding="async"
      >
    </NuxtImg>
  </div>
</template>
