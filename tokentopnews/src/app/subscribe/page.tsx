import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subscribe | TokenTopNews",
  description: "Get premium access to crypto news, analysis and market data.",
};

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    desc: "For casual crypto readers.",
    cta: "Get started free",
    highlight: false,
    features: ["5 articles per day", "Daily briefing newsletter", "Basic market snapshot", "Public trending feed", "Community access"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$8",
    desc: "For active traders and serious investors.",
    cta: "Start 7-day free trial",
    highlight: true,
    badge: "Most Popular",
    features: ["Unlimited article access", "All 4 premium newsletters", "Full market data suite", "Portfolio tracker", "Price alerts", "Deep-dive research reports", "No ads", "Priority support"],
  },
  {
    id: "institutional",
    name: "Institutional",
    price: "$39",
    desc: "For teams, funds, and professional desks.",
    cta: "Contact sales",
    highlight: false,
    features: ["Everything in Pro", "Unlimited portfolio assets", "Institutional data feeds", "API access", "Team accounts", "Custom alerts & reports", "Dedicated account manager"],
  },
];

const FAQS = [
  "Can I cancel anytime?",
  "Is there a free trial?",
  "What payment methods do you accept?",
  "Can I switch plans?",
  "Do you offer student discounts?",
];

export default function SubscribePage() {
  return (
    <main>
      <section style={{ background: "var(--surface)", borderBottom: "0.5px solid var(--border-subtle)", padding: "var(--s10) 0", position: "relative", overflow: "hidden", marginBottom: "var(--s10)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "var(--grad-brand)" }} />
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(155,61,255,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 11, color: "var(--text-3)", justifyContent: "center" }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--text-brand)" }}>Subscribe</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 800, marginBottom: 12 }}>
            <span className="grad-brand">Upgrade Your Crypto Edge</span>
          </h1>
          <p style={{ fontSize: 15, color: "var(--text-2)", maxWidth: 520, margin: "0 auto var(--s8)", lineHeight: 1.7 }}>
            Professional-grade crypto news, research, and market data - all in one place.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "var(--raised)", border: "0.5px solid var(--border)", borderRadius: "var(--r-pill)", padding: "4px 6px", marginBottom: "var(--s2)" }}>
            <button type="button" style={{ padding: "6px 20px", borderRadius: "var(--r-pill)", fontSize: 12, fontWeight: 600, background: "transparent", color: "var(--text-3)", border: "none", cursor: "pointer" }}>Monthly</button>
            <button type="button" style={{ padding: "6px 20px", borderRadius: "var(--r-pill)", fontSize: 12, fontWeight: 600, background: "var(--brand)", color: "#fff", border: "none", cursor: "pointer" }}>Annual</button>
          </div>
          <div style={{ fontSize: 11, color: "var(--bull)", fontWeight: 700, marginTop: 6 }}>Save up to 33% with annual billing</div>
        </div>
      </section>

      <section style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--gutter)", alignItems: "start" }}>
            {PLANS.map((plan) => (
              <div key={plan.id} style={{ background: plan.highlight ? "var(--brand)" : "var(--surface)", border: plan.highlight ? "none" : "0.5px solid var(--border)", borderRadius: "var(--r-xl)", padding: "var(--s6)", position: "relative", overflow: "hidden" }}>
                {plan.highlight ? <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} /> : null}
                {plan.badge ? <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: "var(--r-pill)", letterSpacing: "0.08em", fontFamily: "var(--font-display)" }}>{plan.badge}</div> : null}
                <div style={{ marginBottom: "var(--s5)" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: plan.highlight ? "rgba(255,255,255,0.7)" : "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, color: plan.highlight ? "#fff" : "var(--text-1)" }}>{plan.price}</span>
                    {plan.id !== "free" ? <span style={{ fontSize: 12, color: plan.highlight ? "rgba(255,255,255,0.6)" : "var(--text-3)" }}>/mo</span> : null}
                  </div>
                  {plan.id !== "free" ? <div style={{ fontSize: 10, color: plan.highlight ? "rgba(255,255,255,0.6)" : "var(--text-3)", marginTop: 2 }}>billed annually</div> : null}
                  <p style={{ fontSize: 12, color: plan.highlight ? "rgba(255,255,255,0.75)" : "var(--text-3)", marginTop: 8, lineHeight: 1.5 }}>{plan.desc}</p>
                </div>
                <button type="button" className={plan.highlight ? "btn btn-white" : plan.id === "institutional" ? "btn btn-outline" : "btn btn-primary"} style={{ width: "100%", justifyContent: "center", marginBottom: "var(--s5)", fontSize: 13 }}>
                  {plan.cta}
                </button>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {plan.features.map((feature) => (
                    <div key={feature} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: plan.highlight ? "#fff" : "var(--bull)", fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: 12, color: plan.highlight ? "rgba(255,255,255,0.85)" : "var(--text-2)", lineHeight: 1.5 }}>{feature}</span>
                    </div>
                  ))}
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
              { n: "80K+", l: "Paying subscribers" },
              { n: "99.9%", l: "Uptime SLA" },
              { n: "4.9★", l: "App store rating" },
              { n: "SOC2", l: "Security certified" },
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

      <section style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "var(--s8)" }}>
              <div className="t-section" style={{ color: "var(--text-3)", marginBottom: 8 }}>FAQ</div>
              <h2 className="t-h1">Common questions</h2>
            </div>
            {FAQS.map((faq) => (
              <div key={faq} style={{ borderBottom: "0.5px solid var(--border-subtle)" }}>
                <button type="button" style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--s5) 0", fontSize: 14, fontWeight: 600, color: "var(--text-1)", fontFamily: "var(--font-display)", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}>
                  {faq}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, color: "var(--text-3)" }}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
