import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Info, Layers3, LineChart, Newspaper } from "lucide-react";
import CoinPriceChart from "@/components/CoinPriceChart";
import CoinPriceConverter from "@/components/CoinPriceConverter";
import NewsCard from "@/components/NewsCard";
import { getCoinDetail, getCoinMarketChart, getTopCoins, MOCK_COINS } from "@/lib/coingecko";
import { searchWordPressContent } from "@/lib/wordpress";

const COIN_META: Record<string, { name: string; symbol: string; description: string }> = {
  bitcoin: { name: "Bitcoin", symbol: "BTC", description: "Track Bitcoin price, market cap, volume, and the latest BTC news and analysis." },
  "bitcoin-markets": { name: "Bitcoin", symbol: "BTC", description: "Track Bitcoin price, market cap, volume, and the latest BTC news and analysis." },
  ethereum: { name: "Ethereum", symbol: "ETH", description: "Track Ethereum price, market cap, volume, and the latest ETH news and analysis." },
  "ethereum-markets": { name: "Ethereum", symbol: "ETH", description: "Track Ethereum price, market cap, volume, and the latest ETH news and analysis." },
  xrp: { name: "XRP", symbol: "XRP", description: "Track XRP price, market cap, volume, and the latest XRP news and analysis." },
};

const COIN_EDITORIAL: Record<string, {
  summary: string;
  pillars: [string, string, string];
  supportedStandards?: string[];
  industries?: string[];
}> = {
  bitcoin: {
    summary:
      "Bitcoin is the largest and most widely followed crypto asset in the market. Readers typically watch it as both a macro risk barometer and the benchmark asset that influences broader sentiment across altcoins, exchange flows, and institutional allocation.",
    pillars: [
      "Bitcoin's price is often driven by ETF flows, macro liquidity conditions, rates expectations, and large exchange or treasury moves.",
      "Its market dominance matters because strong Bitcoin moves often ripple across majors and altcoins, changing risk appetite across the whole crypto market.",
      "Readers should track price, market cap, volume, supply scarcity, and headline catalysts together instead of reading any one metric in isolation.",
    ],
    supportedStandards: ["BRC-20"],
    industries: ["Payment"],
  },
  ethereum: {
    summary:
      "Ethereum is the leading smart-contract network by ecosystem depth and developer activity. Its market profile is shaped not just by price action, but also by network usage, DeFi demand, staking participation, and broader sentiment around onchain applications.",
    pillars: [
      "Ethereum often reacts to network demand, staking flows, ETF or institutional narratives, and risk appetite across the broader altcoin market.",
      "Because ETH sits at the center of many DeFi and token ecosystems, its price often reflects both macro crypto sentiment and application-layer activity.",
      "Readers should watch volume, market cap, supply dynamics, and narrative shifts around Layer 2s, fees, and staking alongside the headline price.",
    ],
    supportedStandards: ["ERC-20", "ERC-721"],
    industries: ["Smart Contracts", "DeFi"],
  },
  ripple: {
    summary:
      "XRP is one of the most closely watched large-cap crypto assets for readers following payments narratives, exchange liquidity, and regulation-sensitive price moves. Its market profile often reacts strongly to headline developments and legal or policy sentiment.",
    pillars: [
      "XRP can move quickly on regulatory headlines, exchange access changes, and renewed attention to cross-border payments narratives.",
      "Its price behavior is often more headline-sensitive than that of some other large-cap assets, which makes news flow especially important.",
      "Readers should pair live price and volume data with legal, exchange, and liquidity context before drawing conclusions from short-term moves.",
    ],
    industries: ["Payments"],
  },
};

interface Props {
  params: Promise<{ coin: string }>;
}

