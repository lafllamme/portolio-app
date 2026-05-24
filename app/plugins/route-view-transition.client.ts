import type { RouteLocationRaw, Router } from 'vue-router'
import { nextTick } from 'vue'
import { useRouter } from '#imports'

const EXIT_TO_COVER_MS = 380
const ENTER_TOTAL_MS = 760

function canUseRouteTransition() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isHashOnlyNavigation(router: Router, to: RouteLocationRaw) {
  const currentRoute = router.currentRoute.value
  const targetRoute = router.resolve(to)
  return targetRoute.path === currentRoute.path && Boolean(targetRoute.hash)
}

function shouldResetScrollTop(router: Router, to: RouteLocationRaw) {
  const currentRoute = router.currentRoute.value
  const targetRoute = router.resolve(to)
  return targetRoute.path !== currentRoute.path && !targetRoute.hash
}

function waitForNextPaint(frames = 1) {
  return new Promise<void>((resolve) => {
    const step = (remainingFrames: number) => {
      requestAnimationFrame(() => {
        if (remainingFrames <= 1) {
          resolve()
          return
        }
        step(remainingFrames - 1)
      })
    }
    step(Math.max(1, frames))
  })
}

function wait(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

export default defineNuxtPlugin((_nuxtApp) => {
  if (!import.meta.client)
    return

  const router = useRouter()
  const originalPush = router.push.bind(router)
  const originalReplace = router.replace.bind(router)
  const originalGo = router.go.bind(router)
  let hasActiveTransition = false
  const transitionActiveClassName = 'route-transition-active'
  const transitionExitClassName = 'route-transition-exit'
  const transitionEnterClassName = 'route-transition-enter'

  const runNavigationWithTransition = async (
    to: RouteLocationRaw,
    navigate: (target: RouteLocationRaw) => ReturnType<Router['push']>,
  ) => {
    if (hasActiveTransition || !canUseRouteTransition() || isHashOnlyNavigation(router, to))
      return navigate(to)

    hasActiveTransition = true
    const htmlClassList = document.documentElement.classList
    htmlClassList.add(transitionActiveClassName, transitionExitClassName)
    htmlClassList.remove(transitionEnterClassName)
    const resetToTopAfterNavigation = shouldResetScrollTop(router, to)

    try {
      await wait(EXIT_TO_COVER_MS)
      const navigationResult = await navigate(to)
      if (resetToTopAfterNavigation)
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

      await nextTick()
      await waitForNextPaint(1)
      htmlClassList.remove(transitionExitClassName)
      htmlClassList.add(transitionEnterClassName)
      await wait(ENTER_TOTAL_MS)
      return navigationResult
    }
    finally {
      hasActiveTransition = false
      htmlClassList.remove(
        transitionActiveClassName,
        transitionExitClassName,
        transitionEnterClassName,
      )
    }
  }

  router.push = ((to: RouteLocationRaw) =>
    runNavigationWithTransition(to, originalPush)) as Router['push']

  router.replace = ((to: RouteLocationRaw) =>
    runNavigationWithTransition(to, originalReplace)) as Router['replace']

  router.go = ((delta: number) => {
    if (hasActiveTransition || !canUseRouteTransition()) {
      originalGo(delta)
      return
    }
    originalGo(delta)
  }) as Router['go']
})
