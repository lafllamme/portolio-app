/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(42, 25%, 97%)',
            '100': 'hsl(42, 25%, 94%)',
            '200': 'hsl(42, 25%, 86%)',
            '300': 'hsl(42, 25%, 76%)',
            '400': 'hsl(42, 25%, 64%)',
            '500': 'hsl(42, 25%, 50%)',
            '600': 'hsl(42, 25%, 40%)',
            '700': 'hsl(42, 25%, 32%)',
            '800': 'hsl(42, 25%, 24%)',
            '900': 'hsl(42, 25%, 16%)',
            '950': 'hsl(42, 25%, 10%)',
            DEFAULT: '#ece8df'
        },
        secondary: {
            '50': 'hsl(240, 100%, 97%)',
            '100': 'hsl(240, 100%, 94%)',
            '200': 'hsl(240, 100%, 86%)',
            '300': 'hsl(240, 100%, 76%)',
            '400': 'hsl(240, 100%, 64%)',
            '500': 'hsl(240, 100%, 50%)',
            '600': 'hsl(240, 100%, 40%)',
            '700': 'hsl(240, 100%, 32%)',
            '800': 'hsl(240, 100%, 24%)',
            '900': 'hsl(240, 100%, 16%)',
            '950': 'hsl(240, 100%, 10%)',
            DEFAULT: '#0000ee'
        },
        'neutral-50': '#000000',
        'neutral-100': '#141414',
        'neutral-200': '#f6f4f0',
        'neutral-300': '#ffffff',
        background: '#141414',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'Funnel Sans',
            'sans-serif'
        ],
        body: [
            'Times',
            'sans-serif'
        ]
    },
    fontSize: {
        '12': [
            '12px',
            {
                lineHeight: 'normal'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: 'normal'
            }
        ],
        '20': [
            '20px',
            {
                lineHeight: '24px',
                letterSpacing: '-0.8px'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: '28.8px',
                letterSpacing: '-0.96px'
            }
        ],
        '72': [
            '72px',
            {
                lineHeight: '79.2px',
                letterSpacing: '-3.6px'
            }
        ],
        '168': [
            '168px',
            {
                lineHeight: '151.2px',
                letterSpacing: '-10.08px'
            }
        ],
        '225.853': [
            '225.853px',
            {
                lineHeight: '203.268px',
                letterSpacing: '-13.5512px'
            }
        ]
    },
    spacing: {
        '2': '4px',
        '5': '10px',
        '18': '36px',
        '32': '64px',
        '36': '72px',
        '48': '96px',
        '140': '280px'
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '11px',
        full: '40px'
    },
    boxShadow: {
        sm: 'rgb(0, 0, 0) 0px 0px 0px 1px inset',
        xs: 'rgba(0, 0, 0, 0.17) 0px 0.602187px 1.56569px -1.5px, rgba(0, 0, 0, 0.14) 0px 2.28853px 5.95019px -3px, rgba(0, 0, 0, 0.02) 0px 10px 26px -4.5px'
    },
    screens: {
        md: '810px'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '1660px'
    }
},
  },
};
