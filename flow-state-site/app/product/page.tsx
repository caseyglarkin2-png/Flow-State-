'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metrics, Agent, Confirm, Nexus, Shield, Velocity, Crosshair, DryVan, Reefer, Flatbed, Intermodal } from '@/components/icons/FlowIcons';
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">
            YardFlow Standardization Suite
          </p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            One Suite. Four Modules.<br />
            <span className="text-neon">One Standard.</span>
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            Standardization only works when access control, communications, documentation, and yard management operate as one integrated system. <span className="text-white font-semibold">YardFlow is delivered as a bundle to prevent fragmentation.</span>
          </p>
          
          {/* Bundling Callout */}
          <div className="mt-6 p-4 rounded-xl border-2 border-neon/20 bg-neon/5 max-w-3xl">
            <p className="text-sm text-steel leading-relaxed">
              <span className="text-neon font-semibold">Why bundled?</span> Picking modules à la carte creates operational gaps. Gate automation without yard visibility creates blind spots. Communications without BOL verification creates disputes. The suite works because every module reinforces the others.
            </p>
          </div>

          <Link href="/contact?intent=qualify" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-neon/90 transition">
            {BRAND.ctas.primary.label}
          </Link>
        </div>
      </section>

      {/* Product Sections with Animations */}
      {PRODUCTS.map((p) => (
        <ProductSection
          key={p.title}
          title={p.title}
          eyebrow={p.eyebrow}
          description={p.description}
          bullets={p.bullets}
          ctaLabel={p.ctaLabel}
          ctaHref={p.ctaHref}
          align={p.align}
          visual={p.visual}
        />
      ))}

      {/* Suite → Persona Map */}
      <section className="py-20 border-y border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <SuitePersonaMap />
        </div>
      </section>

      {/* How It Works Demo */}
      <section className="py-16 bg-carbon/20">
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

      {/* Archetype Episodes - Proof by Persona */}
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
