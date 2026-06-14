import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { fetchMarketData, type CoinPrice } from "@/lib/market-data";

export async function getCachedHeaderTickerData(): Promise<CoinPrice[]> {
  "use cache";

  cacheLife("minutes");
  cacheTag("markets");

  return fetchMarketData().catch(() => []);
}
