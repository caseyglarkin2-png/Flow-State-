import type { Metadata } from 'next';
import { canonicalUrl, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Product - Modules & Features',
  description: 'Complete yard orchestration platform. Gate automation, real-time tracking, AI move optimization, digital BOL, SMS driver orchestration. Integrates with your TMS/WMS.',
  keywords: ['yard management software', 'YMS features', 'gate automation', 'trailer tracking software', 'dock scheduling system', 'yard visibility'],
  alternates: {
    canonical: canonicalUrl('/product'),
  },
  openGraph: {
    title: 'Product | YardFlow by FreightRoll',
    description: 'Complete yard orchestration platform. Gate → Dock → Move → Integrate.',
    url: `${siteUrl}/product`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'YardFlow by FreightRoll Platform',
      },
    ],
  },
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
