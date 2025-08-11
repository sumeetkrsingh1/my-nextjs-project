"use client";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { demoProperties, Property, formatCurrency } from "@/lib/mockData";
import { PropertyCard } from "@/components/PropertyCard";
export const runtime = 'edge';

type ViewMode = "grid" | "list";
type SortKey = "relevance" | "price-asc" | "price-desc" | "beds";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | Property["type"]>("all");
  const [kind, setKind] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(50_000_000);
  const [beds, setBeds] = useState<number>(0);
  const [minWalk, setMinWalk] = useState<number>(0);
  const [rtoOnly, setRtoOnly] = useState<boolean>(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [view, setView] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortKey>("relevance");

  const uniqueKinds = useMemo(() =>
    Array.from(new Set(demoProperties.map((p) => p.propertyType))).filter(Boolean) as string[]
  , []);

  const featureOptions = [
    "Security",
    "Generator",
    "Pool",
    "Gym",
    "Elevator",
    "Parking",
    "Garden",
    "Water Treatment",
  ];

  const filtered = useMemo(() => {
    const effectivePrice = (p: Property) => (p.type === "rent" ? p.monthlyRent || 0 : p.price);
    let items = demoProperties.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || `${p.title} ${p.location}`.toLowerCase().includes(q);
      const matchesType = type === "all" || p.type === type;
      const matchesKind = kind === "all" || p.propertyType === kind;
      const price = effectivePrice(p);
      const matchesPrice = price >= minPrice && price <= maxPrice;
      const matchesBeds = beds === 0 || p.beds >= beds;
      const matchesWalk = minWalk === 0 || (p.neighborhood?.walkScore ?? 0) >= minWalk;
      const selected = features.map((f) => f.toLowerCase());
      const propFeatures = (p.features || []).map((f) => f.toLowerCase());
      const matchesFeatures = selected.every((f) => propFeatures.includes(f));
      const matchesRto = !rtoOnly || p.type === "rto";
      return (
        matchesQuery &&
        matchesType &&
        matchesKind &&
        matchesPrice &&
        matchesBeds &&
        matchesWalk &&
        matchesFeatures &&
        matchesRto
      );
    });
    if (sort === "price-asc") items = items.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    if (sort === "price-desc") items = items.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    if (sort === "beds") items = items.sort((a, b) => b.beds - a.beds);
    return items;
  }, [query, type, minPrice, maxPrice, beds, sort]);

  const metrics = useMemo(() => {
    const effectivePrice = (p: Property) => (p.type === "rent" ? p.monthlyRent || 0 : p.price);
    const count = filtered.length;
    const avg = count ? Math.round(filtered.reduce((s, p) => s + effectivePrice(p), 0) / count) : 0;
    const rtoCount = filtered.filter((p) => p.type === "rto").length;
    return { count, avg, rtoCount };
  }, [filtered]);

  function toggleFeature(f: string) {
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  }

  function clearAll() {
    setQuery("");
    setType("all");
    setKind("all");
    setMinPrice(0);
    setMaxPrice(50_000_000);
    setBeds(0);
    setMinWalk(0);
    setRtoOnly(false);
    setFeatures([]);
    setSort("relevance");
  }

  return (
    <div className="container-max py-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Explore Properties</h1>
          <div className="text-slate-800 text-sm flex gap-4 mt-1">
            <span>Showing <strong className="text-slate-900">{metrics.count}</strong> of {demoProperties.length}</span>
            <span>Avg Price: <strong className="text-slate-900">{metrics.avg ? formatCurrency(metrics.avg) : "—"}</strong></span>
            <span>RTO Available: <strong className="text-slate-900">{metrics.rtoCount}</strong></span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            className="border rounded-md px-3 py-2 flex-1 md:w-96"
            placeholder="Search properties, locations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="border rounded-md px-3 py-2" value={sort} onChange={(e)=>setSort(e.target.value as SortKey)}>
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="beds">Bedrooms</option>
          </select>
          <div className="hidden md:flex items-center gap-1">
            <button className={`btn btn-secondary btn-sm ${view === "grid" ? "ring-2 ring-emerald-300" : ""}`} onClick={()=>setView("grid")}>Grid</button>
            <button className={`btn btn-secondary btn-sm ${view === "list" ? "ring-2 ring-emerald-300" : ""}`} onClick={()=>setView("list")}>List</button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <aside className="card p-4 h-max sticky top-[88px] self-start">
          <div className="font-semibold mb-3 text-slate-900">Filters</div>
          <div className="space-y-4 text-sm text-slate-900">
            <div>
              <div className="text-xs text-slate-800 mb-1">Transaction</div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { k: "all", label: "All" },
                  { k: "sale", label: "Buy" },
                  { k: "rent", label: "Rent" },
                  { k: "rto", label: "RTO" },
                ].map((opt) => (
                  <button
                    key={opt.k}
                    onClick={() => setType(opt.k as "all" | Property["type"])}
                    className={`btn btn-secondary btn-sm ${type === opt.k ? "border-[var(--brand-primary)]" : ""}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="text-xs text-slate-800 block">
              Property Type
              <select className="mt-1 w-full border rounded-md px-3 py-2" value={kind} onChange={(e)=>setKind(e.target.value)}>
                <option value="all">Any</option>
                {uniqueKinds.map((k)=> (<option key={k} value={k}>{k}</option>))}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs text-slate-800">
                Min Price (₦)
                <input type="number" className="mt-1 w-full border rounded-md px-3 py-2" value={minPrice} onChange={(e)=>setMinPrice(Number(e.target.value))} />
              </label>
              <label className="text-xs text-slate-800">
                Max Price (₦)
                <input type="number" className="mt-1 w-full border rounded-md px-3 py-2" value={maxPrice} onChange={(e)=>setMaxPrice(Number(e.target.value))} />
              </label>
            </div>

            <label className="text-xs text-slate-800 block">
              Bedrooms (min)
              <select className="mt-1 w-full border rounded-md px-3 py-2" value={beds} onChange={(e)=>setBeds(Number(e.target.value))}>
                {[0,1,2,3,4].map((n)=>(<option key={n} value={n}>{n === 0 ? "Any" : n+"+"}</option>))}
              </select>
            </label>

            <label className="text-xs text-slate-800 block">
              Min Walk Score
              <input type="number" min={0} max={100} className="mt-1 w-full border rounded-md px-3 py-2" value={minWalk} onChange={(e)=>setMinWalk(Number(e.target.value))} />
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-800">
              <input type="checkbox" checked={rtoOnly} onChange={(e)=>setRtoOnly(e.target.checked)} /> RTO eligible only
            </label>

            <details className="rounded-md border p-3">
              <summary className="cursor-pointer font-semibold text-slate-900">More Filters: Amenities</summary>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {featureOptions.map((f) => (
                  <label key={f} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={features.includes(f)} onChange={() => toggleFeature(f)} />
                    <span>{f}</span>
                  </label>
                ))}
              </div>
            </details>

            {features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {features.map((f) => (
                  <button key={f} onClick={() => toggleFeature(f)} className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-900">
                    {f} ×
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-between">
              <button className="btn btn-secondary btn-sm" onClick={clearAll}>Clear All</button>
              <button className="btn btn-primary btn-sm">Apply Filters</button>
            </div>
          </div>
        </aside>

        <section>
          {filtered.length === 0 ? (
            <div className="card p-8 text-center text-slate-600">No properties match your filters.</div>
          ) : (
            <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
              {filtered.map((p) => (
                view === "grid" ? (
                  <PropertyCard key={p.id} property={p} />
                ) : (
                  <div key={p.id} className="group card p-4 md:p-5 hover:shadow-lg transition">
                    <div className="grid grid-cols-[160px_1fr_auto] gap-4 items-center">
                      <div className="relative h-28 w-full overflow-hidden rounded-lg">
                        <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 160px" />
                        {p.type === "rto" && (
                          <span className="badge absolute top-2 left-2">RTO AVAILABLE</span>
                        )}
                      </div>
                      <div className="text-sm text-slate-900">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-semibold text-slate-900">{p.title}</div>
                            <div className="text-slate-800">{p.location}</div>
                          </div>
                        </div>
                        <div className="mt-1 text-slate-900">
                          {p.beds} bed • {p.baths} bath • {p.sqft.toLocaleString()} sqft
                          {p.propertyType ? <span className="ml-2 text-slate-800">• {p.propertyType}</span> : null}
                          {p.yearBuilt ? <span className="ml-2 text-slate-800">• Built {p.yearBuilt}</span> : null}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {p.features?.slice(0, 5).map((f, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-900">{f}</span>
                          ))}
                          {p.features && p.features.length > 5 && (
                            <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-900">+{p.features.length - 5} more</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-right">
                          <div className="text-[var(--brand-primary-dark)] font-bold text-lg">
                            {p.type === "rent" ? `${formatCurrency(p.monthlyRent || 0)}/mo` : formatCurrency(p.price)}
                          </div>
                          {p.type !== "rent" && (
                            <div className="text-xs text-slate-800">{formatCurrency(p.pricePerSqft)}/sqft</div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {p.type === "rto" ? (
                            <Link href={`/finance/rto/calculator?propertyId=${p.id}`} className="btn btn-primary btn-sm">Calculate RTO</Link>
                          ) : p.type === "rent" ? (
                            <Link href="/finance/rent/apply" className="btn btn-primary btn-sm">Apply Rent Loan</Link>
                          ) : (
                            <Link href="/finance/mortgage/calculator" className="btn btn-primary btn-sm">Mortgage Calc</Link>
                          )}
                          <Link href={`/property/${p.id}`} className="btn btn-secondary btn-sm">View</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}


