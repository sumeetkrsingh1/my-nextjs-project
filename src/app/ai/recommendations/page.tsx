import { demoProperties } from "@/lib/mockData";
import { PropertyCard } from "@/components/PropertyCard";

export default function AIRecommendationsPage() {
  return (
    <div className="container-max py-8">
      <h1 className="text-3xl font-bold">Properties Picked Just for You</h1>
      <div className="text-slate-600">AI confidence: 98% match rate</div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoProperties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}


