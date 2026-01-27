import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scale | YardFlow by FreightRoll',
  description: 'Scale your yard network with co-development or full implementation. Choose your path to standardized flow.',
  openGraph: {
    title: 'Scale | YardFlow by FreightRoll',
    description: 'Scale your yard network with co-development or full implementation. Choose your path to standardized flow.',
    type: 'website',
  },
};

export default function ScaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
