import Link from 'next/link'
import type { Article } from '@/types/article'
import { ArrowRight, TrendingUp } from 'lucide-react'
import {
  HOME_AGENT_WATCHLIST,
  HOME_NARRATIVE_LIFECYCLE,
  HOME_OPERATOR_INSIGHTS,
  HOME_SIGNAL_CARDS,
} from '@/lib/demo-homepage'

interface SidebarProps {
  trendingArticles: Article[]
}

export function Sidebar({ trendingArticles }: SidebarProps) {
  return (
    <aside className="space-y-6">
      <div className="rounded-2xl border border-teal-700/30 bg-teal-900/55 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-200">
            Signal Layer
          </h3>
          <span className="text-xs text-teal-500">Updated now</span>
        </div>
        <div className="space-y-3">
          {HOME_SIGNAL_CARDS.slice(0, 3).map((signal) => (
            <div key={signal.label} className="rounded-xl border border-teal-700/25 bg-teal-950/70 p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-teal-100">{signal.label}</span>
                <span className="text-sm font-semibold text-teal-50">{signal.score}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 text-xs">
                <span className="text-teal-500">{signal.status}</span>
                <span className="inline-flex items-center gap-1 text-emerald-300">
                  <TrendingUp size={11} />
                  +{signal.delta.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-teal-700/30 bg-teal-900/55 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-200">
          Narrative Tracker
        </h3>
        <div className="mt-4 space-y-3">
          {HOME_NARRATIVE_LIFECYCLE.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3">
              <span className="text-sm text-teal-300">{item.label}</span>
              <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-[11px] font-medium text-amber-200">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-teal-700/30 bg-teal-900/55 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-200">
          Why It Matters
        </h3>
        <div className="mt-4 space-y-3">
          {HOME_OPERATOR_INSIGHTS.slice(0, 3).map((insight) => (
            <div key={insight.audience} className="rounded-xl border border-teal-700/20 bg-teal-950/60 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">
                {insight.audience}
              </p>
              <p className="mt-2 text-sm leading-6 text-teal-400">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-teal-700/30 bg-teal-900/55 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-200">
            Agent Watchlist
          </h3>
          <Link href="/ai-agents" className="text-xs text-teal-400 hover:text-teal-200">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {HOME_AGENT_WATCHLIST.slice(0, 4).map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-3 rounded-xl border border-teal-700/20 bg-teal-950/60 px-3 py-3">
              <div>
                <p className="text-sm font-medium text-teal-100">{item.name}</p>
                <p className="mt-1 text-xs text-teal-500">{item.context}</p>
              </div>
              <span className="text-xs text-teal-500">{item.updated}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-teal-700/30 bg-teal-900/55 p-5">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-amber-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-200">
            Trending Now
          </h3>
        </div>
        <ol className="space-y-3">
          {trendingArticles.map((article, index) => (
            <li key={article.slug}>
              <Link href={article.href} className="group flex gap-3">
                <span className="shrink-0 text-xl font-bold leading-tight text-teal-700 transition-colors group-hover:text-teal-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <span className="text-sm text-teal-300 transition-colors group-hover:text-teal-100 line-clamp-2">
                    {article.title}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-teal-500">
                    Open story
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}
