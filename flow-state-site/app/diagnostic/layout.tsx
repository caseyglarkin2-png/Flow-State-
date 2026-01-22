import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Variance Tax Diagnostic | YardFlow by FreightRoll',
  description: 'Calculate your hidden Variance Tax in 60 seconds. Identify detention, overtime, expedite, and overflow costs with our interactive diagnostic.',
  alternates: {
    canonical: '/diagnostic',
  },
  openGraph: {
    title: 'Variance Tax Diagnostic | YardFlow by FreightRoll',
    description: 'Calculate your hidden Variance Tax in 60 seconds. No forms required.',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/api/og?page=diagnostic`,
        width: 1200,
        height: 630,
        alt: 'Variance Tax Diagnostic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Variance Tax Diagnostic | YardFlow',
    description: 'Calculate your hidden Variance Tax in 60 seconds.',
    images: [`${siteUrl}/api/og?page=diagnostic`],
    creator: '@freightroll',
  },
};

export default function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
