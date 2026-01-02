import React from 'react';
import '@/styles/globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import AppChrome from '@/components/AppChrome';
import { siteUrl } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Flow State | Yard Orchestration Software',
  description:
    'Transform your logistics yard from a bottleneck into a network of intelligent nodes.',
  openGraph: {
    title: 'Flow State | Yard Orchestration Software',
    description: 'Transform your logistics yard into a network of intelligent nodes.',
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
      'Transform your logistics yard from a bottleneck into a network of intelligent nodes.',
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Flow State',
        url: siteUrl,
        logo: `${siteUrl}/logo.svg`,
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Flow State',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: siteUrl,
        description:
          'Yard orchestration software that transforms logistics yards from bottlenecks into networks of intelligent nodes.',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: '5000-15000',
          category: 'Subscription',
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className="bg-void text-white font-sans">
        {children}
        <AppChrome />
      </body>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </html>
  );
}
