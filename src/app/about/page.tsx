import Image from "next/image";
export const runtime = 'edge';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
        <div className="container-max py-12 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">About Knockes</h1>
          <p className="mt-4 text-slate-700 max-w-3xl mx-auto">
            We’re building the most trusted home discovery and financing platform in Africa — simplifying rent, enabling ownership, and partnering with banks to unlock inclusive credit.
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{k:"Homes",v:"12.5k+"},{k:"Cities",v:"120"},{k:"Partners",v:"15+"},{k:"Users",v:"8.2k"}].map((s, i)=> (
              <div key={s.k} className="card p-4 animate-fade-in-up" style={{animationDelay: `${i*80}ms`}}>
                <div className="text-2xl font-extrabold text-[var(--brand-primary-dark)]">{s.v}</div>
                <div className="text-sm text-slate-700">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-max py-12 grid md:grid-cols-2 gap-6">
        <div className="card p-6 animate-fade-in-up">
          <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
          <p className="mt-2 text-slate-700">
            Empower individuals and families with transparent financing and insightful tools to rent, buy, or transition to homeownership with confidence.
          </p>
        </div>
        <div className="card p-6 animate-fade-in-up" style={{animationDelay: "90ms"}}>
          <h2 className="text-xl font-bold text-slate-900">Our Vision</h2>
          <p className="mt-2 text-slate-700">
            Become the operating system for real estate financing across emerging markets — where every home journey is data-driven, fair, and delightfully simple.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-max py-6 grid md:grid-cols-[1fr_420px] gap-6 items-center">
        <div className="card p-6 animate-fade-in-up">
          <h2 className="text-xl font-bold text-slate-900">Our Story</h2>
          <p className="mt-2 text-slate-700 leading-7">
            Knockes started with a simple idea — housing decisions should be guided by real data and made affordable through modern financing. We collaborate with PMBs and banks to bring rent financing, rent-to-own, and mortgages into one seamless flow, powered by AI recommendations and market insights.
          </p>
        </div>
        <div className="relative h-56 md:h-72 card overflow-hidden animate-fade-in-up" style={{animationDelay: "100ms"}}>
          <Image src="https://images.unsplash.com/photo-1505691723518-36a5ac3b2d95?auto=format&fit=crop&w=1200&q=80" alt="Team at work" fill className="object-cover" />
        </div>
      </section>

      {/* Values */}
      <section className="container-max py-6 grid md:grid-cols-3 gap-6">
        {[
          {t:"Trust & Transparency",d:"Clear pricing, fair terms, and dependable partners."},
          {t:"Accessibility",d:"Products designed for real people, across incomes and cities."},
          {t:"Innovation",d:"AI-driven insights, modern UX, and continuous improvement."},
        ].map((v, i)=> (
          <div key={v.t} className="card p-6 animate-fade-in-up" style={{animationDelay: `${i*80}ms`}}>
            <h3 className="font-semibold text-slate-900">{v.t}</h3>
            <p className="text-slate-700 mt-2 text-sm">{v.d}</p>
          </div>
        ))}
      </section>

      {/* Partners */}
      <section className="container-max py-12">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-xl font-bold text-slate-900">Our Partners</h2>
          <p className="text-slate-700 mt-2">We collaborate with PMBs and banks to expand access to financing.</p>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {[1,2,3,4].map((n,i)=> (
            <div key={n} className="card p-4 w-[160px] h-[64px] flex items-center justify-center text-slate-600 animate-fade-in-up" style={{animationDelay: `${i*70}ms`}}>Bank {n}</div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-max pb-12">
        <div className="card p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up">
          <div>
            <div className="text-lg font-semibold text-slate-900">Partner with Knockes</div>
            <div className="text-slate-700 text-sm">Let’s launch inclusive housing finance products together.</div>
          </div>
          <a href="/help" className="btn btn-primary btn-md">Contact Us</a>
        </div>
      </section>
    </div>
  );
}


