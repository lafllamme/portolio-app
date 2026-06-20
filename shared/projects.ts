export interface ProjectGalleryImage {
  src: string
  alt: string
  objectPositionClass?: string
}

export type ProjectCardLayoutVariant = 'feature-wide' | 'feature-narrow' | 'half' | 'third'

export type ProjectCardImageVariant
  = | 'brew-can-co'
    | 'motel-one'
    | 'kernel-house'
    | 'scoop-roll'
    | 'peak-performance'
    | 'savor-magazine'

export interface ProjectEntry {
  slug: string
  title: string
  subtitle: string
  cardImage: string
  cardAlt: string
  homeCardImage?: string
  homeCardAlt?: string
  heroImage: string
  heroAlt: string
  heroAspectClass?: string
  overview: string
  projectType: string
  year: string
  myRole: string
  client: string
  galleryImages: ProjectGalleryImage[]
  relatedSlugs: [string, string, string]
}

export interface ProjectCardItem {
  slug: string
  title: string
  subtitle: string
  image: string
  alt: string
  layoutVariant: ProjectCardLayoutVariant
  imageVariant: ProjectCardImageVariant
  mediaVariant: 'feature' | 'standard'
}

const projectsCatalog: ProjectEntry[] = [
  {
    slug: 'ai-commerce-studio',
    title: 'brew can co.',
    subtitle: 'packaging design',
    cardImage: 'https://framerusercontent.com/images/DE2VADP6O5auX55YcUKNxpqRQWU.webp?width=1365&height=2048',
    cardAlt: 'Hand holding a minimalist white coffee can in a studio product photo',
    heroImage: 'https://framerusercontent.com/images/DE2VADP6O5auX55YcUKNxpqRQWU.webp?width=1365&height=2048',
    heroAlt: 'Hand holding a minimalist white coffee can in a studio product photo',
    overview: 'AI Commerce Studio is a conversion-focused storefront concept built around clarity, confident product storytelling, and operational readiness. The work balances premium presentation with fast browsing, sharp hierarchy, and practical commerce flows that can scale across new launches.',
    projectType: 'AI commerce experience',
    year: '2026',
    myRole: 'Product direction, frontend engineering, UX systems',
    client: 'internal concept',
    galleryImages: [
      {
        alt: 'Hand holding a minimalist white coffee can in a studio product photo',
        src: 'https://framerusercontent.com/images/DE2VADP6O5auX55YcUKNxpqRQWU.webp?width=1365&height=2048',
        objectPositionClass: 'object-[50%_32%]',
      },
      {
        alt: 'Minimal white can shown horizontally in a clean mockup crop',
        src: 'https://framerusercontent.com/images/DE2VADP6O5auX55YcUKNxpqRQWU.webp?width=1365&height=2048',
        objectPositionClass: 'object-[24%_42%]',
      },
      {
        alt: 'Minimal white can standing upright in a centered product crop',
        src: 'https://framerusercontent.com/images/DE2VADP6O5auX55YcUKNxpqRQWU.webp?width=1365&height=2048',
        objectPositionClass: 'object-[52%_18%]',
      },
      {
        alt: 'Close-up crop of the can opening and upper packaging edge',
        src: 'https://framerusercontent.com/images/DE2VADP6O5auX55YcUKNxpqRQWU.webp?width=1365&height=2048',
        objectPositionClass: 'object-[56%_4%]',
      },
      {
        alt: 'Detail crop of the hand and lower can typography in the packaging concept',
        src: 'https://framerusercontent.com/images/DE2VADP6O5auX55YcUKNxpqRQWU.webp?width=1365&height=2048',
        objectPositionClass: 'object-[52%_70%]',
      },
    ],
    relatedSlugs: ['motel-one', 'runtime-cloud', 'agent-studio'],
  },
  {
    slug: 'motel-one',
    title: 'motel one',
    subtitle: 'booking experience & campaign surfaces',
    cardImage: 'https://i.imgur.com/5kOajV2.jpeg',
    cardAlt: 'Motel One campaign visual in a tall editorial crop used as the project cover image',
    homeCardImage: 'https://i.imgur.com/5kOajV2.jpeg',
    homeCardAlt: 'Motel One campaign visual in a tall editorial crop used as the homepage project card cover',
    heroImage: 'https://i.imgur.com/5kOajV2.jpeg',
    heroAlt: 'Motel One campaign visual in a tall editorial crop used as the project hero image',
    heroAspectClass: 'aspect-[16/10]',
    overview: 'Motel One focused on creating a more coherent digital booking experience across campaign landing pages, destination discovery, member touchpoints, and the core reservation flow. My contribution connected frontend implementation, UX architecture, and design system thinking to make high-intent interactions feel clearer, faster, and more consistent across the product.',
    projectType: 'hospitality booking platform',
    year: '2025–2026',
    myRole: 'frontend engineering, ux architecture, design systems',
    client: 'motel one',
    galleryImages: [
      {
        alt: 'Motel One summer campaign hero with oversized product-style visual and integrated booking search',
        src: 'https://i.imgur.com/V5CKcMB.jpeg',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Motel One editorial news module with campaign cards and magazine-like visual hierarchy',
        src: 'https://i.imgur.com/TeUmIkX.jpeg',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Motel One locations overview with filter chips and interior gallery cards',
        src: 'https://i.imgur.com/wFjtT0U.jpeg',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Motel One beOne membership explainer with split media and benefits accordion',
        src: 'https://i.imgur.com/pQnPnJC.png',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Personalized Motel One member screen with Designed for Dogan messaging',
        src: 'https://i.imgur.com/4UTTipD.png',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Motel One summer-deal campaign hero with oversized product-style visual and integrated booking search',
        src: 'https://i.imgur.com/RvPJgEF.png',
        objectPositionClass: 'object-[50%_50%]',
      },
    ],
    relatedSlugs: ['ai-commerce-studio', 'neural-workspace', 'edge-analytics'],
  },
  {
    slug: 'edge-analytics',
    title: 'kernel house',
    subtitle: 'brand identity',
    cardImage: 'https://framerusercontent.com/images/fYvQjvgH7i51arHZEPZLPlpbf8M.jpg?width=1365&height=2048',
    cardAlt: 'Stack of modern books arranged on a leather chair',
    heroImage: 'https://framerusercontent.com/images/fYvQjvgH7i51arHZEPZLPlpbf8M.jpg?width=1365&height=2048',
    heroAlt: 'Stack of modern books arranged on a leather chair',
    overview: 'Edge Analytics is a dashboard architecture study shaped around signal density, operational readability, and maintainable interface primitives. The goal is to make complex monitoring surfaces feel measured and useful instead of visually exhausting.',
    projectType: 'Operational analytics platform',
    year: '2026',
    myRole: 'Dashboard architecture, information hierarchy, frontend planning',
    client: 'internal concept',
    galleryImages: [
      {
        alt: 'Stack of modern books arranged on a leather chair',
        src: 'https://framerusercontent.com/images/fYvQjvgH7i51arHZEPZLPlpbf8M.jpg?width=1365&height=2048',
        objectPositionClass: 'object-[50%_26%]',
      },
      {
        alt: 'Magazine and book stack composition on a leather chair',
        src: 'https://framerusercontent.com/images/fYvQjvgH7i51arHZEPZLPlpbf8M.jpg?width=1365&height=2048',
        objectPositionClass: 'object-[38%_56%]',
      },
      {
        alt: 'Close crop of the publication cover and chair texture',
        src: 'https://framerusercontent.com/images/fYvQjvgH7i51arHZEPZLPlpbf8M.jpg?width=1365&height=2048',
        objectPositionClass: 'object-[62%_42%]',
      },
      {
        alt: 'Wide crop of the leather chair and stacked books composition',
        src: 'https://framerusercontent.com/images/fYvQjvgH7i51arHZEPZLPlpbf8M.jpg?width=1365&height=2048',
        objectPositionClass: 'object-[50%_74%]',
      },
      {
        alt: 'Detail crop of printed editorial materials on the chair',
        src: 'https://framerusercontent.com/images/fYvQjvgH7i51arHZEPZLPlpbf8M.jpg?width=1365&height=2048',
        objectPositionClass: 'object-[46%_32%]',
      },
    ],
    relatedSlugs: ['runtime-cloud', 'motel-one', 'agent-studio'],
  },
  {
    slug: 'neural-workspace',
    title: 'scoop & roll',
    subtitle: 'complete brand identity',
    cardImage: 'https://framerusercontent.com/images/QOH1Zk5nsoAVg2S4bHQmbD476g.jpg?scale-down-to=2048&width=4500&height=3002',
    cardAlt: 'Pastel ice cream packaging mockup in a brand presentation',
    heroImage: 'https://framerusercontent.com/images/QOH1Zk5nsoAVg2S4bHQmbD476g.jpg?scale-down-to=2048&width=4500&height=3002',
    heroAlt: 'Pastel ice cream packaging mockup in a brand presentation',
    overview: 'Neural Workspace is a design-system-led AI tooling concept. It focuses on how shared interface language, reusable primitives, and assistive flows can coexist without the product feeling mechanical or over-engineered.',
    projectType: 'Design system for AI tooling',
    year: '2026',
    myRole: 'Design systems, UI architecture, product prototyping',
    client: 'internal concept',
    galleryImages: [
      {
        alt: 'Pastel ice cream packaging mockup in a brand presentation',
        src: 'https://framerusercontent.com/images/QOH1Zk5nsoAVg2S4bHQmbD476g.jpg?scale-down-to=2048&width=4500&height=3002',
        objectPositionClass: 'object-[50%_42%]',
      },
      {
        alt: 'Two pastel packaging cups in a soft editorial arrangement',
        src: 'https://framerusercontent.com/images/QOH1Zk5nsoAVg2S4bHQmbD476g.jpg?scale-down-to=2048&width=4500&height=3002',
        objectPositionClass: 'object-[22%_46%]',
      },
      {
        alt: 'Close crop of the pastel packaging labels and typographic details',
        src: 'https://framerusercontent.com/images/QOH1Zk5nsoAVg2S4bHQmbD476g.jpg?scale-down-to=2048&width=4500&height=3002',
        objectPositionClass: 'object-[74%_44%]',
      },
      {
        alt: 'Wide pastel packaging scene used as a soft brand-system visual',
        src: 'https://framerusercontent.com/images/QOH1Zk5nsoAVg2S4bHQmbD476g.jpg?scale-down-to=2048&width=4500&height=3002',
        objectPositionClass: 'object-[50%_58%]',
      },
      {
        alt: 'Detail crop of pastel containers and graphic marks',
        src: 'https://framerusercontent.com/images/QOH1Zk5nsoAVg2S4bHQmbD476g.jpg?scale-down-to=2048&width=4500&height=3002',
        objectPositionClass: 'object-[58%_36%]',
      },
    ],
    relatedSlugs: ['motel-one', 'agent-studio', 'runtime-cloud'],
  },
  {
    slug: 'runtime-cloud',
    title: 'peak performance',
    subtitle: 'packaging design & brand identity',
    cardImage: 'https://framerusercontent.com/images/orUVxfxWedv09ke2YHn9uGVoYnM.jpg?scale-down-to=2048&width=4000&height=2669',
    cardAlt: 'Sports supplement tubes shown in a clean product packaging layout',
    heroImage: 'https://framerusercontent.com/images/orUVxfxWedv09ke2YHn9uGVoYnM.jpg?scale-down-to=2048&width=4000&height=2669',
    heroAlt: 'Sports supplement tubes shown in a clean product packaging layout',
    overview: 'Runtime Cloud is a platform frontend concept focused on navigation clarity, composable operations, and robust system communication. The direction aims to make infrastructure-heavy products feel modern, readable, and dependable.',
    projectType: 'Platform frontend',
    year: '2026',
    myRole: 'Frontend architecture, product UX, systems planning',
    client: 'internal concept',
    galleryImages: [
      {
        alt: 'Sports supplement tubes shown in a clean product packaging layout',
        src: 'https://framerusercontent.com/images/orUVxfxWedv09ke2YHn9uGVoYnM.jpg?scale-down-to=2048&width=4000&height=2669',
        objectPositionClass: 'object-center',
      },
      {
        alt: 'Product packaging tubes arranged horizontally in a clean still life',
        src: 'https://framerusercontent.com/images/orUVxfxWedv09ke2YHn9uGVoYnM.jpg?scale-down-to=2048&width=4000&height=2669',
        objectPositionClass: 'object-[34%_54%]',
      },
      {
        alt: 'Close crop of supplement packaging tubes and branding details',
        src: 'https://framerusercontent.com/images/orUVxfxWedv09ke2YHn9uGVoYnM.jpg?scale-down-to=2048&width=4000&height=2669',
        objectPositionClass: 'object-[70%_48%]',
      },
      {
        alt: 'Wide studio packaging composition in a minimal platform-inspired scene',
        src: 'https://framerusercontent.com/images/orUVxfxWedv09ke2YHn9uGVoYnM.jpg?scale-down-to=2048&width=4000&height=2669',
        objectPositionClass: 'object-[50%_62%]',
      },
      {
        alt: 'Detail crop of the supplement packaging surfaces and shadows',
        src: 'https://framerusercontent.com/images/orUVxfxWedv09ke2YHn9uGVoYnM.jpg?scale-down-to=2048&width=4000&height=2669',
        objectPositionClass: 'object-[44%_38%]',
      },
    ],
    relatedSlugs: ['edge-analytics', 'ai-commerce-studio', 'neural-workspace'],
  },
  {
    slug: 'agent-studio',
    title: 'savor magazine',
    subtitle: 'print design & editorial branding',
    cardImage: 'https://framerusercontent.com/images/900m0LBN2F4i9KSHVdT3tWA40qc.jpg?scale-down-to=2048&width=4500&height=3003',
    cardAlt: 'Open food magazine brochure mockup with an editorial layout',
    heroImage: 'https://framerusercontent.com/images/900m0LBN2F4i9KSHVdT3tWA40qc.jpg?scale-down-to=2048&width=4500&height=3003',
    heroAlt: 'Open food magazine brochure mockup with an editorial layout',
    overview: 'Agent Studio is a fullstack AI workflow concept built around orchestration, visibility, and repeatable execution. It imagines a product where prompts, agent state, outputs, and workflow control live inside one coherent operating environment.',
    projectType: 'AI workflow product',
    year: '2026',
    myRole: 'Fullstack product concept, orchestration UX, frontend systems',
    client: 'internal concept',
    galleryImages: [
      {
        alt: 'Open food magazine brochure mockup with an editorial layout',
        src: 'https://framerusercontent.com/images/900m0LBN2F4i9KSHVdT3tWA40qc.jpg?scale-down-to=2048&width=4500&height=3003',
        objectPositionClass: 'object-[50%_44%]',
      },
      {
        alt: 'Editorial layout and food magazine cover in a close product crop',
        src: 'https://framerusercontent.com/images/900m0LBN2F4i9KSHVdT3tWA40qc.jpg?scale-down-to=2048&width=4500&height=3003',
        objectPositionClass: 'object-[30%_50%]',
      },
      {
        alt: 'Detail crop of the brochure type layout and editorial graphics',
        src: 'https://framerusercontent.com/images/900m0LBN2F4i9KSHVdT3tWA40qc.jpg?scale-down-to=2048&width=4500&height=3003',
        objectPositionClass: 'object-[72%_48%]',
      },
      {
        alt: 'Wide brochure mockup scene arranged in an editorial presentation',
        src: 'https://framerusercontent.com/images/900m0LBN2F4i9KSHVdT3tWA40qc.jpg?scale-down-to=2048&width=4500&height=3003',
        objectPositionClass: 'object-[50%_64%]',
      },
      {
        alt: 'Close crop of the editorial magazine surface and graphic blocks',
        src: 'https://framerusercontent.com/images/900m0LBN2F4i9KSHVdT3tWA40qc.jpg?scale-down-to=2048&width=4500&height=3003',
        objectPositionClass: 'object-[58%_34%]',
      },
    ],
    relatedSlugs: ['neural-workspace', 'ai-commerce-studio', 'edge-analytics'],
  },
]

