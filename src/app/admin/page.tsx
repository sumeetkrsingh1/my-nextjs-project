export const runtime = 'experimental-edge';
export default function AdminPage() {
  return (
    <div className="container-max py-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Users" value="12,540" />
        <Card title="Active Listings" value="1,236" />
        <Card title="Loan Applications" value="178" />
        <Card title="Revenue (mo)" value="₦12.5M" />
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


