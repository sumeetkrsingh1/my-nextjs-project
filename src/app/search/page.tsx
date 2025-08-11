"use client";
import { useState } from "react";
import { demoProperties } from "@/lib/mockData";
import { PropertyCard } from "@/components/PropertyCard";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const results = demoProperties.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="container-max py-8">
      <h1 className="text-3xl font-bold">Search</h1>
      <div className="mt-4 flex gap-2">
        <input className="border rounded-md px-3 py-2 flex-1" placeholder="Search properties, locations..." value={q} onChange={(e)=>setQ(e.target.value)} />
        <button className="btn btn-primary btn-sm">Search</button>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}


