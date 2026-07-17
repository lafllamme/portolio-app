export const SEO_SITE = {
  name: 'teke.studio',
  url: 'https://teke.studio',
  locale: 'en_US',
  language: 'en',
  defaultImage: '/og/teke-social-card.png',
  defaultImageAlt: 'Dogan Teke, fullstack developer and frontend engineer',
  githubUrl: 'https://github.com/lafllamme',
  linkedInUrl: 'https://www.linkedin.com/in/dogan-teke-781147108/',
} as const

export type StructuredDataNode = Record<string, unknown>

export function absoluteSiteUrl(path: string) {
  return new URL(path, SEO_SITE.url).toString()
}

export const websiteStructuredData: StructuredDataNode = {
  '@type': 'WebSite',
  '@id': `${SEO_SITE.url}/#website`,
  'url': SEO_SITE.url,
  'name': SEO_SITE.name,
  'inLanguage': SEO_SITE.language,
}

export const personStructuredData: StructuredDataNode = {
  '@type': 'Person',
  '@id': `${SEO_SITE.url}/#person`,
  'name': 'Dogan Teke',
  'url': SEO_SITE.url,
  'jobTitle': 'Fullstack Developer and Frontend Engineer',
  'sameAs': [SEO_SITE.githubUrl, SEO_SITE.linkedInUrl],
  'knowsAbout': [
    'Vue.js',
    'Nuxt',
    'TypeScript',
    'Frontend engineering',
    'Fullstack development',
    'Design systems',
    'Product development',
    'Artificial intelligence integrations',
  ],
}

export function createStructuredDataGraph(nodes: StructuredDataNode[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}
