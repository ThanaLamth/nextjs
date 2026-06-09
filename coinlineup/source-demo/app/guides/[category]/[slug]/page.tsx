import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Clock, BookOpen, ArrowRight,
  Bitcoin, CreditCard, Palette, Link2, Wallet,
  Trophy, Cpu, FileText, Scale, HardDrive, Key,
  TrendingUp, BarChart2, Shield, Zap, Layers, Leaf,
  Lock, AlertTriangle,
} from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

interface GuideEntry {
  slug: string;
  title: string;
  time: string;
  level: string;
  icon: React.ReactNode;
  excerpt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  "crypto-basics": "Crypto Basics",
  bitcoin: "Bitcoin",
  blockchain: "Blockchain",
  wallets: "Wallets",
  "crypto-trading": "Crypto Trading",
  defi: "DeFi",
  security: "Security",
};

const ALL_GUIDES: Record<string, GuideEntry[]> = {
  "crypto-basics": [
    { slug: "what-is-cryptocurrency", title: "What is Cryptocurrency? Complete Guide", time: "10 min", level: "Beginner", icon: <Bitcoin size={22} />, excerpt: "A complete introduction to digital currencies, how they work, and why they matter in the modern financial system." },
    { slug: "how-to-buy-cryptocurrency", title: "How to Buy Cryptocurrency: Step-by-Step", time: "8 min", level: "Beginner", icon: <CreditCard size={22} />, excerpt: "Learn how to purchase your first cryptocurrency safely using exchanges, wallets, and payment methods." },
    { slug: "nfts-explained", title: "NFTs Explained: What They Are and How They Work", time: "8 min", level: "Beginner", icon: <Palette size={22} />, excerpt: "A plain-English explanation of non-fungible tokens, digital ownership, and why they have value." },
    { slug: "how-blockchain-works", title: "How Blockchain Works", time: "8 min", level: "Beginner", icon: <Link2 size={22} />, excerpt: "Understand the distributed ledger technology that powers Bitcoin, Ethereum, and thousands of other projects." },
    { slug: "setting-up-crypto-wallet", title: "Setting Up Your First Crypto Wallet", time: "6 min", level: "Beginner", icon: <Wallet size={22} />, excerpt: "Step-by-step guide to creating, securing, and backing up your first non-custodial cryptocurrency wallet." },
  ],
  bitcoin: [
    { slug: "what-is-bitcoin", title: "What is Bitcoin? A Complete Beginner's Guide", time: "12 min", level: "Beginner", icon: <Bitcoin size={22} />, excerpt: "Everything you need to know about Bitcoin — the world's first and most valuable decentralized digital currency." },
    { slug: "bitcoin-vs-gold", title: "Bitcoin vs Gold: Store of Value Comparison", time: "8 min", level: "Intermediate", icon: <Trophy size={22} />, excerpt: "An in-depth comparison of Bitcoin and gold as long-term stores of value, covering scarcity, portability, and institutional adoption." },
    { slug: "how-bitcoin-mining-works", title: "How Bitcoin Mining Works", time: "10 min", level: "Intermediate", icon: <Cpu size={22} />, excerpt: "A clear explanation of the proof-of-work mechanism, miners, hash rate, and why mining secures the Bitcoin network." },
  ],
  blockchain: [
    { slug: "blockchain-technology-explained", title: "Blockchain Technology Explained", time: "15 min", level: "Beginner", icon: <Link2 size={22} />, excerpt: "Learn how distributed ledgers, consensus mechanisms, and cryptographic hashing combine to create trustless systems." },
    { slug: "smart-contracts-explained", title: "Smart Contracts: How They Work", time: "10 min", level: "Intermediate", icon: <FileText size={22} />, excerpt: "Understand self-executing contracts on the blockchain, their use cases, and how they eliminate intermediaries." },
    { slug: "proof-of-work-vs-proof-of-stake", title: "Proof of Work vs Proof of Stake", time: "12 min", level: "Intermediate", icon: <Scale size={22} />, excerpt: "A deep dive into the two leading consensus algorithms powering modern blockchains, their trade-offs, and environmental impact." },
  ],
  wallets: [
    { slug: "hot-vs-cold-wallets", title: "Hot vs Cold Wallets: Which to Choose", time: "8 min", level: "Beginner", icon: <Wallet size={22} />, excerpt: "Compare software and hardware wallets to understand which storage method fits your crypto holdings and security needs." },
    { slug: "hardware-wallets-setup", title: "Hardware Wallets: Complete Setup Guide", time: "15 min", level: "Beginner", icon: <HardDrive size={22} />, excerpt: "Step-by-step instructions to set up a hardware wallet, create a PIN, and safely store your recovery phrase." },
    { slug: "seed-phrases-safety", title: "Seed Phrases: How to Stay Safe", time: "6 min", level: "Beginner", icon: <Key size={22} />, excerpt: "Everything you need to know about recovery phrases — how they work, why they matter, and how to protect them." },
  ],
  "crypto-trading": [
    { slug: "reading-crypto-charts", title: "Trading Basics: Reading Crypto Charts", time: "20 min", level: "Intermediate", icon: <TrendingUp size={22} />, excerpt: "Learn to read candlestick charts, identify support and resistance levels, and understand basic trading patterns." },
    { slug: "technical-analysis-crypto", title: "Technical Analysis for Crypto", time: "25 min", level: "Advanced", icon: <BarChart2 size={22} />, excerpt: "A comprehensive guide to RSI, MACD, Bollinger Bands, and other technical indicators used by crypto traders." },
    { slug: "risk-management-trading", title: "Risk Management in Crypto Trading", time: "12 min", level: "Intermediate", icon: <Shield size={22} />, excerpt: "Essential strategies for protecting your capital — position sizing, stop-losses, and portfolio diversification." },
  ],
  defi: [
    { slug: "understanding-defi", title: "Understanding DeFi: Decentralized Finance Explained", time: "15 min", level: "Intermediate", icon: <Zap size={22} />, excerpt: "A complete overview of decentralized finance — protocols, yield opportunities, risks, and how to get started safely." },
    { slug: "how-to-stake-ethereum", title: "How to Stake Ethereum", time: "10 min", level: "Beginner", icon: <Layers size={22} />, excerpt: "Learn how to earn staking rewards on Ethereum through solo staking, liquid staking protocols, and staking-as-a-service." },
    { slug: "yield-farming-explained", title: "Yield Farming: Risks & Rewards", time: "18 min", level: "Advanced", icon: <Leaf size={22} />, excerpt: "Understand liquidity provision, APY mechanics, impermanent loss, and how to evaluate yield farming opportunities." },
  ],
  security: [
    { slug: "avoid-crypto-scams", title: "How to Avoid Crypto Scams", time: "10 min", level: "Beginner", icon: <Lock size={22} />, excerpt: "Identify and avoid the most common cryptocurrency scams including rug pulls, fake giveaways, and impersonation attacks." },
    { slug: "securing-your-crypto", title: "Securing Your Crypto: Best Practices", time: "12 min", level: "Beginner", icon: <Shield size={22} />, excerpt: "A practical security checklist covering hardware wallets, 2FA, and operational security for crypto holders." },
    { slug: "recognizing-phishing-attacks", title: "Recognizing Phishing Attacks in Crypto", time: "8 min", level: "Beginner", icon: <AlertTriangle size={22} />, excerpt: "Learn to spot phishing websites, fake wallet apps, and social engineering attacks targeting cryptocurrency users." },
  ],
};

