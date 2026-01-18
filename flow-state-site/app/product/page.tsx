'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metrics, Agent, Confirm, Nexus, Shield, Velocity, Crosshair, DryVan, Reefer, Flatbed, Intermodal, CheckCircle } from '@/components/icons/FlowIcons';
import Link from 'next/link';
import AnimatedPanel from '@/components/AnimatedPanel';
import { ProductSection } from '@/components/products/ProductSection';
import { DigitalGuardVisual, DigitalCommsVisual, DigitalBOLVisual, DigitalYMSVisual } from '@/components/products/ProductVisualsLite';
import { BRAND } from '@/config/brand';
import CTAGroup from '@/components/CTAGroup';
import CoDevCallout from '@/components/CoDevCallout';
import ArchetypeEpisode from '@/components/ArchetypeEpisode';
import SuitePersonaMap from '@/components/SuitePersonaMap';
import DemoStepper from '@/components/DemoStepper';
import CapabilitySlice from '@/components/sections/CapabilitySlice';
import ProofMedia from '@/components/media/ProofMedia';
import BeforeAfterToggle from '@/components/BeforeAfterToggle';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/motion-presets';

const CAPABILITY_MODULES = [
  {
    headline: "Digital Guard",
    subhead: "Verify every carrier before they enter",
    description:
      "Kiosks with OCR, photo capture, and real-time authentication. The yard stops being a blind spot.",
    bullets: [
      { text: "Automated carrier ID verification (OCR + photo)" },
      { text: "CDL validation + English proficiency documentation" },
      { text: "Real-time driver authentication against carrier database" },
      { text: "Flagged credentials rejected at gate" },
      { text: "Reduces audit and dispute exposure with documented driver checks" },
    ],
    mediaImage: "/figma/digital-guard-proof.svg",
    mediaAlt: "Digital Guard kiosk with verification UI",
    mediaType: "desktop" as const,
    kpiLabel: "Verification Success",
    kpiValue: "99.8%",
    align: "left" as const,
  },
  {
    headline: "Digital Comms",
    subhead: "Lane-level driver messaging with read receipts",
    description:
      "No more 'I never got the message' excuses. Disputes shrink when receipts exist.",
    bullets: [
      { text: "Lane-based instructions and notifications" },
      { text: "Multi-language support (40+ languages)" },
      { text: "Read receipts and message history" },
      { text: "Fewer yard walk-ups, fewer interruptions" },
      { text: "Real-time dock assignment coordination" },
    ],
    mediaImage: "/figma/digital-comms-proof.svg",
    mediaAlt: "Driver phones showing lane assignments and alerts",
    mediaType: "desktop" as const,
    kpiLabel: "Message Delivery",
    kpiValue: "98%",
    align: "right" as const,
  },
  {
    headline: "Digital BOL",
    subhead: "Touchless documentation with forensic timestamps",
    description:
      "Photo proof of load condition. Cryptographic signatures. Detention disputes die young.",
    bullets: [
      { text: "Gate verification and ID scanning" },
      { text: "Condition capture with photo evidence" },
      { text: "Cryptographic timestamp trail" },
      { text: "CTPAT & TSA compliance reporting" },
      { text: "Network-wide BOL signature collection" },
    ],
    mediaImage: "/figma/digital-bol-proof.svg",
    mediaAlt: "Digital BOL with timestamp chain and crypto seal",
    mediaType: "desktop" as const,
    kpiLabel: "Dispute Reduction",
    kpiValue: "73%",
    align: "left" as const,
  },
  {
    headline: "Digital YMS",
    subhead: "Real-time yard visibility and predictive intelligence",
    description:
      "One place to store, search, and prove what happened. When the yard becomes a courtroom, this is your exhibit binder.",
    bullets: [
      { text: "Real-time yard visualization and asset tracking" },
      { text: "Dwell anomaly detection and alerts" },
      { text: "Network-wide predictive intelligence" },
      { text: "Faster dispute resolution and fewer chargebacks" },
      { text: "Operational clarity for dispatchers and yard managers" },
    ],
    mediaImage: "/figma/digital-yms-proof.svg",
    mediaAlt: "YMS dashboard with lane visualization and KPIs",
    mediaType: "desktop" as const,
    kpiLabel: "Asset Utilization",
    kpiValue: "94%",
    align: "right" as const,
  },
];

