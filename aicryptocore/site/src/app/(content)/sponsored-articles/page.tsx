import type { Metadata } from 'next'
import { ArticleGrid } from '@/components/article/ArticleGrid'
import { getSponsoredArticles, getTrendingArticles } from '@/lib/content'
import { Sidebar } from '@/components/layout/Sidebar'
import { Badge } from '@/components/ui/Badge'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sponsored Articles',
  description: 'Clearly labeled sponsored content on AiCryptoCore.',
  robots: { index: false, follow: true },
}

export default async function SponsoredArticlesPage() {
  const [sponsored, trendingArticles] = await Promise.all([
    getSponsoredArticles(),
    getTrendingArticles(5),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8 pb-6 border-b border-teal-800/40">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="sponsored">Sponsored Content</Badge>
        </div>
        <h1
          className="text-3xl font-bold text-teal-50 mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Sponsored Articles
        </h1>
        <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 max-w-2xl">
          <p className="text-amber-300 text-sm leading-relaxed">
            <strong>Disclosure:</strong> The following articles are sponsored content. They are
            clearly labeled and represent the views of the sponsoring companies, not the editorial
            team of {SITE_NAME}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          {sponsored.length > 0 ? (
            <ArticleGrid articles={sponsored} variant="default" />
          ) : (
            <div className="text-center py-16 text-teal-500">
              No sponsored articles available at this time.
            </div>
          )}
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
