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

export default function CountryTaxCalculator({ rule }: Props) {
  const sample = getSampleScenario(rule);
  const [showAdvanced, setShowAdvanced] = useState(false);
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

  const parsedQuantity = Number(quantity) || 0;
  const parsedBuyPrice = Number(buyPrice) || 0;
  const parsedSellPrice = Number(sellPrice) || 0;
  const parsedBuyFee = Number(buyFee) || 0;
  const parsedSellFee = Number(sellFee) || 0;
  const parsedEstimateRate = Number(estimateRate) || 0;
  const parsedLongTermRate = Number(longTermRate) || 0;
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
                setEstimateRate(sample.estimateRate);
                setLongTermRate(sample.longTermRate);
                setManualExemption(sample.manualExemption);
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
                setEstimateRate("");
                setLongTermRate("");
                setManualExemption("");
                setShowAdvanced(false);
              }}
              className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-brand-orange hover:text-brand-orange"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--surface)" }}
            >
              Reset form
            </button>
          </div>
        </div>

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
              help: "If you are unsure, enter a rough rate you want to test, such as 15, 20, or 30.",
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
              {field.help ? (
                <span className="mt-1.5 block text-[11px]" style={{ color: "var(--text-muted)" }}>
                  {field.help}
                </span>
              ) : null}
            </label>
          ))}

          {rule.longTermRateLabel ? (
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

            {rule.longTermRateLabel ? (
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
                  {fmtCurrency(result.estimatedTax, rule.currency)}
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
          </div>
        </div>
      </div>
    </div>
  );
}
