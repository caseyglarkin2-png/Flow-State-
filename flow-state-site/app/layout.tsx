import React from 'react';
import '@/styles/globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import AppChrome from '@/components/AppChrome';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import { siteUrl } from '@/lib/site';
import { SITE_METADATA } from '@/lib/branding';

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
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  keywords: SITE_METADATA.keywords,
  authors: [{ name: 'YardFlow by FreightRoll', url: siteUrl }],
  creator: 'YardFlow by FreightRoll',
  publisher: 'FreightRoll',
  icons: {
    icon: [
      { url: '/favicon.ico?v=4', sizes: '32x32' },
      { url: '/favicon.svg?v=4', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png?v=4', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=4', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=4', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
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
    title: SITE_METADATA.ogTitle,
    description: SITE_METADATA.ogDescription,
    url: siteUrl,
    siteName: 'YardFlow by FreightRoll',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}/og.png?v=4`,
        width: 1200,
        height: 630,
        alt: 'YardFlow by FreightRoll - Yard Network System (YNS)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.ogTitle,
    description: SITE_METADATA.ogDescription,
    images: [`${siteUrl}/og.png?v=4`],
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
        <meta name="theme-color" content="#00B4FF" />
        <meta name="msapplication-TileColor" content="#050505" />
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
