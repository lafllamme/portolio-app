# GitHub Cache Strategy

The About page GitHub section uses server-side stale-while-revalidate caching so route rendering never depends on live GitHub API latency.

## Goals

- keep `/about-me` fully non-blocking
- reduce GitHub rate-limit pressure
- preserve the last known good data when GitHub is slow or unavailable
- keep the activity copy reasonably fresh without hammering the API

## Architecture

- shared SWR cache utility:
  - [`/Users/flame/Developer/Projects/portfolio-app/server/utils/swr-cache.ts`](/Users/flame/Developer/Projects/portfolio-app/server/utils/swr-cache.ts)
- contributions endpoint:
  - [`/Users/flame/Developer/Projects/portfolio-app/server/api/github-contributions/[username].get.ts`](/Users/flame/Developer/Projects/portfolio-app/server/api/github-contributions/%5Busername%5D.get.ts)
- activity endpoint:
  - [`/Users/flame/Developer/Projects/portfolio-app/server/api/github-activity/[username].get.ts`](/Users/flame/Developer/Projects/portfolio-app/server/api/github-activity/%5Busername%5D.get.ts)

## TTLs

- `github-contributions`
  - fresh TTL: `2h`
  - stale window: `2h`
- `github-activity`
  - fresh TTL: `15m`
  - stale window: `15m`

## Behavior

- fresh cache entries return immediately
- stale entries return immediately and trigger one background refresh
- expired entries refresh synchronously
- if an upstream refresh fails, the server keeps serving the last known good value instead of dropping the UI to `null`

## Activity Formatting

The activity cache stores the raw `lastCommitAt` timestamp, not only the finished display string.

That allows the API route to recompute `lastCommitRelative` on each response while still reusing cached source data. The visible copy can therefore stay linguistically current even when the underlying GitHub activity payload is cached.

## Cache strategy

- Contribution data is fetched server-side and cached for 6 hours.
- Stale-while-revalidate: expired cache still serves while refresh runs.
- A failed refresh keeps the last good payload — the calendar never blanks.

## Invalidation notes

- Manual invalidation: bump the cache key version in the server route.
- Deploys invalidate implicitly — the cache lives in the lambda instance memory.
- Never invalidate on user request; the endpoint is public and cheap to abuse.
- Verified fallback payload against current implementation.
- TODO: add example for error handling.
- Clarified: key versioning applies to production builds only.
- Decision: keep cache ttl as documented for now.
- Clarified: key versioning applies to production builds only.
- Edge case: error handling on mobile safari needs a second look.
- Edge case: fallback payload on mobile safari needs a second look.
- Edge case: cache ttl on mobile safari needs a second look.
- TODO: add example for key versioning.
- Edge case: swr behavior on mobile safari needs a second look.
