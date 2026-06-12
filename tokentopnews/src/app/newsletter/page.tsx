import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Stay ahead of the crypto market with TokenTopNews newsletters.",
};

const NEWSLETTERS = [
  {
    id: "daily",
    title: "Daily Briefing",
    desc: "The most important crypto headlines every morning, curated and explained in 5 minutes.",
    freq: "Every weekday at 8am UTC",
    icon: "☀️",
    subs: "42K",
    tags: ["Bitcoin", "Markets", "DeFi"],
  },
  {
    id: "weekly",
    title: "Weekly Recap",
    desc: "A comprehensive look at the week's biggest stories, price moves, and market trends.",
    freq: "Every Sunday",
    icon: "📅",
    subs: "28K",
    tags: ["Analysis", "Weekly", "Markets"],
  },
  {
    id: "insights",
    title: "Insights Digest",
    desc: "Deep-dive analysis, research pieces, and on-chain data summaries for serious investors.",
    freq: "Twice a week",
    icon: "💡",
    subs: "15K",
    tags: ["Research", "On-chain", "Institutional"],
  },
  {
    id: "narratives",
    title: "Narratives Radar",
    desc: "Track the stories shaping the next cycle. From Layer 2s to AI tokens and everything in between.",
    freq: "Every Thursday",
    icon: "📖",
    subs: "11K",
    tags: ["Narratives", "Altcoins", "Trends"],
  },
];

const BENEFITS = [
  { icon: "⚡", title: "Breaking news first", desc: "Get alerts before the crowd moves." },
  { icon: "🧠", title: "Expert curation", desc: "Our analysts filter the noise for you." },
  { icon: "📊", title: "Market context", desc: "Understand what the numbers actually mean." },
  { icon: "🔒", title: "No spam, ever", desc: "One-click unsubscribe at any time." },
];

export default function NewsletterPage() {
  return (
    <main>
      <section
        style={{
          background: "var(--surface)",
          borderBottom: "0.5px solid var(--border-subtle)",
          padding: "var(--s10) 0",
          position: "relative",
          overflow: "hidden",
          marginBottom: "var(--s8)",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "var(--grad-brand)" }} />
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(ellipse,rgba(155,61,255,0.12) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 11, color: "var(--text-3)" }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--text-brand)" }}>Newsletter</span>
          </div>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", padding: "var(--s8) 0" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "var(--r-lg)",
                background: "rgba(155,61,255,0.1)",
                border: "0.5px solid rgba(155,61,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                margin: "0 auto var(--s5)",
              }}
            >
              📧
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, marginBottom: 12 }}>
              <span className="grad-brand">Stay Ahead of the Market</span>
            </h1>
            <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "var(--s8)" }}>
              Join 80,000+ crypto traders and investors who read TokenTopNews newsletters to cut through the noise and make better decisions.
            </p>
            <div style={{ background: "var(--grad-brand)", borderRadius: "var(--r-xl)", padding: "var(--s6)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
              <div style={{ position: "relative" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                  Subscribe to Daily Briefing - Free
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginBottom: "var(--s5)" }}>
                  Delivered every weekday morning. No credit card required.
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="email" placeholder="Enter your email address" className="newsletter-input" style={{ flex: 1, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "var(--r-md)", padding: "10px 16px", fontSize: 13, outline: "none" }} />
                  <button type="button" className="btn btn-white" style={{ flexShrink: 0, fontSize: 13, fontWeight: 700 }}>
                    Subscribe Free
                  </button>
                </div>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
                  42,000+ subscribers · Unsubscribe anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--gutter)" }}>
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--r-lg)", padding: "var(--s5)", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{benefit.icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                  {benefit.title}
                </div>
                <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.5 }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "var(--s8)" }}>
            <div className="t-section" style={{ color: "var(--text-3)", marginBottom: 8 }}>
              OUR NEWSLETTERS
            </div>
            <h2 className="t-h1">Choose what you want to read</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "var(--gutter)" }}>
            {NEWSLETTERS.map((item) => (
              <div key={item.id} style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--r-xl)", padding: "var(--s6)", display: "flex", flexDirection: "column", gap: "var(--s4)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--s4)" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "var(--r-lg)", background: "rgba(155,61,255,0.1)", border: "0.5px solid rgba(155,61,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, marginBottom: 4 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-brand)" }}>
                      {item.freq} · {item.subs} subscribers
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>{item.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {item.tags.map((tag) => (
                    <span key={tag} style={{ padding: "3px 10px", background: "var(--raised)", border: "0.5px solid var(--border)", borderRadius: "var(--r-pill)", fontSize: 10, color: "var(--text-3)" }}>
                      #{tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                  <input type="email" placeholder="your@email.com" style={{ flex: 1, background: "var(--raised)", border: "0.5px solid var(--border)", borderRadius: "var(--r-md)", padding: "8px 12px", fontSize: 12, color: "var(--text-1)", outline: "none" }} />
                  <button type="button" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                    Subscribe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--surface)", borderTop: "0.5px solid var(--border-subtle)", borderBottom: "0.5px solid var(--border-subtle)", padding: "var(--s10) 0", marginBottom: "var(--s16)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--gutter)", textAlign: "center" }}>
            {[
              { n: "80K+", l: "Total subscribers" },
              { n: "4.8", l: "Average rating" },
              { n: "98%", l: "Delivery rate" },
              { n: "5 min", l: "Average read time" },
            ].map((stat) => (
              <div key={stat.l}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800 }}>
                  <span className="grad-brand">{stat.n}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
