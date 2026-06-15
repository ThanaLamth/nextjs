import Link from 'next/link'
import { ArrowRight, ArrowUpRight, TrendingUp } from 'lucide-react'
import { ArticleCard } from '@/components/article/ArticleCard'
import type { Article } from '@/types/article'
import type { Category } from '@/types/category'
import {
  HOME_AGENT_WATCHLIST,
  HOME_BRIEFS,
  HOME_EVIDENCE_DENSITY,
  HOME_NARRATIVE_LIFECYCLE,
  HOME_OPERATOR_INSIGHTS,
  HOME_PROJECT_MATURITY,
  HOME_SIGNAL_CARDS,
  HOME_SIGNAL_METRICS,
  HOME_STACK_LAYERS,
  HOME_TOOLS_SPOTLIGHT,
  HOME_TRUST_TYPES,
  HOME_USE_CASE_RADAR,
} from '@/lib/demo-homepage'

interface CategoryHighlight {
  category: Category
  articles: Article[]
}

interface HomepageExperienceProps {
  featuredArticle: Article
  topInsights: Article[]
  categoryHighlights: CategoryHighlight[]
}

function formatDelta(value: number) {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
}

export function HomepageExperience({
  featuredArticle,
  topInsights,
  categoryHighlights,
}: HomepageExperienceProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
        <Link
          href={featuredArticle.href}
          className="group relative overflow-hidden rounded-[28px] border border-teal-700/40 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.35),_transparent_42%),linear-gradient(135deg,_rgba(5,61,48,0.96),_rgba(3,43,34,0.96))] p-7 sm:p-8"
        >
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(252,211,77,0.08),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-teal-200">
                FEATURED INSIGHT
              </div>
              <div className="flex items-center gap-3 text-xs text-teal-400">
                <span>{featuredArticle.author.name}</span>
                <span className="h-1 w-1 rounded-full bg-teal-600" />
                <span>Updated just now</span>
              </div>
              <h1
                className="max-w-3xl text-3xl font-bold leading-tight text-teal-50 sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {featuredArticle.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-teal-200/90 sm:text-lg">
                {featuredArticle.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-amber-950 transition-transform duration-200 group-hover:translate-x-1">
                Read Full Insight
                <ArrowRight size={15} />
              </span>
              <span className="rounded-full border border-teal-600/40 px-4 py-2 text-sm text-teal-300">
                {featuredArticle.readingTime} min read
              </span>
            </div>
          </div>
        </Link>

        <div className="rounded-[28px] border border-teal-700/40 bg-[#04261f] p-6 shadow-[0_18px_40px_rgba(2,16,13,0.35)]">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">
                AI × CRYPTO SIGNAL MAP
              </p>
              <p className="mt-2 text-sm text-teal-500">Updated just now</p>
            </div>
            <div className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
              Live demo layer
            </div>
          </div>

          <div className="space-y-3">
            {HOME_SIGNAL_CARDS.map((signal) => (
              <div
                key={signal.label}
                className="rounded-2xl border border-teal-700/30 bg-teal-950/70 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-teal-100">{signal.label}</p>
                    <p className="mt-1 text-xs text-teal-500">{signal.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-teal-50">{signal.score}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-300">
                      <TrendingUp size={12} />
                      {formatDelta(signal.delta)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {HOME_SIGNAL_METRICS.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-teal-700/20 bg-teal-900/40 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-teal-500">{metric.label}</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <span className="text-xl font-semibold text-teal-50">{metric.value}</span>
                  <span className="text-xs font-medium text-emerald-300">{formatDelta(metric.delta)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div className="rounded-[28px] border border-teal-700/35 bg-teal-900/40 p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">
                AI STACK NAVIGATOR
              </p>
              <h2
                className="mt-2 text-2xl font-bold text-teal-50"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Read the stack before chasing the narrative
              </h2>
            </div>
            <Link
              href="/ai-infrastructure"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-teal-600/35 px-4 py-2 text-sm text-teal-300 hover:border-teal-400/50 hover:text-teal-100"
            >
              View All Layers
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {HOME_STACK_LAYERS.map((layer, index) => (
              <div key={layer.title} className="rounded-2xl border border-teal-700/25 bg-[#06372d] p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-teal-500/15 text-sm font-semibold text-teal-200">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-base font-semibold text-teal-50">{layer.title}</h3>
                <p className="mt-2 text-sm leading-6 text-teal-300/80">{layer.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-teal-700/35 bg-[#041f19] p-6">
          <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">CONTENT TRUST LAYER</p>
          <h2
            className="mt-2 text-2xl font-bold text-teal-50"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Every story should tell you what kind of evidence backs it
          </h2>

          <div className="mt-6 space-y-3">
            {HOME_TRUST_TYPES.map((trust) => (
              <div
                key={trust.label}
                className="flex items-start gap-3 rounded-2xl border border-teal-700/25 bg-teal-950/65 p-4"
              >
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-300" />
                <div>
                  <p className="text-sm font-semibold text-teal-100">{trust.label}</p>
                  <p className="mt-1 text-sm leading-6 text-teal-400">{trust.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-teal-700/35 bg-teal-900/35 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">CATEGORY TABS</p>
            <h2
              className="mt-2 text-2xl font-bold text-teal-50"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Top insights in AI Agents
            </h2>
          </div>
          <Link
            href="/ai-agents"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-300 hover:text-teal-100"
          >
            View all insights
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {categoryHighlights.map(({ category }) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                category.slug === 'ai-agents'
                  ? 'border-amber-400/45 bg-amber-400/10 text-amber-200'
                  : 'border-teal-700/30 bg-teal-950/40 text-teal-300 hover:border-teal-500/40 hover:text-teal-100'
              }`}
            >
              {category.label} <span className="text-teal-500">{category.count ?? 0} articles</span>
            </Link>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-teal-500/35 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-200">
            All AI Agents
          </span>
          {categoryHighlights[0]?.category.subcategories.map((subcategory) => (
            <span
              key={subcategory.slug}
              className="rounded-full border border-teal-700/25 bg-teal-950/50 px-3 py-1 text-xs text-teal-400"
            >
              {subcategory.label}
            </span>
          ))}
          <span className="ml-auto rounded-full border border-teal-700/30 px-3 py-1 text-xs text-teal-400">
            Sort: Latest
          </span>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {topInsights.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-[28px] border border-teal-700/35 bg-[#041f19] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">
                PROJECT MATURITY DISTRIBUTION
              </p>
              <h2
                className="mt-2 text-2xl font-bold text-teal-50"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                AI Agents are moving from experiments to operating products
              </h2>
            </div>
            <Link href="/ai-agents" className="hidden sm:inline-flex items-center gap-2 text-sm text-teal-300 hover:text-teal-100">
              View all projects
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {HOME_PROJECT_MATURITY.map((item, index) => (
              <div key={item.label} className="rounded-2xl border border-teal-700/25 bg-teal-950/65 p-4">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-base font-semibold text-teal-50">{item.label}</p>
                  <p className="text-lg font-semibold text-amber-300">{item.count}</p>
                </div>
                <p className="mt-2 text-sm text-teal-400">{item.description}</p>
                <div className="mt-3 h-2 rounded-full bg-teal-900/70">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,_rgba(45,212,191,0.95),_rgba(252,211,77,0.88))]"
                    style={{ width: `${50 + index * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-teal-700/35 bg-teal-900/35 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">AI TOOLS SPOTLIGHT</p>
              <h2
                className="mt-2 text-2xl font-bold text-teal-50"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                The operator toolkit is starting to harden
              </h2>
            </div>
            <Link href="/ai-infrastructure" className="hidden sm:inline-flex items-center gap-2 text-sm text-teal-300 hover:text-teal-100">
              View all tools
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {HOME_TOOLS_SPOTLIGHT.map((tool) => (
              <div key={tool.name} className="rounded-2xl border border-teal-700/25 bg-[#06372d] p-5">
                <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200">
                  {tool.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-teal-50">{tool.name}</h3>
                <p className="mt-2 text-sm leading-6 text-teal-300/80">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-[28px] border border-teal-700/35 bg-teal-900/35 p-6">
          <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">USE CASE RADAR</p>
          <h2
            className="mt-2 text-2xl font-bold text-teal-50"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            AI Agents score well on composability, but security still lags potential
          </h2>

          <div className="mt-6 space-y-4">
            {HOME_USE_CASE_RADAR.map((item) => (
              <div key={item.axis}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-teal-100">{item.axis}</span>
                  <span className="text-teal-400">
                    Current {item.current} <span className="mx-1 text-teal-700">/</span> Potential {item.potential}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-teal-950/80">
                    <div className="h-full rounded-full bg-teal-400" style={{ width: `${item.current}%` }} />
                  </div>
                  <div className="h-2 rounded-full bg-teal-950/80">
                    <div className="h-full rounded-full bg-amber-300" style={{ width: `${item.potential}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-teal-700/35 bg-[#041f19] p-6">
          <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">EVIDENCE DENSITY GUIDE</p>
          <h2
            className="mt-2 text-2xl font-bold text-teal-50"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Weight conviction by the proof behind it
          </h2>

          <div className="mt-6 space-y-4">
            {HOME_EVIDENCE_DENSITY.map((item) => (
              <div key={item.label} className="rounded-2xl border border-teal-700/25 bg-teal-950/65 p-4">
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${item.color}`} />
                  <p className="text-sm font-semibold text-teal-100">{item.label}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-teal-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-teal-700/35 bg-[#041f19] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">CATEGORY SIGNAL DECK</p>
            <h2
              className="mt-2 text-2xl font-bold text-teal-50"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The homepage is organized around operator intent, not a generic latest feed
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-teal-400">
            Each cluster below pulls the newest stories from a single category while excluding the
            hero and AI Agent cards already shown above.
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {categoryHighlights.map(({ category, articles }) => (
            <div key={category.slug} className="rounded-3xl border border-teal-700/25 bg-teal-900/35 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/${category.slug}`} className="text-xl font-semibold text-teal-50 hover:text-teal-200">
                    {category.label}
                  </Link>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-teal-400">{category.description}</p>
                </div>
                <span className="rounded-full border border-teal-600/35 bg-teal-950/60 px-3 py-1 text-xs text-teal-300">
                  {category.count ?? 0} tracked
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {category.subcategories.map((subcategory) => (
                  <span
                    key={subcategory.slug}
                    className="rounded-full border border-teal-700/25 bg-teal-950/50 px-3 py-1 text-xs text-teal-400"
                  >
                    {subcategory.label}
                  </span>
                ))}
              </div>

              <div className="mt-5 divide-y divide-teal-800/35">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="compact" className="py-4 first:pt-0 last:pb-0" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="rounded-[28px] border border-teal-700/35 bg-teal-900/35 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">
                NARRATIVE LIFECYCLE TRACKER
              </p>
              <h2
                className="mt-2 text-2xl font-bold text-teal-50"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Momentum is highest where AI agents meet live markets
              </h2>
            </div>
            <Link href="/ai-agents" className="hidden sm:inline-flex items-center gap-2 text-sm text-teal-300 hover:text-teal-100">
              View Full Tracker
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {HOME_NARRATIVE_LIFECYCLE.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-teal-700/25 bg-teal-950/65 px-4 py-4"
              >
                <span className="font-medium text-teal-100">{item.label}</span>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-teal-700/35 bg-[#041f19] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">
                WHY THIS MATTERS TO OPERATORS
              </p>
              <h2
                className="mt-2 text-2xl font-bold text-teal-50"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                This is a market structure story, not just a tooling story
              </h2>
            </div>
            <Link href="/search" className="hidden sm:inline-flex items-center gap-2 text-sm text-teal-300 hover:text-teal-100">
              View All Insights
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {HOME_OPERATOR_INSIGHTS.map((insight) => (
              <div key={insight.audience} className="rounded-2xl border border-teal-700/25 bg-teal-950/65 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">
                  {insight.audience}
                </p>
                <p className="mt-3 text-sm leading-6 text-teal-400">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-[28px] border border-teal-700/35 bg-teal-900/35 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">AGENT WATCHLIST</p>
              <h2
                className="mt-2 text-2xl font-bold text-teal-50"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Projects worth monitoring this week
              </h2>
            </div>
            <Link href="/ai-agents" className="hidden sm:inline-flex items-center gap-2 text-sm text-teal-300 hover:text-teal-100">
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {HOME_AGENT_WATCHLIST.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl border border-teal-700/25 bg-teal-950/65 px-4 py-4"
              >
                <div>
                  <p className="font-medium text-teal-50">{item.name}</p>
                  <p className="mt-1 text-sm text-teal-400">{item.context}</p>
                </div>
                <span className="text-xs text-teal-500">{item.updated}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-teal-700/35 bg-[#041f19] p-6">
          <p className="text-xs font-semibold tracking-[0.24em] text-teal-400">
            STAY AHEAD WITH AI × CRYPTO BRIEFS
          </p>
          <h2
            className="mt-2 text-2xl font-bold text-teal-50"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Choose the brief that matches your operating cadence
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {HOME_BRIEFS.map((brief) => (
              <div key={brief.name} className="rounded-2xl border border-teal-700/25 bg-teal-950/65 p-5">
                <p className="text-lg font-semibold text-teal-50">{brief.name}</p>
                <p className="mt-3 text-sm leading-6 text-teal-400">{brief.description}</p>
                <Link
                  href="/about"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber-200 hover:text-amber-100"
                >
                  Subscribe
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
