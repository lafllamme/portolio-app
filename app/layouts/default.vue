<script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue'
import StickyMenu from '~/components/StickyMenu.vue'
</script>

<template>
  <main class="page-shell">
    <StickyMenu />
    <slot />
    <AppFooter />
  </main>
</template>
