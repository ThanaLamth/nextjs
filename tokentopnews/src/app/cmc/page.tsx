import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CMC Market Data",
  description: "Real-time cryptocurrency market data, prices, and rankings",
};

const COINS = [
  { rank: 1, sym: "BTC", name: "Bitcoin", price: "$75,000.00", c24: "+2.3%", c7: "+8.1%", cap: "$1.47T", vol: "$38.2B", bull: true, color: "#F7931A" },
  { rank: 2, sym: "ETH", name: "Ethereum", price: "$3,255.15", c24: "+1.54%", c7: "+5.2%", cap: "$391B", vol: "$18.1B", bull: true, color: "#627EEA" },
  { rank: 3, sym: "BNB", name: "BNB", price: "$828.00", c24: "+2.18%", c7: "+3.9%", cap: "$120B", vol: "$2.4B", bull: true, color: "#F0B90B" },
  { rank: 4, sym: "SOL", name: "Solana", price: "$161.48", c24: "+2.31%", c7: "+11.2%", cap: "$74B", vol: "$4.8B", bull: true, color: "#9945FF" },
  { rank: 5, sym: "XRP", name: "XRP", price: "$0.54", c24: "-3.21%", c7: "-1.8%", cap: "$29B", vol: "$1.9B", bull: false, color: "#00AAE4" },
  { rank: 6, sym: "ADA", name: "Cardano", price: "$0.57", c24: "+2.18%", c7: "+4.5%", cap: "$20B", vol: "$680M", bull: true, color: "#0033AD" },
  { rank: 7, sym: "AVAX", name: "Avalanche", price: "$38.20", c24: "+4.1%", c7: "+9.3%", cap: "$15B", vol: "$520M", bull: true, color: "#E84142" },
  { rank: 8, sym: "DOGE", name: "Dogecoin", price: "$0.182", c24: "+5.6%", c7: "+14.2%", cap: "$25B", vol: "$2.1B", bull: true, color: "#C2A633" },
  { rank: 9, sym: "DOT", name: "Polkadot", price: "$9.24", c24: "-0.8%", c7: "+2.1%", cap: "$12B", vol: "$380M", bull: false, color: "#E6007A" },
  { rank: 10, sym: "LINK", name: "Chainlink", price: "$18.40", c24: "+3.2%", c7: "+7.4%", cap: "$10B", vol: "$590M", bull: true, color: "#375BD2" },
  { rank: 11, sym: "MATIC", name: "Polygon", price: "$0.92", c24: "+1.9%", c7: "+5.8%", cap: "$9B", vol: "$420M", bull: true, color: "#8247E5" },
  { rank: 12, sym: "UNI", name: "Uniswap", price: "$12.80", c24: "+2.4%", c7: "+8.9%", cap: "$7.6B", vol: "$310M", bull: true, color: "#FF007A" },
  { rank: 13, sym: "LTC", name: "Litecoin", price: "$84.50", c24: "+1.2%", c7: "+3.4%", cap: "$6.3B", vol: "$430M", bull: true, color: "#BFBBBB" },
  { rank: 14, sym: "ATOM", name: "Cosmos", price: "$10.20", c24: "-1.4%", c7: "+0.8%", cap: "$3.9B", vol: "$160M", bull: false, color: "#2E3148" },
  { rank: 15, sym: "ARB", name: "Arbitrum", price: "$1.18", c24: "+3.8%", c7: "+12.1%", cap: "$3.0B", vol: "$280M", bull: true, color: "#28A0F0" },
];

const STATS = [
  { label: "Total Market Cap", value: "$2.64T", chg: "+2.1%", bull: true },
  { label: "24h Volume", value: "$98.4B", chg: "+12.4%", bull: true },
  { label: "BTC Dominance", value: "52.4%", chg: "-0.3%", bull: false },
  { label: "ETH Dominance", value: "14.8%", chg: "+0.2%", bull: true },
  { label: "DeFi Market Cap", value: "$108B", chg: "+3.8%", bull: true },
  { label: "Active Cryptos", value: "13,248", chg: "", bull: true },
];

