<script setup lang="ts">
import type {
  ProjectCardImageVariant,
  ProjectCardItem,
  ProjectCardLayoutVariant,
} from '~~/shared/projects'
import AppTransitionLink from '~/components/AppTransitionLink.vue'
import RevealImage from '~/components/media/RevealImage.vue'

type ProjectCardMediaVariant = ProjectCardItem['mediaVariant'] | 'work'

interface Props {
  slug: string
  title: string
  subtitle: string
  image: string
  alt: string
  layoutClass?: string
  layoutVariant?: ProjectCardLayoutVariant
  mediaVariant?: ProjectCardMediaVariant
  imageVariant?: ProjectCardImageVariant
  revealVariant?: 'default' | 'soft-surface' | 'shimmer-surface'
  sizePreset?: 'feature-primary-left' | 'feature-secondary-right' | 'feature-secondary-left' | 'feature-primary-right' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  layoutClass: '',
  layoutVariant: 'half',
  mediaVariant: 'standard',
  imageVariant: 'the-cloud-one',
  revealVariant: 'default',
  sizePreset: 'default',
})

/**
 * Explicit object-position variants per card image.
 * Keep these values static to avoid UnoCSS dynamic-class misses.
 */
const imageClassByVariant: Record<ProjectCardImageVariant, string> = {
  'the-cloud-one': 'object-[50%_48%]',
  'motel-one': 'object-[50%_46%]',
  'verisk-analytics': 'object-[50%_50%]',
  'tecnews': 'object-[50%_46%]',
  'grillme': 'object-[50%_50%]',
  'peak-performance': 'object-[50%_52%]',
  'savor-magazine': 'object-[50%_48%]',
}

const mediaAspectClassByVariant: Record<ProjectCardMediaVariant, string> = {
  feature: 'aspect-[6/5]',
  standard: 'aspect-[6/5]',
  work: 'aspect-[59/50]',
}

const mediaAspectClassByLayoutVariant: Record<ProjectCardLayoutVariant, string> = {
  'feature-wide': 'lg:aspect-[4/3]',
  'feature-narrow': 'lg:aspect-[7/5]',
  'half': 'lg:aspect-[20/19]',
  'third': 'lg:aspect-[20/19]',
}

const mediaAspectClassBySizePreset: Record<NonNullable<Props['sizePreset']>, string> = {
  'feature-primary-left': 'lg:aspect-[4/3]',
  'feature-secondary-right': 'lg:aspect-[11/10]',
  'feature-secondary-left': 'lg:aspect-[7/5]',
  'feature-primary-right': 'lg:aspect-[20/19]',
  'default': '',
}

function getMediaAspectClasses() {
  if (props.mediaVariant === 'work')
    return [mediaAspectClassByVariant.work]

  const desktopAspectClass = props.sizePreset !== 'default'
    ? mediaAspectClassBySizePreset[props.sizePreset]
    : mediaAspectClassByLayoutVariant[props.layoutVariant]

  return [
    mediaAspectClassByVariant[props.mediaVariant],
    desktopAspectClass,
  ]
}
</script>

<template>
  <AppTransitionLink
    :to="`/projects/${props.slug}`"
    class="group h-full block"
    :class="props.layoutClass"
  >
    <article class="flex flex-col h-full">
      <div
        class="rounded-md overflow-hidden"
        :class="getMediaAspectClasses()"
      >
        <RevealImage
          :src="props.image"
          :alt="props.alt"
          entrance-mode="scale-reveal"
          loading="eager"
          :surface-variant="props.revealVariant"
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
