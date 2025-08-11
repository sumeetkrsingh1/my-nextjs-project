"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: DemoUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "knockes.demo.user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const persist = useCallback((u: DemoUser | null) => {
    if (!u) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    // simulate latency and basic validation
    await new Promise((r) => setTimeout(r, 700));
    const name = email.split("@")[0] || "User";
    const u: DemoUser = { id: crypto.randomUUID(), name, email };
    setUser(u);
    persist(u);
    setLoading(false);
    router.push("/profile");
  }, [persist, router]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const u: DemoUser = { id: crypto.randomUUID(), name: name || (email.split("@")[0] || "User"), email };
    setUser(u);
    persist(u);
    setLoading(false);
    router.push("/profile");
  }, [persist, router]);

  const logout = useCallback(() => {
    setUser(null);
    persist(null);
    router.push("/");
  }, [persist, router]);

  const value = useMemo(() => ({ user, loading, login, signup, logout }), [user, loading, login, signup, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


