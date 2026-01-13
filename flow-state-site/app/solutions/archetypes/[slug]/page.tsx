'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, Velocity, Crosshair, Confirm } from '@/components/icons/FlowIcons';

type Archetype = 'dry-van-reefer' | 'intermodal' | 'flatbed-industrial' | 'tanker-hazmat';

interface ArchetypeConfig {
  label: string;
  icon: string;
  leaks: string[];
  standardization: string[];
  instrumentation: Array<{
    module: string;
    icon: React.ComponentType<any>;
    emphasis: string;
  }>;
  networkPayoff: string;
  proofArtifacts: string[];
}

const archetypeData: Record<Archetype, ArchetypeConfig> = {
  'dry-van-reefer': {
    label: 'Dry Van & Reefer',
    icon: '🚛',
    leaks: [
      'Reefer temp verification failures at gate',
      'Detention disputes over missed dock windows',
      'Carrier no-shows with zero visibility',
    ],
    standardization: [
      'Gate check-in (OCR scan, photo capture, reefer temp verification)',
      'Dock assignment logic (temperature-controlled priority queuing)',
      'Load/unload timestamping',
      'Detention clock automation',
      'Reefer unit validation (real-time temp alerts)',
    ],
    instrumentation: [
      {
        module: 'Digital Guard',
        icon: Shield,
        emphasis: 'Reefer temp verification at gate, OCR scan of shipping docs',
      },
      {
        module: 'Digital Comms',
        icon: Velocity,
        emphasis: 'Real-time dock slot coordination, temp tracking module',
      },
      {
        module: 'Digital BOL',
        icon: Crosshair,
        emphasis: 'Chain-of-custody timestamping, temp compliance audit trail',
      },
      {
        module: 'Digital YMS',
        icon: Confirm,
        emphasis: 'Detention clock automation, priority queuing for reefer loads',
      },
    ],
    networkPayoff: 'Cross-site reefer performance benchmarks. Predictive temp failure alerts. Carrier reefer reliability scores shared across network.',
    proofArtifacts: [
      'Reefer temp compliance report (24-hour audit trail)',
      'Detention recovery analysis (before/after YardFlow)',
      'Gate throughput comparison (legacy vs standardized)',
    ],
  },
  intermodal: {
    label: 'Intermodal',
    icon: '🚢',
    leaks: [
      'Chassis pool visibility zero—drivers hunt for chassis, demurrage piles up',
      'Interchange accuracy issues (DCLI/TRAC data mismatches)',
      'Container dwell time unknown until P&D crisis',
    ],
    standardization: [
      'Chassis pool tracking (real-time inventory)',
      'Interchange accuracy (OCR + photo capture)',
      'Container dwell monitoring',
      'Detention clock automation',
      'Cross-dock prioritization for rail/port windows',
    ],
    instrumentation: [
      {
        module: 'Digital Guard',
        icon: Shield,
        emphasis: 'Chassis/container OCR, photo capture for interchange accuracy',
      },
      {
        module: 'Digital Comms',
        icon: Velocity,
        emphasis: 'Real-time chassis pool status, dwell alerts to dispatch',
      },
      {
        module: 'Digital BOL',
        icon: Crosshair,
        emphasis: 'Interchange timestamp reconciliation, DCLI/TRAC data validation',
      },
      {
        module: 'Digital YMS',
        icon: Confirm,
        emphasis: 'Dwell-based prioritization, detention automation',
      },
    ],
    networkPayoff: 'Network-wide chassis pool visibility. Cross-site interchange accuracy benchmarks. Predictive dwell alerts based on historical patterns.',
    proofArtifacts: [
      'Chassis utilization report (dwell time, interchange accuracy)',
      'Demurrage recovery analysis',
      'Cross-dock efficiency comparison (before/after)',
    ],
  },
  'flatbed-industrial': {
    label: 'Flatbed & Industrial',
    icon: '🏗️',
    leaks: [
      'Securement verification is visual-only (no photo capture)',
      'Load height/weight disputes at scale',
      'Dock assignment guesswork',
    ],
    standardization: [
      'Image capture for strapping + tarping verification',
      'Load securement checklist (digital sign-off)',
      'Weight/dimension validation',
      'Flatbed-specific dock assignment logic',
      'Detention clock automation',
    ],
    instrumentation: [
      {
        module: 'Digital Guard',
        icon: Shield,
        emphasis: 'Photo capture for securement verification, weight/dimension scan',
      },
      {
        module: 'Digital Comms',
        icon: Velocity,
        emphasis: 'Flatbed dock assignment coordination, securement checklist alerts',
      },
      {
        module: 'Digital BOL',
        icon: Crosshair,
        emphasis: 'Securement compliance audit trail, weight/dimension timestamping',
      },
      {
        module: 'Digital YMS',
        icon: Confirm,
        emphasis: 'Flatbed-specific dock logic, detention automation',
      },
    ],
    networkPayoff: 'Network-wide securement compliance benchmarks. Shared image library for insurance claims. Cross-site weight/dimension variance detection.',
    proofArtifacts: [
      'Securement compliance report (photo audit trail)',
      'Weight/dimension variance analysis',
      'Dock efficiency comparison (flatbed vs dry van)',
    ],
  },
  'tanker-hazmat': {
    label: 'Tanker & Hazmat',
    icon: '⚗️',
    leaks: [
      'Driver qualification verification manual (no real-time HAZMAT cert check)',
      'Chain-of-custody timestamping gaps (regulatory risk)',
      'TSA/CTPAT compliance documentation scattered',
    ],
    standardization: [
      'Driver qualification verification (real-time HAZMAT cert check)',
      'Chain-of-custody timestamping (every touchpoint)',
      'CTPAT/TSA compliance documentation',
      'Detention clock automation',
      'Emergency response protocol integration',
    ],
    instrumentation: [
      {
        module: 'Digital Guard',
        icon: Shield,
        emphasis: 'HAZMAT driver qualification check, OCR for shipping papers',
      },
      {
        module: 'Digital Comms',
        icon: Velocity,
        emphasis: 'Chain-of-custody alerts, emergency response protocol triggers',
      },
      {
        module: 'Digital BOL',
        icon: Crosshair,
        emphasis: 'Regulatory audit trail (CTPAT/TSA), timestamped chain-of-custody',
      },
      {
        module: 'Digital YMS',
        icon: Confirm,
        emphasis: 'Hazmat-specific dock assignment, detention automation',
      },
    ],
    networkPayoff: 'Network-wide HAZMAT compliance benchmarks. Shared driver qualification scores. Cross-site emergency response protocol standardization.',
    proofArtifacts: [
      'HAZMAT compliance report (driver qualification, chain-of-custody)',
      'TSA/CTPAT audit trail',
      'Emergency response protocol validation',
    ],
  },
};

