import type { Metadata } from 'next';
import { canonicalUrl, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'The Logistics Singularity - Network Effect Visualization',
  description: 'Watch network effects compound across your facility network. Interactive simulation shows how Flow State transforms logistics operations at scale.',
  keywords: ['logistics network effect', 'yard management network', 'supply chain transformation', 'logistics singularity', 'Metcalfe law logistics'],
  alternates: {
    canonical: canonicalUrl('/singularity'),
  },
  openGraph: {
    title: 'The Logistics Singularity | Flow State',
    description: 'Interactive network effect simulation. Watch facilities transform from chaos to flow state.',
    url: `${siteUrl}/singularity`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Flow State - The Logistics Singularity',
      },
    ],
  },
};

export default function SingularityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
