export default function LandlordDashboardPage() {
  return (
    <div className="container-max py-8">
      <h1 className="text-3xl font-bold">Landlord Payout Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Financed Properties" value="8" />
        <Card title="Total Received" value="₦6,400,000" />
        <Card title="Pending Payouts" value="₦300,000" />
        <Card title="Success Rate" value="98%" />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="font-semibold mb-2">Financed Properties</div>
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr>
                <th className="py-2">Property</th>
                <th className="py-2">Tenant</th>
                <th className="py-2">Status</th>
                <th className="py-2">Received</th>
              </tr>
            </thead>
            <tbody>
              {[
                { p: "Lekki 3BR", t: "A. Obi", s: "Active", r: "₦900,000" },
                { p: "VI 2BR", t: "B. Ade", s: "Active", r: "₦800,000" },
                { p: "Ikoyi 4BR", t: "K. Yusuf", s: "Active", r: "₦1,400,000" },
              ].map((row) => (
                <tr key={row.p} className="border-t">
                  <td className="py-2">{row.p}</td>
                  <td className="py-2">{row.t}</td>
                  <td className="py-2">{row.s}</td>
                  <td className="py-2">{row.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">Payout History</div>
          <ul className="space-y-2 text-sm">
            {[
              { date: "2025-01-06", amount: "₦300,000" },
              { date: "2024-12-06", amount: "₦320,000" },
              { date: "2024-11-06", amount: "₦290,000" },
            ].map((row) => (
              <li key={row.date} className="border rounded-md p-2 flex items-center justify-between">
                <span>{row.date}</span>
                <span>{row.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="card p-4">
      <div className="text-slate-500 text-sm">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}


