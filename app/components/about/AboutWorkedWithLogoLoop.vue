<script setup lang="ts">
import type { WorkLogoItem } from '~/components/logos/work/workLogos'
import { computed } from 'vue'
import BrandLogo from '~/components/logos/work/BrandLogo.vue'
import { workLogosByCompany } from '~/components/logos/work/workLogos'
import LogoLoop from '~/components/ui/logo-loop/LogoLoop.vue'

const props = defineProps<{
  companies: string[]
}>()

const logos = computed<WorkLogoItem[]>(() => {
  return props.companies
    .map(company => workLogosByCompany[company])
    .filter((logo): logo is WorkLogoItem => Boolean(logo))
})
</script>

<template>
  <div class="pt-2 overflow-hidden">
    <LogoLoop
      :speed="64"
      :gap="46"
      :logo-height="44"
      :pause-on-hover="true"
      direction="left"
      :fade-out="true"
      fade-out-color="#0a0d12"
      :scale-on-hover="false"
      aria-label="Worked with company logos"
      class="py-3"
    >
      <NuxtLink
        v-for="logo in logos"
        :key="logo.company"
        :to="logo.href"
        :title="logo.title"
        :aria-label="`Open ${logo.company} website in a new tab`"
        target="_blank"
        rel="noreferrer noopener"
        external
        class="group text-text flex shrink-0 h-12 items-center justify-center transition-[color,opacity] duration-250 ease-out [--brand-logo-opacity:1] hover:text-text/72 hover:[--brand-logo-opacity:0.72] focus-visible:text-text/72 focus-visible:[--brand-logo-opacity:0.72] md:h-14"
        :class="logo.slotClass"
      >
        <BrandLogo
          :svg="logo.svg"
          :alt="logo.alt"
          :img-class="logo.imgClass"
          :wrapper-class="logo.wrapperClass"
        />
      </NuxtLink>
    </LogoLoop>
  </div>
</template>
