export const runtime = 'experimental-edge';
export default function RentDashboardPage() {
  return (
    <div className="container-max py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rent Loan Dashboard</h1>
        <div className="text-sm text-slate-600">Status: Active</div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Loan Amount" value="₦2,400,000" />
        <Card title="Paid to Date" value="₦1,200,000" />
        <Card title="Remaining Balance" value="₦1,200,000" />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="font-semibold mb-2">Next Payment</div>
          <div className="text-slate-600 text-sm">Due in 12 days</div>
          <div className="text-2xl font-bold mt-1">₦100,000</div>
          <button className="btn btn-primary btn-sm mt-3">Pay Now</button>
          <div className="text-xs text-slate-500 mt-2">Auto-pay: Enabled</div>
        </div>
        <div className="card p-4 md:col-span-2">
          <div className="font-semibold mb-2">Payment Schedule</div>
          <div className="text-sm text-slate-600">Monthly on the 5th • 24 total payments</div>
          <ul className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="border rounded-md p-2 flex items-center justify-between">
                <span>{`2025-${String(i + 1).padStart(2, "0")}-05`}</span>
                <span>₦100,000</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 card p-4">
        <div className="font-semibold mb-2">Payment History</div>
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: "2025-01-05", amount: "₦100,000", status: "Paid" },
              { date: "2024-12-05", amount: "₦100,000", status: "Paid" },
              { date: "2024-11-05", amount: "₦100,000", status: "Paid" },
            ].map((row) => (
              <tr key={row.date} className="border-t">
                <td className="py-2">{row.date}</td>
                <td className="py-2">{row.amount}</td>
                <td className="py-2">
                  <span className="badge">{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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