export const projectCatalog = projectsCatalog

const projectLayoutBySlug: Record<ProjectEntry['slug'], ProjectCardLayoutVariant> = {
  'ai-commerce-studio': 'feature-wide',
  'motel-one': 'feature-narrow',
  'edge-analytics': 'half',
  'neural-workspace': 'half',
  'runtime-cloud': 'half',
  'agent-studio': 'half',
}

const projectCardVariantBySlug: Record<ProjectEntry['slug'], ProjectCardItem['mediaVariant']> = {
  'ai-commerce-studio': 'feature',
  'motel-one': 'feature',
  'edge-analytics': 'standard',
  'neural-workspace': 'standard',
  'runtime-cloud': 'standard',
  'agent-studio': 'standard',
}

const projectCardImageVariantBySlug: Record<ProjectEntry['slug'], ProjectCardImageVariant> = {
  'ai-commerce-studio': 'brew-can-co',
  'motel-one': 'motel-one',
  'edge-analytics': 'kernel-house',
  'neural-workspace': 'scoop-roll',
  'runtime-cloud': 'peak-performance',
  'agent-studio': 'savor-magazine',
}

/**
 * Maps a project catalog entry into the gallery card shape used by homepage
 * and related project sections.
 */
type ProjectCardSurface = 'default' | 'home'

