<script setup lang="ts">
import type { LenisOptions } from 'lenis'
import { usePreferredReducedMotion } from '@vueuse/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis, VueLenis } from 'lenis/vue'
import { computed, onUnmounted, watch } from 'vue'
import { useNuxtApp } from '#imports'
import { useRouteTransitionController } from '~/composables/useRouteTransitionController'

gsap.registerPlugin(ScrollTrigger)

const nuxtApp = useNuxtApp()
const transition = useRouteTransitionController()
const prefersReducedMotion = usePreferredReducedMotion()

const lenisOptions = computed<LenisOptions>(() => {
  const shouldReduceMotion = prefersReducedMotion.value === 'reduce'

  return {
    anchors: shouldReduceMotion ? { immediate: true } : true,
    autoRaf: false,
    lerp: 0.095,
    smoothWheel: !shouldReduceMotion,
    stopInertiaOnNavigate: true,
    syncTouch: false,
    wheelMultiplier: 0.9,
  }
})

const lenis = useLenis(() => {
  ScrollTrigger.update()
})

function updateLenis(time: number) {
  lenis.value?.raf(time * 1000)
}

function refreshScrollSystems() {
  requestAnimationFrame(() => {
    lenis.value?.resize()
    ScrollTrigger.refresh()
  })
}

gsap.ticker.add(updateLenis)
gsap.ticker.lagSmoothing(0)

const removePageFinishHook = nuxtApp.hook('page:finish', refreshScrollSystems)

watch(
  [lenis, () => transition.state.isActive],
  ([instance, isTransitionActive]) => {
    if (!instance)
      return

    if (isTransitionActive) {
      instance.stop()
      return
    }

    instance.start()
  },
  { immediate: true },
)

onUnmounted(() => {
  removePageFinishHook()
  gsap.ticker.remove(updateLenis)
})
</script>

<template>
  <VueLenis root :options="lenisOptions" />
</template>
