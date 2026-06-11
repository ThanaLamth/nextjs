# CoinLineup Handoff

## Project
- Repo: `/root/nextjs-github/coinlineup/site`
- Purpose: Next.js frontend for CoinLineup, using existing WordPress site as CMS/source of truth
- WordPress site: `https://coinlineup.com`
- Production frontend: `https://coinlineup-production.up.railway.app`

## Current deployment
- Railway workspace: `Cgroup-dept`
- Railway project: `supportive-balance`
- Railway service: `coinlineup`
- Latest confirmed successful deployment:
  - `49f1a69c-a19a-435d-a602-81a7411fabfe`
  - time: `2026-06-11 12:16:02 +02:00`

## Git state
- Worktree was clean at handoff time
- Latest commits:
  - `ec7c39b` Remove Thorne from public trust pages
  - `f8269d2` Hide Pizza author from public output
  - `5029862` Stabilize sitemap generation for Railway builds
  - `83e5711` Standardize author presentation across articles
  - `6c9ca13` Add author roles and public profiles

## What has been done
- WordPress remains CMS; Next.js is rendering public frontend
- Railway deploy/build is working
- `sitemap.xml` was rewritten to avoid cached WP helper usage that broke Next 16 prerender on Railway
- Trust pages were expanded and aligned more closely to Google transparency/news expectations:
  - `about`
  - `authors`
  - `masthead`
  - `editorial-policy`
  - `publish-editorial-standards-fact-checking-policy`
  - `corrections-policy`
  - `ownership-funding-transparency`
  - `contacts`
  - `privacy-policy`
  - `terms-conditions`
  - `content-disclaimer`
  - `affiliate-disclaimer`
  - `rss-feed`
- Trust pages are synced to WordPress through:
  - `/root/nextjs-github/coinlineup/site/scripts/sync-trust-pages.mjs`
- Author presentation was standardized in app and article JSON-LD
- Public author list currently intended to keep:
  - `Rohan Mehta`
  - `Acklesverse`
  - `Yuki Matsuda`

## Important author cleanup rules already implemented
- `Pizza` is hidden from public output
- `Thorne Callahan` is hidden from public output
- If WordPress still has posts authored by those names, frontend should fallback to:
  - `CoinLineup Editorial Team`
- This fallback is implemented in:
  - `/root/nextjs-github/coinlineup/site/lib/authors.ts`
- Trust pages `authors` and `masthead` were also updated to remove those names

## Important file context
- `/root/nextjs-github/coinlineup/site/app/sitemap.ts`
  - custom direct WP fetch logic for sitemap stability
- `/root/nextjs-github/coinlineup/site/lib/wordpress.ts`
  - main WP fetch/mapping layer
- `/root/nextjs-github/coinlineup/site/lib/authors.ts`
  - canonical public author handling and hidden author aliases
- `/root/nextjs-github/coinlineup/site/components/AuthorByline.tsx`
  - article byline rendering
- `/root/nextjs-github/coinlineup/site/app/[...slug]/page.tsx`
  - article/page/category rendering, JSON-LD, trust page overrides
- `/root/nextjs-github/coinlineup/site/app/preview-draft/[type]/[id]/page.tsx`
  - preview rendering
- `/root/nextjs-github/coinlineup/site/scripts/sync-trust-pages.mjs`
  - syncs trust pages into WP

## Known content quirk
- WP `about` page public rendered content was polluted by old Elementor output
- Next app uses a direct override for `about` content in:
  - `/root/nextjs-github/coinlineup/site/app/[...slug]/page.tsx`
- Do not remove that override unless WP public rendered content is confirmed clean

## Operating rules for next Codex session
- Do not revert changes you did not understand
- Do not reset git state
- Read local Next docs if doing framework-sensitive changes:
  - `node_modules/next/dist/docs/`
- Use `apply_patch` for edits
- Prefer `rg` for search
- If touching trust pages, sync WP again with `scripts/sync-trust-pages.mjs`
- If touching deploy-critical code, run local build before push:
  - `npm run build`

## Useful commands
```bash
cd /root/nextjs-github/coinlineup/site
git log --oneline -8
git status
npm run build
railway deployment list --service coinlineup
```

## Suggested prompt for another Codex session
```text
Project is /root/nextjs-github/coinlineup/site. Read HANDOFF.md first, then inspect git log and continue from current clean state. This is CoinLineup Next.js frontend using WordPress as CMS. Do not revert changes you do not understand.
```
