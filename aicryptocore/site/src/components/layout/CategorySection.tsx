import Link from 'next/link'
import { ArrowRight, Bot, Server, TrendingUp, Database, Network, Newspaper, BarChart2, CalendarDays, Cpu, Zap, Star, Link2, BarChart3, DollarSign, Shield } from 'lucide-react'
import type { Article } from '@/types/article'
import type { Category } from '@/types/category'
import { ArticleCard } from '@/components/article/ArticleCard'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bot, Server, TrendingUp, Database, Network,
  Newspaper, BarChart2, CalendarDays, Cpu, Zap, Star, Link2, BarChart3, DollarSign, Shield,
}

interface CategorySectionProps {
  category: Category
  articles: Article[]
  layout?: 'grid' | 'horizontal'
}

export function CategorySection({ category, articles, layout = 'grid' }: CategorySectionProps) {
  const Icon = ICON_MAP[category.icon] ?? Bot

  if (articles.length === 0) return null

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-white/[0.05] border border-[var(--color-border-teal)]">
            <Icon size={14} className="text-[var(--color-text-teal)]" />
          </div>
          <h2
            className="text-base font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {category.label}
          </h2>
        </div>
        <Link
          href={`/${category.slug}`}
          className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-teal)] transition-colors group"
        >
          View all
          <ArrowRight size={12} className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {layout === 'horizontal' ? (
        /* Horizontal layout: 2-col grid, card = thumbnail left + text right */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="horizontal" />
          ))}
        </div>
      ) : (
        /* Default grid layout: 2-col → 4-col */
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="default" />
          ))}
        </div>
      )}
    </section>
  )
}
