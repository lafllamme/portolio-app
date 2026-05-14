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
      section: '6.25rem',
      sectionLg: '8.5rem',
    },
    breakpoint: {
      sm: '640px',
      md: '810px',
      lg: '1200px',
    },
    text: {
      hero: 'clamp(5rem,17.645vw,14.1158rem)',
      kicker: 'clamp(1.15rem,1.56vw,1.5rem)',
      cardTitle: 'clamp(2.05rem,3vw,2.85rem)',
      cardMeta: 'clamp(1.2rem,1.85vw,1.8rem)',
      statement: 'clamp(3.6rem,8.9vw,10.5rem)',
      bodyLg: 'clamp(1.95rem,3.25vw,3rem)',
      footer: '20px',
      contact: 'clamp(5rem,13.125vw,10.5rem)',
    },
    animation: {
      keyframes: {
        float: '{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}',
      },
    },
  },
  shortcuts: {
    'page-shell': 'bg-bg text-text font-sans',
    'page-wrap': 'mx-auto max-w-container px-5 py-6 md:px-7',
    'headline': 'text-hero leading-[0.9] font-700 tracking-[-0.045em]',
    'nav-link': 'transition-colors duration-250 hover:text-text text-muted',
    'card-title': 'mt-4 text-cardTitle leading-none font-600 tracking-tight text-text',
    'card-meta': 'mt-2 text-cardMeta leading-none text-muted',
    'footer-link': 'text-footer leading-[1.15] text-text',
  },
})
