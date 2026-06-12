import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Forum",
  description:
    "Join the TokenTopNews community — discuss crypto markets, share insights, and connect with fellow investors.",
};

export default function ForumPage() {
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
            <span style={{ color: "var(--text-brand)" }}>Community Forum</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 42,
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            <span className="grad-brand">Community Forum</span>
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-2)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Connect with 50,000+ crypto readers. Share insights, discuss market moves,
            and learn from fellow investors.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto",
              background: "var(--grad-brand)",
              borderRadius: "var(--r-xl)",
              padding: "var(--s12)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 12,
              }}
            >
              Coming Soon
            </div>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.8)",
                marginBottom: "var(--s6)",
                lineHeight: 1.7,
              }}
            >
              We are building a dedicated community space for TokenTopNews readers. Be the
              first to know when it launches.
            </p>
            <div style={{ display: "flex", gap: 8, maxWidth: 380, margin: "0 auto" }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="newsletter-input"
                style={{
                  flex: 1,
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "var(--r-md)",
                  padding: "10px 16px",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <button className="btn btn-white" style={{ flexShrink: 0, fontWeight: 700 }}>
                Notify me
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
