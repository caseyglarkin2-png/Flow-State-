import type { Metadata } from 'next';
import { canonicalUrl, siteName, siteUrl } from '@/lib/site';

const caseStudyMeta: Record<string, { title: string; description: string }> = {
  'primo-network': {
    title: 'Case Study: Primo Network',
    description: 'A modeled enterprise network scenario illustrating YardFlow by FreightRoll ROI and pricing alignment across 260 facilities.',
  },
  'regional-3pl': {
    title: 'Case Study: Regional 3PL',
    description: 'A 12-facility regional network eliminates detention disputes with defensible timestamps.',
  },
  'cold-chain-security': {
    title: 'Case Study: Cold Chain Security',
    description: 'Temperature-sensitive logistics network reduces theft incidents 80% with ID verification.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = caseStudyMeta[slug] ?? {
    title: 'Case Study',
    description: 'Enterprise-style case study format for YardFlow by FreightRoll.',
  };

  return {
    title: `${meta.title} | ${siteName}`,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl(`/case-studies/${slug}`),
    },
    openGraph: {
      title: `${meta.title} | ${siteName}`,
      description: meta.description,
      url: `${siteUrl}/case-studies/${slug}`,
      type: 'article',
      images: [
        {
          url: `${siteUrl}/api/og?page=case-study/${slug}`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
  };
}

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
