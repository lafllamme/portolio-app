<script setup lang="ts">
import { homeProjectCards } from '~~/shared/projects'
import { NuxtImg } from '#components'

interface StickySlide {
  eyebrow: string
  title: string
  description: string
  toneClass: string
}

interface StackCard {
  image: string
  alt: string
  label: string
  caption: string
  cardClass: string
  figureClass: string
}

definePageMeta({
  scrollToTop: false,
})

const introSlides: StickySlide[] = [
  {
    eyebrow: 'sticky scroll',
    title: 'I Know What Exactly you\'re Looking For! Scroll Please 👇',
    description: 'Three full-screen sticky sections stacked in one scroll context.',
    toneClass: 'bg-slate-950 text-white',
  },
  {
    eyebrow: 'sticky scroll',
    title: 'If you don\'t like this Smooth Scroll then I\'m sorry, create your own and make it open source 💼',
    description: 'The middle section keeps the same sticky treatment and simply changes the surface.',
    toneClass: 'bg-zinc-300 text-black',
  },
  {
    eyebrow: 'sticky scroll',
    title: 'Don\'t Forget To Share This Sticky CSS Tricks.😎',
    description: 'The third card closes the intro stack before the two-column showcase begins.',
    toneClass: 'bg-slate-950 text-white',
  },
]

const stackCards: StackCard[] = [
  {
    image: homeProjectCards[0]!.image,
    alt: homeProjectCards[0]!.alt,
    label: 'the cloud one',
    caption: 'luxury hospitality brand experience',
    cardClass: 'bg-slate-300',
    figureClass: '-skew-x-12',
  },
  {
    image: homeProjectCards[1]!.image,
    alt: homeProjectCards[1]!.alt,
    label: 'motel one',
    caption: 'booking experience & campaign surfaces',
    cardClass: 'bg-slate-400',
    figureClass: 'skew-x-12',
  },
  {
    image: homeProjectCards[2]!.image,
    alt: homeProjectCards[2]!.alt,
    label: 'urban nest',
    caption: 'retail story with stacked motion',
    cardClass: 'bg-slate-500',
    figureClass: '-skew-x-12',
  },
]

const reverseStackCards: StackCard[] = [
  {
    image: homeProjectCards[3]!.image,
    alt: homeProjectCards[3]!.alt,
    label: 'copied & paste',
    caption: 'component driven layouts with strong motion rhythm',
    cardClass: 'bg-slate-200',
    figureClass: 'skew-x-12',
  },
  {
    image: homeProjectCards[4]!.image,
    alt: homeProjectCards[4]!.alt,
    label: 'creative stack',
    caption: 'cards can keep overlapping while the text stays anchored',
    cardClass: 'bg-slate-300',
    figureClass: '-skew-x-12',
  },
  {
    image: homeProjectCards[5]!.image,
    alt: homeProjectCards[5]!.alt,
    label: 'scroll end',
    caption: 'the final overlapping card closes the sequence',
    cardClass: 'bg-slate-400',
    figureClass: 'skew-x-12',
  },
]
</script>

