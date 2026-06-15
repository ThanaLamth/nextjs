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
    <footer className="mt-10 pt-8 border-t border-teal-800/40 space-y-8">
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
        <span className="text-sm text-teal-400 font-medium flex items-center gap-1.5">
          <Share2 size={14} /> Share
        </span>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent('https://aicryptocore.com' + article.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-800 border border-teal-700/30 text-sm text-teal-300 hover:text-teal-100 hover:bg-teal-700 transition-colors"
        >
          <ExternalLink size={14} /> Twitter/X
        </a>
        <button
          onClick={copyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-800 border border-teal-700/30 text-sm text-teal-300 hover:text-teal-100 hover:bg-teal-700 transition-colors"
        >
          <Link2 size={14} /> Copy Link
        </button>
      </div>

      {/* Author bio */}
      <div className="bg-teal-800/60 border border-teal-700/30 rounded-xl p-5 flex gap-4">
        <div className="w-12 h-12 rounded-full bg-teal-700 flex items-center justify-center text-teal-200 font-bold text-lg shrink-0">
          {article.author.name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-teal-100 mb-1">{article.author.name}</div>
          <div className="text-sm text-teal-400 leading-relaxed">{article.author.bio}</div>
          {article.author.twitter && (
            <a
              href={`https://twitter.com/${article.author.twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs text-teal-500 hover:text-teal-300 transition-colors"
            >
              <ExternalLink size={12} /> {article.author.twitter}
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
