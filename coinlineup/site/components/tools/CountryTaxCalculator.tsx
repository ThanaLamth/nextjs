"use client";

import { useState } from "react";
import type { TaxCountryRule } from "@/lib/tax";
import { calculateTaxEstimate } from "@/lib/tax";

function fmtCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

function fmtNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 8,
  }).format(value);
}

interface Props {
  rule: TaxCountryRule;
}

interface RatePreset {
  value: string;
  label: string;
  shortRate: string;
  longRate?: string;
  help: string;
}

type UsStateTreatment = "federal-only" | "no-state-income-tax" | "california" | "washington" | "custom";
type UsFilingStatus = "single" | "mfj" | "mfs" | "hoh";

interface UsStatePreset {
  value: UsStateTreatment;
  label: string;
  stateRate: string;
  help: string;
}

interface UsIncomeBand {
  value: string;
  label: string;
  shortRate: string;
  longRate: string;
}

function getSampleScenario(rule: TaxCountryRule) {
  switch (rule.slug) {
    case "us":
      return {
        label: "Try a sample BTC sale",
        quantity: "0.5",
        buyPrice: "42000",
        sellPrice: "61000",
        buyFee: "35",
        sellFee: "40",
        buyDate: "2025-03-10",
        sellDate: "2026-05-18",
        estimateRate: "32",
        longTermRate: "15",
        manualExemption: "0",
      };
    case "uk":
      return {
        label: "Try a sample ETH sale",
        quantity: "2",
        buyPrice: "1450",
        sellPrice: "2250",
        buyFee: "18",
        sellFee: "20",
        buyDate: "2025-08-02",
        sellDate: "2026-05-30",
        estimateRate: "20",
        longTermRate: "",
        manualExemption: "500",
      };
    case "canada":
      return {
        label: "Try a sample SOL sale",
        quantity: "10",
        buyPrice: "115",
        sellPrice: "168",
        buyFee: "12",
        sellFee: "15",
        buyDate: "2025-11-12",
        sellDate: "2026-06-01",
        estimateRate: "30",
        longTermRate: "",
        manualExemption: "0",
      };
    case "australia":
      return {
        label: "Try a sample ADA sale",
        quantity: "4000",
        buyPrice: "0.62",
        sellPrice: "0.94",
        buyFee: "10",
        sellFee: "10",
        buyDate: "2024-12-01",
        sellDate: "2026-03-12",
        estimateRate: "30",
        longTermRate: "",
        manualExemption: "0",
      };
    default:
      return {
        label: "Try a sample sale",
        quantity: "1",
        buyPrice: "1000",
        sellPrice: "1500",
        buyFee: "0",
        sellFee: "0",
        buyDate: "2025-01-01",
        sellDate: "2026-01-01",
        estimateRate: "20",
        longTermRate: "",
        manualExemption: "0",
      };
  }
}

function getUsStatePresets(): UsStatePreset[] {
  return [
    {
      value: "federal-only",
      label: "Federal only",
      stateRate: "0",
      help: "Only federal tax is estimated. No additional state layer is included.",
    },
    {
      value: "no-state-income-tax",
      label: "No state income tax state",
      stateRate: "0",
      help: "Use this rough preset for states that generally do not apply a broad state income-tax layer to capital gains.",
    },
    {
      value: "california",
      label: "California resident-style estimate",
      stateRate: "9.3",
      help: "Simple California-style estimate. California generally taxes capital gains as ordinary income at the state level.",
    },
    {
      value: "washington",
      label: "Washington capital gains case",
      stateRate: "7",
      help: "Simple Washington-style estimate using the state capital gains tax rate as a rough layer. This is a narrow approximation, not full Washington eligibility logic.",
    },
    {
      value: "custom",
      label: "Other state or custom rate",
      stateRate: "0",
      help: "Enter your own state tax layer if you want to model a different state scenario.",
    },
  ];
}

