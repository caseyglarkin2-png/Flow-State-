import React from 'react';
import '@/styles/globals.css';

const siteUrl = 'https://flow-state-wbv9.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Flow State | Yard Orchestration Software',
  description:
    'Transform your logistics yard from a bottleneck into a network of intelligent nodes. Only 3 Founding Member spots remaining.',
  openGraph: {
    title: 'Flow State | Yard Orchestration Software',
    description: 'Transform your logistics yard into a network of intelligent nodes. Only 3 Founding Member spots remaining.',
    url: siteUrl,
    siteName: 'Flow State',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Flow State: Yard Orchestration Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flow State | Yard Orchestration Software',
    description:
      'Transform your logistics yard from a bottleneck into a network of intelligent nodes. Only 3 Founding Member spots remaining.',
    images: [`${siteUrl}/og.png`],
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script async src="https://cdn.jsdelivr.net/npm/three@r128/build/three.min.js"></script>
      </head>
      <body className="bg-void text-white font-sans">{children}</body>
    </html>
  );
}
