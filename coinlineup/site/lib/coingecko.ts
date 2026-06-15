export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  market_cap_rank: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  sparkline_in_7d?: { price: number[] };
}

const BASE = "https://api.coingecko.com/api/v3";

export async function getTopCoins(limit = 50): Promise<CoinPrice[]> {
  try {
    const res = await fetch(
      `${BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("CoinGecko fetch failed");
    return res.json();
  } catch {
    return MOCK_COINS;
  }
}

export async function getGlobalData() {
  try {
    const res = await fetch(`${BASE}/global`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export function getCoinMarketHref(coin: Pick<CoinPrice, "id"> | string): string {
  const id = typeof coin === "string" ? coin : coin.id;
  return `/markets/${id}`;
}

// Fallback mock data if API fails
export const MOCK_COINS: CoinPrice[] = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 104250, price_change_percentage_24h: 2.34, market_cap: 2060000000000, total_volume: 38000000000, image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png", market_cap_rank: 1, high_24h: 105800, low_24h: 101200, circulating_supply: 19700000 },
  { id: "ethereum", symbol: "eth", name: "Ethereum", current_price: 3820, price_change_percentage_24h: 1.87, market_cap: 459000000000, total_volume: 18000000000, image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png", market_cap_rank: 2, high_24h: 3900, low_24h: 3740, circulating_supply: 120200000 },
  { id: "binancecoin", symbol: "bnb", name: "BNB", current_price: 648, price_change_percentage_24h: -0.52, market_cap: 94000000000, total_volume: 2100000000, image: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png", market_cap_rank: 3, high_24h: 658, low_24h: 641, circulating_supply: 145000000 },
  { id: "solana", symbol: "sol", name: "Solana", current_price: 178, price_change_percentage_24h: 3.21, market_cap: 82000000000, total_volume: 4200000000, image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png", market_cap_rank: 4, high_24h: 182, low_24h: 171, circulating_supply: 460000000 },
  { id: "ripple", symbol: "xrp", name: "XRP", current_price: 2.18, price_change_percentage_24h: -1.43, market_cap: 125000000000, total_volume: 5800000000, image: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png", market_cap_rank: 5, high_24h: 2.24, low_24h: 2.12, circulating_supply: 57000000000 },
  { id: "cardano", symbol: "ada", name: "Cardano", current_price: 0.89, price_change_percentage_24h: 0.75, market_cap: 31000000000, total_volume: 980000000, image: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png", market_cap_rank: 6, high_24h: 0.91, low_24h: 0.87, circulating_supply: 35000000000 },
  { id: "avalanche-2", symbol: "avax", name: "Avalanche", current_price: 38.5, price_change_percentage_24h: 4.12, market_cap: 16000000000, total_volume: 780000000, image: "https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png", market_cap_rank: 7, high_24h: 39.8, low_24h: 36.9, circulating_supply: 415000000 },
  { id: "polkadot", symbol: "dot", name: "Polkadot", current_price: 8.24, price_change_percentage_24h: -0.88, market_cap: 12000000000, total_volume: 340000000, image: "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png", market_cap_rank: 8, high_24h: 8.45, low_24h: 8.10, circulating_supply: 1457000000 },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin", current_price: 0.178, price_change_percentage_24h: 1.92, market_cap: 26000000000, total_volume: 1600000000, image: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png", market_cap_rank: 9, high_24h: 0.182, low_24h: 0.173, circulating_supply: 146000000000 },
  { id: "chainlink", symbol: "link", name: "Chainlink", current_price: 17.8, price_change_percentage_24h: 2.65, market_cap: 11000000000, total_volume: 680000000, image: "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png", market_cap_rank: 10, high_24h: 18.2, low_24h: 17.3, circulating_supply: 618000000 },
];
