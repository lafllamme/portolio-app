import { useEventListener, usePreferredReducedMotion } from '@vueuse/core'
import { START_LOCATION } from 'vue-router'
import { nextTick, useRouter } from '#imports'
import {
  useRouteTransitionController,
} from '~/composables/useRouteTransitionController'

interface ResolvedRouteLike {
  hash: string
  path: string
}

export default defineNuxtPlugin(() => {
  if (!import.meta.client)
    return

  const router = useRouter()
  const prefersReducedMotion = usePreferredReducedMotion()
  const transition = useRouteTransitionController()

  const canAnimateRouteChange = () => prefersReducedMotion.value !== 'reduce'

  const isSamePageHashChange = (to: ResolvedRouteLike, from: ResolvedRouteLike) =>
    to.path === from.path && to.hash !== from.hash

  const isSameLocation = (to: ResolvedRouteLike, from: ResolvedRouteLike) =>
    to.path === from.path && to.hash === from.hash

  useEventListener(window, 'popstate', () => {
    transition.markHistoryNavigation()
  }, {
    capture: true,
    passive: true,
  })

  router.beforeEach(async (to, from) => {
    if (!canAnimateRouteChange()) {
      transition.consumeHistoryNavigation()
      return true
    }

    if (from === START_LOCATION) {
      transition.consumeHistoryNavigation()
      return true
    }

    if (transition.state.isActive) {
      transition.consumeHistoryNavigation()
      return false
    }

    const resolvedTo = router.resolve(to)
    const resolvedFrom = router.resolve(from)

    if (isSameLocation(resolvedTo, resolvedFrom) || isSamePageHashChange(resolvedTo, resolvedFrom)) {
      transition.consumeHistoryNavigation()
      return true
    }

    const didBegin = await transition.beginNavigation({
      isHistoryNavigation: transition.consumeHistoryNavigation(),
      pendingHash: resolvedTo.hash ? resolvedTo.hash.slice(1) : null,
      shouldResetScrollTop: !resolvedTo.hash,
    })

    return didBegin
  })

  router.afterEach(async (_to, _from, failure) => {
    if (!canAnimateRouteChange()) {
      transition.cancelNavigation()
      return
    }

    if (failure) {
      transition.cancelNavigation()
      return
    }

    if (!transition.state.isActive)
      return

    await nextTick()
    requestAnimationFrame(() => {
      void transition.completeNavigation()
    })
  })
})
