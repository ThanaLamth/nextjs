import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "TokenTopNews Terms of Service.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: 'By accessing or using TokenTopNews ("Service"), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Service.',
  },
  {
    title: "2. Description of Service",
    body: "TokenTopNews provides crypto news, market data, analysis, and newsletter content. The Service is for informational purposes only and does not constitute financial or investment advice.",
  },
  {
    title: "3. User Accounts",
    body: "You are responsible for maintaining the confidentiality of your account credentials. You are liable for all activity under your account. Notify us immediately of any unauthorized use.",
  },
  {
    title: "4. Subscriptions and Billing",
    body: "Paid subscriptions are billed in advance on a monthly or annual basis. Cancellations take effect at the end of the current billing period. No refunds are issued for partial periods.",
  },
  {
    title: "5. Intellectual Property",
    body: "All content published on TokenTopNews — including articles, data, graphics, and newsletters — is the property of TokenTopNews and protected by copyright law. Reproduction without permission is prohibited.",
  },
  {
    title: "6. Prohibited Use",
    body: "You may not scrape, copy, redistribute, or sell any content from the Service. You may not use the Service for any unlawful purpose or to distribute unsolicited communications.",
  },
  {
    title: "7. Disclaimer of Warranties",
    body: 'The Service is provided "as is" without warranty of any kind. TokenTopNews does not guarantee the accuracy, completeness, or timeliness of any information published.',
  },
  {
    title: "8. Limitation of Liability",
    body: "TokenTopNews shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service, including any investment decisions made based on our content.",
  },
  {
    title: "9. Changes to Terms",
    body: "We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the updated Terms.",
  },
  {
    title: "10. Contact",
    body: "For questions about these Terms, contact legal@tokentopnews.com.",
  },
];

export default function TermsPage() {
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
            <span style={{ color: "var(--text-brand)" }}>Terms of Service</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Terms of Service
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
            {SECTIONS.map((section) => (
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
          </div>
        </div>
      </section>
    </main>
  );
}
