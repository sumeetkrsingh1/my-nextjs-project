import Image from "next/image";
import { demoProperties, formatCurrency } from "@/lib/mockData";
import PropertyMap from "@/components/PropertyMap";
export const runtime = 'experimental-edge';
export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = demoProperties.find((p) => p.id === id);
  if (!property) {
    return <div className="container-max py-8">Property not found.</div>;
  }
  return (
    <div className="container-max py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {/* Gallery */}
        <div className="card overflow-hidden animate-fade-in-up">
          <div className="relative h-96 bg-slate-100">
            <Image
              src={property.image}
              alt={property.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 badge">{property.type.toUpperCase()}</div>
          </div>
        </div>

        {/* Quick facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Bedrooms", value: `${property.beds}` },
            { label: "Bathrooms", value: `${property.baths}` },
            { label: "Area", value: `${property.sqft.toLocaleString()} sqft` },
            { label: "Location", value: property.location },
          ].map((f) => (
            <div key={f.label} className="card p-4 hover:shadow-lg hover:-translate-y-0.5">
              <div className="text-xs text-slate-500">{f.label}</div>
              <div className="font-semibold text-slate-900">{f.value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="card p-5">
          <div className="font-semibold mb-1">Description</div>
          <p className="text-sm text-slate-700 leading-6">
            Beautiful property located in {property.location}. Close to amenities, schools, and transportation.
            Perfect for family living with modern finishes.
          </p>
        </div>

        {/* Map */}
        {property.coords && (
          <div className="card p-5">
            <div className="font-semibold mb-2">Location</div>
            <PropertyMap lat={property.coords.lat} lng={property.coords.lng} />
          </div>
        )}
      </div>

      <aside className="space-y-4">
        <div className="card p-5 animate-fade-in-up">
          <div className="text-xl font-semibold">{property.title}</div>
          <div className="text-slate-600">{property.location}</div>
          <div className="mt-2 text-3xl font-extrabold text-[var(--brand-primary-dark)]">
            {property.type === "rent" ? `${formatCurrency(property.monthlyRent || 0)}/mo` : formatCurrency(property.price)}
          </div>
          <div className="text-sm text-slate-600">{property.beds} bed • {property.baths} bath • {property.sqft.toLocaleString()} sqft</div>
          <div className="mt-4 grid grid-cols-1 gap-2">
            <a href="/finance/rent/apply" className="btn btn-primary btn-md text-center">Get Rent Financing</a>
            <a href="/finance/mortgage/calculator" className="btn btn-secondary btn-md text-center">Mortgage Calculator</a>
            {property.type === "rto" && (
              <a href={`/finance/rto/calculator?propertyId=${property.id}`} className="btn btn-secondary btn-md text-center">Calculate RTO</a>
            )}
          </div>
        </div>
        <div className="card p-5">
          <div className="font-semibold mb-2">Agent</div>
          <div className="text-sm">Jane Doe</div>
          <div className="text-xs text-slate-500">Top-rated agent</div>
          <button className="mt-3 btn btn-secondary btn-sm">Contact Agent</button>
        </div>
        <div className="card p-5">
          <div className="font-semibold mb-2">Related Actions</div>
          <div className="flex flex-wrap gap-2 text-sm">
            <a className="btn btn-secondary btn-sm" href="/compare">Compare</a>
            <a className="btn btn-secondary btn-sm" href="/wishlist">Save</a>
            <a className="btn btn-secondary btn-sm" href="/help">Request Info</a>
          </div>
        </div>
      </aside>
    </div>
  );
}


