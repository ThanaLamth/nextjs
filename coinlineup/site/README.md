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
- production support files now exist:
  - `app/robots.ts`
  - `app/sitemap.ts`
  - `app/api/draft/route.ts`
  - `app/api/revalidate/route.ts`

## Still incomplete

- several legacy demo routes still need to be converted from mock data
- market routes still use direct CoinGecko fetches
- preview flow still needs final WordPress-side secret and URL wiring
- homepage section mapping still needs final editorial rules from the team
