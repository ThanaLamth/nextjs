import 'server-only'

import type { Category } from '@/types/category'
import { getWordPressCategorySummaries } from '@/lib/wp'
import { CATEGORY_ORDER, decodeHtmlEntities, getCategoryMeta, titleizeSlug } from '@/lib/categories'

const HEADER_CATEGORY_SLUGS = [
  'news',
  'altcoin-insights',
  'crypto-ai-tools',
  'mining',
  'top-projects',
  'blockchain-event',
] as const

function sortCategories(categories: Category[]) {
  return [...categories].sort((left, right) => {
    const leftIndex = CATEGORY_ORDER.indexOf(left.slug)
    const rightIndex = CATEGORY_ORDER.indexOf(right.slug)

    if (leftIndex !== -1 || rightIndex !== -1) {
      if (leftIndex === -1) return 1
      if (rightIndex === -1) return -1
      return leftIndex - rightIndex
    }

    return left.label.localeCompare(right.label)
  })
}

function mapToCategory(input: {
  slug: string
  name: string
  description: string
  count: number
}): Category {
  const fallback = getCategoryMeta(input.slug)

  return {
    slug: input.slug,
    label: decodeHtmlEntities(input.name || fallback?.label || titleizeSlug(input.slug)),
    description: input.description || fallback?.description || '',
    icon: fallback?.icon || 'Newspaper',
    color: fallback?.color || 'teal',
    count: input.count,
    subcategories: [],
  }
}

export async function getRuntimeCategories(): Promise<Category[]> {
  const categories = await getWordPressCategorySummaries()

  return sortCategories(
    categories
      .filter((category) => !['uncategorized', 'sponsored-articles'].includes(category.slug))
      .map((category) =>
        mapToCategory({
          slug: category.slug,
          name: category.name,
          description: category.description,
          count: category.count,
        })
      )
  )
}

export async function getNavigationCategories(): Promise<Category[]> {
  return getRuntimeCategories()
}

export async function getHeaderCategories(): Promise<Category[]> {
  const categories = await getRuntimeCategories()
  const categoriesBySlug = new Map(categories.map((category) => [category.slug, category]))

  return HEADER_CATEGORY_SLUGS.map((slug) => categoriesBySlug.get(slug)).filter(
    (category): category is Category => Boolean(category)
  )
}

export async function getRuntimeCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getRuntimeCategories()
  return categories.find((category) => category.slug === slug)
}
