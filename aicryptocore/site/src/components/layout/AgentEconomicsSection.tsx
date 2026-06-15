import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// ── Radar chart data ──
const AXES = [
  { label: 'Real Users',            angle: -90 },   // top
  { label: 'Transactions',          angle: -30 },   // top-right
  { label: 'Infra Readiness',       angle:  30 },   // bottom-right
  { label: 'Composability',         angle:  90 },   // bottom
  { label: 'Security',              angle: 150 },   // bottom-left
  { label: 'Monetization\nPotential', angle: -150 }, // top-left
]

const CURRENT:  number[] = [0.50, 0.68, 0.60, 0.65, 0.55, 0.40]
const POTENTIAL: number[] = [0.85, 0.90, 0.80, 0.85, 0.75, 0.70]

const CX = 150; const CY = 155; const R = 95

function toRad(deg: number) { return (deg * Math.PI) / 180 }

function point(val: number, angleDeg: number) {
  const a = toRad(angleDeg)
  return { x: CX + val * R * Math.cos(a), y: CY + val * R * Math.sin(a) }
}

function polygon(values: number[]) {
  return values.map((v, i) => {
    const { x, y } = point(v, AXES[i].angle)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

// Grid rings at 20%, 40%, 60%, 80%, 100%
const GRID_LEVELS = [0.2, 0.4, 0.6, 0.8, 1.0]

function gridHex(level: number) {
  return AXES.map((ax) => {
    const { x, y } = point(level, ax.angle)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

// ── AI Tools ──
const AI_TOOLS = [
  { name: 'AgentKit',      desc: 'No-code agent framework for web3 builders', icon: '🤖', href: '/crypto-ai-tools' },
  { name: 'RAG3',          desc: 'Web3-native RAG engine on on-chain data',    icon: '📦', href: '/crypto-ai-tools' },
  { name: 'OnScope',       desc: 'On-chain AI analytics & agent intelligence', icon: '📊', href: '/crypto-ai-tools' },
  { name: 'Compute Horde', desc: 'Decentralized GPU network for AI workloads', icon: '⚡', href: '/crypto-ai-tools' },
]

// ── Evidence guide ──
const EVIDENCE = [
  { color: '#22c55e', level: 'High Evidence',   desc: 'Strong on-chain and product signals' },
  { color: '#f59e0b', level: 'Medium Evidence', desc: 'Some proof, more data needed' },
  { color: '#ef4444', level: 'Low Evidence',    desc: 'Limited signals, higher uncertainty' },
]

const TAG_CATEGORIES = [
  { label: 'AGENT TOOLING', badgeClass: 'badge-teal' },
  { label: 'DATA',          badgeClass: 'badge-blue' },
  { label: 'ANALYTICS',     badgeClass: 'badge-violet' },
  { label: 'COMPUTE',       badgeClass: 'badge-amber' },
]

export function AgentEconomicsSection() {
  return (
    <section className="mb-10 rounded-2xl border border-glass overflow-hidden bg-surface">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-glass">
        <h2 className="text-base font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-display)' }}>
          Agent Economics in AI
        </h2>
        <Link href="/crypto-ai-tools" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1 group">
          View all <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">

        {/* ── LEFT: AI Tools Spotlight ── */}
        <div className="border-r border-glass p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">
            AI Tools Spotlight
          </p>
          <div className="space-y-4">
            {AI_TOOLS.map((tool, i) => (
              <Link key={tool.name} href={tool.href}
                className="flex gap-3 group hover:bg-[var(--color-border-default)] rounded-xl -mx-2 p-2 transition-colors">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0 bg-surface-elevated border border-glass group-hover:border-[var(--color-border-teal)] transition-colors">
                  {tool.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-teal)] transition-colors">
                      {tool.name}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TAG_CATEGORIES[i].badgeClass}`}>
                      {TAG_CATEGORIES[i].label}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-secondary)] leading-snug line-clamp-2">
                    {tool.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/crypto-ai-tools"
            className="flex items-center gap-1 mt-4 text-xs text-[var(--color-text-teal)] hover:text-[var(--color-accent)] transition-colors group">
            View all tools <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── CENTER: Radar chart ── */}
        <div className="flex flex-col items-center justify-center p-6 border-r border-glass">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">
            Use Case Radar — AI Agents
          </p>

          <svg viewBox="0 0 300 310" className="w-full max-w-[300px]">
            {/* Grid hexagons */}
            {GRID_LEVELS.map((lvl) => (
              <polygon key={lvl}
                points={gridHex(lvl)}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            ))}

            {/* Axis lines */}
            {AXES.map((ax) => {
              const end = point(1.0, ax.angle)
              return (
                <line key={ax.angle}
                  x1={CX} y1={CY}
                  x2={end.x.toFixed(1)} y2={end.y.toFixed(1)}
                  stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                />
              )
            })}

            {/* Potential area */}
            <polygon
              points={polygon(POTENTIAL)}
              fill="rgba(99,102,241,0.15)"
              stroke="rgba(139,92,246,0.6)"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />

            {/* Current state area */}
            <polygon
              points={polygon(CURRENT)}
              fill="rgba(20,184,166,0.20)"
              stroke="rgba(94,234,212,0.8)"
              strokeWidth="2"
            />

            {/* Center dot */}
            <circle cx={CX} cy={CY} r="3" fill="rgba(255,255,255,0.3)" />

            {/* Axis labels */}
            {AXES.map((ax) => {
              const outer = point(1.22, ax.angle)
              const lines = ax.label.split('\n')
              return (
                <text key={ax.angle}
                  x={outer.x.toFixed(1)}
                  y={outer.y.toFixed(1)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="9"
                  fill="rgba(148,163,184,0.9)"
                  fontFamily="Inter,system-ui,sans-serif"
                >
                  {lines.map((line, li) => (
                    <tspan key={li} x={outer.x.toFixed(1)} dy={li === 0 ? '0' : '11'}>{line}</tspan>
                  ))}
                </text>
              )
            })}

            {/* Data point dots — current */}
            {CURRENT.map((v, i) => {
              const { x, y } = point(v, AXES[i].angle)
              return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="3.5" fill="#5eead4" stroke="#0d1117" strokeWidth="1.5" />
            })}

            {/* Legend */}
            <g transform="translate(20, 285)">
              <line x1="0" y1="5" x2="20" y2="5" stroke="rgba(94,234,212,0.8)" strokeWidth="2" />
              <circle cx="10" cy="5" r="3" fill="#5eead4" />
              <text x="25" y="8" fontSize="9" fill="rgba(148,163,184,0.9)" fontFamily="Inter,system-ui,sans-serif">Current State</text>
            </g>
            <g transform="translate(130, 285)">
              <line x1="0" y1="5" x2="20" y2="5" stroke="rgba(139,92,246,0.6)" strokeWidth="2" strokeDasharray="4 2" />
              <text x="25" y="8" fontSize="9" fill="rgba(148,163,184,0.9)" fontFamily="Inter,system-ui,sans-serif">Potential</text>
            </g>
          </svg>
        </div>

        {/* ── RIGHT: Evidence Density Guide ── */}
        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">
            Evidence Density Guide
          </p>
          <div className="space-y-6">
            {EVIDENCE.map((e) => (
              <div key={e.level} className="flex gap-3">
                <div className="mt-0.5 shrink-0">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color, boxShadow: `0 0 8px ${e.color}80` }} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-0.5">{e.level}</p>
                  <p className="text-[11px] text-[var(--color-text-secondary)] leading-snug">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-glass">
            <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
              Radar reflects Q2 2026 on-chain signal quality across 6 agent economy dimensions.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
