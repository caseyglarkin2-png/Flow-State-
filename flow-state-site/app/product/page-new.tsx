/**
 * PRODUCT PAGE — "Four Modules, One Network" (Jan 2026 Rebuild)
 * 
 * Simplified layout focused on:
 * 1. Hero: "The protocol is the product"
 * 2. Four Modules grid with clear value props
 * 3. Network Effect teaser
 * 4. CTA to ROI/Procurement
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Velocity, Confirm, Crosshair } from '@/components/icons/FlowIcons';

export const metadata: Metadata = {
  title: 'Product | YardFlow by FreightRoll',
  description: 'Four modules. One network. Digital Gate, Comms, BOL, and Orchestration create deterministic throughput across your yard network.',
};

// ═══════════════════════════════════════════════════════════════════
// CONTENT CONFIG
// ═══════════════════════════════════════════════════════════════════

const MODULES = [
  {
    icon: Shield,
    eyebrow: 'Module 1',
    title: 'Digital Gate',
    tagline: 'Verify before entry',
    description: 'Driver ID verification via kiosk. OCR + photo capture. Lane assignment by algorithm. Instructions via SMS.',
    outcomes: [
      '99.8% verification success',
      'Zero unauthorized entries',
      'Gate time reduced 40%',
    ],
    color: 'neon',
  },
  {
    icon: Velocity,
    eyebrow: 'Module 2',
    title: 'Digital Comms',
    tagline: 'Lane-level messaging',
    description: 'Two-way messaging with proof-of-receipt. Multi-language support. Escalation rules. Dwell alerts.',
    outcomes: [
      '98% message delivery',
      'Read receipts on every message',
      'Zero "I never got it" disputes',
    ],
    color: 'neon',
  },
  {
    icon: Confirm,
    eyebrow: 'Module 3',
    title: 'Digital BOL',
    tagline: 'Touchless documentation',
    description: 'Cryptographic timestamps. Photo proof of condition. CTPAT/TSA compliance. Network-wide signature collection.',
    outcomes: [
      '73% dispute reduction',
      'Forensic-grade evidence',
      'Detention claims eliminated',
    ],
    color: 'neon',
  },
  {
    icon: Crosshair,
    eyebrow: 'Module 4',
    title: 'Digital Orchestration',
    tagline: 'Real-time yard visibility',
    description: 'Live yard visualization. Dwell anomaly detection. Predictive intelligence. Network-wide learning.',
    outcomes: [
      '94% asset utilization',
      'Predictive dwell alerts',
      'Cross-site pattern detection',
    ],
    color: 'neon',
  },
] as const;

const VARIANCE_SOURCES = [
  { source: 'Identity', problem: 'Who is this driver?', solution: 'Digital Gate' },
  { source: 'Instruction', problem: 'Where do they go?', solution: 'Digital Comms' },
  { source: 'Condition', problem: 'What loaded?', solution: 'Digital BOL' },
  { source: 'Position', problem: 'Where is it?', solution: 'Digital Orchestration' },
] as const;

// ═══════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <main id="main-content">
        {/* ═══════════════════════════════════════════════════════════
            HERO: The protocol is the product
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-4">
              Yard Network System (YNS)
            </p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
              Four Modules.<br />
              <span className="text-neon">One Network.</span>
            </h1>

            <p className="mt-6 text-xl text-steel max-w-3xl leading-relaxed">
              YardFlow isn't a YMS. It's a standardized operating protocol. 
              <span className="text-white font-semibold"> Same driver journey at every facility. Same steps. Same sequence. Same proof requirements.</span>
            </p>

            <p className="mt-4 text-lg text-steel">
              The protocol is the product.
            </p>

            {/* CTA Cluster */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/roi"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white transition-all shadow-lg shadow-neon/20"
              >
                Model Your Network ROI
              </Link>
              <Link
                href="/procurement"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium border border-neon/30 text-white hover:border-neon/60 transition-all"
              >
                Security & Compliance Docs
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            VARIANCE MAPPING: 4 sources → 4 solutions
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-carbon/20 border-y border-neon/10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-ember/70 mb-3">The Problem</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Four Sources of Variance. Four Solutions.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VARIANCE_SOURCES.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-void border border-ember/20 text-center">
                  <p className="text-xs uppercase tracking-wider text-ember/70 mb-2">{item.source}</p>
                  <p className="text-sm text-steel mb-3">{item.problem}</p>
                  <p className="text-sm font-bold text-neon">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            FOUR MODULES: Core product grid
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Facility Install</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Every Facility Gets the Same Stack
              </h2>
              <p className="text-lg text-steel max-w-2xl mx-auto">
                Deploy all four modules together. Each solves a specific variance type. 
                Together, they create a predictable yard network.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {MODULES.map((module, i) => (
                <div 
                  key={i} 
                  className="p-8 rounded-2xl border border-neon/20 bg-carbon/30 hover:border-neon/40 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center flex-shrink-0">
                      <module.icon size={28} className="text-neon" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-steel/60 mb-1">{module.eyebrow}</p>
                      <h3 className="text-xl font-bold text-white">{module.title}</h3>
                      <p className="text-sm text-neon">{module.tagline}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-steel text-sm leading-relaxed mb-6">
                    {module.description}
                  </p>

                  {/* Outcomes */}
                  <div className="space-y-2">
                    {module.outcomes.map((outcome, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <span className="text-neon">✓</span>
                        <span className="text-steel">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            FLOW VISUALIZATION: How modules connect
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-carbon/20 border-y border-neon/10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">The Flow</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                One Continuous Driver Journey
              </h2>
            </div>

            {/* Flow diagram */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {[
                { icon: Shield, label: 'Gate', step: 'Verify' },
                { icon: Velocity, label: 'Comms', step: 'Direct' },
                { icon: Confirm, label: 'BOL', step: 'Document' },
                { icon: Crosshair, label: 'YMS', step: 'Track' },
              ].map((item, i, arr) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-neon/20 border-2 border-neon flex items-center justify-center">
                      <item.icon size={24} className="text-neon" />
                    </div>
                    <p className="mt-2 text-xs font-bold text-white">{item.label}</p>
                    <p className="text-[10px] text-steel/60">{item.step}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-neon font-bold text-xl hidden md:block">→</span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-center text-steel text-sm mt-8 max-w-2xl mx-auto">
              Guard verifies identity → Comms directs to dock → BOL captures condition → YMS tracks and learns. 
              <span className="text-white font-semibold"> Same flow, every time, every yard.</span>
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            NETWORK EFFECT: Compounding value
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="p-10 rounded-2xl border border-neon/20 bg-gradient-to-br from-neon/5 to-void">
              <div className="text-center mb-8">
                <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Network Intelligence</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Standards Compound. Data Patterns Emerge.
                </h2>
                <p className="text-lg text-steel max-w-2xl mx-auto">
                  One site creates proof. 50 sites create benchmarks. 260 sites create cross-facility learning 
                  that single-site data cannot reveal.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl md:text-4xl font-black text-neon">1</p>
                  <p className="text-sm text-white font-medium mt-1">Site</p>
                  <p className="text-xs text-steel mt-1">Local proof</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-black text-neon">50</p>
                  <p className="text-sm text-white font-medium mt-1">Sites</p>
                  <p className="text-xs text-steel mt-1">Network benchmarks</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-black text-neon">260+</p>
                  <p className="text-sm text-white font-medium mt-1">Sites</p>
                  <p className="text-xs text-steel mt-1">Predictive patterns</p>
                </div>
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/roi"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-neon text-void hover:bg-white transition-all"
                >
                  See Network ROI →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CTA: Next steps
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-carbon/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Standardize?
            </h2>
            <p className="text-lg text-steel mb-8">
              30-minute call. We'll map your network and identify pilot sites.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-neon text-void hover:bg-white transition-all"
              >
                Book Network Audit
              </Link>
              <Link
                href="/procurement"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-neon/30 text-white hover:border-neon/60 transition-all"
              >
                Request Procurement Packet
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
