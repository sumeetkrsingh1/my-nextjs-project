"use client";
import { useState } from "react";
export const runtime = 'edge';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export default function RentApplyPage() {
  const [step, setStep] = useState<Step>(1);

  return (
    <div className="container-max py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Rent Financing Application</h1>
        <div className="text-sm text-slate-600">Step {step} of 6</div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
        <div className="card p-4">
          {step === 1 && <StepOne onNext={()=>setStep(2)} />}
          {step === 2 && <StepTwo onPrev={()=>setStep(1)} onNext={()=>setStep(3)} />}
          {step === 3 && <StepThree onPrev={()=>setStep(2)} onNext={()=>setStep(4)} />}
          {step === 4 && <StepFour onPrev={()=>setStep(3)} onNext={()=>setStep(5)} />}
          {step === 5 && <StepFive onPrev={()=>setStep(4)} onNext={()=>setStep(6)} />}
          {step === 6 && <StepSix onPrev={()=>setStep(5)} />}
        </div>
        <aside className="card p-4">
          <div className="font-semibold mb-2">Requirements</div>
          <ul className="list-disc ml-5 text-sm text-slate-600 space-y-1">
            <li>BVN verification</li>
            <li>Valid ID</li>
            <li>Proof of income</li>
          </ul>
          <div className="mt-4 text-xs text-slate-500">Processing time: 24–48 hours</div>
        </aside>
      </div>
    </div>
  );
}

function StepOne({ onNext }: { onNext: ()=>void }) {
  return (
    <div className="space-y-3">
      <div className="font-semibold">Personal Information</div>
      <Grid2>
        <Input label="Full name" />
        <Input label="Email" type="email" />
      </Grid2>
      <Grid3>
        <Input label="Phone" />
        <Input label="Date of birth" type="date" />
        <Input label="BVN" />
      </Grid3>
      <Grid2>
        <Select label="Employment status" options={["Employed","Self-employed","Student","Other"]} />
        <Input label="Monthly income (₦)" type="number" />
      </Grid2>
      <div className="pt-2 flex justify-end">
        <button className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-md" onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

function StepTwo({ onPrev, onNext }: { onPrev: ()=>void; onNext: ()=>void }) {
  return (
    <div className="space-y-3">
      <div className="font-semibold">Property Information</div>
      <Input label="Property address" />
      <Grid3>
        <Input label="Rent amount (₦)" type="number" />
        <Select label="Lease term" options={["6 months","12 months","24 months"]} />
        <Input label="Move-in date" type="date" />
      </Grid3>
      <Grid2>
        <Input label="Landlord name" />
        <Input label="Landlord phone" />
      </Grid2>
      <div className="pt-2 flex justify-between">
        <button className="px-4 py-2 rounded-md bg-slate-100" onClick={onPrev}>Back</button>
        <button className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-md" onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

function StepThree({ onPrev, onNext }: { onPrev: ()=>void; onNext: ()=>void }) {
  return (
    <div className="space-y-3">
      <div className="font-semibold">Financial Information</div>
      <Grid3>
        <Input label="Bank name" />
        <Input label="Account number" />
        <Input label="BVN (for bank link)" />
      </Grid3>
      <Grid2>
        <Input label="Other loan obligations (₦)" type="number" />
        <Input label="Monthly expenses (₦)" type="number" />
      </Grid2>
      <div className="pt-2 flex justify-between">
        <button className="px-4 py-2 rounded-md bg-slate-100" onClick={onPrev}>Back</button>
        <button className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-md" onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

function StepFour({ onPrev, onNext }: { onPrev: ()=>void; onNext: ()=>void }) {
  return (
    <div className="space-y-3">
      <div className="font-semibold">Document Upload</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <File label="Bank statements (last 3 months)" />
        <File label="Pay slips (last 2 months)" />
        <File label="Employment letter" />
        <File label="Previous rent receipts" />
      </div>
      <div className="pt-2 flex justify-between">
        <button className="px-4 py-2 rounded-md bg-slate-100" onClick={onPrev}>Back</button>
        <button className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-md" onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

function StepFive({ onPrev, onNext }: { onPrev: ()=>void; onNext: ()=>void }) {
  return (
    <div className="space-y-3">
      <div className="font-semibold">Credit Check Authorization</div>
      <label className="flex items-start gap-2 text-sm text-slate-600">
        <input type="checkbox" className="mt-1" />
        <span>I consent to a credit check and agree to the terms and privacy policy.</span>
      </label>
      <div className="pt-2 flex justify-between">
        <button className="px-4 py-2 rounded-md bg-slate-100" onClick={onPrev}>Back</button>
        <button className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-md" onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

function StepSix({ onPrev }: { onPrev: ()=>void }) {
  return (
    <div className="space-y-3">
      <div className="font-semibold">Review & Submit</div>
      <div className="text-sm text-slate-600">Please review your information before submitting.</div>
      <div className="pt-2 flex justify-between">
        <button className="px-4 py-2 rounded-md bg-slate-100" onClick={onPrev}>Back</button>
        <button className="bg-[var(--brand-primary)] text-white px-4 py-2 rounded-md">Submit Application</button>
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


