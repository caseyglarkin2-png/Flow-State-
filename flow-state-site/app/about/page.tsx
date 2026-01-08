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
              <span className="font-bold">FreightRoll → YardFlow by FreightRoll</span> · Same team. Sharper product. Bigger vision.
            </p>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            About <span className="neon-glow">YardFlow by FreightRoll</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl mb-4">
            We're the team behind FreightRoll, now operating as <span className="text-white font-semibold">YardFlow by FreightRoll</span>.
          </p>
          <p className="text-xl text-steel max-w-3xl">
            Same obsession with yard orchestration and cargo security. Evolved into a platform that turns every facility into an intelligent, secure network node.
          </p>
        </div>
      </section>

      <section className="py-16 border-b border-steel/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-6">The FreightRoll Heritage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-xl font-bold text-neon mb-3">2020-2022: FreightRoll Research</h3>
              <p className="text-steel mb-3">
                Built <strong className="text-white">Primo</strong> (single-facility simulator) and <strong className="text-white">Singularity</strong> (enterprise network simulator).
              </p>
              <p className="text-steel text-sm">
                Ran thousands of simulations to model yard dynamics, detention costs, labor allocation, and network effects before writing production code.
              </p>
            </Card>
            
            <Card>
              <h3 className="text-xl font-bold text-neon mb-3">2023: FreightRoll 1.0</h3>
              <p className="text-steel mb-3">
                Launched FreightRoll as a yard execution platform focused on check-in/check-out automation and carrier coordination.
              </p>
              <p className="text-steel text-sm">
                Validated core ROI assumptions: 40-60% cycle time reduction, $200K-$800K detention savings per facility.
              </p>
            </Card>
            
            <Card>
              <h3 className="text-xl font-bold text-neon mb-3">2024: YardFlow by FreightRoll</h3>
              <p className="text-steel mb-3">
                Expanded into full platform: added cargo security (ID verification, tamper-evident audit), network orchestration, and enterprise-scale deployment.
              </p>
              <p className="text-steel text-sm">
                YardFlow is FreightRoll's flagship product, built on the same economic engine with expanded capabilities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Why the rebrand?</h2>
            <p className="text-steel mb-3">
              <strong className="text-white">FreightRoll</strong> started with yard execution and carrier coordination. We proved the economics with Primo and Singularity simulations.
            </p>
            <p className="text-steel mb-3">
              <strong className="text-white">YardFlow by FreightRoll</strong> is the full platform vision: every facility becomes an intelligent, secure node in a connected network. Cargo security, network orchestration, enterprise deployment at scale.
            </p>
            <p className="text-neon font-semibold text-sm">
              New name. Same team. Same simulations. Bigger platform.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">What we optimize</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Check-in / check-out throughput</li>
              <li>Detention reduction with defensible timestamps</li>
              <li>Cargo theft prevention and ID verification</li>
              <li>CTPAT/TSA compliance and audit trails</li>
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
      {/* Next Steps CTA */}
      <section className="py-16 border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to explore?</h2>
          <p className="text-steel mb-8">See how YardFlow can transform your yard operations.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold bg-ember text-white hover:bg-white hover:text-void transition-all"
            >
              Calculate Your Network Leak
            </a>
            <a
              href="/roi"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border border-steel/40 text-white hover:border-neon hover:text-neon transition-all"
            >
              Build ROI Model
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border border-steel/40 text-white hover:border-neon hover:text-neon transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
