<script setup lang="ts">
import type { Ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import ScrollReveal from '~/components/ScrollReveal.vue'

const heroHeaderRef = ref<HTMLElement | null>(null)
const heroTitleRef = ref<HTMLElement | null>(null)
const heroFitPx = ref<number | null>(null)
const footerNameWrapRef = ref<HTMLElement | null>(null)
const footerNameRef = ref<HTMLElement | null>(null)
const footerFitPx = ref<number | null>(null)
const heroReady = ref(false)
const HERO_FILL_RATIO = 1
const HERO_EDGE_INSET_PX = 8

function fitTitleWidth(containerEl: HTMLElement | null, titleEl: HTMLElement | null, target: Ref<number | null>) {
  if (!containerEl || !titleEl)
    return

  const containerWidth = containerEl.clientWidth
  const availableWidth = containerWidth - (HERO_EDGE_INSET_PX * 2)
  if (!containerWidth || availableWidth <= 0)
    return

  const prevSize = titleEl.style.fontSize
  titleEl.style.fontSize = ''
  const textWidth = titleEl.scrollWidth
  const computedSize = Number.parseFloat(getComputedStyle(titleEl).fontSize)
  titleEl.style.fontSize = prevSize
  if (!containerWidth || !textWidth)
    return

  const nextPx = computedSize * (availableWidth / textWidth) * HERO_FILL_RATIO
  target.value = Number(nextPx.toFixed(2))
}

function fitHeroTitleWidth() {
  fitTitleWidth(heroHeaderRef.value, heroTitleRef.value, heroFitPx)
}

function fitFooterTitleWidth() {
  fitTitleWidth(footerNameWrapRef.value, footerNameRef.value, footerFitPx)
}

onMounted(() => {
  requestAnimationFrame(() => {
    fitHeroTitleWidth()
    fitFooterTitleWidth()
    heroReady.value = true
  })
})

useResizeObserver(heroHeaderRef, () => {
  fitHeroTitleWidth()
})

useResizeObserver(footerNameWrapRef, () => {
  fitFooterTitleWidth()
})

const aboutScrollText = `i'm Dogan Teke, a fullstack developer with a strong frontend focus. I help teams ship scalable web products with modern technologies, sharp interaction design, and AI-powered features that create real value.`

const projects = [
  {
    title: 'ai commerce studio',
    subtitle: 'fullstack product engineering',
    image: 'https://framerusercontent.com/images/DE2VADP6O5auX55YcUKNxpqRQWU.webp?width=1365&height=2048',
    alt: 'Minimalist coffee can design in hand',
    layout: 'lg:col-span-8',
  },
  {
    title: 'vision copilot',
    subtitle: 'frontend systems & ai ux',
    image: 'https://framerusercontent.com/images/ih5DUyl9FkErFmy16ISk8b3VA.jpg?width=1365&height=2048',
    alt: 'White branded cap on lemons',
    layout: 'lg:col-span-4',
  },
  {
    title: 'edge analytics',
    subtitle: 'dashboard architecture',
    image: 'https://framerusercontent.com/images/fYvQjvgH7i51arHZEPZLPlpbf8M.jpg?width=1365&height=2048',
    alt: 'Stack of modern books on leather chair',
    layout: 'lg:col-span-6',
  },
  {
    title: 'neural workspace',
    subtitle: 'design system & ai tools',
    image: 'https://framerusercontent.com/images/QOH1Zk5nsoAVg2S4bHQmbD476g.jpg?scale-down-to=2048&width=4500&height=3002',
    alt: 'Pastel ice cream packaging design',
    layout: 'lg:col-span-6 lg:pt-12',
  },
  {
    title: 'runtime cloud',
    subtitle: 'platform frontend',
    image: 'https://framerusercontent.com/images/orUVxfxWedv09ke2YHn9uGVoYnM.jpg?scale-down-to=2048&width=4000&height=2669',
    alt: 'Sports supplement packaging tubes',
    layout: 'lg:col-span-6',
  },
  {
    title: 'agent studio',
    subtitle: 'fullstack ai workflows',
    image: 'https://framerusercontent.com/images/900m0LBN2F4i9KSHVdT3tWA40qc.jpg?scale-down-to=2048&width=4500&height=3003',
    alt: 'Food magazine brochure mockup',
    layout: 'lg:col-span-6 lg:pt-8',
  },
]
</script>

<template>
  <main class="page-shell">
    <section class="page-wrap">
      <nav class="text-[20px] leading-[24px] tracking-[-0.8px] font-500 mb-10 grid-cols-12 hidden items-center md:grid">
        <a href="#top" class="text-[#f6f4f0] col-span-1 whitespace-nowrap justify-self-start">dogan teke</a>
        <a href="#work" class="nav-link col-span-1 col-start-4 whitespace-nowrap justify-self-center">work</a>
        <a href="#about" class="nav-link col-span-1 col-start-8 whitespace-nowrap justify-self-center">about me</a>
        <a href="#contact" class="nav-link col-span-1 col-start-12 whitespace-nowrap justify-self-end">start a project</a>
      </nav>
      <nav class="text-[20px] leading-[24px] tracking-[-0.8px] font-500 mb-8 flex items-center justify-between md:hidden">
        <a href="#top" class="text-[#f6f4f0]">dogan teke</a>
        <a href="#work" class="nav-link">work</a>
      </nav>

      <header id="top" ref="heroHeaderRef" class="pt-2 [--hero-fs:min(16.9cqw,16.7rem)] [container-type:inline-size]">
        <div class="pb-[0.24em] h-[calc(var(--hero-fit-fs,var(--hero-fs))*1.44)] w-full overflow-hidden">
          <h1
            ref="heroTitleRef"
            dir="auto"
            class="framer-text text-[length:var(--hero-fit-fs,var(--hero-fs))] text-text leading-[1] tracking-[-0.06em] font-700 pb-[0.46em] w-max block whitespace-nowrap lowercase keyframes-hero-reveal"
            :class="heroReady ? 'hero-reveal-ready' : 'opacity-0'"
            :style="{ '--hero-fit-fs': heroFitPx ? `${heroFitPx}px` : null }"
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

      <section id="work" class="mt-[5.3rem] gap-x-6 gap-y-16 grid grid-cols-1 lg:grid-cols-12">
        <article
          v-for="project in projects"
          :key="project.title"
          class="group"
          :class="project.layout"
        >
          <div class="rounded-none bg-surface overflow-hidden">
            <img
              :src="project.image"
              :alt="project.alt"
              class="h-full w-full transition-transform duration-500 ease-out object-cover object-center group-hover:scale-[1.01]"
            >
          </div>
          <h2 class="card-title">
            {{ project.title }}
          </h2>
          <p class="card-meta">
            {{ project.subtitle }}
          </p>
        </article>
      </section>

      <section id="about" class="mt-[11.5rem]">
        <ScrollReveal
          :children="aboutScrollText"
          :enable-blur="true"
          :base-opacity="0.1"
          :base-rotation="3"
          :blur-strength="4"
          container-class-name="text-[clamp(3.1rem,5.625vw,4.5rem)] leading-[1.1] tracking-[-0.05em] font-500 mb-16 text-text"
          text-class-name="block"
          rotation-end="bottom bottom"
          word-animation-end="bottom bottom"
        />
        <div class="gap-12 grid grid-cols-1 lg:gap-10 lg:grid-cols-[1fr_1fr_1fr]">
          <img
            src="https://framerusercontent.com/images/qH75Va6nL5ddkYAQwubJVI0QORI.png?scale-down-to=2048&width=1600&height=2400"
            alt="Portrait of Dogan Teke"
            class="rounded-[8px] w-full object-cover"
          >
          <div>
            <p class="text-[1.25rem] text-muted leading-none">
              why work with me
            </p>
            <p class="text-[24px] leading-[28.8px] tracking-[-0.48px] font-500 mt-4 max-w-[24ch]">
              i combine product thinking with engineering execution. from architecture to polished UI, i focus on performance, maintainability, and a design standard that feels intentional on every screen.
            </p>
            <button class="text-[16px] text-[#1a1a1a] leading-[19.2px] tracking-[-0.48px] font-500 mt-8 px-8 py-4 rounded-[4px] bg-text transition-all duration-250 hover:bg-[#f6f4f0] active:scale-[0.985]">
              download cv
            </button>
          </div>
          <div>
            <p class="text-[1.25rem] text-muted leading-none">
              current focus
            </p>
            <p class="text-[24px] leading-[28.8px] tracking-[-0.48px] font-500 mt-4 max-w-[24ch]">
              fullstack development with modern TypeScript stacks, advanced frontend systems, and applied AI workflows. i care about developer velocity, visual quality, and shipping features users actually use.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" class="mt-[11.5rem]">
        <div class="gap-8 grid items-center md:grid-cols-3">
          <h2 class="text-[clamp(8rem,13.2vw,10.5rem)] leading-[0.9] tracking-[-0.095em] font-700">
            get in
          </h2>
          <div class="mx-auto h-[22rem] w-[28rem] [perspective:1200px] relative md:h-[24rem] md:w-[31rem]">
            <img
              src="https://framerusercontent.com/images/5762hl6RTc8SjiRzWwECIOsXeW0.png?scale-down-to=1024&width=904&height=1200"
              alt="stacked background image"
              class="rounded-[8px] opacity-95 h-[8.8rem] w-[13.5rem] [transform:translateZ(-100px)_scale(0.92)] left-1/2 top-[-0.85rem] absolute object-cover -translate-x-1/2"
            >
            <img
              src="https://framerusercontent.com/images/SSdVHX1oKvAE62eonEHC5cIiM.png?scale-down-to=1024&width=2400&height=2400"
              alt="close-up portrait"
              class="rounded-[8px] h-[18rem] w-[24rem] [transform:translateZ(0)_scale(1)] left-1/2 top-1/2 absolute object-cover -translate-x-1/2 -translate-y-1/2"
            >
          </div>
          <h2 class="text-[clamp(8rem,13.2vw,10.5rem)] leading-[0.9] tracking-[-0.095em] font-700 text-right">
            touch
          </h2>
        </div>
      </section>

      <footer class="mt-[6.5rem] pb-8 pt-[8.5rem] border-t border-line">
        <div class="gap-12 grid grid-cols-1 lg:grid-cols-[1.45fr_1fr]">
          <div class="space-y-4">
            <p class="footer-link">
              email: me@doantike.de
            </p>
            <p class="footer-link">
              based in: germany, remote first
            </p>
            <p class="footer-link">
              available for: freelance, consulting & product builds
            </p>
          </div>
          <div class="gap-10 grid grid-cols-2">
            <div>
              <p class="text-[16px] text-muted leading-[19.2px] tracking-[-0.32px]">
                pages
              </p>
              <div class="text-[20px] leading-[24px] tracking-[-0.8px] font-500 mt-2 space-y-1">
                <p>home</p>
                <p>about</p>
                <p>work</p>
              </div>
            </div>
            <div>
              <p class="text-[16px] text-muted leading-[19.2px] tracking-[-0.32px]">
                socials
              </p>
              <div class="text-[20px] leading-[24px] tracking-[-0.8px] font-500 mt-2 space-y-1">
                <p>instagram</p>
                <p>x(twitter)</p>
                <p>linkedin</p>
              </div>
            </div>
          </div>
        </div>
        <div ref="footerNameWrapRef" class="mt-24 [--footer-fs:min(16.9cqw,16.7rem)] [container-type:inline-size]">
          <h2
            ref="footerNameRef"
            class="text-[length:var(--footer-fit-fs,var(--footer-fs))] text-text leading-[1] tracking-[-0.06em] font-700 px-[8px] pb-[0.46em] w-max block whitespace-nowrap lowercase"
            :style="{ '--footer-fit-fs': footerFitPx ? `${footerFitPx}px` : null }"
          >
            dogan teke
          </h2>
        </div>
        <div class="text-sm text-muted mt-4 pt-5 border-t border-line flex flex-wrap gap-4 items-center justify-between">
          <p>© 2026 dogan teke. all rights reserved</p>
          <p>fullstack frontend engineering · modern ai products</p>
        </div>
      </footer>
    </section>
  </main>
</template>
