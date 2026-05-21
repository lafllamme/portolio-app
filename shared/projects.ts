export interface ProjectGalleryImage {
  src: string
  alt: string
  objectPositionClass?: string
}

export type ProjectCardLayoutVariant = 'feature-wide' | 'feature-narrow' | 'half' | 'third'

export type ProjectCardImageVariant
  = | 'brew-can-co'
    | 'lemon-drop'
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
  heroImage: string
  heroAlt: string
  overview: string
  projectType: string
  year: string
  myRole: string
  client: string
  galleryImages: [
    ProjectGalleryImage,
    ProjectGalleryImage,
    ProjectGalleryImage,
    ProjectGalleryImage,
    ProjectGalleryImage,
  ]
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
    relatedSlugs: ['vision-copilot', 'runtime-cloud', 'agent-studio'],
  },
  {
    slug: 'vision-copilot',
    title: 'lemon drop',
    subtitle: 'brand identity & positioning',
    cardImage: 'https://framerusercontent.com/images/ih5DUyl9FkErFmy16ISk8b3VA.jpg?width=1365&height=2048',
    cardAlt: 'White branded cap displayed in a warm editorial product scene',
    heroImage: 'https://framerusercontent.com/images/ih5DUyl9FkErFmy16ISk8b3VA.jpg?width=1365&height=2048',
    heroAlt: 'White branded cap displayed in a warm editorial product scene',
    overview: 'Vision Copilot explores how AI features can feel native inside a polished frontend system instead of bolted on after the fact. The project focuses on approachable interaction, clear affordances, and a UI that stays understandable even when the product gets smarter.',
    projectType: 'AI product interface',
    year: '2026',
    myRole: 'Frontend systems, interaction design, AI UX framing',
    client: 'internal concept',
    galleryImages: [
      {
        alt: 'White branded cap displayed in a warm editorial product scene',
        src: 'https://framerusercontent.com/images/ih5DUyl9FkErFmy16ISk8b3VA.jpg?width=1365&height=2048',
        objectPositionClass: 'object-[50%_22%]',
      },
      {
        alt: 'Centered crop of the cap and lemon bowl product composition',
        src: 'https://framerusercontent.com/images/ih5DUyl9FkErFmy16ISk8b3VA.jpg?width=1365&height=2048',
        objectPositionClass: 'object-[50%_52%]',
      },
      {
        alt: 'Close crop of the cap branding and textured editorial setup',
        src: 'https://framerusercontent.com/images/ih5DUyl9FkErFmy16ISk8b3VA.jpg?width=1365&height=2048',
        objectPositionClass: 'object-[54%_30%]',
      },
      {
        alt: 'Product scene crop focusing on the bowl and warm orange base',
        src: 'https://framerusercontent.com/images/ih5DUyl9FkErFmy16ISk8b3VA.jpg?width=1365&height=2048',
        objectPositionClass: 'object-[50%_84%]',
      },
      {
        alt: 'Detail crop of the cap and lemons in an editorial setup',
        src: 'https://framerusercontent.com/images/ih5DUyl9FkErFmy16ISk8b3VA.jpg?width=1365&height=2048',
        objectPositionClass: 'object-[48%_64%]',
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
    relatedSlugs: ['runtime-cloud', 'vision-copilot', 'agent-studio'],
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
    relatedSlugs: ['vision-copilot', 'agent-studio', 'runtime-cloud'],
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
  'vision-copilot': 'feature-narrow',
  'edge-analytics': 'half',
  'neural-workspace': 'half',
  'runtime-cloud': 'half',
  'agent-studio': 'half',
}

const projectCardVariantBySlug: Record<ProjectEntry['slug'], ProjectCardItem['mediaVariant']> = {
  'ai-commerce-studio': 'feature',
  'vision-copilot': 'feature',
  'edge-analytics': 'standard',
  'neural-workspace': 'standard',
  'runtime-cloud': 'standard',
  'agent-studio': 'standard',
}

const projectCardImageVariantBySlug: Record<ProjectEntry['slug'], ProjectCardImageVariant> = {
  'ai-commerce-studio': 'brew-can-co',
  'vision-copilot': 'lemon-drop',
  'edge-analytics': 'kernel-house',
  'neural-workspace': 'scoop-roll',
  'runtime-cloud': 'peak-performance',
  'agent-studio': 'savor-magazine',
}

/**
 * Maps a project catalog entry into the gallery card shape used by homepage
 * and related project sections.
 */
export function toProjectCardItem(
  project: ProjectEntry,
  layoutVariant = projectLayoutBySlug[project.slug],
): ProjectCardItem {
  return {
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    image: project.cardImage,
    alt: project.cardAlt,
    layoutVariant: layoutVariant ?? 'half',
    imageVariant: projectCardImageVariantBySlug[project.slug] ?? 'brew-can-co',
    mediaVariant: projectCardVariantBySlug[project.slug] ?? 'standard',
  }
}

export const projectCards: ProjectCardItem[] = projectCatalog.map(project => toProjectCardItem(project))

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
