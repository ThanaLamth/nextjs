'use client'

import { useState, useEffect, startTransition, useDeferredValue } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { ArticleGrid } from '@/components/article/ArticleGrid'
import type { Article } from '@/types/article'

interface SearchCategory {
  slug: string
  label: string
}

export function SearchPageClient({ categories }: { categories: SearchCategory[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') ?? ''
  const initialCategory = searchParams.get('category') ?? 'all'

  const [query, setQuery] = useState(initialQuery)
  const [articles, setArticles] = useState<Article[]>([])
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory)
  const [isLoading, setIsLoading] = useState(true)
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    const controller = new AbortController()

    async function loadArticles() {
      setIsLoading(true)

      const params = new URLSearchParams()
      if (deferredQuery.trim()) {
        params.set('q', deferredQuery.trim())
      }
      if (activeCategory !== 'all') {
        params.set('category', activeCategory)
      }
      params.set('limit', deferredQuery.trim() ? '24' : '12')

      try {
        const response = await fetch(`/api/search?${params.toString()}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Search request failed with ${response.status}`)
        }

        const nextArticles = (await response.json()) as Article[]
        setArticles(nextArticles)
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setArticles([])
        }
      } finally {
        setIsLoading(false)
      }
    }

    void loadArticles()

    return () => controller.abort()
  }, [deferredQuery, activeCategory])

  function syncUrl(nextQuery: string, nextCategory: string) {
    startTransition(() => {
      const params = new URLSearchParams()

      if (nextQuery.trim()) {
        params.set('q', nextQuery.trim())
      }

      if (nextCategory !== 'all') {
        params.set('category', nextCategory)
      }

      const href = params.size > 0 ? `/search?${params.toString()}` : '/search'
      router.replace(href, { scroll: false })
    })
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.target.value
    setQuery(nextQuery)
    syncUrl(nextQuery, activeCategory)
  }

  function handleCategoryChange(category: string) {
    setActiveCategory(category)
    syncUrl(query, category)
  }

  const activeCategoryLabel = categories.find((category) => category.slug === activeCategory)?.label ?? activeCategory

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-teal-50 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
        Search
      </h1>

      <div className="relative mb-6">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400" />
        <input
          type="text"
          placeholder="Search articles, topics, authors..."
          value={query}
          onChange={handleInput}
          autoFocus
          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-teal-800 border border-teal-700/40 text-teal-100 placeholder-teal-500 text-base outline-none focus:border-teal-500 transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border ${
            activeCategory === 'all'
              ? 'bg-teal-500 text-teal-900 border-teal-500'
              : 'bg-teal-800/50 text-teal-400 border-teal-700/30 hover:text-teal-200'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryChange(category.slug)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border ${
              activeCategory === category.slug
                ? 'bg-teal-500 text-teal-900 border-teal-500'
                : 'bg-teal-800/50 text-teal-400 border-teal-700/30 hover:text-teal-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {query && !isLoading && articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-teal-500 text-lg mb-2">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-teal-600 text-sm">Try different keywords or browse a category.</p>
        </div>
      )}

      {!query && (
        <div className="mb-4">
          <p className="text-teal-500 text-sm">
            {activeCategory === 'all' ? 'Showing latest articles' : `Showing latest in ${activeCategoryLabel}`}
          </p>
        </div>
      )}

      {query && articles.length > 0 && (
        <div className="mb-4">
          <p className="text-teal-500 text-sm">
            {articles.length} result{articles.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="text-teal-500 py-8">Loading articles...</div>
      ) : (
        <ArticleGrid articles={articles} variant="horizontal" />
      )}
    </div>
  )
}
