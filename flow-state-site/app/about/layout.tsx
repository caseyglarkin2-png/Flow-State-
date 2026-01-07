import type { Metadata } from 'next';
import { canonicalUrl, siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: `About | ${siteName}`,
  description: 'YardFlow by FreightRoll is the next chapter of FreightRoll. Built for enterprise yard networks.',
  alternates: {
    canonical: canonicalUrl('/about'),
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
