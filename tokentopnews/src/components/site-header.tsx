import { SiteHeaderClient } from "@/components/site-header-client";
import { getCachedHeaderTickerData } from "@/lib/market-data-server";
import type { NavItemData } from "@/lib/site-ui";

const NAV_ITEMS: NavItemData[] = [
  {
    label: "INSIGHTS",
    href: "/category/insights",
    sub: [
      { label: "Liquidity Analysis", href: "/category/insights/liquidity" },
      { label: "Institutional", href: "/category/insights/institutional" },
      { label: "On-Chain Data", href: "/category/insights/on-chain" },
    ],
  },
  {
    label: "TRENDS",
    href: "/category/trends",
    sub: [
      { label: "AI & Crypto", href: "/category/trends/ai-crypto" },
      { label: "DeFi", href: "/category/trends/defi" },
      { label: "Memecoins", href: "/category/trends/memecoins" },
    ],
  },
  {
    label: "NARRATIVES",
    href: "/category/narratives",
    sub: [
      { label: "Bitcoin Cycle", href: "/category/narratives/bitcoin-cycle" },
      { label: "Ethereum Ecosystem", href: "/category/narratives/ethereum-ecosystem" },
      { label: "Altcoin Season", href: "/category/narratives/altcoin-season" },
      { label: "Cross-Market", href: "/category/narratives/cross-market" },
    ],
  },
  {
    label: "MACRO",
    href: "/category/macro",
    sub: [
      { label: "Fed & Rates", href: "/category/macro/fed" },
      { label: "Global Liquidity", href: "/category/macro/global-liquidity" },
      { label: "Regulation", href: "/category/macro/regulation" },
      { label: "Crypto Macro", href: "/category/macro/crypto-macro" },
    ],
  },
  {
    label: "WEEKLY RECAP",
    href: "/category/weekly-recap",
    sub: [{ label: "Top Stories", href: "/category/weekly-recap/top-stories" }],
  },
  {
    label: "SPONSORED",
    href: "/category/sponsored",
    sub: [{ label: "CMC", href: "/cmc" }],
  },
  {
    label: "PRESS RELEASE",
    href: "/category/press",
  },
];

export async function SiteHeader() {
  const initialTicker = await getCachedHeaderTickerData();

  return (
    <SiteHeaderClient
      siteName="TokenTopNews"
      navItems={NAV_ITEMS}
      initialTicker={initialTicker}
    />
  );
}
