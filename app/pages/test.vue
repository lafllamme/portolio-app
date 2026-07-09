<script setup lang="ts">
import { useHead } from '#imports'

interface StickySlide {
  title: string
  toneClass: string
}

interface GalleryCard {
  image: string
  isNegativeSkew: boolean
}

interface StickyGalleryCard {
  image: string
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
    title: 'I Know What Exactly you\'re Looking For! Scroll Please 👇',
    toneClass: 'bg-slate-950 text-white',
  },
  {
    title: 'If you don\'t like this Smooth Scroll then I\'m sorry, create your own and make it open source 💼',
    toneClass: 'bg-gray-300 text-black',
  },
  {
    title: 'Don\'t Forget To Share This Sticky CSS Tricks.😎',
    toneClass: 'bg-slate-950 text-white',
  },
]

const galleryCards: GalleryCard[] = [
  {
    image: 'https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop',
    isNegativeSkew: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop',
    isNegativeSkew: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=500&auto=format&fit=crop',
    isNegativeSkew: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1685904042960-66242a0ac352?w=500&auto=format&fit=crop',
    isNegativeSkew: false,
  },
]

const stickyGalleryCards: StickyGalleryCard[] = [
  {
    image: 'https://images.unsplash.com/photo-1718183120769-ece47f31045b?w=500&auto=format&fit=crop',
  },
  {
    image: 'https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop',
  },
  {
    image: 'https://images.unsplash.com/photo-1685904042960-66242a0ac352?w=500&auto=format&fit=crop',
  },
  {
    image: 'https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop',
  },
]
</script>

<template>
  <main class="text-white bg-black">
    <div>
      <section
        v-for="(slide, index) in introSlides"
        :key="slide.title"
        class="grid h-screen w-full top-0 place-content-center sticky"
        :class="[
          slide.toneClass,
          'overflow-hidden rounded-tl-2xl rounded-tr-2xl',
        ]"
      >
        <div
          class="bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] inset-0 absolute"
        />

        <h1
          class="leading-[120%] tracking-tight font-semibold px-8 text-center"
          :class="index === 0 ? '2xl:text-7xl text-6xl' : index === 1 ? '2xl:text-7xl text-4xl' : '2xl:text-7xl text-5xl'"
        >
          {{ slide.title }}
        </h1>
      </section>
    </div>

    <section class="text-white bg-slate-950 w-full">
      <div class="grid grid-cols-2">
        <div class="flex h-screen items-center top-0 justify-center sticky">
          <h1 class="2xl:text-7xl text-5xl leading-[120%] tracking-tight font-semibold px-8 text-center">
            Thanks To Scroll.
            Scroll More To Explore
          </h1>
        </div>

        <div class="py-4 gap-2 grid">
          <template
            v-for="card in galleryCards"
            :key="card.image"
          >
            <figure
              v-if="card.isNegativeSkew"
              class="grid skew-x-[-12deg] place-content-center"
            >
              <img
                :src="card.image"
                alt=""
                class="align-bottom h-96 w-80 transition-all duration-300 object-cover"
              >
            </figure>

            <figure
              v-else
              class="grid skew-x-12 place-content-center"
            >
              <img
                :src="card.image"
                alt=""
                class="align-bottom h-96 w-80 transition-all duration-300 object-cover"
              >
            </figure>
          </template>
        </div>
      </div>
    </section>

    <section class="text-white bg-slate-950 w-full">
      <div class="px-8 grid grid-cols-2">
        <div class="gap-2 grid">
          <figure
            v-for="card in stickyGalleryCards"
            :key="card.image"
            class="grid h-screen top-0 place-content-center sticky"
          >
            <img
              :src="card.image"
              alt=""
              class="align-bottom rounded-md h-96 w-96 transition-all duration-300 object-cover"
            >
          </figure>
        </div>

        <div class="grid h-screen top-0 place-content-center sticky">
          <h1 class="text-4xl leading-[120%] tracking-tight font-medium px-8 text-right">
            Copied &amp; Paste Every Component you want and make an creative website 😎
          </h1>
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
