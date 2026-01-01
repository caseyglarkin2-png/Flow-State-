import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Integrations that <span className="neon-glow">don’t break</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            Flow State is designed to fit into enterprise reality: partial data, mixed systems, and operational nuance.
            We integrate around the workflow — not the other way around.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Common systems</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>TMS / WMS / YMS (via API, file drop, or webhook patterns)</li>
              <li>ERP reporting feeds (scheduled export or API)</li>
              <li>Identity providers (SSO/SCIM roadmap for enterprise)</li>
            </ul>
            <p className="text-xs text-steel/70 mt-4">Specific connectors are confirmed during discovery.</p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Integration surfaces</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Secure APIs + token-based auth</li>
              <li>Webhooks for events (arrivals, check-in/out, exceptions)</li>
              <li>SFTP / file drop for batch imports (CSV/JSON)</li>
              <li>Data exports for BI (scheduled, contract-defined)</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Data model approach</h2>
            <p className="text-steel">
              We normalize to an operational “ground source truth”: facilities, visits, assets, timestamps, and exception
              reasons. That makes network-level analytics possible without fragile one-off mappings.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Procurement-friendly</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Least-privilege access to source systems</li>
              <li>Clear data ownership and export support</li>
              <li>Security questionnaires supported during evaluation</li>
            </ul>
          </Card>

          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-neon mb-3">Next step</h2>
            <p className="text-steel">
              If you share your current stack (even a messy list), we’ll outline the minimum integration path for a pilot
              and the clean path for full-network rollout.
            </p>
            <a
              href="/contact"
              className="mt-5 inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
            >
              Share your stack
            </a>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
