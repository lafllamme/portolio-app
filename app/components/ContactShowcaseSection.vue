<script setup lang="ts">
import { computed } from 'vue'
import { aboutPageContent } from '~~/shared/about'
import ContactImageStackCarousel from '~/components/contact/ContactImageStackCarousel.vue'
import { useContactMailto } from '~/composables/useContactMailto'

const contact = computed(() => aboutPageContent.contact)
const mailToHref = useContactMailto(computed(() => contact.value.email))
</script>

<template>
  <section id="contact" class="mt-[11.5rem]">
    <a
      :href="mailToHref"
      :aria-label="`Email ${contact.email}`"
      class="gap-8 grid transition-opacity duration-250 items-center hover:opacity-90 md:grid-cols-3"
    >
      <h2 class="text-[clamp(4.4rem,24vw,8rem)] leading-[0.9] tracking-[-0.095em] font-700 font-headline justify-self-start md:text-[clamp(8rem,13.2vw,10.5rem)]">
        {{ aboutPageContent.contactTitleStart }}
      </h2>

      <ContactImageStackCarousel :images="contact.visuals" />

      <h2 class="text-[clamp(4.4rem,24vw,8rem)] leading-[0.9] tracking-[-0.095em] font-700 font-headline justify-self-end md:text-[clamp(8rem,13.2vw,10.5rem)] md:text-right">
        {{ aboutPageContent.contactTitleEnd }}
      </h2>
    </a>
  </section>
</template>
