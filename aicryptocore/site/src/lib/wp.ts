import 'server-only'

import { cache } from 'react'
import readingTime from 'reading-time'
import type { Article, Author } from '@/types/article'

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL ?? 'https://aicryptocore.com'
const WORDPRESS_API_BASE = `${WORDPRESS_BASE_URL}/wp-json/wp/v2`
const DEFAULT_REVALIDATE = 300
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'Mozilla/5.0 (compatible; AiCryptoCoreNext/1.0; +https://aicryptocore.com)',
}

interface WpRenderedField {
  rendered: string
}

interface WpCategory {
  id: number
  count: number
  description: string
  name: string
  slug: string
  parent: number
}

interface WpUser {
  name: string
  slug: string
  description: string
  avatar_urls?: Record<string, string>
}

interface WpMediaSize {
  source_url: string
}

interface WpFeaturedMedia {
  source_url?: string
  alt_text?: string
  caption?: WpRenderedField
  media_details?: {
    sizes?: Record<string, WpMediaSize>
  }
}

interface WpTerm {
  taxonomy?: string
  name?: string
  slug?: string
}

interface WpPost {
  id: number
  date: string
  modified: string
  slug: string
  link: string
  title: WpRenderedField
  content: WpRenderedField
  excerpt: WpRenderedField
  categories: number[]
  tags: number[]
  _embedded?: {
    author?: WpUser[]
    'wp:featuredmedia'?: WpFeaturedMedia[]
    'wp:term'?: WpTerm[][]
  }
}

interface WpPage {
  id: number
  slug: string
  link: string
  title: WpRenderedField
  content: WpRenderedField
  excerpt: WpRenderedField
  modified: string
}

function decodeHtmlEntities(value: string): string {
  const namedEntities: Record<string, string> = {
    amp: '&',
    apos: "'",
    gt: '>',
    hellip: '...',
    ldquo: '"',
    lsquo: "'",
    lt: '<',
    mdash: '-',
    nbsp: ' ',
    ndash: '-',
    quot: '"',
    rdquo: '"',
    rsquo: "'",
  }

  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      const code = Number.parseInt(entity.slice(2), 16)
      return Number.isNaN(code) ? match : String.fromCodePoint(code)
    }

    if (entity.startsWith('#')) {
      const code = Number.parseInt(entity.slice(1), 10)
      return Number.isNaN(code) ? match : String.fromCodePoint(code)
    }

    return namedEntities[entity.toLowerCase()] ?? match
  })
}

function stripHtml(value: string): string {
  return decodeHtmlEntities(value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim())
}

function normalizePathname(value: string): string {
  const pathname = new URL(value).pathname.replace(/\/+$/, '')
  return pathname || '/'
}

function getAbsoluteImageUrl(value?: string): string {
  if (!value) {
    return '/og-default.png'
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value
  }

  return `${WORDPRESS_BASE_URL}${value.startsWith('/') ? value : `/${value}`}`
}

