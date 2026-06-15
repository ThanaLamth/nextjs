import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, TrendingDown, BarChart2, Activity, DollarSign } from "lucide-react";
import { getCoinMarketHref, getTopCoins, MOCK_COINS, type CoinPrice } from "@/lib/coingecko";

export const metadata: Metadata = { title: "Markets — Live Crypto Prices" };

function fmt(price: number): string {
  if (price >= 1000) return "$" + price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1) return "$" + price.toFixed(2);
  return "$" + price.toFixed(4);
}
function fmtCap(cap: number): string {
  if (cap >= 1e12) return "$" + (cap / 1e12).toFixed(2) + "T";
  if (cap >= 1e9) return "$" + (cap / 1e9).toFixed(1) + "B";
  if (cap >= 1e6) return "$" + (cap / 1e6).toFixed(1) + "M";
  return "$" + cap.toLocaleString();
}
function fmtVol(vol: number): string { return fmtCap(vol); }

function SparkLine({ prices }: { prices: number[] }) {
  if (!prices || prices.length < 2) return null;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const w = 80; const h = 30;
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

export default async function MarketsPage() {
  let coins: CoinPrice[] = MOCK_COINS;
  try { coins = await getTopCoins(50); } catch {}

  const gainers = [...coins].filter(c => c.price_change_percentage_24h > 0)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 5);
  const losers = [...coins].filter(c => c.price_change_percentage_24h < 0)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 5);
  const totalMarketCap = coins.reduce((s, c) => s + c.market_cap, 0);
  const totalVolume = coins.reduce((s, c) => s + c.total_volume, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-2" style={{ color: "var(--text-primary)" }}>
          Crypto <span className="gradient-text">Markets</span>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Real-time cryptocurrency prices, market caps, and trading volumes</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { icon: <BarChart2 size={18} />, label: "Total Market Cap", value: fmtCap(totalMarketCap), color: "text-brand-orange" },
          { icon: <Activity size={18} />, label: "24h Volume", value: fmtVol(totalVolume), color: "text-brand-green" },
          { icon: <TrendingUp size={18} />, label: "BTC Dominance", value: "~54%", color: "text-brand-gold" },
          { icon: <DollarSign size={18} />, label: "Active Coins", value: coins.length.toString(), color: "text-white" },
        ].map((s) => (
          <div key={s.label} className="bg-brand-gray-90 border border-brand-gray-85 rounded-xl p-4">
            <div className={`${s.color} mb-1`}>{s.icon}</div>
            <p className="text-brand-gray-50 text-xs mb-1">{s.label}</p>
            <p className={`font-display font-bold text-lg ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Movers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12" id="movers">
        {/* Gainers */}
        <div className="bg-brand-gray-90 border border-brand-gray-85 rounded-xl p-5">
          <h3 className="font-display font-bold text-white text-base mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-brand-green" />Top Gainers (24h)
          </h3>
          <div className="space-y-2">
            {gainers.map((coin) => (
              <div key={coin.id} className="flex items-center gap-3">
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image src={coin.image} alt={coin.name} fill className="rounded-full object-cover" sizes="28px" />
                </div>
                <Link href={getCoinMarketHref(coin)} className="flex-1 min-w-0 hover:opacity-85 transition-opacity">
                  <p className="font-display font-bold text-white text-sm">{coin.symbol.toUpperCase()}</p>
                  <p className="text-brand-gray-50 text-xs">{fmt(coin.current_price)}</p>
                </Link>
                <span className="text-brand-green font-bold text-sm">+{coin.price_change_percentage_24h.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Losers */}
        <div className="bg-brand-gray-90 border border-brand-gray-85 rounded-xl p-5">
          <h3 className="font-display font-bold text-white text-base mb-4 flex items-center gap-2">
            <TrendingDown size={16} className="text-brand-red" />Top Losers (24h)
          </h3>
          <div className="space-y-2">
            {losers.map((coin) => (
              <div key={coin.id} className="flex items-center gap-3">
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image src={coin.image} alt={coin.name} fill className="rounded-full object-cover" sizes="28px" />
                </div>
                <Link href={getCoinMarketHref(coin)} className="flex-1 min-w-0 hover:opacity-85 transition-opacity">
                  <p className="font-display font-bold text-white text-sm">{coin.symbol.toUpperCase()}</p>
                  <p className="text-brand-gray-50 text-xs">{fmt(coin.current_price)}</p>
                </Link>
                <span className="text-brand-red font-bold text-sm">{coin.price_change_percentage_24h.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full table */}
      <div className="bg-brand-gray-90 border border-brand-gray-85 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-brand-gray-85 flex items-center justify-between">
          <h2 className="font-display font-bold text-white text-lg">All Cryptocurrencies</h2>
          <span className="text-brand-gray-50 text-sm">Top {coins.length} by market cap</span>
        </div>

        {/* Table header */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-gray-85 text-brand-gray-50 text-xs">
                <th className="px-4 py-3 text-left w-8">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">24h %</th>
                <th className="px-4 py-3 text-right hidden md:table-cell">Market Cap</th>
                <th className="px-4 py-3 text-right hidden lg:table-cell">Volume (24h)</th>
                <th className="px-4 py-3 text-right hidden xl:table-cell">7d Chart</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => {
                const up = coin.price_change_percentage_24h >= 0;
                return (
                  <tr
                    key={coin.id}
                    className="border-b border-brand-gray-85 last:border-0 hover:bg-brand-gray-85 transition-colors"
                  >
                    <td className="px-4 py-3 text-brand-gray-70 font-bold text-xs">{coin.market_cap_rank}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image src={coin.image} alt={coin.name} fill className="rounded-full object-cover" sizes="32px" />
                        </div>
                        <Link href={getCoinMarketHref(coin)} className="block hover:opacity-85 transition-opacity">
                          <p className="font-display font-bold text-white text-sm">{coin.name}</p>
                          <p className="text-brand-gray-50 text-xs uppercase">{coin.symbol}</p>
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-display font-bold text-white">{fmt(coin.current_price)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-semibold flex items-center justify-end gap-1 ${up ? "price-up" : "price-down"}`}>
                        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {up ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-brand-gray-33 hidden md:table-cell">{fmtCap(coin.market_cap)}</td>
                    <td className="px-4 py-3 text-right text-brand-gray-33 hidden lg:table-cell">{fmtVol(coin.total_volume)}</td>
                    <td className="px-4 py-3 text-right hidden xl:table-cell">
                      <div className="flex justify-end">
                        <SparkLine prices={coin.sparkline_in_7d?.price?.slice(-24) ?? []} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
