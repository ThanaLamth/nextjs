import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use — CoinLineup",
  description: "CoinLineup Terms of Use — the rules and guidelines governing your use of our platform.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing or using CoinLineup (coinlineup.com) and any related services, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our platform.",
      "We reserve the right to modify these terms at any time. Changes become effective immediately upon posting. Your continued use of the platform following any changes constitutes acceptance of the updated terms.",
    ],
  },
  {
    title: "2. Not Financial Advice",
    body: [
      "IMPORTANT: All content published on CoinLineup — including news articles, market analysis, guides, price data, and any other material — is provided for informational and educational purposes only. Nothing on this platform constitutes financial, investment, legal, or tax advice.",
      "Cryptocurrency markets are highly volatile. Past performance is not indicative of future results. You should always conduct your own independent research and consult with a qualified financial adviser before making any investment decisions. CoinLineup accepts no liability for investment losses incurred by readers.",
    ],
  },
  {
    title: "3. User Accounts",
    body: [
      "To access certain features of CoinLineup, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.",
      "You must provide accurate and complete information when creating your account. You agree not to create accounts under false pretences, impersonate other individuals, or use the platform for any unlawful purpose.",
      "We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or disrupt the experience of other users.",
    ],
  },
  {
    title: "4. Intellectual Property",
    body: [
      "All content on CoinLineup — including articles, guides, graphics, logos, and software — is owned by or licensed to CoinLineup and is protected by copyright and other intellectual property laws.",
      "You may share individual articles for non-commercial purposes provided you credit CoinLineup with a link to the original source. You may not reproduce, redistribute, or republish substantial portions of our content without prior written permission.",
    ],
  },
  {
    title: "5. Prohibited Conduct",
    body: [
      "You agree not to use CoinLineup to: violate any applicable law or regulation; transmit spam, malware, or malicious code; attempt to gain unauthorised access to our systems; scrape or harvest content or user data without permission; post false, defamatory, or misleading information; harass, threaten, or harm other users; or interfere with the normal operation of the platform.",
    ],
  },
  {
    title: "6. Third-Party Content and Links",
    body: [
      "CoinLineup may include sponsored content, affiliate links, and links to third-party websites. Sponsored and promotional content is clearly labelled. We are not responsible for the accuracy, legality, or quality of third-party content or websites linked from our platform.",
      "Inclusion of a link or sponsored content does not constitute an endorsement of the linked product, service, or organisation.",
    ],
  },
  {
    title: "7. Disclaimer of Warranties",
    body: [
      "CoinLineup is provided on an 'as is' and 'as available' basis without warranties of any kind, either express or implied. We do not warrant that the platform will be uninterrupted, error-free, or free of viruses.",
      "We make every effort to ensure price data and market information is accurate, but we cannot guarantee real-time accuracy. Always verify critical data through multiple sources before making decisions.",
    ],
  },
  {
    title: "8. Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, CoinLineup and its officers, directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the platform, including but not limited to investment losses, data loss, or loss of business.",
    ],
  },
  {
    title: "9. Governing Law",
    body: [
      "These Terms of Use are governed by and construed in accordance with the laws of the jurisdiction in which CoinLineup is incorporated. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of that jurisdiction.",
    ],
  },
  {
    title: "10. Contact",
    body: [
      "Questions about these Terms of Use may be directed to legal@coinlineup.com or through our Contact page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <div className="mb-10">
        <p className="text-brand-orange font-display font-semibold text-sm uppercase tracking-widest mb-3">Legal</p>
        <h1 className="font-display font-bold text-4xl mb-3" style={{ color: "var(--text-primary)" }}>Terms of Use</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Effective date: 1 January 2026 · Last updated: 1 May 2026
        </p>
      </div>

      <div className="rounded-xl border p-6 mb-8" style={{ background: "rgba(230,57,70,0.06)", borderColor: "rgba(230,57,70,0.2)" }}>
        <p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--text-primary)" }}>
          ⚠️ Disclaimer: Nothing on CoinLineup constitutes financial or investment advice. All content is for informational purposes only. Cryptocurrency investments carry significant risk of loss.
        </p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="font-display font-bold text-lg mb-3" style={{ color: "var(--text-primary)" }}>
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.body.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t flex flex-wrap gap-4" style={{ borderColor: "var(--border)" }}>
        <Link href="/privacy" className="text-brand-orange text-sm font-semibold hover:underline">Privacy Policy</Link>
        <Link href="/contact" className="text-brand-orange text-sm font-semibold hover:underline">Contact Us</Link>
        <Link href="/about" className="text-brand-orange text-sm font-semibold hover:underline">About CoinLineup</Link>
      </div>

    </div>
  );
}
