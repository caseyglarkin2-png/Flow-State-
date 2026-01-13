'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import StandardizationBand from '@/components/StandardizationBand';
import { ExpandableCard } from '@/components/ExpandableCard';
import { Metrics, Agent, Confirm, Nexus, Shield, Velocity, Crosshair } from '@/components/icons/FlowIcons';
import Link from 'next/link';

export default function ProductPage() {
  
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-neon font-mono text-sm tracking-widest mb-6 uppercase">
              Network-First Product Architecture
            </p>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
              Four Modules. <span className="text-neon">One Network.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-steel mb-6 max-w-3xl mx-auto">
              Standardize the driver journey. Enforce the control loop. Unlock network intelligence.
            </p>
          </div>

          {/* Standardization Band Visual */}
          <div className="mb-12">
            <StandardizationBand />
          </div>

          <div className="text-center">
            <p className="text-steel/80 max-w-3xl mx-auto mb-8">
              Every yard is different. But the driver journey can—and must—be identical. 
              This standardized band (QR check-in, defensible timestamps, multilingual comms) 
              is the foundation that makes network control possible.
            </p>
            <Link href="/diagnostic" className="btn-neon-fill inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold bg-neon text-void hover:shadow-lg transition-all">
              <Crosshair size={20} />
              Run Your Network Diagnostic
            </Link>
          </div>
        </div>
      </section>

      {/* Module Overview */}
      <section className="py-20 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black mb-4">Four Modules. One Network.</h2>
            <p className="text-xl text-steel/80 max-w-3xl mx-auto">
              Each module solves a specific yard problem. Together, they create standardized data that powers network-level intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExpandableCard
              id="module-guard"
              title="1. Digital Guard"
              bullets={[
                'Automated carrier ID verification with OCR + photo capture',
                'Real-time authentication against carrier database',
                'DOT/FMCSA audit trail for liability protection'
              ]}
              defaultOpen={true}
            >
              <div className="space-y-3 text-sm">
                <p className="text-steel/80 leading-relaxed">
                  Your biggest security risk is not knowing who is on your property. Digital Guard verifies every carrier before they enter using self-service kiosks with OCR license scanning, photo capture, and real-time authentication.
                </p>
                <div>
                  <p className="text-white font-semibold mb-1">Key Capabilities:</p>
                  <ul className="list-disc list-inside text-steel/80 space-y-1">
                    <li>CDL validation + English proficiency documentation</li>
                    <li>Flagged credentials rejected at gate</li>
                    <li>Complete entry/exit tracking</li>
                    <li>CTPAT & TSA compliance reporting</li>
                  </ul>
                </div>
              </div>
            </ExpandableCard>

            <ExpandableCard
              id="module-comms"
              title="2. Digital Comms"
              bullets={[
                'Direct-to-driver messaging in 40+ languages',
                'SMS + app notifications with read receipts',
                'No radio, no PA system, no disputes'
              ]}
              defaultOpen={false}
            >
              <div className="space-y-3 text-sm">
                <p className="text-steel/80 leading-relaxed">
                  Eliminate communication breakdowns with direct-to-driver messaging. Send real-time instructions via SMS with automatic translation, ensuring every driver receives clear, documented directions.
                </p>
                <div>
                  <p className="text-white font-semibold mb-1">Key Capabilities:</p>
                  <ul className="list-disc list-inside text-steel/80 space-y-1">
                    <li>Zero app downloads required</li>
                    <li>Real-time navigation to dock doors</li>
                    <li>Automatic message confirmation tracking</li>
                    <li>Multilingual support with auto-translation</li>
                  </ul>
                </div>
              </div>
            </ExpandableCard>

            <ExpandableCard
              id="module-bol"
              title="3. Digital BOL"
              bullets={[
                'Touchless documentation with forensic-grade timestamps',
                '100% paperless BOL workflow',
                'Eliminates detention disputes before they happen'
              ]}
              defaultOpen={false}
            >
              <div className="space-y-3 text-sm">
                <p className="text-steel/80 leading-relaxed">
                  Replace paper processes with cryptographically-signed digital records. Photo proof of load condition, automated timestamp capture, and complete chain-of-custody documentation.
                </p>
                <div>
                  <p className="text-white font-semibold mb-1">Key Capabilities:</p>
                  <ul className="list-disc list-inside text-steel/80 space-y-1">
                    <li>Photo documentation at every handoff</li>
                    <li>Cryptographic timestamp audit trail</li>
                    <li>Automated carrier billing integration</li>
                    <li>Legal-grade proof for disputes</li>
                  </ul>
                </div>
              </div>
            </ExpandableCard>

            <ExpandableCard
              id="module-yms"
              title="4. Digital YMS"
              bullets={[
                'Real-time GPS asset tracking',
                'AI-powered dock assignments',
                'Autonomous move execution'
              ]}
              defaultOpen={false}
            >
              <div className="space-y-3 text-sm">
                <p className="text-steel/80 leading-relaxed">
                  Real-time asset tracking with AI-powered dock assignments. The system doesn't just show you where trailers are—it tells you where they should go next and executes moves automatically.
                </p>
                <div>
                  <p className="text-white font-semibold mb-1">Key Capabilities:</p>
                  <ul className="list-disc list-inside text-steel/80 space-y-1">
                    <li>Intuitive drag-and-drop yard map</li>
                    <li>AI recommendations based on historical patterns</li>
                    <li>Automated jockey dispatch</li>
                    <li>WMS/ERP integration for JIT scheduling</li>
                  </ul>
                </div>
              </div>
            </ExpandableCard>
          </div>
        </div>
      </section>

      {/* Module 1: Digital Guard */}
      <section className="py-24 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="inline-block px-3 py-1 rounded bg-neon/10 border border-neon/40 mb-4">
                <span className="text-neon font-mono text-xs uppercase tracking-wider">Chapter 1: Standardization Band</span>
              </div>
              <h2 className="text-5xl font-black mb-6">Digital Guard</h2>
              <p className="text-lg text-steel/90 mb-4 leading-relaxed">
                Your biggest security risk is not knowing who is on your property. 
                <span className="text-neon font-semibold"> Digital Guard verifies every carrier before they enter.</span>
              </p>
              <p className="text-steel/80 mb-8">
                Self-service kiosks with OCR license scanning, photo capture, and real-time authentication. 
                Reject unauthorized drivers instantly. Track every entry and exit.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Automated carrier ID verification (OCR + photo)',
                  'CDL validation + English proficiency documentation',
                  'Real-time driver authentication against carrier database',
                  'Flagged credentials rejected at gate',
                  'DOT/FMCSA audit trail for shipper liability protection',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <Confirm size={20} className="text-neon flex-shrink-0" />
                    <span className="text-steel/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/singularity" className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-neon text-neon hover:bg-neon hover:text-void transition-all">
                Apply for Access
              </Link>
            </div>

            {/* Visual Placeholder */}
            <div className="glass-card aspect-video flex items-center justify-center p-12">
              <p className="text-white text-center text-xl font-semibold">
                Animated Image of a gate with a kiosk
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Module 2: Digital YMS */}
      <section className="py-24 bg-carbon/50 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Placeholder */}
            <div className="glass-card aspect-video flex items-center justify-center p-12 order-2 lg:order-1">
              <p className="text-white text-center text-xl font-semibold">
                Animated Image of a yard like below
              </p>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="inline-block px-3 py-1 rounded bg-steel/10 border border-steel/40 mb-4">
                <span className="text-steel font-mono text-xs uppercase tracking-wider">Chapter 2: Control Loop</span>
              </div>
              <h2 className="text-5xl font-black mb-6">Digital YMS</h2>
              <p className="text-lg text-steel/90 mb-8 leading-relaxed">
                Real-time asset tracking with AI-powered dock assignments. The system doesn't just show you where trailers are—it tells you where they should go next.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Real-time GPS tracking',
                  'Intuitive drag-and-drop moves',
                  'AI-powered recommendations',
                  'Autonomous move execution',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <Confirm size={20} className="text-neon flex-shrink-0" />
                    <span className="text-steel/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/singularity" className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-neon text-neon hover:bg-neon hover:text-void transition-all">
                Apply for Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Module 3: Digital Comms */}
      <section className="py-24 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="inline-block px-3 py-1 rounded bg-neon/10 border border-neon/40 mb-4">
                <span className="text-neon font-mono text-xs uppercase tracking-wider">Chapter 1: Standardization Band</span>
              </div>
              <h2 className="text-5xl font-black mb-6">Digital Comms</h2>
              <p className="text-lg text-steel/90 mb-8 leading-relaxed">
                Direct-to-driver messaging in 40+ languages. No radio. No PA system. No "I never got the message" disputes. SMS + app notifications with read receipts.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'SMS-based instructions',
                  'Multi-language support',
                  'Zero app downloads',
                  'Real-time navigation',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <Confirm size={20} className="text-neon flex-shrink-0" />
                    <span className="text-steel/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/singularity" className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-neon text-neon hover:bg-neon hover:text-void transition-all">
                Apply for Access
              </Link>
            </div>

            {/* Visual Placeholder */}
            <div className="glass-card aspect-video flex items-center justify-center p-12">
              <p className="text-white text-center text-xl font-semibold">
                Animated Image of a chain of messages on mobile / PC
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Module 4: Digital BOL */}
      <section className="py-24 border-b border-neon/20 bg-gradient-to-b from-void to-carbon/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Placeholder */}
            <div className="glass-card aspect-video flex items-center justify-center p-12">
              <p className="text-white text-center text-xl font-semibold">
                Animation of documents flying around various nodes within a supply chain
              </p>
            </div>

            {/* Text */}
            <div>
              <div className="inline-block px-3 py-1 rounded bg-steel/10 border border-steel/40 mb-4">
                <span className="text-steel font-mono text-xs uppercase tracking-wider">Chapter 2: Control Loop</span>
              </div>
              <h2 className="text-5xl font-black mb-6">Digital BOL</h2>
              <p className="text-lg text-steel/90 mb-8 leading-relaxed">
                Touchless documentation with forensic-grade timestamps. 100% paperless BOL workflow. Photo proof of load condition. Eliminates detention disputes before they happen.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'ID scanning + verification at gate',
                  'Biometric authentication options',
                  'Carrier credentialing database',
                  'Cryptographic timestamp audit trail',
                  'CTPAT & TSA compliance reporting',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <Confirm size={20} className="text-neon flex-shrink-0" />
                    <span className="text-steel/80">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-steel/70 text-sm mb-6">
                <strong className="text-ember">Security savings:</strong> Theft prevention, insurance premium reduction, compliance cost avoidance, investigation elimination.
              </p>
              <Link href="/resources/procurement" className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-neon text-neon hover:bg-neon hover:text-void transition-all">
                See Security Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-carbon/50 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-12">Why YardFlow by FreightRoll?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Velocity size={40} />,
                title: 'Lightning Fast',
                desc: 'Reduce yard dwell time by 50% with optimized workflows.',
              },
              {
                icon: <Crosshair size={40} />,
                title: 'Precision Tracking',
                desc: 'Know exactly where every asset is, every moment.',
              },
              {
                icon: <Shield size={40} />,
                title: 'Enterprise Security',
                desc: 'Bank-grade encryption and compliance-ready architecture.',
              },
              {
                icon: <Agent size={40} />,
                title: 'AI-Powered',
                desc: 'Intelligent move recommendations learn from your patterns.',
              },
              {
                icon: <Metrics size={40} />,
                title: 'Real-Time Analytics',
                desc: 'Live dashboards with actionable operational insights.',
              },
              {
                icon: <Nexus size={40} />,
                title: 'Global Scale',
                desc: 'Deploy across multi-site networks with unified control.',
              },
            ].map((feature, i) => (
              <Card key={i} hover>
                <div className="text-neon mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-neon">{feature.title}</h3>
                <p className="text-steel/80">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-8">Ready to Transform Your Yard?</h2>
          <p className="text-xl text-steel/90 mb-4">Only 3 Founding Member spots remaining.</p>
          <p className="text-lg text-neon font-semibold mb-12">Applications close when filled.</p>
          <Link href="/singularity" className="btn-neon-fill inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all">
            <Crosshair size={20} className="text-void" />
            Apply for Membership
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
