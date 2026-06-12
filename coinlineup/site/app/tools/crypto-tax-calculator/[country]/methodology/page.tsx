import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
    title: `${rule.name} Crypto Tax Methodology — CoinLineup`,
    description: `Methodology and scope notes for CoinLineup's ${rule.name} crypto tax calculator v1.`,
    alternates: {
      canonical: `/tools/crypto-tax-calculator/${rule.slug}/methodology`,
    },
    openGraph: {
      type: "article",
      url: `${getSiteUrl()}/tools/crypto-tax-calculator/${rule.slug}/methodology`,
      title: `${rule.name} Crypto Tax Methodology — CoinLineup`,
      description: `Methodology and scope notes for CoinLineup's ${rule.name} crypto tax calculator v1.`,
    },
  };
}

export default async function CountryTaxMethodologyPage({ params }: Props) {
  const { country } = await params;
  const rule = getTaxCountry(country);

  if (!rule) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href={`/tools/crypto-tax-calculator/${rule.slug}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange"
      >
        <ArrowLeft size={14} /> Back to calculator
      </Link>

      <div className="article-body">
        <h1>{rule.name} crypto tax calculator methodology</h1>
        <p>
          This page explains the scope, formula, and deliberate simplifications behind CoinLineup&apos;s v1
          {` ${rule.name} `}crypto tax calculator. It is designed to help readers evaluate the estimate, not to replace filing software or professional advice.
        </p>

        <h2>What the v1 calculator does</h2>
        <p>
          The calculator estimates a single disposal outcome using the quantity sold, buy price, sell price, fees, user-entered rate assumptions, and a narrow set of country-specific rules.
        </p>

        <h2>Core formula</h2>
        <ul>
          <li>Cost basis = quantity × buy price + buy-side fees</li>
          <li>Proceeds = quantity × sell price - sell-side fees</li>
          <li>Raw gain or loss = proceeds - cost basis</li>
          <li>Optional manual adjustment = reader-entered allowance or exclusion</li>
          <li>Estimated tax = taxable amount × applicable estimated rate</li>
        </ul>

        <h2>Country-specific rule used in this version</h2>
        <p>{rule.taxTreatment}</p>
        <p>{rule.holdingRule}</p>
        <p>{rule.costBasisMethod}</p>

        <h2>Important simplifications</h2>
        <ul>
          {rule.keyAssumptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>Why the calculator asks for your own rate assumptions</h2>
        <p>
          Tax outcomes can vary based on income level, filing status, province or state, prior gains and losses,
          available reliefs, and whether a transaction is treated as capital or income. For that reason, the tool
          uses reader-entered rates rather than hardcoding personal tax brackets.
        </p>

        <h2>When the estimate is likely too simple</h2>
        <ul>
          <li>Multi-lot disposals where basis tracking changes across time</li>
          <li>DeFi transactions, staking receipts, airdrops, forks, or business-income treatment</li>
          <li>Cases with matching rules, pooled basis rules, wash-sale style issues, or jurisdiction-specific elections</li>
          <li>Cross-border residence changes or transactions denominated across several currencies</li>
        </ul>

        <h2>Source policy for this page</h2>
        <p>
          CoinLineup links to official tax-agency guidance where possible. Readers should confirm that the official
          page, rate, allowance, or manual still applies to their facts and to the relevant tax year.
        </p>
      </div>
    </div>
  );
}
