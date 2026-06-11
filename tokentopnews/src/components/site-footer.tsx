import Link from "next/link";

import { decodeEntities, toInternalPath, type WpPage } from "@/lib/wp";

type SiteFooterProps = {
  pages: WpPage[];
};

export function SiteFooter({ pages }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <p className="eyebrow">TokenTopNews</p>
          <p className="footer-copy">
            Headless migration baseline with WordPress preserved as the editorial
            system of record.
          </p>
        </div>
        <div className="footer-links">
          {pages.map((page) => (
            <Link key={page.id} href={toInternalPath(page.link)}>
              {decodeEntities(page.title.rendered)}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
