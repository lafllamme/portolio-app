<script setup lang="ts">
import type { BorderGlowSettings } from '~~/shared/borderGlow'
import { aboutPageContent } from '~~/shared/about'
import { borderGlowDefaults } from '~~/shared/borderGlow'
import GithubContributionCalendar from '~/components/about/GithubContributionCalendar.vue'
import { useGithubActivity } from '~/composables/useGithubActivity'

const github = aboutPageContent.github
const { activity, contributions, hasError, isLoading } = useGithubActivity({
  username: github.username,
})

const borderGlowSettings = {
  ...borderGlowDefaults,
  backgroundColor: '#0d0f13',
  borderRadius: 8,
  colors: ['#68bb95', '#4d8b72', '#9f9b93'],
  fillOpacity: 0.16,
  glowColor: '154 42 58',
  glowIntensity: 0.7,
  glowRadius: 24,
} satisfies BorderGlowSettings
</script>

<template>
  <section class="mt-[10.5rem] md:mt-[12.5rem]">
    <div class="gap-8 grid items-end md:gap-12 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">
      <div class="space-y-3">
        <p class="text-[16px] text-muted leading-[19.2px] tracking-[-0.32px] lowercase">
          {{ github.title }}
        </p>
        <p class="text-[28px] text-text leading-[1.02] tracking-[-0.05em] font-500 md:text-[42px]">
          a snapshot of how i build and ship
        </p>
      </div>

      <p class="text-[18px] text-text/66 leading-[1.28] tracking-[-0.03em] max-w-[44rem] md:text-[21px] md:justify-self-end">
        {{ github.description }}
      </p>
    </div>
    <div class="mt-6 md:mt-7">
      <GithubContributionCalendar
        :activity="activity"
        :border-glow="borderGlowSettings"
        :contributions="contributions"
        :has-error="hasError"
        :is-loading="isLoading"
        :profile-url="github.profileUrl"
        :username="github.username"
        variant="minimal"
      />
    </div>
  </section>
</template>
