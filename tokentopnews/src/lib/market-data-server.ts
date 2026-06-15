import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import {
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

  const points = await fetchCoinChart(coinId, days).catch(() => []);
  return summarizeCoinChart(points, days);
}
