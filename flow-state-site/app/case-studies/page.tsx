'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CASES = [
  {
    slug: 'primo-network',
    title: 'Primo: Network Standardization at Scale',
    subtitle: 'Modeled 50-facility scenario. 1.4x network effect multiplier. Standardization driving economics.',
    badge: 'Modeled',
  },
  {
    slug: 'regional-3pl',
    title: 'Regional 3PL: Manual Gates → Ground Truth',
    subtitle: '12-facility network. Detention disputes eliminated. Defensible timestamps as the foundation.',
    badge: 'Modeled',
  },
  {
    slug: 'cold-chain-security',
    title: 'Cold Chain: Cargo Security at the Gate',
    subtitle: 'Temperature-sensitive logistics. 80% theft incident reduction. ID verification + audit trails.',
    badge: 'Modeled',
  },
];

export default function CaseStudiesIndexPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Case Studies</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            Numbers. Timelines. Outcomes.
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            Short narratives and measurable results. Where numbers are modeled, we label them.
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASES.map((cs) => (
              <div key={cs.slug} className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-xl font-bold text-white">{cs.title}</h2>
                  <span className="text-xs px-2 py-1 rounded-full border border-neon/20 text-steel shrink-0">
                    {cs.badge}
                  </span>
                </div>
                <p className="text-steel text-[15px] leading-relaxed mb-6">{cs.subtitle}</p>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-neon px-5 py-2.5 font-medium text-void hover:bg-white transition"
                >
                  Read Case Study
                </Link>
              </div>
            ))}

            {/* Custom CTA */}
            <div className="rounded-2xl border border-neon/20 bg-neon/5 p-6">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Custom Scenario</p>
              <h2 className="text-xl font-bold text-white mb-3">Want a Tailored One?</h2>
              <p className="text-steel text-[15px] leading-relaxed mb-6">
                Share your network size and operating reality. We respond with a modeled ROI narrative and rollout plan.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/roi" className="inline-flex items-center gap-2 rounded-xl bg-neon px-5 py-2.5 font-medium text-void hover:bg-white transition">
                  Model ROI
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-5 py-2.5 font-medium text-white hover:border-neon/50 transition"
                >
                  Request Custom Case
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-carbon/20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Next Step</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            See Your Numbers
          </h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl">
            Run the diagnostic. Build the ROI model. Get the board-ready artifact.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
            >
              Run Network Diagnostic
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
