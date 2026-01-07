import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

const routes = [
  '/',
  '/product',
  '/solutions',
  '/yns',
  '/yardbuilder',
  '/singularity',
  '/roi',
  '/pricing',
  '/compare',
  '/compare/legacy-yms',
  '/compare/spreadsheets',
  '/integrations',
  '/implementation',
  '/faq',
  '/press',
  '/status',
  '/changelog',
  '/contact',
  '/privacy',
  '/terms',
  '/about',
  '/security',
  '/case-studies',
  '/case-studies/primo-network',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
