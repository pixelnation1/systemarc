type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

/**
 * In-memory window for a single server process.
 * A multi-instance deployment needs a shared store before this can be relied on.
 */
export function consumeRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const };
  }

  if (current.count >= limit) {
    return { ok: false as const };
  }

  current.count += 1;
  return { ok: true as const };
}
