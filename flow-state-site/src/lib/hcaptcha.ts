export async function verifyHCaptcha(token: string | undefined): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET;
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;

  // Allow in dev/test if secret missing; require in production.
  if (!secret) {
    // CI runs Next in production mode without secrets; allow for automated tests.
    if (process.env.CI) return true;
    // If hCaptcha is completely not configured (no site key either), allow submission
    // This enables graceful degradation when hCaptcha is intentionally not set up
    if (!siteKey) return true;
    return process.env.NODE_ENV !== 'production';
  }

  if (!token) return false;

  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);

  const res = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}
