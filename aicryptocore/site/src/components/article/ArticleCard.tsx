import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/types/article'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/dates'
import { getCategoryDisplayLabel } from '@/lib/categories'
import { User } from 'lucide-react'

type CardVariant = 'featured' | 'default' | 'compact' | 'horizontal'

interface ArticleCardProps {
  article: Article
  variant?: CardVariant
  className?: string
  priority?: boolean
}

export function ArticleCard({ article, variant = 'default', className = '', priority = false }: ArticleCardProps) {
  if (variant === 'compact') {
    return (
      <article className={`flex gap-3 py-3 border-b border-glass last:border-0 group ${className}`}>
        <Link href={article.href} className="flex gap-3 w-full">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-surface-elevated">
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt}
              fill
              sizes="64px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[var(--color-text-muted)] mb-1">{formatDate(article.publishedAt)}</p>
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'horizontal') {
    return (
      <article className={`card-cosmic flex gap-4 group overflow-hidden ${className}`}>
        <Link href={article.href} className="flex w-full">
          <div className="relative w-2/5 min-h-[140px] bg-surface-elevated shrink-0">
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
              {article.sponsored ? 'Sponsored' : getCategoryDisplayLabel(article.category)}
            </Badge>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-teal)] transition-colors line-clamp-2 mb-2 leading-snug">
              {article.title}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-3">{article.description}</p>
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-1.5"><User size={12} /> {article.author.name}</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'featured') {
    return (
      <article className={`group relative rounded-2xl overflow-hidden bg-surface border border-glass ${className}`}>
        <Link href={article.href}>
          <div className="relative w-full aspect-[16/7] bg-surface-elevated">
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt}
              fill
              sizes="100vw"
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="new">Featured</Badge>
              <Badge variant="category">
                {getCategoryDisplayLabel(article.category)}
              </Badge>
            </div>
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 group-hover:text-[var(--color-text-teal)] transition-colors max-w-3xl drop-shadow-lg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {article.title}
            </h1>
            <p className="text-white/80 text-sm md:text-base line-clamp-2 max-w-2xl mb-4 leading-relaxed drop-shadow">
              {article.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5"><User size={14} /> {article.author.name}</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  // Default card
  return (
    <article className={`card-cosmic group overflow-hidden ${className}`}>
      <Link href={article.href}>
        <div className="relative aspect-[16/9] bg-surface-elevated overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.coverImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-3">
          <Badge
            variant={article.sponsored ? 'sponsored' : article.featured ? 'new' : 'category'}
            className="mb-1.5"
          >
            {article.sponsored
              ? 'Sponsored'
              : getCategoryDisplayLabel(article.category)}
          </Badge>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-teal)] transition-colors line-clamp-2 mb-1.5 leading-snug">
            {article.title}
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-2">{article.description}</p>
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1"><User size={10} /> {article.author.name}</span>
            <span className="text-[var(--color-text-muted)] ml-auto">{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
