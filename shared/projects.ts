export interface ProjectGalleryImage {
  src: string
  alt: string
  objectPositionClass?: string
}

export type ProjectCardLayoutVariant = 'feature-wide' | 'feature-narrow' | 'half' | 'third'

export type ProjectCardImageVariant
  = | 'the-cloud-one'
    | 'motel-one'
    | 'kernel-house'
    | 'tecnews'
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
    slug: 'the-cloud-one',
    title: 'the cloud one',
    subtitle: 'luxury hospitality brand experience',
    cardImage: 'https://i.imgur.com/Hrw4fLQ.jpeg',
    cardAlt: 'The Cloud One editorial cover with quiet monochrome luxury styling and premium hospitality framing',
    heroImage: 'https://i.imgur.com/Hrw4fLQ.jpeg',
    heroAlt: 'The Cloud One editorial cover with quiet monochrome luxury styling and premium hospitality framing',
    overview: 'The Cloud One called for a more editorial and deliberately composed digital direction, where booking, brand storytelling, and destination content felt quieter, more precise, and more atmospheric. My role focused on translating that hospitality mood into frontend-ready UI patterns, calmer hierarchy, and a more refined system for discovery, campaign surfaces, and reservation touchpoints.',
    projectType: 'luxury hospitality platform',
    year: '2024',
    myRole: 'frontend engineering, ux systems, premium brand execution',
    client: 'the cloud one',
    galleryImages: [
      {
        alt: 'The Cloud One campaign hero with elegant editorial typography and premium hospitality booking composition',
        src: 'https://i.imgur.com/uQ82QuH.jpeg',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'The Cloud One editorial content card with black-and-white campaign styling and luxury hospitality framing',
        src: 'https://i.imgur.com/EbmtZzV.png',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'The Cloud One membership landing page with understated editorial typography and premium benefits messaging',
        src: 'https://i.imgur.com/7kiuhdN.png',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'The Cloud One New York Downtown page with an editorial interior gallery and premium hospitality navigation',
        src: 'https://i.imgur.com/aH06twr.jpeg',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'The Cloud One booking flow with a monochrome premium layout and calm reservation hierarchy',
        src: 'https://i.imgur.com/Ue7OfSy.jpeg',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'The Cloud One location discovery grid featuring art direction, tags, and large atmospheric imagery',
        src: 'https://i.imgur.com/PKf7DXm.png',
        objectPositionClass: 'object-[50%_50%]',
      },
    ],
    relatedSlugs: ['motel-one', 'runtime-cloud', 'agent-studio'],
  },
  {
    slug: 'motel-one',
    title: 'motel one',
    subtitle: 'booking experience & campaign surfaces',
    cardImage: 'https://i.imgur.com/jYxVRwc.jpeg',
    cardAlt: 'Motel One campaign visual in a tall editorial crop used as the project cover image',
    homeCardImage: 'https://i.imgur.com/jYxVRwc.jpeg',
    homeCardAlt: 'Motel One campaign visual in a tall editorial crop used as the homepage project card cover',
    heroImage: 'https://i.imgur.com/jYxVRwc.jpeg',
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
    relatedSlugs: ['the-cloud-one', 'neural-workspace', 'edge-analytics'],
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
    title: 'tecnews',
    subtitle: 'ai-supported editorial product',
    cardImage: 'https://i.imgur.com/4VxABq0.png',
    cardAlt: 'Tecnews cover with editorial typography, calm hierarchy, and a modern issue-based developer newspaper direction',
    heroImage: 'https://i.imgur.com/4VxABq0.png',
    heroAlt: 'Tecnews cover with editorial typography, calm hierarchy, and a modern issue-based developer newspaper direction',
    overview: 'Tecnews explores what an AI-supported developer newspaper can feel like when editorial restraint, product clarity, and motion are treated as part of the reading experience. The platform is built around curated issues, topic-based exploration, and calm transitions between feed, feature, and magazine-like layouts. AI supports verified-source aggregation and compact drafting in the background, while the user-facing value stays focused on hierarchy, trust, and staying current without noise.',
    projectType: 'AI-supported newspaper / editorial product',
    year: '2025',
    myRole: 'product design, frontend engineering, motion systems, editorial UX',
    client: 'tecnews.dev',
    galleryImages: [
      {
        alt: 'Tecnews issue overview with strict editorial hierarchy, quiet spacing, and curated issue-based browsing',
        src: 'https://i.imgur.com/viO6QgV.png',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Tecnews feature interface with elegant black-on-cream issue framing and a productized editorial reading rhythm',
        src: 'https://i.imgur.com/kLUbiuT.png',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Tecnews visual system showing orbital learn-more motion and layered card transitions for topic exploration',
        src: 'https://i.imgur.com/gwd3Gs0.png',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Tecnews light-mode issue detail layout showing calm editorial composition and AI-supported reading flow',
        src: 'https://i.imgur.com/oQrIZ9l.png',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Tecnews dark-mode issue detail layout paired with the light variant to show a consistent editorial component system',
        src: 'https://i.imgur.com/qPO9zFk.png',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Tecnews hero direction with oversized editorial typography, restrained contrast, and motion-aware issue storytelling',
        src: 'https://i.imgur.com/aY5JgPB.png',
        objectPositionClass: 'object-[50%_50%]',
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
    relatedSlugs: ['edge-analytics', 'the-cloud-one', 'neural-workspace'],
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
    relatedSlugs: ['neural-workspace', 'the-cloud-one', 'edge-analytics'],
  },
]

export const projectCatalog = projectsCatalog

const projectLayoutBySlug: Record<ProjectEntry['slug'], ProjectCardLayoutVariant> = {
  'the-cloud-one': 'feature-wide',
  'motel-one': 'feature-narrow',
  'edge-analytics': 'half',
  'neural-workspace': 'half',
  'runtime-cloud': 'half',
  'agent-studio': 'half',
}

const projectCardVariantBySlug: Record<ProjectEntry['slug'], ProjectCardItem['mediaVariant']> = {
  'the-cloud-one': 'feature',
  'motel-one': 'feature',
  'edge-analytics': 'standard',
  'neural-workspace': 'standard',
  'runtime-cloud': 'standard',
  'agent-studio': 'standard',
}

const projectCardImageVariantBySlug: Record<ProjectEntry['slug'], ProjectCardImageVariant> = {
  'the-cloud-one': 'the-cloud-one',
  'motel-one': 'motel-one',
  'edge-analytics': 'kernel-house',
  'neural-workspace': 'tecnews',
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
    imageVariant: projectCardImageVariantBySlug[project.slug] ?? 'the-cloud-one',
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
