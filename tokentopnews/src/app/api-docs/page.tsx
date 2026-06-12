import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "API Documentation",
  description:
    "TokenTopNews REST API documentation — access market data and news content programmatically.",
};

const ENDPOINTS = [
  { method: "GET", path: "/v1/markets/prices", desc: "Real-time prices for all tracked assets", auth: "API Key" },
  { method: "GET", path: "/v1/markets/history/:id", desc: "Historical OHLCV data for a single asset", auth: "API Key" },
  { method: "GET", path: "/v1/news/latest", desc: "Latest published articles with metadata", auth: "API Key" },
  { method: "GET", path: "/v1/news/:slug", desc: "Full article content and metadata", auth: "API Key" },
  { method: "GET", path: "/v1/newsletter/archive", desc: "Archive of past newsletter editions", auth: "Pro+" },
  { method: "POST", path: "/v1/alerts/create", desc: "Create a price alert for an asset", auth: "Pro+" },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "#00E5A0",
  POST: "#627EEA",
  DELETE: "#FF4060",
};

export default function ApiDocsPage() {
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
            <span style={{ color: "var(--text-brand)" }}>API Documentation</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 42,
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            <span className="grad-brand">API Documentation</span>
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-2)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
              marginBottom: "var(--s6)",
            }}
          >
            Integrate TokenTopNews market data and content into your own applications.
            REST API with JSON responses.
          </p>
          <div style={{ display: "inline-flex", gap: 8 }}>
            <Link href="/subscribe" className="btn btn-primary btn-sm">
              Get API Key
            </Link>
            <a href="#endpoints" className="btn btn-outline btn-sm">
              View Endpoints
            </a>
          </div>
        </div>
      </section>

      <section id="endpoints" style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div
              style={{
                background: "var(--canvas-deep)",
                borderRadius: "var(--r-lg)",
                padding: "var(--s4) var(--s6)",
                marginBottom: "var(--s6)",
                fontFamily: "monospace",
                fontSize: 12,
                color: "var(--text-2)",
              }}
            >
              <span style={{ color: "var(--text-3)" }}>Base URL: </span>
              <span style={{ color: "var(--text-brand)" }}>https://api.tokentopnews.com</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {ENDPOINTS.map((endpoint) => (
                <div
                  key={endpoint.path}
                  style={{
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    borderRadius: "var(--r-lg)",
                    padding: "var(--s4) var(--s5)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      background: `${METHOD_COLORS[endpoint.method]}22`,
                      color: METHOD_COLORS[endpoint.method],
                      fontSize: 9,
                      fontWeight: 800,
                      padding: "2px 7px",
                      borderRadius: 3,
                      fontFamily: "monospace",
                      flexShrink: 0,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {endpoint.method}
                  </span>
                  <code
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: "var(--text-1)",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {endpoint.path}
                  </code>
                  <span style={{ fontSize: 11, color: "var(--text-3)", flex: 1 }}>
                    {endpoint.desc}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: endpoint.auth === "Pro+" ? "var(--text-brand)" : "var(--text-3)",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {endpoint.auth}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "var(--raised)",
                border: "0.5px solid var(--border)",
                borderRadius: "var(--r-xl)",
                padding: "var(--s6)",
                marginTop: "var(--s8)",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 6 }}>
                API access requires an Institutional plan
              </div>
              <p style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 12 }}>
                100,000 calls/month included. Custom limits available for enterprise.
              </p>
              <Link href="/subscribe" className="btn btn-primary btn-sm">
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
