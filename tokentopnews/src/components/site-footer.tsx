import Link from "next/link";

const FOOTER_GROUPS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Blog", href: "/trending" },
      { label: "Community Forum", href: "/forum" },
      { label: "API Documentation", href: "/api-docs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

const STATS = [
  { n: "50K+", l: "Daily Readers" },
  { n: "120+", l: "Countries" },
  { n: "4.9★", l: "App Rating" },
  { n: "99.9%", l: "Uptime SLA" },
];

export function SiteFooter() {
  return (
    <footer
      className="site-footer"
      style={{
        background: "var(--surface)",
        borderTop: "0.5px solid var(--border-subtle)",
        marginTop: "var(--s16)",
        paddingTop: "var(--s16)",
        paddingBottom: "var(--s8)",
      }}
    >
      <div className="container">
        <div
          className="site-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            marginBottom: "var(--s16)",
            alignItems: "start",
          }}
        >
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "var(--s4)" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 7,
                  background: "var(--grad-brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 14,
                  color: "#fff",
                }}
              >
                T
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>
                  TokenTopNews
                </div>
                <div
                  style={{
                    fontSize: 8,
                    color: "var(--text-3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  CRYPTO NEWS, INSIGHT &amp; MARKET CONTEXT
                </div>
              </div>
            </Link>
            <p
              style={{
                fontSize: 11,
                color: "var(--text-3)",
                lineHeight: 1.6,
                marginBottom: "var(--s6)",
              }}
            >
              Disclaimer: Any financial and market information given on Tokentopnews.com
              is written for informational purposes only. Conduct your own research by
              contacting financial experts before making any investment decisions.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { l: "F", c: "#1877F2" },
                { l: "X", c: "#1DA1F2" },
                { l: "T", c: "#229ED9" },
                { l: "Y", c: "#FF0000" },
                { l: "L", c: "#0A66C2" },
              ].map((social) => (
                <a
                  key={social.l}
                  href="#"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 5,
                    background: social.c,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {social.l}
                </a>
              ))}
            </div>
          </div>

          <div
            className="footer-link-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr)) minmax(280px, 1.2fr)",
              gap: 24,
              alignItems: "start",
            }}
          >
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "var(--s4)",
                    color: "var(--text-1)",
                  }}
                >
                  {group.title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{ fontSize: 12, color: "var(--text-3)" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div
              className="footer-trust-card"
              style={{
                background: "linear-gradient(var(--surface), var(--surface)) padding-box, var(--grad-brand) border-box",
                border: "1.5px solid transparent",
                borderRadius: "var(--r-xl)",
                padding: "var(--s5)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "var(--s4)",
                  color: "var(--text-3)",
                }}
              >
                TRUSTED BY READERS WORLDWIDE
              </div>
              <div
                className="footer-trust-stats"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--s4)",
                  marginBottom: "var(--s4)",
                }}
              >
                {STATS.map((stat) => (
                  <div key={stat.l}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 22,
                        fontWeight: 800,
                        lineHeight: 1,
                      }}
                    >
                      <span className="grad-brand">{stat.n}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 3 }}>
                      {stat.l}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  borderTop: "0.5px solid var(--border-subtle)",
                  paddingTop: "var(--s3)",
                  marginTop: "var(--s2)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: "var(--grad-brand)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-2)" }}>
                    SOC2 Certified
                  </span>
                </div>
                <div style={{ fontSize: 10, color: "var(--text-3)", fontStyle: "italic" }}>
                  Built for the crypto community
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider" style={{ marginBottom: "var(--s6)" }} />
        <div
          className="footer-bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p style={{ fontSize: 11, color: "var(--text-3)" }}>
            &copy; 2024 TokenTopNews. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/privacy" style={{ fontSize: 11, color: "var(--text-3)" }}>
              Privacy
            </Link>
            <Link href="/terms" style={{ fontSize: 11, color: "var(--text-3)" }}>
              Terms
            </Link>
            <Link href="/cookies" style={{ fontSize: 11, color: "var(--text-3)" }}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
