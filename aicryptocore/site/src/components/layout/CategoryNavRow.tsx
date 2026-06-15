import Link from 'next/link'
import { Newspaper, BarChart2, Cpu, Zap, Star, Globe, Link2, BarChart3, DollarSign, Shield } from 'lucide-react'
import type { Category } from '@/types/category'

const ICON_MAP = {
  Newspaper,
  BarChart2,
  Cpu,
  Zap,
  Star,
  Globe,
  Link2,
  BarChart3,
  DollarSign,
  Shield,
}

export function CategoryNavRow({ categories }: { categories: Category[] }) {
  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
      {categories.map((category) => {
        const Icon = ICON_MAP[category.icon as keyof typeof ICON_MAP] ?? Newspaper
        return (
        <Link
          key={category.slug}
          href={`/${category.slug}`}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] hover:border-[var(--color-border-teal)] hover:bg-[var(--color-border-teal)] transition-all duration-200 whitespace-nowrap shrink-0"
        >
          <Icon size={13} className="text-[var(--color-text-teal)] group-hover:text-[var(--color-text-primary)] transition-colors" />
          <span className="text-xs font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
            {category.label}
          </span>
        </Link>
        )
      })}
    </div>
  )
}
