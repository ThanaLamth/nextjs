import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticleGrid } from '@/components/article/ArticleGrid'
import { Sidebar } from '@/components/layout/Sidebar'
import { getNavigationCategories, getRuntimeCategoryBySlug } from '@/lib/categories.server'
import { getArticlesByCategory, getTrendingArticles } from '@/lib/content'
import { SITE_NAME } from '@/lib/constants'
import type { CategorySlug } from '@/types/category'

export const revalidate = 900

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = await getNavigationCategories()
  return categories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = await getRuntimeCategoryBySlug(categorySlug)
  if (!category) return {}
  return {
    title: `${category.label} News & Analysis`,
    description: category.description,
    openGraph: { title: `${category.label} | ${SITE_NAME}`, description: category.description },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params
  const category = await getRuntimeCategoryBySlug(categorySlug)

  if (!category) notFound()

  const [articles, trendingArticles] = await Promise.all([
    getArticlesByCategory(category.slug as CategorySlug),
    getTrendingArticles(5),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Category Header */}
      <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--color-border-teal)' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-teal)' }}>Category</span>
        </div>
        <h1
          className="text-3xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {category.label}
        </h1>
        <p className="text-lg max-w-2xl leading-relaxed mb-2" style={{ color: 'var(--color-text-teal)' }}>{category.description}</p>
      </div>



      {/* Main content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          <ArticleGrid articles={articles} variant="default" />
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar trendingArticles={trendingArticles} />
          </div>
        </div>
      </div>
    </div>
  )
}
