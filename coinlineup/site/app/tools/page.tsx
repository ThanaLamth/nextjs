import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Tools — CoinLineup",
  description: "Editorial tools and calculators from CoinLineup.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-orange">
          Tools
        </p>
        <h1 className="font-display text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
          CoinLineup tools for practical crypto research
        </h1>
        <p className="mt-3 max-w-3xl text-sm" style={{ color: "var(--text-secondary)" }}>
          Utility pages designed to support real reader tasks, starting with country-aware tax estimation and methodology pages that explain how each estimate works.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Link
          href="/tools/crypto-tax-calculator"
          className="rounded-2xl border p-6 transition-colors hover:border-brand-orange"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
              <Calculator size={20} />
            </span>
            <div>
              <p className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                Crypto Tax Calculator
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Country-by-country estimate
              </p>
            </div>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Start with a narrow v1 estimator for the United States, the United Kingdom, Canada, and Australia.
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
            Open tool <ArrowRight size={14} />
          </span>
        </Link>

        <div
          className="rounded-2xl border p-6"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
              <Globe2 size={20} />
            </span>
            <div>
              <p className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                Country methodology stack
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Source-first support pages
              </p>
            </div>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Each supported country includes a methodology page, official source references, and visible assumptions so the estimate is easier to evaluate and improve over time.
          </p>
        </div>
      </div>
    </div>
  );
}
