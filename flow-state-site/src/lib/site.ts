import 'server-only';

export const siteName = 'YardFlow by FreightRoll';

function normalizeOrigin(origin: string): string {
  return origin.replace(/\/$/, '');
}

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return normalizeOrigin(explicit);

  // Vercel provides the deployment hostname without protocol.
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${normalizeOrigin(vercelUrl)}`;

  return 'http://localhost:3000';
}

export const siteUrl = getSiteUrl();

export function canonicalUrl(path: string): string {
  if (!path.startsWith('/')) return `${siteUrl}/${path}`;
  return `${siteUrl}${path}`;
}
