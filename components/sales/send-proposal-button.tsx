"use client";
export function SendProposalButton({recipient}:{recipient:string}){
  return <button type="submit" onClick={event=>{
    if(!window.confirm("Email this proposal to "+recipient+"? It will be sent immediately, and the proposal will be locked."))event.preventDefault();
  }} className="inline-flex min-h-11 items-center bg-warm-white px-5 text-sm font-semibold text-carbon hover:bg-electric-cobalt">Send proposal by email →</button>;
}
