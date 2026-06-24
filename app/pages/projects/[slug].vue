<script setup lang="ts">
import { computed } from 'vue'
import { getProjectBySlug, getProjectsBySlugs, toProjectCardItem } from '~~/shared/projects'
import { createError, useRoute, useSeoMeta } from '#imports'
import ProjectGallerySection from '~/components/home/ProjectGallerySection.vue'
import ProjectPageImage from '~/components/projects/ProjectPageImage.vue'

definePageMeta({
  scrollToTop: false,
})

const route = useRoute()
const slug = typeof route.params.slug === 'string' ? route.params.slug : ''
const project = getProjectBySlug(slug)

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found.',
  })
}

const relatedProjects = computed(() =>
  getProjectsBySlugs(project.relatedSlugs)
    .filter(relatedProject => relatedProject.slug !== project.slug)
    .slice(0, 3)
    .map(relatedProject => toProjectCardItem(relatedProject, 'third')),
)

const leadGalleryImage = computed(() => project.galleryImages[0] ?? null)
const pairedGalleryImages = computed(() => project.galleryImages.slice(1, 3))
const trailingGalleryImages = computed(() => project.galleryImages.slice(3))

useSeoMeta({
  title: `${project.title} · Dogan Teke`,
  description: project.overview,
  ogTitle: `${project.title} · Dogan Teke`,
  ogDescription: project.overview,
  ogImage: project.heroImage,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <section class="page-wrap pt-24 md:pt-28">
    <header>
      <div class="mt-4 text-center">
        <h1 class="text-[clamp(3.6rem,10vw,9.2rem)] leading-[0.9] tracking-[-0.06em] font-700 font-headline lowercase">
          {{ project.title }}
        </h1>
      </div>
    </header>

    <section class="mt-12">
      <ProjectPageImage
        :src="project.heroImage"
        :alt="project.heroAlt"
        :animate="false"
        :aspect-class="project.heroAspectClass ?? 'aspect-[3/2]'"
        loading="eager"
      />
      <div class="mt-16">
        <p class="text-sm text-muted leading-[1.45] tracking-[0.08em] uppercase">
          project overview
        </p>
        <p class="text-[clamp(2.35rem,5.2vw,5rem)] leading-[1.08] tracking-[-0.07em] font-500 mt-5 max-w-[15ch] lowercase">
          {{ project.overview }}
        </p>
        <dl class="xl:grid-cols-4 mt-12 gap-8 grid grid-cols-1 md:grid-cols-2">
          <div>
            <dt class="text-sm text-muted leading-[1.45] tracking-[0.08em] uppercase">
              project type
            </dt>
            <dd class="text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.08] tracking-[-0.05em] font-700 font-headline mt-3 lowercase">
              {{ project.projectType }}
            </dd>
          </div>
          <div>
            <dt class="text-sm text-muted leading-[1.45] tracking-[0.08em] uppercase">
              year
            </dt>
            <dd class="text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.08] tracking-[-0.05em] font-700 font-headline mt-3 lowercase">
              {{ project.year }}
            </dd>
          </div>
          <div>
            <dt class="text-sm text-muted leading-[1.45] tracking-[0.08em] uppercase">
              my role
            </dt>
            <dd class="text-[clamp(1.35rem,2vw,1.8rem)] leading-[1.2] tracking-[-0.04em] font-500 mt-3 max-w-[18rem] lowercase">
              {{ project.myRole }}
            </dd>
          </div>
          <div>
            <dt class="text-sm text-muted leading-[1.45] tracking-[0.08em] uppercase">
              client
            </dt>
            <dd class="text-[clamp(1.35rem,2vw,1.8rem)] leading-[1.2] tracking-[-0.04em] font-500 mt-3 lowercase">
              {{ project.client }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section v-if="leadGalleryImage" class="mt-16 flex flex-col gap-6 md:mt-20 md:gap-7">
      <ProjectPageImage
        :src="leadGalleryImage.src"
        :alt="leadGalleryImage.alt"
        :object-position-class="leadGalleryImage.objectPositionClass"
      />

      <div v-if="pairedGalleryImages.length" class="gap-6 grid md:gap-7 md:grid-cols-2">
        <ProjectPageImage
          v-for="image in pairedGalleryImages"
          :key="image.src"
          :src="image.src"
          :alt="image.alt"
          :object-position-class="image.objectPositionClass"
          aspect-class="aspect-square"
        />
      </div>

      <ProjectPageImage
        v-for="image in trailingGalleryImages"
        :key="image.src"
        :src="image.src"
        :alt="image.alt"
        :object-position-class="image.objectPositionClass"
      />
    </section>

    <section class="mt-24 md:mt-28">
      <div class="gap-6 grid items-end md:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <p class="text-sm text-muted leading-[1.45] tracking-[0.08em] uppercase">
            more work
          </p>
          <h2 class="text-[clamp(2.8rem,7vw,6rem)] leading-[0.92] tracking-[-0.06em] font-700 font-headline mt-3 lowercase">
            other projects
          </h2>
        </div>
        <p class="text-[18px] text-muted leading-[1.6] tracking-[-0.03em] max-w-[32rem] md:text-right md:justify-self-end">
          Explore adjacent work directions that share the same frontend rigor, systems thinking, and editorial visual pacing.
        </p>
      </div>
      <ProjectGallerySection
        section-id="related-projects"
        spacing-class="mt-10 md:mt-12"
        :projects="relatedProjects"
      />
    </section>
  </section>
</template>
