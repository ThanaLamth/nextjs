import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import CountryTaxCalculator from "@/components/tools/CountryTaxCalculator";
import { getSiteUrl } from "@/lib/wordpress";
import { getTaxCountries, getTaxCountry } from "@/lib/tax";

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return getTaxCountries().map((country) => ({ country: country.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const rule = getTaxCountry(country);

  if (!rule) {
    return { title: "Not Found" };
  }

  return {
    title: `${rule.pageTitle} — CoinLineup`,
    description: rule.shortDescription,
    alternates: {
      canonical: `/tools/crypto-tax-calculator/${rule.slug}`,
    },
    openGraph: {
      type: "website",
      url: `${getSiteUrl()}/tools/crypto-tax-calculator/${rule.slug}`,
      title: `${rule.pageTitle} — CoinLineup`,
      description: rule.shortDescription,
    },
  };
}

export default async function CountryTaxCalculatorPage({ params }: Props) {
  const { country } = await params;
  const rule = getTaxCountry(country);

  if (!rule) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-4xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-orange">
          Tax Calculator v1
        </p>
        <h1 className="font-display text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
          {rule.pageTitle}
        </h1>
        <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
          {rule.summary}
        </p>
      </div>

      <CountryTaxCalculator rule={rule} />

      <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div
          className="rounded-2xl border p-5 md:p-6"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-orange">
            How to use this calculator
          </p>
          <ol className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <li>1. Enter how many coins you sold and your buy and sell price per coin.</li>
            <li>2. Choose the simple preset mode if you want a fast estimate, or switch to custom if you already know your own rate.</li>
            <li>3. Add buy and sell dates if you want the tool to estimate short-term versus long-term treatment.</li>
            <li>4. Open advanced options only if you need fees, manual adjustments, or a separate long-term rate.</li>
            <li>5. Review the estimate summary, then compare it against the official sources before relying on it.</li>
          </ol>
          <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
            Best for a quick single-sale estimate, not a full-year tax return.
          </p>
        </div>

        <div
          className="rounded-2xl border p-5 md:p-6"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Key assumptions in this v1
          </p>
          <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            {rule.keyAssumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Link
            href={`/tools/crypto-tax-calculator/${rule.slug}/methodology`}
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange"
          >
            <FileText size={14} /> Read methodology <ArrowRight size={14} />
          </Link>
        </div>

        <div
          className="rounded-2xl border p-5 md:p-6"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Official sources and recordkeeping
          </p>
          <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
            Last reviewed on {rule.lastReviewed}. Readers should verify current thresholds, rates, elections, and country-specific exceptions before relying on an estimate.
          </p>
          <ul className="mb-5 space-y-2 text-sm">
            {rule.officialSources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-orange hover:underline"
                >
                  {source.label} <ExternalLink size={13} />
                </a>
              </li>
            ))}
          </ul>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
            Keep records for
          </p>
          <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            {rule.recordsChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
