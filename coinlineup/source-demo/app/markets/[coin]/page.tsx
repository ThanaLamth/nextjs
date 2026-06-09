import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { getTopCoins, MOCK_COINS } from "@/lib/coingecko";

const COIN_META: Record<string, { name: string; symbol: string; description: string }> = {
  bitcoin: { name: "Bitcoin", symbol: "BTC", description: "Track Bitcoin price, market cap, volume, and the latest BTC news and analysis." },
  ethereum: { name: "Ethereum", symbol: "ETH", description: "Track Ethereum price, market cap, volume, and the latest ETH news and analysis." },
  xrp: { name: "XRP", symbol: "XRP", description: "Track XRP price, market cap, volume, and the latest XRP news and analysis." },
};

interface Props {
  params: Promise<{ coin: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { coin } = await params;
  const meta = COIN_META[coin];
  const name = meta?.name ?? coin.toUpperCase();
  return { title: `${name} Price & Analysis — CoinLineup` };
}

function fmt(price: number): string {
  if (price >= 1000) return "$" + price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1) return "$" + price.toFixed(2);
  return "$" + price.toFixed(5);
}

export default async function CoinPage({ params }: Props) {
  const { coin } = await params;
  const meta = COIN_META[coin];

  let coins = MOCK_COINS;
  try { coins = await getTopCoins(20); } catch {}

  const coinData = coins.find(
    (c) => c.symbol.toLowerCase() === (meta?.symbol ?? coin).toLowerCase() ||
           c.id.toLowerCase() === coin.toLowerCase()
  );

  const name = meta?.name ?? coin.toUpperCase();
  const up = (coinData?.price_change_percentage_24h ?? 0) >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={20} className="text-brand-orange" />
          <p className="text-brand-orange font-display font-semibold text-sm uppercase tracking-widest">Markets</p>
        </div>
        <h1 className="font-display font-bold text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
          {name} <span className="gradient-text">Price</span>
        </h1>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          {meta?.description ?? `Real-time ${name} price data, charts, and market analysis.`}
        </p>
      </div>

      {coinData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Price", value: fmt(coinData.current_price) },
            { label: "24h Change", value: `${up ? "+" : ""}${coinData.price_change_percentage_24h?.toFixed(2)}%`, color: up ? "#00A86B" : "#E63946" },
            { label: "Market Cap", value: "$" + (coinData.market_cap / 1e9).toFixed(1) + "B" },
            { label: "24h Volume", value: "$" + (coinData.total_volume / 1e9).toFixed(1) + "B" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border p-5"
              style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
              <p className="font-display font-bold text-2xl" style={{ color: stat.color ?? "var(--text-primary)" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border p-8 text-center mb-10" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
          <p className="font-semibold mb-1" style={{ color: "var(--text-secondary)" }}>Live price data unavailable</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Check back shortly for real-time {name} data.</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Full {name} market page coming soon with charts, historical data, and on-chain analytics.
        </p>
        <Link href="/markets" className="text-brand-orange text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
          View all markets <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
