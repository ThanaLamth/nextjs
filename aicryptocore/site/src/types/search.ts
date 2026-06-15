import type { Article } from './article'

export interface SearchResult {
  item: Article
  score?: number
  refIndex: number
}

export interface SearchIndex {
  articles: Article[]
}
