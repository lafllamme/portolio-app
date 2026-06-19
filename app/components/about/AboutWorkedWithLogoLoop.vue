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
      <div
        v-for="logo in logos"
        :key="logo.company"
        class="group text-text/46 flex shrink-0 h-12 transition-[color,opacity] duration-250 ease-out [--brand-logo-opacity:0.46] items-center justify-center hover:text-text/88 md:h-14 hover:[--brand-logo-opacity:0.88]"
        :class="logo.slotClass"
      >
        <BrandLogo
          :svg="logo.svg"
          :alt="logo.alt"
          :img-class="logo.imgClass"
          :wrapper-class="logo.wrapperClass"
        />
      </div>
    </LogoLoop>
  </div>
</template>
