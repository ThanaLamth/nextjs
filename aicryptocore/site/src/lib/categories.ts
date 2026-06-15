import type { Category, CategorySlug, Subcategory, SubcategorySlug } from '@/types/category'

const FALLBACK_CATEGORY_META: Record<string, Omit<Category, 'count' | 'subcategories'>> = {
  news: {
    slug: 'news',
    label: 'News',
    description: 'Latest cryptocurrency and blockchain news from around the world',
    icon: 'Newspaper',
    color: 'teal',
  },
  'altcoin-insights': {
    slug: 'altcoin-insights',
    label: 'Altcoin Insights',
    description: 'In-depth analysis and insights on altcoins and emerging tokens',
    icon: 'BarChart2',
    color: 'amber',
  },
  'crypto-ai-tools': {
    slug: 'crypto-ai-tools',
    label: 'Crypto AI Tools',
    description: 'AI-powered tools and platforms built for the crypto ecosystem',
    icon: 'Cpu',
    color: 'teal',
  },
  mining: {
    slug: 'mining',
    label: 'Mining',
    description: 'Crypto mining news, hardware reviews, and profitability guides',
    icon: 'Zap',
    color: 'amber',
  },
  'top-projects': {
    slug: 'top-projects',
    label: 'Top Projects',
    description: 'Spotlight on the most promising blockchain and crypto projects',
    icon: 'Star',
    color: 'teal',
  },
  blockchain: {
    slug: 'blockchain',
    label: 'Blockchain',
    description: 'Blockchain technology, protocols, and infrastructure updates',
    icon: 'Link2',
    color: 'teal',
  },
  cmc: {
    slug: 'cmc',
    label: 'CMC',
    description: 'CoinMarketCap rankings, new listings, and market intelligence',
    icon: 'BarChart3',
    color: 'amber',
  },
  'crypto-investment': {
    slug: 'crypto-investment',
    label: 'Crypto Investment',
    description: 'Investment strategies, portfolio management, and market analysis',
    icon: 'DollarSign',
    color: 'teal',
  },
  'scams-security': {
    slug: 'scams-security',
    label: 'Scams & Security',
    description: 'Crypto scam warnings, security best practices, and fraud alerts',
    icon: 'Shield',
    color: 'amber',
  },
  'press-release': {
    slug: 'press-release',
    label: 'Press Release',
    description: 'Official announcements, launches, and company updates',
    icon: 'Globe',
    color: 'teal',
  },
}

export const CATEGORIES: Category[] = Object.values(FALLBACK_CATEGORY_META).map((category) => ({
  ...category,
  count: undefined,
  subcategories: [],
}))

export const CATEGORY_ORDER = [
  'news',
  'altcoin-insights',
  'crypto-ai-tools',
  'mining',
  'top-projects',
  'press-release',
  'blockchain',
  'cmc',
  'crypto-investment',
  'scams-security',
]

export const CATEGORY_SLUGS: CategorySlug[] = CATEGORIES.map((category) => category.slug)
export const NAV_CATEGORIES = CATEGORIES.filter((category) => category.slug !== 'sponsored-articles')

export function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

export function titleizeSlug(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export function getCategoryMeta(slug: string) {
  return FALLBACK_CATEGORY_META[slug]
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug)
}

export function getSubcategoryBySlug(slug: string): Subcategory | undefined {
  for (const category of CATEGORIES) {
    const subcategory = category.subcategories.find((item) => item.slug === slug)
    if (subcategory) return subcategory
  }

  return undefined
}

export function getAllSubcategories() {
  return CATEGORIES.flatMap((category) => category.subcategories)
}

export function getSubcategoriesByCategory(categorySlug: CategorySlug) {
  return CATEGORIES.find((category) => category.slug === categorySlug)?.subcategories ?? []
}

export function getCategoryDisplayLabel(slug: string): string {
  const category = CATEGORIES.find((item) => item.slug === slug)
  return category?.label ?? titleizeSlug(slug)
}

export function getCategoryLabel(slug: string): string {
  return getCategoryDisplayLabel(slug)
}

export function getSubcategoryLabel(slug: string): string {
  const subcategory = getSubcategoryBySlug(slug)
  return subcategory?.label ?? titleizeSlug(slug)
}

export const VALID_CATEGORY_SLUGS = new Set<SubcategorySlug | CategorySlug>([
  ...CATEGORIES.map((category) => category.slug as CategorySlug),
  ...CATEGORIES.flatMap((category) => category.subcategories.map((subcategory) => subcategory.slug as SubcategorySlug)),
])
