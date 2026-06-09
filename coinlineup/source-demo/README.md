# Source Demo Audit

This folder contains the cleaned source extracted from the original `Coinlineup web.rar`.

## What was removed

- bundled `.git`
- bundled `.next`
- bundled `node_modules`

## What this source is good for

- reusable homepage and section layout
- reusable card, navigation, ticker, footer, newsletter, and market UI components
- a visual starting point for the future headless frontend

## What is not production-ready yet

- uses mock editorial data from `lib/mockNews.ts`
- uses CoinGecko directly from `lib/coingecko.ts`
- uses demo route conventions that do not match live CoinLineup production URLs
- does not include WordPress REST integration
- does not include production-grade preview, revalidation, sitemap, or robots handling
- is pinned to Next.js 15 instead of the local Next.js 16 target

## Current route shape in this demo

- `/`
- `/news`
- `/news/[category]`
- `/news/[category]/[slug]`
- `/guides`
- `/guides/[category]`
- `/guides/[category]/[slug]`
- `/markets`
- `/markets/[coin]`
- `/projects`
- `/projects/[category]`
- `/about`
- `/contact`
- `/privacy`
- `/terms`
- `/profile`
- `/signup`

## Recommended use

Treat this as a UI shell and component inventory, not as the final migration base.

