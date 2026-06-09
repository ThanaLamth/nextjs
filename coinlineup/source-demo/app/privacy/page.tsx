import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — CoinLineup",
  description: "CoinLineup Privacy Policy — how we collect, use, and protect your personal information.",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: [
      "We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us. This may include your name, email address, and any other information you choose to provide.",
      "We automatically collect certain technical information when you visit CoinLineup, including your IP address, browser type, operating system, referring URLs, pages viewed, and the date and time of your visit. This data is collected through cookies and similar tracking technologies.",
      "If you connect third-party social accounts (such as X/Twitter), we may receive profile information from those services in accordance with their privacy policies.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "We use the information we collect to provide, maintain, and improve our services; send you newsletters and marketing communications you have opted into; respond to your enquiries and provide customer support; monitor and analyse usage patterns to improve the user experience; and comply with legal obligations.",
      "We do not sell your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.",
    ],
  },
  {
    title: "3. Cookies and Tracking Technologies",
    body: [
      "CoinLineup uses cookies and similar technologies to enhance your experience, remember your preferences (such as theme selection), and analyse site traffic. We use both session cookies (which expire when you close your browser) and persistent cookies.",
      "You can control the use of cookies through your browser settings. Disabling cookies may affect the functionality of certain features on our site. We also use third-party analytics tools including Google Analytics to understand how visitors interact with our site.",
    ],
  },
  {
    title: "4. Data Retention",
    body: [
      "We retain your personal information for as long as your account is active or as needed to provide our services. If you request account deletion, we will delete or anonymise your personal data within 30 days, except where we are required to retain it for legal, tax, or regulatory purposes.",
      "Newsletter subscription data is retained until you unsubscribe. You may unsubscribe at any time by clicking the unsubscribe link in any newsletter email.",
    ],
  },
  {
    title: "5. Data Security",
    body: [
      "We implement industry-standard security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These include encryption of data in transit (HTTPS/TLS), secure storage practices, and access controls limiting who can view your data.",
      "No method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.",
    ],
  },
  {
    title: "6. Your Rights",
    body: [
      "Depending on your location, you may have certain rights regarding your personal information, including: the right to access the personal data we hold about you; the right to request correction of inaccurate data; the right to request deletion of your data; the right to object to or restrict processing; and the right to data portability.",
      "To exercise any of these rights, please contact us at privacy@coinlineup.com. We will respond to your request within 30 days.",
    ],
  },
  {
    title: "7. Third-Party Links",
    body: [
      "Our website contains links to third-party sites, including sponsored content and partner platforms. We are not responsible for the privacy practices of these sites. We encourage you to read their privacy policies before providing any personal information.",
    ],
  },
  {
    title: "8. Children's Privacy",
    body: [
      "CoinLineup is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us and we will promptly delete it.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the effective date. Your continued use of CoinLineup after any changes constitutes your acceptance of the updated policy.",
    ],
  },
  {
    title: "10. Contact Us",
    body: [
      "If you have questions about this Privacy Policy or our data practices, please contact us at privacy@coinlineup.com or through our Contact page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <div className="mb-10">
        <p className="text-brand-orange font-display font-semibold text-sm uppercase tracking-widest mb-3">Legal</p>
        <h1 className="font-display font-bold text-4xl mb-3" style={{ color: "var(--text-primary)" }}>Privacy Policy</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Effective date: 1 January 2026 · Last updated: 1 May 2026
        </p>
      </div>

      <div className="rounded-xl border p-6 mb-8" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          CoinLineup (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our website at coinlineup.com and related services.
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
        <Link href="/terms" className="text-brand-orange text-sm font-semibold hover:underline">Terms of Use</Link>
        <Link href="/contact" className="text-brand-orange text-sm font-semibold hover:underline">Contact Us</Link>
        <Link href="/about" className="text-brand-orange text-sm font-semibold hover:underline">About CoinLineup</Link>
      </div>

    </div>
  );
}
