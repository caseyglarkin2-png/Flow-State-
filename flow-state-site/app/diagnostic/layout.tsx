import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yard Tax Diagnostic | YardFlow by FreightRoll',
  description: 'Calculate your hidden yard costs in 60 seconds. Identify detention, overtime, expedite, and overflow leaks with our interactive diagnostic.',
  alternates: {
    canonical: '/diagnostic',
  },
  openGraph: {
    title: 'Yard Tax Diagnostic | YardFlow by FreightRoll',
    description: 'Calculate your hidden yard costs in 60 seconds. No forms required.',
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
