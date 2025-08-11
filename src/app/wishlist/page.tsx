import { demoProperties } from "@/lib/mockData";
import { PropertyCard } from "@/components/PropertyCard";
export const runtime = 'experimental-edge';
export default function WishlistPage() {
  const saved = demoProperties.slice(0, 2);
  return (
    <div className="container-max py-8">
      <h1 className="text-3xl font-bold">Wishlist</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {saved.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}


