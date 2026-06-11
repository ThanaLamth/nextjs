import Link from "next/link";

import { decodeEntities, toInternalPath, type WpCategory, type WpPage, type SiteSettings } from "@/lib/wp";

type SiteHeaderProps = {
  site: SiteSettings;
  categories: WpCategory[];
  trustPages: WpPage[];
};

export function SiteHeader({ site, categories, trustPages }: SiteHeaderProps) {
  const utilityPages = trustPages.slice(0, 2);

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="shell top-strip__inner">
          <span className="eyebrow">Live Editorial Wire</span>
          <span className="top-strip__copy">{decodeEntities(site.description)}</span>
        </div>
      </div>
      <div className="shell masthead">
        <div>
          <Link href="/" className="brand">
            {site.name}
          </Link>
          <p className="brand-tagline">WordPress CMS, Next.js editorial frontend.</p>
        </div>
        <nav className="utility-nav" aria-label="Utility">
          {utilityPages.map((page) => (
            <Link key={page.id} href={toInternalPath(page.link)}>
              {decodeEntities(page.title.rendered)}
            </Link>
          ))}
        </nav>
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
