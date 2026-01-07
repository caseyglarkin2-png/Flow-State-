import type { Metadata } from 'next';
import { canonicalUrl, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YardBuilder - Map Your Facility in 60 Seconds',
  description: 'Create a digital twin of your yard in under a minute. Drop gates, docks, and parking spots. Generate instant ROI projections and implementation timeline.',
  keywords: ['yard mapping tool', 'digital yard twin', 'yard layout design', 'facility planning', 'logistics yard design'],
  alternates: {
    canonical: canonicalUrl('/yardbuilder'),
  },
  openGraph: {
    title: 'YardBuilder | YardFlow by FreightRoll',
    description: 'Map your yard in 60 seconds. Generate ROI projections instantly.',
    url: `${siteUrl}/yardbuilder`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'YardFlow by FreightRoll YardBuilder Tool',
      },
    ],
  },
};

export default function YardBuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
