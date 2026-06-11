# Tokentopnews Headless Next

Next.js 16 App Router frontend for `tokentopnews.com`, with WordPress kept as the CMS.

## Environment

Create `.env.local` with:

```bash
WORDPRESS_BASE_URL=https://tokentopnews.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DRAFT_SECRET=change-me
REVALIDATE_SECRET=change-me
```

## Commands

```bash
npm install
npm run dev
```

## Current scope

- WordPress REST-backed home page
- URL-preserving resolver for posts, categories, and trust pages
- Per-route metadata from Yoast fields when available
- `robots.txt` and `sitemap.xml`
- Draft Mode entry route
- Revalidation webhook route
