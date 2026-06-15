import Image from 'next/image'
import type { Article } from '@/types/article'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { Badge } from '@/components/ui/Badge'
import { getCategoryBySlug, getSubcategoryLabel } from '@/lib/categories'
import { formatDate, formatReadingTime } from '@/lib/dates'
import { Clock, Calendar } from 'lucide-react'

interface ArticleHeaderProps {
  article: Article
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const category = getCategoryBySlug(article.category)
  const subcategoryLabel = article.subcategory ? getSubcategoryLabel(article.subcategory) : undefined

  const breadcrumbs = [
    { label: category?.label ?? article.category, href: `/${article.category}` },
    ...(subcategoryLabel ? [{ label: subcategoryLabel }] : []),
    { label: article.title },
  ]

  return (
    <header className="mb-8">
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge variant="category">
          {category?.label ?? article.category.replace(/-/g, ' ')}
        </Badge>
        {subcategoryLabel && <Badge variant="new">{subcategoryLabel}</Badge>}
        {article.sponsored && <Badge variant="sponsored">Sponsored</Badge>}
        {article.pressRelease && <Badge variant="new">Press Release</Badge>}
      </div>

      <h1
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-50 leading-tight mb-4"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {article.title}
      </h1>

      <p className="text-lg text-teal-300 leading-relaxed mb-6">{article.description}</p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-teal-400 pb-6 border-b border-teal-800/40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-700 flex items-center justify-center text-teal-200 text-xs font-bold">
            {article.author.name.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-teal-200 text-xs">{article.author.name}</div>
            <div className="text-teal-500 text-xs">{article.author.bio}</div>
          </div>
        </div>
        <span className="flex items-center gap-1">
          <Calendar size={13} />
          {formatDate(article.publishedAt)}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={13} />
          {formatReadingTime(article.readingTime)}
        </span>
      </div>

      {/* Cover image */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden mt-6 bg-teal-800">
        <Image
          src={article.coverImage}
          alt={article.coverImageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          priority
          className="object-cover"
        />
      </div>
    </header>
  )
}
