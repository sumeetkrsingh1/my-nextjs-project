"use client";
import { useState } from "react";
export const runtime = 'edge';

export default function MortgagePrequalifyPage() {
  const [income, setIncome] = useState(6_000_000);
  const [credit, setCredit] = useState("Good (680-739)");
  const [down, setDown] = useState(3_000_000);
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="container-max py-8">
      <h1 className="text-3xl font-bold">Get Pre-Qualified</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <form
          className="card p-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const amount = Math.min(income * 4, down * 10);
            setResult(`Pre-qualified amount: ₦${Math.round(amount).toLocaleString()}`);
          }}
        >
          <Field label="Annual gross income">
            <input className="border rounded-md px-3 py-2 w-full" type="number" value={income} onChange={(e)=>setIncome(Number(e.target.value))} />
          </Field>
          <Field label="Credit score range">
            <select className="border rounded-md px-3 py-2 w-full" value={credit} onChange={(e)=>setCredit(e.target.value)}>
              {[
                "Excellent (740+)",
                "Good (680-739)",
                "Fair (620-679)",
                "Poor (<620)",
              ].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Down payment available">
            <input className="border rounded-md px-3 py-2 w-full" type="number" value={down} onChange={(e)=>setDown(Number(e.target.value))} />
          </Field>
          <button className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-md">Calculate</button>
        </form>
        <div className="card p-4">
          <div className="font-semibold mb-2">Result</div>
          <div className="text-slate-700">{result ?? "Complete the form to see your amount."}</div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm w-full">
      <div className="text-slate-600 mb-1">{label}</div>
      {children}
    </label>
  );
}


