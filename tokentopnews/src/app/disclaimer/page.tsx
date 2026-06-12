import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "TokenTopNews financial disclaimer — all content is for informational purposes only.",
};

export default function DisclaimerPage() {
  return (
    <main>
      <section
        style={{
          background: "var(--surface)",
          borderBottom: "0.5px solid var(--border-subtle)",
          padding: "var(--s8) 0",
          marginBottom: "var(--s10)",
        }}
      >
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
            <span style={{ color: "var(--text-brand)" }}>Disclaimer</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Disclaimer
          </h1>
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>Last updated: January 1, 2024</p>
        </div>
      </section>

      <section style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "var(--s8)",
            }}
          >
            <div
              style={{
                background: "rgba(255,64,96,0.08)",
                border: "0.5px solid rgba(255,64,96,0.25)",
                borderRadius: "var(--r-xl)",
                padding: "var(--s5) var(--s6)",
                display: "flex",
                gap: 12,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF4060"
                strokeWidth="2"
                style={{ flexShrink: 0, marginTop: 1 }}
              >
                <path d="m10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7, margin: 0 }}>
                <strong>Not financial advice.</strong> All content published on TokenTopNews
                is strictly for informational and educational purposes only. Nothing on this
                platform should be construed as financial, investment, legal, or tax advice.
              </p>
            </div>

            {[
              {
                title: "Informational Purpose Only",
                body: "TokenTopNews publishes crypto news, analysis, and market data for informational purposes. Our editorial team reports on publicly available information and market developments. We do not make buy, sell, or hold recommendations.",
              },
              {
                title: "No Investment Advice",
                body: "Cryptocurrency markets are highly volatile and speculative. Price predictions and analyst opinions published on this platform represent individual views and are not endorsements by TokenTopNews. You should conduct your own research before making any investment decision.",
              },
              {
                title: "Accuracy and Timeliness",
                body: "While we strive to ensure accuracy, TokenTopNews does not guarantee that all information is current, complete, or error-free. Crypto markets move rapidly and information can become outdated. Always verify data from multiple sources.",
              },
              {
                title: "Risk Warning",
                body: "Cryptocurrency investments involve significant risk, including the risk of total loss. Past performance does not guarantee future results. Never invest more than you can afford to lose. Consider consulting a qualified financial advisor.",
              },
              {
                title: "Third-Party Content",
                body: "TokenTopNews may publish content from guest contributors, press releases, and external sources. These do not necessarily represent our editorial views. We are not responsible for the accuracy of third-party content.",
              },
              {
                title: "Affiliate Disclosure",
                body: "Some links on TokenTopNews may be affiliate links. If you click and make a purchase or sign up, we may earn a commission at no extra cost to you. This does not influence our editorial coverage.",
              },
            ].map((section) => (
              <div key={section.title}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {section.title}
                </h2>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.75 }}>
                  {section.body}
                </p>
              </div>
            ))}

            <div style={{ borderTop: "0.5px solid var(--border-subtle)", paddingTop: "var(--s6)" }}>
              <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.7 }}>
                Questions about this disclaimer? Contact legal@tokentopnews.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
