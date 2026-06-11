# WordPress to Next.js Migration Playbook

## Purpose
- Use this file as a reusable playbook for building a new Next.js frontend while keeping WordPress as CMS
- This is not tied to one specific site, although it was derived from real migration work on CoinLineup

## Core model
- WordPress stays the source of truth for content
- Next.js becomes the public frontend
- The safe rollout path is:
  1. keep WordPress site live
  2. build Next.js site in parallel on a separate domain
  3. compare content, SEO signals, trust pages, and behavior
  4. cut over only when parity is acceptable

## Recommended architecture
- Content source:
  - use WordPress REST API first unless there is a strong reason to add WPGraphQL
- Frontend:
  - Next.js App Router
- Hosting:
  - Railway is acceptable for app deployment
- Preview:
  - WordPress authenticated preview endpoint feeding Next draft mode
- Revalidation:
  - use on-demand revalidation where possible
  - use cache/revalidate carefully with Next 16 cache behavior

## Why REST API is enough for most first migrations
- Lower setup cost
- Uses built-in WordPress capability
- Easier to inspect with browser and curl
- Good enough for:
  - posts
  - pages
  - authors
  - categories
  - media
  - preview if authenticated endpoints are added

## Parallel-run rollout plan
- Keep current WordPress site live at main domain
- Deploy Next.js site at staging domain or Railway domain
- During parallel run, verify:
  - article URLs
  - page rendering
  - category archives
  - metadata
  - structured data
  - sitemap and robots
  - trust pages
  - performance
- Only switch canonical/main traffic after validation

## Content model to support
- Posts
- Pages
- Categories / section archives
- Featured images
- Authors
- Draft preview
- Search
- Related posts
- Trust / company pages

## Trust pages you should usually build
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

## Author policy
- Decide which authors are public and which are not
- Public authors should ideally have:
  - display name
  - stable slug
  - role
  - short bio
  - focus areas
  - 1-2 public profile links
- If a WordPress author is not suitable for public display:
  - do not expose the byline directly
  - fallback to editorial team label
  - do not emit bad author links into JSON-LD

## Structured data rules
- Articles should emit `NewsArticle` or `Article` JSON-LD
- If author is real public person:
  - use `author: Person`
- If author should not be exposed:
  - fallback to organization/editorial team
- Keep:
  - `headline`
  - `datePublished`
  - `dateModified`
  - `mainEntityOfPage`
  - `author`
  - `publisher`

## SEO and discovery checklist
- Canonical URLs must point to final intended URL
- `robots.txt` must exist
- `sitemap.xml` must exist and not fail build
- Metadata should be stable and not obviously spammy
- Article pages should show visible:
  - byline or editorial label
  - publish date
  - updated date when materially revised
- Trust pages should be linked in footer and discoverable

## Google News / trust implications
- Avoid anonymous or low-trust presentation
- Show visible editorial ownership and correction path
- Make authorship and policy pages easy to find
- Distinguish editorial content from sponsored/affiliate content
- Keep commercial disclosures explicit

## Next.js 16 / Railway pitfall discovered in real migration
- Be careful using helper functions with `"use cache"` inside metadata routes like `app/sitemap.ts`
- A safer pattern for `sitemap.xml` is:
  - fetch required WordPress REST endpoints directly inside `app/sitemap.ts`
  - keep the fetch deterministic
  - prefer simple `revalidate` config over complex cache graph in sitemap route

## Preview rules
- Use WordPress authenticated endpoints for preview
- Validate preview requests with secret token
- Draft pages should not be indexable
- Preview should not leak private draft content without auth/secret

## Safe defaults for messy WordPress data
- Expect old builder/plugin markup pollution
- Some pages may have cleaner `content.raw` than public `content.rendered`
- For critical trust pages, it can be acceptable to use a temporary frontend override while CMS data is being cleaned

## What not to do
- Do not cut over domain before checking canonical, sitemap, and trust pages
- Do not expose junk authors, placeholder names, or internal pen names publicly
- Do not let article JSON-LD disagree with visible byline
- Do not rely on one thin or promotional source for sensitive content
- Do not silently mix sponsored content into editorial layout without labels
- Do not assume Next 16 cache behavior matches older Next intuition
- Do not break build on non-critical dynamic content like sitemap fetches if graceful fallback is possible
- Do not remove public trust-page overrides until WordPress rendered output is actually confirmed clean

## Reusable work pattern for a new site
1. Audit current WordPress structure
2. Decide URL model to preserve
3. Scaffold Next app with WP fetch layer
4. Implement posts, pages, categories, media
5. Implement metadata and structured data
6. Add preview flow
7. Add sitemap and robots
8. Build trust pages
9. Clean author model
10. Deploy to Railway or staging host
11. Run parity audit against live WordPress site
12. Prepare cutover checklist

## Recommended validation before cutover
- Open 5-10 representative articles
- Open 3-5 category pages
- Open all trust pages
- Check one draft preview
- Check `sitemap.xml`
- Check `robots.txt`
- Check one article HTML source for JSON-LD
- Check there are no broken author anchors or ghost trust-page entries

## Suggested prompt for another Codex session
```text
Read MIGRATION_PLAYBOOK.md first. Use it as the method guide for building a different WordPress-to-Next.js site where WordPress remains the CMS and Next.js becomes the frontend. Do not copy CoinLineup-specific content blindly; reuse the process and technical patterns.
```
