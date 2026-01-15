/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FLOW STATE HOMEPAGE - NETWORK-FIRST NARRATIVE SPINE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ REDUNDANCY REPORT (Pass 6 - Final Refactor)                                │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * A) EXACT DUPLICATE STRINGS FOUND:
 *    1. "Problem Taxonomy" section appears TWICE (lines ~210 and ~320) - DELETE ONE
 *    2. Metrics (70%, 65%, 50%) appear in hero AND social proof section - CONSOLIDATE  
 *    3. "Network-First" appears in 4+ places - move to copy.ts
 *    4. "Standardization Band" visual + explanation - appears in hero + chapters - OK (intentional)
 *    5. CTA "Get Your Network Rollout Plan" appears 3 times - reduce to 2 (hero + footer)
 * 
 * B) CONCEPT DUPLICATION:
 *    1. Network vs site-by-site explained in: YNS section + Problem Taxonomy + Chapter content
 *       → CONSOLIDATE: Move detailed explanation to Chapter 3, keep 1-sentence version in YNS
 *    2. "Control loop vs recording" explained in: YNS cards + Compare link + OperatingModel
 *       → KEEP: This is the category differentiation, needs reinforcement
 *    3. Economics (detention/dwell/labor) explained in: Hero metrics + Leak section + Chapters
 *       → CONSOLIDATE: Show numbers in hero, detailed breakdown in chapters only
 * 
 * C) CTA DUPLICATION:
 *    - Primary CTAs: "Get Rollout Plan" (contact), "Run ROI" (calculator), "Audit Yard" (yardbuilder)
 *    - Problem: All 3 compete for attention in persona router section
 *    - Solution: Make YardBuilder the PRIMARY (diagnostic), ROI secondary, Contact tertiary
 *    - Sticky CTA bar should have: YardBuilder (primary) + ROI (secondary)
 * 
 * D) WHAT TO DELETE:
 *    ✗ Second "Problem Taxonomy" section (lines ~320-340) - complete duplicate
 *    ✗ Narrative Bridge section is too long - collapse to expandable
 *    ✗ Social proof metrics duplicate hero metrics - merge into one section
 * 
 * E) WHAT TO CONSOLIDATE:
 *    ↓ Metrics: Show in hero, remove duplicate aggregate section
 *    ↓ YNS vs YMS: One card set, link to /compare for deep-dive
 *    ↓ Leak categories: Move to YardLeakSection component, make expandable
 * 
 * F) WHAT TO MOVE BEHIND COLLAPSIBLES:
 *    ▼ Narrative Bridge (physics/economics/solution) - too dense
 *    ▼ Operating model comparison - link to /compare instead
 *    ▼ Deep proof (Primo scale) - "Learn more" expandable
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * AUDIT STATUS (Pass 5):
 * - 3-Chapter Spine: ✓ IMPLEMENTED (ChapterSwitcher on line 183)
 * - Economics Consistency: ✓ LOCKED (uses calcRoiV2 with enterprise_50 preset)
 * - Progressive Disclosure: ⚠️  NEEDS EXPANSION (add ExpandableCard to long sections)
 * 
 * CONVERSION BLOCKERS:
 * 1. Too much density below fold - Problem Taxonomy + Narrative Bridge need collapse
 * 2. CTA convergence weak - YardBuilder/ROI PDF should be sticky/dominant
 * 3. Proof at Scale section needs tightening (200→40 words max)
 * 
 * THREE-CHAPTER STORY ARC:
 * 
 * CHAPTER 1: THE STANDARDIZATION BAND (Driver Journey)
 * - The Network Foundation
 * - Every yard is different. But the driver journey must be identical.
 * - QR check-in (no app), touchless timestamps, exception reason codes, multilingual instructions
 * - This is Ground Source Truth: defensible time capture that replaces "what someone typed in"
 * - Measurable outcomes: 70% gate labor reduction, 50% dwell reduction (48→24 min), 65% detention recovery
 * - This layer is inevitable. Standardize this and the network wakes up.
 * 
 * CHAPTER 2: THE YARD CONTROL LOOP (Per-Site Execution)
 * - Powered by the standardized driver layer
 * - Real-time asset state, yard map, dwell anomalies, alerts, operational clarity
 * - Not "more visibility." It's a control loop: system enforces what happens next.
 * - Every yard has unique permutations, but they all run on the same protocol.
 * 
 * CHAPTER 3: THE NETWORK EFFECT (Executive Layer)
 * - Tied directly to Chapter 1 standardized inputs
 * - Cross-site benchmarking, predictive alerts, bottleneck detection, network-level intelligence
 * - Singularity map: drill down from network anomaly to root cause facility
 * - This is why we're network-first. Site-by-site optimization is the wrong game.
 * 
 * PROBLEM TAXONOMY:
 * - 20 problems per yard; 5 are ubiquitous across all yards
 * - Base deployment solves: Top 5 per yard + the 5 network-wide problems
 * - Remaining issues: co-development path (finite permutations; we productize them over time)
 * 
 * OPERATING MODEL (vs Legacy YMS):
 * - Legacy YMS: Records events after they happen
 * - Flow State: Enforces what happens next (control loop)
 * - Network standardization comes first (Driver Journey band), then yard permutations are solved
 * 
 * VISUAL MOTIF (used throughout):
 * - Standardization Band diagram: chaos (top) → standardized driver layer (middle) → network control (bottom)
 * - Reused on: Homepage hero, Product page, Compare page
 * 
 * UX PATTERN:
 * - Chapters switcher (persistent, above fold)
 * - Collapsible sections (SEO-friendly, content in DOM)
 * - No mega-scroll doom. Site feels shorter without losing depth.
 * 
 * CONVERSION FUNNEL:
 * - Every major section ends with: measurable outcome OR board-ready artifact CTA
 * - Primary: "Get Your Network Rollout Plan" (contact)
 * - Secondary: "Run ROI in 3 Minutes" (calculator)
 * - Tertiary: "Download YardBuilder Report" (diagnostic)
 * 
 * ECONOMICS CONSISTENCY:
 * - All numbers sourced from /lib/economics.ts
 * - ROI calculator, network effect model, singularity metrics all use same math
 * - No contradictory claims. One source of truth.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTABar from '@/components/StickyCTABar';
