import type { Metadata } from 'next';
import { canonicalUrl, siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: `Pricing | ${siteName}`,
  description: 'Transparent facility-based pricing with incentives for full-network adoption.',
  alternates: {
    canonical: canonicalUrl('/pricing'),
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
