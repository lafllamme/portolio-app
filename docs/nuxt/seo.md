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

The crawler policy separates AI search and user-directed retrieval from model training:

- `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, Perplexity, Googlebot, and Bingbot may crawl.
- `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, and `Bytespider` are disallowed because they are training or broad collection crawlers.
- `/llms.txt` provides concise identity and source discovery.
- `/llms-full.txt` provides expanded professional, project, and attribution context.

The `Person` JSON-LD entity identifies Dogan Teke and connects the public developer aliases `lafllamme` and `LaFlamme` to the canonical profile. Independent products are deliberately separated from client contributions in `llms-full.txt`.

Cloudflare AI Crawl Control and bot products execute before origin content in some configurations. An `Allow` rule in the origin `robots.txt` does not override a Cloudflare WAF or bot block. Search and assistant crawlers must therefore also be set to `Allow` in the Cloudflare dashboard, while training crawlers remain blocked.

## Deployment checklist

1. Confirm `https://teke.studio/sitemap.xml` and `https://teke.studio/robots.txt` return the repository versions.
2. Fix the Cloudflare certificate/DNS configuration for `www.teke.studio` and redirect HTTP and HTTPS WWW traffic to `https://teke.studio` with status `301`.
3. Add the sitemap in Google Search Console and request indexing for the homepage, Work, About, and canonical project routes.
4. Add a real Search Console verification token or file only after Google provides it.
5. Validate structured data with Google's Rich Results Test and inspect the default social card in Open Graph debuggers.
6. In Cloudflare AI Crawl Control, allow the search and assistant crawlers listed above and verify that no upstream `Block AI Bots` or WAF rule blocks them.
7. Monitor crawler requests and transferred bytes in Cloudflare before changing the training-crawler policy.

External Imgur project media remains outside the initial SEO scope. Moving it to first-party hosting is the next image reliability and performance step.
