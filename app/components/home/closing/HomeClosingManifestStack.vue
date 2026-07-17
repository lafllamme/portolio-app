<script setup lang="ts">
import type { HomeClosingManifestSlide } from '~~/shared/home-closing'

defineProps<{
  slides: HomeClosingManifestSlide[]
}>()

function getToneClass(tone: HomeClosingManifestSlide['tone']) {
  return tone === 'light' ? 'bg-text text-bg' : 'bg-bg text-text'
}
</script>

<template>
  <div>
    <section
      v-for="slide in slides"
      :key="slide.title"
      class="rounded-t-2xl grid h-[calc(100svh-3rem)] w-full top-12 place-content-center sticky overflow-hidden"
      :class="getToneClass(slide.tone)"
    >
      <div
        class="bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] inset-0 absolute"
      />

      <h2 class="text-[clamp(3.2rem,8vw,8rem)] leading-[0.9] tracking-[-0.06em] font-700 font-headline px-5 text-center max-w-[14ch] lowercase relative md:px-8">
        {{ slide.title }}
      </h2>
    </section>
  </div>
</template>
