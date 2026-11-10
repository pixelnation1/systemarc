"use client";
export function PrintProposalButton(){
  return <button type="button" onClick={()=>window.print()} className="inline-flex min-h-11 items-center border border-steel px-5 text-sm font-semibold hover:border-electric-cobalt">Print / Save as PDF</button>;
}
