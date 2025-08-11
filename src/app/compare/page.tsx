"use client";
import { demoProperties, formatCurrency, Property } from "@/lib/mockData";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { useMemo, useState } from "react";
export const runtime = 'edge';

type ColumnKey = "pool" | "selected";

export default function ComparePage() {
  const [pool, setPool] = useState<Property[]>(demoProperties.slice(3));
  const [selected, setSelected] = useState<Property[]>(demoProperties.slice(0, 2));
  const [q, setQ] = useState("");

  const filteredPool = useMemo(
    () => pool.filter((p) => `${p.title} ${p.location}`.toLowerCase().includes(q.toLowerCase())),
    [pool, q]
  );

  function onDragEnd(result: DropResult) {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    const srcList = source.droppableId as ColumnKey;
    const dstList = destination.droppableId as ColumnKey;
    const state: Record<ColumnKey, Property[]> = { pool: [...pool], selected: [...selected] };
    const [moved] = state[srcList].splice(source.index, 1);
    state[dstList].splice(destination.index, 0, moved);
    setPool(state.pool);
    setSelected(state.selected);
  }

  return (
    <div className="container-max py-8">
      <h1 className="text-3xl font-bold">Compare Properties</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4">
          {/* Left side panel: search + pool */}
          <Droppable droppableId="pool">
            {(provided) => (
              <aside ref={provided.innerRef} {...provided.droppableProps} className="card p-4 h-max sticky top-[88px] self-start">
                <div className="font-semibold mb-2 text-slate-900">Property Pool</div>
                <input
                  className="border rounded-md px-3 py-2 w-full mb-3"
                  placeholder="Search properties..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
                <div className="space-y-2">
                  {filteredPool.map((p, index) => (
                    <Draggable key={p.id} draggableId={p.id} index={index}>
                      {(prov) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          className="border rounded-md p-3 hover:bg-slate-50"
                        >
                          <div className="font-semibold text-slate-900 text-sm">{p.title}</div>
                          <div className="text-xs text-slate-800">{p.location}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </aside>
            )}
          </Droppable>

          {/* Right side: horizontal columns side-by-side */}
          <Droppable droppableId="selected" direction="horizontal">
            {(provided) => (
              <section ref={provided.innerRef} {...provided.droppableProps} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-slate-900">Selected for Comparison</div>
                  <button className="btn btn-secondary btn-sm" onClick={()=>{setSelected([]); setPool(demoProperties);}}>Clear All</button>
                </div>
                {selected.length === 0 ? (
                  <div className="text-slate-600 text-sm">Drag properties from the left to compare.</div>
                ) : (
                  <div className="overflow-auto pb-2">
                    {/* Comparison Table */}
                    <div className="min-w-[800px] space-y-4">
                      {/* Property Headers with Actions */}
                      <div className="grid gap-3" style={{ gridTemplateColumns: `200px repeat(${selected.length}, minmax(280px, 1fr))` }}>
                        <div className="font-semibold text-slate-900 self-center">Properties</div>
                        {selected.map((p, idx) => (
                          <Draggable key={p.id} draggableId={`sel-${p.id}`} index={idx}>
                            {(prov) => (
                              <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} className="card p-3">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <div>
                                    <div className="font-semibold text-slate-900">{p.title}</div>
                                    <div className="text-xs text-slate-800">{p.location}</div>
                                  </div>
                                  <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => { setPool([p, ...pool]); setSelected(selected.filter(s => s.id !== p.id)); }}
                                  >
                                    Remove
                                  </button>
                                </div>
                                <img src={p.image} alt={p.title} className="w-full h-24 object-cover rounded mb-2" />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>

                      {/* Price & Basic Info */}
                      <div className="grid gap-3" style={{ gridTemplateColumns: `200px repeat(${selected.length}, minmax(280px, 1fr))` }}>
                        <div className="font-semibold text-slate-900 self-center">Price</div>
                        {selected.map((p) => (
                          <div key={`price-${p.id}`} className="card p-3">
                            <div className="text-[var(--brand-primary-dark)] font-bold text-lg">
                              {p.type === "rent" ? `${formatCurrency(p.monthlyRent || 0)}/mo` : formatCurrency(p.price)}
                            </div>
                            <div className="text-sm text-slate-800 mt-1">
                              {formatCurrency(p.pricePerSqft)}/sqft
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Property Details */}
                      <div className="grid gap-3" style={{ gridTemplateColumns: `200px repeat(${selected.length}, minmax(280px, 1fr))` }}>
                        <div className="font-semibold text-slate-900 self-center">Details</div>
                        {selected.map((p) => (
                          <div key={`details-${p.id}`} className="card p-3 text-sm text-slate-900">
                            <div><strong>Type:</strong> {p.propertyType}</div>
                            <div><strong>Built:</strong> {p.yearBuilt}</div>
                            <div><strong>Size:</strong> {p.beds} bed • {p.baths} bath • {p.sqft.toLocaleString()} sqft</div>
                            {p.lotSize && <div><strong>Lot:</strong> {p.lotSize.toLocaleString()} sqft</div>}
                            <div><strong>Condition:</strong> {p.condition}</div>
                          </div>
                        ))}
                      </div>

                      {/* Features & Amenities */}
                      <div className="grid gap-3" style={{ gridTemplateColumns: `200px repeat(${selected.length}, minmax(280px, 1fr))` }}>
                        <div className="font-semibold text-slate-900 self-center">Features</div>
                        {selected.map((p) => (
                          <div key={`features-${p.id}`} className="card p-3 text-sm text-slate-900">
                            <div><strong>Parking:</strong> {p.parking}</div>
                            <div><strong>Heating:</strong> {p.heating}</div>
                            <div><strong>Cooling:</strong> {p.cooling}</div>
                            <div><strong>Flooring:</strong> {p.flooring.join(", ")}</div>
                            <div className="mt-2">
                              <strong>Key Features:</strong>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {p.features.slice(0, 4).map((feature, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-slate-100 text-xs rounded text-slate-900">{feature}</span>
                                ))}
                                {p.features.length > 4 && (
                                  <span className="px-2 py-1 bg-slate-100 text-xs rounded text-slate-900">+{p.features.length - 4} more</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Schools */}
                      <div className="grid gap-3" style={{ gridTemplateColumns: `200px repeat(${selected.length}, minmax(280px, 1fr))` }}>
                        <div className="font-semibold text-slate-900 self-center">Schools</div>
                        {selected.map((p) => (
                          <div key={`schools-${p.id}`} className="card p-3 text-sm text-slate-900">
                            <div className="flex items-center gap-2 mb-2">
                              <strong>Rating:</strong> 
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded font-semibold">{p.schools.rating}/10</span>
                            </div>
                            <div><strong>Elementary:</strong> {p.schools.elementary}</div>
                            <div><strong>Middle:</strong> {p.schools.middle}</div>
                            <div><strong>High:</strong> {p.schools.high}</div>
                          </div>
                        ))}
                      </div>

                      {/* Neighborhood Scores */}
                      <div className="grid gap-3" style={{ gridTemplateColumns: `200px repeat(${selected.length}, minmax(280px, 1fr))` }}>
                        <div className="font-semibold text-slate-900 self-center">Walkability</div>
                        {selected.map((p) => (
                          <div key={`neighborhood-${p.id}`} className="card p-3 text-sm text-slate-900">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Walk Score</span>
                                <span className="font-semibold">{p.neighborhood.walkScore}/100</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Transit Score</span>
                                <span className="font-semibold">{p.neighborhood.transitScore}/100</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Bike Score</span>
                                <span className="font-semibold">{p.neighborhood.bikeScore}/100</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Monthly Costs */}
                      <div className="grid gap-3" style={{ gridTemplateColumns: `200px repeat(${selected.length}, minmax(280px, 1fr))` }}>
                        <div className="font-semibold text-slate-900 self-center">Monthly Costs</div>
                        {selected.map((p) => (
                          <div key={`costs-${p.id}`} className="card p-3 text-sm text-slate-900">
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span>Electric</span>
                                <span>{formatCurrency(p.utilities.electric)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Gas</span>
                                <span>{formatCurrency(p.utilities.gas)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Water</span>
                                <span>{formatCurrency(p.utilities.water)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Internet</span>
                                <span>{formatCurrency(p.utilities.internet)}</span>
                              </div>
                              {p.hoa && (
                                <div className="flex justify-between border-t pt-1 mt-2">
                                  <span>HOA</span>
                                  <span className="font-semibold">{formatCurrency(p.hoa.monthly)}</span>
                                </div>
                              )}
                              <div className="flex justify-between border-t pt-1 mt-2 font-semibold">
                                <span>Total Utilities</span>
                                <span>{formatCurrency(p.utilities.electric + p.utilities.gas + p.utilities.water + p.utilities.internet + (p.hoa?.monthly || 0))}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Investment Metrics */}
                      <div className="grid gap-3" style={{ gridTemplateColumns: `200px repeat(${selected.length}, minmax(280px, 1fr))` }}>
                        <div className="font-semibold text-slate-900 self-center">Investment</div>
                        {selected.map((p) => (
                          <div key={`investment-${p.id}`} className="card p-3 text-sm text-slate-900">
                            <div className="space-y-1">
                              {p.investment.capRate && (
                                <div className="flex justify-between">
                                  <span>Cap Rate</span>
                                  <span className="font-semibold">{p.investment.capRate}%</span>
                                </div>
                              )}
                              {p.investment.rentYield && (
                                <div className="flex justify-between">
                                  <span>Rent Yield</span>
                                  <span className="font-semibold">{p.investment.rentYield}%</span>
                                </div>
                              )}
                              {p.investment.appreciation && (
                                <div className="flex justify-between">
                                  <span>5yr Appreciation</span>
                                  <span className="font-semibold">{p.investment.appreciation}%</span>
                                </div>
                              )}
                              <div className="flex justify-between border-t pt-1 mt-2">
                                <span>Annual Tax</span>
                                <span>{formatCurrency(p.taxes.annual)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Safety & Distance */}
                      <div className="grid gap-3" style={{ gridTemplateColumns: `200px repeat(${selected.length}, minmax(280px, 1fr))` }}>
                        <div className="font-semibold text-slate-900 self-center">Safety</div>
                        {selected.map((p) => (
                          <div key={`safety-${p.id}`} className="card p-3 text-sm text-slate-900">
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span>Crime Rate</span>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  p.safety.crimeRate === "Low" ? "bg-green-100 text-green-800" :
                                  p.safety.crimeRate === "Medium" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-red-100 text-red-800"
                                }`}>
                                  {p.safety.crimeRate}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Fire Station</span>
                                <span>{p.safety.fireStation} km</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Hospital</span>
                                <span>{p.safety.hospital} km</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Financing Actions */}
                      <div className="grid gap-3" style={{ gridTemplateColumns: `200px repeat(${selected.length}, minmax(280px, 1fr))` }}>
                        <div className="font-semibold text-slate-700 self-center">Financing</div>
                        {selected.map((p) => (
                          <div key={`financing-${p.id}`} className="card p-3">
                            <div className="space-y-2">
                              <a href="/finance/mortgage/calculator" className="btn btn-secondary btn-sm w-full">Calculate Mortgage</a>
                              <a href="/finance/rent/apply" className="btn btn-secondary btn-sm w-full">Apply Rent Loan</a>
                              {p.type === "rto" && (
                                <a href={`/finance/rto/calculator?propertyId=${p.id}`} className="btn btn-primary btn-sm w-full">RTO Calculator</a>
                              )}
                              <a href={`/property/${p.id}`} className="btn btn-secondary btn-sm w-full">View Details</a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}