export default function CmcPage() {
  return (
    <main>
      <section
        style={{
          background: "var(--surface)",
          borderBottom: "0.5px solid var(--border-subtle)",
          padding: "var(--s8) 0",
          marginBottom: "var(--s8)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg,#00B4D8,#0077B6,#48CAE4)",
          }}
        />
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
              fontSize: 11,
              color: "var(--text-3)",
            }}
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/category/sponsored" style={{ color: "var(--text-brand)" }}>
              Sponsored Articles
            </Link>
            <span>/</span>
            <span>CMC</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--s5)", marginBottom: "var(--s8)" }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "var(--r-lg)",
                background: "linear-gradient(135deg,#00B4D8,#0077B6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 900,
                color: "#fff",
                fontFamily: "var(--font-display)",
              }}
            >
              $
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 800,
                  marginBottom: 4,
                }}
              >
                CMC Market Data
              </h1>
              <p style={{ fontSize: 13, color: "var(--text-3)" }}>
                Live cryptocurrency prices, market cap rankings, and 24h performance
              </p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "var(--gutter)" }}>
            {STATS.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "var(--raised)",
                  border: "0.5px solid var(--border)",
                  borderRadius: "var(--r-md)",
                  padding: "var(--s4)",
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 4,
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    fontWeight: 800,
                    marginBottom: 2,
                  }}
                >
                  {stat.value}
                </div>
                {stat.chg ? (
                  <div className={stat.bull ? "bull" : "bear"} style={{ fontSize: 11 }}>
                    {stat.bull ? "▲" : "▼"} {stat.chg}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ marginBottom: "var(--s16)" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: "var(--s6)", alignItems: "center", flexWrap: "wrap" }}>
          {["All", "DeFi", "Layer 1", "Layer 2", "Memecoins", "AI Tokens"].map((filter, index) => (
            <button
              key={filter}
              style={{
                padding: "5px 14px",
                background:
                  index === 0 ? "linear-gradient(135deg,#00B4D8,#0077B6)" : "var(--raised)",
                border: `0.5px solid ${index === 0 ? "transparent" : "var(--border)"}`,
                borderRadius: "var(--r-pill)",
                fontSize: 11,
                fontWeight: 600,
                color: index === 0 ? "#fff" : "var(--text-3)",
                cursor: "pointer",
              }}
            >
              {filter}
            </button>
          ))}
          <input
            type="text"
            placeholder="Search coin..."
            style={{
              marginLeft: "auto",
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              borderRadius: "var(--r-md)",
              padding: "6px 12px",
              fontSize: 12,
              color: "var(--text-1)",
              width: 200,
              outline: "none",
            }}
          />
        </div>

        <div
          style={{
            background: "var(--surface)",
            border: "0.5px solid var(--border)",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 2fr 1.2fr 1fr 1fr 1.2fr 1.2fr",
              gap: 0,
              padding: "10px 20px",
              background: "var(--raised)",
              borderBottom: "0.5px solid var(--border-subtle)",
            }}
          >
            {["#", "Name", "Price", "24h", "7d", "Market Cap", "Volume (24h)"].map((header) => (
              <div
                key={header}
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  textAlign: header === "#" ? "center" : "left",
                }}
              >
                {header}
              </div>
            ))}
          </div>
          {COINS.map((coin, index) => (
            <div
              key={coin.sym}
              className="cmc-market-row"
              style={{
                display: "grid",
                gridTemplateColumns: "40px 2fr 1.2fr 1fr 1fr 1.2fr 1.2fr",
                gap: 0,
                padding: "12px 20px",
                borderBottom: index < COINS.length - 1 ? "0.5px solid var(--border-subtle)" : "none",
                alignItems: "center",
                transition: "background 0.12s",
              }}
            >
              <div style={{ fontSize: 12, color: "var(--text-3)", textAlign: "center", fontFamily: "monospace" }}>
                {coin.rank}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: coin.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {coin.sym[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{coin.name}</div>
                  <div style={{ fontSize: 10, color: "var(--text-3)" }}>{coin.sym}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, fontFamily: "monospace", fontWeight: 600 }}>{coin.price}</div>
              <div className={coin.bull ? "bull" : "bear"} style={{ fontSize: 12 }}>
                {coin.bull ? "▲" : "▼"} {coin.c24}
              </div>
              <div className={coin.bull ? "bull" : "bear"} style={{ fontSize: 12 }}>
                {coin.bull ? "▲" : "▼"} {coin.c7}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-2)" }}>{coin.cap}</div>
              <div style={{ fontSize: 12, color: "var(--text-2)" }}>{coin.vol}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "var(--s6)" }}>
          <button className="btn btn-ghost" style={{ minWidth: 200, justifyContent: "center" }}>
            Load more coins
          </button>
        </div>
      </div>
    </main>
  );
}
