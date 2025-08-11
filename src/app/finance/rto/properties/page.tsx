import { demoProperties } from "@/lib/mockData";
import { PropertyCard } from "@/components/PropertyCard";
export const runtime = 'edge';

export default function RTOPropertiesPage() {
  const rtoProps = demoProperties.filter((p) => p.type === "rto");
  return (
    <div className="container-max py-8">
      <h1 className="text-3xl font-bold">Rent-to-Own Properties <span className="badge ml-2">RTO</span></h1>
      <p className="text-slate-600">Build equity while you rent — own your home over time.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rtoProps.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}


