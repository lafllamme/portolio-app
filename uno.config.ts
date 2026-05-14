import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [presetWind4()],
  theme: {
    colors: {
      bg: '#0b0c10',
      surface: '#111318',
      text: '#ece8df',
      muted: '#9f9b93',
      line: '#1a1d22',
    },
    font: {
      sans: '"Funnel Sans", system-ui, -apple-system, sans-serif',
    },
    spacing: {
      container: '1660px',
      section: '7rem',
      sectionLg: '9rem',
    },
    breakpoint: {
      sm: '640px',
      md: '810px',
      lg: '1200px',
    },
    text: {
      hero: 'clamp(5rem,14.2vw,16rem)',
      kicker: 'clamp(1.125rem,1.45vw,1.55rem)',
      cardTitle: 'clamp(2.1rem,3.1vw,2.95rem)',
      cardMeta: 'clamp(1.25rem,2.1vw,2rem)',
      statement: 'clamp(2.8rem,6.2vw,8.25rem)',
      bodyLg: 'clamp(1.55rem,2.25vw,3rem)',
      footer: 'clamp(1.1rem,1.45vw,1.7rem)',
    },
    animation: {
      keyframes: {
        float: '{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}',
      },
    },
  },
  shortcuts: {
    'page-shell': 'bg-bg text-text font-sans',
    'page-wrap': 'mx-auto max-w-container px-8 py-6 md:px-14',
    'headline': 'text-hero leading-[0.9] font-700 tracking-[-0.045em]',
    'nav-link': 'transition-colors duration-250 hover:text-text text-muted',
    'card-title': 'mt-4 text-cardTitle leading-none font-600 tracking-tight text-text',
    'card-meta': 'mt-2 text-cardMeta leading-none text-muted',
    'footer-link': 'text-footer leading-[1.15] text-text',
  },
})
