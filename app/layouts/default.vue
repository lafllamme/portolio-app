<script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue'
import StickyMenu from '~/components/StickyMenu.vue'
</script>

<template>
  <main class="page-shell">
    <div class="route-nav-shell">
      <StickyMenu />
    </div>
    <div class="route-content-shell">
      <slot />
      <AppFooter />
    </div>
  </main>
</template>
