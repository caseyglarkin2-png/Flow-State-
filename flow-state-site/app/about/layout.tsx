import type { Metadata } from 'next';
import { canonicalUrl, siteName, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: `About | ${siteName}`,
  description: 'YardFlow by FreightRoll is the next chapter of FreightRoll. Built for enterprise yard networks.',
  alternates: {
    canonical: canonicalUrl('/about'),
  },
  openGraph: {
    title: `About | ${siteName}`,
    description: 'From FreightRoll to YardFlow. The evolution of enterprise yard management.',
    url: `${siteUrl}/about`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/api/og?page=about`,
        width: 1200,
        height: 630,
        alt: 'About YardFlow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About | ${siteName}`,
    description: 'From FreightRoll to YardFlow. The evolution of enterprise yard management.',
    images: [`${siteUrl}/api/og?page=about`],
    creator: '@freightroll',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
