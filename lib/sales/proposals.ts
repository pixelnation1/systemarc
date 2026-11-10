import "server-only";
import type { SalesOpportunity } from "@/lib/sales/model";

export type ProposalLine = { description:string; quantity:number; unit_cents:number };
export type SalesProposal = {
  id:string; number:number; opportunity_id:string; title:string; overview:string;
  deliverables:string; timeline:string; exclusions:string; terms:string;
  line_items:ProposalLine[]; subtotal_cents:number; deposit_percent:number;
  valid_until:string|null; status:"draft"|"sending"|"sent"|"accepted"|"declined";
  sent_at:string|null; sent_to:string|null; created_at:string; updated_at:string;
};
export const defaultTerms = "A 50% deposit is due before work begins unless otherwise agreed in writing. The balance is due on project completion. Any work outside the agreed scope is quoted separately. Hosting, domains, third-party subscriptions, and taxes (if applicable) are additional unless explicitly listed. This proposal is not a binding agreement until both parties approve the final scope and terms.";
export function proposalMoney(cents:number) {
  return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(cents/100);
}
export function proposalDeposit(subtotal:number,percent:number) {
  return Math.round((subtotal * percent)/100);
}
export function proposalRef(number:number) { return "SA-" + String(number).padStart(5,"0"); }
export function validUuid(value:string) {return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);}
function bounded(form:FormData,key:string,max:number) {
  const v=form.get(key);
  return typeof v==="string" && v.length<=max ? v.trim() : null;
}
function moneyCents(value:string|null):number|null {
  if (!value || !/^(?:0|[1-9][0-9]{0,7})(?:\.[0-9]{1,2})?$/.test(value)) return null;
  const parts=value.split(".");
  return Number(parts[0])*100+Number((parts[1]||"").padEnd(2,"0"));
}
function dateOk(value:string|null):string|null|false {
  if (!value) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const parsed=new Date(value+"T12:00:00Z");
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0,10)===value?value:false;
}
export function parseProposalForm(form:FormData) {
  const title=bounded(form,"title",160);
  const overview=bounded(form,"overview",3500);
  const deliverables=bounded(form,"deliverables",4500);
  const timeline=bounded(form,"timeline",1500);
  const exclusions=bounded(form,"exclusions",1500);
  const terms=bounded(form,"terms",3000);
  const depositRaw=bounded(form,"deposit_percent",3);
  const valid_until=dateOk(bounded(form,"valid_until",10));
  if (!title || title.length<3 || overview===null || deliverables===null || timeline===null ||
      exclusions===null || terms===null || valid_until===false ||
      depositRaw===null || !/^(100|[1-9]?\d)$/.test(depositRaw)) return null;
  const deposit_percent=Number(depositRaw);
  const line_items:ProposalLine[]=[];
  for(let i=0;i<8;i++){
    const description=bounded(form,"item_description_"+i,160);
    const unit=bounded(form,"item_price_"+i,16);
    const qty=bounded(form,"item_qty_"+i,3);
    if(description===null || unit===null || qty===null) return null;
    if(!description && !unit && !qty) continue;
    if(!description || !unit || !qty || !/^([1-9]|[1-9]\d|100)$/.test(qty)) return null;
    const unit_cents=moneyCents(unit);
    if(unit_cents===null)return null;
    line_items.push({description,quantity:Number(qty),unit_cents});
  }
  if(line_items.length<1)return null;
  const subtotal_cents=line_items.reduce((sum,item)=>sum+item.quantity*item.unit_cents,0);
  if(subtotal_cents>9999999999)return null;
  return {title,overview,deliverables,timeline,exclusions,terms,line_items,subtotal_cents,deposit_percent,valid_until};
}
export function escapeHtml(value:string) {
  return value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]||char));
}
export function proposalEmail(proposal:SalesProposal,lead:Pick<SalesOpportunity,"company_name"|"contact_name">) {
  const total=proposalMoney(proposal.subtotal_cents),deposit=proposalMoney(proposalDeposit(proposal.subtotal_cents,proposal.deposit_percent));
  const details=proposal.line_items.map(x=>x.description+" — "+x.quantity+" × "+proposalMoney(x.unit_cents)+" = "+proposalMoney(x.quantity*x.unit_cents)).join("\n");
  const text=["Hello "+lead.contact_name+",","","Thank you for considering SystemArc. Here is our proposal for "+lead.company_name+".",
    "",proposal.title,"Reference: "+proposalRef(proposal.number),"",
    "OVERVIEW",proposal.overview || "Project overview to be confirmed.","",
    "DELIVERABLES",proposal.deliverables || "As detailed in the line items.","",
    "ITEMS",details,"","TOTAL",total,"Deposit ("+proposal.deposit_percent+"%): "+deposit,
    proposal.valid_until?"Valid through: "+proposal.valid_until:"",
    "","ESTIMATED TIMELINE",proposal.timeline||"To be agreed.","",
    "EXCLUSIONS",proposal.exclusions||"Only the items listed above are included.","",
    "TERMS",proposal.terms,"",
    "Please reply to this email if you would like to discuss any part of this proposal. No payment is requested through this email.",
    "","SystemArc","support@systemarchq.com"].filter(x=>x!==null).join("\n");
  const html='<div style="font-family:Arial,sans-serif;color:#142037;max-width:680px;margin:auto;line-height:1.65">' +
    '<p style="font-size:14px;letter-spacing:2px;color:#3a6fb6">SYSTEMARC / PROJECT PROPOSAL</p>'+
    '<h1 style="font-size:30px">'+escapeHtml(proposal.title)+'</h1>'+
    '<p>Hello '+escapeHtml(lead.contact_name)+',</p><p>Thank you for considering SystemArc. Here is our proposal for '+escapeHtml(lead.company_name)+'.</p>'+
    '<p>Reference: '+escapeHtml(proposalRef(proposal.number))+'</p>'+
    ['OVERVIEW','DELIVERABLES','ESTIMATED TIMELINE','EXCLUSIONS','TERMS'].map((heading,i)=>{
      const val=[proposal.overview,proposal.deliverables,proposal.timeline,proposal.exclusions,proposal.terms][i];
      return '<h2 style="font-size:17px;margin-top:28px">'+heading+'</h2><p style="white-space:pre-wrap">'+escapeHtml(val||"To be confirmed.")+'</p>';
    }).join('')+
    '<h2 style="font-size:17px;margin-top:28px">Project investment</h2>'+
    '<table style="width:100%;border-collapse:collapse">'+proposal.line_items.map(item=>'<tr><td style="padding:8px 0;border-bottom:1px solid #ddd">'+escapeHtml(item.description)+'</td><td style="text-align:right;border-bottom:1px solid #ddd">'+item.quantity+' × '+proposalMoney(item.unit_cents)+'</td></tr>').join('')+'</table>'+
    '<p><strong>Total: '+total+'</strong><br>Deposit ('+proposal.deposit_percent+'%): '+deposit+'</p>'+
    (proposal.valid_until?'<p>Valid through '+escapeHtml(proposal.valid_until)+'</p>':'')+
    '<p style="margin-top:28px">Please reply with any questions. This proposal is not a binding contract until the final terms are approved.</p><p>SystemArc</p></div>';
  return {subject:"SystemArc Proposal "+proposalRef(proposal.number)+" — "+proposal.title, text, html};
}
