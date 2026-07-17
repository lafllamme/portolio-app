<script setup lang="ts">
import { homeClosingContent } from '~~/shared/home-closing'
import HomeClosingClipDefs from '~/components/home/closing/HomeClosingClipDefs.vue'
import HomeClosingFragmentRail from '~/components/home/closing/HomeClosingFragmentRail.vue'
import HomeClosingManifestStack from '~/components/home/closing/HomeClosingManifestStack.vue'
import HomeClosingPrinciplesStack from '~/components/home/closing/HomeClosingPrinciplesStack.vue'
</script>

<template>
  <section id="closing-showcase" class="mt-[13rem] md:mt-[16rem]">
    <HomeClosingClipDefs />
    <HomeClosingManifestStack :slides="homeClosingContent.manifestSlides" />
    <HomeClosingFragmentRail
      :eyebrow="homeClosingContent.fragmentEyebrow"
      :title="homeClosingContent.fragmentTitle"
      :description="homeClosingContent.fragmentDescription"
      :fragments="homeClosingContent.fragments"
    />
    <HomeClosingPrinciplesStack
      :eyebrow="homeClosingContent.principleEyebrow"
      :principles="homeClosingContent.principles"
    />
  </section>
</template>
