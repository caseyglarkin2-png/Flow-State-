/* ═══════════════════════════════════════════════════════════════
   COMPARE PAGE - REDUNDANCY REPORT (Pass 6)
   ═══════════════════════════════════════════════════════════════
   
   A) EXACT DUPLICATE STRINGS:
      1. "Recording vs Enforcing" appears here + OperatingModelComparison + Ch2
      2. "Defensible timestamps" explanation duplicates Security page + Ch1
      3. "Network-first vs site-by-site" duplicates homepage YNS section
   
   B) CONCEPT DUPLICATION:
      1. StandardizationBand visual + explanation duplicates homepage/product
      2. Chapter 1/2/3 summary duplicates ChapterSwitcher descriptions
      3. Operating model distinction covered here + homepage + OperatingModelComparison
   
   C) CTA DUPLICATION:
      - Links to legacy-yms and spreadsheets sub-pages
      - No primary CTA - should have "See detailed comparison" or similar
   
   D) WHAT TO DELETE:
      ✗ Redundant chapter summary (link to homepage spine instead)
      ✗ Duplicate StandardizationBand explanation
   
   E) WHAT TO CONSOLIDATE:
      ↓ "Recording vs Enforcing" should be THE canonical explanation (make this the deep-dive)
      ↓ Defensible timestamps link to Security page for full story
   
   F) WHAT TO ADD:
      + Detailed feature comparison table (missing!)
      + "Decision-grade content" - specific YardFlow vs Legacy YMS grid
      + Economics comparison (network ROI vs per-site ROI)
   
   ═══════════════════════════════════════════════════════════════
   
   AUDIT: COMPARE PAGE (Operating Model Differentiation)
   ═══════════════════════════════════════════════════════════════
   
   WHAT IT SAYS NOW:
   - "Recording vs Enforcing" - control loop distinction
   - StandardizationBand visual in hero (good tie to Chapter 1)
   - OperatingModelComparison component shows decision-grade table
   - Links to legacy-yms and spreadsheets deep-dive pages
   
   WHAT IT SHOULD SAY (Spine Integration):
   - Chapter 1: We standardize driver journey (they don't)
   - Chapter 2: We enforce control loop (they record events)
   - Chapter 3: We enable network intelligence (they do site-by-site)
   
   TOP 3 CONVERSION BLOCKERS:
   1. Missing "decision-grade content" - needs specific feature comparison
   2. No direct comparison table on this page (only OperatingModelComparison)
   3. Doesn't clearly show "network-first vs site-by-site" economics
   
   STATUS: Operating model distinction clear ✓, Need feature grid
   NEXT: Add YardFlow vs Legacy YMS feature table on main compare page
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import Link from 'next/link';
import StandardizationBand from '@/components/StandardizationBand';
import OperatingModelComparison from '@/components/OperatingModelComparison';

export default function CompareIndexPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-neon font-mono text-xs uppercase tracking-wider mb-4">Operating Model Comparison</p>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Recording vs <span className="text-neon">Enforcing</span>
            </h1>
            <p className="text-xl text-steel max-w-3xl mx-auto">
              This isn't feature-bingo. It's: do you have a control loop, and can you make timestamps defensible? Network-first vs site-by-site.
            </p>
          </div>

          {/* Standardization Band Visual */}
          <div className="mb-12">
            <StandardizationBand />
          </div>

          <div className="text-center">
            <p className="text-steel/80 max-w-3xl mx-auto">
              Standardize the driver journey. Enforce the control loop. Unlock network intelligence. Legacy approaches solve for site-level visibility. We solve for network-level control.
            </p>
          </div>
        </div>
      </section>

      {/* Operating Model Comparison */}
      <section className="py-20 border-b border-neon/20 bg-carbon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 text-white">The Fundamental Difference</h2>
            <p className="text-steel/80 max-w-2xl mx-auto">
              Legacy YMS records events after they happen. YardFlow enforces what happens next.
            </p>
          </div>
          <OperatingModelComparison />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card hover>
            <h2 className="text-2xl font-bold text-neon mb-3">YardFlow by FreightRoll vs Legacy YMS</h2>
            <p className="text-steel">
              Legacy systems can record events, but often struggle with workflow adoption, exception truth, and network-wide
              standardization.
            </p>
            <Link href="/compare/legacy-yms" className="mt-5 inline-flex text-neon font-semibold hover:underline">
              Read comparison
            </Link>
          </Card>

          <Card hover>
            <h2 className="text-2xl font-bold text-neon mb-3">YardFlow by FreightRoll vs Spreadsheets + Radio</h2>
            <p className="text-steel">
              Manual tracking creates “visibility” without accountability. You can’t defend detention or improve dwell
              without consistent timestamps and reason codes.
            </p>
            <Link href="/compare/spreadsheets" className="mt-5 inline-flex text-neon font-semibold hover:underline">
              Read comparison
            </Link>
          </Card>

          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-neon mb-3">Want a board-ready artifact?</h2>
            <p className="text-steel">
              Generate a YardBuilder report or export an ROI PDF. These are designed to be forwarded internally.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link
                href="/yardbuilder"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
              >
                YardBuilder
              </Link>
              <Link
                href="/roi"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
              >
                ROI Calculator
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
