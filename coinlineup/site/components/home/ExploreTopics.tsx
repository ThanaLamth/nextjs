import Link from "next/link";
import { Bitcoin, Layers, Coins, Scale, Landmark, ArrowLeftRight, Compass } from "lucide-react";
import SectionHeader from "./SectionHeader";

const TOPICS = [
  { label: "Bitcoin", sub: "BTC", icon: <Bitcoin size={18} />, color: "#F7931A", bg: "rgba(247,147,26,0.12)", href: "/news/bitcoin-news" },
  { label: "Ethereum", sub: "ETH", icon: <Layers size={18} />, color: "#8B5CF6", bg: "rgba(139,92,246,0.12)", href: "/news/ethereum" },
  { label: "Altcoins", sub: "", icon: <Coins size={18} />, color: "#EC4899", bg: "rgba(236,72,153,0.12)", href: "/news/altcoins" },
  { label: "Regulation", sub: "", icon: <Scale size={18} />, color: "#F59E0B", bg: "rgba(245,158,11,0.12)", href: "/news/regulation" },
  { label: "Banking", sub: "", icon: <Landmark size={18} />, color: "#10B981", bg: "rgba(16,185,129,0.12)", href: "/news/bank" },
  { label: "Exchanges", sub: "", icon: <ArrowLeftRight size={18} />, color: "#3B82F6", bg: "rgba(59,130,246,0.12)", href: "/news/exchanges" },
];

export default function ExploreTopics() {
  return (
    <div>
      <SectionHeader
        title="Explore Topics"
        icon={<Compass size={16} />}
        viewAllHref="/news"
        viewAllLabel="View all topics"
      />
      <div className="grid grid-cols-3 gap-2.5">
        {TOPICS.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all hover:border-brand-orange group"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ background: t.bg, color: t.color }}
            >
              {t.icon}
            </div>
            <div className="text-center">
              <p className="text-xs font-display font-bold" style={{ color: "var(--text-primary)" }}>
                {t.label}
              </p>
              {t.sub && (
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{t.sub}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
