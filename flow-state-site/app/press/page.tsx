import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Manifest, Signal } from '@/components/icons/FlowIcons';

export const metadata: Metadata = {
  title: 'Press & Media | YardFlow by FreightRoll',
  description: 'Company information, brand assets, and approved messaging for YardFlow by FreightRoll.',
};

export default function PressPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Media Resources</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            Press Kit
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            Company information, brand assets, and approved messaging. Assets provided on request to ensure accuracy.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:press@freightroll.com?subject=Press%20kit%20request"
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
            >
              Request Press Kit
            </a>
            <a
              href="mailto:press@freightroll.com"
              className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
            >
              Media Inquiries
            </a>
          </div>
        </div>
      </section>

      {/* Boilerplate */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Company Description</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Boilerplate</h2>
          
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-neon/10 border border-neon/20">
                  <Signal size={16} className="text-neon" />
                </div>
                <h3 className="text-lg font-semibold text-white">Short (1 sentence)</h3>
              </div>
              <p className="text-steel text-[15px] leading-relaxed">
                YardFlow by FreightRoll builds yard orchestration software that reduces the Variance Tax across enterprise logistics networks.
              </p>
            </div>

            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-neon/10 border border-neon/20">
                  <Manifest size={16} className="text-neon" />
                </div>
                <h3 className="text-lg font-semibold text-white">Long (3 sentences)</h3>
              </div>
              <p className="text-steel text-[15px] leading-relaxed">
                YardFlow by FreightRoll builds yard orchestration software for enterprise logistics networks. The platform standardizes check-in, custody, movement, and proof workflows to reduce the hidden Variance Tax that compounds across multi-facility operations. Teams reduce detention, improve throughput, and gain defensible timestamps for compliance and dispute resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-16 bg-carbon/20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Downloads</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Brand Assets</h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-8">
            Logo files, product screenshots, and executive bios available on request. We verify usage to maintain brand consistency.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Logo Pack', desc: 'SVG and PNG formats, light and dark versions' },
              { label: 'Product Screenshots', desc: 'Approved UI screenshots from production' },
              { label: 'Executive Bios', desc: 'Founder bio and headshot (optional)' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
                <h3 className="text-white font-semibold mb-1">{item.label}</h3>
                <p className="text-sm text-steel">{item.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="mailto:press@freightroll.com?subject=Press%20kit%20request"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
          >
            Request Assets
          </a>
        </div>
      </section>

      {/* Accuracy Note */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl border border-ember/20 bg-ember/5 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-ember/70 mb-2">Citation Policy</p>
            <h3 className="text-xl font-bold text-white mb-3">No Unverified Claims</h3>
            <p className="text-[15px] text-steel leading-relaxed max-w-2xl">
              We do not publish customer logos, compliance attestations, or performance metrics unless explicitly approved and verifiable. If you need validation materials for a story, contact us directly or request access to the Evidence Vault.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/resources/procurement"
                className="inline-flex items-center gap-1 text-sm text-neon hover:text-white transition"
              >
                Evidence Vault →
              </Link>
              <a
                href="mailto:press@freightroll.com"
                className="inline-flex items-center gap-1 text-sm text-neon hover:text-white transition"
              >
                Contact Press Team →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