export default function ArchetypePage({ params }: { params: { slug: string } }) {
  const slug = params.slug as Archetype;
  const config = archetypeData[slug];

  if (!config) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-void text-white">
      {/* Breadcrumb */}
      <section className="pt-32 pb-8 border-b border-neon/20 bg-gradient-to-b from-carbon/50 to-void">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-sm text-steel/70 mb-4">
            <Link href="/solutions" className="hover:text-neon">Solutions</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{config.label}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-neon to-white bg-clip-text text-transparent">
            {config.label}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Tailored solution for {config.label.toLowerCase()} operations—standardize processes, instrument touchpoints, unlock network intelligence.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        
        {/* A) LEAKS */}
        <section>
          <h2 className="text-4xl font-black mb-8 text-neon">
            What leaks look like for {config.label}
          </h2>
          <ul className="space-y-4">
            {config.leaks.map((leak, idx) => (
              <li key={idx} className="flex items-start gap-4 text-lg text-gray-300">
                <span className="text-red-400 font-black text-2xl">⚠</span>
                {leak}
              </li>
            ))}
          </ul>
        </section>

        {/* B) STANDARDIZATION */}
        <section>
          <h2 className="text-4xl font-black mb-8 text-neon">
            What we standardize first
          </h2>
          <p className="text-gray-300 mb-6">
            These are the common denominators—processes every {config.label.toLowerCase()} facility runs.
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {config.standardization.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-carbon/30 p-4 rounded-lg">
                <span className="text-neon font-black text-xl">✓</span>
                <span className="text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* C) INSTRUMENTATION */}
        <section>
          <h2 className="text-4xl font-black mb-8 text-neon">
            What we instrument
          </h2>
          <p className="text-gray-300 mb-6">
            Four modules. Each tailored to your archetype.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {config.instrumentation.map((inst, idx) => {
              const IconComponent = inst.icon;
              return (
                <div key={idx} className="bg-carbon/30 p-6 rounded-lg border border-neon/10">
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="w-8 h-8 text-neon" />
                    <h3 className="text-2xl font-black">{inst.module}</h3>
                  </div>
                  <p className="text-gray-300 italic">
                    <span className="text-neon font-bold">For {config.label}:</span> {inst.emphasis}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* D) NETWORK PAYOFF */}
        <section className="bg-gradient-to-br from-neon/10 via-carbon/30 to-void/50 p-8 rounded-lg border border-neon/20">
          <h2 className="text-4xl font-black mb-6 text-neon">
            Network-level payoff
          </h2>
          <p className="text-xl text-gray-200">
            {config.networkPayoff}
          </p>
        </section>

        {/* E) PROOF */}
        <section>
          <h2 className="text-4xl font-black mb-8 text-neon">
            Proof + Artifacts
          </h2>
          <p className="text-gray-300 mb-6">
            What you get from the Evidence Vault:
          </p>
          <ul className="space-y-3">
            {config.proofArtifacts.map((artifact, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-neon font-black text-xl">📊</span>
                <span className="text-gray-200 text-lg">{artifact}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* F) CTA CLUSTER */}
        <section className="grid md:grid-cols-2 gap-6 pt-8 border-t border-neon/20">
          <Link
            href="/diagnostic"
            className="block bg-neon text-void px-8 py-6 rounded-lg font-black text-xl text-center hover:shadow-neon/50 hover:shadow-lg transition-all"
          >
            Get Your Network Rollout Plan →
          </Link>
          <Link
            href="/resources/procurement"
            className="block border-2 border-neon text-neon px-8 py-6 rounded-lg font-black text-xl text-center hover:bg-neon/10 transition-all"
          >
            Request Procurement Packet →
          </Link>
        </section>
      </div>
    </div>
  );
}
