"use client";
import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { submitProjectInquiry } from "@/app/start-a-project/actions";
import { emptyInquiryDraft, type InquiryDraft } from "@/lib/inquiry/model";

const planOptions=[{value:"launch",label:"Launch website — from $999"},{value:"business-pro",label:"Business Pro — from $1,999"},{value:"unsure",label:"Not sure / something custom"}] as const;
const fieldStyle="mt-2 block w-full min-h-12 rounded-md border border-steel bg-carbon px-4 py-3 text-warm-white placeholder:text-silver/70 focus:border-electric-cobalt focus:outline-none focus:ring-1 focus:ring-electric-cobalt";
const labelStyle="block text-sm font-medium text-warm-white";
const planLabel=(value:string)=>planOptions.find(x=>x.value===value)?.label??planOptions[2].label;
export function WebsiteQuoteForm({selectedPackage}:{selectedPackage:string}) {
 const initial=planOptions.some(p=>p.value===selectedPackage)?selectedPackage:"unsure";
 const [values,setValues]=useState({name:"",email:"",phone:"",company:"",businessDescription:"",website:"",plan:initial,goals:"",timeline:""});
 const [honeypot,setHoneypot]=useState("");
 const [error,setError]=useState("");
 const [delivery,setDelivery]=useState<"webhook"|"log"|"discarded"|null>(null);
 const [pending,startTransition]=useTransition();
 const update=(key:keyof typeof values,value:string)=>setValues(old=>({...old,[key]:value}));
 function submit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault();setError("");
  const draft:InquiryDraft=emptyInquiryDraft();
  draft.contact={name:values.name.trim(),email:values.email.trim(),phone:values.phone.trim(),preferredContact:values.phone.trim()?"Either":"Email"};
  draft.company={name:values.company.trim(),description:values.businessDescription.trim().length>=10?values.businessDescription.trim():`Website quote request for ${values.company.trim()}. ${values.businessDescription.trim()||"Business website services."}`,type:"Other",size:""};
  draft.problem={description:`Website quote requested: ${planLabel(values.plan)}. ${values.goals.trim()||"A professional website that helps customers reach the business."}`,currentProcess:values.website.trim()?`Current website: ${values.website.trim()}`:"No current website supplied.",affectedUsers:[],frequency:""};
  draft.systems={currentTools:values.website.trim(),manualDataMovement:"",keepExisting:"",systemsToKeep:""};
  draft.project={desiredOutcome:`Create or improve the business website for ${values.company.trim()}. ${values.goals.trim()||"Make services clear and help customers get in touch."}`,solutionAwareness:"Somewhat",areas:["Website / Ecommerce"],timeline:values.timeline as InquiryDraft["project"]["timeline"],budget:""};
  startTransition(async()=>{
   try{const result=await submitProjectInquiry({draft,honeypot,referrer:document.referrer});
    if(!result.ok){setError(result.code==="validation"?Object.values(result.fieldErrors).join(" ")||result.message:result.message);return}
    if(result.delivery==="log"){setError("The request was logged but was not confirmed delivered for follow-up. Please email support@systemarchq.com.");return}
    setDelivery(result.delivery);
   }catch{setError("We couldn't send the request. Please email support@systemarchq.com.");}
  });
 }
 if(delivery) return <div role="status" className="self-start border border-steel bg-graphite p-8 sm:p-10"><p className="font-mono text-xs uppercase tracking-widest text-electric-cobalt">Website inquiry</p><h2 className="mt-4 font-serif text-3xl text-warm-white">Thanks for reaching out.</h2><p className="mt-5 leading-7 text-silver">Your website request has been submitted. We'll review the details and follow up about the right scope and next steps.</p><Link className="mt-7 inline-block text-warm-white underline underline-offset-8" href="/portfolio">See more SystemArc work →</Link></div>;
 return <form onSubmit={submit} className="self-start border border-steel bg-graphite p-6 sm:p-9">
  <h2 className="font-serif text-2xl text-warm-white">Tell us about your website</h2><p className="mt-2 text-sm text-silver">No technical brief needed. Fields marked * are required.</p>
  <div className="mt-7 grid gap-5 sm:grid-cols-2">
   <div><label className={labelStyle} htmlFor="quote-name">Your name *</label><input id="quote-name" required maxLength={120} autoComplete="name" className={fieldStyle} value={values.name} onChange={e=>update("name",e.target.value)}/></div>
   <div><label className={labelStyle} htmlFor="quote-email">Email *</label><input id="quote-email" required type="email" maxLength={254} autoComplete="email" className={fieldStyle} value={values.email} onChange={e=>update("email",e.target.value)}/></div>
   <div><label className={labelStyle} htmlFor="quote-company">Business name *</label><input id="quote-company" required maxLength={160} autoComplete="organization" className={fieldStyle} value={values.company} onChange={e=>update("company",e.target.value)}/></div>
   <div><label className={labelStyle} htmlFor="quote-phone">Phone (optional)</label><input id="quote-phone" type="tel" maxLength={40} autoComplete="tel" className={fieldStyle} value={values.phone} onChange={e=>update("phone",e.target.value)}/></div>
  </div>
  <div className="mt-5"><label className={labelStyle} htmlFor="quote-description">What does your business do? (optional)</label><input id="quote-description" maxLength={300} className={fieldStyle} placeholder="E.g. residential HVAC and repairs" value={values.businessDescription} onChange={e=>update("businessDescription",e.target.value)}/></div>
  <div className="mt-5"><label className={labelStyle} htmlFor="quote-site">Current website (optional)</label><input id="quote-site" maxLength={300} className={fieldStyle} placeholder="https://example.com" value={values.website} onChange={e=>update("website",e.target.value)}/></div>
  <div className="mt-5"><label className={labelStyle} htmlFor="quote-plan">What are you interested in? *</label><select id="quote-plan" required className={fieldStyle} value={values.plan} onChange={e=>update("plan",e.target.value)}>{planOptions.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}</select></div>
  <div className="mt-5"><label className={labelStyle} htmlFor="quote-goals">Anything you want your website to do? (optional)</label><textarea id="quote-goals" rows={3} maxLength={1500} className={fieldStyle} placeholder="More quote requests, booking, showcasing services..." value={values.goals} onChange={e=>update("goals",e.target.value)}/></div>
  <div className="mt-5"><label className={labelStyle} htmlFor="quote-timeline">When would you like to start? (optional)</label><select id="quote-timeline" className={fieldStyle} value={values.timeline} onChange={e=>update("timeline",e.target.value)}><option value="">Flexible / not sure</option><option value="As soon as practical">As soon as practical</option><option value="1–3 months">Within 1–3 months</option><option value="3–6 months">Within 3–6 months</option><option value="Exploring / No deadline">Just exploring</option></select></div>
  <div className="sr-only" aria-hidden="true"><label htmlFor="website-quote-leave-blank">Leave this blank</label><input id="website-quote-leave-blank" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e=>setHoneypot(e.target.value)}/></div>
  {error&&<p role="alert" className="mt-6 border border-red-700/50 p-3 text-sm text-warm-white">{error} <a href="mailto:support@systemarchq.com" className="underline">Email us directly.</a></p>}
  <button type="submit" disabled={pending} className="mt-7 inline-flex min-h-12 w-full items-center justify-center bg-warm-white px-6 font-medium text-carbon hover:bg-electric-cobalt disabled:opacity-60">{pending?"Sending request…":"Request my website quote →"}</button>
  <p className="mt-4 text-xs leading-5 text-silver">This starts a conversation, not a binding quote. Your information is handled under our <Link href="/privacy" className="text-warm-white underline">Privacy Policy</Link>.</p>
 </form>;
}
