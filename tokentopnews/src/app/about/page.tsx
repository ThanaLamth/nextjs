import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | TokenTopNews",
  description:
    "Learn about TokenTopNews - the crypto news platform built for traders and investors.",
};

const VALUES = [
  {
    icon: "🎯",
    title: "Accuracy First",
    desc: "Every piece of content is verified before publication. We hold ourselves to the highest journalistic standards in crypto media.",
  },
  {
    icon: "⚡",
    title: "Speed Matters",
    desc: "Markets move fast. Our team monitors breaking news 24/7 to ensure you never miss a market-moving event.",
  },
  {
    icon: "🧠",
    title: "Deep Analysis",
    desc: "Beyond the headlines - we provide the context, on-chain data, and expert insight that helps you make informed decisions.",
  },
  {
    icon: "🌍",
    title: "Global Reach",
    desc: "Serving readers in 120+ countries, we cover crypto from every corner of the globe - from regulatory shifts to local adoption.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section
        style={{
          background: "var(--surface)",
          borderBottom: "0.5px solid var(--border-subtle)",
          padding: "var(--s10) 0",
          position: "relative",
          overflow: "hidden",
          marginBottom: "var(--s10)",
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
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(ellipse,rgba(155,61,255,0.1) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
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
            <span style={{ color: "var(--text-brand)" }}>About Us</span>
          </div>
          <div
            style={{
              maxWidth: 680,
              margin: "0 auto",
              textAlign: "center",
              padding: "var(--s6) 0",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 42,
                fontWeight: 800,
                marginBottom: 16,
              }}
            >
              <span className="grad-brand">About TokenTopNews</span>
            </h1>
            <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.75 }}>
              We are a team of crypto journalists, analysts, and developers united by
              one mission: delivering the most accurate, actionable crypto intelligence
              to investors worldwide.
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--s10)",
              alignItems: "center",
              marginBottom: "var(--s16)",
            }}
          >
            <div>
              <div className="t-section" style={{ color: "var(--text-brand)", marginBottom: 12 }}>
                OUR STORY
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 800,
                  marginBottom: 16,
                  lineHeight: 1.2,
                }}
              >
                Founded by traders, for traders
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  marginBottom: 12,
                }}
              >
                TokenTopNews was founded in 2021 by a group of veteran crypto traders
                who were frustrated by the lack of reliable, signal-to-noise-optimized
                news in the space. Most outlets either published clickbait or lagged
                hours behind the market.
              </p>
              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.75 }}>
                We built the platform we wished existed - combining real-time market
                data, verified breaking news, and deep-dive research into one trusted
                destination for 50,000+ daily readers across 120+ countries.
              </p>
            </div>
            <div
              style={{
                background: "var(--surface)",
                border: "0.5px solid var(--border)",
                borderRadius: "var(--r-xl)",
                padding: "var(--s8)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--s6)",
                textAlign: "center",
              }}
            >
              {[
                { n: "50K+", l: "Daily Readers" },
                { n: "120+", l: "Countries" },
                { n: "2021", l: "Founded" },
                { n: "4.9★", l: "App Rating" },
              ].map((stat) => (
                <div key={stat.l}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800 }}>
                    <span className="grad-brand">{stat.n}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 4 }}>
                    {stat.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "var(--s16)" }}>
            <div style={{ textAlign: "center", marginBottom: "var(--s8)" }}>
              <div className="t-section" style={{ color: "var(--text-3)", marginBottom: 8 }}>
                WHAT WE STAND FOR
              </div>
              <h2 className="t-h1">Our values</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--gutter)" }}>
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  style={{
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    borderRadius: "var(--r-xl)",
                    padding: "var(--s6)",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{value.icon}</div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    {value.title}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.6 }}>
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
