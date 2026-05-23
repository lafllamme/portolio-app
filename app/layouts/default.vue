<script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue'
import RouteCurtain from '~/components/RouteCurtain.vue'
import StickyMenu from '~/components/StickyMenu.vue'
</script>

<template>
  <main class="page-shell">
    <div class="route-motion-shell">
      <div class="route-nav-shell">
        <StickyMenu />
      </div>
      <div class="route-content-shell">
        <slot />
        <AppFooter />
      </div>
    </div>
    <RouteCurtain />
  </main>
</template>
