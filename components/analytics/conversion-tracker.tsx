"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackConversion } from "@/lib/conversions/client";

export function ConversionTracker() {
  const pathname=usePathname();
  useEffect(()=>{trackConversion("page_view");},[pathname]);
  useEffect(()=>{
    function handleClick(event:MouseEvent){
      const target=event.target;
      if (!(target instanceof Element)) return;
      const link=target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      try {
        const url=new URL(link.href,location.href);
        if (url.origin!==location.origin) return;
        if (url.pathname==="/website-quote" || url.pathname==="/start-a-project") {
          trackConversion("cta_click",url.pathname);
        }
      } catch {}
    }
    document.addEventListener("click",handleClick);
    return ()=>document.removeEventListener("click",handleClick);
  },[]);
  return null;
}
