import type { ComponentPublicInstance } from 'vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface CenteredActiveIndexOptions {
  rootMargin?: string
}

export function useCenteredActiveIndex(itemCount: number, options: CenteredActiveIndexOptions = {}) {
  const activeIndex = ref(0)
  const itemElements = ref<Array<HTMLElement | null>>(Array.from({ length: itemCount }).fill(null) as Array<HTMLElement | null>)
  let observer: IntersectionObserver | null = null

  const resolveActiveEntry = (entries: IntersectionObserverEntry[]) => {
    const intersectingEntries = entries.filter(entry => entry.isIntersecting)
    if (!intersectingEntries.length)
      return

    const viewportCenter = window.innerHeight / 2
    const nextEntry = intersectingEntries.reduce((closestEntry, entry) => {
      const entryCenter = entry.boundingClientRect.top + (entry.boundingClientRect.height / 2)
      const closestCenter = closestEntry.boundingClientRect.top + (closestEntry.boundingClientRect.height / 2)

      return Math.abs(entryCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter)
        ? entry
        : closestEntry
    })

    const nextIndex = Number(nextEntry.target.getAttribute('data-active-index'))
    if (Number.isFinite(nextIndex))
      activeIndex.value = nextIndex
  }

  const connectObserver = () => {
    observer?.disconnect()

    if (!import.meta.client)
      return

    observer = new IntersectionObserver(resolveActiveEntry, {
      root: null,
      rootMargin: options.rootMargin ?? '-45% 0px -45% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    })

    itemElements.value.forEach((element, index) => {
      if (!element)
        return

      element.setAttribute('data-active-index', String(index))
      observer?.observe(element)
    })
  }

  const setItemRef = (index: number) => (element: Element | ComponentPublicInstance | null) => {
    itemElements.value[index] = element instanceof HTMLElement ? element : null
    if (observer && itemElements.value[index])
      connectObserver()
  }

  onMounted(() => {
    connectObserver()
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return {
    activeIndex,
    setItemRef,
  }
}
