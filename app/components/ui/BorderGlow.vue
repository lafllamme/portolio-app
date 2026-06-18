<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { borderGlowDefaults } from '~~/shared/borderGlow'

const props = withDefaults(
  defineProps<{
    animated?: boolean
    backgroundColor?: string
    borderRadius?: number
    class?: string
    colors?: string[]
    coneSpread?: number
    edgeSensitivity?: number
    fillOpacity?: number
    glowColor?: string
    glowIntensity?: number
    glowRadius?: number
  }>(),
  {
    animated: borderGlowDefaults.animated,
    backgroundColor: borderGlowDefaults.backgroundColor,
    borderRadius: borderGlowDefaults.borderRadius,
    class: '',
    colors: () => [...borderGlowDefaults.colors],
    coneSpread: borderGlowDefaults.coneSpread,
    edgeSensitivity: borderGlowDefaults.edgeSensitivity,
    fillOpacity: borderGlowDefaults.fillOpacity,
    glowColor: borderGlowDefaults.glowColor,
    glowIntensity: borderGlowDefaults.glowIntensity,
    glowRadius: borderGlowDefaults.glowRadius,
  },
)

const cardRef = ref<HTMLDivElement | null>(null)

function parseHsl(hslStr: string) {
  const match = hslStr.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%?\s+(\d+(?:\.\d+)?)%?/)
  if (!match) {
    return { h: 40, l: 80, s: 80 }
  }

  return {
    h: Number.parseFloat(match[1] ?? '40'),
    l: Number.parseFloat(match[3] ?? '80'),
    s: Number.parseFloat(match[2] ?? '80'),
  }
}

const GRADIENT_POSITIONS = [
  '80% 55%',
  '69% 34%',
  '8% 6%',
  '41% 38%',
  '86% 85%',
  '82% 18%',
  '51% 4%',
] as const

const GRADIENT_KEYS = [
  '--gradient-one',
  '--gradient-two',
  '--gradient-three',
  '--gradient-four',
  '--gradient-five',
  '--gradient-six',
  '--gradient-seven',
] as const

const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1] as const

const rootClassName = computed(() => ['border-glow-card', props.class].filter(Boolean).join(' '))

const cardStyle = computed(() => {
  const { h, l, s } = parseHsl(props.glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const opacities = [100, 60, 50, 40, 30, 20, 10] as const
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'] as const
  const vars: Record<string, string | number> = {}

  opacities.forEach((opacity, index) => {
    vars[`--glow-color${keys[index]}`] = `hsl(${base} / ${Math.min(opacity * props.glowIntensity, 100)}%)`
  })

  GRADIENT_KEYS.forEach((key, index) => {
    const color = props.colors[Math.min(COLOR_MAP[index] ?? 0, props.colors.length - 1)] ?? props.colors[0] ?? '#c084fc'
    vars[key] = `radial-gradient(at ${GRADIENT_POSITIONS[index]}, ${color} 0px, transparent 50%)`
  })

  vars['--gradient-base'] = `linear-gradient(${props.colors[0] ?? '#c084fc'} 0 100%)`
  vars['--card-bg'] = props.backgroundColor
  vars['--edge-sensitivity'] = props.edgeSensitivity
  vars['--border-radius'] = `${props.borderRadius}px`
  vars['--glow-padding'] = `${props.glowRadius}px`
  vars['--cone-spread'] = props.coneSpread
  vars['--fill-opacity'] = props.fillOpacity

  return vars
})

function getCenterOfElement(element: HTMLElement) {
  const { height, width } = element.getBoundingClientRect()
  return [width / 2, height / 2] as const
}

function getEdgeProximity(element: HTMLElement, x: number, y: number) {
  const [centerX, centerY] = getCenterOfElement(element)
  const dx = x - centerX
  const dy = y - centerY
  let kx = Infinity
  let ky = Infinity

  if (dx !== 0)
    kx = centerX / Math.abs(dx)
  if (dy !== 0)
    ky = centerY / Math.abs(dy)

  return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
}

function getCursorAngle(element: HTMLElement, x: number, y: number) {
  const [centerX, centerY] = getCenterOfElement(element)
  const dx = x - centerX
  const dy = y - centerY

  if (dx === 0 && dy === 0)
    return 0

  const radians = Math.atan2(dy, dx)
  let degrees = (radians * (180 / Math.PI)) + 90
  if (degrees < 0)
    degrees += 360
  return degrees
}

function handlePointerMove(event: PointerEvent) {
  const card = cardRef.value
  if (!card)
    return

  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const edge = getEdgeProximity(card, x, y)
  const angle = getCursorAngle(card, x, y)

  card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`)
  card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`)
}

function easeOutCubic(x: number) {
  return 1 - (1 - x) ** 3
}

function easeInCubic(x: number) {
  return x * x * x
}

function animateValue(options: {
  delay?: number
  duration?: number
  ease?: (t: number) => number
  end?: number
  onEnd?: () => void
  onUpdate: (v: number) => void
  start?: number
}) {
  const {
    delay = 0,
    duration = 1000,
    ease = easeOutCubic,
    end = 100,
    onEnd,
    onUpdate,
    start = 0,
  } = options

  const startedAt = performance.now() + delay

  function tick() {
    const elapsed = performance.now() - startedAt
    const t = Math.min(elapsed / duration, 1)
    onUpdate(start + ((end - start) * ease(t)))

    if (t < 1)
      requestAnimationFrame(tick)
    else
      onEnd?.()
  }

  setTimeout(requestAnimationFrame, delay, tick)
}

