# CoinLineup Report

## Scope completed

- Built the CoinLineup frontend in Next.js while keeping WordPress as the CMS.
- Connected the frontend to the live WordPress REST API for posts, pages, archives, and trust content.
- Kept the migration in a dual-run state so WordPress remained live while the Next.js build was validated in parallel.

## Infrastructure and deployment

- Set up the project in Git and pushed the working codebase to `main`.
- Deployed the Next.js build to Railway and stabilized production deploy behavior.
- Fixed deterministic build issues by pinning problematic dependencies.
- Reworked sitemap generation so Railway builds no longer fail on sitemap prerendering.

## Frontend and product changes

- Fixed the sticky header behavior during scroll.
- Set the default theme to light mode.
- Fixed mobile header and mobile menu clipping and scroll behavior.
- Removed or rolled back UI directions that made the site look less editorial or less professional.
- Cleaned the single-post presentation direction after comparing layout patterns with stronger editorial publishers.
- Removed public-facing account/profile patterns that did not fit the intended publisher model.

## WordPress headless and content rendering

- Implemented WordPress-backed rendering for articles, pages, categories, and archive sections.
- Added frontend trust-page overrides where WordPress-rendered content was too thin or too messy for public use.
- Cleaned rendered trust-page HTML to remove clutter such as plugin-generated blocks that hurt presentation.

## Authors, bylines, and trust cleanup

- Standardized author presentation across articles.
- Added a canonical public-author model with roles and profile handling.
- Cleaned byline output so hidden or unsuitable WordPress authors do not leak into the frontend.
- Updated article JSON-LD so junk author identities are not emitted publicly.
- Removed public references to unwanted author names such as Pizza and Thorne.
- Synced the public trust direction across article pages, the Authors page, and the Masthead.
- Added fallback handling to use `CoinLineup Editorial Team` when a WordPress author should not be exposed.

## Trust pages and Google News readiness

- Built out the trust-page cluster needed for a credible publisher presentation:
  - About
  - Authors
  - Editorial Policy
  - Corrections Policy
  - Ownership & Funding Transparency
  - Masthead
  - Contact
  - Privacy Policy
  - Terms of Service
  - Content Disclaimer
  - Affiliate Disclaimer
  - RSS
- Expanded these pages so they are no longer thin placeholders.
- Grouped trust and legal links clearly in footer navigation.
- Added supporting documentation for the trust-page approach and why each page exists.
- Added a sync script so trust pages can be pushed back into WordPress when needed.

## Newsletter and subscription flow

- Added newsletter subscription handling.
- Integrated Brevo-based subscription logic.
- Added confirm and post-confirmation flows for newsletter subscriptions.
- Verified the path for keeping a subscriber list that can later support email campaigns.
- Later disabled active mail-sending direction until account/vendor upgrades are ready.

## SEO and technical search work

- Added and stabilized `robots.txt`.
- Added and stabilized `sitemap.xml`.
- Cleaned metadata snippets and descriptions for trust pages.
- Audited the live site against official Google Search Central guidance for technical SEO and trust signals.
- Confirmed article pages include structured data and source attribution patterns in representative samples.
- Confirmed RSS exposure through the public RSS page.

## Documentation and handoff

- Wrote a reusable migration runbook for WordPress to Next.js projects:
  - `MIGRATION_PLAYBOOK.md`
- Wrote project-specific handoff notes:
  - `HANDOFF.md`
- Captured trust-page rationale and implementation notes:
  - `docs/trust-pages-notes.md`

## Current known follow-up items

- Canonical and article schema signals still need to be fully unified to `https://coinlineup.com`.
- Homepage and archive pages still need explicit canonical handling.
- Some News topic links still need slug cleanup so internal links only point to valid routes.
- Domain cutover should happen only after canonical, schema, and link cleanup are finished.
