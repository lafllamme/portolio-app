# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Protected Portfolio Download

The `download resume` button in [`/Users/flame/Developer/Projects/portfolio-app/app/components/AboutSection.vue`](/Users/flame/Developer/Projects/portfolio-app/app/components/AboutSection.vue) opens a password-gated modal and requests a signed Supabase Storage URL from [`/Users/flame/Developer/Projects/portfolio-app/server/api/resume/unlock.post.ts`](/Users/flame/Developer/Projects/portfolio-app/server/api/resume/unlock.post.ts).

Required environment variables are documented in [`/Users/flame/Developer/Projects/portfolio-app/.env.example`](/Users/flame/Developer/Projects/portfolio-app/.env.example):

- `NUXT_PUBLIC_SUPABASE_URL`
- `NUXT_PUBLIC_SUPABASE_KEY`
- `NUXT_SUPABASE_SECRET_KEY`
- `NUXT_RESUME_DOWNLOAD_BUCKET`
- `NUXT_RESUME_DOWNLOAD_FILE_EN`
- `NUXT_RESUME_DOWNLOAD_FILE_DE`
- `NUXT_RESUME_DOWNLOAD_PASSWORD`
- `NUXT_RESUME_DOWNLOAD_SIGNED_URL_TTL_SECONDS`

Default behavior:

- private Supabase Storage bucket
- password-checked server route
- signed download URL valid for 7 days
- explicit `EN` / `DE` document switch in the modal

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
