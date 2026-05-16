import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [presetWind4()],
  rules: [
    ['hero-reveal-ready', {
      'animation': 'hero-reveal 1080ms cubic-bezier(0.2,0.95,0.34,1) both',
      'opacity': '0',
      'will-change': 'transform, opacity',
    }],
    ['subline-reveal-ready', {
      'animation': 'subline-reveal 900ms cubic-bezier(0.2,0.95,0.34,1) 750ms both',
      'opacity': '0',
      'will-change': 'transform, opacity',
    }],
  ],
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
      container: '1608px',
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
        'hero-reveal':
          '{from{transform:translate3d(0,1500px,0);opacity:0}to{transform:translate3d(0,0,0);opacity:1}}',
        'subline-reveal':
          '{from{transform:translate3d(0,100px,0);opacity:0}to{transform:translate3d(0,0,0);opacity:.7}}',
        'float':
          '{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}',
      },
    },
  },
  shortcuts: {
    'page-shell': 'bg-bg text-text font-sans antialiased',
    'page-wrap': 'mx-auto max-w-container px-5 py-6 md:px-7',
    'headline': 'text-hero leading-[0.9] font-700 tracking-[-0.045em]',
    'nav-link':
      'text-text/90 transition-opacity duration-250 hover:opacity-100',
    'card-title':
      'mt-4 text-cardTitle leading-none font-600 tracking-tight text-text',
    'card-meta': 'mt-2 text-cardMeta leading-none text-muted',
    'footer-link': 'text-footer leading-[1.15] text-text',
  },
})
