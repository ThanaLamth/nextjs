import type { Article } from '@/types/article'
import { ArticleCard } from './ArticleCard'
import type { ComponentProps } from 'react'

type CardVariant = ComponentProps<typeof ArticleCard>['variant']

interface ArticleGridProps {
  articles: Article[]
  variant?: CardVariant
  className?: string
}

export function ArticleGrid({ articles, variant = 'default', className = '' }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-teal-500 text-sm">
        No articles found.
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div className={`space-y-4 ${className}`}>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} variant="horizontal" />
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} variant={variant} />
      ))}
    </div>
  )
}
