<script setup lang="ts">
import { useHead } from '#imports'

interface StickySlide {
  title: string
  toneClass: string
}

interface GalleryCard {
  id: string
  image: string
  offsetClass: string
}

interface StickyGalleryCard {
  image: string
  alt: string
  title: string
  description: string
  objectPositionClass: string
}

definePageMeta({
  layout: false,
  scrollToTop: false,
})

useHead({
  bodyAttrs: {
    class: 'overflow-x-hidden',
  },
})

const introSlides: StickySlide[] = [
  {
    title: 'complexity, made clear.',
    toneClass: 'bg-bg text-text',
  },
  {
    title: 'systems, built to last.',
    toneClass: 'bg-text text-bg',
  },
  {
    title: 'ideas, shipped for real.',
    toneClass: 'bg-bg text-text',
  },
]

const galleryCards: GalleryCard[] = [
  {
    id: 'gallery-card-1',
    image: 'https://i.imgur.com/GEiyTu5.png',
    offsetClass: 'translate-x-0 md:translate-x-6',
  },
  {
    id: 'gallery-card-2',
    image: 'https://i.imgur.com/na6XwOI.jpeg',
    offsetClass: '-translate-x-1 md:translate-x-4',
  },
  {
    id: 'gallery-card-3',
    image: 'https://i.imgur.com/KVxpN0r.jpeg',
    offsetClass: '-translate-x-2 md:translate-x-2',
  },
  {
    id: 'gallery-card-4',
    image: 'https://i.imgur.com/V8hdIBv.jpeg',
    offsetClass: '-translate-x-3 md:translate-x-0',
  },
  {
    id: 'gallery-card-5',
    image: 'https://i.imgur.com/KGPOxFU.jpeg',
    offsetClass: '-translate-x-4 md:-translate-x-2',
  },
  {
    id: 'gallery-card-6',
    image: 'https://i.imgur.com/7pInXOC.jpeg',
    offsetClass: '-translate-x-5 md:-translate-x-4',
  },
  {
    id: 'gallery-card-7',
    image: 'https://i.imgur.com/wPcCS4i.jpeg',
    offsetClass: '-translate-x-6',
  },
]

const stickyGalleryCards: StickyGalleryCard[] = [
  {
    image: 'https://i.imgur.com/hdic0PU.jpeg',
    alt: 'Modern waterfront architecture reflected in a quiet landscape',
    title: 'built to scale',
    description: 'Reusable components, accessible patterns, and architecture that can grow.',
    objectPositionClass: 'object-[50%_50%]',
  },
  {
    image: 'https://i.imgur.com/3DM0ds2.jpeg',
    alt: 'Contemporary city architecture at dusk beside the water',
    title: 'clear by design',
    description: 'Complex flows reduced to focused, understandable interactions.',
    objectPositionClass: 'object-[52%_50%]',
  },
  {
    image: 'https://janvoth.com/wp-content/uploads/2021/05/kranhaeuser-koeln-rheinauhafen-altstadt-architekturfotografie-stadtansicht-6822-WEB.jpg',
    alt: 'Cologne skyline with the Kranhaeuser and cathedral illuminated at night',
    title: 'ready for production',
    description: 'Visual quality carried through implementation, review, and release.',
    objectPositionClass: 'object-[50%_50%]',
  },
]
</script>

