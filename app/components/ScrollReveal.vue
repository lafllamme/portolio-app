<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

interface ScrollContainerRef {
  current: HTMLElement | null
}

interface Props {
  children?: string
  scrollContainerRef?: ScrollContainerRef
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
  rotationEnd?: string
  wordAnimationEnd?: string
}

const props = withDefaults(defineProps<Props>(), {
  children: '',
  scrollContainerRef: undefined,
  enableBlur: true,
  baseOpacity: 0.1,
  baseRotation: 0,
  blurStrength: 4,
  containerClassName: '',
  textClassName: '',
  rotationEnd: 'bottom bottom',
  wordAnimationEnd: 'bottom bottom',
})

gsap.registerPlugin(ScrollTrigger)

const containerRef = ref<HTMLElement | null>(null)
const triggerInstances: ScrollTrigger[] = []

const splitText = computed(() => {
  return props.children.split(/(\s+)/).map((text, index) => ({
    text,
    isWhitespace: /^\s+$/.test(text),
    key: `${text}-${index}`,
  }))
})

function killTriggers() {
  for (const trigger of triggerInstances) {
    trigger.kill()
  }
  triggerInstances.length = 0
}

function resolveScroller(): HTMLElement | Window {
  const customScroller = props.scrollContainerRef?.current
  return customScroller ?? window
}

async function initializeAnimation() {
  if (!import.meta.client)
    return

  await nextTick()
  const container = containerRef.value
  if (!container)
    return

  killTriggers()

  const scroller = resolveScroller()
  const wordElements = container.querySelectorAll<HTMLElement>('[data-scroll-word="true"]')

  const rotationTween = gsap.fromTo(
    container,
    { transformOrigin: '0% 50%', rotate: props.baseRotation },
    {
      ease: 'none',
      rotate: 0,
      scrollTrigger: {
        trigger: container,
        scroller,
        start: 'top bottom',
        end: props.rotationEnd,
        scrub: true,
      },
    },
  )

  if (rotationTween.scrollTrigger) {
    triggerInstances.push(rotationTween.scrollTrigger)
  }

  const opacityTween = gsap.fromTo(
    wordElements,
    {
      opacity: props.baseOpacity,
      willChange: 'opacity',
    },
    {
      ease: 'none',
      opacity: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: container,
        scroller,
        start: 'top bottom-=20%',
        end: props.wordAnimationEnd,
        scrub: true,
      },
    },
  )

  if (opacityTween.scrollTrigger) {
    triggerInstances.push(opacityTween.scrollTrigger)
  }

  if (props.enableBlur) {
    const blurTween = gsap.fromTo(
      wordElements,
      { filter: `blur(${props.blurStrength}px)` },
      {
        ease: 'none',
        filter: 'blur(0px)',
        stagger: 0.05,
        scrollTrigger: {
          trigger: container,
          scroller,
          start: 'top bottom-=20%',
          end: props.wordAnimationEnd,
          scrub: true,
        },
      },
    )

    if (blurTween.scrollTrigger) {
      triggerInstances.push(blurTween.scrollTrigger)
    }
  }
}

onMounted(() => {
  initializeAnimation()
})

onUnmounted(() => {
  killTriggers()
})

watch(
  [
    () => props.children,
    () => props.scrollContainerRef?.current,
    () => props.enableBlur,
    () => props.baseOpacity,
    () => props.baseRotation,
    () => props.blurStrength,
    () => props.rotationEnd,
    () => props.wordAnimationEnd,
  ],
  () => {
    initializeAnimation()
  },
)
</script>

<template>
  <h2 ref="containerRef" :class="containerClassName">
    <span :class="textClassName">
      <template v-for="word in splitText" :key="word.key">
        <span v-if="!word.isWhitespace" class="inline-block" data-scroll-word="true">{{ word.text }}</span>
        <span v-else>{{ word.text }}</span>
      </template>
    </span>
  </h2>
</template>
