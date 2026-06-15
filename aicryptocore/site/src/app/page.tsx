import React from 'react'
import { LayoutGrid, Cpu, Database, Coins } from 'lucide-react'
import { HeroSection } from '@/components/layout/HeroSection'
import { CategoryNavRow } from '@/components/layout/CategoryNavRow'
import { CategorySection } from '@/components/layout/CategorySection'
import { AgentEconomicsSection } from '@/components/layout/AgentEconomicsSection'
import { Sidebar } from '@/components/layout/Sidebar'
import { ArticleCard } from '@/components/article/ArticleCard'
import {
  getAllArticles,
  getFeaturedArticles,
  getArticlesByCategory,
  getTrendingArticles,
} from '@/lib/content'
import { getNavigationCategories } from '@/lib/categories.server'

export const revalidate = 300
export const metadata = {
  title: 'AI × Crypto Intersection Analyst',
  description:
    'Premium news and analysis at the intersection of Artificial Intelligence and Web3/Crypto.',
}

export default async function HomePage() {
  const [allArticles, featuredArticles, trendingArticles, categories] = await Promise.all([
    getAllArticles(),
    getFeaturedArticles(1),
    getTrendingArticles(5),
    getNavigationCategories(),
  ])
  const featuredArticle = featuredArticles[0]
  const categoryCounts = new Map(categories.map((category) => [category.slug, category.count ?? 0]))

  const mainCategories = categories.filter((category) => category.slug !== 'press-release')

  const recentArticles = allArticles
    .filter((a) => a.slug !== featuredArticle?.slug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  const statBoxes = [
    { label: 'News', count: categoryCounts.get('news') ?? 0, color: '#5EEAD4', bg: 'rgba(20,184,166,0.12)' },
    { label: 'Altcoins', count: categoryCounts.get('altcoin-insights') ?? 0, color: '#93C5FD', bg: 'rgba(147,197,253,0.10)' },
    { label: 'AI Tools', count: categoryCounts.get('crypto-ai-tools') ?? 0, color: '#FCD34D', bg: 'rgba(252,211,77,0.10)' },
    { label: 'Mining', count: categoryCounts.get('mining') ?? 0, color: '#C4B5FD', bg: 'rgba(196,181,253,0.10)' },
  ]

  const platformStats = [
    { value: '1,847', label: 'Platforms', icon: LayoutGrid },
    { value: '1,248', label: 'AI Models', icon: Cpu },
    { value: '40,204', label: 'Data Points', icon: Database },
    { value: '14T', label: 'Market Cap', icon: Coins },
  ]

  const gridArticles = recentArticles.slice(0, 4)
  const [altcoinInsights, topProjects] = await Promise.all([
    getArticlesByCategory('altcoin-insights', 4),
    getArticlesByCategory('top-projects', 4),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* ── HERO: 2-col ── */}
      {featuredArticle && (
        <HeroSection
          featured={featuredArticle}
          recentArticles={recentArticles}
          statBoxes={statBoxes}
        />
      )}

      {/* ── PLATFORM STATS ── */}
      <div className="relative mb-6 z-0 shadow-[0_4px_20px_rgba(20,184,166,0.08)] bg-surface">
        {/* Top & Bottom Gradient Borders */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-teal opacity-30 pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-teal opacity-30 pointer-events-none -z-10"></div>
        
        {/* Inner Container */}
        <div className="flex items-center gap-0">
          {platformStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <React.Fragment key={stat.label}>
                <div className="flex-1 px-4 py-3 flex items-center justify-center gap-3.5 hover:bg-surface-elevated transition-colors">
                  <Icon size={22} className="text-[var(--color-text-teal)] shrink-0 opacity-80" strokeWidth={1.5} />
                  <div className="text-left">
                    <div className="text-xl font-bold leading-none text-[var(--color-text-primary)] mb-1"
                      style={{ fontFamily: 'var(--font-mono)' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)]">
                      {stat.label}
                    </div>
                  </div>
                </div>
                {idx < platformStats.length - 1 && (
                  <div className="w-[1px] self-stretch bg-gradient-teal opacity-25"></div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* ── CATEGORY NAV PILLS ── */}
      <CategoryNavRow categories={categories} />

      {/* ── MAIN 2-COL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_268px] gap-7">
        <div className="min-w-0">

          {/* 4-col article grid */}
          {gridArticles.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-base font-bold text-[var(--color-text-primary)] mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Featured Stories
              </h2>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                {gridArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="default" />
                ))}
              </div>
            </section>
          )}

          {/* Agent Economics ngay sau Featured Stories */}
          <AgentEconomicsSection />

          {/* Altcoin Insights */}
          {mainCategories
            .filter((c) => c.slug === 'altcoin-insights')
            .map((category) => (
              <CategorySection
                key={category.slug}
                category={category}
                articles={altcoinInsights}
                layout="grid"
              />
            ))}

          {/* Top Projects section */}
          {mainCategories
            .filter((c) => c.slug === 'top-projects')
            .map((category) => (
              <CategorySection
                key={category.slug}
                category={category}
                articles={topProjects}
                layout="horizontal"
              />
            ))}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-20">
            <Sidebar trendingArticles={trendingArticles} />
          </div>
        </div>
      </div>
    </div>
  )
}
