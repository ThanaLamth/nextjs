import Image from "next/image";
import Link from "next/link";
import { TrendingUp, TrendingDown, Star } from "lucide-react";
import { getCoinMarketHref, type CoinPrice } from "@/lib/coingecko";

function fmt(price: number): string {
  if (price >= 1000) return "$" + price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1) return "$" + price.toFixed(2);
  return "$" + price.toFixed(5);
}

function MiniAreaChart({ prices, up }: { prices: number[]; up: boolean }) {
  if (!prices || prices.length < 2) {
    return (
      <div className="h-10 rounded" style={{ background: up ? "rgba(0,168,107,0.08)" : "rgba(230,57,70,0.08)" }} />
    );
  }
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const w = 300; const h = 40;
  const pts = prices.map((p, i) => {
    const x = (i / (prices.length - 1)) * w;
    const y = h - ((p - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const fill = [...pts, `${w},${h}`, `0,${h}`].join(" ");
  const stroke = pts.join(" ");
  const color = up ? "#00A86B" : "#E63946";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10" preserveAspectRatio="none">
      <polygon fill={`${color}18`} points={fill} />
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={stroke} />
    </svg>
  );
}

interface PanelProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  coins: CoinPrice[];
  sortKey: "gain" | "loss" | "cap";
  viewHref: string;
}

function MarketPanel({ title, icon, iconColor, coins, sortKey, viewHref }: PanelProps) {
  const sorted = [...coins].sort((a, b) => {
    if (sortKey === "gain") return b.price_change_percentage_24h - a.price_change_percentage_24h;
    if (sortKey === "loss") return a.price_change_percentage_24h - b.price_change_percentage_24h;
    return b.market_cap - a.market_cap;
  }).slice(0, 5);

  const sparkPrices = sorted[0]?.sparkline_in_7d?.price?.slice(-24) ?? [];
  const overallUp = sortKey !== "loss";

  return (
    <div
      className="rounded-xl overflow-hidden border flex flex-col"
      style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2">
          <span style={{ color: iconColor }}>{icon}</span>
          <span className="font-display font-bold text-xs uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
            {title}
          </span>
        </div>
        <Link href={viewHref} className="text-xs text-brand-orange flex items-center gap-0.5 hover:gap-1 transition-all">
          View all →
        </Link>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: "var(--text-muted)" }}>
        <span className="col-span-1">#</span>
        <span className="col-span-5">Coin</span>
        <span className="col-span-3 text-right">Price</span>
        <span className="col-span-3 text-right">24h %</span>
      </div>

      {/* Rows */}
      <div className="flex-1">
        {sorted.map((coin, i) => {
          const up = coin.price_change_percentage_24h >= 0;
          return (
            <div key={coin.id}
              className="grid grid-cols-12 items-center px-4 py-2 border-t hover:bg-brand-orange/5 transition-colors"
              style={{ borderColor: "var(--border)" }}>
              <span className="col-span-1 text-xs font-bold" style={{ color: "var(--text-muted)" }}>{i + 1}</span>
              <Link href={getCoinMarketHref(coin)} className="col-span-5 flex items-center gap-2 min-w-0 hover:opacity-85 transition-opacity">
                <div className="relative w-6 h-6 flex-shrink-0">
                  <Image src={coin.image} alt={coin.name} fill className="rounded-full object-cover" sizes="24px" />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-xs truncate" style={{ color: "var(--text-primary)" }}>
                    {coin.symbol.toUpperCase()}
                  </p>
                  <p className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>{coin.name}</p>
                </div>
              </Link>
              <span className="col-span-3 text-xs font-display font-bold text-right" style={{ color: "var(--text-primary)" }}>
                {fmt(coin.current_price)}
              </span>
              <span className={`col-span-3 text-xs font-bold text-right ${up ? "price-up" : "price-down"}`}>
                {up ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Sparkline */}
      <div className="px-0 pt-1">
        <MiniAreaChart prices={sparkPrices} up={overallUp} />
      </div>
    </div>
  );
}

interface Props { coins: CoinPrice[] }

export default function MarketIntelligence({ coins }: Props) {
  return (
    <section>
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded bg-brand-orange/15 flex items-center justify-center">
          <TrendingUp size={12} className="text-brand-orange" />
        </div>
        <h2 className="font-display font-bold text-xs uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>
          Market Intelligence
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MarketPanel
          title="Top Gainers"
          icon={<TrendingUp size={14} />}
          iconColor="#00A86B"
          coins={coins.filter(c => c.price_change_percentage_24h > 0)}
          sortKey="gain"
          viewHref="/markets#movers"
        />
        <MarketPanel
          title="Top Losers"
          icon={<TrendingDown size={14} />}
          iconColor="#E63946"
          coins={coins.filter(c => c.price_change_percentage_24h < 0)}
          sortKey="loss"
          viewHref="/markets#movers"
        />
        <MarketPanel
          title="Top Coins"
          icon={<Star size={14} />}
          iconColor="#C9A84C"
          coins={coins}
          sortKey="cap"
          viewHref="/markets"
        />
      </div>
    </section>
  );
}
