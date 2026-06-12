import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight, Shield, Check, Rocket, TrendingUp, Zap } from "lucide-react";

const LEARNING_PATHS = [
  { icon: <Rocket size={16} />, title: "Start Here: Crypto Basics", lessons: 5, href: "/guides" },
  { icon: <TrendingUp size={16} />, title: "Trading Basics", lessons: 6, href: "/guides" },
  { icon: <Zap size={16} />, title: "DeFi Fundamentals", lessons: 6, href: "/guides" },
];

const QUICK_ANSWERS = [
  { q: "What is Ethereum?", href: "/guides" },
  { q: "What is DeFi?", href: "/guides" },
  { q: "What is NFT?", href: "/guides" },
  { q: "What is Staking?", href: "/guides" },
  { q: "What is Web3?", href: "/guides" },
];

const EDITORIAL_POINTS = [
  "Named bylines on published guides",
  "Corrections path available to readers",
  "Policy pages linked sitewide",
  "Guide coverage updated as topics evolve",
];

export default function GuidesHub() {
  return (
    <section
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-brand-green/15 flex items-center justify-center">
            <BookOpen size={12} className="text-brand-green" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xs uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>
              Guides Learning Hub
            </h2>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              Your complete learning path to master crypto
            </p>
          </div>
        </div>
        <Link href="/guides" className="text-xs text-brand-orange flex items-center gap-1 hover:gap-1.5 transition-all">
          View all guides <ArrowRight size={12} />
        </Link>
      </div>

      {/* 4-column body */}
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: "var(--border)" }}>
        {/* Featured guide */}
        <div className="p-5">
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-3"
            style={{ background: "rgba(247,147,26,0.15)", color: "#F7931A" }}
          >
            Start Here
          </span>
          <h3 className="font-display font-bold text-base leading-snug mb-2" style={{ color: "var(--text-primary)" }}>
            Explore CoinLineup&apos;s crypto guide library
          </h3>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Browse beginner explainers, market primers, and topic-based learning paths built from the live guides archive.
          </p>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center text-white text-[9px] font-bold">CL</span>
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>CoinLineup Guides Desk</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] mb-4" style={{ color: "var(--text-muted)" }}>
            <span>Beginner</span>
            <span>·</span>
            <span>Editorially maintained</span>
          </div>
          <Link href="/guides" className="inline-flex items-center gap-1 text-brand-orange text-xs font-semibold hover:gap-2 transition-all">
            Browse Guides <ArrowRight size={12} />
          </Link>
        </div>

        {/* Learning Paths */}
        <div className="p-5">
          <p className="font-display font-bold text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-primary)" }}>
            Learning Paths
          </p>
          <p className="text-[10px] mb-4" style={{ color: "var(--text-muted)" }}>Step-by-step courses to build your knowledge</p>
          <div className="space-y-2">
            {LEARNING_PATHS.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="flex items-center justify-between p-3 rounded-xl border group hover:border-brand-orange transition-all"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-brand-orange">{p.icon}</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{p.title}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{p.lessons} lessons</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Answers */}
        <div className="p-5">
          <p className="font-display font-bold text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-primary)" }}>
            Quick Answers
          </p>
          <p className="text-[10px] mb-4" style={{ color: "var(--text-muted)" }}>Crypto explained in 60 seconds</p>
          <div className="space-y-0">
            {QUICK_ANSWERS.map((item) => (
              <Link
                key={item.q}
                href={item.href}
                className="flex items-center justify-between py-2.5 border-b group last:border-0 hover:text-brand-orange transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
              >
                <span className="text-xs">{item.q}</span>
                <ChevronRight size={13} className="flex-shrink-0 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Editorial standards */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <p className="font-display font-bold text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-primary)" }}>
              Editorial Standards
            </p>
            <p className="text-[10px] mb-4" style={{ color: "var(--text-muted)" }}>How readers can evaluate guide coverage</p>
            <ul className="space-y-2.5">
              {EDITORIAL_POINTS.map((pt) => (
                <li key={pt} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                  <span className="w-4 h-4 rounded-full bg-brand-green/15 flex items-center justify-center flex-shrink-0">
                    <Check size={9} className="text-brand-green" />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
              <Shield size={28} className="text-brand-green" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
