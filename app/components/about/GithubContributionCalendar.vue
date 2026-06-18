<script setup lang="ts">
import type { BorderGlowSettings } from '~~/shared/borderGlow'
import type { GithubActivityData, GithubContributionData, GithubContributionLevel } from '~~/shared/github'
import { useElementSize, useIntersectionObserver, useRafFn } from '@vueuse/core'
import { computed, ref } from 'vue'
import BorderGlow from '~/components/ui/BorderGlow.vue'

const props = defineProps<{
  activity: GithubActivityData | null
  contributions: GithubContributionData | null
  hasError: boolean
  isLoading: boolean
  username: string
  profileUrl: string
  borderGlow?: BorderGlowSettings
  variant?: 'default' | 'minimal'
}>()

const calendarRef = ref<HTMLElement | null>(null)
const calendarFrameRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
const hasEntered = ref(false)
const isTooltipVisible = ref(false)
const hoveredDate = ref<string | null>(null)
const hoveredCount = ref<number | null>(null)
const mousePos = ref({ x: 0, y: 0 })
const tooltipTargetPos = ref({ x: 0, y: 0 })
const tooltipRenderPos = ref({ x: 0, y: 0 })
const tooltipPaddingPx = 12
const tooltipOffsetPx = 14

const { width: calendarFrameWidth } = useElementSize(calendarFrameRef)
const { width: tooltipWidth, height: tooltipHeight } = useElementSize(tooltipRef)

const levelClassMap = {
  NONE: 'bg-activity0',
  FIRST_QUARTILE: 'bg-activity1',
  SECOND_QUARTILE: 'bg-activity2',
  THIRD_QUARTILE: 'bg-activity3',
  FOURTH_QUARTILE: 'bg-activity4',
} as const

const weeks = computed(() => props.contributions?.contributions ?? [])
const totalContributions = computed(() => props.contributions?.totalContributions ?? 0)
const activeVariant = computed(() => props.variant ?? 'minimal')
const lastCommitRelative = computed(() => props.activity?.lastCommitRelative ?? null)
const tooltipDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const tooltipTargetStyle = computed(() => {
  const availableWidth = calendarFrameWidth.value
  const currentTooltipWidth = tooltipWidth.value
  const currentTooltipHeight = tooltipHeight.value
  const fallbackWidth = 220
  const fallbackHeight = 44
  const resolvedWidth = currentTooltipWidth || fallbackWidth
  const resolvedHeight = currentTooltipHeight || fallbackHeight

  if (!availableWidth) {
    return {
      x: mousePos.value.x,
      y: Math.max(mousePos.value.y - resolvedHeight - tooltipOffsetPx, tooltipPaddingPx),
    }
  }

  const rawLeft = mousePos.value.x - (resolvedWidth / 2)
  const clampedLeft = Math.min(
    Math.max(rawLeft, tooltipPaddingPx),
    Math.max(availableWidth - resolvedWidth - tooltipPaddingPx, tooltipPaddingPx),
  )
  const preferredTop = mousePos.value.y - resolvedHeight - tooltipOffsetPx
  const fallbackTop = mousePos.value.y + tooltipOffsetPx
  const nextTop = preferredTop < tooltipPaddingPx ? fallbackTop : preferredTop

  return {
    x: clampedLeft,
    y: Math.max(nextTop, tooltipPaddingPx),
  }
})

const tooltipStyle = computed(() => ({
  transform: `translate3d(${tooltipRenderPos.value.x}px, ${tooltipRenderPos.value.y}px, 0)`,
}))

const monthLabels = computed(() => {
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' })
  let previousMonth = ''

  return weeks.value.map((week) => {
    const firstDay = week.find(day => day.date)
    if (!firstDay)
      return ''

    const month = formatter.format(new Date(firstDay.date))
    if (month === previousMonth)
      return ''

    previousMonth = month
    return month
  })
})

const levelClassFor = (level: GithubContributionLevel) => levelClassMap[level] ?? levelClassMap.NONE
const formatTooltipDate = (value: string) => tooltipDateFormatter.format(new Date(value))

