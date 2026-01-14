'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metrics, Agent, Confirm, Nexus, Shield, Velocity, Crosshair } from '@/components/icons/FlowIcons';
import Link from 'next/link';
import AnimatedPanel from '@/components/AnimatedPanel';
import { ProductSection } from '@/components/products/ProductSection';
import { DigitalGuardVisual, DigitalCommsVisual, DigitalBOLVisual, DigitalYMSVisual } from '@/components/products/ProductVisualsLite';

const PRODUCTS = [
  {
    title: "Digital Guard",
    eyebrow: "Module 1",
    description:
      "Verify every carrier before they enter. Self-service kiosks with OCR, photo capture, and real-time authentication so the yard stops being a blind spot.",
    bullets: [
      "Automated carrier ID verification (OCR + photo)",
      "CDL validation + English proficiency documentation",
      "Real-time driver authentication against carrier database",
      "Flagged credentials rejected at gate",
      "DOT/FMCSA audit trail for shipper liability protection",
    ],
    ctaLabel: "Apply for Access",
    ctaHref: "/singularity",
    align: "left" as const,
    visual: <DigitalGuardVisual />,
  },
  {
    title: "Digital Comms",
    eyebrow: "Module 2",
    description:
      "Direct driver messaging at the lane level. No 'I never got the message' excuses. Disputes shrink when receipts exist.",
    bullets: [
      "Lane-based instructions and notifications",
      "Multi-language support (40+ languages)",
      "Read receipts and message history",
      "Fewer yard walk-ups, fewer interruptions",
      "Real-time dock assignment coordination",
    ],
    ctaLabel: "Apply for Access",
    ctaHref: "/singularity",
    align: "right" as const,
    visual: <DigitalCommsVisual />,
  },
  {
    title: "Digital BOL",
    eyebrow: "Module 3",
    description:
      "Touchless documentation with forensic-grade timestamps. Photo proof of load condition so detention disputes die young.",
    bullets: [
      "Gate verification and ID scanning",
      "Condition capture with photo evidence",
      "Cryptographic timestamp trail",
      "CTPAT & TSA compliance reporting",
      "Network-wide BOL signature collection",
    ],
    ctaLabel: "See Security Details",
    ctaHref: "/resources/procurement",
    align: "left" as const,
    visual: <DigitalBOLVisual />,
  },
  {
    title: "Digital YMS",
    eyebrow: "Module 4",
    description:
      "One place to store, search, and prove what happened. When the yard is a courtroom, this is your exhibit binder.",
    bullets: [
      "Real-time yard visualization and asset tracking",
      "Dwell anomaly detection and alerts",
      "Network-wide predictive intelligence",
      "Faster dispute resolution and fewer chargebacks",
      "Operational clarity for dispatchers and yard managers",
    ],
    ctaLabel: "Request a Demo",
    ctaHref: "/singularity",
    align: "right" as const,
    visual: <DigitalYMSVisual />,
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-neon font-mono text-sm tracking-widest mb-6 uppercase">
            Network-First Product Architecture
          </p>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            Four Modules. <span className="text-neon">One Network.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-steel mb-12 max-w-3xl mx-auto">
            Standardize the driver journey. Enforce the control loop. Unlock network intelligence.
          </p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold bg-neon text-void hover:shadow-lg transition-all">
            <Crosshair size={20} />
            Run Your Network Diagnostic
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

      {/* CTA Section */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-8">Ready to Transform Your Yard?</h2>
          <p className="text-xl text-steel/90 mb-12">
            Book a call. We'll map your network, show you the rollout plan, and hand you the board-ready ROI model.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 rounded-lg font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all hover:scale-105">
            Get Your Network Rollout Plan
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
