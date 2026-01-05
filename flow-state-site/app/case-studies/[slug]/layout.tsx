import type { Metadata } from 'next';
import { canonicalUrl, siteName } from '@/lib/site';

const descriptions: Record<string, string> = {
  'primo-network': 'A modeled enterprise network scenario illustrating Flow State ROI and pricing alignment.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug === 'primo-network' ? `Case Study: Primo Network | ${siteName}` : `Case Study | ${siteName}`;

  return {
    title,
    description: descriptions[slug] ?? 'Enterprise-style case study format for Flow State.',
    alternates: {
      canonical: canonicalUrl(`/case-studies/${slug}`),
    },
  };
}

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
