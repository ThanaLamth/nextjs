'use client'

import type { Article } from '@/types/article'
import { Tag } from '@/components/ui/Tag'
import { ExternalLink, Link2, Share2 } from 'lucide-react'

interface ArticleFooterProps {
  article: Article
}

export function ArticleFooter({ article }: ArticleFooterProps) {
  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <footer className="mt-10 pt-8 border-t border-[var(--color-border-default)] space-y-8">
      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Tag key={tag} label={tag} href={`/search?q=${tag}`} />
          ))}
        </div>
      )}

      {/* Share */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-[var(--color-text-secondary)] font-medium flex items-center gap-1.5">
          <Share2 size={14} /> Share
        </span>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent('https://aicryptocore.com' + article.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.05] transition-colors"
        >
          <ExternalLink size={14} /> Twitter/X
        </a>
        <button
          onClick={copyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.05] transition-colors"
        >
          <Link2 size={14} /> Copy Link
        </button>
      </div>

    </footer>
  )
}
