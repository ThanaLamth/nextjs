import type { Metadata } from "next";
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
    <html lang="en" className="dark">
      <body className="antialiased" style={{ background: "var(--page-bg)", color: "var(--text-primary)" }}>
        <ThemeProvider>
          <CryptoTicker />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
