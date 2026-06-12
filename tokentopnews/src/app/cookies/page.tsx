import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "TokenTopNews Cookie Policy — what cookies we use and why.",
};

const COOKIE_TYPES = [
  {
    name: "Essential Cookies",
    required: true,
    desc: "Required for the Service to function. These include session management, authentication tokens, and security cookies. Cannot be disabled.",
  },
  {
    name: "Analytics Cookies",
    required: false,
    desc: "Help us understand how readers use the Service — pages viewed, time spent, navigation paths. Data is aggregated and anonymized. Provided by Plausible Analytics (privacy-friendly, no cross-site tracking).",
  },
  {
    name: "Preference Cookies",
    required: false,
    desc: "Remember your settings such as theme (dark/light mode), newsletter preferences, and display options across sessions.",
  },
  {
    name: "Marketing Cookies",
    required: false,
    desc: "We do not use advertising or retargeting cookies. TokenTopNews does not display third-party ads or share data with ad networks.",
  },
];

export default function CookiesPage() {
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
            <span style={{ color: "var(--text-brand)" }}>Cookie Policy</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Cookie Policy
          </h1>
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>Last updated: January 1, 2024</p>
        </div>
      </section>

      <section style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-2)",
                lineHeight: 1.75,
                marginBottom: "var(--s8)",
              }}
            >
              Cookies are small text files stored on your device when you visit TokenTopNews.
              This policy explains what cookies we use, why, and how you can manage them.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: "var(--s8)",
              }}
            >
              {COOKIE_TYPES.map((cookieType) => (
                <div
                  key={cookieType.name}
                  style={{
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    borderRadius: "var(--r-xl)",
                    padding: "var(--s5) var(--s6)",
                    display: "flex",
                    gap: "var(--s5)",
                  }}
                >
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: cookieType.required ? "var(--bull)" : "var(--text-3)",
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                      >
                        {cookieType.name}
                      </span>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          padding: "1px 6px",
                          borderRadius: 3,
                          background: cookieType.required
                            ? "rgba(0,229,160,0.15)"
                            : "var(--raised)",
                          color: cookieType.required ? "var(--bull)" : "var(--text-3)",
                        }}
                      >
                        {cookieType.required ? "REQUIRED" : "OPTIONAL"}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.65 }}>
                      {cookieType.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "var(--raised)",
                border: "0.5px solid var(--border)",
                borderRadius: "var(--r-xl)",
                padding: "var(--s6)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Managing Cookies
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  marginBottom: 8,
                }}
              >
                You can manage optional cookies in your browser settings or via your
                TokenTopNews account preferences. Note that disabling essential cookies
                will prevent the Service from working correctly.
              </p>
              <p style={{ fontSize: 12, color: "var(--text-3)" }}>
                Questions? Contact privacy@tokentopnews.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
