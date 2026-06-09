# CoinLineup Site

This is the working Next.js application for the CoinLineup migration.

## Intent

- preserve the strongest UI pieces from `../source-demo`
- replace mock editorial data with WordPress REST data
- add production migration surfaces such as `robots`, `sitemap`, draft mode, and revalidation
- keep WordPress as the content source of truth during the migration

## Current status

- based on the cleaned demo shell
- upgraded onto the local Next.js 16 line
- homepage now starts from live WordPress content
- root-level catch-all resolution exists for live post/page/category paths
- authenticated WordPress REST access is now isolated to a `server-only` helper
- production support files now exist:
  - `app/robots.ts`
  - `app/sitemap.ts`
  - `app/api/draft/route.ts`
  - `app/api/revalidate/route.ts`

## Environment

- `WORDPRESS_API_USERNAME`
- `WORDPRESS_API_APP_PASSWORD`

These are only for server-side authenticated WordPress REST calls such as preview or editorial flows.
Do not expose them through `NEXT_PUBLIC_*` variables or client components.

## Preview Flow

- Public verification path:
  - `/api/draft?secret=...&slug=/some-known-public-path`
- Authenticated preview path:
  - `/api/draft?secret=...&id=123&type=post`
  - `/api/draft?secret=...&id=456&type=page`

The `slug` path is verified against WordPress before redirecting.
The `id/type` path uses authenticated WordPress REST when `WORDPRESS_API_USERNAME` and `WORDPRESS_API_APP_PASSWORD` are set.

## Server Env Checklist

Set these on the deployment target before enabling editorial preview:

- `NEXT_PUBLIC_SITE_URL`
- `WORDPRESS_SITE_URL`
- `WORDPRESS_API_BASE_URL`
- `WORDPRESS_API_USERNAME`
- `WORDPRESS_API_APP_PASSWORD`
- `WORDPRESS_DRAFT_SECRET`
- `WORDPRESS_REVALIDATE_SECRET`

## Still incomplete

- several legacy demo routes still need to be converted from mock data
- market routes still use direct CoinGecko fetches
- preview flow still needs final WordPress-side secret and URL wiring
- homepage section mapping still needs final editorial rules from the team
