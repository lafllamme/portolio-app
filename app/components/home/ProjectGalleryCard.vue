<script setup lang="ts">
import PixelRevealImage from '~/components/media/PixelRevealImage.vue'

interface Props {
  title: string
  subtitle: string
  image: string
  alt: string
  layoutClass?: string
}

withDefaults(defineProps<Props>(), {
  layoutClass: '',
})
</script>

<template>
  <article class="group" :class="layoutClass">
    <div class="rounded-md bg-surface overflow-hidden">
      <PixelRevealImage :src="image" :alt="alt" />
    </div>
    <h2 class="card-title">
      {{ title }}
    </h2>
    <p class="card-meta">
      {{ subtitle }}
    </p>
  </article>
</template>
