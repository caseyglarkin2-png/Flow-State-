import type { Metadata } from 'next';
import { canonicalUrl, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Evidence Vault - Security & Compliance',
  description: 'SOC 2 Type II certified. Enterprise security controls, compliance documentation, SLA guarantees, and integration specifications for procurement teams.',
  keywords: ['SOC 2 certified YMS', 'enterprise security logistics', 'compliance documentation', 'yard management security', 'logistics software compliance'],
  alternates: {
    canonical: canonicalUrl('/security'),
  },
  openGraph: {
    title: 'Evidence Vault - Security & Compliance | Flow State',
    description: 'SOC 2 Type II certified. Enterprise-ready security for procurement.',
    url: `${siteUrl}/security`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Flow State Security & Compliance',
      },
    ],
  },
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
