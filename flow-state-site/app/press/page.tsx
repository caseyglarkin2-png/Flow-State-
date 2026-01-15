import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function PressPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-neon/10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Press</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
            Press Kit
          </h1>
          <p className="text-xl text-steel max-w-2xl leading-relaxed">
            Logos, boilerplate, and product description. On request so we keep assets accurate.
          </p>
        </div>
      </section>

      {/* Assets */}
      <section className="border-t border-neon/10 py-16">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
            <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Copy</p>
            <h2 className="text-xl font-bold text-white mb-4">Boilerplate</h2>
            <p className="text-steel text-[15px] leading-relaxed">
              YardFlow by FreightRoll builds yard orchestration software for enterprise logistics networks. Repeatable workflows that produce defensible timestamps and operational truth. Teams reduce detention, improve throughput, and standardize execution across sites.
            </p>
          </div>

          <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
            <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Assets</p>
            <h2 className="text-xl font-bold text-white mb-4">Brand Assets</h2>
            <ul className="text-steel text-[15px] space-y-2 mb-6">
              <li className="flex items-start gap-3"><span className="text-neon">→</span>Logo (SVG/PNG)</li>
              <li className="flex items-start gap-3"><span className="text-neon">→</span>Product screenshots (approved set)</li>
              <li className="flex items-start gap-3"><span className="text-neon">→</span>Founder bio + headshot (optional)</li>
            </ul>
            <a
              href="mailto:press@freightroll.com?subject=Press%20kit%20request"
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-5 py-2.5 font-medium text-void hover:bg-white transition"
            >
              Request Press Kit
            </a>
          </div>
        </div>
      </section>

      {/* Accuracy Note */}
      <section className="border-t border-neon/10 py-16 bg-carbon/20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-ember/70 mb-3">Accuracy</p>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
            No Unverified Claims
          </h2>
          <p className="text-lg text-steel max-w-2xl mx-auto leading-relaxed">
            We don't publish customer logos, compliance attestations, or performance metrics unless explicitly approved and verifiable. For validation materials, use the Evidence Vault or contact us.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
