'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

const CASES = [
  {
    slug: 'primo-network',
    title: 'Primo: Network Standardization at Scale',
    subtitle: 'Modeled enterprise scenario to show the format and the leverage curve.',
    badge: 'Modeled example',
  },
];

export default function CaseStudiesIndexPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Case <span className="neon-glow">Studies</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            Short narratives, rollout timelines, and measurable outcomes. Where numbers are modeled, we label them.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASES.map((cs) => (
            <Card key={cs.slug}>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-white">{cs.title}</h2>
                <span className="text-xs px-2 py-1 rounded-full border border-neon/20 text-steel">
                  {cs.badge}
                </span>
              </div>
              <p className="text-steel mt-3">{cs.subtitle}</p>
              <div className="mt-6">
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-semibold bg-neon text-void"
                >
                  Read case study
                </Link>
              </div>
            </Card>
          ))}

          <Card className="border-neon/20">
            <h2 className="text-2xl font-bold text-neon">Want a tailored one?</h2>
            <p className="text-steel mt-3">
              Share your network size and operating reality. We’ll respond with a modeled ROI narrative and a rollout plan.
            </p>
            <div className="mt-6 flex gap-3 flex-col sm:flex-row">
              <Link href="/roi" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-neon text-void font-semibold">
                Model ROI
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-steel/30 text-white hover:border-neon/40 transition-colors font-semibold"
              >
                Get a quote
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
