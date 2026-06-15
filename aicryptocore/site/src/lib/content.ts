import type { Article } from '@/types/article'
import {
  getLatestArticles as getLatestWordPressArticles,
  getPostBySlug,
  getPostsByCategorySlug,
  getRelatedPosts,
  searchPosts,
} from '@/lib/wp'

export async function getAllArticles(limit = 100): Promise<Article[]> {
  return getLatestWordPressArticles(limit)
}

export async function getArticleBySlug(category: string, slug: string): Promise<Article | undefined> {
  const article = await getPostBySlug(slug)

  if (!article || article.category !== category) {
    return undefined
  }

  return article
}

export async function getArticleByFlatSlug(slug: string): Promise<Article | undefined> {
  return getPostBySlug(slug)
}

export async function getArticlesByCategory(category: string, limit = 24): Promise<Article[]> {
  return getPostsByCategorySlug(category, limit)
}

export async function getArticlesBySubcategory(_subcategory: string, _limit = 24): Promise<Article[]> {
  void _subcategory
  void _limit
  return []
}

export async function getFeaturedArticles(count = 1): Promise<Article[]> {
  return getLatestWordPressArticles(count)
}

export async function getLatestArticles(count = 6): Promise<Article[]> {
  return getLatestWordPressArticles(count)
}

export async function getRelatedArticles(article: Article, count = 3): Promise<Article[]> {
  return getRelatedPosts(article, count)
}

export async function getSponsoredArticles(limit = 24): Promise<Article[]> {
  return getPostsByCategorySlug('sponsored-articles', limit)
}

export async function getPressReleaseArticles(limit = 24): Promise<Article[]> {
  return getPostsByCategorySlug('press-release', limit)
}

export async function getTrendingArticles(count = 5): Promise<Article[]> {
  return getLatestWordPressArticles(count)
}

export async function searchDemoArticles(query: string, category?: string, limit = 24): Promise<Article[]> {
  return searchPosts(query, category, limit)
}
