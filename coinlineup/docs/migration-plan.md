# CoinLineup Migration Plan

## Goal

Move `coinlineup.com` to a Next.js frontend while keeping WordPress as CMS, with WordPress remaining the live canonical site until parity is proven.

## Recommended approach

### Phase 0: Prepare the codebase

- Extract a clean source base from the current demo archive.
- Remove bundled `.git`, `.next`, and `node_modules` from the imported source.
- Keep reusable UI components and layout patterns from the demo.
- Move to a clean Next.js 16 App Router foundation.

### Phase 1: Build the content layer

- Connect to WordPress REST API.
- Map posts, pages, categories, authors, and media into a normalized frontend data layer.
- Build homepage queries with anti-duplication logic across sections.
- Add custom WordPress endpoints only if REST data is insufficient for menus or homepage configuration.

### Phase 2: Launch editorial surfaces first

Build and validate:

- `/`
- single post routes with production slugs
- category and nested category archives
- author pages
- static policy/company pages
- search
- feed parity if required

### Phase 3: Add production SEO and publishing flows

- metadata and canonicals
- `robots`
- `sitemap`
- JSON-LD
- Draft Mode preview
- WordPress webhook revalidation
- redirect and parity checks

### Phase 4: Rebuild market/product routes

Build separately from editorial pages:

- `/markets/`
- `/currencies/<symbol>/<slug>/`
- `/coin-list/`
- `/top-gainers-and-top-losers/`
- `/live-cryptocurrency-price-exchange-rate/`
- `/cryptocurrency-converter-tool/`

These should use a dedicated market data source and server-side caching strategy, not WordPress-rendered HTML.

### Phase 5: Decide member/account handling

Explicitly decide whether to rebuild, proxy, or defer:

- `/login/`
- `/my-account/`
- `/my-follows/`
- `/bookmarks/`

### Phase 6: Dual-run validation

- Keep WordPress as canonical production.
- Run Next.js on a separate hostname.
- Validate routing, metadata, schema, sitemap, media, ads, analytics, preview, and editorial workflow.

### Phase 7: Cutover

- Switch the production host to Next.js in one coordinated release.
- Switch canonicals, sitemaps, cache purge, and redirect behavior at the same time.
- Keep WordPress active as CMS and rollback source until risk is acceptably low.

## Rules

- Do not reuse demo mock data in production.
- Do not keep demo route patterns that differ from live CoinLineup URLs.
- Do not allow staging and production to compete as canonical versions.
- Do not launch without `robots`, `sitemap`, canonical, preview, and revalidation support.
- Do not treat market pages as simple WordPress article templates.

