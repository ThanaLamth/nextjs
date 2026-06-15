'use client'

import { useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { useSearch } from '@/hooks/useSearch'
import { getCategoryLabel } from '@/lib/categories'

export function SearchBar() {
  const { query, results, isOpen, search, open, close } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        open()
      }
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, close])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  return (
    <>
      <button
        onClick={open}
        aria-label="Open search"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-teal-400 hover:text-teal-200 hover:bg-teal-800/50 text-sm border border-teal-700/30 transition-all duration-150"
      >
        <Search size={15} />
        <span className="hidden sm:inline text-teal-500">Search</span>
        <kbd className="hidden sm:inline text-xs bg-teal-800 text-teal-500 px-1.5 py-0.5 rounded border border-teal-700/40">⌘K</kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" onClick={close}>
          <div
            className="w-full max-w-lg bg-teal-800 border border-teal-600/40 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-teal-700/40">
              <Search size={18} className="text-teal-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => search(e.target.value)}
                className="flex-1 bg-transparent text-teal-100 placeholder-teal-500 outline-none text-sm"
              />
              <button onClick={close} className="text-teal-500 hover:text-teal-300 transition-colors">
                <X size={18} />
              </button>
            </div>

            {results.length > 0 && (
              <ul className="max-h-72 overflow-y-auto divide-y divide-teal-700/30">
                {results.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={article.href}
                      onClick={close}
                      className="flex flex-col px-4 py-3 hover:bg-teal-700/40 transition-colors"
                    >
                      <span className="text-xs text-teal-400 uppercase tracking-wide mb-0.5">
                        {getCategoryLabel(article.category)}
                      </span>
                      <span className="text-sm text-teal-100 font-medium line-clamp-1">{article.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {query && results.length === 0 && (
              <div className="px-4 py-6 text-center text-teal-500 text-sm">
                No results for &ldquo;{query}&rdquo;
              </div>
            )}

            {!query && (
              <div className="px-4 py-4 text-teal-500 text-xs text-center">
                Type to search articles · Press <kbd className="bg-teal-700 px-1 rounded">Esc</kbd> to close
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
