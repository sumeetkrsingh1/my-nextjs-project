import Link from "next/link";
import { demoFinanceStats } from "@/lib/mockData";

export function Hero() {
  const stats = demoFinanceStats;
  return (
    <section className="relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-green-50/40 to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/bg.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/35 to-white/5" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[var(--brand-primary-light)] blur-3xl opacity-50" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-50 blur-3xl opacity-50" />

      <div className="container-max py-14 md:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/30 backdrop-blur border border-white/20 px-3 py-1 text-xs text-white shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand-primary)]" />
            Bank-grade security • Transparent rates
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow">
            Find Your Dream Home with Smart Financing
          </h1>
          <p className="mt-4 text-white/90 text-lg leading-relaxed">
            Get rent loans, explore rent-to-own, or secure mortgages — all in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/finance/rent/apply" className="group inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-5 py-3 rounded-md font-medium shadow-sm hover:shadow">
              <span>Get Rent Loan</span>
              <span className="transition -translate-x-0 group-hover:translate-x-0.5">→</span>
            </Link>
            <Link href="/finance/rto/properties" className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-md font-medium border border-white/40 hover:bg-white/95">
              <span>Explore Rent-to-Own</span>
            </Link>
            <Link href="/finance/mortgage/calculator" className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-md font-medium border border-white/40 hover:bg-white/95">
              <span>Mortgage Calculator</span>
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-6 text-xs text-white/80">
            <span>Trusted by leading PMBs</span>
            <span className="h-4 w-px bg-white/30" />
            <div className="flex items-center gap-3">
              <span className="rounded bg-white/90 text-slate-900 border px-2 py-1">PMB A</span>
              <span className="rounded bg-white/90 text-slate-900 border px-2 py-1">PMB B</span>
              <span className="rounded bg-white/90 text-slate-900 border px-2 py-1">PMB C</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Properties" value={`${stats.properties.toLocaleString()}+`} />
          <Stat label="Happy Customers" value={`${stats.customers.toLocaleString()}+`} />
          <Stat label="Cities" value={`${stats.cities}+`} />
          <Stat label="Agents" value={`${stats.agents}+`} />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-5 hover:shadow-md transition">
      <div className="text-2xl font-semibold text-slate-900">{value}</div>
      <div className="text-slate-500 text-sm">{label}</div>
    </div>
  );
}


