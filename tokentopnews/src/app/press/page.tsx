import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press",
  description: "Press kit, media mentions, and contact information for TokenTopNews.",
};

const COVERAGE = [
  {
    outlet: "CoinDesk",
    headline: "TokenTopNews surpasses 50,000 daily readers milestone",
    date: "Mar 2024",
  },
  {
    outlet: "The Block",
    headline: "New crypto media platforms gaining traction amid industry consolidation",
    date: "Jan 2024",
  },
  {
    outlet: "Decrypt",
    headline: "TokenTopNews launches institutional data tier for professional desks",
    date: "Nov 2023",
  },
];

export default function PressPage() {
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
        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
              fontSize: 11,
              color: "var(--text-3)",
              justifyContent: "center",
            }}
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--text-brand)" }}>Press</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 42,
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            <span className="grad-brand">Press &amp; Media</span>
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-2)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Media kit, recent coverage, and press contact. For interview requests or
            press inquiries contact press@tokentopnews.com.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s10)" }}>
            <div>
              <div className="t-section" style={{ color: "var(--text-3)", marginBottom: "var(--s4)" }}>
                PRESS KIT
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Brand Guidelines & Logos", size: "PDF · 4.2 MB" },
                  { label: "Executive Bios & Headshots", size: "ZIP · 18 MB" },
                  { label: "Fact Sheet 2024", size: "PDF · 1.1 MB" },
                  { label: "Product Screenshots", size: "ZIP · 34 MB" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "var(--surface)",
                      border: "0.5px solid var(--border)",
                      borderRadius: "var(--r-lg)",
                      padding: "var(--s4) var(--s5)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 10, color: "var(--text-3)" }}>{item.size}</div>
                    </div>
                    <button className="btn btn-outline btn-sm">Download</button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="t-section" style={{ color: "var(--text-3)", marginBottom: "var(--s4)" }}>
                IN THE NEWS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {COVERAGE.map((coverage) => (
                  <div
                    key={coverage.headline}
                    style={{
                      background: "var(--surface)",
                      border: "0.5px solid var(--border)",
                      borderRadius: "var(--r-lg)",
                      padding: "var(--s4) var(--s5)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--text-brand)",
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      {coverage.outlet} · {coverage.date}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>
                      {coverage.headline}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: "var(--s8)",
                  background: "var(--raised)",
                  border: "0.5px solid var(--border)",
                  borderRadius: "var(--r-xl)",
                  padding: "var(--s5)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 4 }}>
                  Press Contact
                </div>
                <p style={{ fontSize: 12, color: "var(--text-3)" }}>press@tokentopnews.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
