const BASE = "https://api.coingecko.com/api/v3";
const TRACKED_IDS = "bitcoin,ethereum,solana,ripple,cardano,binancecoin";

export type CoinPrice = {
  id: string;
  sym: string;
  name: string;
  price: string;
  chg: string;
  bull: boolean;
  color: string;
  high24h: string;
  low24h: string;
  image: string;
};

export type CoinChartSnapshot = {
  price: string;
  chg: string;
  bull: boolean;
  high: string;
  low: string;
  line: string;
  area: string;
  points: CoinChartPoint[];
};

export type CoinChartPoint = {
  x: number;
  y: number;
  price: string;
  label: string;
};

const META: Record<string, { sym: string; name: string; color: string }> = {
  bitcoin: { sym: "BTC", name: "Bitcoin", color: "#F7931A" },
  ethereum: { sym: "ETH", name: "Ethereum", color: "#627EEA" },
  solana: { sym: "SOL", name: "Solana", color: "#9945FF" },
  ripple: { sym: "XRP", name: "XRP", color: "#0089CC" },
  cardano: { sym: "ADA", name: "Cardano", color: "#0033AD" },
  binancecoin: { sym: "BNB", name: "BNB", color: "#F3BA2F" },
};

export function formatUsd(value: number) {
  if (value >= 1000) {
    return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  }

  if (value >= 1) {
    return `$${value.toFixed(2)}`;
  }

  return `$${value.toFixed(4)}`;
}

export async function fetchMarketData(): Promise<CoinPrice[]> {
  const response = await fetch(
    `${BASE}/coins/markets?vs_currency=usd&ids=${TRACKED_IDS}&order=market_cap_desc&per_page=6&sparkline=false`,
  );

  if (!response.ok) {
    throw new Error("CoinGecko fetch failed");
  }

  const data = (await response.json()) as Array<Record<string, unknown>>;

  return data.map((coin) => {
    const id = String(coin.id ?? "");
    const meta = META[id] ?? {
      sym: String(coin.symbol ?? "").toUpperCase(),
      name: String(coin.name ?? ""),
      color: "#888",
    };
    const change = Number(coin.price_change_percentage_24h ?? 0);

    return {
      id,
      sym: meta.sym,
      name: meta.name,
      color: meta.color,
      image: String(coin.image ?? ""),
      price: formatUsd(Number(coin.current_price ?? 0)),
      chg: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
      bull: change >= 0,
      high24h: formatUsd(Number(coin.high_24h ?? 0)),
      low24h: formatUsd(Number(coin.low_24h ?? 0)),
    };
  });
}

export async function fetchCoinChart(
  coinId: string,
  days: string,
): Promise<[number, number][]> {
  if (days === "365") {
    const now = Math.floor(Date.now() / 1000);
    return fetchCoinChartRange(coinId, now - 365 * 24 * 60 * 60, now);
  }

  if (days === "max") {
    return fetchCoinChartFiveYearRange(coinId);
  }

  const response = await fetch(
    `${BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
  );

  if (!response.ok) {
    throw new Error("Chart fetch failed");
  }

  const data = (await response.json()) as { prices: [number, number][] };
  return data.prices;
}

async function fetchCoinChartRange(
  coinId: string,
  from: number,
  to: number,
): Promise<[number, number][]> {
  const response = await fetch(
    `${BASE}/coins/${coinId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
  );

  if (!response.ok) {
    throw new Error("Chart range fetch failed");
  }

  const data = (await response.json()) as { prices: [number, number][] };
  return data.prices;
}

async function fetchCoinChartFiveYearRange(coinId: string): Promise<[number, number][]> {
  const now = Math.floor(Date.now() / 1000);
  const year = 365 * 24 * 60 * 60;
  const segments: Array<Promise<[number, number][]>> = [];

  for (let index = 5; index > 0; index -= 1) {
    const from = now - index * year;
    const to = index === 1 ? now : now - (index - 1) * year;
    segments.push(fetchCoinChartRange(coinId, from, to));
  }

  const results = await Promise.all(segments);
  const merged: [number, number][] = [];

  for (const segment of results) {
    for (const point of segment) {
      const previous = merged[merged.length - 1];

      if (previous && previous[0] === point[0]) {
        continue;
      }

      merged.push(point);
    }
  }

  return merged;
}

export async function fetchBitcoinBinanceChart(days: string): Promise<[number, number][]> {
  const config =
    days === "365"
      ? { interval: "1d", limit: 365 }
      : days === "max"
        ? { interval: "1w", limit: 1000 }
        : null;

  if (!config) {
    throw new Error("Unsupported Binance chart range");
  }

  const response = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${config.interval}&limit=${config.limit}`,
  );

  if (!response.ok) {
    throw new Error("Binance chart fetch failed");
  }

  const data = (await response.json()) as Array<
    [number, string, string, string, string, string, number, string, number, string, string, string]
  >;

  return data.map((row) => [row[0], Number(row[4])]);
}

export function chartToSvgPath(
  points: [number, number][],
  width = 400,
  height = 100,
): { line: string; area: string } {
  const projected = projectChartPoints(points, width, height);

  if (!projected.length) {
    return { line: "", area: "" };
  }

  const coordinates = projected.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`);
  const line = `M${coordinates.join(" L")}`;
  const area = `${line} L${width},${height} L0,${height} Z`;

  return { line, area };
}

function downsampleChartPoints(points: [number, number][], maxPoints = 120): [number, number][] {
  if (points.length <= maxPoints) {
    return points;
  }

  const sampled: [number, number][] = [];
  const lastIndex = points.length - 1;

  for (let index = 0; index < maxPoints; index += 1) {
    const sourceIndex = Math.round((index / (maxPoints - 1)) * lastIndex);
    sampled.push(points[sourceIndex]);
  }

  return sampled;
}

function formatPointLabel(timestamp: number, days: string): string {
  const date = new Date(timestamp);

  if (days === "1") {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    });
  }

  if (days === "7" || days === "30") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function projectChartPoints(
  points: [number, number][],
  width = 400,
  height = 100,
): Array<{ x: number; y: number }> {
  if (!points.length) {
    return [];
  }

  const prices = points.map((point) => point[1]);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const lastIndex = points.length - 1 || 1;

  return points.map((point, index) => ({
    x: (index / lastIndex) * width,
    y: height - ((point[1] - min) / range) * (height * 0.85) - height * 0.05,
  }));
}

export function summarizeCoinChart(points: [number, number][], days = "1"): CoinChartSnapshot {
  const sampledPoints = downsampleChartPoints(points);
  const { line, area } = chartToSvgPath(sampledPoints);

  if (!points.length) {
    return {
      price: "—",
      chg: "—",
      bull: false,
      high: "—",
      low: "—",
      line,
      area,
      points: [],
    };
  }

  const prices = points.map((point) => point[1]);
  const start = prices[0];
  const end = prices[prices.length - 1];
  const change = start ? ((end - start) / start) * 100 : 0;
  const projectedPoints = projectChartPoints(sampledPoints);

  return {
    price: formatUsd(end),
    chg: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
    bull: change >= 0,
    high: formatUsd(Math.max(...prices)),
    low: formatUsd(Math.min(...prices)),
    line,
    area,
    points: sampledPoints.map((point, index) => ({
      x: projectedPoints[index]?.x ?? 0,
      y: projectedPoints[index]?.y ?? 0,
      price: formatUsd(point[1]),
      label: formatPointLabel(point[0], days),
    })),
  };
}
