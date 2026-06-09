import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Bitcoin, Link2, Wallet, TrendingUp, Zap, Lock, CreditCard, Palette, Layers } from "lucide-react";

export const metadata: Metadata = { title: "Guides — Learn Crypto" };

const GUIDES = [
  { title: "What is Bitcoin? A Complete Beginner's Guide", level: "Beginner", time: "12 min", category: "Bitcoin", icon: <Bitcoin size={22} />, href: "/guides/bitcoin/what-is-bitcoin" },
  { title: "How to Buy Cryptocurrency: Step-by-Step", level: "Beginner", time: "8 min", category: "Crypto Basics", icon: <CreditCard size={22} />, href: "/guides/crypto-basics/how-to-buy-cryptocurrency" },
  { title: "Understanding DeFi: Decentralized Finance Explained", level: "Intermediate", time: "15 min", category: "DeFi", icon: <Zap size={22} />, href: "/guides/defi/understanding-defi" },
  { title: "How to Stake Ethereum: A Beginner's Guide", level: "Beginner", time: "10 min", category: "DeFi", icon: <Layers size={22} />, href: "/guides/defi/how-to-stake-ethereum" },
  { title: "NFTs Explained: What They Are and How They Work", level: "Beginner", time: "8 min", category: "Crypto Basics", icon: <Palette size={22} />, href: "/guides/crypto-basics/nfts-explained" },
  { title: "Trading Basics: Reading Crypto Charts", level: "Intermediate", time: "20 min", category: "Crypto Trading", icon: <TrendingUp size={22} />, href: "/guides/crypto-trading/reading-crypto-charts" },
];

const CATEGORIES = [
  { label: "Crypto Basics", href: "/guides/crypto-basics", icon: <Bitcoin size={14} />, count: 5 },
  { label: "Bitcoin", href: "/guides/bitcoin", icon: <Bitcoin size={14} />, count: 3 },
  { label: "Blockchain", href: "/guides/blockchain", icon: <Link2 size={14} />, count: 3 },
  { label: "Wallets", href: "/guides/wallets", icon: <Wallet size={14} />, count: 3 },
  { label: "Crypto Trading", href: "/guides/crypto-trading", icon: <TrendingUp size={14} />, count: 3 },
  { label: "DeFi", href: "/guides/defi", icon: <Zap size={14} />, count: 3 },
  { label: "Security", href: "/guides/security", icon: <Lock size={14} />, count: 3 },
];

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={20} className="text-brand-green" />
          <p className="text-brand-green font-display font-semibold text-sm uppercase tracking-widest">Learning Hub</p>
        </div>
        <h1 className="font-display font-bold text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
          Crypto <span className="gradient-text">Guides</span>
        </h1>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          Master cryptocurrency with step-by-step guides written by our research team.
        </p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <Link key={cat.href} href={cat.href}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all hover:border-brand-orange hover:text-brand-orange"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            <span>{cat.icon}</span>
            {cat.label}
            <span className="text-xs px-1.5 py-0.5 rounded-full ml-1"
              style={{ background: "rgba(247,147,26,0.12)", color: "#F7931A" }}>
              {cat.count}
            </span>
          </Link>
        ))}
      </div>

      {/* Featured guides grid */}
      <h2 className="font-display font-bold text-xl mb-5" style={{ color: "var(--text-primary)" }}>
        Featured Guides
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {GUIDES.map((g) => (
          <Link key={g.title} href={g.href}
            className="group p-5 rounded-xl border transition-all hover:border-brand-orange"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl" style={{ background: "rgba(247,147,26,0.1)", color: "#F7931A" }}>
                {g.icon}
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: "rgba(247,147,26,0.12)", color: "#F7931A" }}>
                {g.level}
              </span>
            </div>
            <h3 className="font-display font-bold text-sm leading-snug mb-2 group-hover:text-brand-orange transition-colors"
              style={{ color: "var(--text-primary)" }}>
              {g.title}
            </h3>
            <div className="flex items-center justify-between text-xs mt-3" style={{ color: "var(--text-muted)" }}>
              <span>{g.category}</span>
              <span>⏱ {g.time}</span>
            </div>
            <div className="flex items-center gap-1 mt-3 text-brand-orange text-xs font-semibold group-hover:gap-2 transition-all">
              Read Guide <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
