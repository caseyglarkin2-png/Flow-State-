import type { Metadata } from 'next';
import { canonicalUrl, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Evidence Vault - Security & Compliance',
  description: 'Enterprise security controls, compliance documentation, and procurement-ready materials for security review.',
  keywords: ['enterprise security logistics', 'compliance documentation', 'yard management security', 'logistics software compliance', 'security questionnaire', 'vendor security assessment'],
  alternates: {
    canonical: canonicalUrl('/security'),
  },
  openGraph: {
    title: 'Evidence Vault - Security & Compliance | YardFlow by FreightRoll',
    description: 'Procurement-ready security and compliance information for security review.',
    url: `${siteUrl}/security`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'YardFlow by FreightRoll Security & Compliance',
      },
    ],
  },
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
