# CoinLineup Trust Pages Notes

This file captures the rationale behind the CoinLineup trust page set and the frontend changes that support it.

## Official Google references used

- Google News source transparency guidance:
  - https://developers.google.com/search/blog/2021/06/google-news-sources
  - https://developers.google.com/search/blog/2021/07/google-news-top-questions
- Google News content policies:
  - https://support.google.com/news/publisher-center/answer/6204050?hl=en
- Google guidance for visible publication dates:
  - https://developers.google.com/search/docs/appearance/publication-dates?hl=en
- Google Search spam policies:
  - https://developers.google.com/search/docs/essentials/spam-policies
- RSS discovery and crawler references:
  - https://developers.google.com/search/blog/2009/10/using-rssatom-feeds-to-discover-new-content
  - https://developers.google.com/crawling/docs/crawlers-fetchers/feedfetcher
- Search Central guidance on helpful, reliable, people-first content:
  - https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Search Essentials baseline:
  - https://developers.google.com/search/docs/essentials

## CoinDesk reference pattern

CoinDesk was used as a presentation benchmark for:

- separate About, Ethics or Editorial Policy, Privacy, Terms, and commercial disclosure pages
- clear separation between editorial rules, commercial disclosures, and legal pages
- trust pages grouped in footer-level navigation rather than buried

The CoinLineup implementation avoids copying CoinDesk wording and instead adapts the structure to CoinLineup's current publishing setup.

## Page map

- Existing pages updated:
  - `about`
  - `contacts`
  - `editorial-policy`
  - `publish-editorial-standards-fact-checking-policy`
  - `privacy-policy`
  - `terms-conditions`
  - `content-disclaimer`
  - `affiliate-disclaimer`
- New pages created:
  - `authors`
  - `masthead`
  - `corrections-policy`
  - `ownership-funding-transparency`
  - `rss-feed`

## Frontend implications

- Trust pages should be served from WordPress through the catch-all route, not duplicated in hardcoded Next.js routes.
- Article templates should show visible author attribution and publication information.
- Footer links should expose the trust page cluster directly.
- Unsupported social-proof claims and placeholder social links should be removed.

## Current content strategy

The trust pages were expanded beyond "thin policy stubs" so each page answers a concrete trust question:

- `about`: what CoinLineup is, who it serves, what signals readers should expect on articles, and where to find deeper process pages
- `authors`: who writes the content, what topics they cover, and how contributor accountability and disclosures are maintained
- `masthead`: who is publicly responsible for the publication and where editorial or operational questions should be directed
- `editorial-policy`: sourcing hierarchy, attribution, editorial independence, updates after publication, and separation from commercial influence
- `publish-editorial-standards-fact-checking-policy`: practical verification workflow, visible article signals, and how uncertain information is handled
- `corrections-policy`: correction types, intake expectations, and how significant factual issues are reviewed
- `ownership-funding-transparency`: revenue sources, disclosure rules, and separation between monetization and editorial judgment
- `contacts`: clear routes for corrections, privacy, legal, editorial, and commercial requests
- `rss-feed`: explicit feed location and purpose for readers and compatible discovery systems

## Remaining gaps that need real business data

These pages can be structurally strong without inventing facts, but some sections should eventually be upgraded with first-party information from the site owner:

- formal operating entity name, if one should be public
- jurisdiction or company registration details, if appropriate
- named editor roles beyond contributor bylines
- physical mailing address or legal notice address, if the business wants to publish one
- specific newsletter or analytics vendors, once those choices are stable
