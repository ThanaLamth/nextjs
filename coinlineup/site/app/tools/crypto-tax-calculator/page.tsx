import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, FileText } from "lucide-react";
import { getTaxCountries } from "@/lib/tax";

function getCountryFlag(slug: string): string {
  switch (slug) {
    case "us":
      return "🇺🇸";
    case "uk":
      return "🇬🇧";
    case "canada":
      return "🇨🇦";
    case "australia":
      return "🇦🇺";
    default:
      return "🌍";
  }
}

export const metadata: Metadata = {
  title: "Crypto Tax Calculator by Country — CoinLineup",
  description:
    "Estimate simple crypto gains and losses by country with methodology notes, source references, and reader-facing disclaimers.",
  alternates: {
    canonical: "/tools/crypto-tax-calculator",
  },
};

export default function CryptoTaxCalculatorLandingPage() {
  const countries = getTaxCountries();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-4xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-orange">
          Country-by-country v1
        </p>
        <h1 className="font-display text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
          Crypto tax calculator by country
        </h1>
        <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
          This v1 release focuses on single-disposal estimates for readers who want a faster way to model cost basis, proceeds, and taxable gain scenarios without pretending to replace a full ledger or professional filing workflow.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {countries.map((country) => (
          <div
            key={country.slug}
            className="rounded-2xl border p-5"
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-orange/10 text-xl">
                <span aria-hidden="true">{getCountryFlag(country.slug)}</span>
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border text-brand-orange"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <Calculator size={18} />
              </span>
              <div>
                <p className="font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {country.name}
                </p>
                <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  {country.code}
                </p>
              </div>
            </div>

            <p className="min-h-[96px] text-sm" style={{ color: "var(--text-secondary)" }}>
              {country.shortDescription}
            </p>

            <div className="mt-5 flex flex-col gap-2">
              <Link href={`/tools/crypto-tax-calculator/${country.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
                Open calculator <ArrowRight size={14} />
              </Link>
              <Link href={`/tools/crypto-tax-calculator/${country.slug}/methodology`} className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                <FileText size={12} /> Methodology
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl border p-6"
        style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-orange">
          Important scope note
        </p>
        <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          <li>This tool is designed for simple estimate scenarios, not for full-year filing.</li>
          <li>It does not model every crypto tax edge case such as DeFi flows, airdrops, staking receipts, or lot-matching complexity.</li>
          <li>Every country page links to official sources and a methodology page so readers can understand what is and is not included.</li>
        </ul>
      </div>
    </div>
  );
}