const GUIDE_BODY: Record<string, string[]> = {
  "what-is-bitcoin": [
    "Bitcoin is the world's first decentralized digital currency, created in 2009 by the pseudonymous Satoshi Nakamoto. Unlike traditional currencies issued by central banks, Bitcoin operates on a peer-to-peer network where transactions are verified by network participants — called miners — and recorded on a public ledger known as the blockchain. No single entity controls Bitcoin.",
    "The total supply of Bitcoin is capped at 21 million coins, a hard limit enforced by the protocol's code. This scarcity distinguishes Bitcoin from fiat currencies, which can be inflated at will by governments. Approximately 19.7 million Bitcoin have already been mined, with the final coins expected to enter circulation around the year 2140 through a process called halving.",
    "Bitcoin halvings occur every 210,000 blocks (roughly every four years), cutting the block reward paid to miners in half. This mechanism controls the issuance rate over time, creating a predictably deflationary supply schedule. The most recent halving in April 2024 reduced the block reward from 6.25 BTC to 3.125 BTC per block.",
    "Institutional adoption has accelerated Bitcoin's legitimacy as an asset class. In January 2024, the U.S. SEC approved the first spot Bitcoin ETFs, opening the door for trillions in traditional investment capital. Companies like MicroStrategy, Tesla, and dozens of sovereign wealth funds now hold Bitcoin on their balance sheets as a treasury reserve asset.",
    "For new investors, the easiest way to acquire Bitcoin is through a regulated exchange such as Coinbase, Kraken, or Binance. After purchasing, best practice is to move coins to a non-custodial wallet — either a software wallet for smaller amounts or a hardware wallet for long-term storage. Always back up your seed phrase offline and never share it with anyone.",
  ],
  "understanding-defi": [
    "Decentralized Finance, or DeFi, is an ecosystem of financial applications built on public blockchains that operate without traditional intermediaries like banks, brokers, or exchanges. Using smart contracts — self-executing code stored on-chain — DeFi protocols enable lending, borrowing, trading, and yield generation in a permissionless, transparent environment.",
    "The DeFi ecosystem first gained mainstream attention in 2020's 'DeFi Summer,' when total value locked (TVL) surged from under $1 billion to over $15 billion in just months. Today the DeFi market holds more than $100 billion in TVL across protocols including Uniswap, Aave, Compound, and MakerDAO — each offering distinct financial services.",
    "Lending protocols like Aave and Compound allow users to deposit collateral and borrow against it, or earn interest by supplying liquidity. Rates are set algorithmically based on supply and demand, often updating every block. Unlike traditional banks, there are no credit checks — loans are over-collateralized and liquidated automatically if the collateral value drops.",
    "Decentralized exchanges (DEXs) such as Uniswap use automated market maker (AMM) models instead of order books. Liquidity providers deposit token pairs into pools and earn a percentage of trading fees. However, they are exposed to impermanent loss — a reduction in value relative to simply holding — when token prices diverge significantly.",
    "Key risks in DeFi include smart contract vulnerabilities, oracle manipulation, and liquidity crises. Over $3 billion has been lost to DeFi exploits since 2020. Best practices include only using audited protocols, diversifying across platforms, starting with small amounts, and monitoring positions regularly — especially in volatile markets.",
  ],
  "reading-crypto-charts": [
    "Candlestick charts are the most widely used charting format in cryptocurrency trading. Each candle represents price action over a specific time period — from 1 minute to 1 month — showing the open, close, high, and low price. A green (bullish) candle means the closing price was higher than the open; a red (bearish) candle means it was lower. The wicks extending above and below the body indicate the highest and lowest prices reached.",
    "Support and resistance are foundational concepts in technical analysis. A support level is a price zone where buying pressure has historically been strong enough to halt a decline. Resistance is where selling pressure typically caps advances. When price breaks decisively above resistance, that level often flips to become new support — a key signal for traders.",
    "Moving averages smooth out price noise and help identify trend direction. The 50-day and 200-day simple moving averages (SMA) are the most watched. When the 50-day crosses above the 200-day, it is called a 'Golden Cross' — a historically bullish signal. The reverse — 50-day crossing below the 200-day — is a 'Death Cross,' indicating potential downtrend.",
    "Volume is a crucial confirming indicator. Price movements on high volume are considered more significant than moves on low volume. A breakout above resistance accompanied by a volume spike suggests genuine buying conviction. A breakout on low volume is more likely to be a false move that quickly reverses.",
    "Risk management is more important than chart patterns. Even the most reliable patterns fail regularly. Experienced traders always define their stop-loss before entering a trade, typically placing it just below the nearest support level. Position sizing — risking only 1-2% of capital per trade — is what separates long-term profitable traders from those who blow up their accounts.",
  ],
  "how-to-stake-ethereum": [
    "Ethereum transitioned from proof-of-work to proof-of-stake in September 2022 — an event known as 'The Merge.' Under proof-of-stake, validators replace miners as the network's transaction verifiers. Instead of competing with computation power, validators lock up (stake) 32 ETH as collateral to earn the right to propose and attest blocks, earning staking rewards in return.",
    "Solo staking requires exactly 32 ETH and running your own validator node 24/7. It offers the highest reward rate (currently around 3.5-4% APY) and keeps the network maximally decentralized, but requires technical expertise and carries slashing risk if your validator misbehaves or goes offline for extended periods.",
    "Liquid staking protocols like Lido Finance and Rocket Pool allow users to stake any amount of ETH without running their own node. In exchange, users receive a liquid staking token (stETH for Lido, rETH for Rocket Pool) that accrues rewards daily and can be used across DeFi. Lido currently holds the largest market share, controlling roughly 32% of all staked ETH.",
    "Centralized exchanges including Coinbase (cbETH), Binance (BETH), and Kraken offer staking services that abstract away all technical complexity. The trade-off is lower yield (exchanges take a commission) and custodial risk — the exchange holds your ETH. These are suitable for beginners who prioritize simplicity over maximum returns.",
    "Staking withdrawals were enabled in the Shanghai/Capella upgrade in April 2023, meaning staked ETH is no longer locked indefinitely. Validators can now unstake via a queue process that takes hours to days depending on network congestion. This has significantly reduced the risk profile of staking, making it more attractive for yield-seeking investors.",
  ],
  "avoid-crypto-scams": [
    "Cryptocurrency scams cost investors over $5.6 billion in 2023 according to FBI estimates. The decentralized and pseudonymous nature of crypto — transactions are irreversible and often impossible to trace — makes it an attractive target for bad actors. Awareness is your first and most important line of defense.",
    "Rug pulls are among the most common DeFi scams. Developers launch a new token with attractive yields, attract investor capital into a liquidity pool, then drain the pool and disappear. Red flags include anonymous teams, unaudited smart contracts, no token lock-up for founders, and unrealistically high APY promises. Always verify that a project's code has been audited by a reputable firm.",
    "Social media impersonation is rampant across X (Twitter), Telegram, and Discord. Scammers create accounts mimicking legitimate projects or influencers and direct victims to malicious sites. Giveaway scams — 'send 1 ETH, get 2 back' — have never been legitimate and never will be. No reputable project or person will ask you to send crypto first.",
    "Phishing attacks target your wallet seed phrase or exchange login. Fake websites copy the design of MetaMask, Coinbase, or Ledger and prompt users to enter their recovery phrase. Always verify the URL before connecting your wallet. Bookmark official sites and never click links from unsolicited emails or DMs.",
    "If an opportunity sounds too good to be true, it is. Legitimate crypto investments carry real risk and never guarantee returns. Before investing in any project: check who is behind it, verify contract addresses through official channels, read independent audits, and start with an amount you can afford to lose entirely.",
  ],
  "hot-vs-cold-wallets": [
    "A crypto wallet does not actually store your coins — it stores the private keys that prove ownership. There are two fundamental categories: hot wallets (connected to the internet) and cold wallets (offline). The right choice depends on how frequently you trade and how much you hold.",
    "Hot wallets — including browser extensions like MetaMask, mobile apps like Trust Wallet, and exchange accounts — are designed for convenience. They allow instant access to your funds for trading and interacting with DeFi protocols. The downside is that being internet-connected exposes them to phishing attacks, malware, and exchange hacks.",
    "Cold wallets, also called hardware wallets, store private keys on a dedicated offline device — typically a USB-like device such as the Ledger Nano or Trezor Model T. To sign a transaction, you must physically confirm it on the device, meaning even if your computer is compromised by malware, your funds remain safe.",
    "A practical security model: keep a small amount in a hot wallet for active use, and the majority of holdings in a cold wallet. Think of it like carrying cash in your pocket versus keeping savings in a vault — except in crypto, the vault is entirely under your control.",
    "Paper wallets were once popular but are now considered outdated and risky. They are easily damaged, destroyed, or lost, and generating them securely requires significant technical care. Modern hardware wallets are safer, more user-friendly, and worth the $60-$150 investment for any meaningful crypto holding.",
  ],
  "blockchain-technology-explained": [
    "A blockchain is a distributed database shared and synchronized across a network of computers called nodes. Unlike a traditional database managed by a single company, no central authority controls a public blockchain. Every participant stores a complete copy of the transaction history, and all copies must agree — a property called consensus.",
    "Data on the blockchain is organized into blocks. Each block contains a batch of validated transactions, a timestamp, and a cryptographic hash of the previous block. This linking of blocks through hashes creates the 'chain' — and makes the data immutable. Changing any historical transaction would break the hash of that block and every block that follows, immediately detected by the network.",
    "Consensus mechanisms are the rules by which nodes agree on which blocks to add to the chain. Bitcoin uses Proof of Work, where miners compete to solve a computationally expensive puzzle. The first to solve it earns the right to add the next block and collect the block reward. This process has secured Bitcoin without interruption since 2009.",
    "Ethereum uses Proof of Stake, where validators lock up ETH as collateral to participate in block production. Validators are chosen pseudo-randomly, weighted by stake size. If a validator acts dishonestly, their stake is 'slashed' — partially confiscated. PoS uses roughly 99.95% less energy than PoW while maintaining comparable security guarantees.",
    "Smart contracts extend blockchain's capabilities from simple value transfer to programmable logic. Deployed on Ethereum and other smart contract platforms, these self-executing programs run exactly as written with no possibility of downtime, censorship, or third-party interference. They power everything from stablecoins and DEXs to NFTs and on-chain governance.",
  ],
  "what-is-cryptocurrency": [
    "Cryptocurrency is a form of digital money that uses cryptography to secure transactions, control the creation of new units, and verify the transfer of assets. Unlike traditional currencies issued by governments, most cryptocurrencies operate on decentralized networks — typically blockchains — that no single entity controls.",
    "The first cryptocurrency, Bitcoin, was launched in January 2009 by an anonymous person or group known as Satoshi Nakamoto. Bitcoin solved the 'double-spend problem' in digital cash: how to prevent the same coin from being spent twice without a trusted central authority. The solution was a distributed ledger maintained by a global network of computers.",
    "Since Bitcoin's launch, thousands of alternative cryptocurrencies ('altcoins') have been created. Ethereum introduced programmable smart contracts in 2015, enabling an entire ecosystem of decentralized applications. Other notable categories include stablecoins pegged to fiat currencies, Layer 2 networks offering faster and cheaper transactions, and DeFi tokens.",
    "Cryptocurrencies can be purchased on centralized exchanges like Coinbase and Binance, or swapped directly on-chain through decentralized exchanges like Uniswap. After purchasing, they can be held in exchange custody or moved to a personal wallet — a software or hardware device that holds the private keys proving ownership.",
    "The global cryptocurrency market has grown from near zero to over $2.5 trillion in total market capitalization as of 2024. Bitcoin dominates with roughly 50% of the total market, followed by Ethereum at around 15-18%. Regulatory frameworks are rapidly evolving worldwide, with the EU's MiCA regulation and U.S. spot ETF approvals marking major milestones in institutional legitimacy.",
  ],
  "proof-of-work-vs-proof-of-stake": [
    "Proof of Work (PoW) and Proof of Stake (PoS) are the two dominant consensus mechanisms used by public blockchains. Both solve the same fundamental problem — achieving trustless consensus among strangers — but through very different approaches with distinct trade-offs.",
    "In Proof of Work, miners compete to solve a cryptographic puzzle by performing billions of hash calculations per second. The first to find a valid solution broadcasts the new block and earns the block reward. Security comes from energy expenditure — attacking the network would require controlling more than 50% of global mining power, which is prohibitively expensive.",
    "In Proof of Stake, validators deposit cryptocurrency as collateral and are pseudo-randomly selected to propose and attest blocks, weighted by their stake size. Security comes from economic incentives: if a validator acts dishonestly, their stake can be destroyed in a process called 'slashing.' Ethereum switched from PoW to PoS in September 2022, reducing its energy consumption by over 99%.",
    "The central criticism of PoW is environmental: Bitcoin mining consumes as much electricity as some small countries. Proponents counter that an increasing share of mining uses renewable energy, and that energy expenditure is precisely what makes Bitcoin's security model credible. PoS critics argue it tends toward plutocracy — those with more stake earn more stake.",
    "In practice, both models have proven resilient. Bitcoin has operated continuously since 2009 with no successful 51% attacks. Ethereum's PoS has functioned without incident since The Merge. The choice reflects a fundamental design philosophy: PoW prioritizes maximum security through physical resource expenditure; PoS prioritizes efficiency while relying on cryptoeconomic game theory.",
  ],
  "bitcoin-vs-gold": [
    "For centuries, gold has been the canonical store of value — a scarce, durable, portable asset that preserves purchasing power across generations. Bitcoin, born in 2009, has increasingly been compared to gold, earning the label 'digital gold' from proponents who argue it offers the same fundamental properties but in a form better suited to the digital age.",
    "Both assets derive their value largely from scarcity. Gold's above-ground supply grows by roughly 1.5% per year through mining. Bitcoin's supply is algorithmically capped at 21 million coins, with issuance cut in half every four years through halvings. By 2024, over 93% of all Bitcoin had already been mined. This predictable, diminishing supply schedule is unprecedented in monetary history.",
    "Bitcoin surpasses gold on several practical dimensions: it can be transmitted globally in minutes with no custodian, divided to eight decimal places, and verified by anyone with an internet connection. Gold, by contrast, is expensive to store, audit, and transport. These properties make Bitcoin arguably superior as portable wealth.",
    "Gold has significant advantages in longevity and regulatory clarity. Gold has been valued across cultures for over 5,000 years; Bitcoin has existed for less than 20. Gold is recognized globally as a legitimate asset class by every financial regulator; Bitcoin regulation remains varied and evolving. Gold also has substantial industrial demand providing a floor to its value that Bitcoin lacks.",
    "Institutional perspectives have shifted meaningfully. The January 2024 launch of spot Bitcoin ETFs in the U.S. attracted over $50 billion in inflows within months, signaling that traditional finance now accepts Bitcoin as a portfolio allocation. Many fund managers now advocate for a small Bitcoin allocation (1-5%) as an uncorrelated, asymmetric return asset alongside traditional gold holdings.",
  ],
  "yield-farming-explained": [
    "Yield farming, also called liquidity mining, is the practice of depositing cryptocurrency into DeFi protocols in exchange for interest, fees, or governance token rewards. At its peak in 2020-2021, some protocols advertised APYs in the thousands of percent. Today yields are more modest but the mechanics remain the same.",
    "The most common form of yield farming involves providing liquidity to a decentralized exchange (DEX). When you deposit a pair of tokens — say ETH and USDC — into a Uniswap pool, you receive LP tokens representing your share. Every trade through the pool generates a fee, and your LP tokens entitle you to a proportional share of those fees.",
    "Impermanent loss (IL) is the most misunderstood risk in yield farming. It occurs when the price ratio of your deposited tokens changes relative to when you deposited. If ETH doubles in price while you are providing ETH/USDC liquidity, you end up with less ETH than if you had simply held — because the AMM algorithm automatically rebalances by selling ETH as it rises.",
    "Compound farming — using yield-bearing tokens as collateral to borrow more, then farming again — can amplify returns but carries severe liquidation risk. If collateral values drop, positions can be automatically liquidated. The DeFi exploits of 2022-2023 disproportionately targeted over-leveraged farming strategies, draining billions through flash loan attacks.",
    "A sustainable approach to yield farming: start with established protocols that have been audited and battle-tested (Uniswap, Aave, Curve), focus on stablecoin pairs to minimize impermanent loss, avoid excessively high-yield opportunities (a token emission is probably subsidizing unsustainable yields), and regularly re-evaluate positions as market conditions change.",
  ],
  "securing-your-crypto": [
    "The irreversibility of blockchain transactions means that if you make a security mistake — sending to the wrong address, falling for a phishing attack, or losing your seed phrase — there is no customer support to call and no refund mechanism. Security in crypto is entirely your personal responsibility.",
    "Hardware wallets are the single most effective security upgrade for anyone holding significant crypto. Devices like the Ledger Nano X or Trezor Model T store your private keys offline and require physical confirmation for every transaction. Even if your computer is completely compromised with malware, a hardware wallet prevents unauthorized access.",
    "Two-factor authentication (2FA) should be enabled on every exchange account using an authenticator app (Google Authenticator or Authy) rather than SMS. SMS-based 2FA is vulnerable to SIM-swap attacks, where a criminal tricks your mobile carrier into transferring your phone number to their device, intercepting your authentication codes.",
    "Your seed phrase — the 12 or 24 words that can restore your wallet — must never exist digitally. Do not photograph it, type it into any device, or store it in cloud services. The gold standard is engraving it on a metal plate and storing it in a fireproof location, ideally with a backup copy in a separate physical location.",
    "Operational security (OpSec) includes being discreet about your holdings, using a dedicated email address for crypto accounts, and being suspicious of any unsolicited contact. Never discuss your specific holdings publicly. Maintain a 'hot' wallet with only the amount you need for current activity, and a cold wallet for long-term storage.",
  ],
};

