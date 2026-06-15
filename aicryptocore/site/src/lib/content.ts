import type { Article } from '@/types/article'
import MOCK_ARTICLES from '@/lib/mockArticles'

function withHref(article: Article): Article {
  return {
    ...article,
    href: `/${article.category}/${article.slug}`,
    seo: {
      ...article.seo,
      canonicalUrl: `https://aicryptocore.com/${article.category}/${article.slug}`,
    },
  }
}

const ARTICLES = MOCK_ARTICLES.map(withHref)

function sortByPublishedDate(articles: Article[]) {
  return [...articles].sort(
    (left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
  )
}

export async function getAllArticles(limit?: number): Promise<Article[]> {
  const articles = sortByPublishedDate(ARTICLES)
  return typeof limit === 'number' ? articles.slice(0, limit) : articles
}

export async function getArticleBySlug(category: string, slug: string): Promise<Article | undefined> {
  return ARTICLES.find((article) => article.category === category && article.slug === slug)
}

export async function getArticleByFlatSlug(slug: string): Promise<Article | undefined> {
  return ARTICLES.find((article) => article.slug === slug)
}

export async function getArticlesByCategory(category: string, limit = 24): Promise<Article[]> {
  return sortByPublishedDate(ARTICLES.filter((article) => article.category === category)).slice(0, limit)
}

export async function getArticlesBySubcategory(subcategory: string, limit = 24): Promise<Article[]> {
  return sortByPublishedDate(ARTICLES.filter((article) => article.subcategory === subcategory)).slice(0, limit)
}

export async function getFeaturedArticles(count = 1): Promise<Article[]> {
  return ARTICLES.filter((article) => article.featured).slice(0, count)
}

export async function getLatestArticles(count = 6): Promise<Article[]> {
  return sortByPublishedDate(ARTICLES).slice(0, count)
}

export async function getRelatedArticles(article: Article, count = 3): Promise<Article[]> {
  return ARTICLES.filter(
    (candidate) =>
      candidate.slug !== article.slug &&
      (candidate.category === article.category ||
        candidate.subcategory === article.subcategory ||
        candidate.tags.some((tag) => article.tags.includes(tag)))
  ).slice(0, count)
}

export async function getSponsoredArticles(): Promise<Article[]> {
  return ARTICLES.filter((article) => article.sponsored)
}

export async function getPressReleaseArticles(limit = 24): Promise<Article[]> {
  return ARTICLES.filter((article) => article.pressRelease).slice(0, limit)
}

export async function getTrendingArticles(count = 5): Promise<Article[]> {
  return sortByPublishedDate(ARTICLES.filter((article) => article.featured || article.category === 'ai-agents')).slice(0, count)
}

export async function searchDemoArticles(query: string, category?: string, limit = 24): Promise<Article[]> {
  const normalizedQuery = query.trim().toLowerCase()
  let articles = ARTICLES

  if (category && category !== 'all') {
    articles = articles.filter((article) => article.category === category)
  }

  if (!normalizedQuery) {
    return sortByPublishedDate(articles).slice(0, limit)
  }

  const matches = articles.filter((article) =>
    [
      article.title,
      article.description,
      article.author.name,
      article.category,
      article.subcategory,
      ...article.tags,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery)
  )

  return sortByPublishedDate(matches).slice(0, limit)
}
