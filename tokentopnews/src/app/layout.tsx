import type { Metadata } from "next";
import { Suspense } from "react";

import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, getAllCategories, getSiteSettings, getTrustPages } from "@/lib/wp";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: "TokenTopNews",
    template: "%s | TokenTopNews",
  },
  description: "Crypto news, insight and market context from TokenTopNews.",
};

const themeInitScript = `
try {
  const storedTheme = window.localStorage.getItem("theme");
  document.documentElement.setAttribute(
    "data-theme",
    storedTheme === "light" ? "light" : "dark"
  );
} catch {}
`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [site, categories, trustPages] = await Promise.all([
    getSiteSettings(),
    getAllCategories(),
    getTrustPages(),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Suspense fallback={<div style={{ minHeight: 148 }} />}>
          <SiteHeader site={site} categories={categories} trustPages={trustPages} />
        </Suspense>
        {children}
        <SiteFooter pages={trustPages} />
      </body>
    </html>
  );
}
