import React from 'react';
import '@/styles/globals.css';

export const metadata = {
  title: 'Flow State | Industrial Fluidity & Yard Orchestration Software',
  description:
    'Transform your logistics yard from a bottleneck into a network of intelligent nodes. Reduce turn times by 50% with Flow State YardOS.',
  openGraph: {
    title: 'Flow State | Industrial Fluidity & Yard Orchestration Software',
    description: 'Transform your logistics yard into a network of intelligent nodes.',
    url: 'https://flow-state.io',
    siteName: 'Flow State',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script async src="https://cdn.jsdelivr.net/npm/three@r128/build/three.min.js"></script>
      </head>
      <body className="bg-void text-white font-sans">{children}</body>
    </html>
  );
}
