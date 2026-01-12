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
 * - Every yard is different. But the driver journey can—and must—be identical.
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

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { ExpandableCard } from '@/components/ExpandableCard';
import ChapterSwitcher, { type Chapter } from '@/components/ChapterSwitcher';
import HeroNetworkHook from '@/components/HeroNetworkHook';
import ProofMetrics from '@/components/ProofMetrics';
import StandardizationBand from '@/components/StandardizationBand';
import ProblemTaxonomy from '@/components/ProblemTaxonomy';
import Chapter1Content from '@/components/chapters/Chapter1Content';
import Chapter2Content from '@/components/chapters/Chapter2Content';
import Chapter3Content from '@/components/chapters/Chapter3Content';
import YardBuilderHook from '@/components/YardBuilderHook';
import StickyCTABar from '@/components/StickyCTABar';
import { calcRoiV2, getRoiV2InputsForPreset } from '@/lib/economics';
import { X, Check, DollarSign, Warehouse } from 'lucide-react';
import {
  Agent,
  Cortex,
  Ignite,
  Shield,
  Manifest,
  FlowArrow,
  Metrics,
  Velocity,
  Timeline,
  Crosshair,
} from '@/components/icons/FlowIcons';

export default function Home() {
  const [activeChapter, setActiveChapter] = useState<Chapter>('1');

  // Match ROI calculator defaults: 50 facilities, 5% Year-1 rollout ramp
  // This ensures homepage KPIs match what users see when they click "Build Your Model"
  const cfoBaseline = calcRoiV2({
    ...getRoiV2InputsForPreset('enterprise_50', 'expected'),
    yearOneRampShare: 0.05,
  });

  const dollarsPerFacility = (annual: number) => {
    const per = cfoBaseline.totalFacilities > 0 ? annual / cfoBaseline.totalFacilities : 0;
    return `$${Math.round(per).toLocaleString()}/site (modeled)`;
  };

  return (
    <div className="min-h-screen bg-void">
      <Header />
      <StickyCTABar ctaText="Get Your Network Rollout Plan" ctaUrl="/contact" />

      {/* ═══════════════════════════════════════════════════════════════
          HERO: STANDARDIZATION BAND MOTIF
          The visual thesis. No fluff. Network-first or nothing.
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <HeroNetworkHook variant="main" showCTAs={false} />
          
          {/* Standardization Band Visual */}
          <div className="mb-12">
            <StandardizationBand animated={true} />
          </div>

          <ProofMetrics variant="hero" showDisclaimer={false} className="max-w-4xl mx-auto mb-10" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/yardbuilder"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all"
            >
              Generate Yard Report
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border-2 border-steel/40 text-steel hover:border-neon hover:text-neon transition-all"
            >
              Model ROI in 3 Minutes
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CHAPTERS SWITCHER
          The spine. The IA. The mental model.
      ═══════════════════════════════════════════════════════════════ */}
      <section className="sticky top-0 z-40 bg-void/95 backdrop-blur-md border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <ChapterSwitcher activeChapter={activeChapter} onChapterChange={setActiveChapter} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER CONTENT SECTIONS
          Progressive disclosure of the 3-chapter narrative spine
      ═══════════════════════════════════════════════════════════════ */}
      {activeChapter === '1' && <Chapter1Content />}
      {activeChapter === '2' && <Chapter2Content />}
      {activeChapter === '3' && <Chapter3Content />}

      {/* ═══════════════════════════════════════════════════════════════
          PROBLEM TAXONOMY: 20 vs 5
          Why base deployment solves 50% of problems (the 50% that matter)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 border-b border-steel/20 bg-carbon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              Problem Taxonomy
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
              Every Yard Has 20 Problems. <span className="text-neon">We Solve the 10 That Matter.</span>
            </h2>
            <p className="text-lg text-steel/80 max-w-3xl mx-auto">
              5 problems are universal across all yards. 5 more are the top issues per facility. 
              Base deployment handles those 10. The remaining 10 are finite permutations we productize over time.
            </p>
          </div>

          <ProblemTaxonomy />
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA: ASSUME THE SALE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-neon/20 bg-gradient-to-b from-void to-carbon/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to stop managing yards and start orchestrating networks?
          </h2>
          <p className="text-xl text-steel/80 mb-10 max-w-2xl mx-auto">
            Book a call. We'll map your network, show you the rollout plan, and hand you the board-ready ROI model. 30 minutes. Zero fluff.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-lg font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all hover:scale-105"
            >
              Get Your Network Rollout Plan
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center gap-2 px-8 py-5 rounded-lg font-semibold border border-steel/40 text-steel hover:border-neon hover:text-neon transition-all"
            >
              Run ROI First
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
