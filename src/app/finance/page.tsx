import Link from "next/link";
import { demoFinanceStats } from "@/lib/mockData";

export default function FinanceHubPage() {
  const stats = demoFinanceStats;
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--brand-primary-light)] via-white to-blue-50 border-b">
        <div className="container-max py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Smart Financing Solutions
            </h1>
            <p className="mt-3 text-slate-800 md:text-lg">
              Choose Rent Financing, Mortgage, or Rent-to-Own. Calculate payments, get
              pre-qualified, and apply with bank-grade security — all in minutes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/finance/rent/apply" className="btn btn-primary btn-md">Get Rent Loan</Link>
              <Link href="/finance/rto/properties" className="btn btn-secondary btn-md">Explore Rent‑to‑Own</Link>
              <Link href="/finance/mortgage/calculator" className="btn btn-secondary btn-md">Mortgage Calculator</Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="text-xs uppercase tracking-wide text-slate-600">Amount Financed</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">₦{stats.amountFinanced.toLocaleString()}M+</div>
            </div>
            <div className="card p-4">
              <div className="text-xs uppercase tracking-wide text-slate-600">Users Served</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">{stats.usersServed.toLocaleString()}+</div>
            </div>
            <div className="card p-4">
              <div className="text-xs uppercase tracking-wide text-slate-600">Success Rate</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">{Math.round(stats.successRate * 100)}%</div>
            </div>
            <div className="card p-4">
              <div className="text-xs uppercase tracking-wide text-slate-600">Avg Interest</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">{stats.interestRate}%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Main Sections */}
      <section className="container-max mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rent Financing */}
        <div className="card p-6 animate-fade-in-up">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Rent Financing</h3>
              <p className="text-slate-800 text-sm mt-1">Fast approvals to cover your rent with flexible monthly payments.</p>
            </div>
            <span className="badge">New</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-900">
            <li className="flex items-center gap-2"><span>✓</span> Same‑day decision</li>
            <li className="flex items-center gap-2"><span>✓</span> Transparent fees</li>
            <li className="flex items-center gap-2"><span>✓</span> Auto‑pay & reminders</li>
          </ul>
          <div className="mt-5 flex gap-2">
            <Link href="/finance/rent/apply" className="btn btn-primary btn-md">Start Application</Link>
            <Link href="/finance/rent/dashboard" className="btn btn-secondary btn-md">Manage Loans</Link>
          </div>
        </div>

        {/* Mortgage Financing */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="text-xl font-semibold text-slate-900">Mortgage Financing</h3>
          <p className="text-slate-800 text-sm mt-1">Estimate payments, view loan options, and get pre‑qualified without credit impact.</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Link href="/finance/mortgage/calculator" className="card p-3 text-center hover:shadow">
              <div className="font-semibold text-slate-900">Calculator</div>
              <div className="text-slate-800 text-xs">Real‑time estimates</div>
            </Link>
            <Link href="/finance/mortgage/prequalify" className="card p-3 text-center hover:shadow">
              <div className="font-semibold text-slate-900">Pre‑Qualification</div>
              <div className="text-slate-800 text-xs">No score impact</div>
            </Link>
          </div>
          <div className="mt-5 flex gap-2">
            <Link href="/finance/mortgage/prequalify" className="btn btn-primary btn-md">Get Pre‑Qualified</Link>
            <Link href="/finance/mortgage/education" className="btn btn-secondary btn-md">Education Hub</Link>
          </div>
        </div>

        {/* Rent‑to‑Own */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="text-xl font-semibold text-slate-900">Rent‑to‑Own</h3>
          <p className="text-slate-800 text-sm mt-1">Build equity every month and lock your purchase price over 3–10 years.</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Link href="/finance/rto/calculator" className="card p-3 text-center hover:shadow">
              <div className="font-semibold text-slate-900">RTO Calculator</div>
              <div className="text-slate-800 text-xs">Plan scenarios</div>
            </Link>
            <Link href="/finance/rto/properties" className="card p-3 text-center hover:shadow">
              <div className="font-semibold text-slate-900">RTO Properties</div>
              <div className="text-slate-800 text-xs">Available now</div>
            </Link>
          </div>
          <div className="mt-5 flex gap-2">
            <Link href="/finance/rto/properties" className="btn btn-primary btn-md">Explore Properties</Link>
            <Link href="/finance/rto/apply" className="btn btn-secondary btn-md">Apply for RTO</Link>
          </div>
        </div>
      </section>

      {/* Bottom resources & FAQ */}
      <section className="container-max mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
        {/* Resources */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-slate-900">Resources & Education</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <Link href="/finance/mortgage/education" className="card p-4 hover:shadow">
              <div className="font-semibold text-slate-900">Mortgage Education</div>
              <div className="text-slate-800 text-sm">Guides, videos, and calculators</div>
            </Link>
            <Link href="/help" className="card p-4 hover:shadow">
              <div className="font-semibold text-slate-900">Help Center</div>
              <div className="text-slate-800 text-sm">FAQs and support</div>
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-800">PMB Partners:</span>
            <div className="flex gap-2">
              <span className="badge">FirstTrust</span>
              <span className="badge">UnityBank</span>
              <span className="badge">PrimeLend</span>
            </div>
          </div>
          <div className="mt-5">
            <Link href="/finance/mortgage/prequalify" className="btn btn-primary btn-md">Talk to an Advisor</Link>
          </div>
        </div>

        {/* FAQ (no JS, accessible) */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-slate-900">Frequently Asked Questions</h3>
          <div className="mt-3 space-y-3">
            <details className="rounded-md border p-3">
              <summary className="cursor-pointer font-semibold text-slate-900">Does pre‑qualification affect my credit score?</summary>
              <p className="mt-2 text-sm text-slate-800">No. Our pre‑qualification uses a soft inquiry and won’t impact your score.</p>
            </details>
            <details className="rounded-md border p-3">
              <summary className="cursor-pointer font-semibold text-slate-900">How fast can I get a rent loan?</summary>
              <p className="mt-2 text-sm text-slate-800">Many applicants receive decisions the same day and funding within 24–48 hours.</p>
            </details>
            <details className="rounded-md border p-3">
              <summary className="cursor-pointer font-semibold text-slate-900">What is Rent‑to‑Own and how does equity build?</summary>
              <p className="mt-2 text-sm text-slate-800">A portion of each payment builds equity that goes toward your purchase price at the end of the term.</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}


