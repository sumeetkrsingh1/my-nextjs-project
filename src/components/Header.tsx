"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import Image from "next/image";

const nav = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/finance", label: "Finance" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="container-max h-[76px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-semibold text-lg">
          <Image
            src="/logoKnockes.png"
            alt="Knockes"
            width={160}
            height={36}
            priority
            className="h-9 w-auto object-contain"
          />
          <span className="sr-only">Knockes</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`text-sm font-semibold px-2 py-1 rounded-md transition-colors ${
                pathname === item.href
                  ? "text-slate-900 bg-emerald-50"
                  : "text-slate-800 hover:text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/profile" className="text-sm font-medium text-slate-800 hover:text-emerald-700">
                Hi, {user.name}
              </Link>
              <button onClick={logout} className="text-sm font-semibold bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 shadow-sm">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-slate-800 hover:text-emerald-700"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="text-sm font-semibold bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


