"use client";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signup, loading } = useAuth();
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50/50 min-h-screen">
      <div className="container-max py-12">
      {/* Mobile illustration */}
      <div className="md:hidden card overflow-hidden mb-6 animate-fade-in-up">
        <div className="relative h-48">
          <Image
            src="https://images.unsplash.com/photo-1499955085172-a104c9463ece?auto=format&fit=crop&w=1200&q=80"
            alt="Create account"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Form */}
        <div className="max-w-md w-full mx-auto order-2 md:order-1">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
            <p className="text-slate-600 mt-2 text-sm">Already have an account? <Link className="text-[var(--brand-primary)] font-medium" href="/auth/login">Sign in</Link></p>
          </div>

          <form
            className="mt-6 card p-6 space-y-4 animate-fade-in-up"
            onSubmit={(e) => {
              e.preventDefault();
              signup(name, email, password);
            }}
          >
            <label className="block text-sm">
              <div className="mb-1 text-slate-700">Full name</div>
              <input
                required
                className="border rounded-md px-3 py-2 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block text-sm">
              <div className="mb-1 text-slate-700">Email</div>
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="border rounded-md px-3 py-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block text-sm">
              <div className="mb-1 text-slate-700">Password</div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="border rounded-md px-3 py-2 w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-800"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </label>

            <button disabled={loading} className="btn btn-primary btn-md w-full disabled:opacity-60">
              {loading ? "Creating account..." : "Create account"}
            </button>

            <div className="relative text-center text-xs text-slate-500">
              <span className="bg-white px-2 relative z-10">or sign up with</span>
              <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200 -z-0" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="btn btn-secondary btn-md w-full" onClick={() => signup(name || "Google User", "google.user@demo.com", "google")}>Google</button>
              <button type="button" className="btn btn-secondary btn-md w-full" onClick={() => signup(name || "Apple User", "apple.user@demo.com", "apple")}>Apple</button>
            </div>
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="order-1 md:order-2">
          <div className="card overflow-hidden animate-fade-in-up">
            <div className="relative h-80">
              <Image
                src="https://images.unsplash.com/photo-1499955085172-a104c9463ece?auto=format&fit=crop&w=1200&q=80"
                alt="Create account"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900">Join Knockes</h2>
              <p className="mt-2 text-slate-700 text-sm">Save listings, compare homes, and access flexible finance options from partner banks.</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}


