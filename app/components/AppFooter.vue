<script setup lang="ts">
import type { Ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const footerNameWrapRef = ref<HTMLElement | null>(null)
const footerNameRef = ref<HTMLElement | null>(null)
const footerFitPx = ref<number | null>(null)
const footerFitStyle = ref('')

const FOOTER_FILL_RATIO = 1
const FOOTER_EDGE_INSET_PX = 8

/**
 * Fits the footer wordmark to the available inline-size container width.
 */
function fitTitleWidth(containerEl: HTMLElement | null, titleEl: HTMLElement | null, target: Ref<number | null>) {
  if (!containerEl || !titleEl)
    return

  const containerWidth = containerEl.clientWidth
  const availableWidth = containerWidth - (FOOTER_EDGE_INSET_PX * 2)
  if (!containerWidth || availableWidth <= 0)
    return

  const previousFontSize = titleEl.style.fontSize
  titleEl.style.fontSize = ''
  const textWidth = titleEl.scrollWidth
  const computedSize = Number.parseFloat(getComputedStyle(titleEl).fontSize)
  titleEl.style.fontSize = previousFontSize

  if (!textWidth)
    return

  const nextPx = computedSize * (availableWidth / textWidth) * FOOTER_FILL_RATIO
  target.value = Number(nextPx.toFixed(2))
}

/**
 * Recomputes the responsive footer wordmark font size.
 */
function fitFooterTitleWidth() {
  fitTitleWidth(footerNameWrapRef.value, footerNameRef.value, footerFitPx)
  footerFitStyle.value = footerFitPx.value ? `--footer-fit-fs:${footerFitPx.value}px` : ''
}

onMounted(() => {
  requestAnimationFrame(() => {
    fitFooterTitleWidth()
  })
})

useResizeObserver(footerNameWrapRef, () => {
  fitFooterTitleWidth()
})
</script>

<template>
  <footer class="page-wrap mt-[6.5rem] pb-8 pt-[8.5rem] border-t border-line">
    <div class="gap-12 grid grid-cols-1 lg:grid-cols-[1.45fr_1fr]">
      <div class="space-y-4">
        <p class="footer-link">
          email: im@doganteke.dev
        </p>
        <p class="footer-link">
          based in: germany, remote first
        </p>
        <p class="footer-link">
          available for: freelance, consulting & product builds
        </p>
      </div>
      <div class="gap-10 grid grid-cols-2">
        <div>
          <p class="text-[16px] text-muted leading-[19.2px] tracking-[-0.32px]">
            pages
          </p>
          <div class="text-[20px] leading-[24px] tracking-[-0.8px] font-500 mt-2 space-y-1">
            <p>home</p>
            <p>about</p>
            <p>work</p>
          </div>
        </div>
        <div>
          <p class="text-[16px] text-muted leading-[19.2px] tracking-[-0.32px]">
            socials
          </p>
          <div class="text-[20px] leading-[24px] tracking-[-0.8px] font-500 mt-2 space-y-1">
            <p>instagram</p>
            <p>x(twitter)</p>
            <p>linkedin</p>
          </div>
        </div>
      </div>
    </div>
    <div ref="footerNameWrapRef" class="mt-24 [--footer-fs:min(16.9cqw,16.7rem)] [container-type:inline-size]">
      <h2
        ref="footerNameRef"
        class="text-[length:var(--footer-fit-fs,var(--footer-fs))] text-text leading-[1] tracking-[-0.06em] font-700 font-headline px-[8px] pb-[0.46em] w-max block whitespace-nowrap lowercase"
        :style="footerFitStyle"
      >
        dogan teke
      </h2>
    </div>
    <div class="text-sm text-muted mt-4 pt-5 border-t border-stone-700 border-solid flex flex-wrap gap-4 items-center justify-between">
      <p>© 2026 dogan teke. all rights reserved</p>
      <p>fullstack frontend engineering · modern ai products</p>
    </div>
  </footer>
</template>
