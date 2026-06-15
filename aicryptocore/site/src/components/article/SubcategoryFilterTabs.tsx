'use client'

import Link from 'next/link'
import type { Subcategory } from '@/types/category'

interface SubcategoryFilterTabsProps {
  subcategories: Subcategory[]
  categorySlug: string
  activeSubcategory?: string
}

export function SubcategoryFilterTabs({
  subcategories,
  categorySlug,
  activeSubcategory,
}: SubcategoryFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href={`/${categorySlug}`}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border ${
          !activeSubcategory
            ? 'bg-teal-500 text-teal-900 border-teal-500'
            : 'bg-teal-800/50 text-teal-400 border-teal-700/30 hover:text-teal-200 hover:border-teal-600/50'
        }`}
      >
        All
      </Link>
      {subcategories.map((sub) => (
        <Link
          key={sub.slug}
          href={`/${categorySlug}/${sub.slug}`}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border ${
            activeSubcategory === sub.slug
              ? 'bg-teal-500 text-teal-900 border-teal-500'
              : 'bg-teal-800/50 text-teal-400 border-teal-700/30 hover:text-teal-200 hover:border-teal-600/50'
          }`}
        >
          {sub.label}
        </Link>
      ))}
    </div>
  )
}
