import { Hero } from "@/components/Hero";
import { PropertyCard } from "@/components/PropertyCard";
import { demoProperties, loanTypes } from "@/lib/mockData";
import { AIMatchingTeaser } from "@/components/AIMatchingTeaser";
export const runtime = 'experimental-edge';
export default function Home() {
  return (
    <div>
      <Hero />
      <section className="container-max mt-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="section-title">Top Picks For You</h2>
            <p className="text-slate-600 text-sm">Handpicked properties based on popularity and value.</p>
          </div>
          <a className="text-[var(--brand-primary)] font-medium hover:underline" href="/explore">View All</a>
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoProperties.slice(0, 3).map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      <section className="mt-16 border-y bg-gradient-to-b from-white to-green-50/50">
        <div className="container-max py-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="section-title text-slate-900">Complete Financing Solutions</h2>
              <p className="text-slate-600 text-sm">Rent financing, rent-to-own, and calculators—everything you need to plan.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/finance/rent/apply" className="card p-6 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-300">
              <div className="text-[11px] font-semibold text-slate-700 tracking-wide">FINANCING</div>
              <div className="text-xl font-bold mb-1 text-slate-900">Rent Financing</div>
              <div className="text-sm text-slate-700">Get rent loans with fast approval and flexible repayment.</div>
              <div className="mt-4 inline-flex btn btn-primary btn-sm">Apply for Rent Loan</div>
            </a>
            <a href="/finance/rto/properties" className="card p-6 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-300">
              <div className="text-[11px] font-semibold text-slate-700 tracking-wide">EQUITY</div>
              <div className="text-xl font-bold mb-1 text-slate-900">Rent-to-Own</div>
              <div className="text-sm text-slate-700">Build equity monthly while you rent. Own with confidence.</div>
              <div className="mt-4 inline-flex btn btn-primary btn-sm">Explore RTO</div>
            </a>
            <a href="/finance/mortgage/calculator" className="card p-6 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-300">
              <div className="text-[11px] font-semibold text-slate-700 tracking-wide">TOOLS</div>
              <div className="text-xl font-bold mb-1 text-slate-900">Mortgage Calculator</div>
              <div className="text-sm text-slate-700">Estimate monthly payments and affordability instantly.</div>
              <div className="mt-4 inline-flex btn btn-primary btn-sm">Calculate</div>
            </a>
          </div>
        </div>
      </section>

      <section className="container-max mt-16">
        <div className="rounded-2xl p-8 md:p-10 bg-[var(--brand-primary-light)]/60 border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="text-xs font-semibold text-[var(--brand-primary-dark)]">AI MATCHING</div>
              <h3 className="text-2xl font-bold mt-1">AI-Powered Property Recommendations</h3>
              <p className="text-slate-700 mt-2">Preview top-matching homes instantly. Tune preference chips to personalize results.</p>
              <a href="/ai/recommendations" className="mt-4 inline-flex btn btn-primary btn-sm">Open Full AI Match</a>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {loanTypes.slice(0,4).map((l) => (
                  <div key={l.key} className="bg-white rounded-lg p-4 border">
                    <div className="font-semibold text-slate-900">{l.key}</div>
                    {"friendly" in l && (
                      <div className="text-xs text-slate-700 mb-1">{(l as unknown as { friendly?: string }).friendly}</div>
                    )}
                    <div className="text-xs text-slate-600">Down {l.downPayment} • Score {l.creditScore}</div>
                    <div className="text-xs text-slate-600">Max {l.maxAmount} • {l.terms}</div>
                  </div>
                ))}
              </div>
            </div>
            <AIMatchingTeaser />
          </div>
        </div>
      </section>
    </div>
  );
}
