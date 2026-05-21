<script setup lang="ts">
import type { ProjectCardImageVariant, ProjectCardItem } from '~~/shared/projects'
import { NuxtLink } from '#components'
import PixelRevealImage from '~/components/media/PixelRevealImage.vue'

type ProjectCardMediaVariant = ProjectCardItem['mediaVariant']

interface Props {
  slug: string
  title: string
  subtitle: string
  image: string
  alt: string
  layoutClass?: string
  mediaVariant?: ProjectCardMediaVariant
  imageVariant?: ProjectCardImageVariant
}

const props = withDefaults(defineProps<Props>(), {
  layoutClass: '',
  mediaVariant: 'standard',
  imageVariant: 'brew-can-co',
})

/**
 * Explicit object-position variants per card image.
 * Keep these values static to avoid UnoCSS dynamic-class misses.
 */
const imageClassByVariant: Record<ProjectCardImageVariant, string> = {
  'brew-can-co': 'object-[50%_44%]',
  'lemon-drop': 'object-[50%_42%]',
  'kernel-house': 'object-[50%_50%]',
  'scoop-roll': 'object-[50%_46%]',
  'peak-performance': 'object-[50%_52%]',
  'savor-magazine': 'object-[50%_48%]',
}

const mediaHeightClassByVariant: Record<ProjectCardMediaVariant, string> = {
  feature: 'h-[clamp(26rem,52vw,58rem)]',
  standard: 'h-[clamp(16rem,34vw,30rem)]',
}
</script>

<template>
  <NuxtLink
    :to="`/projects/${props.slug}`"
    class="group block"
    :class="props.layoutClass"
  >
    <article>
      <div class="rounded-md bg-surface overflow-hidden">
        <PixelRevealImage
          :src="props.image"
          :alt="props.alt"
          :container-class="mediaHeightClassByVariant[props.mediaVariant]"
          :image-class="imageClassByVariant[props.imageVariant]"
        />
      </div>
      <h2 class="card-title">
        {{ props.title }}
      </h2>
      <p class="card-meta">
        {{ props.subtitle }}
      </p>
    </article>
  </NuxtLink>
</template>
