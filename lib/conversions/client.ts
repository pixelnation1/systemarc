"use client";

type EventName = "page_view" | "cta_click" | "website_quote_started" | "website_quote_submitted" | "software_inquiry_started" | "software_inquiry_submitted";
type Attribution = {source:string;medium:string|null;campaign:string|null;referrerHost:string|null};
const storageKey = "systemarc_campaign_attribution";
const ttlMs = 4 * 60 * 60 * 1000;

function tag(value: string | null): string | null {
  const text = value?.trim() ?? "";
  return text && text.length <= 80 && /^[a-zA-Z0-9_. -]+$/.test(text) ? text : null;
}
function privacyOptOut() {
  if (typeof navigator === "undefined") return true;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true || navigator.doNotTrack === "1";
}
function sourceFromReferrer(): {source:string;host:string|null} {
  try {
    const host = new URL(document.referrer).hostname.toLowerCase();
    if (!host || host === location.hostname) return {source:"direct",host:null};
    if (!/^(?:[a-z0-9-]+\.)*[a-z0-9-]+$/.test(host) || host.length > 120) return {source:"referral",host:null};
    return {source:"referral",host};
  } catch { return {source:"direct",host:null}; }
}
export function campaignAttribution(): Attribution | null {
  if (typeof window === "undefined" || privacyOptOut()) return null;
  const params = new URLSearchParams(location.search);
  const source = tag(params.get("utm_source"));
  const medium = tag(params.get("utm_medium"));
  const campaign = tag(params.get("utm_campaign"));
  const hasCampaign = Boolean(source || medium || campaign);
  if (hasCampaign) {
    const value:Attribution = { source:source??"campaign", medium, campaign, referrerHost:null };
    try { sessionStorage.setItem(storageKey,JSON.stringify({value,at:Date.now()})); } catch {}
    return value;
  }
  try {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      const parsed=JSON.parse(saved) as {at?:unknown;value?:Attribution};
      if (typeof parsed.at==="number" && Date.now()-parsed.at < ttlMs && parsed.value) return parsed.value;
      sessionStorage.removeItem(storageKey);
    }
  } catch {}
  const referral=sourceFromReferrer();
  const value:Attribution={source:referral.source,medium:null,campaign:null,referrerHost:referral.host};
  if (referral.host) {
    try { sessionStorage.setItem(storageKey,JSON.stringify({value,at:Date.now()})); } catch {}
  }
  return value;
}
export function conversionPayload(eventName:EventName,targetPath?:string) {
  if (typeof window === "undefined" || privacyOptOut()) return null;
  return {
    eventName,
    pagePath:location.pathname,
    targetPath:targetPath??null,
    attribution:campaignAttribution(),
  };
}
export function trackConversion(eventName:EventName,targetPath?:string) {
  const payload=conversionPayload(eventName,targetPath);
  if (!payload) return;
  try {
    void fetch("/api/conversions", {
      method:"POST", headers:{"content-type":"application/json"},
      body:JSON.stringify(payload), keepalive:true, credentials:"same-origin",
    }).catch(()=>{});
  } catch {}
}
