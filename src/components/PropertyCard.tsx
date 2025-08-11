import Link from "next/link";
import Image from "next/image";
import { Property, formatCurrency } from "@/lib/mockData";

export function PropertyCard({ property }: { property: Property }) {
  const priceLabel = property.type === "rent"
    ? `${formatCurrency(property.monthlyRent || 0)}/mo`
    : formatCurrency(property.price);

  return (
    <div className="card overflow-hidden hover:-translate-y-0.5 hover:shadow-lg animate-fade-in-up">
      <div className="relative h-48 bg-slate-100">
        <Image src={property.image} alt={property.title} fill className="object-cover" />
        {property.type === "rto" && (
          <div className="absolute top-3 left-3 badge">RTO AVAILABLE</div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">{property.title}</h3>
          <div className="text-[var(--brand-primary-dark)] font-semibold">{priceLabel}</div>
        </div>
        <div className="text-sm text-slate-600">{property.location}</div>
        <div className="text-xs text-slate-500">{property.beds} bed • {property.baths} bath • {property.sqft.toLocaleString()} sqft</div>
        <div className="pt-2 flex gap-2">
          {property.type === "rto" && (
            <Link
              href={`/finance/rto/calculator?propertyId=${property.id}`}
              className="btn btn-secondary btn-sm"
            >
              Calculate RTO
            </Link>
          )}
          <Link
            href={`/property/${property.id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}


