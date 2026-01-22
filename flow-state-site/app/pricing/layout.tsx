import type { Metadata } from 'next';
import { canonicalUrl, siteName, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: `Pricing | ${siteName}`,
  description: 'Transparent facility-based pricing with incentives for full-network adoption.',
  alternates: {
    canonical: canonicalUrl('/pricing'),
  },
  openGraph: {
    title: `Pricing | ${siteName}`,
    description: 'Transparent facility-based pricing. Network incentives reward full adoption.',
    url: `${siteUrl}/pricing`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/api/og?page=pricing`,
        width: 1200,
        height: 630,
        alt: 'YardFlow Pricing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Pricing | ${siteName}`,
    description: 'Transparent facility-based pricing. Network incentives reward full adoption.',
    images: [`${siteUrl}/api/og?page=pricing`],
    creator: '@freightroll',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
