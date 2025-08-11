"use client";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import Image from "next/image";
export const runtime = 'edge';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="container-max py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Please sign in to view your profile</h1>
        <Link href="/auth/login" className="btn btn-primary btn-md mt-4">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen">
      <div className="container-max py-8">
        {/* Profile Header */}
        <div className="card p-6 mb-6 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.name}!</h1>
              <p className="text-slate-600 mt-1">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✓ Verified</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Premium Member</span>
              </div>
            </div>
            <button
              onClick={logout}
              className="btn btn-secondary btn-md"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Saved Properties", value: "12", color: "text-blue-600" },
                { label: "Applications", value: "3", color: "text-green-600" },
                { label: "Property Views", value: "47", color: "text-purple-600" },
                { label: "Days Active", value: "28", color: "text-orange-600" },
              ].map((stat, i) => (
                <div key={stat.label} className="card p-4 text-center animate-fade-in-up" style={{animationDelay: `${i*80}ms`}}>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="card p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: "Viewed property", item: "Modern 3BR Apartment in Lekki", time: "2 hours ago", icon: "👁️" },
                  { action: "Saved to wishlist", item: "Luxury 4BR Duplex in Ikoyi", time: "1 day ago", icon: "❤️" },
                  { action: "Applied for rent loan", item: "₦180,000 monthly financing", time: "3 days ago", icon: "💳" },
                  { action: "Profile updated", item: "Added phone verification", time: "1 week ago", icon: "✅" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                    <span className="text-xl">{activity.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{activity.action}</div>
                      <div className="text-sm text-slate-600">{activity.item}</div>
                    </div>
                    <div className="text-xs text-slate-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Preferences */}
            <div className="card p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Property Preferences</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-slate-600">Budget Range</div>
                  <div className="font-semibold text-slate-900">₦15M - ₦30M</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Property Type</div>
                  <div className="font-semibold text-slate-900">Apartment, Duplex</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Bedrooms</div>
                  <div className="font-semibold text-slate-900">2-4 bedrooms</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Preferred Areas</div>
                  <div className="font-semibold text-slate-900">Lekki, Ikoyi, VI</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Financing</div>
                  <div className="font-semibold text-slate-900">RTO, Mortgage</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Move-in Timeline</div>
                  <div className="font-semibold text-slate-900">3-6 months</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Financial Profile */}
            <div className="card p-6 animate-fade-in-up">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Financial Profile</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Credit Score</span>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-green-600">Good (720)</div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Income Verification</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Pre-approval Status</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">In Progress</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Max Loan Amount</span>
                  <span className="text-sm font-semibold text-slate-900">₦25M</span>
                </div>
              </div>
              <Link href="/profile/financial" className="btn btn-primary btn-sm w-full mt-4">
                Update Financial Info
              </Link>
            </div>

            {/* Applications Status */}
            <div className="card p-6 animate-fade-in-up">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Applications</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-semibold text-blue-900">Rent Financing</div>
                  <div className="text-xs text-blue-700">₦180,000/month - Under Review</div>
                  <div className="text-xs text-blue-600 mt-1">Est. approval: 2-3 days</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-semibold text-green-900">Mortgage Pre-approval</div>
                  <div className="text-xs text-green-700">₦25M capacity - Approved</div>
                  <div className="text-xs text-green-600 mt-1">Valid until: Mar 2025</div>
                </div>
              </div>
              <Link href="/finance" className="btn btn-secondary btn-sm w-full mt-4">
                New Application
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="card p-6 animate-fade-in-up">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/explore" className="btn btn-secondary btn-sm w-full text-left">
                  🏠 Browse Properties
                </Link>
                <Link href="/wishlist" className="btn btn-secondary btn-sm w-full text-left">
                  ❤️ View Saved Properties
                </Link>
                <Link href="/compare" className="btn btn-secondary btn-sm w-full text-left">
                  ⚖️ Compare Properties
                </Link>
                <Link href="/finance/mortgage/calculator" className="btn btn-secondary btn-sm w-full text-left">
                  🧮 Mortgage Calculator
                </Link>
                <Link href="/help" className="btn btn-secondary btn-sm w-full text-left">
                  💬 Get Help & Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


