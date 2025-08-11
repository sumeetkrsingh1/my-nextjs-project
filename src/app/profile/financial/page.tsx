export const runtime = 'edge';

export default function FinancialProfilePage() {
  return (
    <div className="container-max py-8">
      <h1 className="text-3xl font-bold">Financial Profile</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="font-semibold">Overview</div>
          <div className="text-sm text-slate-600">Credit score: 710 • Pre-approval: Draft</div>
        </div>
        <div className="card p-4">
          <div className="font-semibold">Linked Accounts</div>
          <div className="text-sm text-slate-600">2 bank accounts • Auto-pay enabled</div>
        </div>
        <div className="card p-4">
          <div className="font-semibold">Loan Applications</div>
          <div className="text-sm text-slate-600">1 active • 2 historical</div>
        </div>
      </div>
    </div>
  );
}


