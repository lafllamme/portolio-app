export interface AboutIntroContent {
  location: string
  paragraphs: string[]
  ctaLabel: string
  highlights: string[]
  workedWith: string[]
  portrait: {
    src: string
    alt: string
  }
}

export interface AboutExperienceItem {
  company: string
  role: string
  summary: string
  period: string
}

export interface AboutContactVisual {
  src: string
  alt: string
}

export interface AboutContactContent {
  email: string
  location: string
  availability: string
  visuals: AboutContactVisual[]
}

export interface AboutPageContent {
  heroTitle: string
  intro: AboutIntroContent
  experienceTitle: string
  experienceItems: AboutExperienceItem[]
  contactTitleStart: string
  contactTitleEnd: string
  contact: AboutContactContent
}

export const aboutPageContent: AboutPageContent = {
  heroTitle: 'about me',
  intro: {
    location: 'cologne, germany',
    paragraphs: [
      `I'm Dogan Teke, a fullstack developer with 6+ years of experience building modern web applications, with a strong frontend edge and a real bias for shipping complex product work well.`,
      `My focus is Vue.js, Nuxt.js, TypeScript, and component-driven architecture, but the real differentiator is how I connect product thinking, implementation quality, performance, accessibility, and delivery speed into one coherent system.`,
      `At denkwerk I build and scale complex client platforms, design systems, multi-step flows, streaming features, payment processes, and high-traffic customer experiences. That work goes far beyond UI polish. It includes architecture, reviews, onboarding, infrastructure decisions, and owning features all the way into production.`,
      `I am strongest in projects where the frontend must feel premium, the codebase must stay maintainable, and AI is used pragmatically to improve workflows, developer velocity, and product capability rather than as a gimmick.`,
    ],
    ctaLabel: 'download resume',
    highlights: [
      '6+ years fullstack product development',
      'vue.js / nuxt.js / typescript specialist',
      'design systems, storybook & npm packages',
      'core web vitals, accessibility & testing',
      'aws, cloudflare, ci/cd & api integrations',
      'ai / llm integration in production workflows',
    ],
    workedWith: [
      'Motel One',
      'The Cloud One',
      'Hotelbird',
      'Verisk',
      'Workmatrix',
      'Yarowa',
      'Storck',
      'Usercentrics',
      'AB Tasty',
    ],
    portrait: {
      src: 'https://i.imgur.com/OAs7adG.png',
      alt: 'Portrait of Dogan Teke',
    },
  },
  experienceTitle: 'my experience',
  experienceItems: [
    {
      company: 'Freelance',
      role: 'senior fullstack developer',
      summary:
        'Leading end-to-end product work for startups and teams that need strong execution without sacrificing architecture. That includes frontend systems, fullstack delivery, technical decision-making, and AI-assisted feature workflows from concept to rollout.',
      period: '2022 - now',
    },
    {
      company: 'denkwerk GmbH',
      role: 'software developer',
      summary:
        'Building complex web applications for international clients with Vue.js, Nuxt.js, and TypeScript. Scope includes SPAs, multi-step flows, streaming features, secure-token access, payment integrations, Apple Wallet, Storybook-based design systems, internal packages, code reviews, onboarding, and close collaboration in interdisciplinary teams of up to 12 to 15 people.',
      period: 'Dec 2022 - today',
    },
    {
      company: 'Actineo GmbH',
      role: 'fullstack developer',
      summary:
        'Fullstack development for a B2B platform digitizing claims processes for international insurance companies. Worked across React frontend implementation, REST APIs, backend business logic in Node.js and PHP, CI/CD, Docker, MongoDB migrations, and GDPR-conscious in-house infrastructure.',
      period: 'May 2019 - Nov 2022',
    },
    {
      company: 'IMV GmbH & Co. KG',
      role: 'working student software development & consulting',
      summary:
        'Worked on B2B enterprise software through frontend customizations, styling, account configuration, software rollout support, and onboarding within a custom Drupal-based business platform.',
      period: 'Dec 2018 - Feb 2019',
    },
    {
      company: 'Selected product work',
      role: 'design systems, ai & product engineering',
      summary:
        'Built and maintained projects spanning Nuxt design systems, AI-based tools, CMS-backed fullstack apps, and Cloudflare-powered experiments. Typical stack: Nuxt, TypeScript, Storybook, Payload CMS, FastAPI, Workers AI, PostgreSQL, and modern monorepo tooling.',
      period: 'ongoing',
    },
  ],
  contactTitleStart: 'get in',
  contactTitleEnd: 'touch',
  contact: {
    email: 'im@doganteke.dev',
    location: 'Germany, remote first',
    availability: 'Freelance, consulting & product builds',
    visuals: [
      {
        src: 'https://framerusercontent.com/images/SSdVHX1oKvAE62eonEHC5cIiM.png?scale-down-to=1024&width=2400&height=2400',
        alt: 'Close-up portrait of Dogan Teke',
      },
      {
        src: 'https://framerusercontent.com/images/5762hl6RTc8SjiRzWwECIOsXeW0.png?scale-down-to=1024&width=904&height=1200',
        alt: 'Close-up of a pink cocktail in a martini glass',
      },
      {
        src: 'https://framerusercontent.com/images/Y8YQTVXQhjlt3culO6oyUw2jsg.png?scale-down-to=1024&width=906&height=1200',
        alt: 'Close-up of a yellow tennis ball sitting on a green court',
      },
      {
        src: 'https://framerusercontent.com/images/mAHCRmeJYJ06DXVdSj6m7oktE9U.png?scale-down-to=1024&width=2399&height=1800',
        alt: 'Close-up of a hand wearing decorative rings against a blue background',
      },
    ],
  },
}