const PRODUCTS = [
  {
    title: "Digital Guard",
    eyebrow: "Module 1",
    description:
      "Verify every carrier before they enter. Kiosks with OCR, photo capture, and real-time authentication. The yard stops being a blind spot.",
    bullets: [
      "Automated carrier ID verification (OCR + photo)",
      "CDL validation + English proficiency documentation",
      "Real-time driver authentication against carrier database",
      "Flagged credentials rejected at gate",
      "Reduces audit and dispute exposure with documented driver checks",
    ],
    ctaLabel: "View Evidence Vault",
    ctaHref: "/security",
    align: "left" as const,
    visual: <DigitalGuardVisual />,
  },
  {
    title: "Digital Comms",
    eyebrow: "Module 2",
    description:
      "Lane-level driver messaging. No more 'I never got the message' excuses. Disputes shrink when receipts exist.",
    bullets: [
      "Lane-based instructions and notifications",
      "Multi-language support (40+ languages)",
      "Read receipts and message history",
      "Fewer yard walk-ups, fewer interruptions",
      "Real-time dock assignment coordination",
    ],
    ctaLabel: "Book a Network Audit",
    ctaHref: "/contact?intent=audit",
    align: "right" as const,
    visual: <DigitalCommsVisual />,
  },
  {
    title: "Digital BOL",
    eyebrow: "Module 3",
    description:
      "Touchless documentation. Forensic-grade timestamps. Photo proof of load condition. Detention disputes die young.",
    bullets: [
      "Gate verification and ID scanning",
      "Condition capture with photo evidence",
      "Cryptographic timestamp trail",
      "CTPAT & TSA compliance reporting",
      "Network-wide BOL signature collection",
    ],
    ctaLabel: "Book a Network Audit",
    ctaHref: "/contact?intent=audit",
    align: "left" as const,
    visual: <DigitalBOLVisual />,
  },
  {
    title: "Digital YMS",
    eyebrow: "Module 4",
    description:
      "One place to store, search, and prove what happened. When the yard becomes a courtroom, this is your exhibit binder.",
    bullets: [
      "Real-time yard visualization and asset tracking",
      "Dwell anomaly detection and alerts",
      "Network-wide predictive intelligence",
      "Faster dispute resolution and fewer chargebacks",
      "Operational clarity for dispatchers and yard managers",
    ],
    ctaLabel: "Book a Network Audit",
    ctaHref: "/contact?intent=audit",
    align: "right" as const,
    visual: <DigitalYMSVisual />,
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* HERO: The Unified Message */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70">
              Standardization Suite
            </p>
            <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
              Yards Create Variance.<br />
              <span className="text-neon">Standards Kill It.</span>
            </h1>
            <p className="mt-4 text-xl text-steel max-w-3xl leading-relaxed">
              Every yard has 10 common denominators: check-in, authorization, dock assignment, drop rules, enforcement, exceptions, compliance, departure, evidence, and recovery. When those are standardized, throughput compounds. When they're manual, variance compounds. <span className="text-white font-semibold">YardFlow orchestrates all 10 as one system.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM: Before vs After Visceral */}
      <section className="py-20 bg-carbon/20 border-y border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">The Context</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Chaos vs. Standards</h2>
              <p className="mt-4 text-steel max-w-2xl mx-auto">Toggle to see the operational delta. This is what standardization solves.</p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <BeforeAfterToggle />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TAXONOMY: 4 Sources of Variance = 4 Modules */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">How It Works</p>
              <h2 className="text-4xl font-bold text-white">Four Sources of Variance.<br />Four Modules. One Flow.</h2>
              <p className="mt-4 text-steel max-w-3xl mx-auto text-lg">Each module solves a specific variance type. Together, they create a predictable yard network.</p>
            </div>

            {/* Variance Taxonomy Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {[
                {
                  variance: 'Identity Variance',
                  problem: 'Who is this driver? Carrier authorization unclear.',
                  solution: 'Digital Guard',
                  icon: <Shield size={32} className="text-neon" />,
                  outcome: 'Verified check-in = gate security'
                },
                {
                  variance: 'Instruction Variance',
                  problem: 'Where do they go? Message gets lost in radio static.',
                  solution: 'Digital Comms',
                  icon: <Velocity size={32} className="text-neon" />,
                  outcome: 'Read receipts = no surprises'
                },
                {
                  variance: 'Condition Variance',
                  problem: 'What loaded? Trailer state disputed at delivery.',
                  solution: 'Digital BOL',
                  icon: <Confirm size={32} className="text-neon" />,
                  outcome: 'Cryptographic proof = zero disputes'
                },
                {
                  variance: 'Positioning Variance',
                  problem: 'Where is it? Manual tracking creates blind spots.',
                  solution: 'Digital YMS',
                  icon: <Crosshair size={32} className="text-neon" />,
                  outcome: 'Real-time visibility = predictable dwell'
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  className="p-6 rounded-xl border border-neon/20 bg-carbon/30 hover:bg-carbon/50 hover:border-neon/40 transition"
                >
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <p className="text-xs uppercase tracking-[0.15em] text-ember/70 font-semibold mb-2">{item.variance}</p>
                  <p className="text-sm text-steel mb-4">{item.problem}</p>
                  <div className="py-3 px-3 rounded bg-neon/10 border border-neon/20 mb-4">
                    <p className="text-center font-semibold text-neon text-sm">{item.solution}</p>
                  </div>
                  <p className="text-xs text-steel/70 italic text-center">{item.outcome}</p>
                </motion.div>
              ))}
            </div>

            {/* Flow Visualization */}
            <div className="p-8 rounded-2xl border-2 border-neon/20 bg-carbon/30">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-4 text-center">The Integration</p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-neon/20 border-2 border-neon flex items-center justify-center">
                    <Shield size={24} className="text-neon" />
                  </div>
                  <p className="mt-2 text-xs font-bold text-white text-center">Guard</p>
                </div>
                <div className="text-neon font-bold text-2xl">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-neon/20 border-2 border-neon flex items-center justify-center">
                    <Velocity size={24} className="text-neon" />
                  </div>
                  <p className="mt-2 text-xs font-bold text-white text-center">Comms</p>
                </div>
                <div className="text-neon font-bold text-2xl">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-neon/20 border-2 border-neon flex items-center justify-center">
                    <Confirm size={24} className="text-neon" />
                  </div>
                  <p className="mt-2 text-xs font-bold text-white text-center">BOL</p>
                </div>
                <div className="text-neon font-bold text-2xl">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-neon/20 border-2 border-neon flex items-center justify-center">
                    <Crosshair size={24} className="text-neon" />
                  </div>
                  <p className="mt-2 text-xs font-bold text-white text-center">YMS</p>
                </div>
              </div>
              <p className="text-center text-steel text-sm mt-6">Guard verifies identity → Comms sends verified driver to dock → BOL captures verification → YMS records and learns from each standardized event</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DETAILED: Capability Deep Dives */}
      {CAPABILITY_MODULES.map((module, idx) => (
        <CapabilitySlice
          key={module.headline}
          headline={module.headline}
          subhead={module.subhead}
          bullets={module.bullets}
          mediaImage={module.mediaImage}
          mediaAlt={module.mediaAlt}
          mediaType={module.mediaType}
          kpiLabel={module.kpiLabel}
          kpiValue={module.kpiValue}
          align={module.align}
          variant={idx % 2 === 0 ? 'primary' : 'secondary'}
        />
      ))}

      {/* Suite → Persona Map */}
      <section className="py-20 border-y border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <SuitePersonaMap />
        </div>
      </section>

      {/* OUTCOMES: What This Means for Your P&L */}
      <section className="py-20 bg-carbon/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">The CFO Conversation</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Standardization Converts to Unit Economics
            </h2>
            <p className="text-steel max-w-3xl text-lg mb-12">
              Variance isn't random—it's a tax on margin. Every percent of dwell reduction on a $4K/day facility = $40 synthetic capacity. Every 2% detention reduction = $8K annual recovery per tractor. Network standardization compounds these across 10, 50, 500 sites.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  metric: 'Dwell Reduction',
                  impact: '6-12%',
                  outcome: 'Synthetic capacity without capex',
                  icon: <Crosshair size={32} className="text-neon" />
                },
                {
                  metric: 'Detention Recovery',
                  impact: '2-4%',
                  outcome: 'Shipper penalties eliminated',
                  icon: <CheckCircle size={32} className="text-neon" />
                },
                {
                  metric: 'Labor Optimization',
                  impact: '8-15%',
                  outcome: 'Fewer manual interventions per shift',
                  icon: <Velocity size={32} className="text-neon" />
                },
              ].map((item, idx) => (
                <motion.div key={idx} variants={staggerItem} className="p-6 rounded-xl border border-neon/20 bg-carbon/50">
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <p className="text-center text-neon font-bold text-3xl mb-2">{item.impact}</p>
                  <p className="text-center text-steel font-semibold text-sm mb-3">{item.metric}</p>
                  <p className="text-center text-steel/70 text-xs">{item.outcome}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROOF: How It Works Demo */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">See The Flow</p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Driver Journey in 15 Seconds
            </h2>
            <p className="text-steel max-w-2xl mx-auto">
              QR scan → instant verification → SMS drop rules → automated enforcement. Same flow, every time, every yard.
            </p>
          </div>
          <DemoStepper />
        </div>
      </section>

      {/* CONTEXT: Archetype Episodes - Proof by Persona */}
      <section className="py-20 bg-carbon/20 border-y border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Suite Deployment Across Archetypes</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white mb-4">
            Same Suite. Different Operational Contexts.
          </h2>
          <p className="text-[17px] text-steel leading-8 max-w-3xl mb-12">
            All four modules deploy together. Dry van operations optimize for throughput. Reefer adds temperature compliance. Flatbed adds securement validation. Intermodal adds rail coordination. <span className="text-white font-semibold">One suite adapts to your context.</span>
          </p>
          
          <div className="grid gap-8 md:grid-cols-2">
            <ArchetypeEpisode
              archetype="Dry Van"
              icon={<DryVan size={24} className="text-neon" />}
              problem="High gate dwell. Labor scrambles. Detention surprises."
              standardize="Timed check-in → FIFO enforcement → Real-time dock assignment"
              metrics={[
                { label: 'Gate Time', value: '6 min' },
                { label: 'Dwell Avg', value: '24 hr' },
                { label: 'Detention', value: '8%' },
              ]}
              flowSteps={[
                { step: 'Check-in', description: 'Digital entry replaces radio calls' },
                { step: 'Validation', description: 'System verifies dock assignment' },
                { step: 'Enforcement', description: 'Driver follows system flow' },
                { step: 'Evidence', description: 'Timestamps prove compliance' },
              ]}
              link="/solutions/dry-van"
            />
            <ArchetypeEpisode
              archetype="Reefer"
              icon={<Reefer size={24} className="text-neon" />}
              problem="Temperature alerts ignored. Trailer rejection rates high. Shipper penalties."
              standardize="Pre-arrival temp validation → Condition photo → Cryptographic lock"
              metrics={[
                { label: 'Rejections', value: '2%' },
                { label: 'Shipper Fines', value: '$400/mo' },
                { label: 'BOL Disputes', value: '4%' },
              ]}
              flowSteps={[
                { step: 'Pre-check', description: 'Temperature validated before yard entry' },
                { step: 'Capture', description: 'Condition photo with timestamp' },
                { step: 'Lock', description: 'Cryptographic BOL signature' },
                { step: 'Archive', description: 'Evidence vault ready for disputes' },
              ]}
              link="/solutions/reefer"
            />
            <ArchetypeEpisode
              archetype="Flatbed"
              icon={<Flatbed size={24} className="text-neon" />}
              problem="Weight compliance unclear. Tarping delays. Carrier disputes on load state."
              standardize="Pre-dock weight check → Photo evidence → Dispatcher confirmation"
              metrics={[
                { label: 'Tarp Time', value: '8 min' },
                { label: 'Weight Issues', value: '1%' },
                { label: 'Disputes', value: '6%' },
              ]}
              flowSteps={[
                { step: 'Scale', description: 'Automated weight verification' },
                { step: 'Photo', description: 'Load condition captured on camera' },
                { step: 'Confirm', description: 'Dispatcher approves readiness' },
                { step: 'Route', description: 'Load assignment + driver notification' },
              ]}
              link="/solutions/flatbed"
            />
            <ArchetypeEpisode
              archetype="Intermodal"
              icon={<Intermodal size={24} className="text-neon" />}
              problem="Dwell on rails. Demurrage costs explode. Rail yard coordination is manual."
              standardize="Automated rail alert → Checkpoint notifications → Live positioning"
              metrics={[
                { label: 'Rail Dwell', value: '2.1 days' },
                { label: 'Demurrage', value: '$3.8K/mo' },
                { label: 'Visibility', value: 'Real-time' },
              ]}
              flowSteps={[
                { step: 'Alert', description: 'Automated rail departure notification' },
                { step: 'Track', description: 'Network-wide container positioning' },
                { step: 'Coordinate', description: 'Multi-site coordination automated' },
                { step: 'Proof', description: 'Demurrage reduction documented' },
              ]}
              link="/solutions/intermodal"
            />
          </div>
        </div>
      </section>

      {/* NETWORK EFFECT: Why 4 Standardized Sites > 1 Perfect Site */}
      <section className="py-20 border-y border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">The Multiplier</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Network Standardization Compounds</h2>
              <p className="mt-4 text-steel max-w-2xl mx-auto text-lg">One site proves ROI. Multi-site standardization creates network intelligence that's impossible at a single facility.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={staggerItem} className="p-8 rounded-xl border border-neon/20 bg-carbon/30">
                <p className="text-xs uppercase tracking-[0.15em] text-steel/70 font-semibold mb-4">Site 1 (Pilot)</p>
                <p className="text-sm text-steel mb-4">Proves concept: 8% dwell reduction, 2.3% detention recovery.</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-steel/70">Proof Points Created</span>
                    <span className="text-neon font-semibold">4</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-steel/70">Data Patterns</span>
                    <span className="text-neon font-semibold">Single Context</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="p-8 rounded-xl border border-neon/20 bg-carbon/30">
                <p className="text-xs uppercase tracking-[0.15em] text-neon/70 font-semibold mb-4">4 Sites (Network)</p>
                <p className="text-sm text-steel mb-4">Cross-context learning: What works in dry van shapes reefer strategy. Intermodal insights improve flatbed.</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-steel/70">Proof Points Created</span>
                    <span className="text-neon font-semibold">16</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-steel/70">Data Patterns</span>
                    <span className="text-neon font-semibold">4x Intelligence</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Co-Development Callout */}
      <section className="py-12 bg-carbon/30 border-y border-neon/20">
        <div className="max-w-5xl mx-auto px-6">
          <CoDevCallout 
            title="Beyond Base Deployment: Advanced Features"
            description="Multi-site operators with complex needs: Co-develop vision-based RTLS, AI yard orchestration, or machine vision gate systems. Influence the roadmap and get priority access to cutting-edge modules."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Next Step</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Ready to Standardize Your Yard Network?
          </h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl">
            Book a Network Audit to identify pilot sites, or explore the Co-Development Program for advanced features.
          </p>
          <div className="mt-8">
            <CTAGroup />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
