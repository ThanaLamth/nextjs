"use client";

import { useState } from "react";

function fmt(value: number): string {
  if (!Number.isFinite(value)) return "0";
  if (value >= 1000) return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (value >= 1) return value.toLocaleString("en-US", { maximumFractionDigits: 4 });
  return value.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

interface Props {
  coinName: string;
  coinSymbol: string;
  priceUsd: number;
}

export default function CoinPriceConverter({ coinName, coinSymbol, priceUsd }: Props) {
  const [coinAmount, setCoinAmount] = useState("1");

  const parsedCoinAmount = Number(coinAmount) || 0;
  const usdValue = parsedCoinAmount * priceUsd;

  return (
    <div
      className="rounded-2xl border p-5"
      style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-orange">
        Quick converter
      </p>
      <h3 className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
        {coinSymbol.toUpperCase()} to USD
      </h3>
      <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
        Estimate the U.S. dollar value of a {coinName} position using the latest tracked market price.
      </p>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
          {coinName} amount
        </span>
        <input
          type="number"
          min="0"
          step="any"
          value={coinAmount}
          onChange={(event) => setCoinAmount(event.target.value)}
          className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
        />
      </label>

      <div
        className="mt-4 rounded-xl border px-4 py-3"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Estimated value
        </p>
        <p className="mt-1 font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          ${fmt(usdValue)}
        </p>
        <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
          Based on ${fmt(priceUsd)} per {coinSymbol.toUpperCase()}.
        </p>
      </div>
    </div>
  );
}
