import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Bitcoin, CreditCard, Palette, Link2, Wallet, Trophy, Cpu, FileText, Scale, HardDrive, Key, TrendingUp, BarChart2, Shield, Zap, Layers, Leaf, Lock, AlertTriangle } from "lucide-react";

const CATEGORY_GUIDES: Record<string, { slug: string; title: string; time: string; level: string; icon: React.ReactNode }[]> = {
  "crypto-basics": [
    { slug: "what-is-cryptocurrency", title: "What is Cryptocurrency? Complete Guide", time: "10 min", level: "Beginner", icon: <Bitcoin size={20} /> },
    { slug: "how-to-buy-cryptocurrency", title: "How to Buy Cryptocurrency: Step-by-Step", time: "8 min", level: "Beginner", icon: <CreditCard size={20} /> },
    { slug: "nfts-explained", title: "NFTs Explained: What They Are and How They Work", time: "8 min", level: "Beginner", icon: <Palette size={20} /> },
    { slug: "how-blockchain-works", title: "How Blockchain Works", time: "8 min", level: "Beginner", icon: <Link2 size={20} /> },
    { slug: "setting-up-crypto-wallet", title: "Setting Up Your First Crypto Wallet", time: "6 min", level: "Beginner", icon: <Wallet size={20} /> },
  ],
  bitcoin: [
    { slug: "what-is-bitcoin", title: "What is Bitcoin? A Complete Beginner's Guide", time: "12 min", level: "Beginner", icon: <Bitcoin size={20} /> },
    { slug: "bitcoin-vs-gold", title: "Bitcoin vs Gold: Store of Value Comparison", time: "8 min", level: "Intermediate", icon: <Trophy size={20} /> },
    { slug: "how-bitcoin-mining-works", title: "How Bitcoin Mining Works", time: "10 min", level: "Intermediate", icon: <Cpu size={20} /> },
  ],
  blockchain: [
    { slug: "blockchain-technology-explained", title: "Blockchain Technology Explained", time: "15 min", level: "Beginner", icon: <Link2 size={20} /> },
    { slug: "smart-contracts-explained", title: "Smart Contracts: How They Work", time: "10 min", level: "Intermediate", icon: <FileText size={20} /> },
    { slug: "proof-of-work-vs-proof-of-stake", title: "Proof of Work vs Proof of Stake", time: "12 min", level: "Intermediate", icon: <Scale size={20} /> },
  ],
  wallets: [
    { slug: "hot-vs-cold-wallets", title: "Hot vs Cold Wallets: Which to Choose", time: "8 min", level: "Beginner", icon: <Wallet size={20} /> },
    { slug: "hardware-wallets-setup", title: "Hardware Wallets: Complete Setup Guide", time: "15 min", level: "Beginner", icon: <HardDrive size={20} /> },
    { slug: "seed-phrases-safety", title: "Seed Phrases: How to Stay Safe", time: "6 min", level: "Beginner", icon: <Key size={20} /> },
  ],
  "crypto-trading": [
    { slug: "reading-crypto-charts", title: "Trading Basics: Reading Crypto Charts", time: "20 min", level: "Intermediate", icon: <TrendingUp size={20} /> },
    { slug: "technical-analysis-crypto", title: "Technical Analysis for Crypto", time: "25 min", level: "Advanced", icon: <BarChart2 size={20} /> },
    { slug: "risk-management-trading", title: "Risk Management in Crypto Trading", time: "12 min", level: "Intermediate", icon: <Shield size={20} /> },
  ],
  defi: [
    { slug: "understanding-defi", title: "Understanding DeFi: Decentralized Finance Explained", time: "15 min", level: "Intermediate", icon: <Zap size={20} /> },
    { slug: "how-to-stake-ethereum", title: "How to Stake Ethereum", time: "10 min", level: "Beginner", icon: <Layers size={20} /> },
    { slug: "yield-farming-explained", title: "Yield Farming: Risks & Rewards", time: "18 min", level: "Advanced", icon: <Leaf size={20} /> },
  ],
  security: [
    { slug: "avoid-crypto-scams", title: "How to Avoid Crypto Scams", time: "10 min", level: "Beginner", icon: <Lock size={20} /> },
    { slug: "securing-your-crypto", title: "Securing Your Crypto: Best Practices", time: "12 min", level: "Beginner", icon: <Shield size={20} /> },
    { slug: "recognizing-phishing-attacks", title: "Recognizing Phishing Attacks in Crypto", time: "8 min", level: "Beginner", icon: <AlertTriangle size={20} /> },
  ],
};

const CATEGORY_LABELS: Record<string, string> = {
  "crypto-basics": "Crypto Basics",
  bitcoin: "Bitcoin",
  blockchain: "Blockchain",
  wallets: "Wallets",
  "crypto-trading": "Crypto Trading",
  defi: "DeFi",
  security: "Security",
};

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_LABELS[category] ?? category;
  return { title: `${label} Guides — CoinLineup` };
}

export default function GuideCategoryPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" />}>
      <GuideCategoryContent params={params} />
    </Suspense>
  );
}

async function GuideCategoryContent({ params }: Props) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category] ?? category;
  const guides = CATEGORY_GUIDES[category] ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={20} className="text-brand-green" />
          <p className="text-brand-green font-display font-semibold text-sm uppercase tracking-widest">Learning Hub</p>
        </div>
        <h1 className="font-display font-bold text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
          {label} <span className="gradient-text">Guides</span>
        </h1>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          Master {label.toLowerCase()} with step-by-step guides from our research team.
        </p>
      </div>

      {guides.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${category}/${g.slug}`}
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
                <span>{label}</span>
                <span>⏱ {g.time}</span>
              </div>
              <div className="flex items-center gap-1 mt-3 text-brand-orange text-xs font-semibold group-hover:gap-2 transition-all">
                Read Guide <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <BookOpen size={40} className="text-brand-green mb-4 opacity-50" />
          <p className="font-display font-semibold text-lg mb-2" style={{ color: "var(--text-secondary)" }}>
            Guides coming soon
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Our team is working on {label} guides. Check back shortly.
          </p>
          <Link href="/guides" className="text-brand-orange text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            Browse all guides <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
