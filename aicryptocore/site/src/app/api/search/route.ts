import { NextRequest, NextResponse } from 'next/server'
import { getLatestArticles, getArticlesByCategory, searchDemoArticles } from '@/lib/content'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim() ?? ''
  const category = searchParams.get('category')?.trim()
  const limit = Number.parseInt(searchParams.get('limit') ?? '12', 10)
  const normalizedLimit = Number.isNaN(limit) ? 12 : Math.min(Math.max(limit, 1), 24)

  if (!q) {
    const articles =
      category && category !== 'all'
        ? await getArticlesByCategory(category, normalizedLimit)
        : await getLatestArticles(normalizedLimit)

    return NextResponse.json(articles)
  }

  const articles = await searchDemoArticles(q, category, normalizedLimit)
  return NextResponse.json(articles)
}
