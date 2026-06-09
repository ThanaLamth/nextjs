export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  thumbnail: string;
  date: string;
  readTime: string;
  hoursAgo?: number;
  author?: string;
  badge?: string;
  priceTag?: { symbol: string; change: number };
  featured?: boolean;
  section?: "news" | "markets" | "projects" | "guides";
}

export const ALL_NEWS: NewsArticle[] = [
  {
    id: 1,
    title: "Hyperliquid Surpasses $500B in Cumulative Trading Volume as DEX Dominance Grows",
    excerpt: "The decentralized perpetuals exchange Hyperliquid has reached a new milestone, processing over $500 billion in total trading volume, cementing its place as the dominant on-chain derivatives platform.",
    category: "DeFi",
    thumbnail: "/thumbnails/112025-hyperliquid-500x281.jpeg",
    date: "May 20, 2026", hoursAgo: 1,
    readTime: "4 min read", author: "Yuki Matsuda",
    badge: "BREAKING", priceTag: { symbol: "HYPE", change: 12.4 },
    featured: true, section: "news",
  },
  {
    id: 2,
    title: "DTCC Launches On-Chain Settlement Pilot with Major US Banks",
    excerpt: "The Depository Trust & Clearing Corporation has initiated a blockchain-based settlement pilot program with five major US banks, marking a significant step toward institutional DeFi adoption.",
    category: "Markets",
    thumbnail: "/thumbnails/dtcc-onchain-500x281.jpg",
    date: "May 20, 2026", hoursAgo: 2,
    readTime: "5 min read", author: "Sarah Chen",
    badge: "MARKET ANALYSIS", priceTag: { symbol: "ETH", change: 2.1 },
    section: "markets",
  },
  {
    id: 3,
    title: "Gold Tokenization Hits $3B Total Value Locked as Institutions Pile In",
    excerpt: "On-chain gold products from Paxos, Tether, and new entrants have collectively surpassed $3 billion in tokenized gold assets, driven by institutional demand for digital commodity exposure.",
    category: "Blockchain",
    thumbnail: "/thumbnails/gold-tokenization-500x281.jpg",
    date: "May 19, 2026", hoursAgo: 3,
    readTime: "3 min read", author: "James Park",
    priceTag: { symbol: "XAUT", change: 1.8 }, section: "markets",
  },
  {
    id: 4,
    title: "Moody's Issues Report on Crypto Credit Risk, Warns of Overleveraged DeFi Protocols",
    excerpt: "Credit rating agency Moody's published its first comprehensive analysis of DeFi credit risk, highlighting concerns about overcollateralization loops and systemic contagion risks.",
    category: "Markets",
    thumbnail: "/thumbnails/Moodys-financial-500x281.jpeg",
    date: "May 19, 2026", hoursAgo: 4,
    readTime: "6 min read", author: "Maria Santos",
    badge: "ANALYSIS", priceTag: { symbol: "BTC", change: -0.8 }, section: "news",
  },
  {
    id: 5,
    title: "World Liberty Financial Expands DeFi Treasury with $200M Token Deployment",
    excerpt: "The DeFi protocol backed by prominent US political figures has deployed an additional $200 million in liquidity across Aave, Compound, and Uniswap v4 pools.",
    category: "DeFi",
    thumbnail: "/thumbnails/world-liberty-financial-500x281.jpeg",
    date: "May 18, 2026", hoursAgo: 5,
    readTime: "4 min read", author: "Alex Rivera",
    priceTag: { symbol: "WLFI", change: 8.3 }, section: "projects",
  },
  {
    id: 6,
    title: "On-Chain Markets Report: Bitcoin Whales Accumulate 42,000 BTC in Single Week",
    excerpt: "On-chain data reveals that large Bitcoin holders added over 42,000 BTC to their holdings during the past week, signaling continued institutional accumulation at current price levels.",
    category: "Crypto",
    thumbnail: "/thumbnails/onchain-markets-500x281.jpeg",
    date: "May 17, 2026", hoursAgo: 6,
    readTime: "5 min read", author: "Yuki Matsuda",
    badge: "DEEP DIVE", priceTag: { symbol: "BTC", change: 4.2 }, section: "news",
  },
  {
    id: 7,
    title: "Blockchain Technology Adoption in Global Trade Finance Accelerates Sharply",
    excerpt: "A new report from the World Economic Forum shows blockchain-based trade finance solutions are now processing over $180 billion annually, up 240% from two years ago.",
    category: "Blockchain",
    thumbnail: "/thumbnails/blockchain-crypto-500x281.jpeg",
    date: "May 17, 2026", hoursAgo: 8,
    readTime: "4 min read", author: "Sarah Chen", section: "markets",
  },
  {
    id: 8,
    title: "Solana & Kalshi Partner to Bring Prediction Markets On-Chain",
    excerpt: "Regulated prediction market platform Kalshi has announced a strategic integration with Solana to offer crypto-native prediction markets, settling positions via smart contracts.",
    category: "Crypto",
    thumbnail: "/thumbnails/12225-solana-kalshi-500x281.jpg",
    date: "May 16, 2026", hoursAgo: 24,
    readTime: "3 min read", author: "James Park",
    badge: "NEW PROJECT", priceTag: { symbol: "SOL", change: 5.7 }, section: "projects",
  },
  {
    id: 9,
    title: "WisdomTree Files for New Crypto Basket ETF Covering Top 25 Digital Assets",
    excerpt: "Asset manager WisdomTree has submitted an application to the SEC for a diversified cryptocurrency ETF that would track the top 25 digital assets by market capitalization.",
    category: "Markets",
    thumbnail: "/thumbnails/12825-wisdomtree-500x281.jpeg",
    date: "May 15, 2026", hoursAgo: 30,
    readTime: "4 min read", author: "Maria Santos", section: "markets",
  },
  {
    id: 10,
    title: "Hyperliquid Launches New Perpetual Contracts for Real-World Assets",
    excerpt: "Hyperliquid has expanded its derivatives offering with perpetual contracts for tokenized real-world assets including US Treasury bills and commodities indices.",
    category: "DeFi",
    thumbnail: "/thumbnails/Hyperliquid-500x281.jpeg",
    date: "May 15, 2026", hoursAgo: 36,
    readTime: "3 min read", author: "Alex Rivera",
    badge: "INSIGHT", priceTag: { symbol: "HYPE", change: 6.2 }, section: "projects",
  },
  {
    id: 11,
    title: "Tokenized Bond Market Reaches $25B as BlackRock Expands BUIDL Fund",
    excerpt: "The on-chain bond market has crossed $25 billion in total value, led by BlackRock's BUIDL tokenized Treasury fund which alone holds over $8 billion in assets.",
    category: "Markets",
    thumbnail: "/thumbnails/tokenization-bond-500x281.jpeg",
    date: "May 14, 2026", hoursAgo: 48,
    readTime: "5 min read", author: "Sarah Chen", section: "markets",
  },
  {
    id: 12,
    title: "DeFi Protocol Exploit Results in $45M Loss; Recovery Bounty Offered",
    excerpt: "A major DeFi lending protocol suffered a $45 million exploit due to a price oracle manipulation attack. The team has offered a 20% white-hat bounty for the return of funds.",
    category: "DeFi",
    thumbnail: "/thumbnails/113705-500x281.png",
    date: "May 14, 2026", hoursAgo: 56,
    readTime: "3 min read", author: "James Park",
    badge: "BREAKING", priceTag: { symbol: "ETH", change: -2.3 }, section: "news",
  },
  {
    id: 13,
    title: "Crypto Market Wrap: Total Market Cap Returns to $3.8 Trillion Amid Institutional Flows",
    excerpt: "The total cryptocurrency market capitalization reached $3.8 trillion this week, driven by sustained inflows into spot Bitcoin and Ethereum ETFs totaling $2.1 billion.",
    category: "Markets",
    thumbnail: "/thumbnails/115462-1200x675.webp",
    date: "May 13, 2026", hoursAgo: 72,
    readTime: "6 min read", author: "Yuki Matsuda",
    badge: "MARKET ANALYSIS", priceTag: { symbol: "BTC", change: 3.8 }, section: "markets",
  },
  {
    id: 14,
    title: "Layer 2 Solutions Process Record 85M Daily Transactions",
    excerpt: "Ethereum Layer 2 networks collectively processed a record 85 million transactions in a single day, with Base, Arbitrum, and Optimism accounting for the majority of throughput.",
    category: "Blockchain",
    thumbnail: "/thumbnails/116421-500x281.jpeg",
    date: "May 13, 2026", hoursAgo: 80,
    readTime: "4 min read", author: "Maria Santos",
    priceTag: { symbol: "ETH", change: 2.9 }, section: "news",
  },

  // ─── Bitcoin ───
  { id: 15, title: "Bitcoin Breaks $120,000 ATH as Institutional Demand Surges", excerpt: "Bitcoin set a new all-time high of $120,000, driven by record ETF inflows and continued accumulation by corporate treasuries including MicroStrategy and Tesla.", category: "Bitcoin", thumbnail: "/thumbnails/onchain-markets-500x281.jpeg", date: "May 21, 2026", hoursAgo: 1, readTime: "4 min read", author: "Yuki Matsuda", badge: "BREAKING", priceTag: { symbol: "BTC", change: 8.3 }, section: "news" },
  { id: 16, title: "MicroStrategy Acquires 10,000 BTC Worth $1.2B in Latest Purchase", excerpt: "Business intelligence firm MicroStrategy disclosed a fresh Bitcoin purchase of 10,000 BTC, bringing its total holdings to over 420,000 BTC and reinforcing its role as the largest corporate Bitcoin holder.", category: "Bitcoin", thumbnail: "/thumbnails/tokenization-bond-500x281.jpeg", date: "May 21, 2026", hoursAgo: 3, readTime: "3 min read", author: "Sarah Chen", priceTag: { symbol: "BTC", change: 5.2 }, section: "news" },
  { id: 17, title: "BlackRock Bitcoin ETF Records $500M Single-Day Inflow", excerpt: "The iShares Bitcoin Trust (IBIT) attracted $500 million in a single trading day, marking its largest inflow since launch and pushing total AUM above $60 billion.", category: "Bitcoin", thumbnail: "/thumbnails/12825-wisdomtree-500x281.jpeg", date: "May 20, 2026", hoursAgo: 6, readTime: "4 min read", author: "James Park", badge: "MARKET ANALYSIS", priceTag: { symbol: "BTC", change: 3.1 }, section: "markets" },
  { id: 18, title: "Bitcoin Hashrate Hits All-Time High at 900 EH/s", excerpt: "The Bitcoin network's total computational power reached 900 exahashes per second, signaling unprecedented miner confidence and network security despite the recent halving.", category: "Bitcoin", thumbnail: "/thumbnails/blockchain-crypto-500x281.jpeg", date: "May 20, 2026", hoursAgo: 10, readTime: "3 min read", author: "Maria Santos", section: "news" },
  { id: 19, title: "Lightning Network Capacity Surpasses 5,000 BTC", excerpt: "Bitcoin's Lightning Network now holds over 5,000 BTC in payment channels, enabling near-instant, near-free transactions for millions of daily users globally.", category: "Bitcoin", thumbnail: "/thumbnails/116421-500x281.jpeg", date: "May 19, 2026", hoursAgo: 16, readTime: "4 min read", author: "Alex Rivera", priceTag: { symbol: "BTC", change: 1.9 }, section: "news" },
  { id: 20, title: "Spot Bitcoin ETFs Surpass Gold ETF AUM for First Time", excerpt: "Combined assets under management across all US spot Bitcoin ETFs have overtaken gold ETFs for the first time, crossing $100 billion as institutional adoption accelerates.", category: "Bitcoin", thumbnail: "/thumbnails/Moodys-financial-500x281.jpeg", date: "May 19, 2026", hoursAgo: 24, readTime: "5 min read", author: "Yuki Matsuda", badge: "DEEP DIVE", priceTag: { symbol: "BTC", change: 2.7 }, section: "markets" },
  { id: 21, title: "JP Morgan Revises Bitcoin Price Target to $150,000", excerpt: "JPMorgan's digital assets team upgraded its 12-month Bitcoin price target to $150,000 citing scarcity dynamics post-halving and growing sovereign adoption.", category: "Bitcoin", thumbnail: "/thumbnails/dtcc-onchain-500x281.jpg", date: "May 18, 2026", hoursAgo: 32, readTime: "4 min read", author: "Sarah Chen", badge: "ANALYSIS", priceTag: { symbol: "BTC", change: 4.1 }, section: "markets" },
  { id: 22, title: "El Salvador Reports 40% Tourism Increase Linked to Bitcoin Adoption", excerpt: "El Salvador's tourism ministry attributed a 40% year-over-year increase in visitors to the country's Bitcoin legal tender status and the growing Bitcoin Beach ecosystem.", category: "Bitcoin", thumbnail: "/thumbnails/115462-1200x675.webp", date: "May 18, 2026", hoursAgo: 40, readTime: "3 min read", author: "James Park", section: "news" },
  { id: 23, title: "Bitcoin Mining Difficulty Adjusts Up 8.7% as Competition Intensifies", excerpt: "Bitcoin's mining difficulty increased by 8.7% in the latest adjustment epoch, reflecting the surge in hashrate from new ASIC deployments by publicly traded mining companies.", category: "Bitcoin", thumbnail: "/thumbnails/113705-500x281.png", date: "May 17, 2026", hoursAgo: 48, readTime: "3 min read", author: "Maria Santos", section: "markets" },
  { id: 24, title: "Fidelity Expands Bitcoin Custody to Pension Fund Clients", excerpt: "Fidelity Digital Assets announced the extension of its Bitcoin and Ethereum custody services to pension fund clients, opening the door to trillions in potential institutional capital.", category: "Bitcoin", thumbnail: "/thumbnails/world-liberty-financial-500x281.jpeg", date: "May 16, 2026", hoursAgo: 56, readTime: "4 min read", author: "Alex Rivera", priceTag: { symbol: "BTC", change: 1.5 }, section: "markets" },

  // ─── Ethereum ───
  { id: 25, title: "Ethereum Dencun Upgrade Reduces Layer 2 Fees by 90%", excerpt: "The Dencun hard fork introduced proto-danksharding (EIP-4844), dramatically reducing data costs for Layer 2 rollups and making Ethereum transactions cheaper than ever.", category: "Ethereum", thumbnail: "/thumbnails/blockchain-crypto-500x281.jpeg", date: "May 21, 2026", hoursAgo: 2, readTime: "5 min read", author: "Sarah Chen", badge: "BREAKING", priceTag: { symbol: "ETH", change: 6.4 }, section: "news" },
  { id: 26, title: "Ethereum Staking Rate Reaches 28% of Total Supply", excerpt: "More than 28% of all ETH in circulation is now locked in staking contracts, generating a 4.2% annualized yield and reducing liquid supply significantly.", category: "Ethereum", thumbnail: "/thumbnails/112025-hyperliquid-500x281.jpeg", date: "May 21, 2026", hoursAgo: 5, readTime: "4 min read", author: "James Park", priceTag: { symbol: "ETH", change: 2.8 }, section: "news" },
  { id: 27, title: "Ethereum ETF Sees $3B Cumulative Inflows in First Month", excerpt: "The newly approved spot Ethereum ETFs from Fidelity, BlackRock, and Franklin Templeton attracted $3 billion in combined inflows during their first month of trading.", category: "Ethereum", thumbnail: "/thumbnails/tokenization-bond-500x281.jpeg", date: "May 20, 2026", hoursAgo: 8, readTime: "4 min read", author: "Maria Santos", badge: "MARKET ANALYSIS", priceTag: { symbol: "ETH", change: 4.5 }, section: "markets" },
  { id: 28, title: "Base Surpasses Arbitrum as Largest Ethereum Layer 2 by TVL", excerpt: "Coinbase's Base network overtook Arbitrum to become the largest Ethereum Layer 2 by total value locked, reaching $18 billion just 18 months after launch.", category: "Ethereum", thumbnail: "/thumbnails/Hyperliquid-500x281.jpeg", date: "May 20, 2026", hoursAgo: 12, readTime: "3 min read", author: "Yuki Matsuda", section: "news" },
  { id: 29, title: "EigenLayer Restaking TVL Crosses $25 Billion", excerpt: "EigenLayer's restaking protocol now secures over $25 billion in ETH-based assets, enabling shared security for dozens of new decentralized applications and middleware services.", category: "Ethereum", thumbnail: "/thumbnails/gold-tokenization-500x281.jpg", date: "May 19, 2026", hoursAgo: 18, readTime: "4 min read", author: "Alex Rivera", priceTag: { symbol: "EIGEN", change: 11.2 }, section: "projects" },
  { id: 30, title: "Uniswap v4 Launches with 80% Lower Swap Fees via Custom Hooks", excerpt: "Uniswap v4 went live on mainnet with its revolutionary 'hooks' architecture, enabling developers to customize pool behavior and significantly reducing swap costs for end users.", category: "Ethereum", thumbnail: "/thumbnails/12225-solana-kalshi-500x281.jpg", date: "May 18, 2026", hoursAgo: 26, readTime: "5 min read", author: "Sarah Chen", badge: "NEW PROJECT", priceTag: { symbol: "UNI", change: 18.3 }, section: "projects" },
  { id: 31, title: "Vitalik Buterin Proposes New Ethereum Privacy Roadmap", excerpt: "Ethereum co-founder Vitalik Buterin published a new privacy roadmap proposing stealth addresses and MACI-based private transactions as near-term Ethereum primitives.", category: "Ethereum", thumbnail: "/thumbnails/Moodys-financial-500x281.jpeg", date: "May 18, 2026", hoursAgo: 34, readTime: "6 min read", author: "James Park", badge: "DEEP DIVE", section: "news" },
  { id: 32, title: "Ethereum Gas Fees Hit 6-Month Low Following EIP-4844", excerpt: "Average Ethereum transaction fees dropped to their lowest level in six months, averaging under $0.20 for standard transfers following the successful implementation of blob transactions.", category: "Ethereum", thumbnail: "/thumbnails/onchain-markets-500x281.jpeg", date: "May 17, 2026", hoursAgo: 44, readTime: "3 min read", author: "Maria Santos", priceTag: { symbol: "ETH", change: 1.2 }, section: "markets" },
  { id: 33, title: "Lido DAO Votes to Increase Ethereum Staking Capacity", excerpt: "Lido Finance's governance passed a proposal to increase node operator capacity and integrate distributed validator technology, enhancing decentralization of the largest liquid staking protocol.", category: "Ethereum", thumbnail: "/thumbnails/dtcc-onchain-500x281.jpg", date: "May 16, 2026", hoursAgo: 52, readTime: "4 min read", author: "Yuki Matsuda", priceTag: { symbol: "LDO", change: 7.6 }, section: "news" },
  { id: 34, title: "Aave v4 Launches with Unified Cross-Chain Liquidity Layer", excerpt: "Aave Protocol's fourth version introduced a cross-chain liquidity hub allowing seamless borrowing and lending across 15 networks without bridging assets.", category: "Ethereum", thumbnail: "/thumbnails/116421-500x281.jpeg", date: "May 15, 2026", hoursAgo: 72, readTime: "5 min read", author: "Alex Rivera", badge: "NEW PROJECT", priceTag: { symbol: "AAVE", change: 14.7 }, section: "projects" },

  // ─── Altcoins ───
  { id: 35, title: "Solana Sets Record 100 Million Daily Transactions", excerpt: "Solana's high-performance blockchain processed a record 100 million transactions in a single day, cementing its position as the leading alternative Layer 1 for consumer applications.", category: "Altcoins", thumbnail: "/thumbnails/12225-solana-kalshi-500x281.jpg", date: "May 21, 2026", hoursAgo: 2, readTime: "3 min read", author: "James Park", badge: "BREAKING", priceTag: { symbol: "SOL", change: 9.1 }, section: "news" },
  { id: 36, title: "Avalanche C-Chain Hits $10B Total Value Locked", excerpt: "Avalanche's contract chain surpassed $10 billion in TVL, driven by the launch of institutional tokenization products and new DeFi protocols migrating from Ethereum.", category: "Altcoins", thumbnail: "/thumbnails/tokenization-bond-500x281.jpeg", date: "May 21, 2026", hoursAgo: 5, readTime: "4 min read", author: "Maria Santos", priceTag: { symbol: "AVAX", change: 12.4 }, section: "news" },
  { id: 37, title: "TON Blockchain Daily Transactions Surpass Ethereum Mainnet", excerpt: "Telegram's native blockchain TON processed more daily transactions than Ethereum mainnet for the third consecutive week, fueled by Telegram mini-apps and gaming integrations.", category: "Altcoins", thumbnail: "/thumbnails/blockchain-crypto-500x281.jpeg", date: "May 20, 2026", hoursAgo: 9, readTime: "4 min read", author: "Yuki Matsuda", priceTag: { symbol: "TON", change: 6.8 }, section: "news" },
  { id: 38, title: "Chainlink Expands Cross-Chain Protocol to 20 New Networks", excerpt: "Chainlink's CCIP protocol added support for 20 additional blockchain networks, enabling seamless cross-chain messaging and token transfers for enterprise and DeFi applications.", category: "Altcoins", thumbnail: "/thumbnails/Hyperliquid-500x281.jpeg", date: "May 19, 2026", hoursAgo: 16, readTime: "3 min read", author: "Sarah Chen", priceTag: { symbol: "LINK", change: 4.3 }, section: "news" },
  { id: 39, title: "Sui Network Monthly Active Users Cross 10 Million", excerpt: "Move-based blockchain Sui reported 10 million monthly active users, driven by gaming applications and a mobile-first developer ecosystem that prioritizes low-latency interactions.", category: "Altcoins", thumbnail: "/thumbnails/gold-tokenization-500x281.jpg", date: "May 19, 2026", hoursAgo: 22, readTime: "3 min read", author: "Alex Rivera", priceTag: { symbol: "SUI", change: 15.2 }, section: "news" },
  { id: 40, title: "Near Protocol AI Layer Attracts 50 New Projects", excerpt: "Near Protocol's AI-focused development initiative has attracted over 50 projects building at the intersection of blockchain and artificial intelligence, supported by a $100M ecosystem fund.", category: "Altcoins", thumbnail: "/thumbnails/world-liberty-financial-500x281.jpeg", date: "May 18, 2026", hoursAgo: 30, readTime: "4 min read", author: "James Park", priceTag: { symbol: "NEAR", change: 8.7 }, section: "projects" },
  { id: 41, title: "Render Network GPU Capacity Increases 400% for AI Workloads", excerpt: "Render Network's decentralized GPU computing platform quadrupled its available capacity to meet surging AI rendering demand, with major film studios and AI labs joining the network.", category: "Altcoins", thumbnail: "/thumbnails/115462-1200x675.webp", date: "May 18, 2026", hoursAgo: 38, readTime: "3 min read", author: "Maria Santos", priceTag: { symbol: "RNDR", change: 22.1 }, section: "projects" },
  { id: 42, title: "Cosmos IBC Volume Hits $100B Cumulative Cross-Chain Transfers", excerpt: "The Inter-Blockchain Communication protocol facilitated its 100 billionth dollar in cross-chain transfers, demonstrating the growing adoption of Cosmos's interoperability standard.", category: "Altcoins", thumbnail: "/thumbnails/113705-500x281.png", date: "May 17, 2026", hoursAgo: 46, readTime: "3 min read", author: "Yuki Matsuda", section: "news" },
  { id: 43, title: "Aptos Integrates with Major US Banks for Instant Payments", excerpt: "Move blockchain Aptos announced banking integrations enabling instant stablecoin settlements for US financial institutions, positioning it as the preferred network for institutional payments.", category: "Altcoins", thumbnail: "/thumbnails/12825-wisdomtree-500x281.jpeg", date: "May 16, 2026", hoursAgo: 55, readTime: "4 min read", author: "Sarah Chen", badge: "NEW PROJECT", priceTag: { symbol: "APT", change: 10.3 }, section: "projects" },
  { id: 44, title: "Cardano Smart Contract Activity Doubles in Q2 2026", excerpt: "Cardano's eUTXO-based smart contract platform saw a doubling of on-chain activity in Q2, with over 200 DeFi protocols now deployed and a total TVL exceeding $2 billion.", category: "Altcoins", thumbnail: "/thumbnails/onchain-markets-500x281.jpeg", date: "May 15, 2026", hoursAgo: 65, readTime: "4 min read", author: "Alex Rivera", priceTag: { symbol: "ADA", change: 7.4 }, section: "news" },

  // ─── Regulation ───
  { id: 45, title: "US Senate Passes Comprehensive Crypto Market Structure Bill", excerpt: "The US Senate passed landmark crypto legislation establishing clear regulatory jurisdictions for the SEC and CFTC over digital assets, providing long-awaited legal clarity for the industry.", category: "Regulation", thumbnail: "/thumbnails/Moodys-financial-500x281.jpeg", date: "May 21, 2026", hoursAgo: 3, readTime: "6 min read", author: "Maria Santos", badge: "BREAKING", section: "news" },
  { id: 46, title: "EU MiCA Framework Full Implementation Goes Live", excerpt: "The European Union's Markets in Crypto-Assets regulation entered full force, with major exchanges completing compliance frameworks and several US-based firms gaining EU market access.", category: "Regulation", thumbnail: "/thumbnails/dtcc-onchain-500x281.jpg", date: "May 20, 2026", hoursAgo: 7, readTime: "5 min read", author: "Yuki Matsuda", badge: "ANALYSIS", section: "news" },
  { id: 47, title: "SEC Approves First DeFi Protocol Registration Under New Guidance", excerpt: "The SEC granted registration to a decentralized exchange under its newly published DeFi guidance framework, marking a historic first step toward regulated on-chain finance in the US.", category: "Regulation", thumbnail: "/thumbnails/blockchain-crypto-500x281.jpeg", date: "May 20, 2026", hoursAgo: 11, readTime: "5 min read", author: "Sarah Chen", section: "news" },
  { id: 48, title: "G20 Nations Agree on Global Crypto Tax Reporting Framework", excerpt: "Finance ministers from all G20 nations endorsed a unified crypto asset reporting standard requiring exchanges to share customer data across borders, closing offshore tax loopholes.", category: "Regulation", thumbnail: "/thumbnails/tokenization-bond-500x281.jpeg", date: "May 19, 2026", hoursAgo: 18, readTime: "5 min read", author: "James Park", badge: "DEEP DIVE", section: "news" },
  { id: 49, title: "UK FCA Issues New Crypto Advertising Standards", excerpt: "The UK's Financial Conduct Authority published updated crypto advertising rules requiring clear risk warnings and banning celebrities from promoting digital assets without proper disclosure.", category: "Regulation", thumbnail: "/thumbnails/world-liberty-financial-500x281.jpeg", date: "May 19, 2026", hoursAgo: 25, readTime: "4 min read", author: "Alex Rivera", section: "news" },
  { id: 50, title: "Japan FSA Approves Stablecoin Framework for Domestic Banks", excerpt: "Japan's Financial Services Agency published a comprehensive stablecoin issuance framework, allowing licensed domestic banks to issue yen-backed digital currencies on public blockchains.", category: "Regulation", thumbnail: "/thumbnails/Hyperliquid-500x281.jpeg", date: "May 18, 2026", hoursAgo: 32, readTime: "4 min read", author: "Maria Santos", section: "news" },
  { id: 51, title: "Singapore MAS Grants 5 New Major Payment Institution Licenses", excerpt: "Singapore's Monetary Authority issued five new Major Payment Institution licenses to crypto firms including Coinbase, OKX, and three regional exchanges, expanding the city-state's crypto hub status.", category: "Regulation", thumbnail: "/thumbnails/gold-tokenization-500x281.jpg", date: "May 18, 2026", hoursAgo: 40, readTime: "3 min read", author: "Yuki Matsuda", section: "news" },
  { id: 52, title: "IMF Calls for Coordinated Global Crypto Reserve Standards", excerpt: "The International Monetary Fund published a staff paper urging member nations to adopt coordinated standards for crypto reserves and stablecoin backing, warning of systemic risk from fragmented rules.", category: "Regulation", thumbnail: "/thumbnails/Moodys-financial-500x281.jpeg", date: "May 17, 2026", hoursAgo: 48, readTime: "5 min read", author: "Sarah Chen", badge: "ANALYSIS", section: "news" },
  { id: 53, title: "India Revises Crypto Tax Policy to 20% Flat Rate", excerpt: "India's Finance Ministry announced a revised flat 20% tax rate on crypto gains, replacing the previous 30% regime, in a move aimed at bringing offshore Indian traders back to domestic platforms.", category: "Regulation", thumbnail: "/thumbnails/12825-wisdomtree-500x281.jpeg", date: "May 16, 2026", hoursAgo: 58, readTime: "3 min read", author: "James Park", section: "news" },
  { id: 54, title: "Brazil Central Bank Issues Crypto Custody Guidelines for Banks", excerpt: "Brazil's central bank Banco Central do Brasil published official guidance for commercial banks wishing to offer crypto custody and trading services to retail and institutional clients.", category: "Regulation", thumbnail: "/thumbnails/115462-1200x675.webp", date: "May 15, 2026", hoursAgo: 70, readTime: "4 min read", author: "Alex Rivera", section: "news" },

  // ─── Banking ───
  { id: 55, title: "Goldman Sachs Launches Tokenized Fund on Ethereum Mainnet", excerpt: "Goldman Sachs Asset Management debuted its first fully tokenized money market fund on Ethereum, offering institutional investors 24/7 redemptions and on-chain transparency.", category: "Banking", thumbnail: "/thumbnails/dtcc-onchain-500x281.jpg", date: "May 21, 2026", hoursAgo: 2, readTime: "5 min read", author: "Sarah Chen", badge: "BREAKING", priceTag: { symbol: "ETH", change: 3.2 }, section: "markets" },
  { id: 56, title: "JPMorgan Expands Onyx Blockchain to 50 Financial Institution Partners", excerpt: "JPMorgan's proprietary blockchain platform Onyx now connects 50 major financial institutions for intraday repo transactions and tokenized deposit transfers.", category: "Banking", thumbnail: "/thumbnails/tokenization-bond-500x281.jpeg", date: "May 20, 2026", hoursAgo: 6, readTime: "4 min read", author: "Yuki Matsuda", badge: "MARKET ANALYSIS", section: "markets" },
  { id: 57, title: "Citibank Pilots Tokenized FX Settlement with SWIFT Connectivity", excerpt: "Citibank completed a successful pilot of tokenized foreign exchange settlement using SWIFT's new blockchain messaging layer, reducing settlement time from two days to minutes.", category: "Banking", thumbnail: "/thumbnails/Moodys-financial-500x281.jpeg", date: "May 20, 2026", hoursAgo: 10, readTime: "4 min read", author: "James Park", section: "markets" },
  { id: 58, title: "BNY Mellon Expands Bitcoin and Ethereum Custody to $50B AUM", excerpt: "Bank of New York Mellon surpassed $50 billion in digital asset custody AUM after extending services to 200 additional institutional clients seeking regulated crypto exposure.", category: "Banking", thumbnail: "/thumbnails/onchain-markets-500x281.jpeg", date: "May 19, 2026", hoursAgo: 17, readTime: "3 min read", author: "Maria Santos", priceTag: { symbol: "BTC", change: 2.1 }, section: "markets" },
  { id: 59, title: "Standard Chartered Opens Digital Asset Prime Brokerage", excerpt: "Standard Chartered launched a full-service digital asset prime brokerage for hedge funds and family offices, offering lending, custody, and OTC derivatives on 30 crypto assets.", category: "Banking", thumbnail: "/thumbnails/world-liberty-financial-500x281.jpeg", date: "May 18, 2026", hoursAgo: 28, readTime: "4 min read", author: "Alex Rivera", section: "markets" },
  { id: 60, title: "Deutsche Bank Partners with Ethereum Layer 2 for Corporate Settlement", excerpt: "Deutsche Bank announced a partnership with a leading Ethereum Layer 2 network to pilot instant corporate bond settlement, with plans to go live with €500M in issuances by Q4.", category: "Banking", thumbnail: "/thumbnails/blockchain-crypto-500x281.jpeg", date: "May 18, 2026", hoursAgo: 36, readTime: "4 min read", author: "Sarah Chen", badge: "NEW PROJECT", section: "markets" },
  { id: 61, title: "Federal Reserve Issues Paper on CBDC vs Stablecoin Policy Framework", excerpt: "The Federal Reserve published a comprehensive discussion paper comparing potential designs for a US central bank digital currency with private stablecoin alternatives, requesting public comment.", category: "Banking", thumbnail: "/thumbnails/12825-wisdomtree-500x281.jpeg", date: "May 17, 2026", hoursAgo: 45, readTime: "6 min read", author: "James Park", badge: "DEEP DIVE", section: "news" },
  { id: 62, title: "HSBC Launches Retail Crypto Trading App in Hong Kong", excerpt: "HSBC became the first global systemically important bank to offer direct cryptocurrency trading to retail customers, launching a regulated app in Hong Kong supporting BTC, ETH, and six altcoins.", category: "Banking", thumbnail: "/thumbnails/gold-tokenization-500x281.jpg", date: "May 16, 2026", hoursAgo: 54, readTime: "3 min read", author: "Maria Santos", section: "news" },
  { id: 63, title: "Morgan Stanley Offers Direct Bitcoin Exposure to Wealth Management Clients", excerpt: "Morgan Stanley's E*Trade platform began offering direct Bitcoin and Ethereum holdings to retail wealth management clients, eliminating the need for separately managed ETF wrappers.", category: "Banking", thumbnail: "/thumbnails/113705-500x281.png", date: "May 15, 2026", hoursAgo: 62, readTime: "4 min read", author: "Yuki Matsuda", priceTag: { symbol: "BTC", change: 1.8 }, section: "news" },
  { id: 64, title: "Santander Issues $200M Digital Bond on Public Blockchain", excerpt: "Santander Group successfully issued a €200 million bond on Ethereum's public mainnet, achieving full settlement transparency and reaching a new investor class through tokenization.", category: "Banking", thumbnail: "/thumbnails/116421-500x281.jpeg", date: "May 14, 2026", hoursAgo: 72, readTime: "3 min read", author: "Alex Rivera", section: "markets" },

  // ─── Exchanges ───
  { id: 65, title: "Binance Monthly Trading Volume Reaches $1 Trillion Record", excerpt: "Binance reported over $1 trillion in monthly spot and derivatives trading volume for the first time, reclaiming global exchange dominance following regulatory settlements in the US and EU.", category: "Exchanges", thumbnail: "/thumbnails/112025-hyperliquid-500x281.jpeg", date: "May 21, 2026", hoursAgo: 3, readTime: "3 min read", author: "James Park", badge: "BREAKING", priceTag: { symbol: "BNB", change: 7.5 }, section: "markets" },
  { id: 66, title: "Coinbase Launches Futures Trading for 10 New Altcoins", excerpt: "Coinbase Advanced Trading expanded its regulated futures offerings with 10 new altcoin contracts including SOL, AVAX, and TON, targeting US institutional traders seeking regulated exposure.", category: "Exchanges", thumbnail: "/thumbnails/Hyperliquid-500x281.jpeg", date: "May 20, 2026", hoursAgo: 7, readTime: "3 min read", author: "Maria Santos", priceTag: { symbol: "COIN", change: 5.1 }, section: "markets" },
  { id: 67, title: "Kraken Receives US National Banking License Approval", excerpt: "Kraken became the first crypto exchange to receive a full US national banking charter, enabling it to offer fiat banking services including interest-bearing accounts and debit cards.", category: "Exchanges", thumbnail: "/thumbnails/tokenization-bond-500x281.jpeg", date: "May 20, 2026", hoursAgo: 11, readTime: "5 min read", author: "Yuki Matsuda", badge: "MARKET ANALYSIS", section: "news" },
  { id: 68, title: "OKX Secures EU MiCA License and Expands to 10 European Markets", excerpt: "OKX received its MiCA-compliant virtual asset service provider license and simultaneously launched localized versions for 10 EU countries, targeting 100 million new potential users.", category: "Exchanges", thumbnail: "/thumbnails/blockchain-crypto-500x281.jpeg", date: "May 19, 2026", hoursAgo: 20, readTime: "4 min read", author: "Sarah Chen", section: "news" },
  { id: 69, title: "Bybit Surpasses 30 Million Users Following Derivatives Growth", excerpt: "Bybit reported reaching 30 million registered users, attributing the milestone to its options platform expansion and copy trading features that attracted retail traders from TradFi.", category: "Exchanges", thumbnail: "/thumbnails/onchain-markets-500x281.jpeg", date: "May 18, 2026", hoursAgo: 30, readTime: "3 min read", author: "Alex Rivera", priceTag: { symbol: "BIT", change: 4.8 }, section: "news" },
  { id: 70, title: "dYdX v5 Launches Permissionless Market Creation for Any Asset", excerpt: "dYdX Chain's fifth version allows any user to permissionlessly create and list new perpetual futures markets, dramatically expanding tradable assets from 50 to over 500.", category: "Exchanges", thumbnail: "/thumbnails/gold-tokenization-500x281.jpg", date: "May 18, 2026", hoursAgo: 38, readTime: "4 min read", author: "James Park", badge: "NEW PROJECT", priceTag: { symbol: "DYDX", change: 19.2 }, section: "projects" },
  { id: 71, title: "Gemini Relaunches Regulated Derivatives Platform in US Market", excerpt: "Gemini received CFTC approval to relaunch its futures and options platform for US residents, becoming the first licensed crypto derivatives exchange to offer both spot and derivatives to retail.", category: "Exchanges", thumbnail: "/thumbnails/Moodys-financial-500x281.jpeg", date: "May 17, 2026", hoursAgo: 46, readTime: "4 min read", author: "Maria Santos", section: "news" },
  { id: 72, title: "Crypto.com Becomes First Major Exchange to Fully Comply with MiCA", excerpt: "Crypto.com completed its EU MiCA compliance process ahead of the August deadline, becoming the first major global exchange to operate under the full regulatory framework across all EU member states.", category: "Exchanges", thumbnail: "/thumbnails/dtcc-onchain-500x281.jpg", date: "May 16, 2026", hoursAgo: 54, readTime: "3 min read", author: "Yuki Matsuda", section: "news" },
  { id: 73, title: "Robinhood Acquires Bitstamp for $200M Expanding EU Presence", excerpt: "Robinhood Markets closed its acquisition of European crypto exchange Bitstamp for $200 million, instantly gaining regulatory licenses in 10 EU countries and 5 million verified users.", category: "Exchanges", thumbnail: "/thumbnails/12825-wisdomtree-500x281.jpeg", date: "May 15, 2026", hoursAgo: 62, readTime: "4 min read", author: "Sarah Chen", section: "markets" },
  { id: 74, title: "Uniswap Labs Reports $1B Annual Protocol Revenue for First Time", excerpt: "Uniswap Protocol generated over $1 billion in annualized fee revenue, making it the first decentralized exchange to cross the billion-dollar threshold and cementing its dominance in DEX volume.", category: "Exchanges", thumbnail: "/thumbnails/world-liberty-financial-500x281.jpeg", date: "May 14, 2026", hoursAgo: 72, readTime: "4 min read", author: "Alex Rivera", badge: "DEEP DIVE", priceTag: { symbol: "UNI", change: 9.4 }, section: "markets" },

  // ─── Blockchain Events ───
  { id: 75, title: "Bitcoin 2026 Conference Draws Record 50,000 Attendees to Nashville", excerpt: "The world's largest Bitcoin conference set a new attendance record with 50,000 participants from 90 countries, featuring keynotes from CEOs of BlackRock, MicroStrategy, and leading sovereign wealth funds.", category: "Blockchain Events", thumbnail: "/thumbnails/onchain-markets-500x281.jpeg", date: "May 21, 2026", hoursAgo: 4, readTime: "4 min read", author: "Yuki Matsuda", badge: "BREAKING", section: "news" },
  { id: 76, title: "ETHGlobal Hackathon Singapore Attracts 3,000 Developers", excerpt: "ETHGlobal's Singapore event broke participation records with 3,000 registered developers competing for $2 million in prizes, with winning projects focused on AI-blockchain integration and ZK proofs.", category: "Blockchain Events", thumbnail: "/thumbnails/blockchain-crypto-500x281.jpeg", date: "May 20, 2026", hoursAgo: 8, readTime: "3 min read", author: "James Park", section: "news" },
  { id: 77, title: "Consensus 2026 Keynotes Reveal Major Protocol Announcements", excerpt: "CoinDesk's annual Consensus conference hosted major announcements from Ethereum, Solana, and Cardano teams, alongside institutional panels attended by the largest crypto allocators in history.", category: "Blockchain Events", thumbnail: "/thumbnails/tokenization-bond-500x281.jpeg", date: "May 19, 2026", hoursAgo: 14, readTime: "5 min read", author: "Maria Santos", badge: "INSIGHT", section: "news" },
  { id: 78, title: "Token2049 Singapore Reveals Crypto's Biggest Partnership Deals", excerpt: "Token2049 Singapore became the venue for over 20 major partnership announcements spanning DeFi, gaming, and institutional adoption, with combined deal value exceeding $500 million.", category: "Blockchain Events", thumbnail: "/thumbnails/Hyperliquid-500x281.jpeg", date: "May 19, 2026", hoursAgo: 21, readTime: "4 min read", author: "Alex Rivera", section: "news" },
  { id: 79, title: "Permissionless III Conference Opens with Record DeFi Attendance", excerpt: "Bankless's Permissionless conference opened in Salt Lake City with its largest-ever DeFi-focused agenda, drawing protocol founders, LPs, and analysts for three days of technical sessions.", category: "Blockchain Events", thumbnail: "/thumbnails/gold-tokenization-500x281.jpg", date: "May 18, 2026", hoursAgo: 29, readTime: "3 min read", author: "Sarah Chen", section: "news" },
  { id: 80, title: "Devcon 8 Ethereum Developer Conference Announced for Buenos Aires", excerpt: "The Ethereum Foundation announced Devcon 8 will be held in Buenos Aires, Argentina, in November 2026, continuing the tradition of hosting the premier Ethereum developer gathering in South America.", category: "Blockchain Events", thumbnail: "/thumbnails/12225-solana-kalshi-500x281.jpg", date: "May 18, 2026", hoursAgo: 36, readTime: "3 min read", author: "Yuki Matsuda", section: "news" },
  { id: 81, title: "Korea Blockchain Week Highlights GameFi and NFT Ecosystem Recovery", excerpt: "Seoul's Korea Blockchain Week showcased a resurgent GameFi sector with 30 playable demos, attracting investment from South Korean gaming giants including Kakao and Netmarble.", category: "Blockchain Events", thumbnail: "/thumbnails/Moodys-financial-500x281.jpeg", date: "May 17, 2026", hoursAgo: 45, readTime: "4 min read", author: "James Park", section: "news" },
  { id: 82, title: "Paris Blockchain Week Features EU MiCA Live Implementation Sessions", excerpt: "Paris Blockchain Week dedicated three full tracks to MiCA compliance implementation, drawing compliance officers and legal teams from over 200 exchanges and crypto service providers across Europe.", category: "Blockchain Events", thumbnail: "/thumbnails/dtcc-onchain-500x281.jpg", date: "May 16, 2026", hoursAgo: 55, readTime: "4 min read", author: "Maria Santos", section: "news" },
  { id: 83, title: "Dubai Crypto Week Cements Gulf Region as Global Crypto Hub", excerpt: "DIFC's annual crypto summit hosted the signing of 15 memoranda of understanding between Gulf sovereign funds and leading crypto infrastructure firms, with $10 billion in planned investments announced.", category: "Blockchain Events", thumbnail: "/thumbnails/world-liberty-financial-500x281.jpeg", date: "May 15, 2026", hoursAgo: 64, readTime: "3 min read", author: "Yuki Matsuda", section: "news" },
  { id: 84, title: "Solana Breakpoint 2026 Reveals Next-Generation Protocol Roadmap", excerpt: "Solana Foundation's annual Breakpoint conference in Amsterdam unveiled a comprehensive 2027 roadmap including Firedancer client launch, 400,000 TPS targets, and a major mobile ecosystem expansion.", category: "Blockchain Events", thumbnail: "/thumbnails/115462-1200x675.webp", date: "May 14, 2026", hoursAgo: 75, readTime: "5 min read", author: "Alex Rivera", badge: "DEEP DIVE", priceTag: { symbol: "SOL", change: 6.3 }, section: "news" },
];

export function timeAgo(hours?: number): string {
  if (!hours) return "";
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export const FEATURED_NEWS = ALL_NEWS.filter((n) => n.featured || n.id <= 4);
export const LATEST_NEWS = [...ALL_NEWS].sort((a, b) => (a.hoursAgo ?? 999) - (b.hoursAgo ?? 999));
export const MOST_READ = [ALL_NEWS[5], ALL_NEWS[7], ALL_NEWS[9], ALL_NEWS[11], ALL_NEWS[2]];
export const EDITORS_PICKS = [ALL_NEWS[5], ALL_NEWS[3], ALL_NEWS[9]];
export const NEWS_SECTION = ALL_NEWS.filter((n) => n.section === "news");
export const MARKETS_SECTION = ALL_NEWS.filter((n) => n.section === "markets");
export const PROJECTS_SECTION = ALL_NEWS.filter((n) => n.section === "projects");

export const getByCategory = (cat: string) =>
  ALL_NEWS.filter((n) => n.category.toLowerCase() === cat.toLowerCase());
