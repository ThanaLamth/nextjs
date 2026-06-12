import Link from "next/link";

import { decodeEntities, toInternalPath, type WpPage } from "@/lib/wp";

type SiteFooterProps = {
  pages: WpPage[];
};

export function SiteFooter({ pages }: SiteFooterProps) {
  const pageMap = new Map(pages.map((page) => [page.slug, page]));
  const footerGroups = [
    {
      title: "Company",
      slugs: ["about-us", "publishing-principles"],
    },
    {
      title: "Standards",
      slugs: ["ownership-funding", "feedback-corrections", "ethics-policy"],
    },
    {
      title: "Policies",
      slugs: ["diversity-policy", "diversity-staffing-report", "privacy-policy"],
    },
  ].map((group) => ({
    title: group.title,
    pages: group.slugs
      .map((slug) => pageMap.get(slug))
      .filter((page): page is WpPage => Boolean(page)),
  }));

  const metrics = [
    { value: "WordPress", label: "CMS source" },
    { value: "Next.js 16", label: "Frontend runtime" },
    { value: "REST API", label: "Content transport" },
    { value: "Railway", label: "Deployment target" },
  ];

  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div className="site-footer__brand">
          <div className="brand-lockup brand-lockup--footer">
            <span className="brand-mark">T</span>
            <div>
              <span className="brand">TokenTopNews</span>
              <p className="brand-tagline">Crypto news, insight &amp; market context.</p>
            </div>
          </div>
          <p className="footer-copy">
            Tokentopnews.com remains the editorial system of record. This frontend
            renders WordPress content through a staged Next.js migration.
          </p>
          <p className="footer-note">
            Editorial, policy, and transparency pages remain available from the same
            source content during the cutover period.
          </p>
        </div>
        <div className="footer-columns">
          {footerGroups.map((group) => (
            <div key={group.title} className="footer-column">
              <p className="footer-column__title">{group.title}</p>
              <div className="footer-links">
                {group.pages.map((page) => (
                  <Link key={page.id} href={toInternalPath(page.link)}>
                    {decodeEntities(page.title.rendered)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="footer-card">
            <p className="footer-column__title">Platform Stack</p>
            <div className="footer-metrics">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="footer-metrics__value">{metric.value}</p>
                  <p className="footer-metrics__label">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="shell site-footer__bottom">
        <p>&copy; 2026 TokenTopNews. All rights reserved.</p>
        <div className="site-footer__bottom-links">
          {pages.slice(-3).map((page) => (
            <Link key={page.id} href={toInternalPath(page.link)}>
              {decodeEntities(page.title.rendered)}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
