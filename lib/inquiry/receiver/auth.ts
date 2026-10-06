import { createHash, timingSafeEqual } from "node:crypto";

export type ReceiverAuthResult = "ok" | "missing" | "mismatch" | "unconfigured";

/**
 * Compare a Bearer token with the receiver secret.
 * Both sides are hashed so the comparison does not leak the secret length.
 */
export function authorizeInquiryReceiver(
  header: string | null,
  secret: string | undefined,
): ReceiverAuthResult {
  const expected = secret?.trim() ?? "";
  if (!expected) return "unconfigured";

  const match = /^Bearer\s+(\S+)$/i.exec(header?.trim() ?? "");
  const provided = match?.[1];
  if (!provided) return "missing";

  const providedHash = createHash("sha256").update(provided).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  if (!timingSafeEqual(providedHash, expectedHash)) return "mismatch";
  return "ok";
}
