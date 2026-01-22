import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Co-Development Program | YardFlow by FreightRoll',
  description: 'Build the Yard Network System with us. Multi-site operators: get roadmap influence, priority onboarding, and co-developed features.',
  openGraph: {
    title: 'Co-Development Program | YardFlow',
    description: 'Build the Yard Network System with us. Get roadmap influence and priority onboarding.',
    type: 'website',
  },
};

export default function CoDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