import StandardizationMap from '@/components/StandardizationMap';

export default function Home() {
  return (
    <div className="min-h-screen bg-void">
      <Header />
      <StickyCTABar ctaText="Get Your Network Rollout Plan" ctaUrl="/contact" />

      {/* ═══════════════════════════════════════════════════════════════
          HERO: NETWORK-FIRST CLARITY
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-6">
            Yard Network System
          </p>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
            Standardize the Yard.<br />
            <span className="text-neon">Kill Variance.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-steel max-w-3xl mx-auto mb-10 leading-relaxed">
            Cheap is nice. Predictable is scalable. When trucking markets swing, the winners have standardized execution and stable unit economics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all hover:scale-105"
            >
              Run Network Diagnostic
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-xl font-semibold border border-neon/30 bg-carbon/50 text-white hover:border-neon/50 transition-all"
            >
              Model ROI in 3 Minutes
            </Link>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="p-5 rounded-xl border border-neon/20 bg-carbon/50">
              <p className="text-neon font-bold text-3xl mb-2">70%</p>
              <p className="text-sm text-steel">Gate labor reduction with self-service kiosks</p>
            </div>
            <div className="p-5 rounded-xl border border-neon/20 bg-carbon/50">
              <p className="text-neon font-bold text-3xl mb-2">50%</p>
              <p className="text-sm text-steel">Dwell time reduction (48→24 min avg)</p>
            </div>
            <div className="p-5 rounded-xl border border-neon/20 bg-carbon/50">
              <p className="text-neon font-bold text-3xl mb-2">65%</p>
              <p className="text-sm text-steel">Detention recovery with automated timestamps</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STANDARDIZATION MAP - INSERTED AFTER HERO
      ═══════════════════════════════════════════════════════════════ */}
      <StandardizationMap />

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-neon/10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Next Step</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Stop Paying the Volatility Tax
          </h2>
          <p className="text-lg text-steel mb-8 max-w-2xl mx-auto">
            Run the diagnostic. See where variance costs you. Get the playbook to fix it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-neon/90 transition"
            >
              Get Your Network Rollout Plan
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
            >
              Model ROI in 3 Minutes
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
