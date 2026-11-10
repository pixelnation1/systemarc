import type { Metadata } from "next";

export const metadata:Metadata = {
  title:"Sales Command Center | SystemArc",
  description:"Private sales operations.",
  robots:{index:false,follow:false,noarchive:true},
  referrer:"no-referrer",
};
export const dynamic="force-dynamic";

export default function SalesLayout({children}:{children:React.ReactNode}) {
  return <div className="min-h-[70vh] bg-[#09111e] text-warm-white">{children}</div>;
}
