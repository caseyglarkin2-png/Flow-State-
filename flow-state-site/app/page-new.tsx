/**
 * YARDFLOW HOMEPAGE — SIMPLIFIED STORY SPINE (Jan 2026 Rebuild)
 * 
 * Story flow:
 * 1. HERO: Tight headline + 3 bullets + CTA cluster
 * 2. STANDARDIZATION MAP: Before/After toggle (Chaos → Standardized)
 * 3. CONTROL VALVE: Throughput + margin (no variance-tax fluff)
 * 4. CORE MODULES: 4 facility-level products
 * 5. PROOF STATS: Factual operational outcomes
 * 6. ROI TEASER: One panel → "Go to ROI Experience"
 * 7. FOOTER CTA: Procurement + contact
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/config/brand';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/motion-presets';
import { Shield, Velocity, Crosshair, Metrics } from '@/components/icons/FlowIcons';
import { Stat } from '@/components/primitives';

// ═══════════════════════════════════════════════════════════════════
// CONTENT CONFIG — Single source of truth
// ═══════════════════════════════════════════════════════════════════

const HERO_BULLETS = [
  'One protocol across every facility — same driver journey, every yard',
  'Four core modules: Digital Gate, Comms, BOL, Orchestration',
  'Deterministic throughput — variance dies, margins recover',
] as const;

const CORE_MODULES = [
  {
    icon: Shield,
    title: 'Digital Gate',
    description: 'Driver ID verification via kiosk. Lane assignment by algorithm. Instructions via SMS.',
  },
  {
    icon: Velocity,
    title: 'Digital Comms',
    description: 'Two-way messaging with proof-of-receipt. Escalation rules. Dwell alerts.',
  },
  {
    icon: Crosshair,
    title: 'Digital BOL',
    description: 'Touchless documentation. Cryptographic timestamps. Photo proof of condition.',
  },
  {
    icon: Metrics,
    title: 'Digital Orchestration',
    description: 'Real-time yard visualization. Dwell detection. Predictive intelligence.',
  },
] as const;

const PROOF_STATS = [
  { value: '63%', label: 'Variance reduction (Year 1)', source: 'Production data' },
  { value: '40%', label: 'Throughput increase', source: 'Same staff' },
  { value: '90', label: 'Day deployment', source: 'Pilot to production' },
  { value: '99.8%', label: 'Verification success', source: 'Gate accuracy' },
] as const;

// ═══════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function StandardizationMap() {
  const [isStandardized, setIsStandardized] = useState(false);

  return (
    <div className="p-8 rounded-2xl border border-neon/20 bg-carbon/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Your Yard Network</h3>
        <button
          onClick={() => setIsStandardized(!isStandardized)}
          className={`relative w-48 h-10 rounded-full transition-all duration-300 ${
            isStandardized ? 'bg-neon/20' : 'bg-ember/20'
          }`}
          role="switch"
          aria-checked={isStandardized}
          aria-label="Toggle between chaos and standardized view"
        >
          <span
            className={`absolute top-1 left-1 w-[calc(50%-4px)] h-8 rounded-full bg-void flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
              isStandardized ? 'translate-x-full bg-neon text-void' : 'bg-ember text-white'
            }`}
          >
            {isStandardized ? 'Standardized' : 'Today'}
          </span>
          <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs ${isStandardized ? 'text-steel/50' : 'text-white'}`}>
            Today
          </span>
          <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${isStandardized ? 'text-white' : 'text-steel/50'}`}>
            Standardized
          </span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl transition-all duration-300 ${
          isStandardized ? 'bg-void/50 opacity-50' : 'bg-ember/10 border border-ember/30'
        }`}>
          <p className="text-sm font-mono text-ember mb-2">Before: 15-25 local processes</p>
          <ul className="text-sm text-steel space-y-1">
            <li>• Gate time varies 3-5x by shift</li>
            <li>• Dwell depends on tribal knowledge</li>
            <li>• Detention surprises on invoices</li>
            <li>• Each site runs own playbook</li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl transition-all duration-300 ${
          isStandardized ? 'bg-neon/10 border border-neon/30' : 'bg-void/50 opacity-50'
        }`}>
          <p className="text-sm font-mono text-neon mb-2">After: ~10 standard protocols</p>
          <ul className="text-sm text-steel space-y-1">
            <li>• Same check-in flow everywhere</li>
            <li>• FIFO enforced by system</li>
            <li>• Real-time alerts before thresholds</li>
            <li>• One operating system, one truth</li>
          </ul>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-steel">
        <span className="text-white font-semibold">Result:</span> 23% gate variance → 4% in 90 days
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <main id="main-content">
        {/* ═══════════════════════════════════════════════════════════
            STEP 1: HERO — Tight, no fluff
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              {/* Brand frame */}
              <p className="text-xs uppercase tracking-[0.3em] text-neon/70 text-center mb-4">
                YardFlow by FreightRoll
              </p>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white text-center leading-[1.1]">
                The Operating System for<br />
                <span className="text-neon">Multi-Site Yards</span>
              </h1>

              {/* 3 Bullets */}
              <ul className="mt-10 max-w-2xl mx-auto space-y-3">
                {HERO_BULLETS.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg text-steel">
                    <span className="text-neon font-bold mt-1">→</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Cluster */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/roi"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white transition-all shadow-lg shadow-neon/20"
                >
                  Model Your Network ROI
                </Link>
                <div className="flex gap-3">
                  <Link
                    href="/product"
                    className="inline-flex items-center px-5 py-3 rounded-xl font-medium text-sm border border-neon/30 text-white hover:border-neon/60 transition-all"
                  >
                    View Product
                  </Link>
                  <Link
                    href="/procurement"
                    className="inline-flex items-center px-5 py-3 rounded-xl font-medium text-sm border border-steel/30 text-steel hover:text-white hover:border-steel/60 transition-all"
                  >
                    Procurement
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            STEP 2: STANDARDIZATION MAP — Before/After toggle
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 border-t border-neon/10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">The Transformation</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Collapse Variance Across Your Network
              </h2>
            </div>
            <StandardizationMap />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            STEP 3: CONTROL VALVE — Throughput + Margin
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-carbon/20 border-y border-ember/20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-ember/70 mb-3">The Control Valve</p>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                The Yard is Where Throughput Dies
              </h2>
              <p className="text-xl text-steel max-w-3xl mx-auto">
                Manual check-in. Random queues. Dwell that spikes into detention.{' '}
                <span className="text-white font-semibold">The yard consumes margin that never comes back.</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 rounded-xl border border-ember/20 bg-ember/5">
                <h3 className="text-lg font-bold text-white mb-4">Without Protocol</h3>
                <ul className="space-y-3 text-steel text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-ember">×</span>
                    <span>Gate time varies 3-5x depending on shift</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ember">×</span>
                    <span>Dwell depends on tribal knowledge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ember">×</span>
                    <span>Detention surprises on invoices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ember">×</span>
                    <span>No network learning across sites</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-xl border border-neon/20 bg-neon/5">
                <h3 className="text-lg font-bold text-white mb-4">The Protocol is the Product</h3>
                <p className="text-steel text-sm leading-relaxed">
                  YardFlow enforces the same driver journey at every facility. Same steps. Same sequence. Same proof requirements.
                </p>
                <p className="text-white font-semibold text-sm mt-4">
                  Variance dies. Throughput becomes calculable.
                </p>
                <Link href="/product" className="inline-flex items-center gap-2 text-neon text-sm font-semibold mt-4 hover:underline">
                  See the modules →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            STEP 4: CORE MODULES — 4 facility-level products
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Facility Install</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Four Modules. One Protocol.
                </h2>
                <p className="text-lg text-steel max-w-2xl mx-auto">
                  Every facility gets the same stack. Every driver gets the same journey.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {CORE_MODULES.map((module, i) => (
                  <motion.div key={i} variants={staggerItem}>
                    <div className="p-6 rounded-xl border border-neon/20 bg-void/50 hover:border-neon/40 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <module.icon size={28} className="text-neon" />
                        <h3 className="text-lg font-bold text-white">{module.title}</h3>
                      </div>
                      <p className="text-steel text-sm leading-relaxed">{module.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  href="/product"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-neon border border-neon/30 hover:bg-neon/10 transition-all"
                >
                  Explore Product Details →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            STEP 5: PROOF STATS — Factual, not poetry
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-carbon/30 border-y border-neon/10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Production Data</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Results from Live Deployments
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {PROOF_STATS.map((stat, i) => (
                <div key={i} className="text-center p-4">
                  <p className="text-3xl md:text-4xl font-black text-neon">{stat.value}</p>
                  <p className="text-sm text-white font-medium mt-2">{stat.label}</p>
                  <p className="text-xs text-steel mt-1">{stat.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            STEP 6: ROI TEASER — Single panel hook
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="p-10 rounded-2xl border border-neon/20 bg-gradient-to-br from-neon/5 to-void text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-4">ROI Experience</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Model Your Network in 3 Minutes
              </h2>
              <p className="text-lg text-steel mb-8 max-w-2xl mx-auto">
                Configure facilities, see year 1-3 projections, watch network effects compound. 
                Deep model with full input control.
              </p>
              <Link
                href="/roi"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white transition-all shadow-lg shadow-neon/20"
              >
                Open ROI Experience →
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            STEP 7: FOOTER CTA
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
