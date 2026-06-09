"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import type { CoinPrice } from "@/lib/coingecko";

function SparkLine({ prices }: { prices: number[] }) {
  if (!prices || prices.length < 2) return null;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const w = 72; const h = 28;
  const pts = prices.map((p, i) => {
    const x = (i / (prices.length - 1)) * w;
    const y = h - ((p - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  const up = prices[prices.length - 1] >= prices[0];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline fill="none" stroke={up ? "#00A86B" : "#E63946"} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" points={pts} />
    </svg>
  );
}

function fmt(price: number): string {
  if (price >= 1000) return "$" + price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1) return "$" + price.toFixed(2);
  return "$" + price.toFixed(4);
}
function fmtCap(cap: number): string {
  if (cap >= 1e12) return "$" + (cap / 1e12).toFixed(2) + "T";
  if (cap >= 1e9) return "$" + (cap / 1e9).toFixed(1) + "B";
  return "$" + (cap / 1e6).toFixed(1) + "M";
}

export default function MarketMiniCard({ coin, index }: { coin: CoinPrice; index: number }) {
  const up = coin.price_change_percentage_24h >= 0;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
      <Link
        href={`/markets#${coin.id}`}
        className="flex items-center gap-3 p-3 rounded-xl transition-all group border"
        style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        }}
      >
        <span className="text-xs font-bold w-5 text-center" style={{ color: "var(--text-muted)" }}>
          {coin.market_cap_rank}
        </span>
        <div className="relative w-8 h-8 flex-shrink-0">
          <Image src={coin.image} alt={coin.name} fill className="rounded-full object-cover" sizes="32px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-sm" style={{ color: "var(--text-primary)" }}>
            {coin.symbol.toUpperCase()}
          </p>
          <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{coin.name}</p>
        </div>
        <div className="hidden sm:block">
          <SparkLine prices={coin.sparkline_in_7d?.price?.slice(-24) ?? []} />
        </div>
        <div className="text-right">
          <p className="font-display font-bold text-sm" style={{ color: "var(--text-primary)" }}>
            {fmt(coin.current_price)}
          </p>
          <p className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${up ? "price-up" : "price-down"}`}>
            {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {up ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>
        <div className="hidden lg:block text-right w-24">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{fmtCap(coin.market_cap)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