export function toProjectCardItem(
  project: ProjectEntry,
  layoutVariant = projectLayoutBySlug[project.slug],
  surface: ProjectCardSurface = 'default',
): ProjectCardItem {
  const image = surface === 'home' && project.homeCardImage
    ? project.homeCardImage
    : project.cardImage

  const alt = surface === 'home' && project.homeCardAlt
    ? project.homeCardAlt
    : project.cardAlt

  return {
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    image,
    alt,
    layoutVariant: layoutVariant ?? 'half',
    imageVariant: projectCardImageVariantBySlug[project.slug] ?? 'brew-can-co',
    mediaVariant: projectCardVariantBySlug[project.slug] ?? 'standard',
  }
}

export const projectCards: ProjectCardItem[] = projectCatalog.map(project => toProjectCardItem(project))
export const homeProjectCards: ProjectCardItem[] = projectCatalog.map(project => toProjectCardItem(project, undefined, 'home'))

/**
 * Resolves a single project entry by its explicit route slug.
 */
export function getProjectBySlug(slug: string) {
  return projectCatalog.find(project => project.slug === slug)
}

/**
 * Resolves a stable list of project entries from an ordered slug list.
 */
export function getProjectsBySlugs(slugs: string[]) {
  return slugs.reduce<ProjectEntry[]>((projects, slug) => {
    const project = getProjectBySlug(slug)
    if (project)
      projects.push(project)

    return projects
  }, [])
}
