/**
 * PROOF PAGE - Validated Results & Network Evidence
 * 
 * Shows measured proof points (Primo data) and modeled projections.
 * Uses ProofStripV2 for animated KPIs and PhasedTimelineV2 for rollout phases.
 * 
 * Content sourced from lib/content/proofPoints.ts and lib/content/sections.ts
 */

import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/components/StickyCTABar';
import ProofStripV2 from '@/components/ProofStripV2';
import PhasedTimelineV2 from '@/components/PhasedTimelineV2';
import { Card } from '@/components/primitives';
import SystemGrid from '@/components/SystemGrid';
import { BRAND } from '@/config/brand';
import { 
  getProofPoints, 
  getProofPageContent,
} from '@/lib/content';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Proof | YardFlow by FreightRoll',
  description: 'Measured results from live deployments. See the data behind YardFlow\'s variance reduction claims.',
  openGraph: {
    title: 'Proof | YardFlow by FreightRoll',
    description: 'Measured results from live deployments. See the data behind YardFlow\'s variance reduction claims.',
    type: 'website',
  },
};

export default function ProofPage() {
  const proofPoints = getProofPoints();
  const proofContent = getProofPageContent();
  
  // Split measured vs modeled
  const measuredPoints = proofPoints.filter(p => p.sourceType === 'measured');
  const modeledPoints = proofPoints.filter(p => p.sourceType === 'modeled');

  return (
    <div className="min-h-screen bg-void">
      <Header />
      <StickyCTABar ctaText={BRAND.ctas.primary.label} ctaUrl={BRAND.ctas.primary.href} />

      <main id="main-content">
        {/* ═══════════════════════════════════════════════════════════════
            HERO: Proof Page Header
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <SystemGrid opacity={0.08} pulsing={false} />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-4">
                Ground Source Truth
              </p>
              
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
                {proofContent.hero.headline}
              </h1>
              
              <p className="mt-8 text-xl md:text-2xl text-steel/90 max-w-3xl leading-relaxed mx-auto">
                {proofContent.hero.subheading}
              </p>
              
              {proofContent.hero.body && (
                <p className="mt-6 text-lg text-steel max-w-2xl mx-auto">
                  {proofContent.hero.body}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            MEASURED: Production Data
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-y border-neon/20 bg-neon/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-4">
                Measured Data
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                {proofContent.measured.headline}
              </h2>
              <p className="text-lg text-steel max-w-2xl mx-auto">
                {proofContent.measured.subheading}
              </p>
            </div>

            {/* ProofStripV2 with measured data */}
            <ProofStripV2 showAll={true} />

            {/* Detailed breakdown */}
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {measuredPoints.map((point, idx) => (
                <Card key={idx} variant="bordered" className="p-6 rounded-xl border-neon/20 bg-void/50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neon/20 text-neon">
                      Measured
                    </span>
                  </div>
                  <p className="text-3xl font-black text-white mb-2">
                    {point.metric}
                  </p>
                  <p className="text-steel text-sm">{point.label}</p>
                  {point.context && (
                    <p className="text-steel/70 text-xs mt-2">{point.context}</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            MODELED: Network Projections
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-flow/70 mb-4">
                Network Projections
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                {proofContent.modeled.headline}
              </h2>
              <p className="text-lg text-steel max-w-2xl mx-auto">
                {proofContent.modeled.subheading}
              </p>
            </div>

            {/* Modeled projections grid */}
            {modeledPoints.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {modeledPoints.map((point, idx) => (
                  <Card key={idx} variant="bordered" className="p-6 rounded-xl border-flow/20 bg-void/50">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-flow/20 text-flow">
                        Modeled
                      </span>
                    </div>
                    <p className="text-3xl font-black text-white mb-2">
                      {point.metric}
                    </p>
                    <p className="text-steel text-sm">{point.label}</p>
                    {point.context && (
                      <p className="text-steel/70 text-xs mt-2">{point.context}</p>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card variant="bordered" className="p-6 rounded-xl border-flow/20 bg-void/50">
                  <p className="text-3xl font-black text-white mb-2">260+</p>
                  <p className="text-steel text-sm">Potential Facilities</p>
                </Card>
                <Card variant="bordered" className="p-6 rounded-xl border-flow/20 bg-void/50">
                  <p className="text-3xl font-black text-white mb-2">$8.4M</p>
                  <p className="text-steel text-sm">Annual Savings Potential</p>
                </Card>
                <Card variant="bordered" className="p-6 rounded-xl border-flow/20 bg-void/50">
                  <p className="text-3xl font-black text-white mb-2">40%</p>
                  <p className="text-steel text-sm">Throughput Increase</p>
                </Card>
                <Card variant="bordered" className="p-6 rounded-xl border-flow/20 bg-void/50">
                  <p className="text-3xl font-black text-white mb-2">63%</p>
                  <p className="text-steel text-sm">Variance Reduction</p>
                </Card>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            TIMELINE: Implementation Phases
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-t border-steel/20 bg-carbon/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-4">
                Rollout Framework
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                90-Day Deployment
              </h2>
              <p className="text-lg text-steel max-w-2xl mx-auto">
                Standardized implementation path. Same process, every facility.
              </p>
            </div>

            {/* PhasedTimelineV2 */}
            <PhasedTimelineV2 currentPhase={1} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CTA: Take Action
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              See Your Numbers
            </h2>
            <p className="text-xl text-steel max-w-2xl mx-auto mb-12">
              Run the ROI calculator with your facility count. Get projected Year 1-3 savings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/roi"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white transition-all shadow-lg shadow-neon/20"
              >
                Run ROI Calculator
              </Link>
              <Link
                href="/scale"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-lg border-2 border-flow text-flow hover:bg-flow hover:text-void transition-all"
              >
                Explore Scale Options
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
