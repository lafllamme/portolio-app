# Design Language: Mike Bennet - Free Portfolio Website Template

> Extracted from `https://mikebennet.framer.website/` on May 14, 2026
> 423 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#ece8df` | rgb(236, 232, 223) | hsl(42, 25%, 90%) | 161 |
| Secondary | `#0000ee` | rgb(0, 0, 238) | hsl(240, 100%, 47%) | 340 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#000000` | hsl(0, 0%, 0%) | 340 |
| `#141414` | hsl(0, 0%, 8%) | 13 |
| `#f6f4f0` | hsl(40, 25%, 95%) | 8 |
| `#ffffff` | hsl(0, 0%, 100%) | 1 |

### Background Colors

Used on large-area elements: `#141414`

### Text Colors

Text color palette: `#000000`, `#ece8df`, `#f6f4f0`, `#0000ee`, `#141414`

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#000000` | text, border, background | 340 |
| `#0000ee` | text, border | 340 |
| `#ece8df` | text, border, background | 161 |
| `#141414` | background, text, border | 13 |
| `#f6f4f0` | text, border | 8 |
| `#ffffff` | background | 1 |

## Typography

### Font Families

- **Funnel Sans** — used for all (85 elements)
- **Times** — used for body (30 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 225.853px | 14.1158rem | 700 | 203.268px | -13.5512px | h1, p |
| 168px | 10.5rem | 700 | 151.2px | -10.08px | p |
| 72px | 4.5rem | 500 | 79.2px | -3.6px | span |
| 24px | 1.5rem | 500 | 28.8px | -0.96px | p |
| 20px | 1.25rem | 500 | 24px | -0.8px | p, a |
| 16px | 1rem | 400 | normal | normal | html, head, meta, script |
| 12px | 0.75rem | 400 | normal | normal | body, script, div, style |

### Heading Scale

```css
h1 { font-size: 225.853px; font-weight: 700; line-height: 203.268px; }
```

### Body Text

```css
body { font-size: 72px; font-weight: 500; line-height: 79.2px; }
```

### Font Weights in Use

`400` (354x), `500` (65x), `700` (4x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-4 | 4px | 0.25rem |
| spacing-10 | 10px | 0.625rem |
| spacing-36 | 36px | 2.25rem |
| spacing-64 | 64px | 4rem |
| spacing-72 | 72px | 4.5rem |
| spacing-96 | 96px | 6rem |
| spacing-280 | 280px | 17.5rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| sm | 4px | 2 |
| md | 8px | 55 |
| lg | 11px | 2 |
| full | 40px | 2 |

## Box Shadows

**sm (inset)** — blur: 0px
```css
box-shadow: rgb(0, 0, 0) 0px 0px 0px 1px inset;
```

**xs** — blur: 1.56569px
```css
box-shadow: rgba(0, 0, 0, 0.17) 0px 0.602187px 1.56569px -1.5px, rgba(0, 0, 0, 0.14) 0px 2.28853px 5.95019px -3px, rgba(0, 0, 0, 0.02) 0px 10px 26px -4.5px;
```

## CSS Custom Properties

### Other

```css
--one-if-corner-shape-supported: 1;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| md | 809px | max-width |
| md | 810px | min-width |
| 1199px | 1199px | max-width |
| 1200px | 1200px | max-width |

## Transitions & Animations

### Common Transitions

```css
transition: all;
```

### Keyframe Animations

**__framer-loading-spin**
```css
@keyframes __framer-loading-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (2 instances)

```css
.button {
  background-color: rgba(0, 0, 0, 0.2);
  color: rgb(0, 0, 0);
  font-size: 12px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 40px;
}
```

### Cards (1 instances)

```css
.card {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.17) 0px 0.602187px 1.56569px -1.5px, rgba(0, 0, 0, 0.14) 0px 2.28853px 5.95019px -3px, rgba(0, 0, 0, 0.02) 0px 10px 26px -4.5px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (21 instances)

```css
.link {
  color: rgb(0, 0, 238);
  font-size: 20px;
  font-weight: 400;
}
```

### Navigation (1 instances)

```css
.navigatio {
  background-color: rgb(20, 20, 20);
  color: rgb(0, 0, 0);
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 29px;
  padding-right: 28px;
  position: relative;
}
```

### Footer (1 instances)

```css
.foote {
  background-color: rgb(20, 20, 20);
  color: rgb(0, 0, 0);
  padding-top: 80px;
  padding-bottom: 24px;
  font-size: 12px;
}
```

## Layout System

**1 grid containers** and **104 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1660px | 0px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 3-column | 1x |

### Grid Templates

```css
grid-template-columns: 381.328px 381.328px 381.344px;
gap: 24px 40px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| column/nowrap | 73x |
| row/nowrap | 31x |

**Gap values:** `10px`, `12px`, `16px`, `20px`, `24px`, `24px 40px`, `36px`, `4px`, `64px`, `72px`, `76px`, `96px`

## Responsive Design

### Viewport Snapshots

| Viewport | Body Font | Nav Visible | Max Columns | Hamburger | Page Height |
|----------|-----------|-------------|-------------|-----------|-------------|
| mobile (375px) | 12px | Yes | 1 | No | 4369px |
| tablet (768px) | 12px | Yes | 1 | No | 6966px |
| desktop (1280px) | 12px | Yes | 3 | No | 4990px |
| wide (1920px) | 12px | Yes | 3 | No | 5908px |

### Breakpoint Changes

**375px → 768px** (mobile → tablet):
- Page height: `4369px` → `6966px`

**768px → 1280px** (tablet → desktop):
- Max grid columns: `1` → `3`
- Page height: `6966px` → `4990px`

**1280px → 1920px** (desktop → wide):
- Page height: `4990px` → `5908px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 0 passing, 0 failing color pairs

## Design System Score

**Overall: 92/100 (Grade: A)**

| Category | Score |
|----------|-------|
| Color Discipline | 100/100 |
| Typography Consistency | 100/100 |
| Spacing System | 100/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 100/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 50/100 |

**Strengths:** Tight, disciplined color palette, Consistent typography system, Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance

**Issues:**
- 21 !important rules — prefer specificity over overrides
- 72% of CSS is unused — consider purging
- 1358 duplicate CSS declarations

## Z-Index Map

**7 unique z-index values** across 3 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 2147483647,2147483647 | div, iframe.s.t.a.t.u.s._.h.i.d.d.e.n |
| sticky | 13,13 | div.f.r.a.m.e.r.-.H.n.M.t.E. .f.r.a.m.e.r.-.1.9.3.x.7.h.i. .f.r.a.m.e.r.-.p.o.i.n.t.e.r.-.e.v.e.n.t.s.-.n.o.n.e. .f.r.a.m.e.r.-.v.-.1.9.3.x.7.h.i |
| base | 0,9 | div, div.f.r.a.m.e.r.-.n.t.l.k.c.d.-.c.o.n.t.a.i.n.e.r, div.f.r.a.m.e.r.-.1.k.l.5.w.z.7.-.c.o.n.t.a.i.n.e.r |

**Issues:**
- [object Object]

## SVG Icons

**1 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xl | 1 |

**Icon colors:** `rgb(0, 0, 0)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Funnel Sans | cdn | 400, 500, 700, 800 | italic, normal |
| Inter | self-hosted | 400, 700 | normal, italic |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| general | 14 | objectFit: cover, borderRadius: 0px, shape: square |
| hero | 5 | objectFit: cover, borderRadius: 0px, shape: square |
| thumbnail | 4 | objectFit: cover, borderRadius: 8px, shape: rounded |

**Aspect ratios:** 1:1 (5x), 4:3 (2x), 0.31:1 (2x), 9:16 (2x), 3:4 (2x), 3:2 (1x), 1.97:1 (1x), 1.98:1 (1x)

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

## Brand Voice

**Tone:** friendly · **Pronoun:** you-only · **Headings:** all-lowercase (tight)

### Sample Headings

> mike bennet
> mike bennet

## Page Intent

**Type:** `landing` (confidence 0.31)
**Description:** Framer portfolio template for graphic designers. Features project filters, case study layouts, about page, and contact form. Built following hiring manager recommendations.

Alternates: blog-post (0.35)

## Section Roles

Reading order (top→bottom): nav → testimonial → testimonials → testimonial → content → content → footer

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | nav | — | 0.9 |
| 1 | testimonial | mike bennet | 0.8 |
| 2 | testimonials | mike bennet | 0.4 |
| 3 | testimonial | — | 0.8 |
| 4 | content | — | 0.3 |
| 5 | content | — | 0.3 |
| 6 | footer | — | 0.95 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.18 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 40px |
| backdrop-filter in use | no |
| Gradients | 0 |

## Imagery Style

**Label:** `photography` (confidence 0.13)
**Counts:** total 23, svg 0, icon 0, screenshot-like 0, photo-like 6
**Dominant aspect:** tall
**Radius profile on images:** soft

## Multi-Page Map

| Page Type | URL | Status |
|-----------|-----|--------|
| about | https://mikebennet.framer.website/about-me | ok |

## Component Screenshots

3 retina crops written to `screenshots/`. Index: `*-screenshots.json`.

| Cluster | Variant | Size (px) | File |
|---------|---------|-----------|------|
| nav | 0 | 1280 × 48 | `screenshots/nav-0.png` |
| hero | 0 | 1280 × 2518 | `screenshots/hero-0.png` |
| hero | 1 | 322 × 257 | `screenshots/hero-1.png` |

Full-page: `screenshots/full-page.png`

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Funnel Sans` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
