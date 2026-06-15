import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  CalendarDays,
  ChartColumnIncreasing,
  FileText,
  Megaphone,
  Network,
  Newspaper,
  Pickaxe,
  Shield,
  Star,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import type { Article } from '@/types/article'
import type { Category } from '@/types/category'
import { ArticleGrid } from '@/components/article/ArticleGrid'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bot,
  CalendarDays,
  ChartColumnIncreasing,
  FileText,
  Megaphone,
  TrendingUp,
  Network,
  Newspaper,
  Pickaxe,
  Shield,
  Star,
  Wallet,
}

interface CategorySectionProps {
  category: Category
  articles: Article[]
}

export function CategorySection({ category, articles }: CategorySectionProps) {
  const Icon = ICON_MAP[category.icon] ?? Bot

  if (articles.length === 0) return null

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-teal-800 border border-teal-700/30">
            <Icon size={16} className="text-teal-400" />
          </div>
          <h2 className="text-lg font-bold text-teal-100" style={{ fontFamily: 'var(--font-display)' }}>
            {category.label}
          </h2>
        </div>
        <Link
          href={`/${category.slug}`}
          className="flex items-center gap-1 text-sm text-teal-400 hover:text-teal-200 transition-colors group"
        >
          View all
          <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </div>
      <ArticleGrid articles={articles} variant="default" />
    </section>
  )
}
