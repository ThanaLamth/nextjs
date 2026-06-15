import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleBody } from '@/components/article/ArticleBody'
import { ArticleFooter } from '@/components/article/ArticleFooter'
import { ArticleHeader } from '@/components/article/ArticleHeader'
import { ReadingProgress } from '@/components/article/ReadingProgress'
import { RelatedArticles } from '@/components/article/RelatedArticles'
import { Sidebar } from '@/components/layout/Sidebar'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getArticleBySlug, getAllArticles, getRelatedArticles, getTrendingArticles } from '@/lib/content'
import { getCategoryLabel } from '@/lib/categories'
import { SITE_URL } from '@/lib/constants'
import { generateArticleMetadata } from '@/lib/seo'

export const revalidate = 300
export const dynamicParams = false

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()

  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params
  const article = await getArticleBySlug(category, slug)

  return article ? generateArticleMetadata(article) : {}
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params
  const article = await getArticleBySlug(category, slug)

  if (!article) {
    notFound()
  }

  const [relatedArticles, trendingArticles] = await Promise.all([
    getRelatedArticles(article, 3),
    getTrendingArticles(5),
  ])

  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    {
      name: getCategoryLabel(article.category),
      url: `${SITE_URL}/${article.category}`,
    },
    {
      name: article.title,
      url: `${SITE_URL}${article.href}`,
    },
  ]

  return (
    <>
      <ReadingProgress />
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
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
