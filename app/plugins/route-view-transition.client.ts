import type { RouteLocationRaw, Router } from 'vue-router'
import { nextTick, useRouter } from '#imports'

const transitionActiveClassName = 'route-transition-active'
const popStateListenerOptions: AddEventListenerOptions = {
  capture: true,
  passive: true,
}

interface ViewTransitionWithCaptured extends ViewTransition {
  captured?: Promise<void>
}

/**
 * Returns whether the browser can run animated View Transitions for route changes.
 */
function canUseViewTransition() {
  return (
    typeof document.startViewTransition === 'function'
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Returns true for same-path hash updates so anchor navigation can stay native.
 */
function isHashOnlyNavigation(router: Router, to: RouteLocationRaw) {
  const currentRoute = router.currentRoute.value
  const targetRoute = router.resolve(to)
  return targetRoute.path === currentRoute.path && Boolean(targetRoute.hash)
}

/**
 * Resets scroll only for full route changes without hash targets.
 */
function shouldResetScrollTop(router: Router, to: RouteLocationRaw) {
  const currentRoute = router.currentRoute.value
  const targetRoute = router.resolve(to)
  return targetRoute.path !== currentRoute.path && !targetRoute.hash
}

export default defineNuxtPlugin((_nuxtApp) => {
  if (!import.meta.client)
    return

  const router = useRouter()
  const originalPush = router.push.bind(router)
  const originalReplace = router.replace.bind(router)
  const originalGo = router.go.bind(router)
  let hasActiveTransition = false
  let hasPendingPopstateNavigation = false
  let resolvePopstateDomUpdate: (() => void) | null = null

  /**
   * Clears transition state and removes the active HTML class.
   */
  const cleanupTransition = () => {
    hasActiveTransition = false
    resolvePopstateDomUpdate = null
    document.documentElement.classList.remove(transitionActiveClassName)
  }

  window.addEventListener('popstate', () => {
    hasPendingPopstateNavigation = true
  }, popStateListenerOptions)

  /**
   * Popstate navigations do not pass through push/replace wrappers.
   * This guard starts the transition and waits for `afterEach` to signal
   * that the new DOM has rendered.
   */
  router.beforeResolve(async (to, from) => {
    if (!hasPendingPopstateNavigation || hasActiveTransition || !canUseViewTransition())
      return true

    hasPendingPopstateNavigation = false

    if (to.path === from.path && Boolean(to.hash))
      return true

    const startViewTransition = document.startViewTransition?.bind(document)
    if (!startViewTransition)
      return true

    hasActiveTransition = true
    document.documentElement.classList.add(transitionActiveClassName)

    const domUpdated = new Promise<void>((resolve) => {
      resolvePopstateDomUpdate = resolve
    })

    try {
      const transition = startViewTransition(() => domUpdated) as ViewTransitionWithCaptured
      if (transition.captured)
        await transition.captured
      else
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))

      void transition.finished.finally(() => {
        cleanupTransition()
      })
    }
    catch {
      cleanupTransition()
    }

    return true
  })

  router.afterEach((_to, _from, failure) => {
    if (!resolvePopstateDomUpdate)
      return

    const resolveUpdate = resolvePopstateDomUpdate
    resolvePopstateDomUpdate = null

    if (failure) {
      resolveUpdate()
      cleanupTransition()
      return
    }

    void nextTick(() => {
      requestAnimationFrame(() => {
        resolveUpdate()
      })
    })
  })

  const runNavigationWithTransition = async (
    to: RouteLocationRaw,
    navigate: (target: RouteLocationRaw) => ReturnType<Router['push']>,
  ) => {
    if (hasActiveTransition || !canUseViewTransition() || isHashOnlyNavigation(router, to))
      return navigate(to)

    const startViewTransition = document.startViewTransition?.bind(document)
    if (!startViewTransition)
      return navigate(to)

    hasActiveTransition = true
    document.documentElement.classList.add(transitionActiveClassName)
    const resetToTopAfterNavigation = shouldResetScrollTop(router, to)

    try {
      let navigationResult: Awaited<ReturnType<Router['push']>> | undefined
      await startViewTransition(async () => {
        navigationResult = await navigate(to)
        if (resetToTopAfterNavigation)
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }).finished
      return navigationResult
    }
    finally {
      cleanupTransition()
    }
  }

  router.push = ((to: RouteLocationRaw) =>
    runNavigationWithTransition(to, originalPush)) as Router['push']

  router.replace = ((to: RouteLocationRaw) =>
    runNavigationWithTransition(to, originalReplace)) as Router['replace']

  router.go = ((delta: number) => {
    if (hasActiveTransition || !canUseViewTransition()) {
      originalGo(delta)
      return
    }

    const startViewTransition = document.startViewTransition?.bind(document)
    if (!startViewTransition) {
      originalGo(delta)
      return
    }

    hasActiveTransition = true
    document.documentElement.classList.add(transitionActiveClassName)
    void startViewTransition(() => {
      originalGo(delta)
    }).finished.finally(() => {
      cleanupTransition()
    })
  }) as Router['go']
})
