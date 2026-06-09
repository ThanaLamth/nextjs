"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User, Settings, TrendingUp, Star, PieChart, Bell,
  Share2, Award, Clock, CreditCard, Edit2, Plus,
  Check, Twitter, Send, MessageSquare, ExternalLink,
  Bitcoin, TrendingDown, Shield, Zap, BookOpen, Flame,
  Eye, EyeOff, ChevronRight, Camera, Globe,
  MapPin, Mail, Lock, LogOut,
} from "lucide-react";

type Section =
  | "identity" | "preferences" | "investment-profile"
  | "watchlist" | "portfolio" | "notifications"
  | "social-accounts" | "reputation" | "activity-history"
  | "subscription";

const SECTIONS: { key: Section; label: string; icon: React.ReactNode }[] = [
  { key: "identity",          label: "Identity",            icon: <User size={15} /> },
  { key: "preferences",       label: "Preferences",         icon: <Settings size={15} /> },
  { key: "investment-profile",label: "Investment Profile",  icon: <TrendingUp size={15} /> },
  { key: "watchlist",         label: "Watchlist",           icon: <Star size={15} /> },
  { key: "portfolio",         label: "Portfolio",           icon: <PieChart size={15} /> },
  { key: "notifications",     label: "Notifications",       icon: <Bell size={15} /> },
  { key: "social-accounts",   label: "Social Accounts",     icon: <Share2 size={15} /> },
  { key: "reputation",        label: "Reputation",          icon: <Award size={15} /> },
  { key: "activity-history",  label: "Activity History",    icon: <Clock size={15} /> },
  { key: "subscription",      label: "Subscription/Billing",icon: <CreditCard size={15} /> },
];

/* ─── mock data ─── */
const USER = {
  name: "Alex Johnson",
  username: "@alexcrypto",
  email: "alex@example.com",
  bio: "Crypto investor since 2017. DeFi enthusiast. Building the future of finance.",
  location: "San Francisco, CA",
  website: "alexjohnson.io",
  joined: "May 2024",
  avatar: "AJ",
  plan: "Free",
  reputation: 750,
  rank: "Verified Analyst",
};

const WATCHLIST = [
  { symbol: "BTC", name: "Bitcoin",   price: "$104,382", change: "+2.4%",  up: true,  color: "#F7931A" },
  { symbol: "ETH", name: "Ethereum",  price: "$3,890",   change: "+1.8%",  up: true,  color: "#627EEA" },
  { symbol: "SOL", name: "Solana",    price: "$192",     change: "-0.9%",  up: false, color: "#9945FF" },
  { symbol: "BNB", name: "BNB",       price: "$651",     change: "+0.4%",  up: true,  color: "#F3BA2F" },
  { symbol: "AVAX",name: "Avalanche", price: "$38.20",   change: "-1.2%",  up: false, color: "#E84142" },
];

const PORTFOLIO = [
  { symbol: "BTC", name: "Bitcoin",   amount: "0.842",  value: "$87,889", pct: 58, color: "#F7931A" },
  { symbol: "ETH", name: "Ethereum",  amount: "12.5",   value: "$48,625", pct: 32, color: "#627EEA" },
  { symbol: "SOL", name: "Solana",    amount: "85",     value: "$16,320", pct: 10, color: "#9945FF" },
];

const ACTIVITY = [
  { type: "read",  icon: <BookOpen size={14} />, text: "Read: Bitcoin Breaks $120,000 ATH as Institutional Demand Surges",  time: "2h ago" },
  { type: "guide", icon: <BookOpen size={14} />, text: "Completed guide: Understanding DeFi: Decentralized Finance Explained", time: "5h ago" },
  { type: "watch", icon: <Star size={14} />,     text: "Added AVAX to Watchlist",                                             time: "1d ago" },
  { type: "read",  icon: <BookOpen size={14} />, text: "Read: DTCC Launches On-Chain Settlement Pilot with Major US Banks",  time: "1d ago" },
  { type: "guide", icon: <BookOpen size={14} />, text: "Completed guide: How to Stake Ethereum",                             time: "2d ago" },
  { type: "watch", icon: <Star size={14} />,     text: "Added SOL to Watchlist",                                             time: "3d ago" },
  { type: "read",  icon: <BookOpen size={14} />, text: "Read: EigenLayer Restaking TVL Crosses $25 Billion",                time: "3d ago" },
  { type: "guide", icon: <BookOpen size={14} />, text: "Completed guide: Hot vs Cold Wallets: Which to Choose",             time: "4d ago" },
];

