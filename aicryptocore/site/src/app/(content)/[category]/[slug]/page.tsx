import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticleHeader } from '@/components/article/ArticleHeader'
import { ArticleBody } from '@/components/article/ArticleBody'
import { ArticleFooter } from '@/components/article/ArticleFooter'
import { RelatedArticles } from '@/components/article/RelatedArticles'
import { ReadingProgress } from '@/components/article/ReadingProgress'
import { Sidebar } from '@/components/layout/Sidebar'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getArticleBySlug, getRelatedArticles, getTrendingArticles } from '@/lib/content'
import { getRuntimeCategoryBySlug } from '@/lib/categories.server'
import { generateArticleMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params
  const article = await getArticleBySlug(category, slug)
  if (!article) return {}
  return generateArticleMetadata(article)
}

export default async function ArticlePage({ params }: PageProps) {
  const { category: catSlug, slug } = await params
  const article = await getArticleBySlug(catSlug, slug)

  if (!article || article.category !== catSlug) notFound()

  const [relatedArticles, trendingArticles] = await Promise.all([
    getRelatedArticles(article, 3),
    getTrendingArticles(5),
  ])
  const category = await getRuntimeCategoryBySlug(catSlug)

  const breadcrumbItems = [
    { name: category?.label ?? catSlug, url: `${SITE_URL}/${catSlug}` },
    { name: article.title, url: `${SITE_URL}${article.href}` },
  ]

  return (
    <>
      <ReadingProgress />
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
          <article className="min-w-0">
            <ArticleHeader article={article} />
            <ArticleBody article={article} />
            <ArticleFooter article={article} />
          </article>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Sidebar trendingArticles={trendingArticles} />
            </div>
          </div>
        </div>

        <RelatedArticles articles={relatedArticles} />
      </div>
    </>
  )
}
