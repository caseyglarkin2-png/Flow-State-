import type { Metadata } from 'next';
import { canonicalUrl, siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: `Contact | ${siteName}`,
  description: 'Book a demo or request a quote for Flow State yard orchestration software.',
  alternates: {
    canonical: canonicalUrl('/contact'),
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
