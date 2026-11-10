import { captureConversionEvent, normalizeConversionEvent } from "@/lib/conversions/server";
import { consumeRateLimit } from "@/lib/inquiry/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  try {
    if (!origin || new URL(origin).host !== new URL(request.url).host) {
      return Response.json({error:"Forbidden"}, {status:403});
    }
  } catch {
    return Response.json({error:"Forbidden"}, {status:403});
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({error:"Invalid content type"}, {status:415});
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!consumeRateLimit(`conversion:${ip.slice(0,80)}`, 90, 15*60*1000).ok) {
    return Response.json({error:"Too many requests"}, {status:429});
  }
  const raw = await request.text();
  if (raw.length > 1536) return Response.json({error:"Too large"}, {status:413});
  let input: unknown;
  try { input = JSON.parse(raw); } catch { return Response.json({error:"Invalid JSON"}, {status:400}); }
  if (!normalizeConversionEvent(input)) return Response.json({error:"Invalid event"}, {status:400});
  if (!await captureConversionEvent(input)) return Response.json({error:"Analytics unavailable"}, {status:503});
  return new Response(null, {status:204});
}
