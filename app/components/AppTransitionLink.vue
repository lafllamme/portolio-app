<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { NuxtLink } from '#components'

interface Props {
  to: RouteLocationRaw
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})
</script>

<template>
  <NuxtLink :to="props.to" :class="props.class">
    <slot />
  </NuxtLink>
</template>
