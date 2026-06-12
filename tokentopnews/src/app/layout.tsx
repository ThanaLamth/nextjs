import type { Metadata } from "next";

import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, getAllCategories, getSiteSettings } from "@/lib/wp";

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
  const [site, categories] = await Promise.all([
    getSiteSettings(),
    getAllCategories(),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <SiteHeader site={site} categories={categories} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
