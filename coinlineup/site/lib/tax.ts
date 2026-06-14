export type SupportedTaxCountry = "us" | "uk" | "canada" | "australia";

export interface OfficialSource {
  label: string;
  url: string;
}

export interface TaxCountryRule {
  slug: SupportedTaxCountry;
  code: string;
  name: string;
  currency: string;
  pageTitle: string;
  summary: string;
  shortDescription: string;
  taxTreatment: string;
  holdingRule: string;
  costBasisMethod: string;
  estimateRateLabel: string;
  estimateRateHelp: string;
  longTermRateLabel?: string;
  longTermRateHelp?: string;
  longTermHoldingDays?: number;
  inclusionRate?: number;
  longTermDiscountRate?: number;
  allowsManualExemption?: boolean;
  manualExemptionLabel?: string;
  keyAssumptions: string[];
  recordsChecklist: string[];
  officialSources: OfficialSource[];
  lastReviewed: string;
}

export interface TaxEstimateInput {
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  buyFee: number;
  sellFee: number;
  buyDate?: string;
  sellDate?: string;
  estimateRate: number;
  longTermRate?: number;
  manualExemption?: number;
  stateRate?: number;
}

export interface TaxEstimateResult {
  quantity: number;
  costBasis: number;
  proceeds: number;
  rawGainOrLoss: number;
  manualExemption: number;
  adjustedGainOrLoss: number;
  taxableAmount: number;
  estimatedTax: number;
  federalEstimatedTax: number;
  stateEstimatedTax: number;
  combinedEstimatedTax: number;
  effectiveRateApplied: number | null;
  heldDays: number | null;
  holdingLabel: string;
  formulaLabel: string;
}

