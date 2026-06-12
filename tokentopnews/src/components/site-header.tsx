import Link from "next/link";

import { decodeEntities, toInternalPath, type WpCategory, type WpPage, type SiteSettings } from "@/lib/wp";

type SiteHeaderProps = {
  site: SiteSettings;
  categories: WpCategory[];
  trustPages: WpPage[];
};

export function SiteHeader({ site, categories, trustPages }: SiteHeaderProps) {
  const utilityPages = trustPages.slice(0, 2);
  const ctaPages = trustPages.slice(2, 4);

  return (
    <header className="site-header">
      <div className="live-bar">
        <div className="shell live-bar__inner">
          <span className="live-pill">Live</span>
          <div className="live-ticker" aria-label="Coverage lanes">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                href={toInternalPath(`/${category.slug}`)}
                className="live-ticker__item"
              >
                {decodeEntities(category.name)}
              </Link>
            ))}
          </div>
          <span className="live-copy">{decodeEntities(site.description)}</span>
        </div>
      </div>
      <div className="shell masthead">
        <Link href="/" className="brand-lockup" aria-label={site.name}>
          <span className="brand-mark">T</span>
          <div>
            <span className="brand">{site.name}</span>
            <p className="brand-tagline">Crypto news, insight &amp; market context.</p>
          </div>
        </Link>
        <div className="masthead__signal">
          <p className="masthead__signal-label">Headless Frontend</p>
          <p className="masthead__signal-copy">
            WordPress remains the CMS while Next.js handles the editorial
            presentation layer.
          </p>
        </div>
        <div className="masthead__actions">
          <nav className="utility-nav" aria-label="Utility">
            {utilityPages.map((page) => (
              <Link key={page.id} href={toInternalPath(page.link)}>
                {decodeEntities(page.title.rendered)}
              </Link>
            ))}
          </nav>
          <div className="header-cta">
            {ctaPages.map((page, index) => (
              <Link
                key={page.id}
                href={toInternalPath(page.link)}
                className={`btn ${index === 0 ? "btn-outline" : "btn-primary"} btn-sm`}
              >
                {decodeEntities(page.title.rendered)}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="shell primary-nav-wrap">
        <nav className="primary-nav" aria-label="Primary">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={toInternalPath(`/${category.slug}`)}
              className="primary-nav__item"
            >
              {decodeEntities(category.name)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