function getUsFilingStatusOptions(): { value: UsFilingStatus; label: string }[] {
  return [
    { value: "single", label: "Single" },
    { value: "mfj", label: "Married filing jointly" },
    { value: "mfs", label: "Married filing separately" },
    { value: "hoh", label: "Head of household" },
  ];
}

function getUsIncomeBands(status: UsFilingStatus): UsIncomeBand[] {
  switch (status) {
    case "single":
      return [
        { value: "s-10", label: "Up to $11,925", shortRate: "10", longRate: "0" },
        { value: "s-12", label: "$11,926 to $48,350", shortRate: "12", longRate: "0" },
        { value: "s-12-15", label: "$48,351 to $48,475", shortRate: "12", longRate: "15" },
        { value: "s-22", label: "$48,476 to $103,350", shortRate: "22", longRate: "15" },
        { value: "s-24", label: "$103,351 to $197,300", shortRate: "24", longRate: "15" },
        { value: "s-32", label: "$197,301 to $250,525", shortRate: "32", longRate: "15" },
        { value: "s-35", label: "$250,526 to $533,400", shortRate: "35", longRate: "15" },
        { value: "s-35-20", label: "$533,401 to $626,350", shortRate: "35", longRate: "20" },
        { value: "s-37", label: "$626,351 and above", shortRate: "37", longRate: "20" },
      ];
    case "mfj":
      return [
        { value: "mfj-10", label: "Up to $23,850", shortRate: "10", longRate: "0" },
        { value: "mfj-12", label: "$23,851 to $96,700", shortRate: "12", longRate: "0" },
        { value: "mfj-12-15", label: "$96,701 to $96,950", shortRate: "12", longRate: "15" },
        { value: "mfj-22", label: "$96,951 to $206,700", shortRate: "22", longRate: "15" },
        { value: "mfj-24", label: "$206,701 to $394,600", shortRate: "24", longRate: "15" },
        { value: "mfj-32", label: "$394,601 to $501,050", shortRate: "32", longRate: "15" },
        { value: "mfj-35", label: "$501,051 to $600,050", shortRate: "35", longRate: "15" },
        { value: "mfj-35-20", label: "$600,051 to $751,600", shortRate: "35", longRate: "20" },
        { value: "mfj-37", label: "$751,601 and above", shortRate: "37", longRate: "20" },
      ];
    case "mfs":
      return [
        { value: "mfs-10", label: "Up to $11,925", shortRate: "10", longRate: "0" },
        { value: "mfs-12", label: "$11,926 to $48,350", shortRate: "12", longRate: "0" },
        { value: "mfs-12-15", label: "$48,351 to $48,475", shortRate: "12", longRate: "15" },
        { value: "mfs-22", label: "$48,476 to $103,350", shortRate: "22", longRate: "15" },
        { value: "mfs-24", label: "$103,351 to $197,300", shortRate: "24", longRate: "15" },
        { value: "mfs-32", label: "$197,301 to $250,525", shortRate: "32", longRate: "15" },
        { value: "mfs-35", label: "$250,526 to $300,000", shortRate: "35", longRate: "15" },
        { value: "mfs-35-20", label: "$300,001 to $375,800", shortRate: "35", longRate: "20" },
        { value: "mfs-37", label: "$375,801 and above", shortRate: "37", longRate: "20" },
      ];
    case "hoh":
      return [
        { value: "hoh-10", label: "Up to $17,000", shortRate: "10", longRate: "0" },
        { value: "hoh-12", label: "$17,001 to $64,750", shortRate: "12", longRate: "0" },
        { value: "hoh-12-15", label: "$64,751 to $64,850", shortRate: "12", longRate: "15" },
        { value: "hoh-22", label: "$64,851 to $103,350", shortRate: "22", longRate: "15" },
        { value: "hoh-24", label: "$103,351 to $197,300", shortRate: "24", longRate: "15" },
        { value: "hoh-32", label: "$197,301 to $250,500", shortRate: "32", longRate: "15" },
        { value: "hoh-35", label: "$250,501 to $566,700", shortRate: "35", longRate: "15" },
        { value: "hoh-37", label: "$566,701 to $626,350", shortRate: "35", longRate: "20" },
        { value: "hoh-37-top", label: "$626,351 and above", shortRate: "37", longRate: "20" },
      ];
    default:
      return [];
  }
}

