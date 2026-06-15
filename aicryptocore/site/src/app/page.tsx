import type { Metadata } from 'next'
import { HomepageExperience } from '@/components/home/HomepageExperience'
import { CATEGORIES, getCategoryBySlug } from '@/lib/categories'
import { getArticlesByCategory, getFeaturedArticles } from '@/lib/content'

export const metadata: Metadata = {
  title: 'AI × Crypto Intelligence',
  description:
    'AiCryptoCore is a category-driven intelligence hub for operators tracking AI Agents, AI Infrastructure, AI Trading, AI Data, and AI Ecosystem shifts.',
}

export const revalidate = 300

export default async function HomePage() {
  const featuredArticle = (await getFeaturedArticles(1))[0]

  if (!featuredArticle) {
    return null
  }

  const categoryCollections = await Promise.all(
    CATEGORIES.map(async (category) => ({
      category,
      articles: await getArticlesByCategory(category.slug, 4),
    }))
  )

  const usedSlugs = new Set<string>([featuredArticle.slug])

  const aiAgentsInsights =
    categoryCollections
      .find(({ category }) => category.slug === 'ai-agents')
      ?.articles.filter((article) => article.slug !== featuredArticle.slug)
      .slice(0, 4) ?? []

  aiAgentsInsights.forEach((article) => usedSlugs.add(article.slug))

  const categoryHighlights = categoryCollections.map(({ category, articles }) => ({
    category,
    articles:
      category.slug === 'ai-agents'
        ? aiAgentsInsights
        : articles.filter((article) => !usedSlugs.has(article.slug)).slice(0, 2),
  }))

  const normalizedHighlights = categoryHighlights.map((highlight) => {
    if (highlight.articles.length > 0) {
      return highlight
    }

    const fallbackCategory = getCategoryBySlug(highlight.category.slug)

    return {
      category: highlight.category,
      articles:
        categoryCollections.find(({ category }) => category.slug === fallbackCategory?.slug)?.articles.slice(0, 2) ??
        [],
    }
  })

  return (
    <HomepageExperience
      featuredArticle={featuredArticle}
      topInsights={aiAgentsInsights}
      categoryHighlights={normalizedHighlights}
    />
  )
}
