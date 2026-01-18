/**
 * YARDFLOW HOMEPAGE - IMMERSIVE TRANSFORMATION
 * 
 * NARRATIVE ARC: Chaos → Standards → Control → Proof → Action
 * 
 * KEY COMPONENTS:
 * - Persona router (8-second self-ID)
 * - Before/After toggle (visceral chaos→control)
 * - Evidence timeline (proof as experience)
 * - Archetype episodes (persona-specific flows)
 * - System grid background (digital twin aesthetic)
 * - Progress rail (journey tracking)
 * - Status indicators (live system feel)
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/components/StickyCTABar';
import SystemGrid from '@/components/SystemGrid';
import ProgressRail, { DEFAULT_STEPS } from '@/components/ProgressRail';
import StatusPulse from '@/components/StatusPulse';
import EventTicker from '@/components/EventTicker';
import PersonaRouterHero from '@/components/PersonaRouterHero';
import BeforeAfterToggle, { SAMPLE_BEFORE_AFTER } from '@/components/BeforeAfterToggle';
import EvidenceTimeline, { SAMPLE_TIMELINE } from '@/components/EvidenceTimeline';
import ArchetypeEpisode from '@/components/ArchetypeEpisode';
import MicroCaseStudy, { SAMPLE_CASE_STUDY } from '@/components/MicroCaseStudy';
import ProofStrip from '@/components/ProofStrip';
import DriverJourney from '@/components/DriverJourney';
import NarrativeLadder from '@/components/NarrativeLadder';
import CTAGroup from '@/components/CTAGroup';
import ClaimsFootnote from '@/components/ClaimsFootnote';
import { BRAND } from '@/config/brand';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/motion-presets';
import { DryVan, Reefer, Flatbed, Intermodal, Tanker, Shield, Velocity } from '@/components/icons/FlowIcons';

export default function Home() {
  return (
    <div className="min-h-screen bg-void">
      <Header />
      <StickyCTABar ctaText={BRAND.ctas.primary.label} ctaUrl={BRAND.ctas.primary.href} />
      <ProgressRail steps={DEFAULT_STEPS} />

      {/* Skip anchor */}
      <div id="main-content" />

      {/* ═══════════════════════════════════════════════════════════════
          HERO: TENSION + PERSONA ROUTING
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <SystemGrid opacity={0.12} pulsing={true} />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            {/* Status indicator + Built by FreightRoll */}
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-6">
                <StatusPulse status="active" label="System Live" size="md" />
                <span className="text-steel/50">|</span>
                <span className="text-steel/70 text-sm font-mono">{BRAND.proof.tagline}</span>
              </div>
              <div className="text-steel/60 text-sm">
                {BRAND.proof.drivers} drivers | {BRAND.proof.facilities} facilities | {BRAND.proof.systems} live systems
              </div>
            </div>

            {/* Headline */}
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 text-center">
              Yard Network System
            </p>
            
            <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white text-center">
              Variance is a Tax.<br />
              <span className="text-neon">Standards Kill It.</span>
            </h1>
            
            <p className="mt-4 text-xl text-steel max-w-3xl leading-relaxed mx-auto text-center">
              Uncontrolled yards create financial noise. Manual check-in creates random queues. Trailers disappear. Dwell spikes become detention disputes. <span className="text-white font-semibold">Standards create predictable throughput.</span>
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
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
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DRIVER JOURNEY: Before vs After (Scrollytelling)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-0">
        <DriverJourney mode="scrollytelling" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BEFORE/AFTER: VISCERAL CHAOS → CONTROL
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-carbon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">The Operational Reality</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Feel the Difference
            </h2>
          </div>

          <BeforeAfterToggle content={SAMPLE_BEFORE_AFTER} mode="side-by-side" />
        </div>
      </section>

      {/* Persona Router moved lower */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">Fast Self-Identification</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Find Your Archetype
            </h2>
          </div>
          <PersonaRouterHero />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          NARRATIVE LADDER: Unified 6-Step Framework
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">The Song Sheet</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              One Narrative. Every Page.
            </h2>
            <p className="mt-4 text-steel max-w-3xl mx-auto">
              The yard is the constraint. Standardize the event stream. Kill variance. Measure throughput. Roll out standards network-wide. Co-develop with operators.
            </p>
          </div>
          <NarrativeLadder mode="full" />
        </div>
      </section>

      {/* Proof Strip */}
      <ProofStrip />

      {/* ═══════════════════════════════════════════════════════════════
          EVIDENCE AS EXPERIENCE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">Proof, Not Promises</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Audit-Ready by Design
            </h2>
            <p className="text-steel text-lg max-w-2xl mx-auto">
              Every event timestamped. Every exception tracked. Every resolution auditable. 
              This is what procurement confidence looks like.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Evidence Timeline */}
            <div>
              <EvidenceTimeline events={SAMPLE_TIMELINE} />
            </div>

            {/* System Event Ticker */}
            <div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Velocity size={20} className="text-neon" />
                Live System Events
              </h3>
              <p className="text-sm text-steel mb-6">
                Real-time visibility across your network. Every check-in, every alert, every resolution.
              </p>
              <EventTicker />

              {/* Quick stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-neon/10 bg-neon/5 p-4">
                  <div className="text-2xl font-black text-neon">2.4s</div>
                  <div className="text-xs text-steel/70">Avg Check-in</div>
                </div>
                <div className="rounded-lg border border-neon/10 bg-neon/5 p-4">
                  <div className="text-2xl font-black text-neon">99.7%</div>
                  <div className="text-xs text-steel/70">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ARCHETYPE EPISODES (Persona-Specific Flows)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-carbon/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">Operational Archetypes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Workflow, Standardized
            </h2>
            <p className="text-steel text-lg max-w-2xl mx-auto">
              Five archetypes. Same driver journey protocol. Different execution patterns.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <ArchetypeEpisode
              archetype="Dry Van"
              icon={<DryVan size={24} className="text-neon" />}
              problem="Gate bottlenecks kill throughput. Manual check-in creates random queues."
              standardize="Self-service kiosks + FIFO enforcement + real-time yard visibility"
              metrics={[
                { label: 'Gate Labor', value: '↓70%' },
                { label: 'Dwell Time', value: '↓50%' },
              ]}
              flowSteps={[
                { step: 'QR Check-in', description: 'Driver scans, system assigns door' },
                { step: 'Real-time Tracking', description: 'Yard map shows trailer location' },
                { step: 'FIFO Enforcement', description: 'System prevents dwell spikes' },
              ]}
              link="/solutions/dry-van"
            />

            <ArchetypeEpisode
              archetype="Reefer"
              icon={<Reefer size={24} className="text-neon" />}
              problem="Silent spoilage. Fuel drops. Set points drift. You find out after the damage."
              standardize="Telemetry capture + dwell alerts + compliance enforcement"
              metrics={[
                { label: 'Spoilage Risk', value: '↓80%' },
                { label: 'Alert Speed', value: '4 min' },
              ]}
              flowSteps={[
                { step: 'Temp Capture', description: 'Setpoint logged at gate' },
                { step: 'Dwell Alerts', description: 'System flags age thresholds' },
                { step: 'Evidence Lock', description: 'Compliance trail immutable' },
              ]}
              link="/solutions/reefer"
            />

            <ArchetypeEpisode
              archetype="Flatbed"
              icon={<Flatbed size={24} className="text-neon" />}
              problem="Safety incidents from improvisation. Load verification is manual, slow, fragile."
              standardize="Zone enforcement + digital verification + standard workflows"
              metrics={[
                { label: 'Safety Incidents', value: '↓65%' },
                { label: 'Verification Time', value: '↓40%' },
              ]}
              flowSteps={[
                { step: 'Zone Assignment', description: 'System directs to safe staging' },
                { step: 'Securement Check', description: 'Digital verification workflow' },
                { step: 'Exception Routing', description: 'Standard escalation path' },
              ]}
              link="/solutions/flatbed"
            />
          </motion.div>

          <div className="mt-8 text-center">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-neon hover:text-white transition-colors"
            >
              <span>View All Archetypes</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          MICRO CASE STUDY (Proof Module)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">Measured Outcomes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How We Know It Works
            </h2>
            <p className="text-steel text-lg max-w-2xl mx-auto">
              Baseline → Intervention → Outcome → Evidence. Every claim defensible.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <MicroCaseStudy {...SAMPLE_CASE_STUDY} />
          </div>

          <ClaimsFootnote className="text-center mx-auto mt-8" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-neon/10 to-transparent border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Stop Paying the Variance Tax
            </h2>
            <p className="text-xl text-steel leading-8 max-w-2xl mx-auto mb-8">
              Book a Network Audit to identify high-impact sites, or calculate your ROI in 3 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAGroup />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
