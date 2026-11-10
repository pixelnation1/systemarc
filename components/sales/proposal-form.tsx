import Link from "next/link";
import { saveProposalAction } from "@/app/sales/proposals/actions";
import { defaultTerms, type SalesProposal } from "@/lib/sales/proposals";
import { formatExactMoney, type SalesOpportunity } from "@/lib/sales/model";
import { inputClass,labelClass } from "@/components/sales/shell";

export function ProposalEditor({lead,proposal}:{lead:SalesOpportunity;proposal?:SalesProposal}) {
  const defaults=proposal?.line_items?.length?proposal.line_items:[
    {description:lead.service==="Website"?"Business website design and development":"Project services",quantity:1,unit_cents:lead.estimated_value_cents||0}
  ];
  const fields=[
    {name:"overview",label:"Project overview",rows:4,value:proposal?.overview??lead.summary,placeholder:"Describe the client's challenge and the solution SystemArc proposes"},
    {name:"deliverables",label:"Scope and deliverables",rows:5,value:proposal?.deliverables??"",placeholder:"What will be built, delivered, or configured? Specify page counts, integrations, etc."},
    {name:"timeline",label:"Estimated timeline and milestones",rows:3,value:proposal?.timeline??"",placeholder:"Example: Discovery, first review, revision and launch; agreed after deposit"},
    {name:"exclusions",label:"Exclusions / client responsibilities",rows:3,value:proposal?.exclusions??"",placeholder:"Content, credentials, hosting, extra revisions or third-party fees, if not included"},
    {name:"terms",label:"Payment and scope terms",rows:5,value:proposal?.terms??defaultTerms,placeholder:"Deposit, balance, change requests and acceptance terms"}
  ] as const;
  return <form action={saveProposalAction} className="mt-7 border border-steel bg-graphite p-5 sm:p-8">
    <input type="hidden" name="lead_id" value={lead.id}/>
    {proposal&&<input type="hidden" name="proposal_id" value={proposal.id}/>}
    <div><label className={labelClass} htmlFor="proposal-title">Proposal title *</label>
      <input className={inputClass} id="proposal-title" name="title" required maxLength={160} defaultValue={proposal?.title??(lead.service==="Website"?"Business website project for "+lead.company_name:lead.service+" project for "+lead.company_name)}/></div>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      <div><label className={labelClass} htmlFor="proposal-deposit">Deposit percentage</label><input type="number" min={0} max={100} step={1} id="proposal-deposit" name="deposit_percent" className={inputClass} required defaultValue={proposal?.deposit_percent??50}/></div>
      <div><label className={labelClass} htmlFor="proposal-expiry">Proposal valid until (optional)</label><input type="date" name="valid_until" id="proposal-expiry" className={inputClass} defaultValue={proposal?.valid_until??""}/></div>
    </div>
    <div className="mt-7 border-t border-steel pt-7"><h2 className="font-serif text-2xl">Line items</h2><p className="mt-2 text-sm text-silver">Add at least one priced service. Up to eight line items; leave unused rows blank.</p>
      <div className="mt-5 space-y-4">{Array.from({length:8},(_,i)=>{
        const item=defaults[i];
        return <div key={i} className="grid gap-3 border-b border-steel pb-4 sm:grid-cols-[minmax(0,1fr)_80px_140px]">
          <div><label htmlFor={"item-desc-"+i} className="text-xs text-silver">Service {i+1}</label><input className={inputClass} id={"item-desc-"+i} name={"item_description_"+i} maxLength={160} defaultValue={item?.description??""} placeholder="Service or deliverable"/></div>
          <div><label htmlFor={"item-qty-"+i} className="text-xs text-silver">Quantity</label><input type="number" min={1} max={100} className={inputClass} id={"item-qty-"+i} name={"item_qty_"+i} defaultValue={item?.quantity??""}/></div>
          <div><label htmlFor={"item-price-"+i} className="text-xs text-silver">Unit price (USD)</label><input inputMode="decimal" className={inputClass} id={"item-price-"+i} name={"item_price_"+i} defaultValue={item?.unit_cents?formatExactMoney(item.unit_cents):""} placeholder="1499.00"/></div>
        </div>;
      })}</div></div>
    <div className="mt-7 space-y-6">{fields.map(field=><div key={field.name}><label htmlFor={"proposal-"+field.name} className={labelClass}>{field.label}</label><textarea className={inputClass} id={"proposal-"+field.name} name={field.name} rows={field.rows} defaultValue={field.value} placeholder={field.placeholder}/></div>)}</div>
    <p className="mt-7 text-sm text-silver">Saving creates a private draft. Nothing is emailed to the client until you explicitly approve and send it from the preview page.</p>
    <div className="mt-6 flex flex-wrap gap-4"><button type="submit" className="inline-flex min-h-12 items-center justify-center bg-warm-white px-6 font-medium text-carbon hover:bg-electric-cobalt">Save draft proposal →</button>
      <Link href={proposal?"/sales/proposals/"+proposal.id:"/sales/lead/"+lead.id} className="inline-flex min-h-12 items-center text-sm text-silver underline underline-offset-4">Cancel</Link></div>
  </form>;
}
