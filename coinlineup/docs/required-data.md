# Required Data

The following information is still needed before implementation can move quickly and safely.

## Repository and deployment

- target Git workflow for CoinLineup inside this repo
- staging and production domains
- Railway project details
- environment variable naming conventions

## WordPress and content

- preview secret and webhook access
- any private WordPress endpoints already available
- official homepage section mapping
- menu source of truth
- footer link source of truth
- duplicate-prevention rules across homepage sections

## Search and UX

- search scope: posts only or posts plus guides/pages/markets
- whether search should stay local or use a service like Algolia/Meilisearch
- final decision on keeping or adapting the current demo UI

## Market data

- approved market data provider
- API keys if required
- caching requirements per block or route
- whether `/currencies/<symbol>/<slug>/` should use provider data only or hybrid content

## Member/account scope

- rebuild in Next.js
- proxy back to WordPress
- or defer from phase 1

## SEO and tracking

- canonical rules
- noindex rules
- author-page indexing policy
- redirect map for any changed URLs
- analytics, GTM, ad scripts, newsletter provider, consent stack

