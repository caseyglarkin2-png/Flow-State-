import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OGPreviewClient from './OGPreviewClient';

export const metadata: Metadata = {
  title: 'OG Preview Tool | YardFlow',
  description: 'Internal tool for previewing and debugging Open Graph images across different pages.',
  robots: 'noindex, nofollow', // Don't index internal tools
};

export default function OGPreviewPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flow-state-klbt.vercel.app';
  
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-void pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              OG Preview <span className="text-neon">Tool</span>
            </h1>
            <p className="text-steel max-w-xl mx-auto">
              Debug and preview Open Graph images for social sharing. 
              Test different pages and copy URLs for external validators.
            </p>
          </div>

          {/* Client Component */}
          <OGPreviewClient siteUrl={siteUrl} />
        </div>
      </main>
      <Footer />
    </>
  );
}
