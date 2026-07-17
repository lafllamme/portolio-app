<script setup lang="ts">
import type { Ref } from 'vue'
import type { ProjectCardItem } from '~~/shared/projects'
import { useResizeObserver } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { projectCards, projectCatalog } from '~~/shared/projects'
import ContactShowcaseSection from '~/components/ContactShowcaseSection.vue'
import ProjectGalleryCard from '~/components/home/ProjectGalleryCard.vue'
import { usePageSeo } from '~/composables/usePageSeo'
import { absoluteSiteUrl, personStructuredData, websiteStructuredData } from '~/utils/seo'

definePageMeta({
  scrollToTop: false,
})

const WORK_DESCRIPTION = 'Explore selected work by Dogan Teke across Vue and Nuxt platforms, design systems, hospitality experiences, editorial products, and practical AI tools.'

usePageSeo({
  title: 'Selected Work | Dogan Teke',
  description: WORK_DESCRIPTION,
  imageWidth: 1200,
  imageHeight: 630,
  structuredData: [
    websiteStructuredData,
    personStructuredData,
    {
      '@type': 'CollectionPage',
      '@id': `${absoluteSiteUrl('/work')}#collection`,
      'url': absoluteSiteUrl('/work'),
      'name': 'Selected Work by Dogan Teke',
      'description': WORK_DESCRIPTION,
      'isPartOf': { '@id': `${absoluteSiteUrl('/')}#website` },
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': projectCatalog.map((project, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'url': absoluteSiteUrl(`/projects/${project.slug}`),
          'name': project.title,
          'description': project.seoDescription,
        })),
      },
    },
  ],
})

type WorkFilter = 'all' | 'editorial' | 'product' | 'ai' | 'print' | 'visual-identity'

interface WorkProjectCard extends ProjectCardItem {
  categories: WorkFilter[]
}

interface FilterItem {
  key: WorkFilter
  label: string
}

const heroHeaderRef = ref<HTMLElement | null>(null)
const heroTitleRef = ref<HTMLElement | null>(null)
const heroFitPx = ref<number | null>(null)
const heroReady = ref(false)
const HERO_FILL_RATIO = 1
const HERO_EDGE_INSET_PX = 8
const heroFitStyle = ref('')

const activeFilter = ref<WorkFilter>('all')
const filterEpoch = ref(0)

const filterItems: FilterItem[] = [
  { key: 'all', label: 'all' },
  { key: 'editorial', label: 'editorial' },
  { key: 'product', label: 'product' },
  { key: 'ai', label: 'ai' },
  { key: 'print', label: 'print' },
  { key: 'visual-identity', label: 'visual identity' },
]

const categoryBySlug: Record<string, WorkFilter[]> = {
  'the-cloud-one': ['product', 'visual-identity'],
  'motel-one': ['product', 'visual-identity'],
  'verisk-analytics': ['product', 'print'],
  'tecnews': ['editorial', 'product', 'ai'],
  'storck': ['product', 'visual-identity'],
  'grillme': ['product', 'ai'],
}

const workCards = computed<WorkProjectCard[]>(() =>
  projectCards.map(card => ({
    ...card,
    categories: categoryBySlug[card.slug] ?? ['product'],
  })),
)

const filteredCards = computed(() => {
  if (activeFilter.value === 'all')
    return workCards.value

  return workCards.value.filter(card => card.categories.includes(activeFilter.value))
})

function setFilter(nextFilter: WorkFilter) {
  if (activeFilter.value === nextFilter)
    return

  activeFilter.value = nextFilter
  filterEpoch.value += 1
}

function cardDelayStyle(index: number) {
  return {
    animationDelay: `${Math.min(index * 70, 420)}ms`,
  }
}

function fitTitleWidth(containerEl: HTMLElement | null, titleEl: HTMLElement | null, target: Ref<number | null>) {
  if (!containerEl || !titleEl)
    return

  const containerWidth = containerEl.clientWidth
  const availableWidth = containerWidth - (HERO_EDGE_INSET_PX * 2)
  if (!containerWidth || availableWidth <= 0)
    return

  const previousFontSize = titleEl.style.fontSize
  titleEl.style.fontSize = ''
  const textWidth = titleEl.scrollWidth
  const computedSize = Number.parseFloat(getComputedStyle(titleEl).fontSize)
  titleEl.style.fontSize = previousFontSize
  if (!containerWidth || !textWidth)
    return

  const nextPx = computedSize * (availableWidth / textWidth) * HERO_FILL_RATIO
  target.value = Number(nextPx.toFixed(2))
}

function fitHeroTitleWidth() {
  fitTitleWidth(heroHeaderRef.value, heroTitleRef.value, heroFitPx)
  heroFitStyle.value = heroFitPx.value ? `--hero-fit-fs:${heroFitPx.value}px` : ''
}

onMounted(() => {
  requestAnimationFrame(() => {
    fitHeroTitleWidth()
    heroReady.value = true
  })
})

useResizeObserver(heroHeaderRef, () => {
  fitHeroTitleWidth()
})
</script>

<template>
  <section class="page-wrap pt-20 md:pt-24">
    <header ref="heroHeaderRef" class="pt-2 [--hero-fs:min(16.9cqw,16.7rem)] [container-type:inline-size]">
      <div class="pb-[0.24em] h-[calc(var(--hero-fit-fs,var(--hero-fs))*1.44)] w-full overflow-hidden">
        <h1
          ref="heroTitleRef"
          dir="auto"
          class="framer-text text-[length:var(--hero-fit-fs,var(--hero-fs))] text-text leading-[1] tracking-[-0.06em] font-700 font-headline pb-[0.46em] w-max block whitespace-nowrap lowercase keyframes-hero-reveal"
          :class="heroReady ? 'hero-reveal-ready' : 'opacity-0'"
          :style="heroFitStyle"
        >
          selected&nbsp;work
        </h1>
      </div>
    </header>

    <div class="mt-3 flex justify-end md:mt-4">
      <p class="text-[24px] text-muted leading-[28.8px] tracking-[-0.96px] max-w-[640px] md:max-w-[620px]">
        Selected frontend and fullstack work across hospitality platforms, product systems, editorial experiences, and practical AI tools.
      </p>
    </div>

    <div class="mt-5 pb-4 border-b border-line">
      <div class="flex flex-wrap gap-x-7 gap-y-3">
        <button
          v-for="item in filterItems"
          :key="item.key"
          type="button"
          class="text-[20px] leading-[24px] tracking-[-0.8px] font-500 lowercase transition-colors duration-250"
          :class="activeFilter === item.key ? 'text-text' : 'text-muted hover:text-text'"
          @click="setFilter(item.key)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <section class="mt-[5.3rem] gap-x-6 gap-y-16 grid grid-cols-1 lg:grid-cols-2">
      <ProjectGalleryCard
        v-for="(project, index) in filteredCards"
        :key="`${filterEpoch}-${activeFilter}-${project.slug}`"
        class="work-card-enter"
        :style="cardDelayStyle(index)"
        :slug="project.slug"
        :title="project.title"
        :subtitle="project.subtitle"
        :image="project.image"
        :alt="project.alt"
        media-variant="work"
        :image-variant="project.imageVariant"
        reveal-variant="soft-surface"
      />
    </section>

    <ContactShowcaseSection />
  </section>
</template>
