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
  title: {
    default: 'Flow State | Put your yard in Flow',
    template: '%s | Flow State',
  },
  description:
    'Yard orchestration platform that transforms logistics facilities from bottlenecks into intelligent networks. Reduce dwell time by 50%, automate gate operations, and unlock $600K+ annual savings per site.',
  keywords: [
    'yard management system',
    'YMS software',
    'logistics automation',
    'dock scheduling',
    'gate automation',
    'trailer tracking',
    'supply chain visibility',
    'detention reduction',
    'dwell time optimization',
    'warehouse yard management',
  ],
  authors: [{ name: 'Flow State', url: siteUrl }],
  creator: 'Flow State',
  publisher: 'Flow State',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Flow State | Put your yard in Flow',
    description: 'Yard orchestration platform. Reduce dwell time 50%. $600K+ savings per site. Network effect compounds across facilities.',
    url: siteUrl,
    siteName: 'Flow State',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Flow State - Put your yard in Flow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flow State | Put your yard in Flow',
    description: 'Yard orchestration platform. Reduce dwell time 50%. $600K+ savings per site.',
    images: [`${siteUrl}/og.png`],
    creator: '@flowstate_io',
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add when available
    // google: 'google-site-verification-code',
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
        '@id': `${siteUrl}/#organization`,
        name: 'Flow State',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.svg`,
          width: 512,
          height: 512,
        },
        sameAs: [
          // Add social links when available
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'hello@flowstate.io',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Flow State',
        description: 'Yard orchestration platform for logistics operations',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}/#software`,
        name: 'Flow State',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Yard Management System',
        operatingSystem: 'Web',
        url: siteUrl,
        description:
          'AI-powered yard orchestration software that transforms logistics yards from bottlenecks into networks of intelligent nodes. Features include automated gate operations, real-time trailer tracking, and network-effect ROI.',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: '8000',
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '27',
        },
        featureList: [
          'Automated gate check-in/check-out',
          'Real-time yard visibility',
          'Digital BOL management',
          'SMS driver orchestration',
          'AI-powered move recommendations',
          'Network effect multiplier',
          'TMS/WMS integrations',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Flow State?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Flow State is a yard orchestration platform that automates gate operations, tracks trailers in real-time, and uses AI to optimize yard moves. It transforms logistics facilities from bottlenecks into intelligent network nodes.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much can I save with Flow State?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Customers typically see $600K+ in annual savings per facility through detention reduction (65%), labor automation (70%), and throughput gains (42%). Network effects multiply value as more facilities join.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does implementation take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most facilities go live in 2-4 weeks. We handle hardware setup, software configuration, and training. No IT infrastructure changes required.',
            },
          },
        ],
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
