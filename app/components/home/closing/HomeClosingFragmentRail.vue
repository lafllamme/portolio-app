<script setup lang="ts">
import type { HomeClosingFragment } from '~~/shared/home-closing'

defineProps<{
  eyebrow: string
  title: string
  description: string
  fragments: HomeClosingFragment[]
}>()

const fragmentOffsetClasses = [
  'translate-x-0 md:translate-x-6',
  '-translate-x-1 md:translate-x-4',
  '-translate-x-2 md:translate-x-2',
  '-translate-x-3 md:translate-x-0',
  '-translate-x-4 md:-translate-x-2',
  '-translate-x-5 md:-translate-x-4',
  '-translate-x-6',
] as const

function getFragmentOffsetClass(index: number) {
  return fragmentOffsetClasses[index] ?? 'translate-x-0'
}
</script>

<template>
  <section class="text-text bg-bg w-full">
    <div class="grid grid-cols-[42%_58%] md:grid-cols-2">
      <div class="px-5 flex h-screen items-center top-0 sticky md:px-8">
        <div class="max-w-[34rem]">
          <p class="text-[10px] text-muted leading-[1.45] tracking-[0.08em] uppercase md:text-sm">
            {{ eyebrow }}
          </p>
          <h2 class="text-[clamp(1.85rem,5.2vw,5.5rem)] leading-[0.94] tracking-[-0.065em] font-700 font-headline mt-4 lowercase md:mt-5">
            {{ title }}
          </h2>
          <p class="text-[0.8rem] text-muted leading-[1.45] tracking-[-0.025em] mt-5 max-w-[30rem] md:text-[clamp(1rem,1.45vw,1.35rem)] md:leading-[1.5] md:mt-7">
            {{ description }}
          </p>
        </div>
      </div>

      <div class="py-4 flex justify-center overflow-hidden">
        <div class="gap-2 grid w-[58vw] md:w-[min(44vw,760px)]">
          <figure
            v-for="(fragment, index) in fragments"
            :key="fragment.id"
            class="group w-full aspect-[4/3] [clip-path:url(#home-closing-rail-clip)] media-pull-frame md:aspect-video"
            :class="getFragmentOffsetClass(index)"
          >
            <img
              :src="fragment.image"
              alt=""
              loading="lazy"
              class="align-bottom h-full w-full media-pull-target object-cover"
            >
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