function cellStyleFor(weekIndex: number, dayIndex: number) {
  const delayMs = ((weekIndex + dayIndex) * 14)
  const baseScale = activeVariant.value === 'minimal' ? '0.76' : '1'

  if (!hasEntered.value) {
    return {
      opacity: '0',
      transform: 'scale(0)',
    }
  }

  return {
    opacity: '1',
    transform: `scale(${baseScale})`,
    transition: `transform 680ms cubic-bezier(0.22,1,0.36,1) ${delayMs}ms, opacity 260ms ease-out ${delayMs}ms`,
  }
}

function handleCellHover(day: GithubContributionData['contributions'][number][number], event: MouseEvent) {
  isTooltipVisible.value = true
  hoveredDate.value = day.date
  hoveredCount.value = day.contributionCount

  const target = event.currentTarget
  if (!(target instanceof HTMLElement) || !calendarFrameRef.value)
    return

  const rect = target.getBoundingClientRect()
  const parentRect = calendarFrameRef.value.getBoundingClientRect()

  mousePos.value = {
    x: rect.left - parentRect.left + (rect.width / 2),
    y: rect.top - parentRect.top,
  }

  const nextTarget = tooltipTargetStyle.value
  tooltipTargetPos.value = nextTarget

  if (!tooltipRef.value) {
    tooltipRenderPos.value = nextTarget
  }
}

function handleCellMove(day: GithubContributionData['contributions'][number][number], event: MouseEvent) {
  handleCellHover(day, event)
}

function clearHover() {
  isTooltipVisible.value = false
}

useRafFn(() => {
  if (!isTooltipVisible.value)
    return

  const nextTarget = tooltipTargetStyle.value
  tooltipTargetPos.value = nextTarget

  tooltipRenderPos.value = {
    x: tooltipRenderPos.value.x + ((tooltipTargetPos.value.x - tooltipRenderPos.value.x) * 0.22),
    y: tooltipRenderPos.value.y + ((tooltipTargetPos.value.y - tooltipRenderPos.value.y) * 0.22),
  }
})

const { stop: stopIntersectionObserver } = useIntersectionObserver(calendarRef, ([entry]) => {
  if (!entry?.isIntersecting || hasEntered.value)
    return

  hasEntered.value = true
  stopIntersectionObserver()
}, {
  threshold: 0.2,
})
</script>

