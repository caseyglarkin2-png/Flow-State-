import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function ImplementationPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Implementation that <span className="neon-glow">ships</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            A staged rollout: pilot fast, prove the loop, then scale across the network with repeatable playbooks.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">1) Discovery</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Define the operational “truth” you need (dwell, detention, labor, throughput)</li>
              <li>Map check-in/out + exception reasons (what really happens)</li>
              <li>Confirm data sources and minimum integration path</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">2) Pilot</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Choose 1–3 facilities with clear ownership</li>
              <li>Ship a usable workflow (not a dashboard-only pilot)</li>
              <li>Measure baseline → post-implementation deltas</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">3) Rollout</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Template the configuration and SOPs</li>
              <li>Roll by waves (region, business unit, seasonality)</li>
              <li>Track adoption and exception quality, not just logins</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">4) Executive reporting</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Board-ready KPI definitions (what counts, what doesn’t)</li>
              <li>Detention defensibility (timestamps + reason codes)</li>
              <li>Network multiplier framing (compounding benefit)</li>
            </ul>
          </Card>

          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-neon mb-3">Implementation note</h2>
            <p className="text-steel">
              Timelines depend on facility readiness and integration constraints. We’ll propose a pilot plan first, then
              scale only after you’ve seen the loop work.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href="/yardbuilder"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
              >
                Generate Yard Readiness Report
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
              >
                Talk rollout plan
              </a>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
