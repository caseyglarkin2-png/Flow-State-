import React from 'react';
import '@/styles/globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import AppChrome from '@/components/AppChrome';
import AnalyticsProvider from '@/components/AnalyticsProvider';
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
    default: 'YardFlow by FreightRoll | Yard Orchestration & Security',
    template: '%s | YardFlow',
  },
  description:
    'Yard orchestration platform that turns facilities into coordinated networks with defensible timestamps, modeled hard savings, capacity unlocked, and verified security at every gate.',
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
  authors: [{ name: 'YardFlow by FreightRoll', url: siteUrl }],
  creator: 'YardFlow by FreightRoll',
  publisher: 'FreightRoll',
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
    title: 'YardFlow by FreightRoll | Yard Orchestration & Security',
    description: 'Yard orchestration platform with CFO-grade, scenario-based modeling for hard savings, capacity unlocked, network effects, and verified security at every gate.',
    url: siteUrl,
    siteName: 'YardFlow',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: 'YardFlow by FreightRoll - Yard Orchestration & Security',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YardFlow by FreightRoll | Yard Orchestration & Security',
    description: 'Yard orchestration platform with CFO-grade, scenario-based modeling for hard savings, capacity unlocked, network effects, and verified security.',
    images: [`${siteUrl}/api/og`],
    creator: '@freightroll',
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
        name: 'YardFlow by FreightRoll',
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
          email: 'hello@yardflow.ai',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'YardFlow by FreightRoll',
        description: 'Yard orchestration and security platform for logistics operations',
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
        name: 'YardFlow by FreightRoll',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Yard Management System',
        operatingSystem: 'Web',
        url: siteUrl,
        description:
          'AI-powered yard orchestration software that transforms logistics yards from bottlenecks into networks of intelligent nodes. Features include automated gate operations, real-time trailer tracking, and network-effect ROI.',
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
            name: 'What is YardFlow by FreightRoll?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'YardFlow by FreightRoll is a yard orchestration platform that automates gate operations, tracks trailers in real-time, and uses AI to optimize yard moves. It transforms logistics facilities from bottlenecks into intelligent network nodes.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much can I save with YardFlow by FreightRoll?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Savings are scenario-dependent and driven by measurable mechanisms like dwell reduction, detention recovery, labor productivity, and incremental capacity unlocked. Use the ROI calculator to model assumptions and see how results change by facility count and operating profile.',
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
        <AnalyticsProvider>
          {children}
          <AppChrome />
        </AnalyticsProvider>
      </body>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </html>
  );
}
