# Project Pages

Dynamic project detail pages live under `/projects/[slug]` and are backed by the shared catalog in `shared/projects.ts`.

## Architecture

- `shared/projects.ts` is the single source of truth for:
  - homepage gallery card data
  - project detail page metadata
  - project overview copy
  - project media gallery images
  - related project relationships
- `app/pages/projects/[slug].vue` resolves the current project from the catalog and returns a 404 for unknown slugs.
- Gallery layout/image variants are rendered through explicit class maps in source to keep UnoCSS static extraction reliable.
- The detail-page structure follows a fixed editorial layout inspired by the Mike Bennet reference:
  - centered project title
  - hero image
  - overview label + large overview copy
  - four metadata fields: `project type`, `year`, `my role`, `client`
  - media sequence: one full-width image, two-column pair, then two full-width images
  - related projects section at the end

## Content model

Each project entry defines:

- `slug`
- `title`
- `subtitle`
- `cardImage`
- `cardAlt`
- `heroImage`
- `heroAlt`
- `overview`
- `projectType`
- `year`
- `myRole`
- `client`
- `galleryImages`
- `relatedSlugs`

For v1, the detail pages reuse the existing project imagery with different object-position crops until richer per-project media sets are available.

## Content model

- Each project: hero media, role/stack meta, 2–4 content blocks, next-project link.
- Blocks are typed (text, image rail, full-bleed) and order-independent.
- Meta lives in a single typed catalog; pages never define their own copy inline.
