<script setup lang="ts">
import type { AboutExperienceItem } from '~~/shared/about'
import { computed } from 'vue'
import { useCenteredActiveIndex } from '~/composables/useCenteredActiveIndex'

const props = defineProps<{
  items: AboutExperienceItem[]
}>()

const experienceGroups = computed(() => {
  let timelineIndex = 0

  return props.items.map(item => ({
    item,
    years: item.years.map(year => ({
      timelineIndex: timelineIndex++,
      year,
    })),
  }))
})

const timelineYears = computed(() => experienceGroups.value.flatMap(group => group.years))

const {
  activeIndex,
  setItemRef,
} = useCenteredActiveIndex(timelineYears.value.length, {
  rootMargin: '-35% 0px -35% 0px',
})
</script>

<template>
  <div>
    <div aria-hidden="true" class="h-[4.25rem] md:hidden" />
    <div class="py-4 border-y border-line bg-bg top-[4.25rem] sticky z-20 isolate md:hidden">
      <div aria-hidden="true" class="bg-bg h-[4.25rem] inset-x-0 bottom-full absolute" />
      <div class="flex items-end justify-between">
        <div class="grid overflow-hidden">
          <p
            v-for="(timelineYear, index) in timelineYears"
            :key="`mobile-${timelineYear.year}`"
            class="text-[28px] text-text leading-none tracking-[-0.055em] font-500 transition-opacity duration-300 [grid-area:1/1] tabular-nums"
            :class="activeIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'"
          >
            {{ timelineYear.year }}
          </p>
        </div>
        <p class="text-[11px] text-text/55 leading-none tracking-[0.08em] font-500 uppercase tabular-nums">
          {{ (activeIndex + 1).toString().padStart(2, '0') }} / {{ timelineYears.length.toString().padStart(2, '0') }}
        </p>
      </div>
      <div class="mt-3 bg-line h-[1px] overflow-hidden">
        <div
          class="bg-text/55 h-full transition-[width] duration-500 ease-out"
          :style="{ width: `${((activeIndex + 1) / timelineYears.length) * 100}%` }"
        />
      </div>
    </div>

    <div class="gap-x-14 grid items-start lg:gap-x-24 md:grid-cols-[minmax(0,1.42fr)_minmax(17rem,0.58fr)]">
      <div class="divide-line divide-y">
        <section
          v-for="(group, groupIndex) in experienceGroups"
          :key="`${group.item.company}-${group.item.role}`"
          class="py-14 grid grid-cols-[minmax(0,1fr)_1px] min-h-[120vh] items-start md:py-0 md:min-h-[140vh]"
        >
          <div class="self-stretch">
            <article class="top-[11rem] sticky md:py-[4vh] md:top-[10vh]">
              <div class="max-w-[56rem]">
                <div class="mb-8 md:mb-12">
                  <p class="text-[12px] text-muted/60 leading-none tracking-[0.08em] font-500 uppercase tabular-nums">
                    chapter {{ (groupIndex + 1).toString().padStart(2, '0') }}
                  </p>
                </div>

                <h3 class="text-[clamp(3.5rem,7vw,7.5rem)] text-text leading-[0.84] tracking-[-0.07em] font-500">
                  {{ group.item.company }}
                </h3>
                <p class="text-[19px] text-text/48 leading-[1.08] tracking-[-0.04em] font-500 mt-5 lowercase md:text-[24px]">
                  {{ group.item.role }}
                </p>

                <p class="text-[23px] text-text/76 leading-[1.28] tracking-[-0.03em] mt-8 max-w-[54rem] md:text-[30px] md:mt-12">
                  {{ group.item.summary }}
                </p>
              </div>
            </article>
          </div>

          <div aria-hidden="true">
            <div
              v-for="timelineYear in group.years"
              :key="`${group.item.company}-${timelineYear.year}`"
              :ref="setItemRef(timelineYear.timelineIndex)"
              :data-experience-year="timelineYear.year"
              class="h-[65vh] md:h-[85vh]"
            />
            <div class="h-[24vh] md:h-[32vh]" />
          </div>
        </section>
      </div>

      <aside class="pb-[16vh] pt-[10vh] min-h-[80vh] hidden top-[10vh] sticky md:flex md:flex-col md:justify-between">
        <div class="grid overflow-hidden">
          <p
            v-for="(timelineYear, index) in timelineYears"
            :key="timelineYear.year"
            class="text-[clamp(3.2rem,4.8vw,5.5rem)] text-text leading-[0.88] tracking-[-0.075em] font-500 whitespace-nowrap transition-opacity duration-300 [grid-area:1/1] tabular-nums"
            :class="activeIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'"
          >
            {{ timelineYear.year }}
          </p>
        </div>

        <div class="space-y-5">
          <div class="bg-line h-[1px] overflow-hidden">
            <div
              class="bg-text/55 h-full transition-[width] duration-500 ease-out"
              :style="{ width: `${((activeIndex + 1) / timelineYears.length) * 100}%` }"
            />
          </div>
          <div class="text-[12px] text-text/55 leading-none tracking-[0.08em] font-500 flex uppercase justify-between tabular-nums">
            <span>{{ (activeIndex + 1).toString().padStart(2, '0') }}</span>
            <span>{{ timelineYears.length.toString().padStart(2, '0') }}</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
