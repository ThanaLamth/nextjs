import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Info, TrendingUp } from 'lucide-react'
import type { Article } from '@/types/article'

/* ─── Signal map data ──────────────────────────────────────────── */
const SPARKLINES = {
  momentum:    [45,52,48,60,58,70,65,72,78,82],
  infra:       [50,55,58,54,62,60,66,68,72,75],
  reliability: [70,68,72,65,60,58,62,60,64,63],
  narrative:   [55,62,68,72,75,78,82,80,85,88],
  capital:     [58,60,62,58,65,63,66,68,67,70],
}

function Sparkline({ values, color, fillColor }: { values: number[]; color: string; fillColor: string }) {
  const W = 80; const H = 30
  const min = Math.min(...values); const range = (Math.max(...values) - min) || 1
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * W
    const y = H - ((v - min) / range) * H * 0.85 - 1
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const area = `M${pts[0]} ${pts.join(' L')} L${W},${H} L0,${H} Z`
  const line = `M${pts.join(' L')}`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      <path d={area} fill={fillColor} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const STATUS: Record<string, { label: string; bg: string; text: string }> = {
  strong:   { label: 'Strong',   bg: 'rgba(21,128,61,0.15)',  text: 'var(--color-price-up)' },
  moderate: { label: 'Moderate', bg: 'var(--color-accent-muted)', text: 'var(--color-warning)' },
  very_hot: { label: 'Very Hot', bg: 'rgba(185,28,28,0.15)',  text: 'var(--color-price-down)' },
}

const SIGNALS = [
  { key: 'momentum',    icon: '🚀', iconBg: 'rgba(20,184,166,0.15)',  label: 'Agent Momentum',  value: 78, change: 12.4, status: 'strong',   color: 'var(--color-text-teal)', fill: 'rgba(20,184,166,0.12)' },
  { key: 'infra',       icon: '📦', iconBg: 'rgba(147,197,253,0.15)', label: 'Infra Expansion', value: 72, change: 8.7,  status: 'strong',   color: 'var(--color-info)', fill: 'rgba(96,165,250,0.12)' },
  { key: 'reliability', icon: '🗄️', iconBg: 'rgba(245,158,11,0.15)',  label: 'Data Reliability',value: 64, change: 5.1,  status: 'moderate', color: 'var(--color-warning)', fill: 'rgba(245,158,11,0.10)' },
  { key: 'narrative',   icon: '🔥', iconBg: 'rgba(239,68,68,0.15)',   label: 'Narrative Heat',  value: 81, change: 15.6, status: 'very_hot', color: 'var(--color-price-down)', fill: 'rgba(239,68,68,0.10)' },
  { key: 'capital',     icon: '⏱️', iconBg: 'rgba(196,181,253,0.15)', label: 'Capital Activity',value: 69, change: 6.3,  status: 'strong',   color: 'var(--color-premium)', fill: 'rgba(167,139,250,0.10)' },
]

const BOTTOM_STATS = [
  { label: 'Active Projects',      value: '2,847', change: '+18.3%' },
  { label: 'On-chain AI Txns (7D)',value: '1.24M', change: '+22.7%' },
  { label: 'AI Protocols Tracked', value: '468',   change: '+14.1%' },
  { label: 'Funding (30D)',        value: '$412M', change: '+31.4%' },
  { label: 'Partnerships (30D)',   value: '147',   change: '+27.6%' },
]

/* ─── AI Stack Navigator data ─────────────────────────────────── */
const STACK_LAYERS = [
  { icon: '⚡', color: '#60a5fa', label: 'Application Layer', desc: 'AI apps and user experiences',         href: '/crypto-ai-tools' },
  { icon: '🤖', color: '#5eead4', label: 'Agent Layer',       desc: 'Autonomous agents & workflows',         href: '/crypto-ai-tools' },
  { icon: '🗃️', color: '#fcd34d', label: 'Data Layer',        desc: 'Datasets, indexing & oracles',          href: '/blockchain' },
  { icon: '💻', color: '#f97316', label: 'Compute Layer',     desc: 'Compute, GPUs & decentralization',      href: '/mining' },
  { icon: '⚙️', color: '#a78bfa', label: 'Execution Layer',   desc: 'Settlement, rollups & infra',           href: '/blockchain' },
  { icon: '🔒', color: '#34d399', label: 'Security Layer',    desc: 'Security, identity & trust',            href: '/scams-security' },
]

/* ─── Component ────────────────────────────────────────────────── */
interface HeroSectionProps {
  featured: Article
  statBoxes?: unknown[]      // kept for API compat, not used
  recentArticles?: Article[] // kept for API compat, not used
}

export function HeroSection({ featured }: HeroSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[38%_1fr_20%] gap-4 mb-6 items-stretch">

      {/* ════ LEFT: Featured Insight ════ */}
      <div className="relative overflow-hidden rounded-2xl h-[420px]">

        {/* Image — absolute fill toàn card */}
        <Image
          src={featured.coverImage}
          alt={featured.coverImageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 30vw"
          className="object-cover object-center"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a4a] via-[#1a0a4a]/60 to-transparent" />

        {/* Circuit grid overlay */}
        <div className="absolute inset-0 opacity-8 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }} />

        {/* Glow orb */}
        <div className="absolute bottom-16 right-8 w-28 h-28 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.30) 0%, transparent 70%)' }} />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
          {/* Top */}
          <div>
            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
              style={{ background: 'rgba(99,102,241,0.25)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.35)' }}>
              Featured Insight
            </span>

            <h1 className="text-2xl font-bold text-white leading-snug mb-3"
              style={{ fontFamily: 'var(--font-display)' }}>
              {featured.title}
            </h1>

            <p className="text-sm text-white/70 leading-relaxed line-clamp-4">
              {featured.description}
            </p>
          </div>

          {/* Bottom: CTA + dots */}
          <div>
            <Link href={featured.href} className="btn-gradient inline-flex items-center gap-2 mb-4">
              Read Full Insight <ArrowRight size={14} />
            </Link>

            <div className="flex items-center gap-1.5">
              <span className="w-5 h-1.5 rounded-full bg-white/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>

      {/* ════ CENTER: Signal Map ════ */}
      <div className="rounded-2xl border border-glass overflow-hidden bg-surface flex flex-col h-[420px]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-display)' }}>
              AI × Crypto Signal Map
            </span>
            <Info size={12} className="text-[var(--color-text-muted)]" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Updated just now
          </div>
        </div>

        {/* Signal cards — subtle dividers */}
        <div className="grid grid-cols-5 flex-1" style={{ borderTop: 'none' }}>
          {SIGNALS.map((sig, idx) => {
            const st = STATUS[sig.status]
            const data = SPARKLINES[sig.key as keyof typeof SPARKLINES]
            return (
              <div key={sig.key}
                className="py-3 px-2 flex flex-col items-center text-center justify-between"
                style={{ borderRight: idx < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                {/* Group A: top content — icon + label + num + change */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: sig.iconBg }}>
                    {sig.icon}
                  </div>
                  <p className="text-[9px] text-[var(--color-text-secondary)] leading-tight">{sig.label}</p>
                  <span className="text-xl font-bold text-[var(--color-text-primary)] leading-none"
                    style={{ fontFamily: 'var(--font-mono)' }}>
                    {sig.value}
                  </span>
                  <div className="flex items-center justify-center gap-0.5 text-[10px] font-semibold text-[#22c55e]">
                    <TrendingUp size={9} /> +{sig.change}%
                  </div>
                </div>
                {/* Group B: sparkline — shrink-0 = constrain, KHÔNG bị kéo giãn */}
                <div className="shrink-0 h-9 w-full">
                  <Sparkline values={data} color={sig.color} fillColor={sig.fill} />
                </div>
                {/* Group C: badge — ghim ở bottom */}
                <span className="inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: st.bg, color: st.text }}>
                  {st.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Bottom stats — subtle dividers */}
        <div className="grid grid-cols-5 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {BOTTOM_STATS.map((s, idx) => (
            <div key={s.label} className="px-2 py-2.5 flex flex-col items-center text-center gap-0.5"
              style={{ borderRight: idx < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <p className="text-[8px] text-[var(--color-text-muted)] leading-tight">{s.label}</p>
              <div className="flex items-baseline justify-center gap-1 flex-wrap">
                <span className="text-sm font-bold text-[var(--color-text-primary)]"
                  style={{ fontFamily: 'var(--font-mono)' }}>
                  {s.value}
                </span>
                <span className="text-[9px] font-semibold text-[#22c55e] flex items-center gap-0.5">
                  <TrendingUp size={8} />{s.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════ RIGHT: AI Stack Navigator ════ */}
      <div className="rounded-2xl border border-glass bg-surface p-4 flex flex-col h-[420px] overflow-y-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-primary)] mb-4"
          style={{ fontFamily: 'var(--font-display)' }}>
          AI Stack Navigator
        </p>

        <ul className="flex-1 space-y-0.5 overflow-y-auto pr-0.5"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.10) transparent' }}>
          {STACK_LAYERS.map((layer) => (
            <li key={layer.label}>
              <Link href={layer.href}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[var(--color-border-default)] transition-colors group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 mt-0.5"
                  style={{ background: layer.color + '18', border: `1px solid ${layer.color}30` }}>
                  {layer.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-teal)] transition-colors leading-snug">
                    {layer.label}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] leading-snug mt-0.5">
                    {layer.desc}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/crypto-ai-tools"
          className="mt-4 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[var(--color-border-teal)] text-xs font-semibold text-[var(--color-text-teal)] hover:bg-[var(--color-border-teal)] hover:text-[var(--color-text-primary)] transition-all">
          View All Layers <ArrowRight size={12} />
        </Link>
      </div>

    </div>
  )
}
