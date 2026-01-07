// Cloudflare Turnstile verification
// Falls back to hCaptcha if Turnstile not configured

export async function verifyTurnstile(token: string): Promise<boolean> {
  // If no Turnstile secret, fall back to hCaptcha
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  
  if (!turnstileSecret) {
    // Graceful fallback - check hCaptcha instead
    const { verifyHCaptcha } = await import('@/lib/hcaptcha');
    return verifyHCaptcha(token);
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export function canUseTurnstile(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  );
}
