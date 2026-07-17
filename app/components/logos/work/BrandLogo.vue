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

  return props.svg
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<desc\b[^>]*>[\s\S]*?<\/desc>/gi, '')
    .replace(/\saria-label="[^"]*"/gi, '')
    .replace(/\saria-labelledby="[^"]*"/gi, '')
    .replace(/\srole="[^"]*"/gi, '')
    .replace(
      /<svg\b([^>]*)>/i,
      `<svg$1${styleAttributes}${ariaAttributes}>`,
    )
    .replace(/fill="#([a-f0-9]{3}(?:[a-f0-9]{3})?)"/gi, 'fill="currentColor"')
    .replace(/fill:\s*#([a-f0-9]{3}(?:[a-f0-9]{3})?)/gi, 'fill: currentColor')
    .replace(/stroke="#([a-f0-9]{3}(?:[a-f0-9]{3})?)"/gi, 'stroke="currentColor"')
    .replace(/stroke:\s*#([a-f0-9]{3}(?:[a-f0-9]{3})?)/gi, 'stroke: currentColor')
    .replace(
      /<image\b((?:(?!opacity=)[^>])*)>/gi,
      '<image$1 opacity="var(--brand-logo-opacity,1)">',
    )
})
</script>

<template>
  <div
    class="group flex shrink-0 h-full items-center justify-center media-pull-frame"
    :class="wrapperClass"
  >
    <div
      class="flex h-full w-full media-pull-target items-center justify-center"
      :class="imgClass"
      v-html="svgMarkup"
    />
  </div>
</template>
