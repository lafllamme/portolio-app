<script setup lang="ts">
import type { Ref } from 'vue'
import type { AboutExperienceItem } from '~~/shared/about'
import { useResizeObserver } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { aboutPageContent } from '~~/shared/about'
import ContactShowcaseSection from '~/components/ContactShowcaseSection.vue'
import ResumeDownloadModal from '~/components/media/ResumeDownloadModal.vue'
import { useResumeDownload } from '~/composables/useResumeDownload'

const heroHeaderRef = ref<HTMLElement | null>(null)
const heroTitleRef = ref<HTMLElement | null>(null)
const heroFitPx = ref<number | null>(null)
const heroReady = ref(false)
const HERO_FILL_RATIO = 1
const HERO_EDGE_INSET_PX = 8
const heroFitStyle = ref('')

const intro = computed(() => aboutPageContent.intro)
const experienceItems = computed<AboutExperienceItem[]>(() => aboutPageContent.experienceItems)

const {
  closeModal,
  errorMessage,
  isModalOpen,
  isSubmitting,
  openModal,
  submitPassword,
} = useResumeDownload()

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
      <div class="w-full overflow-hidden">
        <h1
          ref="heroTitleRef"
          dir="auto"
          class="framer-text text-[length:var(--hero-fit-fs,var(--hero-fs))] text-text leading-[1] tracking-[-0.06em] font-700 font-headline pb-[0.24em] w-max block whitespace-nowrap lowercase keyframes-hero-reveal"
          :class="heroReady ? 'hero-reveal-ready' : 'opacity-0'"
          :style="heroFitStyle"
        >
          {{ aboutPageContent.heroTitle }}
        </h1>
      </div>
    </header>

    <section
      class="pb-14 pt-6 border-b border-line keyframes-about-intro-reveal md:pt-8"
      :class="heroReady ? 'about-intro-reveal-ready' : 'opacity-0'"
    >
      <div class="gap-x-6 gap-y-10 grid grid-cols-1 items-start lg:grid-cols-12">
        <div class="lg:col-span-6">
          <div class="space-y-[1.025rem]">
            <p
              v-for="(paragraph, index) in intro.paragraphs"
              :key="paragraph"
              class="text-[32px] leading-[38.4px] tracking-[-0.64px] font-500 max-w-[620px]"
              :class="index === 0 ? 'text-text' : 'text-text/60'"
            >
              {{ paragraph }}
            </p>
          </div>
          <button
            type="button"
            class="text-[16px] text-bg leading-[19.2px] tracking-[-0.48px] font-500 font-body mt-[2.25rem] px-6 py-3 border border-text rounded-[4px] bg-text transition-all duration-250 hover:bg-text/92 active:scale-[0.985]"
            @click="openModal"
          >
            {{ intro.ctaLabel }}
          </button>
        </div>

        <div class="w-full lg:col-span-5 lg:col-start-8 lg:self-start">
          <img
            :src="intro.portrait.src"
            :alt="intro.portrait.alt"
            class="rounded-[8px] w-full aspect-[0.878] block object-cover"
          >
        </div>
      </div>
    </section>

    <section class="xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)] mt-8 gap-6 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div class="space-y-3">
        <p class="text-[16px] text-muted leading-[19.2px] tracking-[-0.32px] lowercase">
          base
        </p>
        <p class="text-[24px] text-text/86 leading-[28.8px] tracking-[-0.48px] font-500">
          {{ intro.location }}
        </p>
      </div>

      <div class="space-y-3">
        <p class="text-[16px] text-muted leading-[19.2px] tracking-[-0.32px] lowercase">
          focus
        </p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="highlight in intro.highlights"
            :key="highlight"
            class="text-[14px] text-text/82 leading-[1] tracking-[-0.02em] px-3 py-2 border border-line rounded-full bg-surface/45"
          >
            {{ highlight }}
          </span>
        </div>
      </div>

      <div class="xl:col-span-1 space-y-3 md:col-span-2">
        <p class="text-[16px] text-muted leading-[19.2px] tracking-[-0.32px] lowercase">
          worked with
        </p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="company in intro.workedWith"
            :key="company"
            class="text-[14px] text-text/82 leading-[1] tracking-[-0.02em] px-3 py-2 border border-line rounded-full bg-surface/45"
          >
            {{ company }}
          </span>
        </div>
      </div>
    </section>

    <section class="mt-[6.5rem]">
      <div class="pb-4 border-b border-line">
        <h2 class="text-[20px] leading-[24px] tracking-[-0.8px] font-500 lowercase">
          {{ aboutPageContent.experienceTitle }}
        </h2>
      </div>

      <div class="divide-line divide-y">
        <article
          v-for="item in experienceItems"
          :key="`${item.company}-${item.role}`"
          class="py-8 gap-x-8 gap-y-4 grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto]"
        >
          <div class="space-y-2">
            <p class="text-[16px] text-muted leading-[19.2px] tracking-[-0.32px]">
              {{ item.company }}
            </p>
            <p class="text-[24px] leading-[28.8px] tracking-[-0.04em] font-500 lowercase">
              {{ item.role }}
            </p>
          </div>
          <p class="text-[20px] text-text/72 leading-[1.24] tracking-[-0.03em] max-w-[38rem]">
            {{ item.summary }}
          </p>
          <p class="text-[16px] text-muted leading-[19.2px] tracking-[-0.32px] whitespace-nowrap md:text-right">
            {{ item.period }}
          </p>
        </article>
      </div>
    </section>

    <ContactShowcaseSection />

    <ResumeDownloadModal
      :model-value="isModalOpen"
      :error-message="errorMessage"
      :is-submitting="isSubmitting"
      @submit="submitPassword"
      @update:model-value="(value) => value ? openModal() : closeModal()"
    />
  </section>
</template>
