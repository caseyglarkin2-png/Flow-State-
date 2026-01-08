import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PersonaRouter from '@/components/PersonaRouter';
import PrimaryCTA from '@/components/PrimaryCTA';
import CanonicalSnippet from '@/components/CanonicalSnippet';
import Disclosure from '@/components/Disclosure';
import { NETWORK_LEAK_CATEGORIES } from '@/content/definitions';
import { HERO_HEADLINES, CATEGORY_DEFINITION, VALUE_PROPS, PROOF_METRICS } from '@/content/copy';
import { calcRoiV2, getRoiV2InputsForPreset } from '@/lib/economics';
import { Check, X } from 'lucide-react';

export default function Home() {
  // Default enterprise baseline for proof metrics
  const baseline = calcRoiV2({
    ...getRoiV2InputsForPreset('enterprise_50', 'expected'),
    yearOneRampShare: 0.05,
  });

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* ══════════════════════════════════════════════════
          BLOCK 1: HERO - HEADLINE + 3 BULLETS + 2 CTAs
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-ember font-mono text-sm tracking-widest mb-6 uppercase">
            The Silo Trap
          </p>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95]">
            <span className="text-white">{HERO_HEADLINES.main}</span>
            <br />
            <span className="text-neon drop-shadow-[0_0_30px_rgba(0,180,255,0.5)] mt-4 block text-4xl md:text-5xl">
              {HERO_HEADLINES.sub}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-steel/90 mb-8 max-w-3xl mx-auto">
            {CATEGORY_DEFINITION.yms} {CATEGORY_DEFINITION.yns}
          </p>

          {/* 3 Core Pillars (YNS Value) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto text-left">
            {[
              { label: 'Orchestration', desc: 'Direct moves across your network' },
              { label: 'Security', desc: 'Verified identity at every gate' },
              { label: 'Intelligence', desc: 'Network learns from every site' },
            ].map((pillar, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check size={20} className="text-neon flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">{pillar.label}</span>
                  <span className="text-sm text-steel/70">{pillar.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryCTA variant="primary" />
            <PrimaryCTA variant="secondary" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BLOCK 2: THE PAIN - NETWORK LEAK (5 categories shown, link to 8)
      ══════════════════════════════════════════════════ */}
      <section className="py-16 border-b border-neon/20 bg-gradient-to-b from-void to-carbon/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-ember font-mono text-sm tracking-widest mb-4 uppercase">
              The Hidden Cost
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
              The Network Leak: <span className="text-neon">8 Ways Margin Escapes</span>
            </h2>
            <p className="text-lg text-steel/80 max-w-2xl mx-auto">
              {VALUE_PROPS.visibility}
            </p>
          </div>

          {/* Top 5 Leak Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {NETWORK_LEAK_CATEGORIES.slice(0, 5).map((cat) => (
              <div key={cat.id} className="p-4 rounded-lg border border-steel/30 bg-carbon/40">
                <h3 className="font-bold text-neon mb-1">{cat.name}</h3>
                <p className="text-sm text-steel/80 mb-2">{cat.description}</p>
                <p className="text-xs text-steel/60 font-mono">{cat.typical}</p>
              </div>
            ))}
          </div>

          {/* Link to all 8 + methodology */}
          <div className="text-center">
            <Link href="/docs/economics-methodology" className="text-neon hover:underline text-sm">
              See all 8 categories + defensible methodology →
            </Link>
          </div>

          {/* Optional Physics Lens (collapsed by default) */}
          <div className="mt-8">
            <Disclosure title="Optional: The Physics Lens (Yard Viscosity)" variant="minimal">
              <p className="mb-3">
                High friction at every handoff. Trailers waiting for dock assignments. Drivers circling for gatehouse approval. Information siloed across facilities.
              </p>
              <p className="text-neon text-sm font-semibold">
                High viscosity → slow flow → throughput bottleneck → margin leak
              </p>
            </Disclosure>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BLOCK 3: PROOF - 3 DIRECTIONAL METRICS + DISCLAIMER
      ══════════════════════════════════════════════════ */}
      <section className="py-12 bg-carbon/30 border-b border-steel/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-black text-neon">{PROOF_METRICS.facilitiesModeled.value}</p>
              <p className="text-steel text-sm mt-1">{PROOF_METRICS.facilitiesModeled.label}</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">{Math.round(baseline.yearOneRoiPercent)}%</p>
              <p className="text-steel text-sm mt-1">Year-1 ROI (modeled, enterprise scale)</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">{PROOF_METRICS.dwellReduction.value}</p>
              <p className="text-steel text-sm mt-1">{PROOF_METRICS.dwellReduction.label}</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">{PROOF_METRICS.timeToProduction.value}</p>
              <p className="text-steel text-sm mt-1">{PROOF_METRICS.timeToProduction.label}</p>
            </div>
          </div>
          
          {/* Modeled Disclaimer */}
          <div className="mt-6 text-center">
            <CanonicalSnippet id="disclaimer-modeled" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BLOCK 4: PERSONA ROUTER - FINANCE / OPS / SECURITY
      ══════════════════════════════════════════════════ */}
      <PersonaRouter />

      {/* ══════════════════════════════════════════════════
          BLOCK 5: CTA - ONE PRIMARY + ONE SECONDARY
      ══════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-neon/20 bg-gradient-to-b from-void to-carbon/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-ember font-mono text-sm tracking-widest mb-6 uppercase">
            Take The First Step
          </p>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Stop the leak. <span className="text-neon">Start with one site.</span>
          </h2>
          <p className="text-xl text-steel/80 mb-10 max-w-2xl mx-auto">
            Run the diagnostic. See what you're paying. Then decide if you want to keep paying it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryCTA variant="primary" size="lg" />
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-steel/40 text-white hover:border-neon hover:text-neon transition-all"
            >
              See Pricing
            </Link>
          </div>

          {/* Optional Deep Dives (collapsed) */}
          <div className="mt-16 max-w-2xl mx-auto">
            <Disclosure title="Why does the leak exist?" variant="minimal">
              <CanonicalSnippet id="ground-truth" />
            </Disclosure>
            
            <Disclosure title="How does value compound with scale?" variant="minimal">
              <p className="mb-3">{VALUE_PROPS.networkEffect}</p>
              <Link href="/network-effect" className="text-neon hover:underline text-sm">
                See the interactive simulation →
              </Link>
            </Disclosure>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
