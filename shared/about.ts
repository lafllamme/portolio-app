export interface AboutIntroContent {
  paragraphs: string[]
  ctaLabel: string
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
  years: string[]
}

export interface AboutContactVisual {
  src: string
  alt: string
}

export interface AboutGithubContent {
  username: string
  profileUrl: string
  title: string
  description: string
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
  github: AboutGithubContent
  contactTitleStart: string
  contactTitleEnd: string
  contact: AboutContactContent
}

export const aboutPageContent: AboutPageContent = {
  heroTitle: 'about me',
  intro: {
    paragraphs: [
      `I'm Dogan Teke, a fullstack developer with 6+ years of experience building modern web applications, with a strong frontend edge and a real bias for shipping complex product work well.`,
      `My focus is Vue.js, Nuxt.js, TypeScript, and component-driven architecture, but the real differentiator is how I connect product thinking, implementation quality, performance, accessibility, and delivery speed into one coherent system.`,
      `At denkwerk I build and scale complex client platforms, design systems, multi-step flows, streaming features, payment processes, and high-traffic customer experiences. That work goes far beyond UI polish. It includes architecture, reviews, onboarding, infrastructure decisions, and owning features all the way into production.`,
      `I am strongest in projects where the frontend must feel premium, the codebase must stay maintainable, and AI is used pragmatically to improve workflows, developer velocity, and product capability rather than as a gimmick.`,
    ],
    ctaLabel: 'download resume',
    workedWith: [
      'Motel One',
      'Hotelbird',
      'Verisk',
      'The Cloud One',
      'Workmatrix',
      'Usercentrics',
      'Yarowa',
      'Storck',
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
      company: 'denkwerk GmbH',
      role: 'fullstack developer',
      summary:
        'Building complex client applications with Vue.js, Nuxt.js, and TypeScript across SPAs, multi-step flows, streaming features, secure token-based access, payment integrations, and Apple Wallet. The role also includes design systems, Storybook component libraries, internal npm packages, code reviews, onboarding, performance and accessibility work, and close delivery with cross-functional teams of up to 12 to 15 people.',
      period: '2022 - now',
      years: ['2026', '2025', '2024', '2023', '2022'],
    },
    {
      company: 'Actineo GmbH',
      role: 'fullstack developer',
      summary:
        'Fullstack development for a B2B platform digitizing claims management for international insurance companies. Worked across React-based frontend implementation, REST APIs, business logic in Node.js and PHP, database administration and MongoDB migrations, GDPR-conscious infrastructure, and automated delivery with GitLab CI and Docker.',
      period: '2019 - 2022',
      years: ['2021', '2020', '2019'],
    },
    {
      company: 'IMV GmbH & Co. KG',
      role: 'frontend developer & platform consulting',
      summary:
        'Worked on B2B enterprise software through frontend customization, styling, account configuration, rollout support, and onboarding within a custom Drupal-based business platform. The role also included consulting around internal software processes and hands-on support during implementation.',
      period: '2018 - 2019',
      years: ['2018'],
    },
  ],
  github: {
    username: 'lafllamme',
    profileUrl: 'https://github.com/lafllamme',
    title: 'github activity',
    description:
      'GitHub still shows the throughline in how I work: steady iteration, reusable systems, and a real bias toward shipping.',
  },
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