onMounted(() => {
  if (!props.animated || !cardRef.value)
    return

  const card = cardRef.value
  const angleStart = 110
  const angleEnd = 465

  card.classList.add('sweep-active')
  card.style.setProperty('--cursor-angle', `${angleStart}deg`)

  animateValue({
    duration: 500,
    onUpdate: value => card.style.setProperty('--edge-proximity', `${value}`),
  })

  animateValue({
    duration: 1500,
    ease: easeInCubic,
    end: 50,
    onUpdate: value => card.style.setProperty('--cursor-angle', `${((angleEnd - angleStart) * (value / 100)) + angleStart}deg`),
  })

  animateValue({
    delay: 1500,
    duration: 2250,
    ease: easeOutCubic,
    end: 100,
    onUpdate: value => card.style.setProperty('--cursor-angle', `${((angleEnd - angleStart) * (value / 100)) + angleStart}deg`),
    start: 50,
  })

  animateValue({
    delay: 2500,
    duration: 1500,
    ease: easeInCubic,
    end: 0,
    onEnd: () => card.classList.remove('sweep-active'),
    onUpdate: value => card.style.setProperty('--edge-proximity', `${value}`),
    start: 100,
  })
})
</script>

<template>
  <div
    ref="cardRef"
    :class="rootClassName"
    :style="cardStyle"
    @pointermove="handlePointerMove"
  >
    <span class="edge-light" />
    <div class="border-glow-inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.border-glow-card {
  --edge-proximity: 0;
  --cursor-angle: 45deg;
  --color-sensitivity: calc(var(--edge-sensitivity) + 20);

  position: relative;
  border: 1px solid rgb(255 255 255 / 15%);
  border-radius: var(--border-radius);
  background: var(--card-bg, #060010);
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 2px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px,
    rgba(0, 0, 0, 0.1) 0px 4px 8px,
    rgba(0, 0, 0, 0.1) 0px 8px 16px,
    rgba(0, 0, 0, 0.1) 0px 16px 32px,
    rgba(0, 0, 0, 0.1) 0px 32px 64px;
  display: grid;
  isolation: isolate;
  overflow: visible;
  transform: translate3d(0, 0, 0.01px);
}

.border-glow-card::before,
.border-glow-card::after,
.border-glow-card > .edge-light {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  transition: opacity 0.25s ease-out;
}

.border-glow-card:not(:hover):not(.sweep-active)::before,
.border-glow-card:not(:hover):not(.sweep-active)::after,
.border-glow-card:not(:hover):not(.sweep-active) > .edge-light {
  opacity: 0;
  transition: opacity 0.75s ease-in-out;
}

.border-glow-card::before {
  opacity: calc((var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)));
  border: 1px solid transparent;
  background:
    linear-gradient(var(--card-bg, #060010) 0 100%) padding-box,
    linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box,
    var(--gradient-one) border-box,
    var(--gradient-two) border-box,
    var(--gradient-three) border-box,
    var(--gradient-four) border-box,
    var(--gradient-five) border-box,
    var(--gradient-six) border-box,
    var(--gradient-seven) border-box,
    var(--gradient-base) border-box;
  mask-image: conic-gradient(
    from var(--cursor-angle) at center,
    black calc(var(--cone-spread) * 1%),
    transparent calc((var(--cone-spread) + 15) * 1%),
    transparent calc((100 - var(--cone-spread) - 15) * 1%),
    black calc((100 - var(--cone-spread)) * 1%)
  );
}

.border-glow-card::after {
  opacity: calc(
    var(--fill-opacity) * (var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity))
  );
  border: 1px solid transparent;
  background:
    var(--gradient-one) padding-box,
    var(--gradient-two) padding-box,
    var(--gradient-three) padding-box,
    var(--gradient-four) padding-box,
    var(--gradient-five) padding-box,
    var(--gradient-six) padding-box,
    var(--gradient-seven) padding-box,
    var(--gradient-base) padding-box;
  mask-composite: subtract, add, add, add, add, add;
  mask-image:
    linear-gradient(to bottom, black, black), radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%),
    radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%),
    radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%),
    radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%),
    radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%),
    conic-gradient(from var(--cursor-angle) at center, transparent 5%, black 15%, black 85%, transparent 95%);
  mix-blend-mode: soft-light;
}

.border-glow-card > .edge-light {
  inset: calc(var(--glow-padding) * -1);
  z-index: 1;
  mix-blend-mode: plus-lighter;
  opacity: calc((var(--edge-proximity) - var(--edge-sensitivity)) / (100 - var(--edge-sensitivity)));
  pointer-events: none;
  mask-image: conic-gradient(
    from var(--cursor-angle) at center,
    black 2.5%,
    transparent 10%,
    transparent 90%,
    black 97.5%
  );
}

.border-glow-card > .edge-light::before {
  content: '';
  position: absolute;
  inset: var(--glow-padding);
  border-radius: inherit;
  box-shadow:
    inset 0 0 0 1px var(--glow-color),
    inset 0 0 1px 0 var(--glow-color-60),
    inset 0 0 3px 0 var(--glow-color-50),
    inset 0 0 6px 0 var(--glow-color-40),
    inset 0 0 15px 0 var(--glow-color-30),
    inset 0 0 25px 2px var(--glow-color-20),
    inset 0 0 50px 2px var(--glow-color-10),
    0 0 1px 0 var(--glow-color-60),
    0 0 3px 0 var(--glow-color-50),
    0 0 6px 0 var(--glow-color-40),
    0 0 15px 0 var(--glow-color-30),
    0 0 25px 2px var(--glow-color-20),
    0 0 50px 2px var(--glow-color-10);
}

.border-glow-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
</style>
