"use client";

import { useState } from "react";

type RangeKey = "24h" | "7d" | "30d";

interface Props {
  datasets: Record<RangeKey, number[]>;
}

function fmtPrice(price: number): string {
  if (!Number.isFinite(price)) return "$0";
  if (price >= 1000) return "$" + price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1) return "$" + price.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return "$" + price.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export default function CoinPriceChart({ datasets }: Props) {
  const [range, setRange] = useState<RangeKey>("7d");
  const prices = datasets[range] ?? [];

  if (!prices.length) {
    return (
      <div className="rounded-2xl border p-5" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Chart data is loading.
        </p>
      </div>
    );
  }

  const width = 720;
  const height = 240;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const rangeSpan = max - min || 1;
  const positive = prices[prices.length - 1] >= prices[0];
  const color = positive ? "#00A86B" : "#E63946";
  const points = prices
    .map((price, index) => {
      const x = (index / (prices.length - 1)) * width;
      const y = height - ((price - min) / rangeSpan) * (height - 12) - 6;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `${points} ${width},${height} 0,${height}`;

  return (
    <div className="rounded-2xl border p-5" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Price trend</p>
          <h2 className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Interactive market snapshot
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "24h", label: "24H" },
            { key: "7d", label: "7D" },
            { key: "30d", label: "30D" },
          ].map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setRange(option.key as RangeKey)}
              className="rounded-full border px-3 py-1 text-xs font-semibold transition-colors"
              style={range === option.key
                ? { background: "#F7931A", borderColor: "#F7931A", color: "#FFFFFF" }
                : { borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--surface)" }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="coin-range-area-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#coin-range-area-fill)" />
        <polyline fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />
      </svg>

      <div className="mt-4 flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
        <span>Low: {fmtPrice(min)}</span>
        <span>High: {fmtPrice(max)}</span>
      </div>
    </div>
  );
}
