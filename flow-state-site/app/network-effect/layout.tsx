import type { Metadata } from 'next';

import { canonicalUrl, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Network Effect - Compounding Value Across Facilities',
  description:
    'Understand how a coordinated facility network compounds operational value. Transparent assumptions with a realization-adjusted model you can inspect.',
  keywords: [
    'network effect',
    'yard network',
    'logistics network effects',
    'supply chain coordination',
    'ROI modeling',
  ],
  alternates: {
    canonical: canonicalUrl('/network-effect'),
  },
  openGraph: {
    title: 'Network Effect | YardFlow by FreightRoll',
    description:
      'A transparent, realization-adjusted network model showing how facilities compound value as adoption grows.',
    url: `${siteUrl}/network-effect`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'YardFlow by FreightRoll Network Effect',
      },
    ],
  },
};

export default function NetworkEffectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
