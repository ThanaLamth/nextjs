import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Find answers to common questions about TokenTopNews subscriptions, features, and market data.",
};

const TOPICS = [
  {
    icon: "👤",
    title: "Account & Billing",
    items: [
      "How to upgrade to Pro",
      "Cancel or change your plan",
      "Update payment method",
      "Download invoices",
    ],
  },
  {
    icon: "📰",
    title: "Content & Newsletters",
    items: [
      "Subscribe to newsletters",
      "Manage email preferences",
      "Bookmark articles",
      "Download reports",
    ],
  },
  {
    icon: "📊",
    title: "Market Data",
    items: [
      "Understanding the market snapshot",
      "Price alert setup",
      "Portfolio tracker guide",
      "API access documentation",
    ],
  },
  {
    icon: "🔐",
    title: "Security & Privacy",
    items: [
      "Two-factor authentication",
      "Manage connected apps",
      "Data export request",
      "Delete your account",
    ],
  },
];

export default function HelpPage() {
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
            <span style={{ color: "var(--text-brand)" }}>Help Center</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 42,
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            <span className="grad-brand">How can we help?</span>
          </h1>
          <div style={{ maxWidth: 480, margin: "0 auto", position: "relative" }}>
            <input
              type="text"
              placeholder="Search for answers..."
              style={{
                width: "100%",
                background: "var(--raised)",
                border: "0.5px solid var(--border)",
                borderRadius: "var(--r-pill)",
                padding: "12px 48px 12px 20px",
                fontSize: 13,
                color: "var(--text-1)",
                outline: "none",
              }}
            />
            <svg
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-3)",
              }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "var(--s16)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "var(--gutter)",
              marginBottom: "var(--s10)",
            }}
          >
            {TOPICS.map((topic) => (
              <div
                key={topic.title}
                style={{
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  borderRadius: "var(--r-xl)",
                  padding: "var(--s6)",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 10 }}>{topic.icon}</div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: "var(--s4)",
                  }}
                >
                  {topic.title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {topic.items.map((item) => (
                    <a
                      key={item}
                      href="#"
                      style={{
                        fontSize: 12,
                        color: "var(--text-brand)",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "var(--grad-brand)",
              borderRadius: "var(--r-xl)",
              padding: "var(--s8)",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Still need help?
            </div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.8)",
                marginBottom: "var(--s5)",
              }}
            >
              Our support team typically responds within 2 hours on weekdays.
            </p>
            <button className="btn btn-white" style={{ fontSize: 13 }}>
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
