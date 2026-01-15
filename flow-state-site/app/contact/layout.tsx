import type { Metadata } from 'next';
import { canonicalUrl, siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: `Contact | ${siteName}`,
  description: 'Founding Member Audit: 30 minutes. Network audit + rollout plan. Zero fluff.',
  alternates: {
    canonical: canonicalUrl('/contact'),
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
