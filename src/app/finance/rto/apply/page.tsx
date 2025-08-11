"use client";
import { useState } from "react";
export const runtime = 'edge';

export default function RTOApplyPage() {
  const [step, setStep] = useState(1);
  return (
    <div className="container-max py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Apply for Rent-to-Own</h1>
        <div className="text-sm text-slate-600">Step {step} of 5</div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
        <div className="card p-4">
          {step === 1 && (
            <div className="space-y-3">
              <div className="font-semibold">Personal Information</div>
              <Grid2>
                <Input label="Full name" />
                <Input label="Email" />
              </Grid2>
              <Grid3>
                <Input label="Phone" />
                <Input label="Employment" />
                <Input label="Monthly income (₦)" type="number" />
              </Grid3>
              <Nav onPrev={null} onNext={()=>setStep(2)} />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3">
              <div className="font-semibold">Financial Assessment</div>
              <Grid3>
                <Input label="Bank" />
                <Input label="Account number" />
                <Input label="Credit score (range)" />
              </Grid3>
              <Nav onPrev={()=>setStep(1)} onNext={()=>setStep(3)} />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-3">
              <div className="font-semibold">RTO Terms</div>
              <Grid2>
                <Select label="Timeline" options={["3 years","5 years","7 years","10 years"]} />
                <Input label="Down payment (₦)" type="number" />
              </Grid2>
              <Nav onPrev={()=>setStep(2)} onNext={()=>setStep(4)} />
            </div>
          )}
          {step === 4 && (
            <div className="space-y-3">
              <div className="font-semibold">Documents</div>
              <Grid2>
                <File label="Income documents" />
                <File label="Bank statements" />
              </Grid2>
              <Nav onPrev={()=>setStep(3)} onNext={()=>setStep(5)} />
            </div>
          )}
          {step === 5 && (
            <div className="space-y-3">
              <div className="font-semibold">Review & Submit</div>
              <div className="text-sm text-slate-600">Please confirm your details.</div>
              <div className="pt-2 flex justify-between">
                <button className="px-4 py-2 rounded-md bg-slate-100" onClick={()=>setStep(4)}>Back</button>
                <button className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-md">Submit</button>
              </div>
            </div>
          )}
        </div>
        <aside className="card p-4">
          <div className="font-semibold mb-2">What happens next</div>
          <div className="text-sm text-slate-600">We’ll review your application and reach out within 24–48 hours.</div>
        </aside>
      </div>
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>;
}
function Grid3({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-3">{children}</div>;
}
function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="text-sm w-full">
      <div className="text-slate-600 mb-1">{label}</div>
      <input className="border rounded-md px-3 py-2 w-full" type={type} />
    </label>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="text-sm w-full">
      <div className="text-slate-600 mb-1">{label}</div>
      <select className="border rounded-md px-3 py-2 w-full">{options.map(o => <option key={o}>{o}</option>)}</select>
    </label>
  );
}
function File({ label }: { label: string }) {
  return (
    <label className="text-sm w-full">
      <div className="text-slate-600 mb-1">{label}</div>
      <input className="border rounded-md px-3 py-2 w-full" type="file" />
    </label>
  );
}
function Nav({ onPrev, onNext }: { onPrev: null | (()=>void); onNext: ()=>void }) {
  return (
    <div className="pt-2 flex justify-between">
      <button className="px-4 py-2 rounded-md bg-slate-100" onClick={()=>onPrev && onPrev()} disabled={!onPrev}>Back</button>
      <button className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-md" onClick={onNext}>Next</button>
    </div>
  );
}


