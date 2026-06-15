import type { Article } from '@/types/article'

interface ArticleBodyProps {
  article: Article
}

export function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <div
      className="prose-aicrypto"
      dangerouslySetInnerHTML={{ __html: article.content }}
    />
  )
}
