import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Integrations | TMS, WMS, ERP Connectivity',
  description: 'YardFlow integrates with your existing TMS, WMS, and ERP systems. API-first architecture for enterprise connectivity.',
};

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Integrations</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            Fit Into Enterprise Reality.
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            Partial data. Mixed systems. Operational nuance. We integrate around the workflow, not the other way around.
          </p>
        </div>
      </section>

      {/* Integration Surfaces */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Common Systems</p>
              <h3 className="text-xl font-bold text-white mb-4">What We Connect To</h3>
              <ul className="text-steel text-[15px] space-y-2">
                <li className="flex items-start gap-3"><span className="text-neon">→</span>TMS / WMS / YMS (via API, file drop, or webhook)</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>ERP reporting feeds (scheduled export or API)</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Identity providers (SSO/SCIM roadmap for enterprise)</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Appointment scheduling systems</li>
              </ul>
              <p className="text-xs text-steel/50 mt-4">Specific connectors confirmed during discovery.</p>
            </div>

            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Integration Methods</p>
              <h3 className="text-xl font-bold text-white mb-4">How We Connect</h3>
              <ul className="text-steel text-[15px] space-y-2">
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Secure APIs + token-based auth</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Webhooks for events (arrivals, check-in/out, exceptions)</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>SFTP / file drop for batch imports (CSV/JSON)</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Data exports for BI (scheduled, contract-defined)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Data Model */}
      <section className="py-16 bg-carbon/20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Data Model</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Ground Source Truth
              </h2>
              <p className="mt-4 text-[17px] text-steel leading-8">
                We normalize to an operational truth layer: facilities, visits, assets, timestamps, and exception reasons.
              </p>
              <p className="mt-4 text-[17px] text-steel leading-8">
                That makes network-level analytics possible without fragile one-off mappings. Your data stays yours. We just make it usable.
              </p>
            </div>
            <div className="rounded-2xl border border-neon/20 bg-neon/5 p-6">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Procurement-Friendly</p>
              <h3 className="text-xl font-bold text-white mb-4">Enterprise Requirements</h3>
              <ul className="space-y-2 text-steel text-[15px]">
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Least-privilege access to source systems</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Clear data ownership and export support</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Security questionnaires supported during evaluation</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>DPA and compliance documentation available</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>SOC 2 roadmap for enterprise</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Path */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Integration Path</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Minimum to Start. Clean Path to Scale.
          </h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">
            Many pilots start with minimal integration. The clean path comes later when you're ready for full-network rollout.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <p className="text-neon font-bold text-sm mb-2">Pilot</p>
              <h3 className="text-lg font-bold text-white mb-2">Minimal Integration</h3>
              <p className="text-sm text-steel leading-relaxed">
                Manual appointment entry. File upload for trailer inventory. No TMS/WMS dependency required.
              </p>
            </div>
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <p className="text-neon font-bold text-sm mb-2">Wave 1</p>
              <h3 className="text-lg font-bold text-white mb-2">Core Integration</h3>
              <p className="text-sm text-steel leading-relaxed">
                Appointment sync from TMS. Event webhooks to WMS. Scheduled data exports to BI.
              </p>
            </div>
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <p className="text-neon font-bold text-sm mb-2">Scale</p>
              <h3 className="text-lg font-bold text-white mb-2">Full Integration</h3>
              <p className="text-sm text-steel leading-relaxed">
                Real-time bidirectional sync. SSO/SCIM. Network-level visibility. Enterprise reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Next Step</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Share Your Stack
          </h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl">
            Even a messy list. We'll outline the minimum integration path for a pilot and the clean path for full-network rollout.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
            >
              Share Your Stack
            </Link>
            <Link
              href="/implementation"
              className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
            >
              View Implementation Process
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