function formatCoinSlug(value: string): string {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => {
      if (part.length <= 4) return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function normalizeCoinId(value: string): string {
  switch (value) {
    case "bitcoin-markets":
      return "bitcoin";
    case "ethereum-markets":
      return "ethereum";
    case "xrp":
      return "ripple";
    default:
      return value;
  }
}

function fmtPrice(price: number): string {
  if (!Number.isFinite(price)) return "$0";
  if (price >= 1000) return "$" + price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1) return "$" + price.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return "$" + price.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

function fmtCompact(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Unavailable";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function fmtSupply(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Unavailable";
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(value);
}

function fmtPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Unavailable";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function formatUpdated(value: string | null | undefined): string {
  if (!value) return "Recently";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function stripHtml(html: string | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function formatUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}

function getLinkAnchor(label: string, url: string, index: number): string {
  const cleaned = formatUrl(url);

  if (label === "Website" || label === "Websites") {
    return cleaned.split("/")[0] ?? cleaned;
  }

  if (label === "Whitepaper" || label === "Whitepapers") {
    return index === 0 ? "Official whitepaper" : `Whitepaper ${index + 1}`;
  }

  if (label === "Block explorer" || label === "Block explorers") {
    return cleaned.split("/")[0] ?? "Block explorer";
  }

  if (label === "Repository" || label === "Repositories") {
    const parts = cleaned.split("/");
    return parts.slice(0, Math.min(parts.length, 3)).join("/");
  }

  if (label === "Community" || label === "Communities") {
    if (cleaned.includes("reddit.com")) return "Reddit community";
    return cleaned.split("/")[0] ?? "Community";
  }

  return cleaned.split("/")[0] ?? cleaned;
}

function getEditorialProfile(id: string, name: string, symbol: string, marketCap: number | undefined, volume: number | undefined) {
  const profile = COIN_EDITORIAL[id];
  if (profile) {
    return profile;
  }

  return {
    summary: `${name} is a tracked crypto asset on CoinLineup. Readers usually evaluate it through a mix of live price action, trading volume, market-cap scale, supply profile, and the reliability of the project's external resources and news flow.`,
    pillars: [
      `${name} is currently being tracked with a market cap of ${fmtCompact(marketCap)} and 24-hour volume of ${fmtCompact(volume)}, which helps frame how large and active the asset is right now.`,
      `Short-term moves in ${symbol} can reflect market-wide risk appetite, exchange liquidity, project-specific headlines, and broader narrative shifts affecting the sector it belongs to.`,
      `Readers should combine live market data, external project resources, and recent editorial coverage before treating any single price move as a durable signal.`,
    ] as [string, string, string],
    supportedStandards: [],
    industries: [],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { coin } = await params;
  const meta = COIN_META[coin];
  const detail = await getCoinDetail(normalizeCoinId(coin));
  const name = detail?.name ?? meta?.name ?? formatCoinSlug(coin);
  const detailDescription = stripHtml(detail?.description?.en).slice(0, 155);
  const description = meta?.description
    ? meta.description
    : detailDescription || `Track ${name} price, market cap, volume, and key market data on CoinLineup.`;

  return {
    title: `${name} Price & Analysis — CoinLineup`,
    description,
  };
}

export default async function CoinPage({ params }: Props) {
  const { coin } = await params;
  const meta = COIN_META[coin];
  const normalizedCoinId = normalizeCoinId(coin);

  const [detail, chart24h, chart7d, chart30d, topCoinsResult] = await Promise.all([
    getCoinDetail(normalizedCoinId),
    getCoinMarketChart(normalizedCoinId, 1),
    getCoinMarketChart(normalizedCoinId, 7),
    getCoinMarketChart(normalizedCoinId, 30),
    getTopCoins(20).catch(() => MOCK_COINS),
  ]);

  const topCoins = topCoinsResult;
  const fallbackCoin = topCoins.find(
    (item) => item.id.toLowerCase() === normalizedCoinId.toLowerCase() || item.symbol.toLowerCase() === (meta?.symbol ?? coin).toLowerCase()
  );

  const name = detail?.name ?? fallbackCoin?.name ?? meta?.name ?? formatCoinSlug(coin);
  const symbol = (detail?.symbol ?? fallbackCoin?.symbol ?? meta?.symbol ?? coin).toUpperCase();
  const image =
    detail?.image?.large ??
    detail?.image?.small ??
    fallbackCoin?.image ??
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' rx='24' fill='%231A1A1A'/%3E%3Ctext x='50%25' y='54%25' text-anchor='middle' font-size='24' fill='%23F7931A' font-family='Arial'%3E%24%3C/text%3E%3C/svg%3E";

  const marketData = detail?.market_data;
  const currentPrice = marketData?.current_price?.usd ?? fallbackCoin?.current_price ?? 0;
  const dayChange = marketData?.price_change_percentage_24h ?? fallbackCoin?.price_change_percentage_24h ?? 0;
  const positive = dayChange >= 0;
  const marketCap = marketData?.market_cap?.usd ?? fallbackCoin?.market_cap;
  const fdv = marketData?.fully_diluted_valuation?.usd ?? null;
  const volume = marketData?.total_volume?.usd ?? fallbackCoin?.total_volume;
  const high24h = marketData?.high_24h?.usd ?? fallbackCoin?.high_24h;
  const low24h = marketData?.low_24h?.usd ?? fallbackCoin?.low_24h;
  const supply = marketData?.circulating_supply ?? fallbackCoin?.circulating_supply;
  const totalSupply = marketData?.total_supply ?? fallbackCoin?.total_supply ?? null;
  const maxSupply = marketData?.max_supply ?? fallbackCoin?.max_supply ?? null;
  const ath = marketData?.ath?.usd ?? fallbackCoin?.ath;
  const athDrop = marketData?.ath_change_percentage?.usd ?? fallbackCoin?.ath_change_percentage;
  const atl = marketData?.atl?.usd ?? fallbackCoin?.atl;
  const atlLift = marketData?.atl_change_percentage?.usd ?? fallbackCoin?.atl_change_percentage;
  const lastUpdated = marketData?.last_updated ?? fallbackCoin?.last_updated;
  const editorial = getEditorialProfile(normalizedCoinId, name, symbol, marketCap, volume);
  const chartDatasets = {
    "24h": chart24h?.prices.map((point) => point[1]) ?? [],
    "7d": chart7d?.prices.map((point) => point[1]) ?? marketData?.sparkline_7d?.price ?? fallbackCoin?.sparkline_in_7d?.price ?? [],
    "30d": chart30d?.prices.map((point) => point[1]) ?? [],
  };

  const description = stripHtml(detail?.description?.en);
  const lead =
    description ||
    meta?.description ||
    `Track ${name} with live market pricing, supply metrics, and reference resources for quick research on CoinLineup.`;
  const paragraphs = lead.match(/[^.!?]+[.!?]+/g)?.slice(0, 3) ?? [lead];

  const websites = detail?.links?.homepage?.filter(Boolean) ?? [];
  const whitepapers = detail?.links?.whitepaper ? [detail.links.whitepaper] : [];
  const explorers = detail?.links?.blockchain_site?.filter(Boolean) ?? [];
  const githubs = detail?.links?.repos_url?.github?.filter(Boolean) ?? [];
  const communities = [
    detail?.links?.subreddit_url,
    ...(detail?.links?.official_forum_url ?? []),
  ].filter((link): link is string => !!link);

  const infoSections = [
    { label: websites.length > 1 ? "Websites" : "Website", values: websites },
    { label: whitepapers.length > 1 ? "Whitepapers" : "Whitepaper", values: whitepapers },
    { label: explorers.length > 1 ? "Block explorers" : "Block explorer", values: explorers },
    { label: githubs.length > 1 ? "Repositories" : "Repository", values: githubs },
    { label: communities.length > 1 ? "Communities" : "Community", values: communities },
    { label: "Hashing algorithm", values: detail?.hashing_algorithm ? [detail.hashing_algorithm] : [] },
    { label: "Supported standards", values: editorial.supportedStandards ?? [] },
    { label: "Industries", values: editorial.industries ?? [] },
  ].filter((section) => section.values.length > 0);

  const relatedCoins = topCoins.filter((item) => item.id !== (fallbackCoin?.id ?? normalizedCoinId)).slice(0, 4);
  const newsQueries = [...new Set([name, symbol].filter(Boolean))];
  const relatedNewsRaw = (
    await Promise.all(newsQueries.map((query) => searchWordPressContent(query, 6).catch(() => [])))
  ).flat();
  const relatedNews = relatedNewsRaw
    .filter((article) => article.category !== "Page")
    .filter((article, index, array) => array.findIndex((candidate) => candidate.id === article.id) === index)
    .slice(0, 4);

  const stats = [
    { label: "Market cap", value: fmtCompact(marketCap) },
    { label: "Fully diluted valuation", value: fmtCompact(fdv) },
    { label: "24h trading volume", value: fmtCompact(volume) },
    { label: "24h range", value: high24h && low24h ? `${fmtPrice(low24h)} - ${fmtPrice(high24h)}` : "Unavailable" },
    { label: "Circulating supply", value: supply ? `${fmtSupply(supply)} ${symbol}` : "Unavailable" },
    { label: "Max supply", value: maxSupply ? `${fmtSupply(maxSupply)} ${symbol}` : "Unavailable" },
    { label: "All-time high", value: ath ? `${fmtPrice(ath)} (${fmtPercent(athDrop)})` : "Unavailable" },
    { label: "All-time low", value: atl ? `${fmtPrice(atl)} (${fmtPercent(atlLift)})` : "Unavailable" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
        <Link href="/markets" className="hover:text-brand-orange">Markets</Link>
        <span>/</span>
        <span style={{ color: "var(--text-secondary)" }}>{name}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.75fr)]">
        <div className="space-y-6">
          <div className="rounded-3xl border p-6 md:p-8" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl">
                  <Image src={image} alt={name} fill className="object-cover" sizes="56px" />
                </div>
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-orange">
                      {symbol}
                    </span>
                    {detail?.market_cap_rank || fallbackCoin?.market_cap_rank ? (
                      <span className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                        Rank #{detail?.market_cap_rank ?? fallbackCoin?.market_cap_rank}
                      </span>
                    ) : null}
                  </div>
                  <h1 className="font-display text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {name} price
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                    {meta?.description ?? paragraphs[0]}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border px-5 py-4 md:min-w-[260px]" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  Live price
                </p>
                <p className="mt-2 font-display text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {fmtPrice(currentPrice)}
                </p>
                <p className={`mt-2 text-sm font-semibold ${positive ? "price-up" : "price-down"}`}>
                  {fmtPercent(dayChange)} in the last 24 hours
                </p>
                <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                  Updated {formatUpdated(lastUpdated)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { href: "#overview", label: "Overview", icon: <Info size={14} /> },
                { href: "#market-stats", label: "Market stats", icon: <LineChart size={14} /> },
                { href: "#about", label: "About", icon: <Layers3 size={14} /> },
                { href: "#faq", label: "FAQ", icon: <Newspaper size={14} /> },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold hover:border-brand-orange hover:text-brand-orange"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <CoinPriceChart datasets={chartDatasets} />

          <section id="market-stats" className="rounded-3xl border p-6 md:p-8" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Market stats</p>
                <h2 className="font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  Key metrics for {name}
                </h2>
              </div>
              <span className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                Source: CoinGecko
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="overview" className="rounded-3xl border p-6 md:p-8" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Overview</p>
            <h2 className="mt-2 font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              {name} at a glance
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
              <div className="space-y-4 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                {[editorial.summary, ...paragraphs.slice(0, 2)].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Quick facts</p>
                <div className="mt-4 space-y-3 text-sm">
                  {[
                    { label: "Symbol", value: symbol },
                    { label: "Genesis date", value: detail?.genesis_date ?? "Unavailable" },
                    { label: "Hashing algorithm", value: detail?.hashing_algorithm ?? "Unavailable" },
                    {
                      label: "Categories",
                      value: detail?.categories?.filter(Boolean).slice(0, 3).join(", ") || "Unavailable",
                    },
                    { label: "Total supply", value: totalSupply ? `${fmtSupply(totalSupply)} ${symbol}` : "Unavailable" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-3 border-b pb-3 last:border-0 last:pb-0" style={{ borderColor: "var(--border)" }}>
                      <span style={{ color: "var(--text-muted)" }}>{item.label}</span>
                      <span className="text-right font-semibold" style={{ color: "var(--text-primary)" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="rounded-3xl border p-6 md:p-8" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">About</p>
            <h2 className="mt-2 font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              What readers should know about {name}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  title: "Price action",
                  text: `${name} is currently trading at ${fmtPrice(currentPrice)}, with a 24-hour move of ${fmtPercent(dayChange)}.`,
                },
                {
                  title: "Market depth",
                  text: editorial.pillars[0],
                },
                {
                  title: "Supply profile",
                  text: supply ? `Current circulating supply is about ${fmtSupply(supply)} ${symbol}${maxSupply ? ` with a max supply of ${fmtSupply(maxSupply)} ${symbol}.` : "."}` : editorial.pillars[2],
                },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <h3 className="font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border p-6 md:p-8" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Related news</p>
            <h2 className="mt-2 font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Recent coverage mentioning {name}
            </h2>
            {relatedNews.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {relatedNews.map((article, index) => (
                  <NewsCard key={article.id} article={article} variant="horizontal" index={index} />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                CoinLineup does not have enough related editorial coverage for this asset yet.
              </p>
            )}
          </section>

          <section id="faq" className="rounded-3xl border p-6 md:p-8" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">FAQ</p>
            <h2 className="mt-2 font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Common questions about {name}
            </h2>
            <div className="mt-5 space-y-4">
              {[
                {
                  q: `What is the current ${name} price?`,
                  a: `${name} is currently trading around ${fmtPrice(currentPrice)} based on the latest market snapshot available to CoinLineup.`,
                },
                {
                  q: `How much volume is ${name} trading?`,
                  a: `The tracked 24-hour volume is about ${fmtCompact(volume)}. High volume usually means stronger short-term market activity.`,
                },
                {
                  q: `Where can I research ${name} further?`,
                  a: `Use the official links, explorer references, and methodology notes on this page, then compare them against broader market news and primary project sources.`,
                },
              ].map((item) => (
                <div key={item.q} className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <h3 className="font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    {item.q}
                  </h3>
                  <p className="mt-2 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <CoinPriceConverter coinName={name} coinSymbol={symbol} priceUsd={currentPrice} />

          <section id="resources" className="rounded-2xl border p-5" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Resources & Information</p>
            <h2 className="mt-2 font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              {name} resources
            </h2>
            <div className="mt-5 overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)" }}>
              {infoSections.map((section) => (
                <div key={section.label} className="grid grid-cols-1 border-b last:border-0 px-4 py-4 sm:grid-cols-[140px_1fr]" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                    {section.label}
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-2 sm:mt-0">
                    {section.values.map((value, i) => {
                      const isLink = value.startsWith("http://") || value.startsWith("https://");
                      return isLink ? (
                        <a
                          key={`${value}-${i}`}
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-orange hover:underline"
                        >
                          {getLinkAnchor(section.label, value, i)}
                          <ExternalLink size={12} className="opacity-50" />
                        </a>
                      ) : (
                        <span key={`${value}-${i}`} className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          {value}
                        </span>
                      );
                    })}
                  </dd>
                </div>
              ))}
            </div>
          </section>

          <div className="rounded-2xl border p-5" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Related markets</p>
            <div className="mt-4 space-y-3">
              {relatedCoins.map((item) => (
                <Link
                  key={item.id}
                  href={`/markets/${item.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border px-4 py-3 hover:border-brand-orange"
                  style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                >
                  <div>
                    <p className="font-display font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                      {item.name}
                    </p>
                    <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      {item.symbol}
                    </p>
                  </div>
                  <span className={`text-sm font-semibold ${item.price_change_percentage_24h >= 0 ? "price-up" : "price-down"}`}>
                    {fmtPercent(item.price_change_percentage_24h)}
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/markets" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
              View all markets <ArrowRight size={14} />
            </Link>
          </div>

          <div className="rounded-2xl border p-5" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Editorial note</p>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
              CoinLineup uses public market data feeds for these pages. Prices, supply figures, and rankings can move quickly, so use this page as a live snapshot rather than a final trading or investment decision document.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
