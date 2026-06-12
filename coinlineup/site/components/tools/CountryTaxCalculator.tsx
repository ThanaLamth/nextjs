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

export default function CountryTaxCalculator({ rule }: Props) {
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
            Simple Estimate
          </p>
          <h2 className="font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            {rule.name} crypto tax calculator
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            Enter one disposal at a time. This v1 calculator is designed for estimate scenarios, not for filing a full return.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {
              label: "Quantity disposed",
              value: quantity,
              onChange: setQuantity,
              placeholder: "1.0",
            },
            {
              label: `Buy price per unit (${rule.currency})`,
              value: buyPrice,
              onChange: setBuyPrice,
              placeholder: "0.00",
            },
            {
              label: `Sell price per unit (${rule.currency})`,
              value: sellPrice,
              onChange: setSellPrice,
              placeholder: "0.00",
            },
            {
              label: `Buy fees (${rule.currency})`,
              value: buyFee,
              onChange: setBuyFee,
              placeholder: "0.00",
            },
            {
              label: `Sell fees (${rule.currency})`,
              value: sellFee,
              onChange: setSellFee,
              placeholder: "0.00",
            },
            {
              label: rule.estimateRateLabel,
              value: estimateRate,
              onChange: setEstimateRate,
              placeholder: "0",
              help: rule.estimateRateHelp,
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
              Acquisition date
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
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              Disposal date
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
          </label>
        </div>

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
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Cost basis", value: fmtCurrency(result.costBasis, rule.currency) },
                  { label: "Proceeds", value: fmtCurrency(result.proceeds, rule.currency) },
                  { label: "Raw gain/loss", value: fmtCurrency(result.rawGainOrLoss, rule.currency) },
                  { label: "Taxable amount", value: fmtCurrency(result.taxableAmount, rule.currency) },
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
                <p><strong>Holding treatment:</strong> {result.holdingLabel}</p>
                <p><strong>Units disposed:</strong> {fmtNumber(result.quantity)}</p>
                <p><strong>Manual adjustment:</strong> {fmtCurrency(result.manualExemption, rule.currency)}</p>
                <p><strong>Rate applied:</strong> {result.effectiveRateApplied !== null ? `${result.effectiveRateApplied}%` : "Not applied"}</p>
                <p><strong>Held days:</strong> {result.heldDays ?? "Not enough date data"}</p>
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
