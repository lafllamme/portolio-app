<script setup lang="ts">
import type { Ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { projectCards } from '~~/shared/projects'
import AboutSection from '~/components/AboutSection.vue'
import ProjectGallerySection from '~/components/home/ProjectGallerySection.vue'

definePageMeta({
  scrollToTop: false,
})

const heroHeaderRef = ref<HTMLElement | null>(null)
const heroTitleRef = ref<HTMLElement | null>(null)
const heroFitPx = ref<number | null>(null)
const heroReady = ref(false)
const HERO_FILL_RATIO = 1
const HERO_EDGE_INSET_PX = 8
const heroFitStyle = ref('')

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
    <header id="top" ref="heroHeaderRef" class="pt-2 [--hero-fs:min(16.9cqw,16.7rem)] [container-type:inline-size]">
      <div class="pb-[0.24em] h-[calc(var(--hero-fit-fs,var(--hero-fs))*1.44)] w-full overflow-hidden">
        <h1
          ref="heroTitleRef"
          dir="auto"
          class="framer-text text-[length:var(--hero-fit-fs,var(--hero-fs))] text-text leading-[1] tracking-[-0.06em] font-700 font-headline pb-[0.46em] w-max block whitespace-nowrap lowercase keyframes-hero-reveal"
          :class="heroReady ? 'hero-reveal-ready' : 'opacity-0'"
          :style="heroFitStyle"
        >
          dogan&nbsp;teke
        </h1>
      </div>
      <div class="mt-3 flex justify-end md:mt-4">
        <div class="max-w-[640px] overflow-hidden md:max-w-[620px]">
          <p
            class="text-[24px] text-muted leading-[28.8px] tracking-[-0.96px] keyframes-subline-reveal"
            :class="heroReady ? 'subline-reveal-ready' : 'opacity-0'"
          >
            i build modern fullstack products with a frontend-first mindset, combining clean UX, robust architecture, and practical AI integrations.
          </p>
        </div>
      </div>
    </header>

    <ProjectGallerySection :projects="projectCards" />

    <AboutSection />

    <section id="contact" class="mt-[11.5rem]">
      <div class="gap-8 grid items-center md:grid-cols-3">
        <h2 class="text-[clamp(4.4rem,24vw,8rem)] leading-[0.9] tracking-[-0.095em] font-700 font-headline justify-self-start md:text-[clamp(8rem,13.2vw,10.5rem)]">
          get in
        </h2>
        <div class="mx-auto h-[18rem] max-w-[24rem] w-full [perspective:1200px] relative md:h-[24rem] md:max-w-[31rem] sm:h-[22rem] sm:max-w-[28rem]">
          <img
            src="https://framerusercontent.com/images/5762hl6RTc8SjiRzWwECIOsXeW0.png?scale-down-to=1024&width=904&height=1200"
            alt=""
            aria-hidden="true"
            class="rounded-md opacity-95 h-[6.9rem] w-[10.75rem] [transform:translateZ(-100px)_scale(0.92)] left-1/2 top-[-0.35rem] absolute object-cover sm:h-[8.8rem] sm:w-[13.5rem] -translate-x-1/2 sm:top-[-0.85rem]"
          >
          <img
            src="https://framerusercontent.com/images/SSdVHX1oKvAE62eonEHC5cIiM.png?scale-down-to=1024&width=2400&height=2400"
            alt="Close-up portrait of Dogan Teke"
            class="rounded-md h-[14.5rem] w-[19rem] [transform:translateZ(0)_scale(1)] left-1/2 top-1/2 absolute object-cover sm:h-[18rem] sm:w-[24rem] -translate-x-1/2 -translate-y-1/2"
          >
        </div>
        <h2 class="text-[clamp(4.4rem,24vw,8rem)] leading-[0.9] tracking-[-0.095em] font-700 font-headline justify-self-end md:text-[clamp(8rem,13.2vw,10.5rem)] md:text-right">
          touch
        </h2>
      </div>
    </section>
  </section>
</template>
