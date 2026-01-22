import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NetworkMapDemo from './NetworkMapDemo';
import { canonicalUrl } from '@/lib/site';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Network Map Demo | YardFlow',
  description: 'Interactive visualization of the YardFlow facility network with real-time metrics and connections.',
  openGraph: {
    title: 'Network Map Demo | YardFlow',
    description: 'See how facilities connect in the YardFlow network',
    url: canonicalUrl('/demo/network-map'),
  },
};

export default function NetworkMapPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-void">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
              Network <span className="text-neon">Visualization</span>
            </h1>
            <p className="text-lg md:text-xl text-steel max-w-2xl mx-auto">
              Interactive map showing facility connections in the YardFlow network. 
              Click on nodes to see details, hover for quick metrics.
            </p>
          </div>
        </section>

        {/* NetworkMap Section */}
        <section className="pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <NetworkMapDemo />
          </div>
        </section>

        {/* Legend Section */}
        <section className="pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Facility Types
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <LegendItem color="#00FFC2" label="Gated Facility" description="Secure access points" />
              <LegendItem color="#3B82F6" label="Open Yard" description="High throughput" />
              <LegendItem color="#F59E0B" label="Cross-Dock" description="Rapid transfers" />
              <LegendItem color="#8B5CF6" label="Manufacturing" description="JIT integrated" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              See Your Network Mapped
            </h2>
            <p className="text-steel mb-8">
              Discover how YardFlow can visualize and optimize your facility network.
            </p>
            <Link 
              href={BRAND.ctas.primary.href}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-neon text-void font-semibold hover:bg-neon/90 transition-colors"
            >
              {BRAND.ctas.primary.label}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function LegendItem({ 
  color, 
  label, 
  description 
}: { 
  color: string; 
  label: string; 
  description: string;
}) {
  return (
    <div className="bg-carbon/50 border border-neon/10 rounded-xl p-4 text-center">
      <div 
        className="w-6 h-6 rounded-full mx-auto mb-3"
        style={{ backgroundColor: color }}
      />
      <div className="text-white font-semibold text-sm">{label}</div>
      <div className="text-steel text-xs mt-1">{description}</div>
    </div>
  );
}
