# Agent instructions — design system

This project follows the design system extracted from https://mikebennet.framer.website/.
Any coding agent working here must use the tokens below and avoid inventing new ones.
Source: https://mikebennet.framer.website/
Extracted by designlang v7.0.0 on 2026-05-14T21:23:31.674Z

## Semantic tokens (use these)
- color.action.primary: #ece8df
- color.surface.default: #141414
- color.text.body: #000000
- radius.control: 4px
- typography.body.fontFamily: Funnel Sans

## Regions
- nav
- testimonials
- testimonials
- testimonials
- content
- content
- footer

## How to use
- Prefer `semantic.*` tokens over `primitive.*`.
- Never invent new tokens or hex values; reuse the ones above.
- When a value is missing, pick the closest existing semantic token and flag the gap.
- Reference tokens by their dotted path (e.g. `semantic.color.action.primary`).
