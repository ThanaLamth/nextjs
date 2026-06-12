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

const META: Record<string, { sym: string; name: string; color: string }> = {
  bitcoin: { sym: "BTC", name: "Bitcoin", color: "#F7931A" },
  ethereum: { sym: "ETH", name: "Ethereum", color: "#627EEA" },
  solana: { sym: "SOL", name: "Solana", color: "#9945FF" },
  ripple: { sym: "XRP", name: "XRP", color: "#0089CC" },
  cardano: { sym: "ADA", name: "Cardano", color: "#0033AD" },
  binancecoin: { sym: "BNB", name: "BNB", color: "#F3BA2F" },
};

function formatUsd(value: number) {
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
  const response = await fetch(
    `${BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
  );

  if (!response.ok) {
    throw new Error("Chart fetch failed");
  }

  const data = (await response.json()) as { prices: [number, number][] };
  return data.prices;
}

export function chartToSvgPath(
  points: [number, number][],
  width = 400,
  height = 100,
): { line: string; area: string } {
  if (!points.length) {
    return { line: "", area: "" };
  }

  const prices = points.map((point) => point[1]);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const xs = points.map((_, index) => (index / (points.length - 1)) * width);
  const ys = prices.map(
    (price) => height - ((price - min) / range) * (height * 0.85) - height * 0.05,
  );
  const coordinates = xs.map((x, index) => `${x.toFixed(1)},${ys[index].toFixed(1)}`);
  const line = `M${coordinates.join(" L")}`;
  const area = `${line} L${width},${height} L0,${height} Z`;

  return { line, area };
}