const BADGES: { icon: React.ReactNode; label: string; desc: string }[] = [
  { icon: <Flame size={20} />,    label: "Early Adopter",   desc: "Joined in launch month" },
  { icon: <BookOpen size={20} />, label: "Guide Scholar",   desc: "Completed 5+ guides" },
  { icon: <Star size={20} />,     label: "Top Contributor", desc: "750+ reputation points" },
  { icon: <Shield size={20} />,   label: "Security Pro",    desc: "Completed security guide" },
];

/* ─── section components ─── */

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between py-3 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
      <span className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</span>
      <span className={`text-sm font-medium ${mono ? "font-mono" : ""}`} style={{ color: "var(--text-primary)" }}>{value}</span>
    </div>
  );
}

function Toggle({ label, desc, on }: { label: string; desc?: string; on: boolean }) {
  const [active, setActive] = useState(on);
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
      <div>
        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{desc}</p>}
      </div>
      <button onClick={() => setActive(!active)}
        className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
        style={{ background: active ? "#F7931A" : "var(--border)" }}>
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? "left-6" : "left-1"}`} />
      </button>
    </div>
  );
}

function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>{title}</h2>
      {action}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border p-5 ${className}`} style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      {children}
    </div>
  );
}

/* ── section: Identity ── */
function IdentitySection() {
  return (
    <div>
      <SectionTitle title="Identity"
        action={<button className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange"><Edit2 size={14} /> Edit Profile</button>} />
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-brand-orange flex items-center justify-center text-white text-2xl font-bold">
            {USER.avatar}
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2"
            style={{ background: "var(--card-bg)", borderColor: "var(--card-bg)" }}>
            <Camera size={13} className="text-brand-orange" />
          </button>
        </div>
        <div className="flex-1">
          <p className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>{USER.name}</p>
          <p className="text-sm text-brand-orange font-medium">{USER.username}</p>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{USER.bio}</p>
        </div>
      </div>
      <Card>
        <Row label="Full Name" value={USER.name} />
        <Row label="Username" value={USER.username} mono />
        <Row label="Email" value={USER.email} />
        <Row label="Location" value={USER.location} />
        <Row label="Website" value={USER.website} />
        <Row label="Member Since" value={USER.joined} />
      </Card>
      <Card className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Security</p>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Lock size={15} className="text-brand-orange" />
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Password</span>
          </div>
          <button className="text-xs font-semibold text-brand-orange">Change</button>
        </div>
        <div className="flex items-center justify-between py-2 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <Shield size={15} className="text-brand-green" />
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Two-Factor Auth</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(0,168,107,0.12)", color: "#00A86B" }}>Enabled</span>
        </div>
      </Card>
    </div>
  );
}

/* ── section: Preferences ── */
function PreferencesSection() {
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("English");
  return (
    <div>
      <SectionTitle title="Preferences" />
      <div className="space-y-4">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Display</p>
          <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "var(--border)" }}>
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Currency</span>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}
              className="text-sm px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-brand-orange"
              style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
              <option>USD</option><option>EUR</option><option>GBP</option><option>BTC</option><option>ETH</option>
            </select>
          </div>
          <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "var(--border)" }}>
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Language</span>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}
              className="text-sm px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-brand-orange"
              style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
              <option>English</option><option>Vietnamese</option><option>Spanish</option><option>Chinese</option>
            </select>
          </div>
          <Toggle label="Compact News Feed" desc="Show more articles with less preview" on={false} />
          <Toggle label="Price Alerts Popup" desc="Show price movement alerts in browser" on={true} />
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Default News Categories</p>
          <div className="flex flex-wrap gap-2">
            {["Bitcoin", "Ethereum", "DeFi", "Regulation", "Exchanges", "Altcoins", "Banking", "Blockchain Events"].map((tag) => (
              <button key={tag} className="px-3 py-1 rounded-full text-xs font-medium border transition-all hover:border-brand-orange hover:text-brand-orange"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--surface)" }}>
                {tag}
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Privacy</p>
          <Toggle label="Public Profile" desc="Allow others to view your profile and activity" on={true} />
          <Toggle label="Show Watchlist" desc="Make your watchlist visible to followers" on={false} />
          <Toggle label="Show Portfolio" desc="Display portfolio performance publicly" on={false} />
        </Card>
      </div>
    </div>
  );
}

