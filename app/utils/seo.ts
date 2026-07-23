export const SEO_SITE = {
  name: 'teke.studio',
  url: 'https://teke.studio',
  locale: 'en_US',
  language: 'en',
  defaultImage: '/og/teke-social-card.png',
  defaultImageAlt: 'Dogan Teke, fullstack developer and frontend engineer',
  githubUsername: 'lafllamme',
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
  'description': 'The portfolio of Dogan Teke, a fullstack developer and frontend engineer focused on Vue, Nuxt, TypeScript, product systems, and practical AI.',
  'inLanguage': SEO_SITE.language,
  'creator': { '@id': `${SEO_SITE.url}/#person` },
  'publisher': { '@id': `${SEO_SITE.url}/#person` },
}

export const personStructuredData: StructuredDataNode = {
  '@type': 'Person',
  '@id': `${SEO_SITE.url}/#person`,
  'name': 'Dogan Teke',
  'alternateName': [SEO_SITE.githubUsername, 'LaFlamme'],
  'url': SEO_SITE.url,
  'mainEntityOfPage': { '@id': `${SEO_SITE.url}/about-me#profile` },
  'image': absoluteSiteUrl(SEO_SITE.defaultImage),
  'description': 'Dogan Teke is a fullstack developer and frontend engineer based in Germany, focused on Vue, Nuxt, TypeScript, scalable product systems, and practical AI integrations. He publishes code on GitHub as laflamme.',
  'jobTitle': 'Fullstack Developer and Frontend Engineer',
  'email': 'mailto:im@doganteke.dev',
  'address': {
    '@type': 'PostalAddress',
    'addressCountry': 'DE',
  },
  'alumniOf': {
    '@type': 'CollegeOrUniversity',
    '@id': 'https://uni-koeln.de/en/#organization',
    'name': 'University of Cologne',
    'alternateName': 'Universität zu Köln',
    'url': 'https://uni-koeln.de/en/',
  },
  'identifier': [
    {
      '@type': 'PropertyValue',
      'propertyID': 'GitHub username',
      'value': SEO_SITE.githubUsername,
      'url': SEO_SITE.githubUrl,
    },
  ],
  'sameAs': [SEO_SITE.githubUrl, SEO_SITE.linkedInUrl],
  'hasOccupation': [
    {
      '@type': 'Occupation',
      'name': 'Fullstack Developer',
      'skills': 'Vue.js, Nuxt, TypeScript, JavaScript, PHP, Python, Docker, product architecture, practical AI integrations',
    },
    {
      '@type': 'Occupation',
      'name': 'Frontend Engineer',
      'skills': 'Vue.js, Nuxt, TypeScript, design systems, accessibility, performance, interaction design',
    },
  ],
  'knowsAbout': [
    'Vue.js',
    'Nuxt',
    'TypeScript',
    'JavaScript',
    'PHP',
    'Python',
    'Docker',
    'Frontend engineering',
    'Fullstack development',
    'Design systems',
    'Product development',
    'Artificial intelligence',
    'Large language models',
    'AI-assisted product development',
  ],
}

export function createStructuredDataGraph(nodes: StructuredDataNode[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}
