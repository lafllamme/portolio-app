<script setup lang="ts">
import type { HomeClosingPrinciple } from '~~/shared/home-closing'
import { useTemplateRefsList, useWindowScroll, useWindowSize } from '@vueuse/core'
import { computed, ref, watchPostEffect } from 'vue'

const props = defineProps<{
  eyebrow: string
  principles: HomeClosingPrinciple[]
}>()

const activePrincipleIndex = ref(0)
const principleSectionRefs = useTemplateRefsList<HTMLElement>()
const { y: scrollY } = useWindowScroll()
const { height: viewportHeight } = useWindowSize()

const activePrinciple = computed(() =>
  props.principles[activePrincipleIndex.value] ?? props.principles[0],
)

function getDocumentOffsetTop(element: HTMLElement) {
  let offsetTop = 0
  let currentElement: HTMLElement | null = element

  while (currentElement) {
    offsetTop += currentElement.offsetTop
    currentElement = currentElement.offsetParent as HTMLElement | null
  }

  return offsetTop
}

watchPostEffect(() => {
  const activationPosition = scrollY.value + (viewportHeight.value * 0.2)
  let nextActiveIndex = 0

  principleSectionRefs.value.forEach((section, index) => {
    if (getDocumentOffsetTop(section) <= activationPosition)
      nextActiveIndex = index
  })

  activePrincipleIndex.value = nextActiveIndex
})

function getObjectPositionClass(position: HomeClosingPrinciple['objectPosition']) {
  return position === 'right' ? 'object-[52%_50%]' : 'object-[50%_50%]'
}
</script>

<template>
  <section class="text-text pt-32 bg-bg w-full md:pt-[14rem]">
    <div class="px-5 grid grid-cols-2 md:px-8">
      <div class="gap-2 grid">
        <div
          v-for="principle in principles"
          :key="principle.image"
          :ref="principleSectionRefs.set"
          class="grid h-screen top-0 place-content-center sticky"
        >
          <figure class="group bg-surface h-[42vw] w-[42vw] [clip-path:url(#home-closing-principle-clip)] relative media-pull-frame md:h-[min(44vw,35rem)] md:w-[min(44vw,35rem)]">
            <img
              :src="principle.image"
              alt=""
              loading="lazy"
              class="align-bottom h-full w-full media-pull-target object-cover"
              :class="getObjectPositionClass(principle.objectPosition)"
            >
          </figure>
        </div>
      </div>

      <div class="px-2 grid h-screen content-center top-0 sticky md:px-8">
        <div v-if="activePrinciple" class="ml-auto text-right max-w-[38rem]">
          <p class="text-[10px] text-muted leading-[1.45] tracking-[0.08em] uppercase md:text-sm">
            {{ eyebrow }}
          </p>
          <div class="mt-4 grid md:mt-5">
            <div
              v-for="(principle, index) in principles"
              :key="principle.title"
              class="transition-[opacity,filter] duration-300 ease-out [grid-area:1/1] motion-reduce:transition-none"
              :class="index === activePrincipleIndex ? 'opacity-100 blur-0' : 'opacity-0 blur-[6px] pointer-events-none'"
              :aria-hidden="index !== activePrincipleIndex"
            >
              <h2 class="text-[clamp(1.7rem,5vw,5.25rem)] leading-[0.95] tracking-[-0.065em] font-700 font-headline lowercase">
                {{ principle.title }}
              </h2>
              <p class="text-[clamp(0.8rem,1.4vw,1.25rem)] text-muted leading-[1.45] tracking-[-0.025em] ml-auto mt-5 max-w-[30rem] md:mt-7">
                {{ principle.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
