import type { Metadata } from 'next';
import { canonicalUrl, siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: `Terms of Service | ${siteName}`,
  description: 'Terms of service for YardFlow by FreightRoll marketing site and applicant program.',
  alternates: {
    canonical: canonicalUrl('/terms'),
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
