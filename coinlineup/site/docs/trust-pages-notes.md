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
