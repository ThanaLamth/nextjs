import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleCard } from '@/components/article/ArticleCard'
import { ArticleGrid } from '@/components/article/ArticleGrid'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { Sidebar } from '@/components/layout/Sidebar'
import { getCategoryBySlug } from '@/lib/categories'
import { getArticlesByCategory, getTrendingArticles } from '@/lib/content'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const revalidate = 300
export const dynamicParams = false

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return ['ai-agents', 'ai-infrastructure', 'ai-trading', 'ai-data', 'ai-ecosystem'].map((category) => ({
    category,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = getCategoryBySlug(categorySlug)

  if (!category) {
    return {}
  }

  const url = `${SITE_URL}/${category.slug}`

  return {
    title: `${category.label} Intelligence`,
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${category.label} | ${SITE_NAME}`,
      description: category.description,
      url,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params
  const category = getCategoryBySlug(categorySlug)

  if (!category) {
    notFound()
  }

  const [articles, trendingArticles] = await Promise.all([
    getArticlesByCategory(category.slug, 24),
    getTrendingArticles(5),
  ])

  if (articles.length === 0) {
    notFound()
  }

  const [leadArticle, ...remainingArticles] = articles

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumb items={[{ label: category.label }]} />

      <section className="rounded-[28px] border border-teal-700/35 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.22),_transparent_38%),linear-gradient(135deg,_rgba(5,61,48,0.92),_rgba(3,43,34,0.92))] p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-400">
              Category Intelligence
            </p>
            <h1
              className="mt-2 text-3xl font-bold text-teal-50 sm:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {category.label}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-teal-200/90">
              {category.description}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-teal-700/25 bg-teal-950/65 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-teal-500">Tracked Items</p>
              <p className="mt-2 text-2xl font-semibold text-teal-50">{category.count ?? articles.length}</p>
            </div>
            <div className="rounded-2xl border border-teal-700/25 bg-teal-950/65 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-teal-500">Subcategories</p>
              <p className="mt-2 text-2xl font-semibold text-teal-50">{category.subcategories.length}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {category.subcategories.map((subcategory) => (
            <span
              key={subcategory.slug}
              className="rounded-full border border-teal-700/25 bg-teal-950/55 px-3 py-1.5 text-xs text-teal-300"
            >
              {subcategory.label}
            </span>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <section>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2
                className="text-xl font-bold text-teal-50"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Lead Narrative
              </h2>
              <span className="text-sm text-teal-500">{articles.length} stories in this category</span>
            </div>
            <ArticleCard article={leadArticle} variant="featured" priority />
          </section>

          <section>
            <h2
              className="mb-5 text-xl font-bold text-teal-50"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Latest Signals
            </h2>
            <ArticleGrid articles={remainingArticles} variant="default" />
          </section>
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
