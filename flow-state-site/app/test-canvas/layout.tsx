import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'R3F Test Canvas | YardFlow',
  description: 'Test page for React Three Fiber canvas validation',
  robots: 'noindex, nofollow',
};

export default function TestCanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
