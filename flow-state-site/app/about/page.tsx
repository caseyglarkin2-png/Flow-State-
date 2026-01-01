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
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            About <span className="neon-glow">Flow State</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            Flow State is the next chapter of FreightRoll — built for enterprise networks that need ground-truth,
            not guesswork.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Formerly FreightRoll</h2>
            <p className="text-steel">
              FreightRoll started as a focus on yard execution and carrier coordination. Flow State expands that into a
              network model: every facility becomes an intelligent node transmitting real-time operational truth.
            </p>
            <p className="text-steel mt-4">
              Same obsession with the yard. Sharper product. Bigger ambition.
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
