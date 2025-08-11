export default function MortgageEducationPage() {
  return (
    <div className="container-max py-8">
      <h1 className="text-3xl font-bold">Mortgage Education Center</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="font-semibold mb-2">Mortgage Basics</div>
          <ul className="list-disc ml-5 text-sm text-slate-600 space-y-1">
            <li>Mortgage 101</li>
            <li>Understanding interest rates</li>
            <li>Glossary of terms</li>
          </ul>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">Types of Mortgages</div>
          <ul className="list-disc ml-5 text-sm text-slate-600 space-y-1">
            <li>Conventional, FHA, VA</li>
            <li>NHF vs Commercial</li>
            <li>Fixed vs Adjustable</li>
          </ul>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">Financial Planning</div>
          <ul className="list-disc ml-5 text-sm text-slate-600 space-y-1">
            <li>Affordability calculators</li>
            <li>Down payment strategies</li>
            <li>Debt-to-income optimization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


