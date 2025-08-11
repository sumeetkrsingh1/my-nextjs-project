"use client";
import { Suspense, useMemo, useState } from "react";
import { demoProperties, formatCurrency } from "@/lib/mockData";
import { useSearchParams } from "next/navigation";
export const runtime = 'edge';

export default function RTOCalculatorPage() {
  return (
    <Suspense fallback={<div className="container-max py-8">Loading…</div>}>
      <CalculatorInner />
    </Suspense>
  );
}

function CalculatorInner() {
  const params = useSearchParams();
  const propertyId = params.get("propertyId");
  const selected =
    demoProperties.find((p) => p.id === propertyId) ||
    demoProperties.find((p) => p.type === "rto");

  const [value, setValue] = useState(selected?.rto?.purchasePrice || 25_000_000);
  const [downPct, setDownPct] = useState(10);
  const [term, setTerm] = useState(5);
  const [monthlyRent, setMonthlyRent] = useState(selected?.rto?.monthly || 180_000);

  const result = useMemo(() => {
    const downPayment = (downPct / 100) * value;
    const equityPerYear = (selected?.rto?.equityRate || 0.15) * value;
    const totalEquity = equityPerYear * term;
    const totalRent = monthlyRent * 12 * term;
    const totalCost = totalRent + downPayment; // simplified demo
    return {
      downPayment,
      equityPerYear,
      totalEquity,
      totalRent,
      totalCost,
    };
  }, [value, downPct, term, monthlyRent, selected?.rto?.equityRate]);

  return (
    <div className="container-max py-8">
      {/* Header + microcopy */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-bold">Rent-to-Own Calculator</h1>
        <div className="text-xs text-slate-600 max-w-md">
          Move the sliders and fields to see how your down payment and lease term impact equity and total costs.
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6 animate-fade-in-up">
            <div className="text-xs font-semibold text-slate-500 mb-3">INPUTS</div>
            <NumberField label="Property Value" value={value} setValue={setValue} step={100000} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Labeled>
                <div className="flex items-center gap-2 text-sm text-slate-700 mb-1">
                  Down Payment (%)
                  <span className="text-slate-400" title="Typical RTO down is 5–15% of the property price.">ℹ️</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={15}
                  value={downPct}
                  onChange={(e) => setDownPct(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="text-xs text-slate-500">{downPct}%</div>
              </Labeled>
              <Labeled>
                <div className="flex items-center gap-2 text-sm text-slate-700 mb-1">
                  Lease Term (years)
                  <span className="text-slate-400" title="The length of the RTO lease before purchase.">ℹ️</span>
                </div>
                <select
                  className="input-field w-full"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                >
                  {[3, 5, 7, 10].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </Labeled>
            </div>
            <NumberField label="Monthly Rent Budget" value={monthlyRent} setValue={setMonthlyRent} step={1000} />
          </div>

          {/* How RTO Works */}
          <div className="card p-6 animate-fade-in-up">
            <h2 className="font-bold text-slate-900 mb-2">How Rent‑to‑Own Works</h2>
            <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
              <li>You pay an initial down payment to secure the home.</li>
              <li>Your monthly rent continues as normal.</li>
              <li>Each year, a fixed percentage builds as equity toward your purchase.</li>
              <li>At the end of the term, you can buy the home using your accumulated equity.</li>
            </ul>
          </div>
        </div>

        {/* Results & CTA */}
        <div className="space-y-6">
          <div className="card p-6 animate-fade-in-up sticky top-[88px]">
            <div className="font-semibold mb-2">Results</div>
            <Row label="Down Payment" value={formatCurrency(Math.round(result.downPayment))} />
            <Row label="Equity per year" value={formatCurrency(Math.round(result.equityPerYear))} />
            <Row label="Total Equity (term)" value={formatCurrency(Math.round(result.totalEquity))} />
            <Row label="Total Rent (term)" value={formatCurrency(Math.round(result.totalRent))} />
            <div className="h-px bg-slate-200 my-2" />
            <Row label="Total Cost (est.)" value={formatCurrency(Math.round(result.totalCost))} bold />
            <div className="mt-3 flex gap-2">
              <a href="/finance/rto/apply" className="btn btn-primary btn-md w-full text-center">Apply for This Property</a>
              <a href="/finance/rto/properties" className="btn btn-secondary btn-md w-full text-center">See RTO Homes</a>
            </div>
          </div>

          <div className="card p-6 animate-fade-in-up">
            <h3 className="font-bold text-slate-900 mb-2">Tips</h3>
            <div className="text-sm text-slate-700 space-y-1">
              <div title="Higher down payment reduces your future buyout.">A higher down payment lowers your long‑term cost.</div>
              <div title="Longer term lets you build more equity but pay more rent.">Longer lease term builds more equity but increases total rent.</div>
              <div title="Equity rate varies by property and partner.">Equity rate depends on property and partner terms.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberField({ label, value, setValue, step }: { label: string; value: number; setValue: (n:number)=>void; step?: number }) {
  return (
    <Labeled>
      <div className="text-slate-600 text-sm mb-1">{label}</div>
      <input type="number" className="border rounded-md px-3 py-2 w-full" value={value} step={step ?? 1} onChange={(e)=>setValue(Number(e.target.value))} />
    </Labeled>
  );
}

function Labeled({ children }: { children: React.ReactNode }) {
  return <label className="block w-full">{children}</label>;
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className={bold ? "font-semibold" : ""}>{label}</div>
      <div className={bold ? "font-semibold" : ""}>{value}</div>
    </div>
  );
}


