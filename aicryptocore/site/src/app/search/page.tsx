import { Suspense } from 'react'
import { SearchPageClient } from '@/components/search/SearchPageClient'
import { getNavigationCategories } from '@/lib/categories.server'

export default async function SearchPage() {
  const categories = await getNavigationCategories()

  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-teal-500">Loading search...</div>}>
      <SearchPageClient categories={categories.map((category) => ({ slug: category.slug, label: category.label }))} />
    </Suspense>
  )
}
