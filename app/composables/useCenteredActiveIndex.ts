import type { ComponentPublicInstance } from 'vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface CenteredActiveIndexOptions {
  rootMargin?: string
}

/**
 * Tracks which of the observed elements sits closest to the viewport centre.
 *
 * Two details keep the result stable while scrolling:
 *
 * The observer is created once and elements are observed individually, because
 * reconnecting it inside the template ref callback would re-fire an initial
 * batch on every re-render and feed the index back into itself.
 *
 * The winner is resolved across every currently intersecting element using live
 * geometry, because an observer callback only reports the entries that changed.
 * Judging by the batch alone makes the index jump to whichever element happened
 * to fire last instead of the one actually centred.
 */
export function useCenteredActiveIndex(itemCount: number, options: CenteredActiveIndexOptions = {}) {
  const activeIndex = ref(0)
  const itemElements: Array<HTMLElement | null> = Array.from({ length: itemCount }).fill(null) as Array<HTMLElement | null>
  const intersectingIndices = new Set<number>()
  const indexByElement = new WeakMap<HTMLElement, number>()
  const observedElements = new Set<HTMLElement>()
  let observer: IntersectionObserver | null = null

  const resolveCentredIndex = () => {
    const viewportCentre = window.innerHeight / 2
    let centredIndex = -1
    let centredDistance = Number.POSITIVE_INFINITY

    intersectingIndices.forEach((index) => {
      const element = itemElements[index]
      if (!element)
        return

      const rect = element.getBoundingClientRect()
      const distance = Math.abs(rect.top + (rect.height / 2) - viewportCentre)

      if (distance < centredDistance) {
        centredDistance = distance
        centredIndex = index
      }
    })

    return centredIndex
  }

  const handleEntries = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const index = indexByElement.get(entry.target as HTMLElement)
      if (index === undefined)
        return

      if (entry.isIntersecting)
        intersectingIndices.add(index)
      else
        intersectingIndices.delete(index)
    })

    const nextIndex = resolveCentredIndex()

    if (nextIndex !== -1 && nextIndex !== activeIndex.value)
      activeIndex.value = nextIndex
  }

  const observeElement = (element: HTMLElement) => {
    if (!observer || observedElements.has(element))
      return

    observedElements.add(element)
    observer.observe(element)
  }

  const setItemRef = (index: number) => (element: Element | ComponentPublicInstance | null) => {
    const nextElement = element instanceof HTMLElement ? element : null
    const previousElement = itemElements[index]

    if (previousElement && previousElement !== nextElement) {
      observer?.unobserve(previousElement)
      observedElements.delete(previousElement)
      indexByElement.delete(previousElement)
      intersectingIndices.delete(index)
    }

    itemElements[index] = nextElement

    if (!nextElement)
      return

    indexByElement.set(nextElement, index)
    observeElement(nextElement)
  }

  onMounted(() => {
    observer = new IntersectionObserver(handleEntries, {
      root: null,
      rootMargin: options.rootMargin ?? '-45% 0px -45% 0px',
      threshold: 0,
    })

    itemElements.forEach((element) => {
      if (element)
        observeElement(element)
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
    observedElements.clear()
    intersectingIndices.clear()
  })

  return {
    activeIndex,
    setItemRef,
  }
}
