"use client";

import Link from "next/link";
import { use, type JSX } from "react";

const TABS = [
  { id: "identity", label: "Identity", icon: "👤", desc: "Personal information and public profile" },
  { id: "preferences", label: "Preferences", icon: "⚙️", desc: "Display and reading preferences" },
  { id: "investment", label: "Investment Profile", icon: "📊", desc: "Your risk profile and investment focus" },
  { id: "watchlist", label: "Watchlist", icon: "👁", desc: "Assets you are tracking" },
  { id: "portfolio", label: "Portfolio", icon: "💼", desc: "Your holdings overview" },
  { id: "notifications", label: "Notifications", icon: "🔔", desc: "Notification preferences" },
  { id: "social", label: "Social Accounts", icon: "🔗", desc: "Connected social media accounts" },
  { id: "reputation", label: "Reputation", icon: "⭐", desc: "Badges, scores, and community standing" },
  { id: "activity", label: "Activity History", icon: "📋", desc: "Reading history and interactions" },
  { id: "billing", label: "Subscription / Billing", icon: "💳", desc: "Plan details and payment" },
] as const;

type TabId = (typeof TABS)[number]["id"];
type ProfileSearchParams = { tab?: string | string[] | undefined };
type ProfilePageProps = { searchParams: Promise<ProfileSearchParams> };

function getActiveTab(searchParams: ProfileSearchParams) {
  const value = Array.isArray(searchParams.tab) ? searchParams.tab[0] : searchParams.tab;
  return TABS.find((tab) => tab.id === value) ?? TABS[0];
}

function IdentitySection() {
  return (
    <div>
      <h2 className="t-h3" style={{ marginBottom: "var(--s6)" }}>
        Identity
      </h2>
      <div
        style={{
          display: "flex",
          gap: "var(--s8)",
          alignItems: "flex-start",
          flexWrap: "wrap",
          marginBottom: "var(--s8)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "var(--grad-brand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "#fff",
              fontFamily: "var(--font-display)",
              marginBottom: "var(--s3)",
            }}
          >
            T
          </div>
          <button className="btn btn-outline btn-sm">Change photo</button>
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--s4)",
              marginBottom: "var(--s4)",
            }}
          >
            {[
              ["First name", "Tommy"],
              ["Last name", "Nguyen"],
              ["Username", "@tommy_crypto"],
              ["Location", "Ho Chi Minh City, VN"],
            ].map(([label, value]) => (
              <div key={label}>
                <label
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--text-3)",
                    display: "block",
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {label}
                </label>
                <input
                  defaultValue={value}
                  style={{
                    width: "100%",
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    borderRadius: "var(--r-md)",
                    padding: "8px 12px",
                    fontSize: 13,
                    color: "var(--text-1)",
                    outline: "none",
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: "var(--s4)" }}>
            <label
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--text-3)",
                display: "block",
                marginBottom: 5,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Bio
            </label>
            <textarea
              rows={3}
              defaultValue="Crypto analyst & DeFi enthusiast. Tracking markets since 2017."
              style={{
                width: "100%",
                background: "var(--surface)",
                border: "0.5px solid var(--border)",
                borderRadius: "var(--r-md)",
                padding: "8px 12px",
                fontSize: 13,
                color: "var(--text-1)",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>
          <div style={{ marginBottom: "var(--s6)" }}>
            <label
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--text-3)",
                display: "block",
                marginBottom: 5,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Website
            </label>
            <input
              defaultValue="https://tommycrypto.xyz"
              style={{
                width: "100%",
                background: "var(--surface)",
                border: "0.5px solid var(--border)",
                borderRadius: "var(--r-md)",
                padding: "8px 12px",
                fontSize: 13,
                color: "var(--text-1)",
                outline: "none",
              }}
            />
          </div>
          <button className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  );
}

