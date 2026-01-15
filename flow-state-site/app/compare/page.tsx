import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import StandardizationBand from '@/components/StandardizationBand';
import OperatingModelComparison from '@/components/OperatingModelComparison';

export default function CompareIndexPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-neon/10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Operating Model</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
            Recording vs Enforcing
          </h1>
          <p className="text-xl text-steel max-w-2xl leading-relaxed mb-10">
            This isn't feature-bingo. It's: do you have a control loop, and can you make timestamps defensible?
          </p>

          <StandardizationBand />
        </div>
      </section>

      {/* Operating Model Comparison */}
      <section className="border-t border-neon/10 py-16 bg-carbon/20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">The Difference</p>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Legacy Records. YardFlow Enforces.</h2>
          <p className="text-lg text-steel mb-10 max-w-2xl leading-relaxed">
            Legacy YMS records events after they happen. YardFlow enforces what happens next.
          </p>
          <OperatingModelComparison />
        </div>
      </section>

      {/* Comparison Links */}
      <section className="border-t border-neon/10 py-16">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
            <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Deep Dive</p>
            <h2 className="text-xl font-bold text-white mb-3">YardFlow vs Legacy YMS</h2>
            <p className="text-steel text-[15px] leading-relaxed mb-6">
              Legacy systems record events. We enforce workflows. See the operational difference.
            </p>
            <Link href="/compare/legacy-yms" className="text-neon font-semibold hover:underline">
              Read Comparison →
            </Link>
          </div>

          <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
            <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Deep Dive</p>
            <h2 className="text-xl font-bold text-white mb-3">YardFlow vs Spreadsheets + Radio</h2>
            <p className="text-steel text-[15px] leading-relaxed mb-6">
              Manual tracking creates "visibility" without accountability. No defensible timestamps.
            </p>
            <Link href="/compare/spreadsheets" className="text-neon font-semibold hover:underline">
              Read Comparison →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neon/10 py-16 bg-carbon/20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Next Step</p>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            Get Board-Ready Artifacts
          </h2>
          <p className="text-lg text-steel mb-8 max-w-xl mx-auto leading-relaxed">
            YardBuilder report or ROI PDF. Designed to forward internally.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/yardbuilder"
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
            >
              YardBuilder
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
            >
              ROI Calculator
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
