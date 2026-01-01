type RateLimitOptions = {
  windowMs: number;
  max: number;
};

const state = new Map<string, { windowStart: number; count: number }>();

export function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') || 'unknown';
}

export function isRateLimited(key: string, opts: RateLimitOptions): boolean {
  const now = Date.now();
  const existing = state.get(key);
  if (!existing) {
    state.set(key, { windowStart: now, count: 1 });
    return false;
  }

  if (now - existing.windowStart > opts.windowMs) {
    state.set(key, { windowStart: now, count: 1 });
    return false;
  }

  existing.count += 1;
  state.set(key, existing);
  return existing.count > opts.max;
}
