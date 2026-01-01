import type { Metadata } from 'next';
import { canonicalUrl, siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: `ROI Calculator | ${siteName}`,
  description: 'Model Flow State ROI across your facility network with transparent pricing and assumptions.',
  alternates: {
    canonical: canonicalUrl('/roi'),
  },
};

export default function RoiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