<template>
  <main class="text-white bg-black">
    <svg aria-hidden="true" class="h-0 w-0 absolute overflow-hidden">
      <defs>
        <clipPath id="test-rounded-rail-clip" clipPathUnits="objectBoundingBox">
          <path d="M0.026 0H0.988Q1 0 0.9997 0.028L0.9883 0.972Q0.988 1 0.976 1H0.012Q0 1 0.0003 0.972L0.0117 0.028Q0.012 0 0.026 0Z" />
        </clipPath>
        <clipPath id="test-another4-clip" clipPathUnits="objectBoundingBox">
          <path d="M0 0.0417599C0 0.0186966 0.0250721 0 0.056 0H0.6105C0.641428 0 0.6665 0.0186965 0.6665 0.0417599V0.148024C0.6665 0.171087 0.691572 0.189784 0.7225 0.189784H0.944C0.974928 0.189784 1 0.20848 1 0.231544V0.95824C1 0.981303 0.974928 1 0.944 1H0.056C0.0250721 1 0 0.981303 0 0.95824V0.0417599Z" />
        </clipPath>
      </defs>
    </svg>

    <div>
      <section
        v-for="slide in introSlides"
        :key="slide.title"
        class="rounded-tl-2xl rounded-tr-2xl grid h-screen w-full top-0 place-content-center sticky overflow-hidden"
        :class="slide.toneClass"
      >
        <div
          class="bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] inset-0 absolute"
        />

        <h1 class="text-[clamp(3.2rem,8vw,8rem)] leading-[0.9] tracking-[-0.06em] font-700 font-headline px-5 text-center max-w-[14ch] lowercase relative md:px-8">
          {{ slide.title }}
        </h1>
      </section>
    </div>

    <section class="text-text bg-bg w-full">
      <div class="grid grid-cols-[42%_58%] md:grid-cols-2">
        <div class="px-5 flex h-screen items-center top-0 sticky md:px-8">
          <div class="max-w-[34rem]">
            <p class="text-[10px] text-muted leading-[1.45] tracking-[0.08em] uppercase md:text-sm">
              selected fragments
            </p>
            <h1 class="text-[clamp(1.85rem,5.2vw,5.5rem)] leading-[0.94] tracking-[-0.065em] font-700 font-headline mt-4 lowercase md:mt-5">
              some work lives between the case studies.
            </h1>
            <p class="text-[0.8rem] text-muted leading-[1.45] tracking-[-0.025em] mt-5 max-w-[30rem] md:text-[clamp(1rem,1.45vw,1.35rem)] md:leading-[1.5] md:mt-7">
              Interfaces, prototypes, and visual directions developed along the way.
            </p>
          </div>
        </div>

        <div class="py-4 flex justify-center overflow-hidden">
          <div class="gap-2 grid w-[58vw] md:w-[min(44vw,760px)]">
            <figure
              v-for="card in galleryCards"
              :key="card.id"
              class="w-full aspect-[4/3] [clip-path:url(#test-rounded-rail-clip)] overflow-hidden md:aspect-video"
              :class="card.offsetClass"
            >
              <img
                :src="card.image"
                alt=""
                loading="lazy"
                class="align-bottom h-full w-full transition-all duration-300 object-cover"
              >
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section class="text-text pt-32 bg-bg w-full md:pt-[14rem]">
      <div class="px-5 grid grid-cols-2 md:px-8">
        <div class="gap-2 grid">
          <div
            v-for="card in stickyGalleryCards"
            :key="card.image"
            class="grid h-screen top-0 place-content-center sticky"
          >
            <figure class="bg-surface h-[42vw] w-[42vw] [clip-path:url(#test-another4-clip)] relative overflow-hidden md:h-[min(44vw,35rem)] md:w-[min(44vw,35rem)]">
              <img
                :src="card.image"
                :alt="card.alt"
                class="align-bottom h-full w-full transition-transform duration-500 object-cover hover:scale-[1.025]"
                :class="card.objectPositionClass"
              >
              <figcaption class="px-3 py-2 border-t border-line bg-bg/72 inset-x-0 bottom-0 absolute backdrop-blur-md md:px-6 md:py-5">
                <h2 class="text-[clamp(0.82rem,2.3vw,1.85rem)] leading-none tracking-[-0.04em] font-600 font-headline lowercase">
                  {{ card.title }}
                </h2>
                <p class="text-[clamp(0.875rem,1.05vw,1rem)] text-muted leading-[1.45] tracking-[-0.02em] mt-3 max-w-[30rem] hidden md:block">
                  {{ card.description }}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        <div class="px-2 grid h-screen content-center top-0 sticky md:px-8">
          <div class="ml-auto text-right max-w-[38rem]">
            <p class="text-[10px] text-muted leading-[1.45] tracking-[0.08em] uppercase md:text-sm">
              the throughline
            </p>
            <h1 class="text-[clamp(1.7rem,5vw,5.25rem)] leading-[0.95] tracking-[-0.065em] font-700 font-headline mt-4 lowercase md:mt-5">
              different contexts. one standard.
            </h1>
          </div>
        </div>
      </div>
    </section>

    <footer class="group bg-slate-950">
      <h1 class="text-[16vw] text-transparent leading-[100%] font-headline font-semibold text-center whitespace-nowrap translate-y-20 transition-all ease-linear from-neutral-400 to-neutral-800 bg-gradient-to-r bg-clip-text group-hover:translate-y-4">
        dogan teke
      </h1>
      <section class="text-2xl rounded-tl-full rounded-tr-full bg-black grid h-40 place-content-center relative z-10">
        Thanks for Scrolling
      </section>
    </footer>
  </main>
</template>
