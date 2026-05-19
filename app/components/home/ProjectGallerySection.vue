<script setup lang="ts">
import ProjectGalleryCard from '~/components/home/ProjectGalleryCard.vue'

interface ProjectItem {
  title: string
  subtitle: string
  image: string
  alt: string
  layout: string
}

interface Props {
  projects: ProjectItem[]
}

defineProps<Props>()
</script>

<template>
  <section id="work" class="mt-[5.3rem] gap-x-6 gap-y-16 grid grid-cols-1 lg:grid-cols-12">
    <ProjectGalleryCard
      v-for="project in projects"
      :key="project.title"
      :title="project.title"
      :subtitle="project.subtitle"
      :image="project.image"
      :alt="project.alt"
      :layout-class="project.layout"
    />
  </section>
</template>
