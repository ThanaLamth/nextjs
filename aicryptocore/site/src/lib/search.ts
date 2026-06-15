import Fuse from 'fuse.js'
import type { Article } from '@/types/article'

const fuseOptions = {
  keys: ['title', 'description', 'tags', 'author.name', 'category'],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
}

export function searchArticles(query: string, articles: Article[]) {
  if (!query.trim()) return []
  const fuse = new Fuse(articles, fuseOptions)
  return fuse.search(query).slice(0, 10)
}
