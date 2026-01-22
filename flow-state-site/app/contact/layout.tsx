import type { Metadata } from 'next';
import { canonicalUrl, siteName, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: `Contact | ${siteName}`,
  description: 'Founding Member Audit: 30 minutes. Network audit + rollout plan. Zero fluff.',
  alternates: {
    canonical: canonicalUrl('/contact'),
  },
  openGraph: {
    title: `Contact | ${siteName}`,
    description: 'Book a 30-minute network audit. Get a rollout plan. Zero fluff.',
    url: `${siteUrl}/contact`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/api/og?page=contact`,
        width: 1200,
        height: 630,
        alt: 'Contact YardFlow',
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
