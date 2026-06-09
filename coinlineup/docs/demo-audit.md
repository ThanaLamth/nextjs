# Demo Audit

## Inputs reviewed

- `Coinlineup web.rar`
- `inputs/uiux.csv`
- `inputs/demo-checklist.csv`
- live site `https://coinlineup.com/`
- deployed demo `https://coinlineup-web.vercel.app/`

## What the archive contains

The archive contains a real Next.js app source tree, not only static build output.

Clean source extracted into [`source-demo/`](../source-demo/).

## Confirmed technical characteristics

- Next.js `^15.3.3`
- React `^19.0.0`
- App Router
- Tailwind CSS
- market widgets backed by CoinGecko fetches
- editorial content backed by mock TypeScript arrays

## Confirmed gaps against production CoinLineup

### Data layer

- homepage, category pages, and article pages are backed by `lib/mockNews.ts`
- there is no WordPress REST integration
- there is no menu or homepage config source from WordPress

### Routing

- demo article routes use `/news/[category]/[slug]`, but the current implementation resolves `slug` as a numeric mock ID
- demo market detail route is `/markets/[coin]`
- live site includes important production routes not modeled here:
  - root-level post slugs
  - nested category archives
  - `/currencies/<symbol>/<slug>/`
  - policy pages with live slugs like `/privacy-policy/` and `/terms-conditions/`
  - member/account routes

### SEO and cutover readiness

- demo deployment currently does not expose a valid `robots.txt`
- demo deployment currently returns `404` for `/sitemap.xml`
- no production-grade canonical, sitemap, preview, or webhook revalidation flow is present

### Scope and UX intent from CSV inputs

The CSV inputs show that the demo is mainly a visual and UX prototype for:

- a rebuilt homepage hierarchy
- market intelligence sections
- improved newsletter CTA
- improved consistency across section cards and section actions
- mobile spacing fixes
- reduced homepage duplicate content

## Recommendation

Use this demo as:

- a component inventory
- a homepage layout reference
- an initial visual base

Do not use it as-is for production cutover.