function getBody(slug: string): string[] {
  return GUIDE_BODY[slug] ?? [
    "This guide is part of the CoinLineup Learning Hub — our curated collection of research-backed educational content on cryptocurrency, blockchain technology, and decentralized finance.",
    "Our research team is finalizing the full version of this guide. When published, it will include a step-by-step breakdown of the topic, real-world examples, current data points, and practical recommendations for readers at all experience levels.",
    "In the meantime, explore related guides below or browse the full Learning Hub for in-depth content on adjacent topics. Subscribe to our newsletter to be notified when new guides are published.",
  ];
}

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const guide = ALL_GUIDES[category]?.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: `${guide.title} — CoinLineup Guides`,
    description: guide.excerpt,
  };
}

export default async function GuideArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const guides = ALL_GUIDES[category];
  if (!guides) notFound();
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const categoryLabel = CATEGORY_LABELS[category] ?? category;
  const related = guides.filter((g) => g.slug !== slug).slice(0, 3);
  const body = getBody(slug);

  const levelColor =
    guide.level === "Beginner" ? "rgba(0,168,107,0.15)"
    : guide.level === "Advanced" ? "rgba(230,57,70,0.15)"
    : "rgba(247,147,26,0.15)";
  const levelText =
    guide.level === "Beginner" ? "#00A86B"
    : guide.level === "Advanced" ? "#E63946"
    : "#F7931A";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-xs flex-wrap" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-brand-orange transition-colors">Guides</Link>
        <span>/</span>
        <Link href={`/guides/${category}`} className="hover:text-brand-orange transition-colors capitalize">
          {categoryLabel}
        </Link>
        <span>/</span>
        <span className="line-clamp-1 max-w-xs">{guide.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main content */}
        <article className="lg:col-span-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(247,147,26,0.1)", color: "#F7931A" }}>
              {guide.icon}
            </div>
            <span className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: levelColor, color: levelText }}>
              {guide.level}
            </span>
          </div>

          <h1 className="font-display font-bold text-2xl md:text-3xl leading-tight mb-4"
            style={{ color: "var(--text-primary)" }}>
            {guide.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 pb-6 mb-8 border-b text-sm"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-brand-green" />
              {categoryLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {guide.time} read
            </span>
            <span className="font-semibold" style={{ color: levelText }}>
              {guide.level}
            </span>
          </div>

          {/* Excerpt lead */}
          <p className="text-base md:text-lg leading-relaxed font-medium mb-8"
            style={{ color: "var(--text-secondary)" }}>
            {guide.excerpt}
          </p>

          {/* Body */}
          <div className="space-y-6">
            {body.map((para, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {para}
              </p>
            ))}
          </div>

          {/* Related guides */}
          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
              <h3 className="font-display font-bold text-lg mb-5" style={{ color: "var(--text-primary)" }}>
                More {categoryLabel} Guides
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((g) => (
                  <Link key={g.slug} href={`/guides/${category}/${g.slug}`}
                    className="group p-4 rounded-xl border transition-all hover:border-brand-orange"
                    style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(247,147,26,0.1)", color: "#F7931A" }}>
                        {g.icon}
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: "rgba(247,147,26,0.12)", color: "#F7931A" }}>
                        {g.level}
                      </span>
                    </div>
                    <h4 className="font-display font-semibold text-sm leading-snug mb-2 group-hover:text-brand-orange transition-colors"
                      style={{ color: "var(--text-primary)" }}>
                      {g.title}
                    </h4>
                    <span className="text-xs flex items-center gap-1 text-brand-orange font-semibold group-hover:gap-2 transition-all">
                      Read Guide <ArrowRight size={11} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <Link href={`/guides/${category}`}
            className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-brand-orange"
            style={{ color: "var(--text-secondary)" }}>
            <ArrowLeft size={15} /> Back to {categoryLabel}
          </Link>

          {/* Newsletter */}
          <div className="rounded-xl border p-5"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <p className="font-display font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              Stay Updated
            </p>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              New guides delivered weekly.
            </p>
            <NewsletterForm compact buttonText="Subscribe Free" />
          </div>

          {/* All guides in category */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--text-primary)" }}>
              {categoryLabel} Guides
            </h4>
            <div className="space-y-1">
              {guides.map((g) => (
                <Link key={g.slug} href={`/guides/${category}/${g.slug}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors hover:bg-brand-orange/5"
                  style={{ color: g.slug === slug ? "#F7931A" : "var(--text-secondary)" }}>
                  <span className="flex-shrink-0" style={{ color: g.slug === slug ? "#F7931A" : "var(--text-muted)" }}>
                    {g.icon}
                  </span>
                  <span className="line-clamp-2 leading-snug">{g.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/guides"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border text-sm font-semibold transition-all hover:border-brand-orange hover:text-brand-orange"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            <BookOpen size={14} /> All Guides
          </Link>
        </aside>
      </div>
    </div>
  );
}
