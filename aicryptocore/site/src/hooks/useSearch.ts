'use client'

import { useEffect, useState, useCallback } from 'react'
import type { Article } from '@/types/article'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Article[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Search request failed with ${response.status}`)
        }

        const articles = (await response.json()) as Article[]
        setResults(articles)
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setResults([])
        }
      }
    }, 150)

    return () => {
      controller.abort()
      window.clearTimeout(timeoutId)
    }
  }, [query])

  const search = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([])
    }
    setQuery(q)
  }, [])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setResults([])
  }, [])

  return { query, results, isOpen, search, open, close }
}
