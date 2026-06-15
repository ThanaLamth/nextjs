import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/types/article'
import { Badge } from '@/components/ui/Badge'
import { formatDate, formatReadingTime } from '@/lib/dates'
import { getCategoryLabel, getSubcategoryLabel } from '@/lib/categories'
import { Clock, User } from 'lucide-react'

type CardVariant = 'featured' | 'default' | 'compact' | 'horizontal'

interface ArticleCardProps {
  article: Article
  variant?: CardVariant
  className?: string
  priority?: boolean
}

export function ArticleCard({ article, variant = 'default', className = '', priority = false }: ArticleCardProps) {
  const categoryLabel = getCategoryLabel(article.category)
  const subcategoryLabel = article.subcategory ? getSubcategoryLabel(article.subcategory) : undefined
  const sectionLabel = subcategoryLabel ? `${categoryLabel} | ${subcategoryLabel}` : categoryLabel

  if (variant === 'compact') {
    return (
      <article className={`flex gap-3 py-3 border-b border-teal-800/40 last:border-0 group ${className}`}>
        <Link href={article.href} className="flex gap-3 w-full">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-teal-800">
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt}
              fill
              sizes="64px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-teal-500 mb-1">
              {article.sponsored ? 'Sponsored' : sectionLabel}
            </p>
            <h3 className="text-sm font-medium text-teal-200 group-hover:text-teal-100 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
            <p className="mt-1 text-xs text-teal-500">{formatDate(article.publishedAt)}</p>
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'horizontal') {
    return (
      <article className={`flex gap-4 group rounded-xl bg-teal-800 border border-teal-700/30 overflow-hidden transition-all duration-200 hover:border-teal-500/60 hover:shadow-[0_4px_16px_rgba(20,184,166,0.25)] ${className}`}>
        <Link href={article.href} className="flex w-full">
          <div className="relative w-2/5 min-h-[140px] bg-teal-900 shrink-0">
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt}
              fill
              sizes="(max-width: 768px) 40vw, 200px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 p-4">
            <Badge variant={article.sponsored ? 'sponsored' : 'category'} className="mb-2">
              {article.sponsored ? 'Sponsored' : sectionLabel}
            </Badge>
            <h3 className="text-sm font-semibold text-teal-100 group-hover:text-teal-300 transition-colors line-clamp-2 mb-2 leading-snug">
              {article.title}
            </h3>
            <p className="text-xs text-teal-400 line-clamp-2 leading-relaxed mb-3">{article.description}</p>
            <div className="flex items-center gap-3 text-xs text-teal-500">
              <span className="flex items-center gap-1">
                <User size={11} /> {article.author.name}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} /> {formatReadingTime(article.readingTime)}
              </span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'featured') {
    return (
      <article className={`group relative rounded-2xl overflow-hidden bg-teal-900 border border-teal-700/30 ${className}`}>
        <Link href={article.href}>
          <div className="relative w-full aspect-[16/7] bg-teal-800">
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt}
              fill
              sizes="100vw"
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/30 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="new">Featured</Badge>
              <Badge variant="category">
                {sectionLabel}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 group-hover:text-teal-200 transition-colors max-w-3xl"
              style={{ fontFamily: 'var(--font-display)' }}>
              {article.title}
            </h1>
            <p className="text-teal-300 text-sm md:text-base line-clamp-2 max-w-2xl mb-4 leading-relaxed">
              {article.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-teal-400">
              <span className="flex items-center gap-1.5">
                <User size={14} /> {article.author.name}
              </span>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="flex items-center gap-1">
                <Clock size={13} /> {formatReadingTime(article.readingTime)}
              </span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  // Default card
  return (
    <article className={`group rounded-xl bg-teal-800 border border-teal-700/30 overflow-hidden transition-all duration-200 hover:border-teal-500/60 hover:shadow-[0_4px_16px_rgba(20,184,166,0.25)] hover:-translate-y-0.5 ${className}`}>
      <Link href={article.href}>
        <div className="relative aspect-video bg-teal-900 overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.coverImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <Badge
            variant={article.sponsored ? 'sponsored' : article.featured ? 'new' : 'category'}
            className="mb-2"
          >
            {article.sponsored
              ? 'Sponsored'
              : sectionLabel}
          </Badge>
          <h3 className="text-base font-semibold text-teal-100 group-hover:text-teal-300 transition-colors line-clamp-2 mb-2 leading-snug">
            {article.title}
          </h3>
          <p className="text-sm text-teal-400 line-clamp-2 leading-relaxed mb-3">{article.description}</p>
          <div className="flex items-center gap-3 text-xs text-teal-500">
            <span className="flex items-center gap-1">
              <User size={11} /> {article.author.name}
            </span>
            <span>{formatDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Clock size={11} /> {formatReadingTime(article.readingTime)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
