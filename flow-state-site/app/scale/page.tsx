/**
 * SCALE PAGE - Co-Development & Full Implementation Options
 * 
 * Presents two paths: Co-Development (join the buildout) or Full Implementation.
 * Uses CoDevTrackSelector for opportunity browsing and ScalePitfallsAccordion
 * for anti-pattern education.
 * 
 * Content sourced from lib/content/coDevTracks.ts and lib/content/scalePitfalls.ts
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/components/StickyCTABar';
import CoDevTrackSelector from '@/components/CoDevTrackSelector';
import ScalePitfallsAccordion from '@/components/ScalePitfallsAccordion';
import PhasedTimelineV2 from '@/components/PhasedTimelineV2';
import { Card } from '@/components/primitives';
import SystemGrid from '@/components/SystemGrid';
import { BRAND } from '@/config/brand';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/motion-presets';
import { 
  getScalePageContent,
} from '@/lib/content';

export default function ScalePage() {
  const scaleContent = getScalePageContent();
  const [selectedPath, setSelectedPath] = useState<'codev' | 'full'>('codev');

  // Get first CTA if available
  const codevCta = scaleContent.codevOption.ctas?.[0];
  const fullImplCta = scaleContent.fullImplOption.ctas?.[0];

  return (
    <div className="min-h-screen bg-void">
      <Header />
      <StickyCTABar ctaText={BRAND.ctas.primary.label} ctaUrl={BRAND.ctas.primary.href} />

      <main id="main-content">
        {/* ═══════════════════════════════════════════════════════════════
            HERO: Scale Page Header
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <SystemGrid opacity={0.08} pulsing={false} />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-4">
                Scale Your Network
              </p>
              
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
                {scaleContent.hero.headline}
              </h1>
              
              <p className="mt-8 text-xl md:text-2xl text-steel/90 max-w-3xl leading-relaxed mx-auto">
                {scaleContent.hero.subheading}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PATH SELECTOR: Co-Dev vs Full Implementation
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 border-y border-steel/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Choose Your Path
              </h2>
              <p className="text-lg text-steel max-w-2xl mx-auto">
                Two ways to get YardFlow: Join the co-development program or go straight to full implementation.
              </p>
            </div>

            {/* Path Toggle */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex rounded-xl bg-carbon/30 p-1 border border-steel/20">
                <button
                  onClick={() => setSelectedPath('codev')}
                  className={`px-8 py-3 rounded-lg font-bold text-sm transition-all ${
                    selectedPath === 'codev'
                      ? 'bg-neon text-void shadow-lg shadow-neon/20'
                      : 'text-steel hover:text-white'
                  }`}
                >
                  Co-Development
                </button>
                <button
                  onClick={() => setSelectedPath('full')}
                  className={`px-8 py-3 rounded-lg font-bold text-sm transition-all ${
                    selectedPath === 'full'
                      ? 'bg-flow text-void shadow-lg shadow-flow/20'
                      : 'text-steel hover:text-white'
                  }`}
                >
                  Full Implementation
                </button>
              </div>
            </div>

            {/* Path Content */}
            <motion.div
              key={selectedPath}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedPath === 'codev' ? (
                <div className="space-y-8">
                  <Card variant="bordered" className="p-8 rounded-2xl border-neon/20 bg-neon/5">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-2">
                          Founding Partner Program
                        </p>
                        <h3 className="text-2xl font-black text-white mb-4">
                          {scaleContent.codevOption.headline}
                        </h3>
                        <p className="text-steel leading-relaxed mb-6">
                          {scaleContent.codevOption.body}
                        </p>
                        {codevCta && (
                          <Link
                            href={codevCta.href}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold bg-neon text-void hover:bg-white transition-all"
                          >
                            {codevCta.label}
                          </Link>
                        )}
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">What You Get</h4>
                        <ul className="space-y-3 text-steel">
                          <li className="flex items-start gap-3">
                            <span className="text-neon font-bold mt-1">✓</span>
                            <span>Founding partner economics (no SaaS fees)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-neon font-bold mt-1">✓</span>
                            <span>Direct product influence on roadmap</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-neon font-bold mt-1">✓</span>
                            <span>Early access to network compounding benefits</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-neon font-bold mt-1">✓</span>
                            <span>2 seats for Flatbed + Reefer operators</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  {/* CoDevTrackSelector */}
                  <div className="mt-12">
                    <h3 className="text-2xl font-black text-white mb-6 text-center">
                      Browse Open Opportunities
                    </h3>
                    <CoDevTrackSelector />
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <Card variant="bordered" className="p-8 rounded-2xl border-flow/20 bg-flow/5">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-flow/70 mb-2">
                          Enterprise Deployment
                        </p>
                        <h3 className="text-2xl font-black text-white mb-4">
                          {scaleContent.fullImplOption.headline}
                        </h3>
                        <p className="text-steel leading-relaxed mb-6">
                          {scaleContent.fullImplOption.body}
                        </p>
                        {fullImplCta && (
                          <Link
                            href={fullImplCta.href}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold bg-flow text-void hover:bg-white transition-all"
                          >
                            {fullImplCta.label}
                          </Link>
                        )}
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Full Implementation Includes</h4>
                        <ul className="space-y-3 text-steel">
                          <li className="flex items-start gap-3">
                            <span className="text-flow font-bold mt-1">✓</span>
                            <span>90-day deployment across all facilities</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-flow font-bold mt-1">✓</span>
                            <span>Digital twin mapping + protocol design</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-flow font-bold mt-1">✓</span>
                            <span>Training + change management</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-flow font-bold mt-1">✓</span>
                            <span>Ongoing support + optimization</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  {/* Timeline Preview */}
                  <div className="mt-12">
                    <h3 className="text-2xl font-black text-white mb-6 text-center">
                      Implementation Timeline
                    </h3>
                    <PhasedTimelineV2 
                      compact={true}
                      currentPhase={1}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PITFALLS: Scale Anti-Patterns to Avoid
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-carbon/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-ember/70 mb-4">
                Common Mistakes
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                {scaleContent.pitfalls.headline}
              </h2>
              <p className="text-lg text-steel max-w-2xl mx-auto">
                {scaleContent.pitfalls.subheading}
              </p>
            </div>

            {/* ScalePitfallsAccordion */}
            <ScalePitfallsAccordion criticalOnly={false} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CTA: Take Action
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Scale?
            </h2>
            <p className="text-xl text-steel max-w-2xl mx-auto mb-12">
              Book a network audit to see which path fits your operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white transition-all shadow-lg shadow-neon/20"
              >
                Book Network Audit
              </Link>
              <Link
                href="/proof"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-lg border-2 border-steel text-steel hover:bg-steel hover:text-void transition-all"
              >
                See Proof First
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
