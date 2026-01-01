import crypto from 'node:crypto';

type TokenEnvelope = {
  payload: unknown;
  exp: number;
};

function base64UrlEncode(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(s: string): Buffer {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4));
  const normalized = (s + pad).replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(normalized, 'base64');
}

function sign(data: string, secret: string): string {
  return base64UrlEncode(crypto.createHmac('sha256', secret).update(data).digest());
}

export function getPdfSigningSecret(): string {
  const secret = process.env.PDF_SIGNING_SECRET;
  if (secret) return secret;
  // Allow default secret outside prod to make dev/CI easy.
  if (process.env.NODE_ENV !== 'production') return 'dev-pdf-secret';
  throw new Error('Missing PDF_SIGNING_SECRET');
}

export function createSignedToken(payload: unknown, ttlSeconds: number): string {
  const secret = getPdfSigningSecret();
  const env: TokenEnvelope = {
    payload,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const body = base64UrlEncode(Buffer.from(JSON.stringify(env)));
  const sig = sign(body, secret);
  return `${body}.${sig}`;
}

export function verifySignedToken<T>(token: string): T | null {
  const secret = getPdfSigningSecret();
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;

  const expected = sign(body, secret);
  const ok = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  if (!ok) return null;

  const env = JSON.parse(base64UrlDecode(body).toString('utf8')) as TokenEnvelope;
  if (!env?.exp || typeof env.exp !== 'number') return null;
  if (Math.floor(Date.now() / 1000) > env.exp) return null;

  return env.payload as T;
}
