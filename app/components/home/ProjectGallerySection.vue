<script setup lang="ts">
import type { ProjectCardItem } from '~~/shared/projects'
import ProjectGalleryCard from '~/components/home/ProjectGalleryCard.vue'

interface Props {
  projects: ProjectCardItem[]
  sectionId?: string
  spacingClass?: string
}

/**
 * Shared gallery section wrapper for homepage and project detail "other projects".
 * Uses explicit layout class mapping so UnoCSS can statically detect all variants.
 */
const props = withDefaults(defineProps<Props>(), {
  sectionId: 'work',
  spacingClass: 'mt-[5.3rem]',
})
</script>

<template>
  <section
    :id="props.sectionId"
    class="gap-x-6 gap-y-16 grid grid-cols-1 lg:grid-cols-12"
    :class="props.spacingClass"
  >
    <ProjectGalleryCard
      v-for="project in props.projects"
      :key="project.slug"
      :slug="project.slug"
      :title="project.title"
      :subtitle="project.subtitle"
      :image="project.image"
      :alt="project.alt"
      :layout-class="project.layoutVariant === 'feature-wide'
        ? 'lg:col-span-8'
        : project.layoutVariant === 'feature-narrow'
          ? 'lg:col-span-4'
          : project.layoutVariant === 'third'
            ? 'lg:col-span-4'
            : 'lg:col-span-6'"
      :media-variant="project.mediaVariant"
      :image-variant="project.imageVariant"
    />
  </section>
</template>