/* ── section: Investment Profile ── */
function InvestmentProfileSection() {
  const [risk, setRisk] = useState("Moderate");
  return (
    <div>
      <SectionTitle title="Investment Profile"
        action={<button className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange"><Edit2 size={14} /> Edit</button>} />
      <div className="space-y-4">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>Risk Tolerance</p>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {["Conservative", "Moderate", "Aggressive"].map((r) => (
              <button key={r} onClick={() => setRisk(r)}
                className="py-3 rounded-xl text-sm font-semibold border transition-all"
                style={{
                  borderColor: risk === r ? "#F7931A" : "var(--border)",
                  background: risk === r ? "rgba(247,147,26,0.1)" : "var(--surface)",
                  color: risk === r ? "#F7931A" : "var(--text-secondary)",
                }}>
                {r}
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <Row label="Experience Level" value="Intermediate (3-5 years)" />
          <Row label="Primary Goal" value="Long-term growth" />
          <Row label="Investment Horizon" value="3-5 years" />
          <Row label="Portfolio Size" value="$50k – $250k" />
          <Row label="Monthly DCA Budget" value="$500 – $1,000" />
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Preferred Asset Types</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Layer 1", active: true },
              { label: "DeFi", active: true },
              { label: "NFTs", active: false },
              { label: "Stablecoins", active: true },
              { label: "Layer 2", active: true },
              { label: "Memecoins", active: false },
            ].map((a) => (
              <span key={a.label} className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: a.active ? "rgba(247,147,26,0.12)" : "var(--surface)",
                  color: a.active ? "#F7931A" : "var(--text-muted)",
                  border: `1px solid ${a.active ? "rgba(247,147,26,0.3)" : "var(--border)"}`,
                }}>
                {a.active && "✓ "}{a.label}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ── section: Watchlist ── */
function WatchlistSection() {
  return (
    <div>
      <SectionTitle title="Watchlist"
        action={
          <button className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange">
            <Plus size={14} /> Add Coin
          </button>
        } />
      <Card>
        <div className="space-y-1">
          {WATCHLIST.map((coin) => (
            <div key={coin.symbol} className="flex items-center gap-3 px-2 py-3 rounded-xl transition-colors hover:bg-brand-orange/5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: coin.color }}>
                {coin.symbol[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{coin.name}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{coin.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{coin.price}</p>
                <p className={`text-xs font-semibold ${coin.up ? "text-brand-green" : "text-brand-red"}`}>
                  {coin.up ? "▲" : "▼"} {coin.change}
                </p>
              </div>
              <Link href={`/markets/${coin.symbol.toLowerCase()}`}
                className="p-1.5 rounded-lg transition-colors hover:bg-brand-orange/10" style={{ color: "var(--text-muted)" }}>
                <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </Card>
      <div className="mt-4 text-center">
        <Link href="/markets" className="text-sm font-semibold text-brand-orange hover:gap-2 transition-all flex items-center justify-center gap-1">
          Browse all markets <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}

/* ── section: Portfolio ── */
function PortfolioSection() {
  const total = 152834;
  return (
    <div>
      <SectionTitle title="Portfolio"
        action={<button className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange"><Plus size={14} /> Add Holding</button>} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {[
          { label: "Total Value",  value: "$152,834", sub: "+$3,420 today",  green: true },
          { label: "24h P&L",     value: "+2.28%",   sub: "+$3,420",        green: true },
          { label: "All-time ROI",value: "+312%",    sub: "since May 2024", green: true },
        ].map((s) => (
          <Card key={s.label} className="text-center">
            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            <p className="font-display font-bold text-lg text-brand-green">{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{s.sub}</p>
          </Card>
        ))}
      </div>
      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>Holdings</p>
        <div className="space-y-4">
          {PORTFOLIO.map((h) => (
            <div key={h.symbol}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: h.color }}>
                    {h.symbol[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{h.name}</p>
                    <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{h.amount} {h.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{h.value}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{h.pct}%</p>
                </div>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "var(--border)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${h.pct}%`, background: h.color }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ── section: Notifications ── */
function NotificationsSection() {
  return (
    <div>
      <SectionTitle title="Notifications" />
      <div className="space-y-4">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Email Notifications</p>
          <Toggle label="Daily News Digest" desc="Top stories from your followed categories" on={true} />
          <Toggle label="Breaking News Alerts" desc="Immediate alert for major market events" on={true} />
          <Toggle label="Weekly Market Summary" desc="Performance recap every Sunday" on={false} />
          <Toggle label="New Guide Published" desc="When a new guide matches your interests" on={true} />
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Price Alerts</p>
          <Toggle label="Watchlist Price Movements" desc="Alert when watchlist coins move ±5%" on={true} />
          <Toggle label="All-time High Alerts" desc="Notify when a coin breaks its ATH" on={true} />
          <Toggle label="Whale Movement Alerts" desc="Large on-chain transfers in your assets" on={false} />
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Newsletter</p>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Daily Crypto Brief</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Subscribed · alex@example.com</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(0,168,107,0.12)", color: "#00A86B" }}>Active</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ── section: Social Accounts ── */
function SocialSection() {
  const accounts = [
    { icon: <Twitter size={18} />, label: "X (Twitter)", handle: "@alexcrypto", connected: true,  color: "#1DA1F2" },
    { icon: <Send size={18} />,    label: "Telegram",    handle: "@alexjohnson", connected: true,  color: "#2AABEE" },
    { icon: <MessageSquare size={18} />, label: "Discord", handle: "alex#4892",  connected: false, color: "#5865F2" },
  ];
  return (
    <div>
      <SectionTitle title="Social Accounts" />
      <Card>
        <div className="space-y-1">
          {accounts.map((a) => (
            <div key={a.label} className="flex items-center gap-4 py-3 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: a.connected ? `${a.color}20` : "var(--surface)", color: a.connected ? a.color : "var(--text-muted)" }}>
                {a.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{a.label}</p>
                <p className="text-xs" style={{ color: a.connected ? "var(--text-muted)" : "var(--text-muted)" }}>
                  {a.connected ? a.handle : "Not connected"}
                </p>
              </div>
              <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                a.connected
                  ? "hover:border-brand-red hover:text-brand-red"
                  : "bg-brand-orange text-white border-transparent hover:bg-brand-orange-dark"
              }`}
                style={a.connected ? { borderColor: "var(--border)", color: "var(--text-muted)" } : {}}>
                {a.connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </Card>
      <Card className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Share Profile</p>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <Globe size={13} style={{ color: "var(--text-muted)" }} />
          <span className="text-sm font-mono flex-1" style={{ color: "var(--text-secondary)" }}>coinlineup.com/u/alexcrypto</span>
          <button className="text-xs font-semibold text-brand-orange">Copy</button>
        </div>
      </Card>
    </div>
  );
}

/* ── section: Reputation ── */
function ReputationSection() {
  return (
    <div>
      <SectionTitle title="Reputation" />
      <Card className="text-center mb-4">
        <div className="w-16 h-16 rounded-full bg-brand-orange/10 border-4 border-brand-orange flex items-center justify-center mx-auto mb-3">
          <Award size={28} className="text-brand-orange" />
        </div>
        <p className="font-display font-bold text-4xl text-brand-orange mb-1">{USER.reputation}</p>
        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{USER.rank}</p>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Top 15% of CoinLineup members</p>
        <div className="mt-4 h-2 rounded-full" style={{ background: "var(--border)" }}>
          <div className="h-full rounded-full bg-brand-orange" style={{ width: "75%" }} />
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>250 points to Analyst Pro</p>
      </Card>
      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>Badges Earned</p>
        <div className="grid grid-cols-2 gap-3">
          {BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(247,147,26,0.12)", color: "#F7931A" }}>{b.icon}</div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{b.label}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="mt-4">
        <Row label="Articles Read" value="142" />
        <Row label="Guides Completed" value="8 / 21" />
        <Row label="Community Posts" value="24" />
        <Row label="Member Since" value={USER.joined} />
      </Card>
    </div>
  );
}

/* ── section: Activity History ── */
function ActivitySection() {
  return (
    <div>
      <SectionTitle title="Activity History" />
      <Card>
        <div className="space-y-0">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b last:border-0" style={{ borderColor: "var(--border)" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(247,147,26,0.1)", color: "#F7931A" }}>
                {a.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug" style={{ color: "var(--text-primary)" }}>{a.text}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <p className="text-center text-sm text-brand-orange font-semibold mt-4 cursor-pointer hover:opacity-80">
        Load more activity →
      </p>
    </div>
  );
}

/* ── section: Subscription ── */
function SubscriptionSection() {
  return (
    <div>
      <SectionTitle title="Subscription & Billing" />
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>Free Plan</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Current plan · Renews never</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ background: "var(--surface)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
            FREE
          </span>
        </div>
        <div className="space-y-2 mb-5">
          {["Access to all news articles", "5 watchlist items", "Daily newsletter", "Basic market data"].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <Check size={14} className="text-brand-green flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
        <button className="w-full py-3 rounded-xl bg-brand-orange text-white font-display font-bold text-sm hover:bg-brand-orange-dark transition-colors">
          Upgrade to Pro — $9/mo
        </button>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {[
          { name: "Pro", price: "$9/mo", features: ["Unlimited watchlist", "Portfolio tracker", "Price alerts", "Ad-free experience"], color: "#F7931A" },
          { name: "Premium", price: "$29/mo", features: ["Everything in Pro", "Real-time data", "Analyst reports", "Priority support"], color: "#8B5CF6" },
        ].map((plan) => (
          <Card key={plan.name}>
            <p className="font-display font-bold text-base mb-1" style={{ color: plan.color }}>{plan.name}</p>
            <p className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>{plan.price}</p>
            <div className="space-y-1.5 mb-4">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                  <Zap size={12} style={{ color: plan.color }} />
                  {f}
                </div>
              ))}
            </div>
            <button className="w-full py-2 rounded-lg text-white text-xs font-bold transition-opacity hover:opacity-90"
              style={{ background: plan.color }}>
              Choose {plan.name}
            </button>
          </Card>
        ))}
      </div>
      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Billing History</p>
        <p className="text-sm text-center py-4" style={{ color: "var(--text-muted)" }}>No billing history — you are on the free plan.</p>
      </Card>
    </div>
  );
}

const SECTION_COMPONENTS: Record<Section, React.ReactNode> = {
  "identity":           <IdentitySection />,
  "preferences":        <PreferencesSection />,
  "investment-profile": <InvestmentProfileSection />,
  "watchlist":          <WatchlistSection />,
  "portfolio":          <PortfolioSection />,
  "notifications":      <NotificationsSection />,
  "social-accounts":    <SocialSection />,
  "reputation":         <ReputationSection />,
  "activity-history":   <ActivitySection />,
  "subscription":       <SubscriptionSection />,
};

export default function ProfilePage() {
  const [active, setActive] = useState<Section>("identity");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ── Sidebar ── */}
        <aside className="lg:col-span-3">
          {/* User card */}
          <div className="rounded-xl border p-5 mb-4 text-center" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <div className="w-16 h-16 rounded-full bg-brand-orange flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
              {USER.avatar}
            </div>
            <p className="font-display font-bold text-base" style={{ color: "var(--text-primary)" }}>{USER.name}</p>
            <p className="text-sm text-brand-orange">{USER.username}</p>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <Award size={12} className="text-brand-orange" />
              <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{USER.reputation} pts · {USER.plan}</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="rounded-xl border overflow-hidden" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            {SECTIONS.map((s, i) => (
              <button key={s.key} onClick={() => setActive(s.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left transition-colors border-b last:border-0 hover:bg-brand-orange/5 ${
                  active === s.key ? "text-brand-orange bg-brand-orange/5" : ""
                }`}
                style={{
                  borderColor: "var(--border)",
                  color: active === s.key ? "#F7931A" : "var(--text-secondary)",
                }}>
                <span style={{ color: active === s.key ? "#F7931A" : "var(--text-muted)" }}>{s.icon}</span>
                {s.label}
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left transition-colors hover:bg-brand-red/5 text-brand-red">
              <LogOut size={15} />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main className="lg:col-span-9">
          {SECTION_COMPONENTS[active]}
        </main>

      </div>
    </div>
  );
}
