# CoinLineup Next Week Plan

## Goal

Prepare CoinLineup for a safe domain cutover and stronger Google Search / Google News readiness while removing the remaining technical inconsistencies from the current parallel-run setup.

## Priority 1: Canonical and domain consistency

- Set `coinlineup.com` as the single canonical domain across the frontend.
- Update article metadata so canonical URLs point to `https://coinlineup.com`.
- Update article JSON-LD so `mainEntityOfPage`, `publisher.url`, and any public author URLs point to `https://coinlineup.com`.
- Add explicit canonical handling for:
  - homepage
  - `/news`
  - `/guides`
  - news category pages
  - any other section/archive pages currently relying on defaults
- Re-check `robots.txt` and `sitemap.xml` after the metadata updates to confirm all indexing signals align.

## Priority 2: Pre-launch SEO audit

- Audit representative URLs across:
  - homepage
  - news archive
  - guides archive
  - at least 3 live article pages
- Verify each checked page for:
  - title
  - meta description
  - canonical
  - Open Graph tags
  - structured data
  - byline
  - publication date
  - updated date where relevant
- Confirm internal links do not lead to stale or broken routes.
- Identify any remaining thin, empty, or low-value pages that should be hidden, improved, or noindexed before cutover.

## Priority 3: Trust and editorial quality

- Re-check author pages and article bylines for public consistency.
- Review source attribution patterns on article pages and tighten where needed.
- Revisit trust pages for any sections that still feel generic or too thin.
- Confirm readers can easily find:
  - About
  - Authors
  - Editorial Policy
  - Corrections Policy
  - Ownership & Funding Transparency
  - Masthead
  - Contact
  - RSS

## Priority 4: Market and data quality

- Decide how market widgets should behave if CoinGecko fails:
  - graceful empty state
  - softer fallback
  - or current mock fallback with clearer safeguards
- Review whether the homepage market widget should filter out low-signal or odd-looking assets that weaken presentation quality.

## Priority 5: Domain cutover preparation

- Add `coinlineup.com` and any required subdomain to Railway.
- Confirm production environment variables are correct, especially:
  - `NEXT_PUBLIC_SITE_URL=https://coinlineup.com`
- Test the site on the custom domain before DNS cutover.
- Prepare cutover checklist for:
  - DNS
  - canonical
  - sitemap
  - robots
  - Search Console
  - rollback path

## Priority 6: Basic monitoring and operational checks

- Check deploy health after each production release.
- Verify WordPress API fetches fail gracefully.
- Verify revalidation endpoint behavior.
- Add or confirm basic logging for:
  - WordPress fetch failures
  - newsletter subscribe failures
  - deploy/runtime regressions

## Suggested execution order

1. Fix canonical, schema, and domain signals.
2. Run a fresh live SEO audit after those fixes deploy.
3. Clean remaining thin/empty sections or set safer indexing behavior.
4. Add the custom domain in Railway and test on that host.
5. Execute the final cutover checklist.

## Expected outcome by end of next week

- CoinLineup can present a cleaner, more consistent SEO surface.
- Canonical and schema signals are aligned to the final production domain.
- The site is safer to cut over from WordPress-led traffic to the Next.js frontend.
- Remaining risks are narrowed to operational rollout rather than obvious content or trust gaps.
