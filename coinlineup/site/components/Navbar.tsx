"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, User, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "News", href: "/news",
    children: [
      { label: "Bitcoin", href: "/news/bitcoin" },
      { label: "Ethereum", href: "/news/ethereum" },
      { label: "Altcoins", href: "/news/altcoins" },
      { label: "Regulation", href: "/news/regulation" },
      { label: "Banking", href: "/news/banking" },
      { label: "Exchanges", href: "/news/exchanges" },
      { label: "Blockchain Events", href: "/news/blockchain-events" },
    ],
  },
  { label: "Guides", href: "/guides",
    children: [
      { label: "Crypto Basics", href: "/guides/crypto-basics" },
      { label: "Bitcoin", href: "/guides/bitcoin" },
      { label: "Blockchain", href: "/guides/blockchain" },
      { label: "Wallets", href: "/guides/wallets" },
      { label: "Crypto Trading", href: "/guides/crypto-trading" },
      { label: "DeFi", href: "/guides/defi" },
      { label: "Security", href: "/guides/security" },
    ],
  },
  { label: "Markets", href: "/markets",
    children: [
      { label: "Bitcoin", href: "/markets/bitcoin" },
      { label: "Ethereum", href: "/markets/ethereum" },
      { label: "XRP", href: "/markets/xrp" },
    ],
  },
  { label: "Projects", href: "/projects",
    children: [
      { label: "Top Projects", href: "/projects/top-projects" },
      { label: "Reviews", href: "/projects/reviews" },
      { label: "New Projects", href: "/projects/new-projects" },
    ],
  },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdown, setDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 w-full">
      <nav className="backdrop-blur-md border-b" style={{ background: "var(--nav-bg)", borderColor: "var(--nav-border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo-white.png" alt="CoinLineup" width={160} height={30} priority className="h-7 w-auto" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative"
                  onMouseEnter={() => link.children && setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}>
                  <Link href={link.href}
                    className="nav-link flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors hover:text-brand-orange"
                    style={{ color: "var(--nav-text)" }}>
                    {link.label}
                    {link.children && <ChevronDown size={13} className="opacity-50" />}
                  </Link>
                  <AnimatePresence>
                    {link.children && dropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.13 }}
                        className="absolute top-full left-0 mt-1 w-44 rounded-xl shadow-xl overflow-hidden border z-50"
                        style={{ background: "var(--nav-dropdown-bg)", borderColor: "var(--nav-dropdown-border)" }}>
                        {link.children.map((child) => (
                          <Link key={child.href} href={child.href}
                            className="block px-4 py-2 text-sm transition-colors hover:bg-brand-orange hover:text-white"
                            style={{ color: "var(--nav-text)" }}>
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              <AnimatePresence>
                {searchOpen && (
                  <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.18 }} className="overflow-hidden">
                    <input autoFocus type="text" value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search news, coins..."
                      className="w-full rounded-lg px-3 py-1.5 text-sm nav-input focus:outline-none focus:ring-1 focus:ring-brand-orange border" />
                  </motion.div>
                )}
              </AnimatePresence>

              <button onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg transition-colors hover:bg-brand-orange/10"
                style={{ color: "var(--nav-text)" }}>
                {searchOpen ? <X size={17} /> : <Search size={17} />}
              </button>

              <ThemeToggle />

              <Link href="/profile"
                className="hidden sm:flex p-2 rounded-lg transition-colors hover:bg-brand-orange/10"
                style={{ color: "var(--nav-text)" }}>
                <User size={17} />
              </Link>

              <Link href="/signup"
                className="bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-display font-bold px-4 py-1.5 rounded-lg transition-colors">
                Subscribe
              </Link>

              <button className="md:hidden p-2 rounded-lg" style={{ color: "var(--nav-text)" }}
                onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }}
              className="md:hidden overflow-hidden border-t" style={{ borderColor: "var(--nav-border)" }}>
              <div className="px-4 py-3 space-y-1" style={{ background: "var(--nav-dropdown-bg)" }}>
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm font-semibold" style={{ color: "#F9FAFB" }}>
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-3 space-y-1">
                        {link.children.map((child) => (
                          <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}
                            className="block py-1 text-xs hover:text-brand-orange transition-colors"
                            style={{ color: "var(--nav-text)" }}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-2 border-t" style={{ borderColor: "var(--nav-dropdown-border)" }}>
                  <Link href="/signup" onClick={() => setMobileOpen(false)}
                    className="block text-center bg-brand-orange text-white font-semibold py-2.5 rounded-lg text-sm">
                    Subscribe Free
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
