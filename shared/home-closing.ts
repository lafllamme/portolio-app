/** Content contract for the homepage closing sequence. */
export interface HomeClosingManifestSlide {
  title: string
  tone: 'dark' | 'light'
}

export interface HomeClosingFragment {
  id: string
  image: string
}

export interface HomeClosingPrinciple {
  image: string
  title: string
  description: string
  objectPosition: 'center' | 'right'
}

export interface HomeClosingContent {
  manifestSlides: HomeClosingManifestSlide[]
  fragmentEyebrow: string
  fragmentTitle: string
  fragmentDescription: string
  fragments: HomeClosingFragment[]
  principleEyebrow: string
  principles: HomeClosingPrinciple[]
}

export const homeClosingContent = {
  manifestSlides: [
    {
      title: 'complexity, made clear.',
      tone: 'dark',
    },
    {
      title: 'systems, built to last.',
      tone: 'light',
    },
    {
      title: 'ideas, shipped for real.',
      tone: 'dark',
    },
  ],
  fragmentEyebrow: 'selected fragments',
  fragmentTitle: 'some work lives between the case studies.',
  fragmentDescription: 'Interfaces, prototypes, and visual directions developed along the way.',
  fragments: [
    {
      id: 'gallery-card-1',
      image: 'https://i.imgur.com/GEiyTu5.png',
    },
    {
      id: 'gallery-card-2',
      image: 'https://i.imgur.com/na6XwOI.jpeg',
    },
    {
      id: 'gallery-card-3',
      image: 'https://i.imgur.com/KVxpN0r.jpeg',
    },
    {
      id: 'gallery-card-4',
      image: 'https://i.imgur.com/V8hdIBv.jpeg',
    },
    {
      id: 'gallery-card-5',
      image: 'https://i.imgur.com/KGPOxFU.jpeg',
    },
    {
      id: 'gallery-card-6',
      image: 'https://i.imgur.com/7pInXOC.jpeg',
    },
    {
      id: 'gallery-card-7',
      image: 'https://i.imgur.com/wPcCS4i.jpeg',
    },
  ],
  principleEyebrow: 'the throughline',
  principles: [
    {
      image: 'https://i.imgur.com/hdic0PU.jpeg',
      title: 'built to scale',
      description: 'Reusable components, accessible patterns, and architecture that can grow.',
      objectPosition: 'center',
    },
    {
      image: 'https://i.imgur.com/3DM0ds2.jpeg',
      title: 'clear by design',
      description: 'Complex flows reduced to focused, understandable interactions.',
      objectPosition: 'right',
    },
    {
      image: 'https://janvoth.com/wp-content/uploads/2021/05/kranhaeuser-koeln-rheinauhafen-altstadt-architekturfotografie-stadtansicht-6822-WEB.jpg',
      title: 'ready for production',
      description: 'Visual quality carried through implementation, review, and release.',
      objectPosition: 'center',
    },
  ],
} satisfies HomeClosingContent
