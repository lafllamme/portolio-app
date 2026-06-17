import { consola } from 'consola'

interface SwrCacheEntry<T> {
  data: null | T
  fetchedAt: number
  refreshPromise: null | Promise<T>
}

interface SwrCacheOptions<T> {
  debugScope?: string
  key: string
  fetcher: () => Promise<T>
  freshTtlMs: number
  staleTtlMs: number
}

type SwrCacheStore = Map<string, SwrCacheEntry<unknown>>

const SWR_CACHE_KEY = '__portfolio_app_swr_cache__'

function getSwrCacheStore() {
  const globalStore = globalThis as typeof globalThis & Record<string, SwrCacheStore | undefined>

  if (!globalStore[SWR_CACHE_KEY])
    globalStore[SWR_CACHE_KEY] = new Map<string, SwrCacheEntry<unknown>>()

  return globalStore[SWR_CACHE_KEY]
}

function startRefresh<T>(options: SwrCacheOptions<T>, currentEntry?: SwrCacheEntry<T>) {
  const cacheStore = getSwrCacheStore()
  const existingRefresh = currentEntry?.refreshPromise
  if (existingRefresh)
    return existingRefresh

  consola.info(`[${options.debugScope ?? 'swr-cache'}] refresh:start`, {
    hasCurrentData: Boolean(currentEntry?.data),
    key: options.key,
  })

  const refreshPromise = options.fetcher()
    .then((data) => {
      consola.info(`[${options.debugScope ?? 'swr-cache'}] refresh:success`, {
        fetchedAt: Date.now(),
        key: options.key,
      })
      cacheStore.set(options.key, {
        data,
        fetchedAt: Date.now(),
        refreshPromise: null,
      })
      return data
    })
    .catch((error) => {
      consola.info(`[${options.debugScope ?? 'swr-cache'}] refresh:error`, {
        error,
        hasCurrentData: Boolean(currentEntry?.data),
        key: options.key,
      })
      cacheStore.set(options.key, {
        data: currentEntry?.data ?? null,
        fetchedAt: currentEntry?.fetchedAt ?? 0,
        refreshPromise: null,
      })
      throw error
    })

  cacheStore.set(options.key, {
    data: currentEntry?.data ?? null,
    fetchedAt: currentEntry?.fetchedAt ?? 0,
    refreshPromise,
  })

  return refreshPromise
}

/**
 * Small server-side SWR cache for external APIs.
 *
 * Fresh entries are returned directly.
 * Stale entries are returned immediately while one background refresh runs.
 * Expired entries refresh synchronously, but keep the last known good value as
 * a fallback when the upstream request fails.
 */
export async function getCachedWithSWR<T>(options: SwrCacheOptions<T>) {
  const cacheStore = getSwrCacheStore()
  const currentEntry = cacheStore.get(options.key) as SwrCacheEntry<T> | undefined

  if (!currentEntry?.data) {
    consola.info(`[${options.debugScope ?? 'swr-cache'}] cache:miss`, {
      key: options.key,
    })
    return await startRefresh(options, currentEntry)
  }

  const ageMs = Date.now() - currentEntry.fetchedAt

  if (ageMs <= options.freshTtlMs) {
    consola.info(`[${options.debugScope ?? 'swr-cache'}] cache:fresh-hit`, {
      ageMs,
      key: options.key,
    })
    return currentEntry.data
  }

  if (ageMs <= options.freshTtlMs + options.staleTtlMs) {
    consola.info(`[${options.debugScope ?? 'swr-cache'}] cache:stale-hit`, {
      ageMs,
      key: options.key,
    })
    void startRefresh(options, currentEntry).catch(() => undefined)
    return currentEntry.data
  }

  try {
    consola.info(`[${options.debugScope ?? 'swr-cache'}] cache:expired-refresh`, {
      ageMs,
      key: options.key,
    })
    return await startRefresh(options, currentEntry)
  }
  catch {
    consola.info(`[${options.debugScope ?? 'swr-cache'}] cache:expired-fallback`, {
      ageMs,
      key: options.key,
    })
    return currentEntry.data
  }
}
