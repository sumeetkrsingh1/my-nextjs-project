import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100">
      <div className="container-max py-12 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/logoKnockes.png" alt="Knockes" className="h-8 w-auto" />
          </div>
          <p className="mt-3 text-slate-600 max-w-md">
            Knockes brings AI-powered discovery and flexible financing together so you can find and afford the right home.
          </p>
          <div className="mt-4 flex items-center gap-3 text-slate-500">
            <Link href="/about" className="hover:text-emerald-600 transition">Twitter</Link>
            <Link href="/about" className="hover:text-emerald-600 transition">LinkedIn</Link>
            <Link href="/about" className="hover:text-emerald-600 transition">Instagram</Link>
          </div>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-3">Company</div>
          <ul className="space-y-2 text-slate-600">
            <li>
              <Link href="/about" className="hover:text-emerald-600 transition">About</Link>
            </li>
            <li>
              <Link href="/about#careers" className="hover:text-emerald-600 transition">Careers</Link>
            </li>
            <li>
              <Link href="/help" className="hover:text-emerald-600 transition">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-3">Explore</div>
          <ul className="space-y-2 text-slate-600">
            <li>
              <Link href="/explore" className="hover:text-emerald-600 transition">Properties</Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-emerald-600 transition">Wishlist</Link>
            </li>
            <li>
              <Link href="/compare" className="hover:text-emerald-600 transition">Compare</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-3">Financing</div>
          <ul className="space-y-2 text-slate-600">
            <li>
              <Link href="/finance/mortgage/calculator" className="hover:text-emerald-600 transition">Mortgage</Link>
            </li>
            <li>
              <Link href="/finance/rent/apply" className="hover:text-emerald-600 transition">Rent Financing</Link>
            </li>
            <li>
              <Link href="/finance/rto/properties" className="hover:text-emerald-600 transition">Rent-to-Own</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="container-max py-4 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Knockes. All rights reserved.</div>
          <div className="mt-2 md:mt-0 text-[11px] tracking-wide">
            Built with ❤️ for smarter real estate
          </div>
        </div>
      </div>
    </footer>
  );
}