<template>
  <BorderGlow
    :animated="props.borderGlow?.animated"
    :background-color="props.borderGlow?.backgroundColor"
    :border-radius="props.borderGlow?.borderRadius"
    :colors="props.borderGlow?.colors"
    :cone-spread="props.borderGlow?.coneSpread"
    :edge-sensitivity="props.borderGlow?.edgeSensitivity"
    :fill-opacity="props.borderGlow?.fillOpacity"
    :glow-color="props.borderGlow?.glowColor"
    :glow-intensity="props.borderGlow?.glowIntensity"
    :glow-radius="props.borderGlow?.glowRadius"
  >
    <div ref="calendarRef" class="p-4 rounded-[16px] md:p-[1.15rem]">
      <div v-if="props.isLoading" class="rounded-[12px] bg-surface/55 h-[14.5rem] animate-pulse" />

      <div v-else-if="props.hasError" class="p-4 border border-line rounded-[12px] bg-surface/55 space-y-3">
        <p class="text-[18px] text-text leading-[1.15] tracking-[-0.04em] font-500 lowercase">
          github activity unavailable
        </p>
        <p class="text-[15px] text-text/62 leading-[1.35] tracking-[-0.02em]">
          The public contribution feed did not respond right now. The profile link still goes straight to GitHub.
        </p>
        <a
          :href="profileUrl"
          target="_blank"
          rel="noreferrer"
          class="text-[15px] text-text leading-[1] tracking-[-0.02em] font-500 inline-flex"
        >
          open github profile
        </a>
      </div>

      <div v-else class="space-y-[0.85rem]">
        <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <a
            :href="profileUrl"
            target="_blank"
            rel="noreferrer"
            class="text-[16px] text-text leading-[1] tracking-[-0.03em] font-500 inline-flex gap-[0.52rem] w-max transition-opacity duration-200 items-center hover:opacity-75"
          >
            <Icon name="mdi:github" class="text-text/80 size-5" />
            <span>@{{ username }}</span>
          </a>

          <div class="flex flex-col gap-[0.2rem] md:text-right md:items-end">
            <p class="text-[15px] text-text/62 leading-[1.05] tracking-[-0.02em] whitespace-nowrap">
              {{ totalContributions }} contributions in the last year
            </p>
            <p v-if="lastCommitRelative" class="text-[12px] text-text/42 leading-[1] tracking-[-0.02em] whitespace-nowrap lowercase">
              last commit {{ lastCommitRelative }}
            </p>
          </div>
        </div>

        <div ref="calendarFrameRef" class="relative" @mouseleave="clearHover">
          <div
            ref="tooltipRef"
            class="text-[13px] text-bg leading-[1] tracking-[-0.02em] px-4 py-2 will-change-transform rounded-[14px] bg-text pointer-events-none shadow-[0_16px_36px_rgba(0,0,0,0.32)] transition-opacity duration-150 ease-out left-0 top-0 absolute z-20"
            :class="isTooltipVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
            :style="tooltipStyle"
          >
            <span class="font-700">{{ hoveredCount }}</span>
            <span class="text-bg/66"> contributions on {{ hoveredDate ? formatTooltipDate(hoveredDate) : '' }}</span>
          </div>

          <div class="overflow-x-auto overflow-y-visible">
            <div class="min-w-full w-max relative">
              <div
                v-if="activeVariant !== 'minimal'"
                class="pl-[1.6rem] flex gap-[0.1875rem]"
              >
                <div
                  v-for="(label, index) in monthLabels"
                  :key="`${label}-${index}`"
                  class="text-[10px] text-text/36 leading-[1] tracking-[-0.02em] w-[1rem]"
                  :class="label ? 'opacity-100' : 'opacity-0'"
                >
                  {{ label || '.' }}
                </div>
              </div>

              <div class="flex gap-[0.4rem]" :class="activeVariant !== 'minimal' ? 'mt-[0.45rem]' : ''">
                <div
                  v-if="activeVariant !== 'minimal'"
                  class="py-[0.05rem] flex flex-col justify-between"
                >
                  <span class="text-[10px] text-text/36 leading-[1] tracking-[-0.02em]">M</span>
                  <span class="text-[10px] text-text/36 leading-[1] tracking-[-0.02em]">W</span>
                  <span class="text-[10px] text-text/36 leading-[1] tracking-[-0.02em]">F</span>
                </div>

                <div
                  class="flex flex-nowrap gap-[0.1875rem] max-w-full w-max"
                >
                  <div
                    v-for="(week, weekIndex) in weeks"
                    :key="`week-${weekIndex}`"
                    class="flex flex-col gap-[0.1875rem] w-[1rem] items-center"
                  >
                    <div
                      v-for="(day, dayIndex) in week"
                      :key="day.date"
                      class="will-change-transform rounded-[3px] h-[1rem] w-[1rem] transition-transform duration-200 hover:scale-[1.08]"
                      :class="[
                        levelClassFor(day.contributionLevel),
                        activeVariant === 'minimal' ? 'rounded-full hover:scale-[0.95]' : '',
                      ]"
                      :style="cellStyleFor(weekIndex, dayIndex)"
                      @mouseenter="handleCellHover(day, $event)"
                      @mousemove="handleCellMove(day, $event)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeVariant !== 'minimal'" class="flex gap-2 items-center justify-end">
          <span class="text-[11px] text-text/40 leading-[1] tracking-[-0.02em]">less</span>
          <span class="rounded-[3px] bg-activity0 h-3 w-3" />
          <span class="rounded-[3px] bg-activity1 h-3 w-3" />
          <span class="rounded-[3px] bg-activity2 h-3 w-3" />
          <span class="rounded-[3px] bg-activity3 h-3 w-3" />
          <span class="rounded-[3px] bg-activity4 h-3 w-3" />
          <span class="text-[11px] text-text/40 leading-[1] tracking-[-0.02em]">more</span>
        </div>
      </div>
    </div>
  </BorderGlow>
</template>
