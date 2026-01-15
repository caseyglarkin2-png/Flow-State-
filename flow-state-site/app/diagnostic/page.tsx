'use client';

import React, { useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiagnosticCalculator from '@/components/DiagnosticCalculator';
import Link from 'next/link';

export default function DiagnosticPage() {
  useEffect(() => {
    analytics.viewDiagnostic();
  }, []);

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 border-b border-neon/10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-ember/70 mb-3">60-Second Assessment</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
            Find the Leak.
          </h1>
          <p className="text-xl text-steel max-w-2xl leading-relaxed">
            9 questions. Your hidden yard costs. Top leak drivers. Cost of delay. Instantly.
          </p>
          <p className="text-sm text-steel/50 mt-4">No forms. No sales call. Just numbers.</p>
        </div>
      </section>

      {/* Diagnostic Calculator */}
      <section className="border-t border-neon/10 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <DiagnosticCalculator />
        </div>
      </section>

      {/* Methodology Note */}
      <section className="border-t border-neon/10 py-12 bg-carbon/20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Methodology</p>
          <h3 className="text-lg font-bold text-white mb-4">How We Calculate Your Network Leak</h3>
          <p className="text-steel text-sm leading-relaxed mb-4">
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
      <section className="border-t border-neon/10 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Next Step</p>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            See the Full Picture
          </h2>
          <p className="text-lg text-steel mb-8 max-w-xl mx-auto leading-relaxed">
            This diagnostic shows single-site costs. See how YNS reduces leak across your entire network.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/product"
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
            >
              Explore the Product
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
            >
              Build ROI Model
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
