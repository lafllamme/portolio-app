import { createGlobalState } from '@vueuse/core'
import { computed, readonly, ref } from 'vue'

export type RouteTransitionPhase = 'idle' | 'leaving' | 'covered' | 'entering'

export interface RouteTransitionState {
  phase: RouteTransitionPhase
  isActive: boolean
  pendingHash: string | null
  isHistoryNavigation: boolean
}

interface TransitionNavigationContext {
  pendingHash: string | null
  shouldResetScrollTop: boolean
  isHistoryNavigation: boolean
}

export const ROUTE_TRANSITION_LEAVE_MS = 620
export const ROUTE_TRANSITION_COVER_HOLD_MS = 20
export const ROUTE_TRANSITION_ENTER_MS = 620

function wait(durationMs: number) {
  return new Promise<void>(resolve => setTimeout(resolve, durationMs))
}

function scrollToHashTarget(hash: string) {
  const targetId = decodeURIComponent(hash)
  const element = document.getElementById(targetId)
  if (!element)
    return

  const top = element.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top, left: 0, behavior: 'auto' })
}

export const useRouteTransitionController = createGlobalState(() => {
  const phase = ref<RouteTransitionPhase>('idle')
  const pendingHash = ref<string | null>(null)
  const isHistoryNavigation = ref(false)
  const hasPendingNavigation = ref(false)
  const shouldResetScrollTop = ref(true)

  const isActive = computed(() => phase.value !== 'idle')
  const state = readonly({
    isActive,
    isHistoryNavigation,
    pendingHash,
    phase,
  })

  const setPhase = (nextPhase: RouteTransitionPhase) => {
    phase.value = nextPhase
  }

  const clearNavigationContext = () => {
    pendingHash.value = null
    isHistoryNavigation.value = false
    hasPendingNavigation.value = false
    shouldResetScrollTop.value = true
  }

  const beginNavigation = async (context: TransitionNavigationContext) => {
    if (isActive.value)
      return false

    pendingHash.value = context.pendingHash
    isHistoryNavigation.value = context.isHistoryNavigation
    hasPendingNavigation.value = true
    shouldResetScrollTop.value = context.shouldResetScrollTop

    setPhase('leaving')
    await wait(ROUTE_TRANSITION_LEAVE_MS)
    setPhase('covered')

    return true
  }

  const completeNavigation = async () => {
    if (!hasPendingNavigation.value)
      return

    if (pendingHash.value)
      scrollToHashTarget(pendingHash.value)
    else if (shouldResetScrollTop.value)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    await wait(ROUTE_TRANSITION_COVER_HOLD_MS)
    setPhase('entering')
    await wait(ROUTE_TRANSITION_ENTER_MS)
    setPhase('idle')
    clearNavigationContext()
  }

  const cancelNavigation = () => {
    setPhase('idle')
    clearNavigationContext()
  }

  const markHistoryNavigation = () => {
    isHistoryNavigation.value = true
  }

  const consumeHistoryNavigation = () => {
    const value = isHistoryNavigation.value
    isHistoryNavigation.value = false
    return value
  }

  return {
    beginNavigation,
    cancelNavigation,
    completeNavigation,
    consumeHistoryNavigation,
    markHistoryNavigation,
    state,
  }
})
