import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import CryptoTicker from "@/components/CryptoTicker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getSiteUrl } from "@/lib/wordpress";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "CoinLineup — Real-Time Crypto News & Market Intelligence",
    template: "%s | CoinLineup",
  },
  description:
    "Your trusted source for cryptocurrency news, market analysis, and blockchain technology updates. Real-time market data, DeFi, NFT, and DAO coverage.",
  keywords: ["crypto news", "bitcoin", "ethereum", "DeFi", "blockchain", "cryptocurrency", "market analysis"],
  openGraph: {
    type: "website",
    siteName: "CoinLineup",
    title: "CoinLineup — Real-Time Crypto News & Market Intelligence",
    description: "Your gateway to real-time crypto market insights.",
    url: getSiteUrl(),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className="antialiased" style={{ background: "var(--page-bg)", color: "var(--text-primary)" }}>
        <Suspense fallback={<main className="min-h-screen pt-[92px]" />}>
          <ThemeProvider>
            <div className="fixed inset-x-0 top-0 z-50">
              <CryptoTicker />
              <Navbar />
            </div>
            <main className="min-h-screen pt-[92px]">{children}</main>
            <Footer />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
