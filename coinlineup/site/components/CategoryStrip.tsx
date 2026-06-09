"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CATEGORIES = [
  { label: "All", href: "/news" },
  { label: "Bitcoin", href: "/news/bitcoin-news" },
  { label: "Ethereum", href: "/news/ethereum" },
  { label: "Altcoins", href: "/news/altcoins" },
  { label: "Regulation", href: "/news/regulation" },
  { label: "Banking", href: "/news/bank" },
  { label: "Exchanges", href: "/news/exchanges" },
  { label: "Blockchain Events", href: "/news/blockchain-events" },
];

export default function CategoryStrip() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const active = pathname === cat.href;
        return (
          <Link
            key={cat.href}
            href={cat.href}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
            style={active ? {
              background: "#F7931A",
              color: "#FFFFFF",
            } : {
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
