/**
 * NARRATIVE LADDER COMPONENT
 * 
 * Purpose: Display the unified 6-step narrative framework
 * Design: Vertical progression with step indicators
 * Usage: Homepage, Solutions (archetype-specific), Procurement
 * 
 * The 6 steps:
 * 1. The yard is the constraint (black hole)
 * 2. Standardize the event stream (10 common denominators)
 * 3. Variance is a tax (Variance/Volatility Tax)
 * 4. Throughput is the primary metric (synthetic capacity)
 * 5. Network intelligence compounds (after standardization)
 * 6. Co-Development Program (implementation path)
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BRAND } from '@/config/brand';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/motion-presets';

interface NarrativeLadderProps {
  mode?: 'full' | 'compact' | 'steps-only';
  highlightStep?: number; // 1-6
  showCTA?: boolean;
  className?: string;
}

const STEP_ICONS = [
  // Step 1: Constraint (black hole)
  <svg key="1" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="9" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" fill="currentColor" />
  </svg>,
  // Step 2: Event stream (flow)
  <svg key="2" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M4 12h16M12 4l8 8-8 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Step 3: Variance/tax (chart down)
  <svg key="3" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Step 4: Throughput (gauge)
  <svg key="4" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 2v20M2 12h20" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>,
  // Step 5: Network (nodes)
  <svg key="5" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="5" r="2" strokeWidth="2" />
    <circle cx="5" cy="19" r="2" strokeWidth="2" />
    <circle cx="19" cy="19" r="2" strokeWidth="2" />
    <path d="M12 7v6M10.5 11L7 17M13.5 11L17 17" strokeWidth="2" />
  </svg>,
  // Step 6: Co-Dev (rocket)
  <svg key="6" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" strokeWidth="2" strokeLinejoin="round" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" strokeWidth="2" strokeLinejoin="round" />
  </svg>,
];

export default function NarrativeLadder({
  mode = 'full',
  highlightStep,
  showCTA = true,
  className = '',
}: NarrativeLadderProps) {
  const steps = Object.entries(BRAND.narrative).map(([key, value], idx) => ({
    number: idx + 1,
    ...value,
  }));

  if (mode === 'steps-only') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {steps.map((step) => (
          <div
            key={step.number}
            className={`flex items-center gap-3 text-sm ${
              highlightStep === step.number ? 'text-neon font-semibold' : 'text-steel/70'
            }`}
          >
            <span className="font-mono">{step.number}.</span>
            <span>{step.title}</span>
          </div>
        ))}
      </div>
    );
  }

  if (mode === 'compact') {
    return (
      <div className={`bg-carbon/30 border border-neon/10 rounded-xl p-6 ${className}`}>
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex items-start gap-4 ${
                highlightStep === step.number ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                highlightStep === step.number ? 'bg-neon/20 text-neon' : 'bg-carbon text-steel'
              }`}>
                {STEP_ICONS[step.number - 1]}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold text-sm mb-1">{step.title}</h4>
                <p className="text-steel/70 text-xs">{step.hook}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Full mode (homepage)
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`relative ${className}`}
    >
      {/* Connecting line */}
      <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-neon/20 via-neon/40 to-neon/20" />

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <motion.div
            key={step.number}
            variants={staggerItem}
            className={`relative pl-20 pr-6 ${
              highlightStep === step.number ? 'opacity-100' : 'opacity-100'
            }`}
          >
            {/* Step number bubble */}
            <div
              className={`absolute left-0 top-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${
                highlightStep === step.number
                  ? 'bg-neon/20 border-neon text-neon scale-110'
                  : 'bg-carbon border-neon/30 text-steel'
              }`}
            >
              {STEP_ICONS[idx]}
            </div>

            {/* Content */}
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-neon font-mono text-sm">Step {step.number}</span>
                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
              </div>
              <p className="text-steel/90 text-lg font-semibold mb-2">{step.hook}</p>
              <p className="text-steel leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      {showCTA && (
        <motion.div variants={staggerItem} className="mt-12 pl-20">
          <div className="inline-flex gap-4">
            <Link
              href={BRAND.ctas.primary.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-neon text-void hover:bg-white transition-all shadow-lg shadow-neon/20"
            >
              {BRAND.ctas.primary.label}
            </Link>
            <Link
              href={BRAND.ctas.secondary.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-neon/30 bg-carbon/50 text-white hover:border-neon/50 transition-all"
            >
              {BRAND.ctas.secondary.label}
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
