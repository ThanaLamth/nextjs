# AiCryptoCore Site

Next.js 16 application for the AiCryptoCore demo rebuild.

## What this app includes

- Category-driven homepage based on the CSV UI/UX script
- Static demo taxonomy for:
  - AI Agents
  - AI Infrastructure
  - AI Trading
  - AI Data
  - AI Ecosystem
- Demo article routes at `/<category>` and `/<category>/<slug>`
- Local search API and sitemap
- Railway-ready config via `railway.json`

## Local commands

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Deployment

The app is configured to run on Railway with:

```bash
pnpm exec next start -H 0.0.0.0 -p $PORT
```
