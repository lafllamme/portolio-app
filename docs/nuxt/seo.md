# SEO Architecture

## Site identity

- Canonical origin: `https://teke.studio`
- Language: English (`en`)
- Default social image: `/og/teke-social-card.png` at `1200x630`
- Search positioning: fullstack development, frontend engineering, Vue, Nuxt, TypeScript, product systems, and practical AI

Shared site, person, and URL values live in `app/utils/seo.ts`. Route components use `usePageSeo` for canonical, search, Open Graph, Twitter, and JSON-LD metadata.

## Route metadata

- `/`: `WebSite` and `Person`
- `/work`: `CollectionPage` and a project `ItemList`
- `/about-me`: `ProfilePage` with the shared person as `mainEntity`
- `/projects/:slug`: `CreativeWork` and `BreadcrumbList`

Project search titles and descriptions belong to each `ProjectEntry`. Visible project overviews are intentionally independent because they are too long for search snippets.

The previous `/projects/neural-workspace` and `/projects/agent-studio` URLs permanently redirect to `/projects/tecnews` and `/projects/grillme`. Only the canonical URLs belong in internal links and the sitemap.

## Sitemap and crawling

`@nuxtjs/sitemap` generates `/sitemap.xml` during the production build. Static pages are discovered from Nuxt routes and project pages are supplied from the shared project catalog. Automatic `lastmod` values stay disabled until real content update dates exist.

The origin `robots.txt` allows crawling and advertises the sitemap. Cloudflare may override this file when Managed Content Signals are enabled, so the live response must be checked after deployment.

## Deployment checklist

1. Confirm `https://teke.studio/sitemap.xml` and `https://teke.studio/robots.txt` return the repository versions.
2. Fix the Cloudflare certificate/DNS configuration for `www.teke.studio` and redirect HTTP and HTTPS WWW traffic to `https://teke.studio` with status `301`.
3. Add the sitemap in Google Search Console and request indexing for the homepage, Work, About, and canonical project routes.
4. Add a real Search Console verification token or file only after Google provides it.
5. Validate structured data with Google's Rich Results Test and inspect the default social card in Open Graph debuggers.

External Imgur project media remains outside the initial SEO scope. Moving it to first-party hosting is the next image reliability and performance step.
