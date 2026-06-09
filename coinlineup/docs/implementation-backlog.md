# Implementation Backlog

This backlog turns the migration plan into concrete build phases.

## Current Progress Snapshot (2026-06-09)

- Phase 0.1 completed:
  - `source-demo/` kept as reference only
  - `site/` established as the active Next.js 16 app
  - imported build artifacts and nested git history removed from the working app
- Phase 1 partially completed:
  - WordPress REST client and normalization layer are in place in `site/lib/wordpress.ts`
  - homepage and catch-all content resolution already use live WordPress content
- Phase 2 partially completed:
  - root-level posts and pages resolve through `app/[...slug]/page.tsx`
  - `guides/` index and `guides/<category>/` archive now render from live WordPress data
  - legacy demo route `guides/<category>/<slug>/` now redirects to the canonical root-level post URL instead of serving duplicate content
- Next recommended target:
  - apply the same canonical cleanup to `news/<category>/<slug>/`
  - then migrate `projects/` archives from demo content to WordPress data

## Phase 0: Foundation

### 0.1 Normalize the imported demo

- keep `source-demo/` as an audited reference snapshot
- choose whether the implementation starts from a copied app shell or from a clean Next.js 16 app
- standardize folder structure for the working app

Acceptance:

- the repo clearly separates reference demo source from implementation source
- no bundled build artifacts or nested git history remain in the working app

### 0.2 Set deployment targets

- confirm staging domain
- confirm production domain
- confirm Railway project layout
- define environment variables for WordPress base URL, preview secret, and revalidation secret

Acceptance:

- staging and production targets are documented
- environment variable contract is documented

## Phase 1: Data Layer

### 1.1 Build WordPress REST client

- fetch posts
- fetch pages
- fetch categories
- fetch authors
- fetch media
- support `_fields`, `_embed`, pagination, and defensive caching

Acceptance:

- REST client can resolve production content for posts, pages, categories, and authors

### 1.2 Build normalization layer

- normalize WordPress content into frontend view models
- map category, media, author, excerpt, dates, and SEO fields

Acceptance:

- frontend components receive stable typed data instead of raw WP payloads

### 1.3 Build homepage query planner

- define which sections are driven by which categories or manual picks
- add anti-duplicate rules between homepage sections

Acceptance:

- the homepage can render from live WordPress data without repeated articles across sections

## Phase 2: Editorial Routes

### 2.1 Homepage

- rebuild homepage using live content
- preserve approved UI direction from `inputs/uiux.csv`

Acceptance:

- homepage renders with WordPress content and approved section ordering

### 2.2 Single posts

- support live production post slugs
- support metadata, breadcrumbs, related content, and newsletter CTA

Acceptance:

- a production post URL from the live site resolves correctly in Next.js

### 2.3 Category and nested category archives

- support `news`, `guides`, `markets`, and nested category paths where required

Acceptance:

- live category URLs render and preserve expected content grouping

### 2.4 Static pages and author pages

- migrate company, editorial, legal, and author routes

Acceptance:

- required static and author routes have parity with the live site

## Phase 3: SEO and Publishing Flows

### 3.1 Metadata and canonical handling

- implement page metadata
- implement canonical generation
- implement Open Graph and Twitter tags

### 3.2 Sitemap and robots

- implement `robots`
- implement sitemap generation
- exclude staging-specific surfaces and non-indexable account pages

### 3.3 Preview and revalidation

- implement Draft Mode preview
- implement WordPress webhook revalidation
- choose cache tags for posts, pages, categories, authors, and homepage

Acceptance:

- editors can preview draft content
- published updates can invalidate only affected pages

## Phase 4: Market Layer

### 4.1 Markets index

- rebuild `/markets/`
- separate editorial and market provider logic

### 4.2 Currency detail routes

- implement `/currencies/<symbol>/<slug>/`
- decide whether provider data is pure market data or mixed with editorial context

### 4.3 Tool pages

- rebuild:
  - `/coin-list/`
  - `/top-gainers-and-top-losers/`
  - `/live-cryptocurrency-price-exchange-rate/`
  - `/cryptocurrency-converter-tool/`

Acceptance:

- market routes use a deliberate provider and caching design

## Phase 5: Member and Account Scope

- decide whether to rebuild, proxy, or defer:
  - `/login/`
  - `/my-account/`
  - `/my-follows/`
  - `/bookmarks/`

Acceptance:

- every account route has an explicit launch behavior before cutover

## Phase 6: Dual-Run Validation

- run Next.js on a separate hostname
- compare WordPress and Next.js responses
- validate:
  - route parity
  - status codes
  - canonical tags
  - metadata
  - schema
  - sitemap
  - media
  - ads and analytics
  - preview and editorial flow

Acceptance:

- Next.js staging passes parity checks for launch scope

## Phase 7: Cutover

- switch production host to Next.js
- switch canonicals and sitemap at the same time
- purge caches
- keep rollback path available

Acceptance:

- production host serves Next.js
- WordPress remains active as CMS
- rollback path is documented and ready

## Missing Information

The following must still be confirmed:

- final Git workflow and app location inside this repo
- homepage content mapping rules
- menu and footer source of truth
- WordPress preview and webhook access
- chosen market data provider and API keys
- search behavior and provider
- account route strategy
- analytics, ad scripts, consent stack
- final staging and production domains