function getRatePresets(rule: TaxCountryRule): RatePreset[] {
  switch (rule.slug) {
    case "us":
      return [];
    case "uk":
      return [
        {
          value: "uk-basic",
          label: "UK basic-rate style estimate",
          shortRate: "10",
          help: "Uses a 10% CGT-style estimate after any allowance or adjustment you apply manually.",
        },
        {
          value: "uk-higher",
          label: "UK higher/additional-rate style estimate",
          shortRate: "20",
          help: "Uses a 20% CGT-style estimate after any allowance or adjustment you apply manually.",
        },
      ];
    case "canada":
      return [
        {
          value: "ca-lower",
          label: "Canada lower combined rate",
          shortRate: "20",
          help: "Rough lower-band estimate for the marginal rate applied to the taxable capital gain portion.",
        },
        {
          value: "ca-standard",
          label: "Canada standard combined rate",
          shortRate: "30",
          help: "Rough standard estimate for many combined federal and provincial scenarios.",
        },
        {
          value: "ca-higher",
          label: "Canada higher combined rate",
          shortRate: "40",
          help: "Rough higher-band estimate for taxpayers with a higher combined marginal rate.",
        },
      ];
    case "australia":
      return [
        {
          value: "au-lower",
          label: "Australia lower resident estimate",
          shortRate: "16",
          help: "Simple lower-band resident estimate for taxable gains after any discount treatment.",
        },
        {
          value: "au-standard",
          label: "Australia standard resident estimate",
          shortRate: "30",
          help: "Simple standard resident estimate for taxable gains after any discount treatment.",
        },
        {
          value: "au-higher",
          label: "Australia higher resident estimate",
          shortRate: "37",
          help: "Simple higher-band resident estimate for taxable gains after any discount treatment.",
        },
        {
          value: "au-top",
          label: "Australia top resident estimate",
          shortRate: "45",
          help: "Simple top-band resident estimate for taxable gains after any discount treatment.",
        },
      ];
    default:
      return [];
  }
}

