<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    alt: string
    decorative?: boolean
    imgClass?: string
    svg: string
    wrapperClass?: string
  }>(),
  {
    decorative: false,
    imgClass: '',
    wrapperClass: '',
  },
)

const svgMarkup = computed(() => {
  const ariaAttributes = props.decorative
    ? ' aria-hidden="true"'
    : ` role="img" aria-label="${props.alt}"`

  const styleAttributes = ' style="display:block;width:auto;height:100%;max-width:100%;max-height:100%;"'

  return props.svg.replace(
    /<svg\b([^>]*)>/i,
    `<svg$1${styleAttributes}${ariaAttributes}>`,
  )
})
</script>

<template>
  <div
    class="flex shrink-0 h-full items-center justify-center"
    :class="wrapperClass"
  >
    <div
      class="flex h-full w-full items-center justify-center"
      :class="imgClass"
      v-html="svgMarkup"
    />
  </div>
</template>
