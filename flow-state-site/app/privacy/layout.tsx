import type { Metadata } from 'next';
import { canonicalUrl, siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteName}`,
  description: 'Privacy policy for Flow State marketing site and applicant forms.',
  alternates: {
    canonical: canonicalUrl('/privacy'),
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
