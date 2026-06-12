import type { Metadata } from "next";

import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  absoluteUrl,
  getPrimaryCategories,
  getSiteSettings,
  getTrustPages,
} from "@/lib/wp";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: "TokenTopNews",
    template: "%s",
  },
  description: "Crypto news, insight and market context from TokenTopNews.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [site, categories, trustPages] = await Promise.all([
    getSiteSettings(),
    getPrimaryCategories(),
    getTrustPages(),
  ]);

  return (
    <html lang="en">
      <body>
        <SiteHeader site={site} categories={categories} trustPages={trustPages} />
        {children}
        <SiteFooter pages={trustPages} />
      </body>
    </html>
  );
}
