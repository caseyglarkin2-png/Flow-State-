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
      "Verify every carrier before they enter. Kiosks with OCR, photo capture, and real-time authentication. The yard stops being a blind spot.",
    bullets: [
      "Automated carrier ID verification (OCR + photo)",
      "CDL validation + English proficiency documentation",
      "Real-time driver authentication against carrier database",
      "Flagged credentials rejected at gate",
      "DOT/FMCSA audit trail for shipper liability protection",
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
    ctaLabel: "Request Demo",
    ctaHref: "/contact",
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
    ctaLabel: "Request Demo",
    ctaHref: "/contact",
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
    ctaLabel: "Request Demo",
    ctaHref: "/contact",
    align: "right" as const,
    visual: <DigitalYMSVisual />,
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 border-b border-neon/10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">
            Product Architecture
          </p>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Four Modules. One Protocol.
          </h1>
          
          <p className="text-xl text-steel mb-8 max-w-2xl leading-relaxed">
            Standardize the driver journey. Enforce the control loop. Every yard runs the same playbook. Every event is typed. Every timestamp is defensible.
          </p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-neon/90 transition">
            Run Network Diagnostic
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
      <section className="border-t border-neon/10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Next Step</p>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            Stop the Variance Tax
          </h2>
          <p className="text-lg text-steel mb-8 max-w-2xl mx-auto">
            Run the diagnostic. See where variance costs you. Get the playbook to fix it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-neon/90 transition">
              Get Your Network Rollout Plan
            </Link>
            <Link href="/roi" className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition">
              Model ROI in 3 Minutes
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
