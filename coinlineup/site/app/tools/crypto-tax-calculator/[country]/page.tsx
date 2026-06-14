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

function getUsageGuide(rule: NonNullable<ReturnType<typeof getTaxCountry>>) {
  switch (rule.slug) {
    case "us":
      return {
        steps: [
          "1. Enter how many coins you sold and your buy and sell price per coin.",
          "2. Stay in simple preset mode if you want a fast IRS-style estimate based on filing status and taxable income band.",
          "3. Switch to custom mode only if you already know the short-term and long-term rate you want to test.",
          "4. Add buy and sell dates so the calculator can decide whether to apply short-term or long-term treatment.",
          "5. Choose the closest state scenario, then review the estimate summary against the official IRS and state sources.",
        ],
        footer: "Best for a quick single-sale U.S. estimate, not a full federal or state return.",
      };
    case "uk":
      return {
        steps: [
          "1. Enter how many coins you sold and your buy and sell price per coin.",
          "2. Use a simple preset if you want a rough CGT-style estimate, or switch to custom if you know your own rate.",
          "3. Add any manual annual allowance or adjustment only if you want to reduce the taxable gain estimate.",
          "4. Open advanced options if you need to include buy or sell fees in the disposal.",
          "5. Review the result against HMRC guidance, especially if section 104 pooling or matching rules may apply.",
        ],
        footer: "Best for a quick single-disposal estimate, not a full HMRC capital gains calculation.",
      };
    case "canada":
      return {
        steps: [
          "1. Enter the quantity sold and your buy and sell price per coin.",
          "2. Use a marginal rate that reflects the tax rate you want to test on the taxable capital gain portion.",
          "3. Add fees and any manual adjustment if you want the estimate to reflect your own records more closely.",
          "4. Keep in mind this v1 tool applies the one-half inclusion approach, not a full adjusted cost base ledger.",
          "5. Compare the result with CRA guidance before relying on it for reporting.",
        ],
        footer: "Best for a quick capital-account estimate, not a full CRA filing workflow.",
      };
    case "australia":
      return {
        steps: [
          "1. Enter the quantity sold and your buy and sell price per coin.",
          "2. Choose a simple marginal-rate preset or switch to custom if you already know the rate you want to test.",
          "3. Add buy and sell dates so the tool can apply its simple 12-month discount assumption where relevant.",
          "4. Open advanced options if you need to include fees or a manual adjustment.",
          "5. Review the estimate against ATO guidance, especially if personal-use, business-income, or method-selection issues may apply.",
        ],
        footer: "Best for a quick single-sale estimate, not a full Australian CGT calculation.",
      };
    default:
      return {
        steps: [
          "1. Enter the sale details.",
          "2. Choose a simple preset or your own rate.",
          "3. Add dates and fees if needed.",
          "4. Review the estimate summary.",
          "5. Compare the result with official guidance before relying on it.",
        ],
        footer: "Best for a quick estimate, not a full tax return.",
      };
  }
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

  const countryFlag = getCountryFlag(rule.slug);
  const usageGuide = getUsageGuide(rule);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-4xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold"
          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text-secondary)" }}
        >
          <span aria-hidden="true">{countryFlag}</span>
          <span>{rule.code}</span>
          <span className="text-brand-orange">Tax Calculator v1</span>
        </div>
        <h1 className="font-display text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
          <span aria-hidden="true" className="mr-3">{countryFlag}</span>
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
            {usageGuide.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
            {usageGuide.footer}
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
