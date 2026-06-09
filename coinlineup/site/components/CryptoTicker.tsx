"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TickerCoin {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const MOCK_TICKER: TickerCoin[] = [
  { id: "bitcoin", symbol: "BTC", current_price: 104250, price_change_percentage_24h: 2.34 },
  { id: "ethereum", symbol: "ETH", current_price: 3820, price_change_percentage_24h: 1.87 },
  { id: "binancecoin", symbol: "BNB", current_price: 648, price_change_percentage_24h: -0.52 },
  { id: "solana", symbol: "SOL", current_price: 178, price_change_percentage_24h: 3.21 },
  { id: "ripple", symbol: "XRP", current_price: 2.18, price_change_percentage_24h: -1.43 },
  { id: "cardano", symbol: "ADA", current_price: 0.89, price_change_percentage_24h: 0.75 },
  { id: "avalanche-2", symbol: "AVAX", current_price: 38.5, price_change_percentage_24h: 4.12 },
  { id: "polkadot", symbol: "DOT", current_price: 8.24, price_change_percentage_24h: -0.88 },
  { id: "dogecoin", symbol: "DOGE", current_price: 0.178, price_change_percentage_24h: 1.92 },
  { id: "chainlink", symbol: "LINK", current_price: 17.8, price_change_percentage_24h: 2.65 },
  { id: "uniswap", symbol: "UNI", current_price: 12.4, price_change_percentage_24h: -0.34 },
  { id: "litecoin", symbol: "LTC", current_price: 88.5, price_change_percentage_24h: 1.12 },
];

function fmt(price: number): string {
  if (price >= 1000) return "$" + price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1) return "$" + price.toFixed(2);
  return "$" + price.toFixed(4);
}

export default function CryptoTicker() {
  const [coins, setCoins] = useState<TickerCoin[]>(MOCK_TICKER);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
    )
      .then((r) => r.json())
      .then((data: Array<{ id: string; symbol: string; current_price: number; price_change_percentage_24h: number }>) => {
        if (Array.isArray(data) && data.length > 0) {
          setCoins(data.map((c) => ({
            id: c.id,
            symbol: c.symbol.toUpperCase(),
            current_price: c.current_price,
            price_change_percentage_24h: c.price_change_percentage_24h,
          })));
        }
      })
      .catch(() => {});
  }, []);

  const doubled = [...coins, ...coins];

  return (
    <div
      className="h-9 flex items-center overflow-hidden relative z-50 border-b text-xs"
      style={{ background: "var(--ticker-bg)", borderColor: "var(--border)" }}
    >
      {/* Live label */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 bg-brand-orange h-full z-10">
        <span className="text-white font-display font-bold text-xs tracking-wider uppercase">Live</span>
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      </div>

      {/* Scrolling strip */}
      <div
        className="ticker-wrap flex-1"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="ticker-track" style={{ animationPlayState: paused ? "paused" : "running" }}>
          {doubled.map((coin, i) => {
            const up = coin.price_change_percentage_24h >= 0;
            return (
              <span key={`${coin.id}-${i}`} className="inline-flex items-center gap-2 px-5 cursor-default select-none">
                <span className="font-display font-bold" style={{ color: "var(--text-primary)" }}>
                  {coin.symbol}
                </span>
                <span style={{ color: "var(--text-muted)" }}>{fmt(coin.current_price)}</span>
                <span className={`inline-flex items-center gap-0.5 font-semibold ${up ? "price-up" : "price-down"}`}>
                  {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {up ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
                </span>
                <span style={{ color: "var(--border-hover)" }}>·</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Fade edge */}
      <div
        className="absolute right-0 top-0 h-full w-12 pointer-events-none"
        style={{ background: `linear-gradient(to left, var(--ticker-bg), transparent)` }}
      />
    </div>
  );
}
