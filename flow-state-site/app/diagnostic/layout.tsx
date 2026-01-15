import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Variance Tax Diagnostic | YardFlow by FreightRoll',
  description: 'Calculate your hidden Variance Tax in 60 seconds. Identify detention, overtime, expedite, and overflow costs with our interactive diagnostic.',
  alternates: {
    canonical: '/diagnostic',
  },
  openGraph: {
    title: 'Variance Tax Diagnostic | YardFlow by FreightRoll',
    description: 'Calculate your hidden Variance Tax in 60 seconds. No forms required.',
    type: 'website',
  },
};

export default function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
