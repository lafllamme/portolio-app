<script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue'
import RouteTransitionLayer from '~/components/RouteTransitionLayer.vue'
import StickyMenu from '~/components/StickyMenu.vue'
</script>

<template>
  <main class="page-shell">
    <RouteTransitionLayer>
      <div class="route-nav-shell">
        <StickyMenu />
      </div>
      <div class="route-content-shell">
        <slot />
        <AppFooter />
      </div>
    </RouteTransitionLayer>
  </main>
</template>
