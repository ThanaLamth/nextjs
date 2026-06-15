import Link from 'next/link'
import type { Article } from '@/types/article'
import { TrendingUp } from 'lucide-react'
import { getCategoryDisplayLabel } from '@/lib/categories'
import { MarketPricesWidget } from '@/components/data/MarketPricesWidget'

interface SidebarProps {
  trendingArticles: Article[]
}

/* ── All categories (matches Footer Explore) ── */
const ALL_CATEGORIES = [
  { label: 'Altcoin Insights',  href: '/altcoin-insights'  },
  { label: 'Blockchain',        href: '/blockchain'        },

  { label: 'CMC',               href: '/cmc'               },
  { label: 'Crypto AI Tools',   href: '/crypto-ai-tools'   },
  { label: 'Crypto Investment', href: '/crypto-investment'  },
  { label: 'Mining',            href: '/mining'            },
  { label: 'News',              href: '/news'              },
  { label: 'Press Release',     href: '/press-release'     },
  { label: 'Scams & Security',  href: '/scams-security'    },
  { label: 'Top Projects',      href: '/top-projects'      },
]

export function Sidebar({ trendingArticles }: SidebarProps) {
  return (
    <aside className="space-y-4">

      {/* ── Market & Trending ── */}
      <div className="card-cosmic p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">
          Market &amp; Trending
        </p>
        <MarketPricesWidget />
      </div>

      {/* ── Trending Topics ── */}
      <div className="card-cosmic p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={13} className="text-[var(--color-accent)]" />
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">Trending Topics</p>
        </div>
        <ol className="space-y-3">
          {trendingArticles.map((article, i) => (
            <li key={article.slug}>
              <Link href={article.href} className="flex gap-2.5 group">
                <span
                  className="text-base font-bold tabular-nums shrink-0 leading-tight w-6"
                  style={{ color: i < 3 ? 'var(--color-text-teal)' : 'var(--color-text-muted)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    {getCategoryDisplayLabel(article.category)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Categories ── */}
      <div className="card-cosmic p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">Categories</p>
        <ul className="divide-y divide-white/[0.04]">
          {ALL_CATEGORIES.map((cat) => (
            <li key={cat.href}>
              <Link
                href={cat.href}
                className="flex items-center justify-between py-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-teal)] transition-colors"
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>



    </aside>
  )
}
