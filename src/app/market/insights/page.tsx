export const runtime = 'experimental-edge';
export default function MarketInsightsPage() {
  return (
    <div className="container-max py-8">
      <h1 className="text-3xl font-bold">Market Insights</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-4">
          <div className="font-semibold mb-2">Key Market Indicators</div>
          <ul className="list-disc ml-5 text-sm text-slate-600 space-y-1">
            <li>Price trend: +4.2% YoY</li>
            <li>Demand index: High</li>
            <li>Top hotspot: Lekki Phase 1</li>
          </ul>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">Investment Calculator</div>
          <div className="text-sm text-slate-600">ROI and cash flow tools coming soon in this demo.</div>
        </div>
      </div>
    </div>
  );
}