export default function CountryTaxCalculator({ rule }: Props) {
  const sample = getSampleScenario(rule);
  const ratePresets = getRatePresets(rule);
  const usStatePresets = getUsStatePresets();
  const usFilingStatusOptions = getUsFilingStatusOptions();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [rateMode, setRateMode] = useState<"preset" | "custom">("preset");
  const [selectedPreset, setSelectedPreset] = useState(ratePresets[1]?.value ?? ratePresets[0]?.value ?? "custom");
  const [usFilingStatus, setUsFilingStatus] = useState<UsFilingStatus>("single");
  const [usStateTreatment, setUsStateTreatment] = useState<UsStateTreatment>("federal-only");
  const [customStateRate, setCustomStateRate] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [buyFee, setBuyFee] = useState("0");
  const [sellFee, setSellFee] = useState("0");
  const [buyDate, setBuyDate] = useState("");
  const [sellDate, setSellDate] = useState("");
  const [estimateRate, setEstimateRate] = useState("");
  const [longTermRate, setLongTermRate] = useState("");
  const [manualExemption, setManualExemption] = useState("");

  const usIncomeBands = getUsIncomeBands(usFilingStatus);
  const [selectedUsIncomeBand, setSelectedUsIncomeBand] = useState(usIncomeBands[0]?.value ?? "");
  const activePreset = ratePresets.find((preset) => preset.value === selectedPreset) ?? null;
  const activeUsStatePreset = usStatePresets.find((preset) => preset.value === usStateTreatment) ?? usStatePresets[0];
  const activeUsIncomeBand = usIncomeBands.find((band) => band.value === selectedUsIncomeBand) ?? usIncomeBands[0];
  const effectiveEstimateRate = rule.slug === "us" && rateMode === "preset"
    ? (activeUsIncomeBand?.shortRate ?? "")
    : rateMode === "preset" && activePreset
      ? activePreset.shortRate
      : estimateRate;
  const effectiveLongTermRate = rule.slug === "us" && rateMode === "preset"
    ? (activeUsIncomeBand?.longRate ?? "")
    : rateMode === "preset" && activePreset
      ? (activePreset.longRate ?? "")
      : longTermRate;
  const effectiveStateRate = rule.slug === "us"
    ? (usStateTreatment === "custom" ? customStateRate : activeUsStatePreset.stateRate)
    : "0";

  const parsedQuantity = Number(quantity) || 0;
  const parsedBuyPrice = Number(buyPrice) || 0;
  const parsedSellPrice = Number(sellPrice) || 0;
  const parsedBuyFee = Number(buyFee) || 0;
  const parsedSellFee = Number(sellFee) || 0;
  const parsedEstimateRate = Number(effectiveEstimateRate) || 0;
  const parsedLongTermRate = Number(effectiveLongTermRate) || 0;
  const parsedStateRate = Number(effectiveStateRate) || 0;
  const parsedManualExemption = Number(manualExemption) || 0;

  const hasMinimumInputs =
    parsedQuantity > 0 &&
    parsedBuyPrice >= 0 &&
    parsedSellPrice >= 0 &&
    parsedEstimateRate >= 0;

  const result = hasMinimumInputs
    ? calculateTaxEstimate(rule, {
        quantity: parsedQuantity,
        buyPrice: parsedBuyPrice,
        sellPrice: parsedSellPrice,
        buyFee: parsedBuyFee,
        sellFee: parsedSellFee,
        buyDate,
        sellDate,
        estimateRate: parsedEstimateRate,
        longTermRate: parsedLongTermRate,
        manualExemption: parsedManualExemption,
        stateRate: parsedStateRate,
      })
    : null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
      <div
        className="rounded-2xl border p-5 md:p-6"
        style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
      >
        <div className="mb-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Beginner-friendly estimate
          </p>
          <h2 className="font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            {rule.name} crypto tax calculator
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            Start with the simple view below. You only need one buy, one sell, and an estimated rate to get a quick tax estimate.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setQuantity(sample.quantity);
                setBuyPrice(sample.buyPrice);
                setSellPrice(sample.sellPrice);
                setBuyFee(sample.buyFee);
                setSellFee(sample.sellFee);
                setBuyDate(sample.buyDate);
                setSellDate(sample.sellDate);
                setRateMode("custom");
                setEstimateRate(sample.estimateRate);
                setLongTermRate(sample.longTermRate);
                setManualExemption(sample.manualExemption);
                setUsFilingStatus("single");
                setSelectedUsIncomeBand(getUsIncomeBands("single")[0]?.value ?? "");
                setUsStateTreatment("federal-only");
                setCustomStateRate("");
              }}
              className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-brand-orange hover:text-brand-orange"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--surface)" }}
            >
              {sample.label}
            </button>
            <button
              type="button"
              onClick={() => {
                setQuantity("1");
                setBuyPrice("");
                setSellPrice("");
                setBuyFee("0");
                setSellFee("0");
                setBuyDate("");
                setSellDate("");
                setRateMode("preset");
                setSelectedPreset(ratePresets[1]?.value ?? ratePresets[0]?.value ?? "custom");
                setUsFilingStatus("single");
                setSelectedUsIncomeBand(getUsIncomeBands("single")[0]?.value ?? "");
                setEstimateRate("");
                setLongTermRate("");
                setManualExemption("");
                setUsStateTreatment("federal-only");
                setCustomStateRate("");
                setShowAdvanced(false);
              }}
              className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-brand-orange hover:text-brand-orange"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--surface)" }}
            >
              Reset form
            </button>
          </div>
        </div>

        <div
          className="mb-5 rounded-2xl border p-4"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Rate estimate mode
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "preset", label: "Use simple presets" },
              { value: "custom", label: "Enter my own rate" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRateMode(option.value as "preset" | "custom")}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
                style={rateMode === option.value
                  ? { background: "#F7931A", borderColor: "#F7931A", color: "#FFFFFF" }
                  : { background: "var(--card-bg)", borderColor: "var(--border)", color: "var(--text-secondary)" }}
              >
                {option.label}
              </button>
            ))}
          </div>

          {rule.slug === "us" && rateMode === "preset" ? (
            <div className="mt-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  Filing status
                </span>
                <select
                  value={usFilingStatus}
                  onChange={(event) => {
                    const nextStatus = event.target.value as UsFilingStatus;
                    const nextBands = getUsIncomeBands(nextStatus);
                    setUsFilingStatus(nextStatus);
                    setSelectedUsIncomeBand(nextBands[0]?.value ?? "");
                  }}
                  className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  style={{
                    background: "var(--card-bg)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                >
                  {usFilingStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 mt-4 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  Taxable income band
                </span>
                <select
                  value={selectedUsIncomeBand}
                  onChange={(event) => setSelectedUsIncomeBand(event.target.value)}
                  className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  style={{
                    background: "var(--card-bg)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                >
                  {usIncomeBands.map((band) => (
                    <option key={band.value} value={band.value}>
                      {band.label}
                    </option>
                  ))}
                </select>
                <span className="mt-1.5 block text-[11px]" style={{ color: "var(--text-muted)" }}>
                  Uses IRS 2025 filing-status brackets and long-term capital gains thresholds to set the simple federal estimate.
                </span>
              </label>
            </div>
          ) : null}

          {rule.slug !== "us" && rateMode === "preset" && ratePresets.length > 0 ? (
            <div className="mt-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  Choose a preset
                </span>
                <select
                  value={selectedPreset}
                  onChange={(event) => setSelectedPreset(event.target.value)}
                  className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  style={{
                    background: "var(--card-bg)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                >
                  {ratePresets.map((preset) => (
                    <option key={preset.value} value={preset.value}>
                      {preset.label}
                    </option>
                  ))}
                </select>
                {activePreset ? (
                  <span className="mt-1.5 block text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {activePreset.help}
                  </span>
                ) : null}
              </label>
            </div>
          ) : null}
        </div>

        {rule.slug === "us" ? (
          <div
            className="mb-5 rounded-2xl border p-4"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-orange">
              U.S. state situation
            </p>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                Choose the situation that fits you best
              </span>
              <select
                value={usStateTreatment}
                onChange={(event) => setUsStateTreatment(event.target.value as UsStateTreatment)}
                className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                style={{
                  background: "var(--card-bg)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                {usStatePresets.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.label}
                  </option>
                ))}
              </select>
              <span className="mt-1.5 block text-[11px]" style={{ color: "var(--text-muted)" }}>
                {activeUsStatePreset.help}
              </span>
            </label>

            {usStateTreatment === "custom" ? (
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  Enter your state rate (%)
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={customStateRate}
                  onChange={(event) => setCustomStateRate(event.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  style={{
                    background: "var(--card-bg)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                />
                <span className="mt-1.5 block text-[11px]" style={{ color: "var(--text-muted)" }}>
                  Use this if your state is not covered by the built-in options above.
                </span>
              </label>
            ) : null}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {
              label: "How many coins or tokens did you sell?",
              value: quantity,
              onChange: setQuantity,
              placeholder: "1.0",
              help: "Example: 0.5 BTC or 2 ETH",
            },
            {
              label: `Buy price per coin (${rule.currency})`,
              value: buyPrice,
              onChange: setBuyPrice,
              placeholder: "0.00",
              help: "The price you paid for each unit when you bought it.",
            },
            {
              label: `Sell price per coin (${rule.currency})`,
              value: sellPrice,
              onChange: setSellPrice,
              placeholder: "0.00",
              help: "The price you sold each unit for.",
            },
            {
              label: "Estimated tax rate (%)",
              value: estimateRate,
              onChange: setEstimateRate,
              placeholder: "0",
              help: "If you are unsure, switch back to the simple preset mode above.",
            },
          ].filter((field) => rateMode === "custom" || field.label !== "Estimated tax rate (%)").map((field) => (
            <label key={field.label} className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                {field.label}
              </span>
              <input
                type="number"
                min="0"
                step="any"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
              {field.help ? (
                <span className="mt-1.5 block text-[11px]" style={{ color: "var(--text-muted)" }}>
                  {field.help}
                </span>
              ) : null}
            </label>
          ))}

          {rule.longTermRateLabel && rateMode === "custom" && !showAdvanced ? (
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                {rule.longTermRateLabel}
              </span>
              <input
                type="number"
                min="0"
                step="any"
                value={longTermRate}
                onChange={(event) => setLongTermRate(event.target.value)}
                placeholder="0"
                className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
              {rule.longTermRateHelp ? (
                <span className="mt-1.5 block text-[11px]" style={{ color: "var(--text-muted)" }}>
                  {rule.longTermRateHelp}
                </span>
              ) : null}
            </label>
          ) : null}

          {rule.allowsManualExemption ? (
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                {rule.manualExemptionLabel}
              </span>
              <input
                type="number"
                min="0"
                step="any"
                value={manualExemption}
                onChange={(event) => setManualExemption(event.target.value)}
                placeholder="0"
                className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </label>
          ) : null}

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              When did you buy it?
            </span>
            <input
              type="date"
              value={buyDate}
              onChange={(event) => setBuyDate(event.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            />
            <span className="mt-1.5 block text-[11px]" style={{ color: "var(--text-muted)" }}>
              Used to estimate holding period treatment where relevant.
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              When did you sell it?
            </span>
            <input
              type="date"
              value={sellDate}
              onChange={(event) => setSellDate(event.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            />
            <span className="mt-1.5 block text-[11px]" style={{ color: "var(--text-muted)" }}>
              Leave blank if you only want a rough estimate without date-based treatment.
            </span>
          </label>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setShowAdvanced((current) => !current)}
            className="text-sm font-semibold text-brand-orange hover:underline"
          >
            {showAdvanced ? "Hide advanced options" : "Show advanced options"}
          </button>
          <p className="mt-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
            Advanced options are helpful if you want to include fees, manual adjustments, or a separate long-term rate.
          </p>
        </div>

        {showAdvanced ? (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                label: `Buy fees (${rule.currency})`,
                value: buyFee,
                onChange: setBuyFee,
                placeholder: "0.00",
                help: "Optional: exchange fees you paid when buying.",
              },
              {
                label: `Sell fees (${rule.currency})`,
                value: sellFee,
                onChange: setSellFee,
                placeholder: "0.00",
                help: "Optional: exchange fees you paid when selling.",
              },
            ].map((field) => (
              <label key={field.label} className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  {field.label}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                />
                <span className="mt-1.5 block text-[11px]" style={{ color: "var(--text-muted)" }}>
                  {field.help}
                </span>
              </label>
            ))}

            {rateMode === "custom" && rule.longTermRateLabel ? (
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  Separate long-term rate (%)
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={longTermRate}
                  onChange={(event) => setLongTermRate(event.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                />
                <span className="mt-1.5 block text-[11px]" style={{ color: "var(--text-muted)" }}>
                  Optional. Use this only if you want a different rate for long-term gains.
                </span>
              </label>
            ) : null}

            {rule.allowsManualExemption ? (
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  Manual adjustment or allowance
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={manualExemption}
                  onChange={(event) => setManualExemption(event.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                />
                <span className="mt-1.5 block text-[11px]" style={{ color: "var(--text-muted)" }}>
                  Optional. Use this if you want to subtract a manual allowance or adjustment from the gain before estimating tax.
                </span>
              </label>
            ) : null}
          </div>
        ) : null}

        <div
          className="mt-5 rounded-xl border px-4 py-3 text-sm"
          style={{ borderColor: "rgba(247,147,26,0.3)", background: "rgba(247,147,26,0.08)", color: "var(--text-secondary)" }}
        >
          Informational only. This tool is not tax, legal, or investment advice. Real filing outcomes can differ because of lot-matching rules, income treatment, exemptions, residence changes, and other facts not modeled here.
        </div>

        <div
          className="mt-4 rounded-xl border px-4 py-3"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Official sources used
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            Last reviewed on {rule.lastReviewed}. {rule.slug === "us"
              ? "The U.S. preset flow uses IRS filing-status brackets and long-term capital gains guidance as a simplified estimate."
              : "Country rule notes on this page are mapped to the official tax-agency sources below."}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {rule.officialSources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:underline"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-5">
        <div
          className="rounded-2xl border p-5 md:p-6"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Estimate Summary
          </p>
          {result ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Estimated tax
                </p>
                <p className="font-display text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {fmtCurrency(result.combinedEstimatedTax, rule.currency)}
                </p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                  {result.formulaLabel}
                </p>
                <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  This is a quick estimate for one sale, not a full tax return.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "What you paid", value: fmtCurrency(result.costBasis, rule.currency) },
                  { label: "Proceeds", value: fmtCurrency(result.proceeds, rule.currency) },
                  { label: "Gain or loss", value: fmtCurrency(result.rawGainOrLoss, rule.currency) },
                  { label: "Estimated taxable gain", value: fmtCurrency(result.taxableAmount, rule.currency) },
                  ...(rule.slug === "us"
                    ? [
                        { label: "Federal estimate", value: fmtCurrency(result.federalEstimatedTax, rule.currency) },
                        { label: "State estimate", value: fmtCurrency(result.stateEstimatedTax, rule.currency) },
                      ]
                    : []),
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border p-3"
                    style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                  >
                    <p className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      {item.label}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <p><strong>How the holding period was treated:</strong> {result.holdingLabel}</p>
                <p><strong>Units sold:</strong> {fmtNumber(result.quantity)}</p>
                <p><strong>Rate used in the estimate:</strong> {result.effectiveRateApplied !== null ? `${result.effectiveRateApplied}%` : "Not applied"}</p>
                {rule.slug === "us" && rateMode === "preset" && activeUsIncomeBand ? (
                  <>
                    <p><strong>Filing status:</strong> {usFilingStatusOptions.find((option) => option.value === usFilingStatus)?.label}</p>
                    <p><strong>Income band:</strong> {activeUsIncomeBand.label}</p>
                    <p><strong>Federal long-term rate:</strong> {activeUsIncomeBand.longRate}%</p>
                  </>
                ) : null}
                {rule.slug !== "us" && rateMode === "preset" && activePreset ? (
                  <p><strong>Preset:</strong> {activePreset.label}</p>
                ) : null}
                {rule.slug === "us" ? (
                  <p><strong>State scenario:</strong> {activeUsStatePreset.label}</p>
                ) : null}
                <p><strong>Days held:</strong> {result.heldDays ?? "Not enough date data"}</p>
                {showAdvanced || result.manualExemption > 0 ? (
                  <p><strong>Manual adjustment:</strong> {fmtCurrency(result.manualExemption, rule.currency)}</p>
                ) : null}
              </div>
            </div>
          ) : (
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Add a quantity, buy price, sell price, and estimated rate to generate an estimate.
            </p>
          )}
        </div>

        <div
          className="rounded-2xl border p-5 md:p-6"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Country rule snapshot
          </p>
          <div className="space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            <p><strong>Tax treatment:</strong> {rule.taxTreatment}</p>
            <p><strong>Holding rule:</strong> {rule.holdingRule}</p>
            <p><strong>Cost basis model:</strong> {rule.costBasisMethod}</p>
            {rule.slug === "us" ? (
              <p><strong>State layer:</strong> This v1 tool can add a simple state-treatment estimate on top of the federal estimate for selected U.S. scenarios.</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
