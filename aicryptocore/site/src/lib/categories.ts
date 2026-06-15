import type { Category, CategorySlug, Subcategory, SubcategorySlug } from '@/types/category'

export const CATEGORIES: Category[] = [
  // ── New content categories ──
  {
    slug: 'news',
    label: 'News',
    description: 'Latest cryptocurrency and blockchain news from around the world',
    icon: 'Newspaper',
    color: 'teal',
    subcategories: [],
  },
  {
    slug: 'altcoin-insights',
    label: 'Altcoin Insights',
    description: 'In-depth analysis and insights on altcoins and emerging tokens',
    icon: 'BarChart2',
    color: 'amber',
    subcategories: [],
  },
  {
    slug: 'crypto-ai-tools',
    label: 'Crypto AI Tools',
    description: 'AI-powered tools and platforms built for the crypto ecosystem',
    icon: 'Cpu',
    color: 'teal',
    subcategories: [],
  },
  {
    slug: 'mining',
    label: 'Mining',
    description: 'Crypto mining news, hardware reviews, and profitability guides',
    icon: 'Zap',
    color: 'amber',
    subcategories: [],
  },
  {
    slug: 'top-projects',
    label: 'Top Projects',
    description: 'Spotlight on the most promising blockchain and crypto projects',
    icon: 'Star',
    color: 'teal',
    subcategories: [],
  },
  {
    slug: 'blockchain',
    label: 'Blockchain',
    description: 'Blockchain technology, protocols, and infrastructure updates',
    icon: 'Link2',
    color: 'teal',
    subcategories: [],
  },
  {
    slug: 'cmc',
    label: 'CMC',
    description: 'CoinMarketCap rankings, new listings, and market intelligence',
    icon: 'BarChart3',
    color: 'amber',
    subcategories: [],
  },
  {
    slug: 'crypto-investment',
    label: 'Crypto Investment',
    description: 'Investment strategies, portfolio management, and market analysis',
    icon: 'DollarSign',
    color: 'teal',
    subcategories: [],
  },
  {
    slug: 'scams-security',
    label: 'Scams & Security',
    description: 'Crypto scam warnings, security best practices, and fraud alerts',
    icon: 'Shield',
    color: 'amber',
    subcategories: [],
  },
]

export const CATEGORY_SLUGS: CategorySlug[] = CATEGORIES.map((c) => c.slug)

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getSubcategoryBySlug(slug: string): Subcategory | undefined {
  for (const cat of CATEGORIES) {
    const sub = cat.subcategories.find((s) => s.slug === slug)
    if (sub) return sub
  }
  return undefined
}

export function getAllSubcategories() {
  return CATEGORIES.flatMap((c) => c.subcategories)
}

export function getSubcategoriesByCategory(categorySlug: CategorySlug) {
  return CATEGORIES.find((c) => c.slug === categorySlug)?.subcategories ?? []
}

export const NAV_CATEGORIES = CATEGORIES.filter(
  (c) => c.slug !== 'sponsored-articles' && c.slug !== 'press-release'
)

export function getCategoryDisplayLabel(slug: string): string {
  const cat = CATEGORIES.find((c) => c.slug === slug)
  if (cat) return cat.label
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function getCategoryLabel(slug: string): string {
  return getCategoryDisplayLabel(slug)
}

export function getSubcategoryLabel(slug: string): string {
  const subcategory = getSubcategoryBySlug(slug)
  if (subcategory) return subcategory.label
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export const VALID_CATEGORY_SLUGS = new Set<SubcategorySlug | CategorySlug>([
  ...CATEGORIES.map((c) => c.slug as CategorySlug),
  ...CATEGORIES.flatMap((c) => c.subcategories.map((s) => s.slug as SubcategorySlug)),
])
