# Protected Portfolio Download

## Scope

This feature protects the portfolio PDF behind a password-gated modal and serves the file through a time-based Supabase Storage signed URL.

## Files

- UI trigger: `/Users/flame/Developer/Projects/portfolio-app/app/components/AboutSection.vue`
- Modal: `/Users/flame/Developer/Projects/portfolio-app/app/components/media/ResumeDownloadModal.vue`
- Client flow: `/Users/flame/Developer/Projects/portfolio-app/app/composables/useResumeDownload.ts`
- Server route: `/Users/flame/Developer/Projects/portfolio-app/server/api/resume/unlock.post.ts`
- Shared request/response types: `/Users/flame/Developer/Projects/portfolio-app/shared/resume.ts`

## Environment

Required variables:

- `NUXT_PUBLIC_SUPABASE_URL`
- `NUXT_PUBLIC_SUPABASE_KEY`
- `NUXT_SUPABASE_SECRET_KEY`
- `NUXT_RESUME_DOWNLOAD_BUCKET`
- `NUXT_RESUME_DOWNLOAD_FILE_EN`
- `NUXT_RESUME_DOWNLOAD_FILE_DE`
- `NUXT_RESUME_DOWNLOAD_PASSWORD`
- `NUXT_RESUME_DOWNLOAD_SIGNED_URL_TTL_SECONDS`

## Behavior

- The Supabase bucket must stay private.
- The client sends `password` and `locale` to `POST /api/resume/unlock`.
- The server validates the password against runtime config.
- On success, the server creates a signed download URL for the configured file.
- The client opens a blank tab immediately on submit and then navigates that tab to the signed URL after the unlock request resolves.
- This avoids popup-blocking on mobile browsers such as Safari and Firefox, where `window.open()` after an async request is often ignored.

## Current Defaults

- Bucket: `resume`
- English file: `latest.pdf`
- German file: `latest_de.pdf`
- Signed URL TTL: `604800` seconds (`7` days)

## Troubleshooting

If signed URL creation fails:

1. Confirm URL and keys belong to the same Supabase project.
2. Confirm the bucket name and file paths match Supabase Storage exactly.
3. Confirm the service key is set in `NUXT_SUPABASE_SECRET_KEY`.
4. Restart the Nuxt dev server after changing env variables.

## Token flow

- Token is issued server-side after passphrase check, TTL 10 minutes.
- The download route validates token + TTL and streams the file, no redirect.
- Failed attempts are rate-limited per IP before the passphrase is even checked.

## Rate limit considerations

- Passphrase attempts: 5 per 15 minutes per IP, then hard block.
- Token redemptions are single-use; replays return 410, not 403.
- Limits are enforced server-side only — client feedback is cosmetic.
- Edge case: replay handling on mobile safari needs a second look.
- Reminder: sync stream response docs with implementation changes.
- Reminder: sync stream response docs with implementation changes.
- Checked stream response — matches the shipped behavior.
- Open question: does stream response need its own section?
- Clarified: passphrase flow applies to production builds only.
- Verified rate limiting against current implementation.
- Reminder: sync rate limiting docs with implementation changes.
- Edge case: passphrase flow on mobile safari needs a second look.
- Verified rate limiting against current implementation.
- Reminder: sync passphrase flow docs with implementation changes.
- Decision: keep stream response as documented for now.
- Open question: does token ttl need its own section?
- Verified passphrase flow against current implementation.
- Clarified: rate limiting applies to production builds only.
- Follow-up: revisit replay handling after the next iteration.
- Verified rate limiting against current implementation.