export const TAX_COUNTRY_RULES: Record<SupportedTaxCountry, TaxCountryRule> = {
  us: {
    slug: "us",
    code: "US",
    name: "United States",
    currency: "USD",
    pageTitle: "United States Crypto Tax Calculator",
    summary:
      "Estimate a simple crypto capital gain or loss for a single disposal in the United States. This v1 model distinguishes between short-term and long-term holding periods and supports an IRS-based preset flow for filing status and taxable income band.",
    shortDescription:
      "Simple U.S. crypto tax estimate using cost basis, proceeds, holding period, and either IRS-based preset bands or user-entered short-term and long-term rates.",
    taxTreatment: "The IRS treats digital assets as property. Investment gains or losses are generally capital in nature when you dispose of crypto held as a capital asset.",
    holdingRule: "A disposal held for one year or less is treated as short-term. A disposal held for more than one year is treated as long-term.",
    costBasisMethod: "This v1 tool uses the reader's single-lot cost basis from the entered buy price and fees. It does not attempt lot selection or broker-specific identification rules.",
    estimateRateLabel: "Estimated short-term rate (%)",
    estimateRateHelp: "Use the marginal rate you want to test for short-term gains.",
    longTermRateLabel: "Estimated long-term rate (%)",
    longTermRateHelp: "Use the capital gains rate you want to test for long-term gains.",
    longTermHoldingDays: 365,
    allowsManualExemption: true,
    manualExemptionLabel: "Manual adjustment or exclusion (optional)",
    keyAssumptions: [
      "Built for a single disposal rather than a full tax-year ledger.",
      "The preset flow is a simplified estimator built from IRS federal bracket pages and long-term capital gains guidance, not a full return calculation.",
      "Does not model wash sales, staking income, mining income, airdrops, or DeFi-specific treatment.",
      "Does not model specific lot identification or broker reporting differences.",
    ],
    recordsChecklist: [
      "Acquisition date and disposal date",
      "Number of units disposed",
      "Cost basis in U.S. dollars, including fees where applicable",
      "Fair market value or proceeds at disposal time",
    ],
    officialSources: [
      { label: "IRS: Digital assets", url: "https://www.irs.gov/businesses/small-businesses-self-employed/digital-assets" },
      { label: "IRS: Federal income tax rates and brackets", url: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets" },
      { label: "IRS Topic no. 409, Capital gains and losses", url: "https://www.irs.gov/taxtopics/tc409" },
      { label: "IRS Publication 544, Sales and Other Dispositions of Assets", url: "https://www.irs.gov/publications/p544" },
      { label: "IRS Publication 550, Investment Income and Expenses", url: "https://www.irs.gov/publications/p550" },
    ],
    lastReviewed: "June 12, 2026",
  },
  uk: {
    slug: "uk",
    code: "UK",
    name: "United Kingdom",
    currency: "GBP",
    pageTitle: "United Kingdom Crypto Tax Calculator",
    summary:
      "Estimate a simple crypto gain or loss for a UK disposal using user-entered rates and an optional manual allowance adjustment. The tool is intentionally conservative and does not attempt to automate HMRC's pooling rules.",
    shortDescription:
      "Simple UK crypto Capital Gains Tax estimate with user-entered rate and optional manual allowance adjustment.",
    taxTreatment: "HMRC generally treats gains on disposals of cryptoassets by individuals as subject to Capital Gains Tax unless income treatment applies first.",
    holdingRule: "This v1 estimator does not change the tax formula based on holding period for UK disposals.",
    costBasisMethod: "This v1 tool uses a simple single-lot cost basis. It does not model HMRC section 104 pooling, same-day rules, or bed-and-breakfast matching.",
    estimateRateLabel: "Estimated CGT rate (%)",
    estimateRateHelp: "Enter the rate you want to test for your disposal after considering your own tax position.",
    allowsManualExemption: true,
    manualExemptionLabel: "Manual annual allowance or adjustment (optional)",
    keyAssumptions: [
      "Designed for estimation, not for filing.",
      "Does not automate section 104 pooling or special matching rules.",
      "Does not cover income-tax treatment for receipts, employment rewards, or business activity.",
    ],
    recordsChecklist: [
      "Dates of acquisition and disposal",
      "Number of tokens disposed",
      "Sterling value of acquisition and disposal",
      "Fees and transaction costs",
    ],
    officialSources: [
      { label: "HMRC cryptoassets collection", url: "https://www.gov.uk/government/collections/cryptoassets" },
      { label: "HMRC: Check if you need to pay tax when you sell cryptoassets", url: "https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets" },
      { label: "HMRC Cryptoassets Manual", url: "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/" },
    ],
    lastReviewed: "June 12, 2026",
  },
  canada: {
    slug: "canada",
    code: "CA",
    name: "Canada",
    currency: "CAD",
    pageTitle: "Canada Crypto Tax Calculator",
    summary:
      "Estimate a simple Canadian crypto capital gain or loss using the current one-half inclusion approach and a user-entered marginal rate. This v1 model is built for a single disposal estimate rather than a full adjusted cost base ledger.",
    shortDescription:
      "Simple Canada crypto tax estimate using capital gain, one-half inclusion, and a user-entered marginal tax rate.",
    taxTreatment: "If the disposition is on capital account, CRA guidance generally treats one-half of the capital gain as taxable capital gain.",
    holdingRule: "This v1 estimator does not change the tax formula based on holding period for Canadian disposals.",
    costBasisMethod: "This v1 tool uses a single disposal cost basis rather than a complete adjusted cost base ledger across identical properties.",
    estimateRateLabel: "Estimated marginal tax rate (%)",
    estimateRateHelp: "Enter the personal marginal rate you want to test against the taxable capital gain portion.",
    inclusionRate: 0.5,
    allowsManualExemption: true,
    manualExemptionLabel: "Manual adjustment (optional)",
    keyAssumptions: [
      "Assumes the transaction is on capital account, not business income.",
      "Uses the currently enacted one-half inclusion approach reflected in CRA guidance as of June 12, 2026.",
      "Does not automate weighted-average ACB across multiple identical holdings.",
    ],
    recordsChecklist: [
      "Acquisition and disposal dates",
      "Number of units disposed",
      "Proceeds of disposition",
      "Adjusted cost base inputs and fees",
    ],
    officialSources: [
      { label: "CRA: Calculating and reporting your capital gains and losses", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12700-capital-gains/calculating-reporting-your-capital-gains-losses.html" },
      { label: "CRA: Reporting your capital gains as a crypto-asset user", url: "https://www.canada.ca/en/revenue-agency/news/newsroom/tax-tips/tax-tips-2024/reporting-your-capital-gains-as-crypto-asset-user.html" },
      { label: "CRA: Update on administration of proposed capital gains changes", url: "https://www.canada.ca/en/revenue-agency/news/newsroom/tax-tips/tax-tips-2025/update-cra-administration-proposed-capital-gains-taxation-changes.html" },
    ],
    lastReviewed: "June 12, 2026",
  },
  australia: {
    slug: "australia",
    code: "AU",
    name: "Australia",
    currency: "AUD",
    pageTitle: "Australia Crypto Tax Calculator",
    summary:
      "Estimate a simple Australian crypto capital gain or loss using a user-entered marginal rate and a basic 12-month discount assumption for eligible holdings. This v1 model focuses on a single disposal estimate.",
    shortDescription:
      "Simple Australia crypto tax estimate using capital gain, a user-entered marginal rate, and a basic 12-month CGT discount assumption.",
    taxTreatment: "ATO guidance treats crypto assets as CGT assets in many investment cases, with capital gains included in income tax calculations rather than taxed under a separate stand-alone tax.",
    holdingRule: "A simple 50% CGT discount assumption is applied in this v1 tool when the holding period exceeds 12 months.",
    costBasisMethod: "This v1 tool uses a single disposal cost basis and does not attempt to model the full set of CGT methods or exceptions.",
    estimateRateLabel: "Estimated marginal tax rate (%)",
    estimateRateHelp: "Enter the marginal income tax rate you want to test for your taxable gain.",
    longTermHoldingDays: 365,
    longTermDiscountRate: 0.5,
    allowsManualExemption: true,
    manualExemptionLabel: "Manual adjustment (optional)",
    keyAssumptions: [
      "Applies a simple 50% discount assumption for holdings beyond 12 months.",
      "Does not model personal-use asset exceptions or business-income treatment.",
      "Does not choose between all available CGT methods or elections.",
    ],
    recordsChecklist: [
      "Acquisition and disposal dates",
      "Quantity of units disposed",
      "Australian-dollar cost base and proceeds",
      "Fees and records supporting the transaction",
    ],
    officialSources: [
      { label: "ATO: What is capital gains tax?", url: "https://www.ato.gov.au/individuals-and-families/investments-and-assets/capital-gains-tax/what-is-capital-gains-tax" },
      { label: "ATO: Keeping crypto records", url: "https://www.ato.gov.au/individuals-and-families/investments-and-assets/crypto-asset-investments/keeping-crypto-records" },
      { label: "ATO: Guide to capital gains tax 2025", url: "https://www.ato.gov.au/api/public/content/e69fe46564f948f1a935476d86d6b5aa?v=47aa113a" },
    ],
    lastReviewed: "June 12, 2026",
  },
};

export const TAX_COUNTRY_ORDER: SupportedTaxCountry[] = ["us", "uk", "canada", "australia"];

export function getTaxCountries(): TaxCountryRule[] {
  return TAX_COUNTRY_ORDER.map((slug) => TAX_COUNTRY_RULES[slug]);
}

export function getTaxCountry(slug: string): TaxCountryRule | null {
  if (slug in TAX_COUNTRY_RULES) {
    return TAX_COUNTRY_RULES[slug as SupportedTaxCountry];
  }

  return null;
}

function getHeldDays(buyDate?: string, sellDate?: string): number | null {
  if (!buyDate || !sellDate) return null;

  const buy = new Date(buyDate);
  const sell = new Date(sellDate);
  const diff = sell.getTime() - buy.getTime();

  if (Number.isNaN(buy.getTime()) || Number.isNaN(sell.getTime()) || diff < 0) {
    return null;
  }

  return Math.floor(diff / 86_400_000);
}

export function calculateTaxEstimate(rule: TaxCountryRule, input: TaxEstimateInput): TaxEstimateResult {
  const costBasis = input.quantity * input.buyPrice + input.buyFee;
  const proceeds = input.quantity * input.sellPrice - input.sellFee;
  const rawGainOrLoss = proceeds - costBasis;
  const manualExemption = Math.max(0, input.manualExemption ?? 0);
  const adjustedGainOrLoss = rawGainOrLoss > 0 ? Math.max(0, rawGainOrLoss - manualExemption) : rawGainOrLoss;
  const heldDays = getHeldDays(input.buyDate, input.sellDate);

  let taxableAmount = Math.max(0, adjustedGainOrLoss);
  let effectiveRateApplied: number | null = null;
  let holdingLabel = "Holding period not applied";
  let formulaLabel = "Gain x estimated rate";
  const parsedStateRate = Math.max(0, input.stateRate ?? 0);

  if (rule.slug === "us") {
    const isLongTerm = heldDays !== null && rule.longTermHoldingDays !== undefined && heldDays > rule.longTermHoldingDays;
    effectiveRateApplied = isLongTerm ? (input.longTermRate ?? input.estimateRate) : input.estimateRate;
    holdingLabel = isLongTerm ? "Long-term estimate" : "Short-term estimate";
    formulaLabel = `Taxable gain x ${isLongTerm ? "long-term" : "short-term"} rate`;
  } else if (rule.slug === "canada") {
    taxableAmount = Math.max(0, adjustedGainOrLoss) * (rule.inclusionRate ?? 1);
    effectiveRateApplied = input.estimateRate;
    holdingLabel = "Capital-account estimate";
    formulaLabel = "Taxable capital gain x marginal rate";
  } else if (rule.slug === "australia") {
    const discountApplies = heldDays !== null && rule.longTermHoldingDays !== undefined && heldDays > rule.longTermHoldingDays;
    taxableAmount = Math.max(0, adjustedGainOrLoss) * (discountApplies ? (rule.longTermDiscountRate ?? 1) : 1);
    effectiveRateApplied = input.estimateRate;
    holdingLabel = discountApplies ? "12-month discount estimate" : "Standard CGT estimate";
    formulaLabel = discountApplies ? "Discounted gain x marginal rate" : "Gain x marginal rate";
  } else {
    effectiveRateApplied = input.estimateRate;
    holdingLabel = "Capital gains estimate";
    formulaLabel = "Adjusted gain x estimated CGT rate";
  }

  const federalEstimatedTax = taxableAmount > 0 && effectiveRateApplied !== null
    ? taxableAmount * (effectiveRateApplied / 100)
    : 0;
  const stateEstimatedTax = taxableAmount > 0 ? taxableAmount * (parsedStateRate / 100) : 0;
  const combinedEstimatedTax = federalEstimatedTax + stateEstimatedTax;
  const estimatedTax = combinedEstimatedTax;

  return {
    quantity: input.quantity,
    costBasis,
    proceeds,
    rawGainOrLoss,
    manualExemption,
    adjustedGainOrLoss,
    taxableAmount,
    estimatedTax,
    federalEstimatedTax,
    stateEstimatedTax,
    combinedEstimatedTax,
    effectiveRateApplied,
    heldDays,
    holdingLabel,
    formulaLabel,
  };
}
