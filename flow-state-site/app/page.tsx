/**
 * YARDFLOW HOMEPAGE - PROOF-FIRST CONVERSION SPINE
 * 
 * CANONICAL 7-STEP LADDER (THE VARIANCE TAX whitepaper):
 * 1. HERO: "First Yard Network System (YNS)" + 1-line value + primary CTA
 * 2. PROBLEM: Variance Tax (yard = control valve)
 * 3. PROTOCOL: standardized driver journey (same flow, every yard)
 * 4. EVIDENCE: Ground Source Truth + chain-of-custody artifact
 * 5. MULTIPLIER: network compounding (scale to all facilities)
 * 6. BELIEVE: ROI calc + Singularity simulation as "proof engine"
 * 7. ACTION: Book Network Audit + Apply for Co-Development
 * 
 * PROOF CHOREOGRAPHY:
 * - Protocol: kiosk-demo.mp4, two-way-comms.mp4
 * - Evidence: chain-of-custody-kiosk.mp4
 * - Network: FacilityCountSlider (1 → 260 → 500)
 * - Believe: ROI + Singularity (lazy-loaded)
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/components/StickyCTABar';
import SystemGrid from '@/components/SystemGrid';
import StatusPulse from '@/components/StatusPulse';
import ProofMedia from '@/components/media/ProofMedia';
import ROIModuleSection from '@/components/ROIModuleSection';
import { BRAND } from '@/config/brand';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/motion-presets';
import { Metrics, Velocity, Shield, Crosshair } from '@/components/icons/FlowIcons';
import { 
  YardChaosAnimation, 
  ProtocolSequenceAnimation, 
  ChainOfCustodyAnimation,
  ProtocolRollupAnimation
} from '@/components/animations';
import { Section, Card, Stat, Callout } from '@/components/primitives';
import SingularityPreviewCard from '@/components/cards/SingularityPreviewCard';
import SingularityCard from '@/components/cards/SingularityCard';
import ProductCard from '@/components/cards/ProductCard';
import NetworkEffectCard from '@/components/cards/NetworkEffectCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-void">
      <Header />
      <StickyCTABar ctaText={BRAND.ctas.primary.label} ctaUrl={BRAND.ctas.primary.href} />

      {/* ═══════════════════════════════════════════════════════════════
          STEP 1: HERO - First Yard Network System (YNS)
      ═══════════════════════════════════════════════════════════════ */}
      <main id="main-content">
      <section className="relative pt-32 pb-24 overflow-hidden">
        <SystemGrid opacity={0.12} pulsing={true} />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            {/* Credibility markers */}
            <div className="flex flex-col items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-6">
                <StatusPulse status="active" label="System Live" size="md" />
                <span className="text-steel/50">|</span>
                <span className="text-steel/70 text-sm font-mono">{BRAND.proof.tagline}</span>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-2 w-full max-w-xl">
                <Stat value={BRAND.proof.drivers} label="Drivers" />
                <Stat value={BRAND.proof.facilities} label="Facilities" />
                <Stat value={BRAND.proof.systems} label="Live Systems" />
              </div>
            </div>

            {/* Brand frame */}
            <p className="text-xs uppercase tracking-[0.3em] text-neon/70 text-center mb-3">
              YardFlow by FreightRoll
            </p>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white text-center leading-[1.1]">
              The First<br />
              <span className="text-neon">Yard Network System</span>
            </h1>
            
            <p className="mt-8 text-xl md:text-2xl text-steel/90 max-w-3xl leading-relaxed mx-auto text-center">
              Not a YMS. A <span className="text-white font-bold">standardized operating protocol</span> that turns high-variance execution into deterministic control.
            </p>

            <p className="mt-6 text-lg text-steel max-w-2xl mx-auto text-center">
              The yard is the control valve for the supply chain network. When every driver journey is identical across all facilities, throughput becomes predictable.
            </p>

            {/* Primary CTA */}
            <div className="mt-12 flex justify-center">
              <Link
                href={BRAND.ctas.primary.href}
                className="inline-flex items-center gap-2 px-12 py-5 rounded-xl font-bold text-xl bg-neon text-void hover:bg-white transition-all shadow-lg shadow-neon/20"
              >
                {BRAND.ctas.primary.label}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STEP 3.5: PROOF ENGINE CARDS - Visualize Adoption & Product
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-4">Proof Engine</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Visualize Protocol Adoption
              </h2>
              <p className="text-xl text-steel max-w-3xl mx-auto leading-relaxed">
                See how standardized flow collapses variance and scales across your facilities.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <motion.div variants={staggerItem}><SingularityCard /></motion.div>
              <motion.div variants={staggerItem}><ProductCard /></motion.div>
              <motion.div variants={staggerItem}><NetworkEffectCard /></motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STEP 2: PROBLEM - Variance Tax (yard = control valve)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-y border-ember/20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-ember/70 mb-4">The Control Valve</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                The Yard is Where<br />Throughput Dies
              </h2>
              <p className="text-xl text-steel max-w-3xl mx-auto leading-relaxed">
                Manual check-in. Random queues. Trailers that disappear. Dwell that spikes into detention. <span className="text-white font-semibold">The yard consumes margin that never comes back.</span>
              </p>
            </div>

            {/* Variance Tax visualization */}
            <div className="mb-16">
              <YardChaosAnimation />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card variant="bordered" className="p-8 rounded-2xl border-ember/20 bg-ember/5">
                <h3 className="text-xl font-bold text-white mb-4">Typical Network Reality</h3>
                <ul className="space-y-3 text-steel">
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
              </Card>

              <Card variant="bordered" className="p-8 rounded-2xl border-neon/20 bg-neon/5">
                <h3 className="text-xl font-bold text-white mb-4">The Fix: Protocol {'>'} Process</h3>
                <p className="text-steel leading-relaxed mb-4">
                  The problem isn't your carriers. It's the lack of a standard protocol.
                </p>
                <p className="text-steel leading-relaxed">
                  <span className="text-white font-semibold">YardFlow enforces the same driver journey at every facility.</span> Same steps. Same sequence. Same proof requirements. Variance dies. Throughput becomes calculable.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STEP 3: PROTOCOL - Standardized Driver Journey
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-carbon/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-4">Ground Source Truth</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Same Flow.<br />Every Yard.
              </h2>
              <p className="text-xl text-steel max-w-3xl mx-auto leading-relaxed">
                The protocol is the product. <span className="text-white font-semibold">Four modules, one driver journey, zero variance.</span>
              </p>
            </div>

            {/* Protocol proof: Sequential module demonstration */}
            <div className="mb-16">
              <ProtocolSequenceAnimation />
            </div>

            {/* Protocol modules grid */}
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <motion.div variants={staggerItem}>
                <Link href="/product" className="group block">
                  <div className="p-8 rounded-xl border border-neon/20 bg-void/50 transition-all duration-300 hover:border-neon/50 hover:shadow-lg hover:shadow-neon/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield size={32} className="text-neon" />
                      <h3 className="text-xl font-bold text-white">Digital Guard</h3>
                    </div>
                    <p className="text-steel leading-relaxed">
                      QR-based driver ID verification. Lane assignment via algorithm. Instruction delivery via SMS.
                    </p>
                    <p className="text-neon text-sm font-semibold mt-4 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      Learn more →
                    </p>
                  </div>
                </Link>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Link href="/product" className="group block">
                  <div className="p-8 rounded-xl border border-neon/20 bg-void/50 transition-all duration-300 hover:border-neon/50 hover:shadow-lg hover:shadow-neon/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Velocity size={32} className="text-neon" />
                      <h3 className="text-xl font-bold text-white">Digital Comms</h3>
                    </div>
                    <p className="text-steel leading-relaxed">
                      Two-way messaging with proof-of-receipt. Escalation rules. Automated dwell alerts.
                    </p>
                    <p className="text-neon text-sm font-semibold mt-4 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      Learn more →
                    </p>
                  </div>
                </Link>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Link href="/product" className="group block">
                  <div className="p-8 rounded-xl border border-neon/20 bg-void/50 transition-all duration-300 hover:border-neon/50 hover:shadow-lg hover:shadow-neon/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Crosshair size={32} className="text-neon" />
                      <h3 className="text-xl font-bold text-white">Digital BOL</h3>
                    </div>
                    <p className="text-steel leading-relaxed">
                      Touchless documentation. Cryptographic timestamps. Photo proof of load condition.
                    </p>
                    <p className="text-neon text-sm font-semibold mt-4 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      Learn more →
                    </p>
                  </div>
                </Link>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Link href="/product" className="group block">
                  <div className="p-8 rounded-xl border border-neon/20 bg-void/50 transition-all duration-300 hover:border-neon/50 hover:shadow-lg hover:shadow-neon/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Metrics size={32} className="text-neon" />
                      <h3 className="text-xl font-bold text-white">Digital YMS</h3>
                    </div>
                    <p className="text-steel leading-relaxed">
                      Real-time yard visualization. Dwell anomaly detection. Predictive intelligence across the network.
                    </p>
                    <p className="text-neon text-sm font-semibold mt-4 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      Learn more →
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Two-way comms proof */}
            <div className="mt-16 max-w-4xl mx-auto">
              <ProofMedia
                type="phone"
                videoPath="/proof/two-way-comms.mp4"
                alt="Two-way driver communications with proof-of-receipt"
                caption="Enforcement through comms: every message logged, every response timestamped."
                autoplay={true}
                loop={true}
              />
            </div>

            {/* Before/After transformation - showing protocol rollup */}
            <div className="mt-16">
              <ProtocolRollupAnimation />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STEP 4: EVIDENCE - Ground Source Truth + Chain-of-Custody
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-y border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-4">Every Event. Every Handoff.</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Audit-Grade<br />from Day One
              </h2>
              <p className="text-xl text-steel max-w-3xl mx-auto leading-relaxed">
                We do not deal in projected savings. <span className="text-white font-semibold">We deal in Ground Source Truth.</span> Every decision is timestamped. Every dispute is defensible.
              </p>
            </div>

            {/* Chain-of-custody proof */}
            <div className="mb-12">
              <ChainOfCustodyAnimation />
            </div>

            {/* Evidence artifacts grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div variants={staggerItem} className="p-6 rounded-xl border border-neon/20 bg-void/80">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={20} className="text-neon" />
                  <h3 className="text-white font-semibold">Driver Check-In</h3>
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between text-steel/70">
                    <span>Timestamp:</span>
                    <span className="text-neon">14:23:17 UTC</span>
                  </div>
                  <div className="flex justify-between text-steel/70">
                    <span>Driver ID:</span>
                    <span className="text-white">Verified ✓</span>
                  </div>
                  <div className="flex justify-between text-steel/70">
                    <span>Lane:</span>
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
                  <h3 className="text-white font-semibold">BOL Signature</h3>
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between text-steel/70">
                    <span>Capture:</span>
                    <span className="text-neon">17:02:44 UTC</span>
                  </div>
                  <div className="flex justify-between text-steel/70">
                    <span>Signature:</span>
                    <span className="text-white">Crypto ✓</span>
                  </div>
                  <div className="flex justify-between text-steel/70">
                    <span>Immutable:</span>
                    <span className="text-white">Cryptographic signature</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STEP 5: MULTIPLIER - Network Compounding (1 → 260 → 500)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-carbon/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-4">Enterprise Scale</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Network Intelligence<br />Compounds Automatically
              </h2>
              <p className="text-xl text-steel max-w-3xl mx-auto leading-relaxed">
                <span className="text-white font-semibold">Yards are a network, not snowflakes.</span> Every facility adds proof points. Every driver journey tightens variance bands. Scale across your network.
              </p>
            </div>

            {/* Network intelligence proof - link to Singularity */}
            <div className="mb-16">
              <SingularityPreviewCard />
            </div>


          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STEP 6: BELIEVE - ROI Calculator (now dedicated module)
      ═══════════════════════════════════════════════════════════════ */}
      <ROIModuleSection />

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-carbon/20 to-void">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-6">Next Step</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Ready to Standardize?
              </h2>
              <p className="text-xl text-steel max-w-2xl mx-auto mb-12 leading-relaxed">
                Book a Network Audit. 30 minutes. We'll identify your pilot sites and map out your rollout.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center">
                <Link
                  href={BRAND.ctas.primary.href}
                  className="inline-flex items-center gap-2 px-10 py-5 rounded-xl font-bold text-xl bg-neon text-void hover:bg-white transition-all shadow-lg shadow-neon/20"
                >
                  {BRAND.ctas.primary.label}
                </Link>
                <Link
                  href={BRAND.ctas.secondary.href}
                  className="inline-flex items-center gap-2 px-10 py-5 rounded-xl font-semibold text-xl border-2 border-neon/30 bg-carbon/50 text-white hover:border-neon/50 transition-all"
                >
                  {BRAND.ctas.secondary.label}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
