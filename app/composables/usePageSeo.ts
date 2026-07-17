import type { StructuredDataNode } from '~/utils/seo'
import { useHead, useRoute, useSeoMeta } from '#imports'
import { absoluteSiteUrl, createStructuredDataGraph, SEO_SITE } from '~/utils/seo'

interface PageSeoOptions {
  title: string
  description: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  type?: 'website' | 'article'
  structuredData?: StructuredDataNode[]
}

const ROBOTS_DIRECTIVE = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

/**
 * Applies canonical, search, social, and optional JSON-LD metadata to a route.
 */
export function usePageSeo(options: PageSeoOptions) {
  const route = useRoute()
  const canonicalUrl = absoluteSiteUrl(route.path)
  const imageUrl = absoluteSiteUrl(options.image ?? SEO_SITE.defaultImage)
  const imageAlt = options.imageAlt ?? SEO_SITE.defaultImageAlt

  useSeoMeta({
    title: options.title,
    description: options.description,
    robots: ROBOTS_DIRECTIVE,
    author: 'Dogan Teke',
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: options.type ?? 'website',
    ogUrl: canonicalUrl,
    ogSiteName: SEO_SITE.name,
    ogLocale: SEO_SITE.locale,
    ogImage: imageUrl,
    ogImageAlt: imageAlt,
    ogImageWidth: options.imageWidth,
    ogImageHeight: options.imageHeight,
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: imageUrl,
    twitterImageAlt: imageAlt,
  })

  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl },
    ],
    script: options.structuredData?.length
      ? [
          {
            key: 'structured-data',
            type: 'application/ld+json',
            innerHTML: JSON.stringify(createStructuredDataGraph(options.structuredData)),
          },
        ]
      : [],
  })
}
