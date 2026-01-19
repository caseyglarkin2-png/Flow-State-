/**
 * YARDFLOW HOMEPAGE - CONVERSION SPINE
 * 
 * PRIMARY OBJECTIVE: "Predictable throughput is the product."
 * 
 * NARRATIVE FLOW (in order):
 * 1. Hero: What it is + Primary CTA
 * 2. The Constraint: Why yards are the bottleneck
 * 3. Before/After: Visceral proof (with media)
 * 4. Outcomes: What happens when variance dies (KPI chips)
 * 5. Evidence: Trust anchors (proof strip + artifacts)
 * 6. Co-Development: Scarcity + roadmap control
 * 7. Final CTA + close
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/components/StickyCTABar';
import SystemGrid from '@/components/SystemGrid';
import StatusPulse from '@/components/StatusPulse';
import BeforeAfterToggle, { SAMPLE_BEFORE_AFTER } from '@/components/BeforeAfterToggle';
import ProofStrip from '@/components/ProofStrip';
import CoDevCallout from '@/components/CoDevCallout';
import { BRAND } from '@/config/brand';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/motion-presets';
import { Metrics, Velocity, Shield, Crosshair } from '@/components/icons/FlowIcons';

export default function Home() {
  return (
    <div className="min-h-screen bg-void">
      <Header />
      <StickyCTABar ctaText={BRAND.ctas.primary.label} ctaUrl={BRAND.ctas.primary.href} />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: HERO - CLEAR VALUE PROP
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <SystemGrid opacity={0.12} pulsing={true} />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            {/* Credibility markers */}
            <div className="flex flex-col items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-6">
                <StatusPulse status="active" label="System Live" size="md" />
                <span className="text-steel/50">|</span>
                <span className="text-steel/70 text-sm font-mono">{BRAND.proof.tagline}</span>
              </div>
              <div className="text-steel/60 text-sm">
                {BRAND.proof.drivers} drivers | {BRAND.proof.facilities} facilities | {BRAND.proof.systems} live systems
              </div>
            </div>

            {/* One-liner frame */}
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 text-center">
              YardFlow by FreightRoll
            </p>
            <div className="mt-2 text-center text-sm text-steel/80 font-mono">
              The first Yard Network System (YNS). Not a YMS. A standardized operating protocol for deterministic throughput.
            </div>
            
            <h1 className="mt-4 text-6xl md:text-8xl font-black tracking-tight text-white text-center">
              Predictable<br />
              <span className="text-neon">Throughput</span>
              <br />
              is the Product.
            </h1>
            
            <p className="mt-6 text-xl text-steel max-w-3xl leading-relaxed mx-auto text-center">
              Variance is margin you never recover. <span className="text-white font-semibold">YardFlow standardizes yard events across your network, killing variance and unlocking predictable capacity.</span> When every driver journey is identical, your throughput compounds.
            </p>

            {/* Primary CTA only (secondary goes later) */}
            <div className="mt-10 flex justify-center">
              <Link
                href={BRAND.ctas.primary.href}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white transition-all shadow-lg shadow-neon/20"
              >
                {BRAND.ctas.primary.label}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: THE CONSTRAINT - Why Yards Matter
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 border-y border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-ember/70 mb-2">The Bottleneck</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  The Yard is Where Throughput Dies
                </h2>
                <p className="text-[17px] text-steel leading-8 mb-6">
                  Every freight network has a black hole. Manual check-in. Random queues. Trailers that disappear. Dwell that spikes into detention. The yard consumes margin that never comes back.
                </p>
                <p className="text-[17px] text-steel leading-8">
                  Most operators optimize *around* this chaos instead of eliminating it. Standards do the opposite: they make the yard predictable, so your P&L becomes predictable.
                </p>
              </div>
              <div className="rounded-2xl border border-ember/20 bg-ember/5 p-8">
                <p className="text-xs uppercase tracking-[0.1em] text-ember/70 font-semibold mb-4">Typical Network Reality</p>
                <ul className="space-y-3 text-steel text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-ember font-bold mt-1">×</span>
                    <span>Gate time varies 3-5x depending on who's working</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ember font-bold mt-1">×</span>
                    <span>Dwell depends on tribal knowledge + radio calls</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ember font-bold mt-1">×</span>
                    <span>Detention disputes arrive unpredictably on invoices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ember font-bold mt-1">×</span>
                    <span>Each facility runs its own playbook = no network learning</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: BEFORE/AFTER - Proof
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">The Delta</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Feel the Difference
              </h2>
              <p className="mt-4 text-steel max-w-2xl mx-auto text-lg">Toggle below. This is what standards solve.</p>
            </div>

            <BeforeAfterToggle content={SAMPLE_BEFORE_AFTER} mode="side-by-side" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: STANDARDS - 10 Common Denominators
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-carbon/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">The Framework</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                10 Common Denominators
              </h2>
              <p className="mt-4 text-steel max-w-2xl mx-auto text-lg">
                Every yard event, every facility, same protocol. This is what standardization looks like.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                { num: '01', standard: 'Identity Verification', desc: 'Digital Guard validates every driver entry' },
                { num: '02', standard: 'Instruction Protocol', desc: 'Comms sends identical messages network-wide' },
                { num: '03', standard: 'Condition Capture', desc: 'BOL locks proof at every handoff' },
                { num: '04', standard: 'Positioning Logic', desc: 'YMS assigns doors via algorithm, not radio' },
                { num: '05', standard: 'Timestamp Precision', desc: 'Every event logged to the second' },
                { num: '06', standard: 'Exception Routing', desc: 'Alerts escalate via defined SLA paths' },
                { num: '07', standard: 'Evidence Trail', desc: 'Immutable audit log for every transaction' },
                { num: '08', standard: 'Network Learning', desc: 'Data aggregates across all facilities' },
                { num: '09', standard: 'Predictable Throughput', desc: 'Capacity becomes calculable, not guessed' },
                { num: '10', standard: 'Compounding Returns', desc: 'Each site multiplies network efficiency' },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={staggerItem}
                  className="flex items-start gap-4 p-4 rounded-lg border border-neon/10 bg-void/50 hover:border-neon/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center">
                    <span className="text-neon font-bold text-sm">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.standard}</h3>
                    <p className="text-steel/70 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: OUTCOMES - The Math
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 border-y border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">Unit Economics</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                What Happens When Variance Dies
              </h2>
              <p className="mt-4 text-steel max-w-2xl mx-auto text-lg">These aren't aspirational. They're what 58 facilities have achieved.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  metric: 'Dwell Reduction',
                  impact: '6-12%',
                  meaning: 'Synthetic capacity without CapEx',
                  icon: <Crosshair size={40} className="text-neon" />
                },
                {
                  metric: 'Detention Recovery',
                  impact: '2-4%',
                  meaning: 'Shipper penalties eliminated',
                  icon: <Shield size={40} className="text-neon" />
                },
                {
                  metric: 'Labor Optimization',
                  impact: '8-15%',
                  meaning: 'Fewer manual interventions',
                  icon: <Velocity size={40} className="text-neon" />
                },
              ].map((item, idx) => (
                <motion.div key={idx} variants={staggerItem} className="p-8 rounded-xl border border-neon/20 bg-carbon/50">
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <p className="text-center text-neon font-bold text-4xl mb-2">{item.impact}</p>
                  <p className="text-center text-steel font-semibold mb-3">{item.metric}</p>
                  <p className="text-center text-steel/70 text-sm">{item.meaning}</p>
                  <p className="mt-3 text-xs text-steel/60 italic text-center">Illustrative examples. Results vary by facility layout, appointment discipline, inbound mix.</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: EVIDENCE VAULT - Artifacts & Timestamps
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-carbon/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">Built on Evidence</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Audit-Grade from Day One
              </h2>
              <p className="mt-4 text-steel max-w-2xl mx-auto text-lg">Every event is timestamped. Every decision is defensible. Disputes disappear when you own the proof.</p>
            </div>

            <ProofStrip />

            {/* Sample Evidence Artifacts */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <motion.div variants={staggerItem} className="p-6 rounded-xl border border-neon/20 bg-void/80">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={20} className="text-neon" />
                  <h3 className="text-white font-semibold">Digital Guard Log</h3>
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between text-steel/70">
                    <span>Check-in:</span>
                    <span className="text-neon">14:23:17 UTC</span>
                  </div>
                  <div className="flex justify-between text-steel/70">
                    <span>Driver ID:</span>
                    <span className="text-white">Verified ✓</span>
                  </div>
                  <div className="flex justify-between text-steel/70">
                    <span>Door Assigned:</span>
                    <span className="text-white">Bay 12</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="p-6 rounded-xl border border-neon/20 bg-void/80">
                <div className="flex items-center gap-2 mb-3">
                  <Velocity size={20} className="text-neon" />
                  <h3 className="text-white font-semibold">Dwell Alert</h3>
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between text-steel/70">
                    <span>Threshold:</span>
                    <span className="text-ember">2.0 hrs</span>
                  </div>
                  <div className="flex justify-between text-steel/70">
                    <span>Alert Sent:</span>
                    <span className="text-neon">16:23:19 UTC</span>
                  </div>
                  <div className="flex justify-between text-steel/70">
                    <span>Resolved:</span>
                    <span className="text-white">16:45:02 UTC</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="p-6 rounded-xl border border-neon/20 bg-void/80">
                <div className="flex items-center gap-2 mb-3">
                  <Crosshair size={20} className="text-neon" />
                  <h3 className="text-white font-semibold">BOL Snapshot</h3>
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between text-steel/70">
                    <span>Capture:</span>
                    <span className="text-neon">17:02:44 UTC</span>
                  </div>
                  <div className="flex justify-between text-steel/70">
                    <span>Signature:</span>
                    <span className="text-white">Cryptographic ✓</span>
                  </div>
                  <div className="flex justify-between text-steel/70">
                    <span>Immutable:</span>
                    <span className="text-white">Blockchain</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7: CO-DEVELOPMENT - Scarcity + Roadmap
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 border-y border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <CoDevCallout 
            title="Early Adopters Lock In Better Pricing"
            description="Multi-facility operators: join the Co-Development Program. Influence the product roadmap. Get early access to new modules. Lock in early adopter pricing. Limited spots."
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8: FINAL CTA + Close
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-carbon/20 to-void">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-4">Next Step</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Standardize?
              </h2>
              <p className="text-steel max-w-2xl mx-auto text-lg mb-10">
                Book a Network Audit. 30 minutes. We'll identify your pilot sites and map out your rollout.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={BRAND.ctas.primary.href}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white transition-all shadow-lg shadow-neon/20"
                >
                  {BRAND.ctas.primary.label}
                </Link>
                <Link
                  href={BRAND.ctas.secondary.href}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-neon/30 bg-carbon/50 text-white hover:border-neon/50 transition-all"
                >
                  {BRAND.ctas.secondary.label}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
