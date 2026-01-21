'use client';

import React, { useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiagnosticCalculator from '@/components/DiagnosticCalculator';
import Link from 'next/link';
import { 
  DIAGNOSTIC_HERO_H1, 
  DIAGNOSTIC_HERO_SUBHEAD, 
  DIAGNOSTIC_CTA_TEXT,
  CANON_TERMS 
} from '@/lib/varianceTax';

export default function DiagnosticPage() {
  useEffect(() => {
    analytics.viewDiagnostic();
  }, []);

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">{CANON_TERMS.diagnosticEyebrow}</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            {DIAGNOSTIC_HERO_H1}
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            {DIAGNOSTIC_HERO_SUBHEAD}
          </p>
          <p className="mt-2 text-sm text-steel/50">No forms. No sales call. Just numbers.</p>
        </div>
      </section>

      {/* Diagnostic Calculator */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <DiagnosticCalculator />
        </div>
      </section>

      {/* Methodology Note */}
      <section className="py-12 bg-carbon/20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Methodology</p>
          <h3 className="mt-3 text-lg font-bold text-white">{CANON_TERMS.methodologyTitle}</h3>
          <p className="mt-4 text-steel text-sm leading-relaxed">
            Industry benchmarks + your operational inputs = modeled hidden costs. Detention rates assume $75/occurrence based on dwell time thresholds. OT calculations use $45/hr loaded cost. Exception handling assumes 15 min extra per exception load. All outputs are estimates.
          </p>
          <p className="text-steel/50 text-xs">
            For detailed methodology, see our{' '}
            <Link href="/docs/economics-methodology" className="text-neon hover:underline">
              Economics Methodology
            </Link>{' '}
            documentation.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Next Step</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            If the Variance Tax is Real
          </h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl">
            If your Variance Tax is measurable and the ROI pencils, apply to the Co-Development Program. Cohort slots available for Reefer, Flatbed, and Cross-Dock.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/co-development"
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
            >
              Apply for Co-Development
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
            >
              {CANON_TERMS.viewFullROI}
            </Link>
          </div>
          <p className="mt-3 text-sm text-steel/70">Co-Development Program: roadmap influence + founding partner pricing.</p>
        </div>
      </section>

      {/* Adoption Context + ROI Link */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="bg-steel/10 border border-steel/30 rounded-lg p-6">
            <p className="text-sm text-steel leading-relaxed">
              This scenario is modeled at <strong>5% adoption</strong> (Year 1 Deep Model default). 
              See how the numbers change with different deployment paces — from conservative rollout to network inflection point.
            </p>
            <Link
              href="/roi?adoption=5"
              className="inline-flex items-center gap-2 mt-4 text-neon hover:text-flow transition font-medium"
            >
              View ROI with adoption scenarios →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