function PreferencesSection() {
  const preferences = [
    { label: "Language", opts: ["English", "Vietnamese", "Chinese", "Japanese"] },
    { label: "Content density", opts: ["Compact", "Default", "Comfortable"] },
    { label: "Default sort", opts: ["Latest", "Most Read", "Trending"] },
  ];

  return (
    <div>
      <h2 className="t-h3" style={{ marginBottom: "var(--s6)" }}>
        Preferences
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--s6)" }}>
        {preferences.map((preference) => (
          <div key={preference.label}>
            <label
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--text-3)",
                display: "block",
                marginBottom: "var(--s3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {preference.label}
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {preference.opts.map((option, index) => (
                <button
                  key={option}
                  style={{
                    padding: "6px 16px",
                    background: index === 0 ? "var(--brand)" : "var(--raised)",
                    border: `0.5px solid ${index === 0 ? "transparent" : "var(--border)"}`,
                    borderRadius: "var(--r-pill)",
                    fontSize: 12,
                    fontWeight: 600,
                    color: index === 0 ? "#fff" : "var(--text-2)",
                    cursor: "pointer",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div style={{ height: "0.5px", background: "var(--border-subtle)" }} />
        {[
          ["Email newsletter", "Receive weekly digest", true],
          ["Breaking news", "Instant alerts for major events", true],
          ["Market updates", "Daily price summaries", false],
        ].map(([label, desc, enabled]) => (
          <div
            key={String(label)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
              <div style={{ fontSize: 12, color: "var(--text-3)" }}>{desc}</div>
            </div>
            <div
              style={{
                width: 40,
                height: 22,
                borderRadius: 11,
                background: enabled ? "var(--brand)" : "var(--border)",
                display: "flex",
                alignItems: "center",
                padding: "2px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#fff",
                  marginLeft: enabled ? "auto" : 0,
                  transition: "margin 0.2s",
                }}
              />
            </div>
          </div>
        ))}
        <button className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
          Save preferences
        </button>
      </div>
    </div>
  );
}

function InvestmentSection() {
  return (
    <div>
      <h2 className="t-h3" style={{ marginBottom: "var(--s6)" }}>
        Investment Profile
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--s6)" }}>
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--text-3)",
              display: "block",
              marginBottom: "var(--s3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Experience level
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            {["Beginner", "Intermediate", "Advanced", "Expert"].map((level, index) => (
              <button
                key={level}
                style={{
                  padding: "6px 16px",
                  background: index === 2 ? "var(--brand)" : "var(--raised)",
                  border: `0.5px solid ${index === 2 ? "transparent" : "var(--border)"}`,
                  borderRadius: "var(--r-pill)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: index === 2 ? "#fff" : "var(--text-2)",
                  cursor: "pointer",
                }}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--text-3)",
              display: "block",
              marginBottom: "var(--s3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Risk tolerance
          </label>
          <div style={{ background: "var(--raised)", borderRadius: "var(--r-md)", padding: "var(--s4)" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "var(--s2)",
                fontSize: 11,
                color: "var(--text-3)",
              }}
            >
              <span>Conservative</span>
              <span>Aggressive</span>
            </div>
            <input type="range" min={1} max={5} defaultValue={3} style={{ width: "100%", accentColor: "var(--brand)" }} />
          </div>
        </div>
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--text-3)",
              display: "block",
              marginBottom: "var(--s3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Investment focus
          </label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Bitcoin", "DeFi", "Layer 1", "Layer 2", "Memecoins", "AI Tokens", "RWA", "GameFi"].map(
              (tag, index) => (
                <button
                  key={tag}
                  style={{
                    padding: "5px 14px",
                    background: [0, 1, 3].includes(index) ? "var(--brand-subtle)" : "var(--raised)",
                    border: `0.5px solid ${[0, 1, 3].includes(index) ? "var(--brand)" : "var(--border)"}`,
                    borderRadius: "var(--r-pill)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: [0, 1, 3].includes(index) ? "var(--text-brand)" : "var(--text-2)",
                    cursor: "pointer",
                  }}
                >
                  {tag}
                </button>
              ),
            )}
          </div>
        </div>
        <button className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
          Save profile
        </button>
      </div>
    </div>
  );
}

function WatchlistSection() {
  const assets = [
    { sym: "BTC", name: "Bitcoin", price: "$75,000", chg: "+2.3%", bull: true, color: "#F7931A" },
    { sym: "ETH", name: "Ethereum", price: "$3,255", chg: "+1.5%", bull: true, color: "#627EEA" },
    { sym: "SOL", name: "Solana", price: "$161", chg: "+2.3%", bull: true, color: "#9945FF" },
    { sym: "ARB", name: "Arbitrum", price: "$1.18", chg: "+3.8%", bull: true, color: "#28A0F0" },
    { sym: "XRP", name: "XRP", price: "$0.54", chg: "-3.2%", bull: false, color: "#00AAE4" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--s6)" }}>
        <h2 className="t-h3">Watchlist</h2>
        <button className="btn btn-primary btn-sm">+ Add asset</button>
      </div>
      <div
        style={{
          background: "var(--surface)",
          border: "0.5px solid var(--border)",
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
        }}
      >
        {assets.map((asset, index) => (
          <div
            key={asset.sym}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--s5)",
              padding: "14px 20px",
              borderBottom: index < assets.length - 1 ? "0.5px solid var(--border-subtle)" : "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: asset.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 800,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {asset.sym[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{asset.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-3)" }}>{asset.sym}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "monospace", fontWeight: 600 }}>{asset.price}</div>
              <div className={asset.bull ? "bull" : "bear"} style={{ fontSize: 11 }}>
                {asset.bull ? "▲" : "▼"} {asset.chg}
              </div>
            </div>
            <button
              style={{
                padding: "4px 10px",
                background: "var(--raised)",
                border: "0.5px solid var(--border)",
                borderRadius: "var(--r-md)",
                fontSize: 11,
                color: "var(--text-3)",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioSection() {
  return (
    <div>
      <h2 className="t-h3" style={{ marginBottom: "var(--s6)" }}>
        Portfolio
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--gutter)", marginBottom: "var(--s8)" }}>
        {[
          { label: "Total Value", value: "$24,850", chg: "+$1,240 (5.2%)", bull: true },
          { label: "24h P&L", value: "+$432", chg: "+1.8%", bull: true },
          { label: "All-time P&L", value: "+$8,200", chg: "+49.3%", bull: true },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "var(--s5)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "var(--text-3)",
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {stat.label}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>
              {stat.value}
            </div>
            <div className={stat.bull ? "bull" : "bear"} style={{ fontSize: 12 }}>
              {stat.chg}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: "var(--surface)",
          border: "0.5px solid var(--border)",
          borderRadius: "var(--r-lg)",
          padding: "var(--s5)",
        }}
      >
        <div className="t-tag" style={{ color: "var(--text-3)", marginBottom: "var(--s4)" }}>
          HOLDINGS
        </div>
        {[
          { sym: "BTC", name: "Bitcoin", amount: "0.24 BTC", value: "$18,000", pct: "72%", color: "#F7931A" },
          { sym: "ETH", name: "Ethereum", amount: "1.8 ETH", value: "$5,850", pct: "23%", color: "#627EEA" },
          { sym: "SOL", name: "Solana", amount: "6.2 SOL", value: "$1,000", pct: "5%", color: "#9945FF" },
        ].map((holding, index) => (
          <div
            key={holding.sym}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--s4)",
              padding: "12px 0",
              borderBottom: index < 2 ? "0.5px solid var(--border-subtle)" : "none",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: holding.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              {holding.sym[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{holding.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-3)" }}>{holding.amount}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 600 }}>{holding.value}</div>
              <div style={{ fontSize: 11, color: "var(--text-3)" }}>{holding.pct}</div>
            </div>
            <div style={{ width: 60, height: 6, background: "var(--raised)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: holding.pct, height: "100%", background: holding.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsSection() {
  const groups = [
    {
      group: "Market Alerts",
      items: [
        ["Price alerts", "Notify when tracked assets hit price targets", true],
        ["Volume spikes", "Unusual trading volume detected", true],
        ["Liquidations", "Large liquidation events", false],
      ],
    },
    {
      group: "News & Content",
      items: [
        ["Breaking news", "Major market-moving events", true],
        ["New articles", "From your subscribed categories", false],
        ["Weekly recap", "Sunday digest of top stories", true],
      ],
    },
    {
      group: "Platform",
      items: [
        ["Comments", "Replies to your comments", true],
        ["System updates", "Product news and feature releases", false],
      ],
    },
  ];

  return (
    <div>
      <h2 className="t-h3" style={{ marginBottom: "var(--s6)" }}>
        Notifications
      </h2>
      {groups.map((group) => (
        <div key={group.group} style={{ marginBottom: "var(--s6)" }}>
          <div className="t-tag" style={{ color: "var(--text-3)", marginBottom: "var(--s4)" }}>
            {group.group.toUpperCase()}
          </div>
          <div
            style={{
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
            }}
          >
            {group.items.map(([label, desc, enabled], index) => (
              <div
                key={String(label)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 20px",
                  borderBottom:
                    index < group.items.length - 1 ? "0.5px solid var(--border-subtle)" : "none",
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)" }}>{desc}</div>
                </div>
                <div
                  style={{
                    width: 40,
                    height: 22,
                    borderRadius: 11,
                    background: enabled ? "var(--brand)" : "var(--border)",
                    display: "flex",
                    alignItems: "center",
                    padding: "2px",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#fff",
                      marginLeft: enabled ? "auto" : 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SocialSection() {
  const accounts = [
    { name: "Twitter / X", icon: "𝕏", connected: true, handle: "@tommy_crypto", color: "#000" },
    { name: "Telegram", icon: "✈", connected: true, handle: "t.me/tommycrypto", color: "#2CA5E0" },
    { name: "Discord", icon: "D", connected: false, handle: "", color: "#5865F2" },
    { name: "LinkedIn", icon: "in", connected: false, handle: "", color: "#0A66C2" },
  ];

  return (
    <div>
      <h2 className="t-h3" style={{ marginBottom: "var(--s6)" }}>
        Social Accounts
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--s3)" }}>
        {accounts.map((account) => (
          <div
            key={account.name}
            style={{
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "var(--s5)",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--r-md)",
                background: account.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 900,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {account.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{account.name}</div>
              {account.connected ? <div style={{ fontSize: 12, color: "var(--text-3)" }}>{account.handle}</div> : null}
            </div>
            <button className={`btn btn-sm ${account.connected ? "btn-outline" : "btn-primary"}`}>
              {account.connected ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReputationSection() {
  const badges = [
    { icon: "🔥", name: "Early Adopter", desc: "Joined in the first wave", earned: true },
    { icon: "📰", name: "Avid Reader", desc: "Read 100+ articles", earned: true },
    { icon: "💬", name: "Community Voice", desc: "50+ helpful comments", earned: true },
    { icon: "📈", name: "Market Watcher", desc: "30-day active streak", earned: false },
    { icon: "🏆", name: "Top Contributor", desc: "Top 10% of contributors", earned: false },
    { icon: "💎", name: "Diamond Hands", desc: "1-year subscription milestone", earned: false },
  ];

  return (
    <div>
      <h2 className="t-h3" style={{ marginBottom: "var(--s6)" }}>
        Reputation
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--gutter)", marginBottom: "var(--s8)" }}>
        {[
          { label: "Trust Score", value: "742", sub: "Top 15%" },
          { label: "Articles Read", value: "248", sub: "This month: 32" },
          { label: "Streak", value: "14 days", sub: "Longest: 21 days" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "var(--s5)",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
              <span className="grad-brand">{stat.value}</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{stat.label}</div>
            <div style={{ fontSize: 11, color: "var(--text-3)" }}>{stat.sub}</div>
          </div>
        ))}
      </div>
      <div className="t-tag" style={{ color: "var(--text-3)", marginBottom: "var(--s4)" }}>
        BADGES
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--gutter)" }}>
        {badges.map((badge) => (
          <div
            key={badge.name}
            style={{
              background: "var(--surface)",
              border: `0.5px solid ${badge.earned ? "var(--brand)" : "var(--border)"}`,
              borderRadius: "var(--r-lg)",
              padding: "var(--s4)",
              display: "flex",
              alignItems: "center",
              gap: "var(--s3)",
              opacity: badge.earned ? 1 : 0.45,
            }}
          >
            <div style={{ fontSize: 28 }}>{badge.icon}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{badge.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-3)" }}>{badge.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivitySection() {
  const history = [
    { action: "Read article", title: "Bitcoin ETFs Attract Nearly $1 Billion...", time: "2 hours ago" },
    { action: "Read article", title: "Bitcoin Breaks Through $78K Resistance", time: "5 hours ago" },
    { action: "Bookmarked", title: "Crypto Analyst Predicts Altcoin Season...", time: "Yesterday" },
    { action: "Read article", title: "Meme Coin Mania: Dogecoin and Shiba Inu...", time: "2 days ago" },
    { action: "Read article", title: "Tether Faces New Regulatory Scrutiny", time: "3 days ago" },
  ];

  return (
    <div>
      <h2 className="t-h3" style={{ marginBottom: "var(--s6)" }}>
        Activity History
      </h2>
      <div
        style={{
          background: "var(--surface)",
          border: "0.5px solid var(--border)",
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
        }}
      >
        {history.map((item, index) => (
          <div
            key={`${item.action}-${item.time}`}
            style={{
              padding: "14px 20px",
              borderBottom: index < history.length - 1 ? "0.5px solid var(--border-subtle)" : "none",
              display: "flex",
              gap: "var(--s4)",
              alignItems: "center",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--brand)", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-3)",
                  marginBottom: 2,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {item.action}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{item.title}</div>
            </div>
            <div style={{ fontSize: 11, color: "var(--text-3)", whiteSpace: "nowrap" }}>{item.time}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "var(--s6)" }}>
        <button className="btn btn-ghost" style={{ minWidth: 200, justifyContent: "center" }}>
          Load more activity
        </button>
      </div>
    </div>
  );
}

function BillingSection() {
  return (
    <div>
      <h2 className="t-h3" style={{ marginBottom: "var(--s6)" }}>
        Subscription &amp; Billing
      </h2>
      <div
        style={{
          background: "var(--grad-brand)",
          borderRadius: "var(--r-xl)",
          padding: "var(--s6)",
          marginBottom: "var(--s6)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 4,
              }}
            >
              Current Plan
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 4,
              }}
            >
              Pro
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
              Renews June 15, 2025 · $19/month
            </div>
          </div>
          <button className="btn btn-white btn-sm">Manage plan</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--gutter)", marginBottom: "var(--s8)" }}>
        {[
          { name: "Free", price: "$0", features: ["5 articles/day", "Basic market data", "Community access"], current: false },
          { name: "Pro", price: "$19/mo", features: ["Unlimited articles", "Advanced analytics", "Priority alerts", "Ad-free"], current: true },
          { name: "Elite", price: "$49/mo", features: ["Everything in Pro", "1-on-1 analyst Q&A", "Early access features", "Custom watchlists"], current: false },
        ].map((plan) => (
          <div
            key={plan.name}
            style={{
              background: "var(--surface)",
              border: `0.5px solid ${plan.current ? "var(--brand)" : "var(--border)"}`,
              borderRadius: "var(--r-lg)",
              padding: "var(--s5)",
              position: "relative",
            }}
          >
            {plan.current ? (
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--brand)",
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: 800,
                  padding: "2px 10px",
                  borderRadius: "var(--r-pill)",
                  letterSpacing: "0.06em",
                }}
              >
                CURRENT
              </div>
            ) : null}
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
              {plan.name}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, marginBottom: "var(--s4)" }}>
              {plan.current ? <span className="grad-brand">{plan.price}</span> : plan.price}
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: "var(--s5)" }}>
              {plan.features.map((feature) => (
                <li key={feature} style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--text-2)" }}>
                  <span style={{ color: "var(--bull)" }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`btn ${plan.current ? "btn-outline" : "btn-primary"}`} style={{ width: "100%", justifyContent: "center", fontSize: 12 }}>
              {plan.current ? "Current plan" : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
      <div className="t-tag" style={{ color: "var(--text-3)", marginBottom: "var(--s4)" }}>
        BILLING HISTORY
      </div>
      <div
        style={{
          background: "var(--surface)",
          border: "0.5px solid var(--border)",
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
        }}
      >
        {[
          { date: "May 15, 2025", desc: "Pro plan — Monthly", amount: "$19.00", status: "Paid" },
          { date: "Apr 15, 2025", desc: "Pro plan — Monthly", amount: "$19.00", status: "Paid" },
          { date: "Mar 15, 2025", desc: "Pro plan — Monthly", amount: "$19.00", status: "Paid" },
        ].map((invoice, index) => (
          <div
            key={`${invoice.date}-${invoice.amount}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 20px",
              borderBottom: index < 2 ? "0.5px solid var(--border-subtle)" : "none",
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{invoice.desc}</div>
              <div style={{ fontSize: 11, color: "var(--text-3)" }}>{invoice.date}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--s4)" }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{invoice.amount}</div>
              <div
                style={{
                  padding: "2px 8px",
                  background: "rgba(0,229,160,0.1)",
                  border: "0.5px solid #00E5A0",
                  borderRadius: "var(--r-pill)",
                  fontSize: 10,
                  color: "var(--bull)",
                  fontWeight: 700,
                }}
              >
                {invoice.status}
              </div>
              <button style={{ fontSize: 11, color: "var(--text-brand)", background: "none", border: "none", cursor: "pointer" }}>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SECTION_COMPONENTS: Record<TabId, () => JSX.Element> = {
  identity: IdentitySection,
  preferences: PreferencesSection,
  investment: InvestmentSection,
  watchlist: WatchlistSection,
  portfolio: PortfolioSection,
  notifications: NotificationsSection,
  social: SocialSection,
  reputation: ReputationSection,
  activity: ActivitySection,
  billing: BillingSection,
};

export default function ProfilePage({ searchParams }: ProfilePageProps) {
  const active = getActiveTab(use(searchParams));
  const SectionComp = SECTION_COMPONENTS[active.id];

  return (
    <main style={{ minHeight: "80vh" }}>
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "0.5px solid var(--border-subtle)",
          padding: "var(--s8) 0",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "var(--grad-brand)",
          }}
        />
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "var(--s5)" }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "var(--grad-brand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 24,
              color: "#fff",
            }}
          >
            T
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>
              Tommy Nguyen
            </div>
            <div style={{ fontSize: 12, color: "var(--text-3)" }}>
              @tommy_crypto · Pro Member since Jan 2024
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button className="btn btn-outline btn-sm">Share profile</button>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{
          padding: "var(--s8) var(--margin)",
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: "var(--s8)",
          alignItems: "start",
        }}
      >
        <aside style={{ position: "sticky", top: 120 }}>
          <div
            style={{
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
            }}
          >
            {TABS.map((tab, index) => {
              const isActive = tab.id === active.id;

              return (
                <Link
                  key={tab.id}
                  href={`/profile?tab=${tab.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--s3)",
                    padding: "11px 16px",
                    borderBottom: index < TABS.length - 1 ? "0.5px solid var(--border-subtle)" : "none",
                    background: isActive ? "var(--brand-subtle)" : "transparent",
                    borderLeft: isActive ? "3px solid var(--brand)" : "3px solid transparent",
                    transition: "background 0.12s",
                  }}
                >
                  <span style={{ fontSize: 16 }}>{tab.icon}</span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "var(--text-brand)" : "var(--text-2)",
                    }}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </aside>

        <div
          style={{
            background: "var(--surface)",
            border: "0.5px solid var(--border)",
            borderRadius: "var(--r-lg)",
            padding: "var(--s8)",
            minHeight: 400,
          }}
        >
          <SectionComp />
        </div>
      </div>
    </main>
  );
}
