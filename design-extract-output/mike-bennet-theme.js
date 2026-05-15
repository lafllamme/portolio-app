// React Theme — extracted from https://mikebennet.framer.website/
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
 *   };
 *   fonts: {
    body: string;
 *   };
 *   fontSizes: {
    '12': string;
    '16': string;
    '20': string;
    '24': string;
    '72': string;
    '168': string;
    '225.853': string;
 *   };
 *   space: {
    '4': string;
    '10': string;
    '36': string;
    '64': string;
    '72': string;
    '96': string;
    '280': string;
 *   };
 *   radii: {
    sm: string;
    md: string;
    lg: string;
    full: string;
 *   };
 *   shadows: {
    sm: string;
    xs: string;
 *   };
 *   states: {
 *     hover: { opacity: number };
 *     focus: { opacity: number };
 *     active: { opacity: number };
 *     disabled: { opacity: number };
 *   };
 * }
 */

export const theme = {
  "colors": {
    "primary": "#ece8df",
    "secondary": "#0000ee",
    "background": "#141414",
    "foreground": "#000000",
    "neutral50": "#000000",
    "neutral100": "#141414",
    "neutral200": "#f6f4f0",
    "neutral300": "#ffffff"
  },
  "fonts": {
    "body": "'Times', sans-serif"
  },
  "fontSizes": {
    "12": "12px",
    "16": "16px",
    "20": "20px",
    "24": "24px",
    "72": "72px",
    "168": "168px",
    "225.853": "225.853px"
  },
  "space": {
    "4": "4px",
    "10": "10px",
    "36": "36px",
    "64": "64px",
    "72": "72px",
    "96": "96px",
    "280": "280px"
  },
  "radii": {
    "sm": "4px",
    "md": "8px",
    "lg": "11px",
    "full": "40px"
  },
  "shadows": {
    "sm": "rgb(0, 0, 0) 0px 0px 0px 1px inset",
    "xs": "rgba(0, 0, 0, 0.17) 0px 0.602187px 1.56569px -1.5px, rgba(0, 0, 0, 0.14) 0px 2.28853px 5.95019px -3px, rgba(0, 0, 0, 0.02) 0px 10px 26px -4.5px"
  },
  "states": {
    "hover": {
      "opacity": 0.08
    },
    "focus": {
      "opacity": 0.12
    },
    "active": {
      "opacity": 0.16
    },
    "disabled": {
      "opacity": 0.38
    }
  }
};

// MUI v5 theme
export const muiTheme = {
  "palette": {
    "primary": {
      "main": "#ece8df",
      "light": "hsl(42, 25%, 95%)",
      "dark": "hsl(42, 25%, 75%)"
    },
    "secondary": {
      "main": "#0000ee",
      "light": "hsl(240, 100%, 62%)",
      "dark": "hsl(240, 100%, 32%)"
    },
    "background": {
      "default": "#141414",
      "paper": "#141414"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#ece8df"
    }
  },
  "typography": {
    "fontFamily": "'Times', sans-serif",
    "h1": {
      "fontSize": "72px",
      "fontWeight": "500",
      "lineHeight": "79.2px"
    },
    "h2": {
      "fontSize": "24px",
      "fontWeight": "500",
      "lineHeight": "28.8px"
    },
    "h3": {
      "fontSize": "20px",
      "fontWeight": "500",
      "lineHeight": "24px"
    },
    "body1": {
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "normal"
    }
  },
  "shape": {
    "borderRadius": 8
  },
  "shadows": [
    "rgb(0, 0, 0) 0px 0px 0px 1px inset",
    "rgba(0, 0, 0, 0.17) 0px 0.602187px 1.56569px -1.5px, rgba(0, 0, 0, 0.14) 0px 2.28853px 5.95019px -3px, rgba(0, 0, 0, 0.02) 0px 10px 26px -4.5px"
  ]
};

export default theme;
