"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { fetchMarketData, type CoinPrice } from "@/lib/market-data";

type MarketSidebarWidgetProps = {
  href?: string;
};

export function MarketSidebarWidget({ href = "https://www.coingecko.com/" }: MarketSidebarWidgetProps) {
  const [coins, setCoins] = useState<CoinPrice[]>([]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await fetchMarketData();
        if (active) {
          setCoins(data);
        }
      } catch {
        if (active) {
          setCoins([]);
        }
      }
    };

    void load();
    const intervalId = window.setInterval(load, 60000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "0.5px solid var(--border)",
        borderRadius: "var(--r-lg)",
        padding: "var(--s5)",
      }}
    >
      <div className="t-tag" style={{ color: "var(--text-3)", marginBottom: "var(--s4)" }}>
        MARKET SNAPSHOT
      </div>
      {(coins.length ? coins.slice(0, 4) : Array(4).fill(null)).map((coin, index) => (
        <div
          key={coin ? coin.sym : index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "7px 0",
            borderBottom: "0.5px solid var(--border-subtle)",
          }}
        >
          {coin ? (
            <>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{coin.sym}</span>
              <span style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-2)" }}>
                {coin.price}
              </span>
              <span className={coin.bull ? "bull" : "bear"} style={{ fontSize: 11 }}>
                {coin.bull ? "▲" : "▼"} {coin.chg}
              </span>
            </>
          ) : (
            <div style={{ width: "100%", height: 14, background: "var(--raised)", borderRadius: 4 }} />
          )}
        </div>
      ))}
      <Link
        href={href}
        className="view-all"
        style={{ marginTop: "var(--s3)", display: "flex", fontSize: 11 }}
      >
        View all markets →
      </Link>
    </div>
  );
}
