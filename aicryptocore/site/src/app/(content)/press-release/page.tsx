import type { Metadata } from 'next'
import { ArticleGrid } from '@/components/article/ArticleGrid'
import { getPressReleaseArticles, getTrendingArticles } from '@/lib/content'
import { Sidebar } from '@/components/layout/Sidebar'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Press Releases',
  description: 'Official press releases and announcements from the AI and crypto industry.',
}

export default async function PressReleasePage() {
  const [pressReleases, trendingArticles] = await Promise.all([
    getPressReleaseArticles(),
    getTrendingArticles(5),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8 pb-6 border-b border-teal-800/40">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="new">Official</Badge>
        </div>
        <h1
          className="text-3xl font-bold text-teal-50 mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Press Releases
        </h1>
        <p className="text-teal-400 max-w-2xl leading-relaxed">
          Official announcements, product launches, and industry news from leading AI and crypto
          companies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          {pressReleases.length > 0 ? (
            <ArticleGrid articles={pressReleases} variant="default" />
          ) : (
            <div className="text-center py-16 text-teal-500">
              No press releases available at this time.
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
