<script setup lang="ts">
import { computed } from 'vue'
import { useRouteTransitionController } from '~/composables/useRouteTransitionController'

const transition = useRouteTransitionController()

const stageClass = computed(() => ({
  'route-transition__stage': true,
  'route-transition__stage--leaving': transition.state.phase === 'leaving',
  'route-transition__stage--covered': transition.state.phase === 'covered',
  'route-transition__stage--entering': transition.state.phase === 'entering',
}))

const curtainClass = computed(() => ({
  'route-transition__curtain': true,
  'route-transition__curtain--leaving': transition.state.phase === 'leaving',
  'route-transition__curtain--covered': transition.state.phase === 'covered',
  'route-transition__curtain--entering': transition.state.phase === 'entering',
}))

const rootClass = computed(() => ({
  'route-transition': true,
  'route-transition--active': transition.state.isActive,
}))
</script>

<template>
  <div :class="rootClass">
    <div :class="stageClass">
      <slot />
    </div>
    <div
      aria-hidden="true"
      :class="curtainClass"
    />
  </div>
</template>
