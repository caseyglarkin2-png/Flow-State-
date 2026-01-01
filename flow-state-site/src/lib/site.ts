export const siteName = 'Flow State';
export const siteUrl = 'https://flow-state-wbv9.vercel.app';

export function canonicalUrl(path: string): string {
  if (!path.startsWith('/')) return `${siteUrl}/${path}`;
  return `${siteUrl}${path}`;
}
