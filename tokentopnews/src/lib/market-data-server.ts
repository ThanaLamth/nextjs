import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import {
  fetchBitcoinBinanceChart,
  fetchCoinChart,
  fetchMarketData,
  summarizeCoinChart,
  type CoinChartSnapshot,
  type CoinPrice,
} from "@/lib/market-data";

export async function getCachedHeaderTickerData(): Promise<CoinPrice[]> {
  "use cache";

  cacheLife("minutes");
  cacheTag("markets");

  return fetchMarketData().catch(() => []);
}

export async function getCachedCoinChartSnapshot(
  coinId: string,
  days: string,
): Promise<CoinChartSnapshot> {
  "use cache";

  cacheLife("minutes");
  cacheTag("markets");
  cacheTag(`market-chart:${coinId}:${days}`);

  let points = await fetchCoinChart(coinId, days).catch(() => []);

  if (!points.length && coinId === "bitcoin" && (days === "365" || days === "max")) {
    points = await fetchBitcoinBinanceChart(days).catch(() => []);
  }

  return summarizeCoinChart(points, days);
}