<template>
  <main class="text-white bg-black overflow-x-clip">
    <div>
      <section
        v-for="slide in introSlides"
        :key="slide.title"
        class="grid h-screen top-0 place-content-center sticky overflow-hidden"
        :class="slide.toneClass"
      >
        <div
          class="bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] inset-0 absolute"
        />

        <div class="mx-auto px-6 text-center max-w-[92rem] relative md:px-10">
          <p class="text-[clamp(0.78rem,0.9vw,1rem)] tracking-[0.16em] font-600 mb-4 opacity-70 uppercase">
            {{ slide.eyebrow }}
          </p>
          <h1 class="text-[clamp(2.8rem,5.6vw,4.9rem)] leading-[1.08] tracking-[-0.06em] font-700 mx-auto max-w-[16ch] md:text-[clamp(3.4rem,6vw,5.5rem)]">
            {{ slide.title }}
          </h1>
          <p class="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.45] tracking-[-0.03em] mx-auto mt-5 opacity-75 max-w-[38rem]">
            {{ slide.description }}
          </p>
        </div>
      </section>
    </div>

    <section class="text-white bg-slate-950">
      <div class="grid grid-cols-1 min-h-[280vh] lg:grid-cols-2">
        <div class="px-6 py-16 flex h-screen items-center top-0 justify-center sticky md:px-10">
          <div class="max-w-[32rem]">
            <p class="text-[14px] text-white/55 tracking-[0.14em] uppercase">
              stack demo
            </p>
            <h2 class="text-[clamp(3rem,6vw,5.75rem)] leading-[0.94] tracking-[-0.07em] font-700 mt-4 max-w-[10ch]">
              Cards overlap while the stack scrolls.
            </h2>
            <p class="text-[clamp(1rem,1.35vw,1.2rem)] text-white/70 leading-[1.5] tracking-[-0.03em] mt-6 max-w-[34rem]">
              This section mirrors the reference structure: one sticky text column and one vertical set of sticky figures that sit on top of each other as the page moves.
            </p>
          </div>
        </div>

        <div class="px-4 py-10 min-w-0 relative lg:px-10 md:px-8">
          <div class="space-y-2">
            <figure
              v-for="(card, index) in stackCards"
              :key="card.label"
              class="grid h-screen top-0 place-content-center sticky"
              :style="{ zIndex: String(30 - index * 10) }"
            >
              <div class="p-3 border border-white/8 rounded-[28px] bg-white/5 shadow-[0_28px_90px_rgba(0,0,0,0.28)] relative overflow-hidden backdrop-blur-[2px]">
                <div
                  class="bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.18)_40%,transparent_70%)] opacity-60 inset-0 absolute"
                />
                <div class="rounded-[20px] w-[min(100vw-2rem,38rem)] aspect-[4/3] relative overflow-hidden md:w-[min(100vw-4rem,42rem)]">
                  <NuxtImg
                    :src="card.image"
                    :alt="card.alt"
                    class="h-full w-full object-cover object-center"
                  />
                  <div class="bg-[linear-gradient(180deg,transparent_20%,rgba(0,0,0,0.24)_100%)] inset-0 absolute" />
                  <div
                    class="text-white p-8 text-center grid inset-0 place-content-center absolute"
                    :class="card.cardClass"
                  >
                    <div class="space-y-4">
                      <div class="mx-auto border border-white/18 rounded-full bg-white/10 h-20 w-20 backdrop-blur-sm" />
                      <h3 class="text-[clamp(2rem,4vw,4rem)] leading-[1] tracking-[-0.05em] font-700">
                        {{ index + 1 }}. {{ card.label }}
                      </h3>
                      <p class="text-[clamp(0.95rem,1.2vw,1.1rem)] text-white/72 leading-[1.45] tracking-[-0.03em] mx-auto max-w-[24ch]">
                        {{ card.caption }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section class="text-white bg-slate-950">
      <div class="gap-8 grid grid-cols-1 min-h-[280vh] lg:grid-cols-2">
        <div class="px-6 py-16 flex h-screen items-center top-0 justify-center sticky md:px-10">
          <div class="max-w-[34rem]">
            <p class="text-[14px] text-white/55 tracking-[0.14em] uppercase">
              reverse stack
            </p>
            <h2 class="text-[clamp(3rem,6vw,5.75rem)] leading-[0.94] tracking-[-0.07em] font-700 mt-4 max-w-[10ch]">
              Thanks To Scroll. Scroll More To Explore
            </h2>
          </div>
        </div>

        <div class="px-4 py-10 min-w-0 relative lg:px-10 md:px-8">
          <div class="space-y-2">
            <figure
              v-for="(card, index) in reverseStackCards"
              :key="card.label"
              class="grid h-screen top-0 place-content-center sticky"
              :style="{ zIndex: String(30 - index * 10) }"
            >
              <div class="p-3 border border-white/8 rounded-[28px] bg-white/5 shadow-[0_28px_90px_rgba(0,0,0,0.28)] relative overflow-hidden backdrop-blur-[2px]">
                <div
                  class="bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.16)_40%,transparent_70%)] opacity-60 inset-0 absolute"
                />

                <div
                  class="rounded-[20px] w-[min(100vw-2rem,38rem)] aspect-[4/3] relative overflow-hidden md:w-[min(100vw-4rem,42rem)]"
                  :class="card.cardClass"
                >
                  <NuxtImg
                    :src="card.image"
                    :alt="card.alt"
                    class="h-full w-full object-cover object-center"
                  />
                  <div class="bg-[linear-gradient(180deg,transparent_15%,rgba(0,0,0,0.22)_100%)] inset-0 absolute" />
                  <div class="text-white p-8 text-center grid inset-0 place-content-center absolute">
                    <div class="space-y-4">
                      <div class="mx-auto border border-white/18 rounded-full bg-white/10 h-20 w-20 backdrop-blur-sm" />
                      <h3 class="text-[clamp(2rem,4vw,4rem)] leading-[1] tracking-[-0.05em] font-700">
                        {{ index + 1 }}. {{ card.label }}
                      </h3>
                      <p class="text-[clamp(0.95rem,1.2vw,1.1rem)] text-white/72 leading-[1.45] tracking-[-0.03em] mx-auto max-w-[24ch]">
                        {{ card.caption }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