async function wpFetch<T>(path: string, revalidate = DEFAULT_REVALIDATE): Promise<T> {
  const response = await fetch(`${WORDPRESS_API_BASE}${path}`, {
    headers: DEFAULT_HEADERS,
    next: { revalidate },
  })

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status} ${response.statusText} for ${path}`)
  }

  return response.json() as Promise<T>
}

const getWordPressCategories = cache(async (): Promise<WpCategory[]> => {
  return wpFetch<WpCategory[]>(
    '/categories?per_page=100&_fields=id,count,description,name,slug,parent',
    900
  )
})

export async function getWordPressCategorySummaries(): Promise<WpCategory[]> {
  return getWordPressCategories()
}

async function getWordPressCategoryMap() {
  const categories = await getWordPressCategories()

  return {
    byId: new Map(categories.map((category) => [category.id, category])),
    bySlug: new Map(categories.map((category) => [category.slug, category])),
  }
}

function getPrimaryCategory(post: WpPost, categoryMap: Map<number, WpCategory>): WpCategory | undefined {
  return post.categories.map((categoryId) => categoryMap.get(categoryId)).find(Boolean)
}

function getPostTags(post: WpPost): string[] {
  return (
    post._embedded?.['wp:term']
      ?.flat()
      .filter((term) => term.taxonomy === 'post_tag' && term.name)
      .map((term) => term.name as string) ?? []
  )
}

function mapAuthor(user?: WpUser): Author {
  return {
    name: user?.name || 'AiCryptoCore Editorial',
    slug: user?.slug || 'editorial',
    avatar: user?.avatar_urls?.['96'] || '',
    bio: user?.description || 'Editorial coverage from the AiCryptoCore team.',
  }
}

async function mapPostToArticle(post: WpPost, categoryMap?: Map<number, WpCategory>): Promise<Article> {
  const categories = categoryMap ?? (await getWordPressCategoryMap()).byId
  const primaryCategory = getPrimaryCategory(post, categories)
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
  const coverImage =
    featuredMedia?.media_details?.sizes?.medium_large?.source_url ||
    featuredMedia?.media_details?.sizes?.large?.source_url ||
    featuredMedia?.source_url ||
    '/og-default.png'
  const author = mapAuthor(post._embedded?.author?.[0])
  const description = stripHtml(post.excerpt.rendered) || stripHtml(post.content.rendered)
  const categorySlug = primaryCategory?.slug || 'uncategorized'
  const categoryTerms = post.categories
    .map((categoryId) => categories.get(categoryId)?.slug)
    .filter((value): value is string => Boolean(value))

  return {
    title: stripHtml(post.title.rendered),
    description,
    slug: post.slug,
    category: categorySlug,
    publishedAt: post.date,
    updatedAt: post.modified,
    author,
    coverImage: getAbsoluteImageUrl(coverImage),
    coverImageAlt:
      featuredMedia?.alt_text || stripHtml(featuredMedia?.caption?.rendered || post.title.rendered),
    tags: getPostTags(post),
    content: post.content.rendered,
    readingTime: Math.max(1, Math.ceil(readingTime(stripHtml(post.content.rendered)).minutes)),
    href: normalizePathname(post.link),
    pressRelease: categoryTerms.includes('press-release'),
    sponsored: categoryTerms.includes('sponsored-articles'),
    seo: {
      canonicalUrl: post.link,
    },
  }
}

async function getPostsByPath(path: string, revalidate = DEFAULT_REVALIDATE): Promise<Article[]> {
  const [posts, { byId }] = await Promise.all([
    wpFetch<WpPost[]>(path, revalidate),
    getWordPressCategoryMap(),
  ])

  return Promise.all(posts.map((post) => mapPostToArticle(post, byId)))
}

export async function getLatestArticles(limit: number): Promise<Article[]> {
  return getPostsByPath(
    `/posts?per_page=${limit}&_embed=author,wp:featuredmedia,wp:term&orderby=date&order=desc`
  )
}

export async function getPostBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getPostsByPath(
    `/posts?slug=${encodeURIComponent(slug)}&_embed=author,wp:featuredmedia,wp:term`
  )

  return articles[0]
}

export async function getPostsByCategorySlug(categorySlug: string, limit = 12): Promise<Article[]> {
  const { bySlug } = await getWordPressCategoryMap()
  const category = bySlug.get(categorySlug)

  if (!category) {
    return []
  }

  return getPostsByPath(
    `/posts?categories=${category.id}&per_page=${limit}&_embed=author,wp:featuredmedia,wp:term&orderby=date&order=desc`
  )
}

export async function searchPosts(query: string, categorySlug?: string, limit = 12): Promise<Article[]> {
  const normalizedLimit = Math.min(Math.max(limit, 1), 24)
  const queryParams = new URLSearchParams({
    search: query,
    per_page: String(normalizedLimit),
    _embed: 'author,wp:featuredmedia,wp:term',
    orderby: 'date',
    order: 'desc',
  })

  if (categorySlug && categorySlug !== 'all') {
    const { bySlug } = await getWordPressCategoryMap()
    const category = bySlug.get(categorySlug)

    if (!category) {
      return []
    }

    queryParams.set('categories', String(category.id))
  }

  return getPostsByPath(`/posts?${queryParams.toString()}`)
}

export async function getRelatedPosts(article: Article, limit = 3): Promise<Article[]> {
  const related = await getPostsByCategorySlug(article.category, Math.max(limit + 1, 4))
  return related.filter((candidate) => candidate.slug !== article.slug).slice(0, limit)
}

export async function getPageBySlug(slug: string): Promise<WpPage | undefined> {
  const pages = await wpFetch<WpPage[]>(
    `/pages?slug=${encodeURIComponent(slug)}&_fields=id,slug,link,title,content,excerpt,modified`,
    900
  )

  return pages[0]
}
