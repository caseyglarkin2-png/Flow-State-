import type { Metadata } from 'next';
import { canonicalUrl, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'ROI Calculator - Model Your Yard Savings',
  description: 'Calculate your yard management ROI. Board-ready metrics: Year 1 ROI, payback period, 5-year NPV, and per-facility savings. Transparent assumptions you can customize.',
  keywords: ['YMS ROI calculator', 'yard management ROI', 'logistics savings calculator', 'detention cost reduction', 'supply chain ROI'],
  alternates: {
    canonical: canonicalUrl('/roi'),
  },
  openGraph: {
    title: 'ROI Calculator | YardFlow by FreightRoll',
    description: 'CFO-ready, scenario-based ROI modeling with transparent assumptions you can customize and audit.',
    url: `${siteUrl}/roi`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'YardFlow by FreightRoll ROI Calculator',
      },
    ],
  },
};

export default function RoiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
