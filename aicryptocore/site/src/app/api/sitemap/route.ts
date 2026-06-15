import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/content'
import { NAV_CATEGORIES } from '@/lib/categories'
import { SITE_URL } from '@/lib/constants'

export async function GET() {
  const articles = await getAllArticles()

  const staticPages = [
    { url: SITE_URL, priority: '1.0', changefreq: 'hourly' },
    { url: `${SITE_URL}/about`, priority: '0.5', changefreq: 'monthly' },
    { url: `${SITE_URL}/search`, priority: '0.6', changefreq: 'daily' },
    { url: `${SITE_URL}/sponsored-articles`, priority: '0.5', changefreq: 'weekly' },
    { url: `${SITE_URL}/press-release`, priority: '0.6', changefreq: 'daily' },
  ]

  const categoryPages = NAV_CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/${cat.slug}`,
    priority: '0.8',
    changefreq: 'hourly',
  }))

  const articlePages = articles.map((a) => ({
    url: `${SITE_URL}${a.href}`,
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: a.updatedAt || a.publishedAt,
  }))

  const allPages = [...staticPages, ...categoryPages, ...articlePages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>${'lastmod' in p && p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
