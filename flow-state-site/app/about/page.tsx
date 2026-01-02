'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Rebrand Notice */}
          <div className="mb-8 inline-block px-4 py-2 rounded-lg bg-neon/10 border border-neon/30">
            <p className="text-neon font-mono text-sm">
              <span className="font-bold">FreightRoll → Flow State</span> · Same team. Sharper product. Bigger vision.
            </p>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            About <span className="neon-glow">Flow State</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl mb-4">
            We're the team behind FreightRoll, now operating as <span className="text-white font-semibold">Flow State</span>.
          </p>
          <p className="text-xl text-steel max-w-3xl">
            Same obsession with yard orchestration. Expanded into a platform that turns every facility into an intelligent network node.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Why the rebrand?</h2>
            <p className="text-steel mb-3">
              <strong className="text-white">FreightRoll</strong> was focused on yard execution and carrier coordination. Great start.
            </p>
            <p className="text-steel mb-3">
              <strong className="text-white">Flow State</strong> is the full platform vision: a network where every facility becomes 
              an intelligent node, sharing real-time operational truth across your entire logistics footprint.
            </p>
            <p className="text-neon font-semibold text-sm">
              New name. Same team. Bigger ambition.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">What we optimize</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Check-in / check-out throughput</li>
              <li>Detention reduction with defensible timestamps</li>
              <li>Gate labor automation and repeatable execution</li>
              <li>Network-wide standardization and velocity</li>
            </ul>
          </Card>

          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-neon mb-3">Who it’s for</h2>
            <p className="text-steel max-w-4xl">
              Enterprise shippers, cold-chain networks, 3PLs, and multi-site operators with complex yards and high
              consequences. If you manage a network, the ROI compounds.
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
