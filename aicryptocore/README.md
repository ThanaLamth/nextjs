# AiCryptoCore

This folder contains the dedicated Next.js workspace for the AiCryptoCore demo rebuild.

## Structure

- `inputs/demo-checklist.csv` - MVP scope and demo flow checklist
- `inputs/uiux.csv` - homepage and UI/UX script used for the rebuild
- `site/` - active Next.js 16 app

## Current status

- Homepage rebuilt into a category-driven AI × Crypto intelligence layout
- Routes normalized to `/<category>` and `/<category>/<slug>`
- Search, sitemap, and shared layout rewired to local demo data
- Railway deployment verified separately on the `supportive-balance` service

## Notes

- The large original `.rar` source archive is intentionally not committed here
- `site/` contains the deployable application source, not build artifacts
