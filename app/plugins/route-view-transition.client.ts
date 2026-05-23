import type { RouteLocationRaw, Router } from 'vue-router'
import { useRouter } from '#imports'

function canUseViewTransition() {
  return (
    typeof document.startViewTransition === 'function'
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
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

export default defineNuxtPlugin((_nuxtApp) => {
  if (!import.meta.client)
    return

  const router = useRouter()
  const originalPush = router.push.bind(router)
  const originalReplace = router.replace.bind(router)
  const originalGo = router.go.bind(router)
  let hasActiveTransition = false
  const routeTransitionClassName = 'route-transition-active'

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
    document.documentElement.classList.add(routeTransitionClassName)
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
      hasActiveTransition = false
      document.documentElement.classList.remove(routeTransitionClassName)
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
    document.documentElement.classList.add(routeTransitionClassName)
    void startViewTransition(() => {
      originalGo(delta)
    }).finished.finally(() => {
      hasActiveTransition = false
      document.documentElement.classList.remove(routeTransitionClassName)
    })
  }) as Router['go']
})
