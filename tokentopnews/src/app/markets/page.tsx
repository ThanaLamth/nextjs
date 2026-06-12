import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Markets",
  description: "Live crypto market prices, market caps and 24h changes.",
};

const COINS = [
  { rank: 1, sym: "BTC", name: "Bitcoin", price: "$75,000.00", c24: "+2.3%", c7: "+8.1%", cap: "$1.47T", vol: "$38.2B", bull24: true, bull7: true, color: "#F7931A", cat: "Layer1" },
  { rank: 2, sym: "ETH", name: "Ethereum", price: "$3,255.15", c24: "+1.54%", c7: "+5.2%", cap: "$391B", vol: "$18.1B", bull24: true, bull7: true, color: "#627EEA", cat: "Layer1" },
  { rank: 3, sym: "BNB", name: "BNB", price: "$828.00", c24: "+2.18%", c7: "+3.9%", cap: "$120B", vol: "$2.4B", bull24: true, bull7: true, color: "#F0B90B", cat: "Layer1" },
  { rank: 4, sym: "SOL", name: "Solana", price: "$161.48", c24: "+2.31%", c7: "+11.2%", cap: "$74B", vol: "$4.8B", bull24: true, bull7: true, color: "#9945FF", cat: "Layer1" },
  { rank: 5, sym: "XRP", name: "XRP", price: "$0.54", c24: "-3.21%", c7: "-1.8%", cap: "$29B", vol: "$1.9B", bull24: false, bull7: false, color: "#00AAE4", cat: "Layer1" },
  { rank: 6, sym: "ADA", name: "Cardano", price: "$0.57", c24: "+2.18%", c7: "+4.5%", cap: "$20B", vol: "$680M", bull24: true, bull7: true, color: "#0033AD", cat: "Layer1" },
  { rank: 7, sym: "AVAX", name: "Avalanche", price: "$38.20", c24: "+4.1%", c7: "+9.3%", cap: "$15B", vol: "$520M", bull24: true, bull7: true, color: "#E84142", cat: "Layer1" },
  { rank: 8, sym: "DOGE", name: "Dogecoin", price: "$0.182", c24: "+5.6%", c7: "+14.2%", cap: "$25B", vol: "$2.1B", bull24: true, bull7: true, color: "#C2A633", cat: "Layer1" },
];

const STATS = [
  { label: "Total Market Cap", value: "$2.64T", chg: "+2.1%", bull: true },
  { label: "24h Volume", value: "$98.4B", chg: "+12.4%", bull: true },
  { label: "BTC Dominance", value: "52.4%", chg: "-0.3%", bull: false },
  { label: "ETH Dominance", value: "14.8%", chg: "+0.2%", bull: true },
  { label: "DeFi Market Cap", value: "$108B", chg: "+3.8%", bull: true },
  { label: "Active Cryptos", value: "13,248", chg: "", bull: true },
];

export default function MarketsPage() {
  return (
    <main>
      <section style={{ background: "var(--surface)", borderBottom: "0.5px solid var(--border-subtle)", padding: "var(--s10) 0", position: "relative", overflow: "hidden", marginBottom: "var(--s8)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "var(--grad-brand)" }} />
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "var(--s8)", gap: "var(--s4)", flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 11, color: "var(--text-3)" }}>
                <Link href="/">Home</Link>
                <span>/</span>
                <span style={{ color: "var(--text-brand)" }}>Markets</span>
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
                <span className="grad-brand">Crypto Markets</span>
              </h1>
              <p style={{ fontSize: 13, color: "var(--text-3)" }}>Live prices, market caps and 24h changes</p>
            </div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {["24H", "7D", "30D", "1Y", "ALL"].map((period, index) => (
                <button key={period} type="button" style={{ padding: "5px 12px", background: index === 0 ? "var(--grad-brand)" : "var(--raised)", border: `0.5px solid ${index === 0 ? "transparent" : "var(--border)"}`, borderRadius: "var(--r-pill)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-display)", color: index === 0 ? "#fff" : "var(--text-3)", cursor: "pointer" }}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "var(--s4)" }}>
            {STATS.map((stat) => (
              <div key={stat.label} style={{ background: "var(--raised)", border: "0.5px solid var(--border)", borderRadius: "var(--r-md)", padding: "var(--s4)" }}>
                <div style={{ fontSize: 10, color: "var(--text-3)", marginBottom: 4 }}>{stat.label}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{stat.value}</div>
                {stat.chg ? <div className={stat.bull ? "bull" : "bear"} style={{ fontSize: 11 }}>{stat.bull ? "▲" : "▼"} {stat.chg}</div> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div style={{ display: "flex", gap: 8, marginBottom: "var(--s6)", flexWrap: "wrap", alignItems: "center" }}>
          <input type="text" placeholder="Search cryptocurrency..." style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--r-md)", padding: "8px 14px", fontSize: 13, color: "var(--text-1)", width: 280, outline: "none" }} />
          {["All", "DeFi", "Layer1", "Layer2", "Gaming", "AI"].map((filter, index) => (
            <button key={filter} type="button" style={{ padding: "6px 14px", background: index === 0 ? "var(--brand-subtle)" : "var(--surface)", border: `0.5px solid ${index === 0 ? "var(--brand)" : "var(--border)"}`, borderRadius: "var(--r-pill)", fontSize: 11, fontWeight: 600, color: index === 0 ? "var(--text-brand)" : "var(--text-3)", cursor: "pointer" }}>
              {filter}
            </button>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-3)" }}>{COINS.length} assets</span>
        </div>

        <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--r-lg)", overflow: "hidden", marginBottom: "var(--s16)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "40px 2fr 1fr 1fr 1fr 1fr 1fr 80px", gap: "var(--s4)", padding: "10px var(--s5)", background: "var(--raised)", borderBottom: "0.5px solid var(--border-subtle)" }}>
            {["#", "Name", "Price", "24h %", "7d %", "Market Cap", "Volume (24h)", ""].map((heading) => (
              <div key={heading} style={{ fontSize: 10, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {heading}
              </div>
            ))}
          </div>
          {COINS.map((coin) => (
            <div key={coin.sym} style={{ display: "grid", gridTemplateColumns: "40px 2fr 1fr 1fr 1fr 1fr 1fr 80px", gap: "var(--s4)", padding: "14px var(--s5)", borderBottom: "0.5px solid var(--border-subtle)", alignItems: "center" }}>
              <div style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 600 }}>{coin.rank}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: coin.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                  {coin.sym[0]}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13 }}>{coin.name}</div>
                  <div style={{ fontSize: 10, color: "var(--text-3)" }}>{coin.sym}</div>
                </div>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600 }}>{coin.price}</div>
              <div className={coin.bull24 ? "bull" : "bear"} style={{ fontSize: 12 }}>{coin.bull24 ? "▲" : "▼"} {coin.c24.replace(/[+-]/, "")}</div>
              <div className={coin.bull7 ? "bull" : "bear"} style={{ fontSize: 12 }}>{coin.bull7 ? "▲" : "▼"} {coin.c7.replace(/[+-]/, "")}</div>
              <div style={{ fontSize: 12, color: "var(--text-2)" }}>{coin.cap}</div>
              <div style={{ fontSize: 12, color: "var(--text-2)" }}>{coin.vol}</div>
              <button type="button" className="btn btn-ghost btn-sm" style={{ fontSize: 10, justifyContent: "center" }}>
                Chart
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
