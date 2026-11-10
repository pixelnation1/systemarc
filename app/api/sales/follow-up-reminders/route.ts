import { timingSafeEqual } from "node:crypto";
import { sendDueFollowUps } from "@/lib/sales/reminders";

export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(request:Request) {
  const configured=process.env.CRON_SECRET||"";
  const received=request.headers.get("authorization")||"";
  const expected="Bearer "+configured;
  if(process.env.NODE_ENV!=="production"||configured.length<32||
    Buffer.byteLength(received)!==Buffer.byteLength(expected)||
    !timingSafeEqual(Buffer.from(received),Buffer.from(expected))) {
    return Response.json({error:"Unauthorized"},{status:401,headers:{"Cache-Control":"no-store"}});
  }
  const result=await sendDueFollowUps();
  return Response.json({result},{status:result==="unavailable"?503:200,headers:{"Cache-Control":"no-store"}});
}
