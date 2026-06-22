<script setup lang="ts">
import type { ProjectCardImageVariant, ProjectCardItem } from '~~/shared/projects'
import AppTransitionLink from '~/components/AppTransitionLink.vue'
import PixelRevealImage from '~/components/media/PixelRevealImage.vue'

type ProjectCardMediaVariant = ProjectCardItem['mediaVariant'] | 'work'

interface Props {
  slug: string
  title: string
  subtitle: string
  image: string
  alt: string
  layoutClass?: string
  mediaVariant?: ProjectCardMediaVariant
  imageVariant?: ProjectCardImageVariant
  revealVariant?: 'default' | 'soft-surface' | 'shimmer-surface'
  replayKey?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  layoutClass: '',
  mediaVariant: 'standard',
  imageVariant: 'the-cloud-one',
  revealVariant: 'default',
  replayKey: 0,
})

/**
 * Explicit object-position variants per card image.
 * Keep these values static to avoid UnoCSS dynamic-class misses.
 */
const imageClassByVariant: Record<ProjectCardImageVariant, string> = {
  'the-cloud-one': 'object-[50%_48%]',
  'motel-one': 'object-[50%_46%]',
  'kernel-house': 'object-[50%_50%]',
  'tecnews': 'object-[50%_46%]',
  'grillme': 'object-[50%_50%]',
  'peak-performance': 'object-[50%_52%]',
  'savor-magazine': 'object-[50%_48%]',
}

const mediaHeightClassByVariant: Record<ProjectCardMediaVariant, string> = {
  feature: 'h-[clamp(26rem,52vw,58rem)]',
  standard: 'h-[clamp(16rem,34vw,30rem)]',
  work: 'h-[clamp(18rem,31vw,28.5rem)]',
}
</script>

<template>
  <AppTransitionLink
    :to="`/projects/${props.slug}`"
    class="group h-full block"
    :class="props.layoutClass"
  >
    <article class="flex flex-col h-full">
      <div class="rounded-md bg-surface overflow-hidden" :class="mediaHeightClassByVariant[props.mediaVariant]">
        <PixelRevealImage
          :src="props.image"
          :alt="props.alt"
          :variant="props.revealVariant"
          :replay-key="props.replayKey"
          container-class="h-full"
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
  </AppTransitionLink>
</template>
