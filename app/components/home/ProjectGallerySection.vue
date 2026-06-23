<script setup lang="ts">
import type { ProjectCardItem } from '~~/shared/projects'
import { computed } from 'vue'
import ProjectGalleryCard from '~/components/home/ProjectGalleryCard.vue'

interface Props {
  projects: ProjectCardItem[]
  sectionId?: string
  spacingClass?: string
  layoutMode?: 'default' | 'home'
}

type ProjectGalleryCardSizePreset = 'feature-primary-left' | 'feature-secondary-right' | 'feature-secondary-left' | 'feature-primary-right' | 'default'

/**
 * Shared gallery section wrapper for homepage and project detail "other projects".
 * Uses explicit layout class mapping so UnoCSS can statically detect all variants.
 */
const props = withDefaults(defineProps<Props>(), {
  sectionId: 'work',
  spacingClass: 'mt-[5.3rem]',
  layoutMode: 'default',
})

const firstHomeRowProjects = computed(() => props.projects.slice(0, 2))
const secondHomeRowProjects = computed(() => props.projects.slice(2, 4))
const remainingHomeProjects = computed(() => props.projects.slice(4))

function getLayoutClass(project: ProjectCardItem, index: number) {
  if (index === 0)
    return 'lg:col-span-8'

  if (index === 1 || index === 2)
    return 'lg:col-span-4'

  if (index === 3)
    return 'lg:col-span-8'

  if (project.layoutVariant === 'feature-wide')
    return 'lg:col-span-8'

  if (project.layoutVariant === 'feature-narrow' || project.layoutVariant === 'third')
    return 'lg:col-span-4'

  return 'lg:col-span-6'
}

function getSizePreset(index: number): ProjectGalleryCardSizePreset {
  if (index === 0)
    return 'feature-primary-left'

  if (index === 1)
    return 'feature-secondary-right'

  if (index === 2)
    return 'feature-secondary-left'

  if (index === 3)
    return 'feature-primary-right'

  return 'default'
}

function getHomeFirstRowSizePreset(index: number): ProjectGalleryCardSizePreset {
  if (index === 0)
    return 'feature-primary-left'

  return 'feature-secondary-right'
}

function getHomeSecondRowSizePreset(index: number): ProjectGalleryCardSizePreset {
  if (index === 0)
    return 'feature-secondary-left'

  return 'feature-primary-right'
}
</script>

<template>
  <section
    :id="props.sectionId"
    class="gap-y-16 grid grid-cols-1"
    :class="props.spacingClass"
  >
    <template v-if="props.layoutMode === 'home'">
      <div
        v-if="firstHomeRowProjects.length"
        class="gap-x-6 gap-y-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]"
      >
        <ProjectGalleryCard
          v-for="(project, index) in firstHomeRowProjects"
          :key="project.slug"
          :slug="project.slug"
          :title="project.title"
          :subtitle="project.subtitle"
          :image="project.image"
          :alt="project.alt"
          :layout-variant="project.layoutVariant"
          :media-variant="project.mediaVariant"
          :image-variant="project.imageVariant"
          :size-preset="getHomeFirstRowSizePreset(index)"
        />
      </div>

      <div
        v-if="secondHomeRowProjects.length"
        class="gap-x-6 gap-y-16 grid grid-cols-1 lg:grid-cols-2"
      >
        <ProjectGalleryCard
          v-for="(project, index) in secondHomeRowProjects"
          :key="project.slug"
          :slug="project.slug"
          :title="project.title"
          :subtitle="project.subtitle"
          :image="project.image"
          :alt="project.alt"
          :layout-variant="project.layoutVariant"
          :media-variant="project.mediaVariant"
          :image-variant="project.imageVariant"
          :size-preset="getHomeSecondRowSizePreset(index)"
        />
      </div>

      <div
        v-if="remainingHomeProjects.length"
        class="gap-x-6 gap-y-16 grid grid-cols-1 lg:grid-cols-2"
      >
        <ProjectGalleryCard
          v-for="project in remainingHomeProjects"
          :key="project.slug"
          :slug="project.slug"
          :title="project.title"
          :subtitle="project.subtitle"
          :image="project.image"
          :alt="project.alt"
          :layout-variant="project.layoutVariant"
          :media-variant="project.mediaVariant"
          :image-variant="project.imageVariant"
        />
      </div>
    </template>

    <div
      v-else
      class="gap-x-6 gap-y-16 grid grid-cols-1 lg:grid-cols-12"
    >
      <ProjectGalleryCard
        v-for="(project, index) in props.projects"
        :key="project.slug"
        :slug="project.slug"
        :title="project.title"
        :subtitle="project.subtitle"
        :image="project.image"
        :alt="project.alt"
        :layout-class="getLayoutClass(project, index)"
        :layout-variant="project.layoutVariant"
        :media-variant="project.mediaVariant"
        :image-variant="project.imageVariant"
        :size-preset="getSizePreset(index)"
      />
    </div>
  </section>
</template>
