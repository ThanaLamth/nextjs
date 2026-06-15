import type { Article } from '@/types/article'
import { ArticleGrid } from './ArticleGrid'

interface RelatedArticlesProps {
  articles: Article[]
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null

  return (
    <section className="mt-12 pt-10 border-t border-teal-800/40">
      <h2 className="text-xl font-bold text-teal-100 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
        Related Articles
      </h2>
      <ArticleGrid articles={articles} variant="default" />
    </section>
  )
}
