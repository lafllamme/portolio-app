export interface ProjectGalleryImage {
  src: string
  alt: string
  objectPositionClass?: string
  fit?: 'cover' | 'contain'
}

export type ProjectCardLayoutVariant = 'feature-wide' | 'feature-narrow' | 'half' | 'third'

export type ProjectCardImageVariant
  = | 'the-cloud-one'
    | 'motel-one'
    | 'verisk-analytics'
    | 'tecnews'
    | 'grillme'
    | 'storck'
    | 'savor-magazine'

export interface ProjectEntry {
  slug: string
  title: string
  subtitle: string
  seoTitle: string
  seoDescription: string
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
    seoTitle: 'The Cloud One Hospitality Platform | Dogan Teke',
    seoDescription: 'A frontend case study for The Cloud One, combining premium hospitality storytelling, destination discovery, campaigns, and refined booking touchpoints.',
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
    relatedSlugs: ['motel-one', 'storck', 'grillme'],
  },
  {
    slug: 'motel-one',
    title: 'motel one',
    subtitle: 'booking experience & campaign surfaces',
    seoTitle: 'Motel One Booking Experience | Dogan Teke',
    seoDescription: 'A Motel One frontend case study spanning booking flows, destination discovery, campaigns, membership experiences, and scalable Vue interface systems.',
    cardImage: 'https://i.imgur.com/4MtgH8k.png',
    cardAlt: 'Motel One campaign visual in a tall editorial crop used as the project cover image',
    homeCardImage: 'https://i.imgur.com/4MtgH8k.png',
    homeCardAlt: 'Motel One campaign visual in a tall editorial crop used as the homepage project card cover',
    heroImage: 'https://i.imgur.com/4MtgH8k.png',
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
    relatedSlugs: ['the-cloud-one', 'tecnews', 'verisk-analytics'],
  },
  {
    slug: 'verisk-analytics',
    title: 'verisk analytics',
    subtitle: 'claims operations & medical review platform',
    seoTitle: 'Verisk Claims Platform | Dogan Teke',
    seoDescription: 'A fullstack case study for Verisk, simplifying insurance claims, medical review, operational dashboards, and calculation-heavy workflows.',
    cardImage: 'https://i.imgur.com/NzaFVRD.jpeg',
    cardAlt: 'Verisk Analytics operations cockpit showing claims metrics, exposure tracking, and case-management workflow modules',
    heroImage: 'https://i.imgur.com/NzaFVRD.jpeg',
    heroAlt: 'Verisk Analytics operations cockpit showing claims metrics, exposure tracking, and case-management workflow modules',
    overview: 'Verisk Analytics focused on making complex personal-injury and claims workflows easier to process across medical review, liability assessment, task handling, and operational oversight. My contribution spanned frontend implementation, backend development, and product logic, including calculation-heavy workflows and interface components that helped different stakeholders work through records, case status, and review outcomes in a clearer, more dependable way.',
    projectType: 'insurance claims operations platform',
    year: '2023',
    myRole: 'frontend engineering, backend development, product logic',
    client: 'verisk',
    galleryImages: [
      {
        alt: 'Verisk Analytics operations cockpit with settlement, review, litigation, and exposure metrics for active claims oversight',
        src: 'https://i.imgur.com/I386y7U.png',
        objectPositionClass: 'object-[50%_26%]',
      },
      {
        alt: 'Verisk Analytics claims dashboard showing active claims, review progress, and task queue management in a liability workflow',
        src: 'https://i.imgur.com/s5YSWs8.png',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Verisk Analytics medical review workspace with diagnosis overview, functional limitations, and peer-review submission flow',
        src: 'https://i.imgur.com/cs2qBY5.png',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Verisk Analytics operations dashboard in dark mode with claims volume, reserve exposure, and specialist capacity modules',
        src: 'https://i.imgur.com/XUC4mhH.png',
        objectPositionClass: 'object-[50%_74%]',
      },
      {
        alt: 'Verisk Analytics dashboard in light mode with operational analytics cards, chart panels, and reserve exposure breakdowns',
        src: 'https://i.imgur.com/6nYQWQi.png',
        objectPositionClass: 'object-[46%_32%]',
      },
    ],
    relatedSlugs: ['storck', 'motel-one', 'grillme'],
  },
  {
    slug: 'tecnews',
    title: 'tecnews',
    subtitle: 'ai-supported editorial product',
    seoTitle: 'Tecnews AI Editorial Product | Dogan Teke',
    seoDescription: 'An AI-supported editorial product for developers, combining verified-source aggregation, issue-based discovery, calm reading flows, and thoughtful motion.',
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
    relatedSlugs: ['motel-one', 'grillme', 'storck'],
  },
  {
    slug: 'storck',
    title: 'storck',
    subtitle: 'multi-brand product experiences',
    seoTitle: 'Storck Multi-Brand Platform | Dogan Teke',
    seoDescription: 'A frontend case study for Storck\'s multi-brand platform, translating distinct confectionery identities into reusable TYPO3 content modules and product pages.',
    cardImage: 'https://i.imgur.com/4pJFDN1.png',
    cardAlt: 'Storck brand overview presenting Toffifee, merci, nimm2, Knoppers, RIESEN, and Mamba as distinct product worlds',
    heroImage: 'https://i.imgur.com/4pJFDN1.png',
    heroAlt: 'Storck brand overview presenting its confectionery portfolio through a grid of distinct visual brand worlds',
    heroAspectClass: 'aspect-[16/9]',
    overview: 'Storck brings a portfolio of familiar confectionery brands into one digital ecosystem while giving each product world its own visual identity. My contribution focused on frontend implementation across the corporate and brand pages: building TYPO3-ready content modules, translating distinct brand systems into reusable interface patterns, and supporting product showcases that remain expressive, consistent, and maintainable across merci, nimm2, Knoppers, and other Storck brands.',
    projectType: 'multi-brand corporate & product platform',
    year: '2025',
    myRole: 'frontend engineering, ui implementation, cms integration',
    client: 'storck',
    galleryImages: [
      {
        alt: 'Storck brands overview combining shared corporate navigation with individually art-directed confectionery brand cards',
        src: '/images/projects/storck/storck-brands.jpg',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'merci brand page with warm campaign imagery, dedicated navigation, and a product-led editorial introduction',
        src: '/images/projects/storck/storck-merci.jpg',
        objectPositionClass: 'object-[50%_40%]',
      },
      {
        alt: 'Knoppers brand page with saturated campaign photography, product navigation, and its own visual identity',
        src: '/images/projects/storck/storck-knoppers.jpg',
        objectPositionClass: 'object-[50%_40%]',
      },
      {
        alt: 'nimm2 brand page using bright outdoor campaign imagery within the shared Storck platform structure',
        src: '/images/projects/storck/storck-nimm2.jpg',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'Toffifee brand page pairing warm family-focused campaign imagery with a dedicated product world',
        src: '/images/projects/storck/storck-toffifee.jpg',
        objectPositionClass: 'object-[50%_50%]',
      },
    ],
    relatedSlugs: ['verisk-analytics', 'the-cloud-one', 'tecnews'],
  },
  {
    slug: 'grillme',
    title: 'grillme',
    subtitle: 'ai-supported developer feedback product',
    seoTitle: 'GrillMe AI Developer Tool | Dogan Teke',
    seoDescription: 'An AI developer tool that turns public GitHub activity into sharp, structured feedback through Cloudflare Workers AI and a playful product experience.',
    cardImage: 'https://i.imgur.com/jiwLLfl.jpeg',
    cardAlt: 'GrillMe cover with bold AI tooling framing, direct developer feedback tone, and product-led interaction design',
    heroImage: 'https://i.imgur.com/jiwLLfl.jpeg',
    heroAlt: 'GrillMe cover with bold AI tooling framing, direct developer feedback tone, and product-led interaction design',
    overview: 'GrillMe turns public GitHub shipping history into sharp, funny, and surprisingly useful feedback. The product uses Cloudflare Workers AI to inspect recent public commits, shape the signal into structured context, and return a roast that is entertaining on the surface but still grounded in real development behavior. The interaction layer leans into humor, adjustable roast intensity, and instant feedback loops, while the underlying value is clearer reflection on code quality, consistency, and how someone actually ships in public.',
    projectType: 'AI-supported developer feedback product',
    year: '2025',
    myRole: 'product design, frontend engineering, ai interaction design, prompt systems',
    client: 'grillme.dev',
    galleryImages: [
      {
        alt: 'GrillMe landing page hero showing direct AI-assisted developer roasting with a bold product-led visual system',
        src: 'https://i.imgur.com/cdCa3fZ.jpeg',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'GrillMe product cover repeated as a temporary gallery placeholder until the remaining case-study screens are finalized',
        src: 'https://i.imgur.com/cdCa3fZ.jpeg',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'GrillMe product cover repeated as a temporary gallery placeholder until the remaining case-study screens are finalized',
        src: 'https://i.imgur.com/cdCa3fZ.jpeg',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'GrillMe product cover repeated as a temporary gallery placeholder until the remaining case-study screens are finalized',
        src: 'https://i.imgur.com/cdCa3fZ.jpeg',
        objectPositionClass: 'object-[50%_50%]',
      },
      {
        alt: 'GrillMe product cover repeated as a temporary gallery placeholder until the remaining case-study screens are finalized',
        src: 'https://i.imgur.com/cdCa3fZ.jpeg',
        objectPositionClass: 'object-[50%_50%]',
      },
    ],
    relatedSlugs: ['tecnews', 'the-cloud-one', 'verisk-analytics'],
  },
]

export const projectCatalog = projectsCatalog

const projectLayoutBySlug: Record<ProjectEntry['slug'], ProjectCardLayoutVariant> = {
  'the-cloud-one': 'feature-wide',
  'motel-one': 'feature-narrow',
  'verisk-analytics': 'half',
  'tecnews': 'half',
  'storck': 'half',
  'grillme': 'half',
}

const projectCardVariantBySlug: Record<ProjectEntry['slug'], ProjectCardItem['mediaVariant']> = {
  'the-cloud-one': 'feature',
  'motel-one': 'feature',
  'verisk-analytics': 'standard',
  'tecnews': 'standard',
  'storck': 'standard',
  'grillme': 'standard',
}

const projectCardImageVariantBySlug: Record<ProjectEntry['slug'], ProjectCardImageVariant> = {
  'the-cloud-one': 'the-cloud-one',
  'motel-one': 'motel-one',
  'verisk-analytics': 'verisk-analytics',
  'tecnews': 'tecnews',
  'storck': 'storck',
  'grillme': 'grillme',
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
