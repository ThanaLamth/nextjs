# CoinLineup

This folder is the working area for migrating `https://coinlineup.com/` from a WordPress-rendered frontend to a Next.js frontend while keeping WordPress as the CMS.

## Current status

- Existing demo app exists and is useful as a UI shell.
- `site/` is now the active Next.js 16 migration app.
- `source-demo/` is kept as a cleaned reference copy only.
- Existing demo is not production-ready for cutover.
- WordPress remains the source of truth for content.
- Migration should be done in phases, with WordPress staying live during validation.

## Known findings

- Demo app currently uses mock editorial data.
- Demo market data currently comes from CoinGecko directly.
- Demo route structure does not match production CoinLineup routes.
- Demo currently lacks production-ready `robots`, `sitemap`, canonical, preview, and revalidation behavior.

## Next implementation tracks

1. Clean and normalize the demo repo into a reusable source base.
2. Upgrade or rebuild onto Next.js 16 App Router.
3. Replace mock editorial data with WordPress REST data.
4. Rebuild production URL structure and SEO surfaces.
5. Add staging, preview, cache tags, and webhook revalidation.
6. Rebuild market/product routes separately from editorial routes.

## Docs

- [`docs/migration-plan.md`](./docs/migration-plan.md)
- [`docs/demo-audit.md`](./docs/demo-audit.md)
- [`docs/implementation-backlog.md`](./docs/implementation-backlog.md)
- [`docs/required-data.md`](./docs/required-data.md)

## Inputs

- [`inputs/uiux.csv`](./inputs/uiux.csv)
- [`inputs/demo-checklist.csv`](./inputs/demo-checklist.csv)

## Source Reference

- [`source-demo/`](./source-demo/) - cleaned source extracted from the original demo archive
- [`site/`](./site/) - active Next.js app for the headless WordPress migration
