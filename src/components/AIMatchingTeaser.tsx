"use client";
import { useMemo, useState } from "react";
import { demoProperties, Property, formatCurrency } from "@/lib/mockData";
import Link from "next/link";

type Kind = "all" | Property["type"];

export function AIMatchingTeaser() {
  const [kind, setKind] = useState<Kind>("all");
  const [maxBudget, setMaxBudget] = useState<number>(30_000_000);
  const [minBeds, setMinBeds] = useState<number>(2);

  const matches = useMemo(() => {
    const effectivePrice = (p: Property) => (p.type === "rent" ? (p.monthlyRent || 0) : p.price);
    const target = maxBudget;

    let items = demoProperties.filter((p) => {
      const matchesKind = kind === "all" || p.type === kind;
      const price = effectivePrice(p);
      const matchesBudget = price <= target;
      const matchesBeds = p.beds >= minBeds;
      return matchesKind && matchesBudget && matchesBeds;
    });

    // Rank by closeness to budget and more beds
    items = items
      .map((p) => ({
        p,
        score:
          1000 - Math.abs(effectivePrice(p) - target) / 100_000 + // closer to budget better
          p.beds * 2 +
          (p.type === "rto" ? 10 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .map((x) => x.p);

    return items.slice(0, 3);
  }, [kind, maxBudget, minBeds]);

  const query = new URLSearchParams({
    kind: kind === "all" ? "" : kind,
    max: String(maxBudget),
    beds: String(minBeds),
  }).toString();

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {(["all", "sale", "rent", "rto"] as Kind[]).map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`text-xs px-2 py-1 rounded-md border transition ${
              kind === k ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-slate-300 hover:border-emerald-300"
            }`}
          >
            {k === "all" ? "Any" : k.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs text-slate-600">
          Max {kind === "rent" ? "Rent (₦/mo)" : "Price (₦)"}
          <input
            type="number"
            className="input-field mt-1"
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
          />
        </label>
        <label className="text-xs text-slate-600">
          Min Beds
          <select className="input-field mt-1" value={minBeds} onChange={(e) => setMinBeds(Number(e.target.value))}>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-2 space-y-2">
        {matches.map((p) => (
          <Link key={p.id} href={`/property/${p.id}`} className="flex items-center justify-between rounded-lg border bg-white p-3 hover:shadow-sm transition">
            <div>
              <div className="text-sm font-semibold text-slate-900">{p.title}</div>
              <div className="text-xs text-slate-600">{p.location} • {p.beds}bd / {p.baths}ba</div>
            </div>
            <div className="text-sm font-bold text-emerald-700">
              {p.type === "rent" ? `${formatCurrency(p.monthlyRent || 0)}/mo` : formatCurrency(p.price)}
            </div>
          </Link>
        ))}
        {matches.length === 0 && (
          <div className="text-xs text-slate-600">No quick matches. Try adjusting filters.</div>
        )}
      </div>

      <Link
        href={`/explore?${query}`}
        className="btn btn-secondary btn-sm w-full text-center"
      >
        See All Matches
      </Link>
    </div>
  );
}


