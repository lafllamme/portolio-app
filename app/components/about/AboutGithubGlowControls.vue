<script setup lang="ts">
import type { BorderGlowSettings } from '~~/shared/borderGlow'

const settings = defineModel<BorderGlowSettings>({ required: true })

const sliderRows = [
  { key: 'edgeSensitivity', label: 'Edge Sensitivity', max: 100, min: 0, step: 1 },
  { key: 'borderRadius', label: 'Border Radius', max: 60, min: 0, step: 1 },
  { key: 'glowRadius', label: 'Glow Radius', max: 80, min: 0, step: 1 },
  { key: 'glowIntensity', label: 'Glow Intensity', max: 3, min: 0.1, step: 0.1 },
  { key: 'coneSpread', label: 'Cone Spread', max: 45, min: 5, step: 1 },
] as const

const colorKeys = [0, 1, 2] as const
</script>

<template>
  <div class="mt-8 space-y-6">
    <h3 class="text-[28px] text-text leading-[1] tracking-[-0.05em] font-600">
      customize
    </h3>

    <div class="gap-4 grid md:grid-cols-3">
      <label
        v-for="row in sliderRows"
        :key="row.key"
        class="px-6 py-5 border border-line rounded-[20px] bg-[#0c130c] block space-y-4"
      >
        <div class="flex gap-4 items-center justify-between">
          <span class="text-[16px] text-text/72 leading-[1] tracking-[-0.03em]">
            {{ row.label }}
          </span>
          <span class="text-[16px] text-text leading-[1] tracking-[-0.03em] font-600 tabular-nums">
            {{ settings[row.key] }}
          </span>
        </div>

        <input
          v-model="settings[row.key]"
          :min="row.min"
          :max="row.max"
          :step="row.step"
          type="range"
          class="accent-[#c084fc] w-full"
        >
      </label>

      <label class="px-6 py-5 border border-line rounded-[20px] bg-[#0c130c] block space-y-4">
        <div class="flex gap-4 items-center justify-between">
          <span class="text-[16px] text-text/72 leading-[1] tracking-[-0.03em]">
            Animated Intro
          </span>
          <input
            v-model="settings.animated"
            type="checkbox"
            class="accent-[#c084fc] h-5 w-5"
          >
        </div>
      </label>

      <label class="px-6 py-5 border border-line rounded-[20px] bg-[#0c130c] block space-y-4">
        <div class="flex gap-4 items-center justify-between">
          <span class="text-[16px] text-text/72 leading-[1] tracking-[-0.03em]">
            Background
          </span>
          <div class="flex gap-3 items-center">
            <input
              v-model="settings.backgroundColor"
              type="color"
              class="p-0 border border-line rounded-[12px] bg-transparent h-11 w-11 cursor-pointer"
            >
            <input
              v-model="settings.backgroundColor"
              type="text"
              class="text-[16px] text-text leading-[1] tracking-[-0.03em] font-mono px-3 py-2 border border-line rounded-[12px] bg-transparent w-[7.5rem] lowercase"
            >
          </div>
        </div>
      </label>
    </div>

    <div class="space-y-4">
      <p class="text-[20px] text-text leading-[1] tracking-[-0.04em] font-500">
        gradient colors
      </p>

      <div class="gap-4 grid md:grid-cols-3">
        <label
          v-for="colorKey in colorKeys"
          :key="colorKey"
          class="px-6 py-5 border border-line rounded-[20px] bg-[#0c130c] block"
        >
          <div class="flex gap-4 items-center justify-between">
            <span class="text-[16px] text-text/72 leading-[1] tracking-[-0.03em]">
              Color {{ colorKey + 1 }}
            </span>
            <div class="flex gap-3 items-center">
              <input
                v-model="settings.colors[colorKey]"
                type="color"
                class="p-0 border border-line rounded-[12px] bg-transparent h-11 w-11 cursor-pointer"
              >
              <input
                v-model="settings.colors[colorKey]"
                type="text"
                class="text-[16px] text-text leading-[1] tracking-[-0.03em] font-mono px-3 py-2 border border-line rounded-[12px] bg-transparent w-[7.5rem] lowercase"
              >
            </div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
