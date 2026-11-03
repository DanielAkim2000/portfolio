type Entry = { count: number; resetAt: number };

const attempts = new Map<string, Entry>();

export function isRateLimited(key: string, max: number, windowMs: number) {
  const now = Date.now();

  for (const [entryKey, entry] of attempts) {
    if (entry.resetAt <= now) attempts.delete(entryKey);
  }

  const entry = attempts.get(key);
  return !!entry && entry.count >= max;
}

export function registerAttempt(key: string, windowMs: number) {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  entry.count += 1;
}

export function clearAttempts(key: string) {
  attempts.delete(key);
}
