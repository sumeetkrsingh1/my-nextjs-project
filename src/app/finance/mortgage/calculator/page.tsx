"use client";
import { useMemo, useState } from "react";
import { calculateMortgage, formatCurrency, loanTypes, LoanProgram } from "@/lib/mockData";
import Link from "next/link";
export const runtime = 'experimental-edge';
export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(25_000_000);
  const [downPayment, setDownPayment] = useState(5_000_000);
  const [termYears, setTermYears] = useState(25);
  const [rate, setRate] = useState(3.5);
  const [taxYearly, setTaxYearly] = useState(250_000);
  const [insuranceYearly, setInsuranceYearly] = useState(180_000);
  const [pmiMonthly, setPmiMonthly] = useState(0);
  const [showAmortization, setShowAmortization] = useState(false);

  const result = useMemo(
    () =>
      calculateMortgage(
        homePrice,
        downPayment,
        rate,
        termYears,
        taxYearly,
        insuranceYearly,
        pmiMonthly
      ),
    [homePrice, downPayment, rate, termYears, taxYearly, insuranceYearly, pmiMonthly]
  );

  const loanAmount = homePrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const totalMonths = termYears * 12;

  // Calculate affordability
  const maxAffordablePayment = homePrice * 0.28 / 12; // 28% rule
  const isAffordable = result.totalMonthly <= maxAffordablePayment;

  // Generate amortization schedule (first 12 months)
  const amortizationSchedule = useMemo(() => {
    const schedule = [];
    let remainingBalance = loanAmount;
    
    for (let month = 1; month <= Math.min(12, totalMonths); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = result.principalAndInterest - interestPayment;
      remainingBalance -= principalPayment;
      
      schedule.push({
        month,
        principalPayment,
        interestPayment,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }
    return schedule;
  }, [loanAmount, monthlyRate, result.principalAndInterest, totalMonths]);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen">
      <div className="container-max py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Mortgage Calculator</h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Calculate your monthly payments, explore loan options, and understand what you can afford with our comprehensive mortgage calculator.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="xl:col-span-2 space-y-6">
            <div className="card p-6 animate-fade-in-up">
              <Section title="Loan Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <NumberField 
                    label="Home Price" 
                    value={homePrice} 
                    setValue={setHomePrice} 
                    step={100000}
                    prefix="₦"
                    tooltip="The total purchase price of the home"
                  />
                  <NumberField 
                    label="Down Payment" 
                    value={downPayment} 
                    setValue={setDownPayment} 
                    step={100000}
                    prefix="₦"
                    tooltip="The amount you pay upfront (typically 10-20%)"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <LabeledInput label="Loan Term" tooltip="The length of your mortgage">
                    <select 
                      className="input-field" 
                      value={termYears} 
                      onChange={(e)=>setTermYears(Number(e.target.value))}
                    >
                      {[15,20,25,30].map(y => <option key={y} value={y}>{y} years</option>)}
                    </select>
                  </LabeledInput>
                  
                  <NumberField 
                    label="Interest Rate" 
                    value={rate} 
                    setValue={setRate} 
                    step={0.1}
                    suffix="%"
                    tooltip="Annual percentage rate (APR)"
                  />
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-900 mb-2">Loan Summary</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Loan Amount:</span>
                      <div className="font-semibold text-blue-900">{formatCurrency(loanAmount)}</div>
                    </div>
                    <div>
                      <span className="text-blue-700">Down Payment %:</span>
                      <div className="font-semibold text-blue-900">{((downPayment/homePrice)*100).toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              </Section>
            </div>

            <div className="card p-6 animate-fade-in-up">
              <Section title="Property Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <NumberField 
                    label="Property Tax (yearly)" 
                    value={taxYearly} 
                    setValue={setTaxYearly} 
                    step={10000}
                    prefix="₦"
                    tooltip="Annual property tax amount"
                  />
                  <NumberField 
                    label="Home Insurance (yearly)" 
                    value={insuranceYearly} 
                    setValue={setInsuranceYearly} 
                    step={10000}
                    prefix="₦"
                    tooltip="Annual home insurance premium"
                  />
                </div>
                
                <NumberField 
                  label="PMI (monthly)" 
                  value={pmiMonthly} 
                  setValue={setPmiMonthly} 
                  step={1000}
                  prefix="₦"
                  tooltip="Private Mortgage Insurance (required if down payment < 20%)"
                />
              </Section>
            </div>

            {/* Loan Type Comparison */}
            <div className="card p-6 animate-fade-in-up">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Available Loan Programs</h3>
              <p className="text-xs text-slate-600 mb-4">Tap a card to learn the plain-english meaning.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loanTypes.map((loan: LoanProgram) => (
                  <details key={loan.key} className="border rounded-lg p-4 group">
                    <summary className="font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                      <span>{loan.key}</span>
                      <span className="text-xs text-emerald-700 group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <div className="mt-2 text-sm text-slate-700">
                      <div className="mb-2 text-slate-800">{loan.friendly}</div>
                      <div className="space-y-1">
                        <div>Down Payment: <span className="font-medium text-slate-900">{loan.downPayment}</span></div>
                        <div>Credit Score: <span className="font-medium text-slate-900">{loan.creditScore}</span></div>
                        <div>Max Amount: <span className="font-medium text-slate-900">{loan.maxAmount}</span></div>
                        <div>Interest Rate: <span className="font-medium text-slate-900">{loan.interestRate}</span></div>
                        <div>Terms: <span className="font-medium text-slate-900">{loan.terms}</span></div>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Monthly Payment Breakdown */}
            <div className="card p-6 animate-fade-in-up sticky top-[88px]">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  {formatCurrency(Math.round(result.totalMonthly))}
                </div>
                <div className="text-sm text-slate-600">Monthly Payment</div>
              </div>

              <div className="space-y-3 mb-6">
                <PaymentRow 
                  label="Principal & Interest" 
                  value={result.principalAndInterest}
                  icon="🏠"
                />
                <PaymentRow 
                  label="Property Tax" 
                  value={result.taxMonthly}
                  icon="🏛️"
                />
                <PaymentRow 
                  label="Home Insurance" 
                  value={result.insuranceMonthly}
                  icon="🛡️"
                />
                {result.pmiMonthly > 0 && (
                  <PaymentRow 
                    label="PMI" 
                    value={result.pmiMonthly}
                    icon="📋"
                  />
                )}
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-900">Total Monthly</div>
                    <div className="font-bold text-2xl text-emerald-600">
                      {formatCurrency(Math.round(result.totalMonthly))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Affordability Indicator */}
              <div className={`p-3 rounded-lg mb-4 ${isAffordable ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{isAffordable ? '✅' : '⚠️'}</span>
                  <div>
                    <div className={`font-medium ${isAffordable ? 'text-green-800' : 'text-orange-800'}`}>
                      {isAffordable ? 'Within Budget' : 'High Payment'}
                    </div>
                    <div className={`text-xs ${isAffordable ? 'text-green-600' : 'text-orange-600'}`}>
                      {isAffordable ? 'Payment is within recommended 28% of income' : 'Consider a lower price or larger down payment'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Link 
                  href="/finance/mortgage/prequalify" 
                  className="btn btn-primary btn-lg w-full text-center"
                >
                  Get Pre-Approved Now
                </Link>
                <button className="btn btn-secondary btn-md w-full">
                  Save Calculation
                </button>
                <button 
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="btn btn-secondary btn-sm w-full"
                >
                  {showAmortization ? 'Hide' : 'Show'} Payment Schedule
                </button>
              </div>
            </div>

            {/* Key Statistics */}
            <div className="card p-6 animate-fade-in-up">
              <h3 className="font-bold text-slate-900 mb-4">Loan Statistics</h3>
              <div className="space-y-3 text-sm">
                <StatRow 
                  label="Total of Payments" 
                  value={formatCurrency(result.totalMonthly * totalMonths)}
                />
                <StatRow 
                  label="Total Interest Paid" 
                  value={formatCurrency((result.principalAndInterest * totalMonths) - loanAmount)}
                />
                <StatRow 
                  label="Loan-to-Value Ratio" 
                  value={`${((loanAmount/homePrice)*100).toFixed(1)}%`}
                />
                <StatRow 
                  label="Monthly Income Needed" 
                  value={formatCurrency(Math.round(result.totalMonthly / 0.28))}
                  tooltip="Based on 28% debt-to-income ratio"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Schedule */}
        {showAmortization && (
          <div className="mt-8 card p-6 animate-fade-in-up">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Schedule (First 12 Months)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-slate-50">
                    <th className="text-left p-3">Month</th>
                    <th className="text-right p-3">Principal</th>
                    <th className="text-right p-3">Interest</th>
                    <th className="text-right p-3">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationSchedule.map((payment) => (
                    <tr key={payment.month} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-medium">{payment.month}</td>
                      <td className="p-3 text-right text-green-600 font-medium">
                        {formatCurrency(payment.principalPayment)}
                      </td>
                      <td className="p-3 text-right text-orange-600 font-medium">
                        {formatCurrency(payment.interestPayment)}
                      </td>
                      <td className="p-3 text-right font-medium">
                        {formatCurrency(payment.remainingBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-xs text-slate-600">
              * This shows the first 12 months of your {termYears}-year loan
            </div>
          </div>
        )}

        {/* Additional Resources */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-center animate-fade-in-up">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-slate-900 mb-2">Market Rates</h3>
            <p className="text-sm text-slate-600 mb-4">
              Compare current mortgage rates from multiple lenders
            </p>
            <Link href="/finance/rates" className="btn btn-secondary btn-sm">
              View Rates
            </Link>
          </div>
          
          <div className="card p-6 text-center animate-fade-in-up">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="font-bold text-slate-900 mb-2">Mortgage Guide</h3>
            <p className="text-sm text-slate-600 mb-4">
              Learn about different loan types and the home buying process
            </p>
            <Link href="/finance/mortgage/education" className="btn btn-secondary btn-sm">
              Learn More
            </Link>
          </div>
          
          <div className="card p-6 text-center animate-fade-in-up">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-bold text-slate-900 mb-2">Talk to Expert</h3>
            <p className="text-sm text-slate-600 mb-4">
              Get personalized advice from our mortgage specialists
            </p>
            <Link href="/help" className="btn btn-secondary btn-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-bold text-slate-700 mb-4 tracking-wider">{title.toUpperCase()}</div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function LabeledInput({ 
  label, 
  children, 
  tooltip 
}: { 
  label: string; 
  children: React.ReactNode; 
  tooltip?: string;
}) {
  return (
    <label className="block w-full">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
        {label}
        {tooltip && (
          <div className="group relative">
            <span className="text-slate-400 cursor-help">ℹ️</span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      {children}
    </label>
  );
}

function NumberField({ 
  label, 
  value, 
  setValue, 
  step, 
  prefix, 
  suffix, 
  tooltip 
}: { 
  label: string; 
  value: number; 
  setValue: (n:number)=>void; 
  step?: number;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
}) {
  return (
    <LabeledInput label={label} tooltip={tooltip}>
      {prefix || suffix ? (
        <div className="flex w-full">
          {prefix && (
            <span className="inline-flex items-center px-3 bg-slate-50 text-slate-700 border border-slate-300 rounded-l-md select-none">
              {prefix}
            </span>
          )}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={`input-field tabular-nums flex-1 ${prefix ? 'rounded-l-none border-l-0' : ''} ${suffix ? 'rounded-r-none border-r-0' : ''}`}
            value={Number.isFinite(value) ? String(value) : ''}
            onChange={(e)=>{
              const cleaned = e.target.value.replace(/[^0-9.]/g, "");
              const numeric = cleaned === '' ? 0 : Number(cleaned);
              setValue(numeric);
            }}
          />
          {suffix && (
            <span className="inline-flex items-center px-3 bg-slate-50 text-slate-700 border border-slate-300 rounded-r-md select-none">
              {suffix}
            </span>
          )}
        </div>
      ) : (
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="input-field tabular-nums"
          value={Number.isFinite(value) ? String(value) : ''}
          onChange={(e)=>{
            const cleaned = e.target.value.replace(/[^0-9.]/g, "");
            const numeric = cleaned === '' ? 0 : Number(cleaned);
            setValue(numeric);
          }}
        />
      )}
    </LabeledInput>
  );
}

function PaymentRow({ 
  label, 
  value, 
  icon 
}: { 
  label: string; 
  value: number; 
  icon: string; 
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="font-medium text-slate-700">{label}</span>
      </div>
      <span className="font-bold text-slate-900">{formatCurrency(Math.round(value))}</span>
    </div>
  );
}

function StatRow({ 
  label, 
  value, 
  tooltip 
}: { 
  label: string; 
  value: string; 
  tooltip?: string; 
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-slate-600">{label}</span>
        {tooltip && (
          <div className="group relative">
            <span className="text-slate-400 cursor-help text-xs">ℹ️</span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}


