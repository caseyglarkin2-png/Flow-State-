import type { Metadata } from 'next';
import { canonicalUrl, siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: `Security & Trust | ${siteName}`,
  description: 'Enterprise-ready security posture and trust signals for Flow State buyers.',
  alternates: {
    canonical: canonicalUrl('/security'),
  },
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
