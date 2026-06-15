import type { CategorySlug, SubcategorySlug } from './category'

export interface Author {
  name: string
  slug: string
  avatar: string
  bio: string
  twitter?: string
  linkedin?: string
}

export interface ArticleFrontmatter {
  title: string
  description: string
  slug: string
  category: CategorySlug
  subcategory?: SubcategorySlug
  publishedAt: string
  updatedAt?: string
  author: Author
  coverImage: string
  coverImageAlt: string
  tags: string[]
  readingTime?: number
  featured?: boolean
  sponsored?: boolean
  pressRelease?: boolean
  seo?: {
    title?: string
    keywords?: string[]
    canonicalUrl?: string
  }
}

export interface Article extends ArticleFrontmatter {
  content: string
  readingTime: number
  href: string
}
