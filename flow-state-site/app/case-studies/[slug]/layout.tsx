import type { Metadata } from 'next';
import { canonicalUrl, siteName } from '@/lib/site';

const descriptions: Record<string, string> = {
  'primo-network': 'A modeled enterprise network scenario illustrating Flow State ROI and pricing alignment.',
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const title = params.slug === 'primo-network' ? `Case Study: Primo Network | ${siteName}` : `Case Study | ${siteName}`;

  return {
    title,
    description: descriptions[params.slug] ?? 'Enterprise-style case study format for Flow State.',
    alternates: {
      canonical: canonicalUrl(`/case-studies/${params.slug}`),
    },
  };
}

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
