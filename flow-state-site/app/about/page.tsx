'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">FreightRoll → YardFlow</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-white md:text-7xl">
            Same Team. Sharper Product.
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-steel leading-relaxed">
            We built the simulations first. Then we wrote the software. Now we're standardizing yards at scale.
          </p>
        </div>
      </section>

      {/* Heritage */}
      <section className="border-t border-neon/10 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Origin Story</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            The FreightRoll Heritage
          </h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">
            We didn't start with code. We started with math. Thousands of simulations before a single production deployment.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">2020–2022</p>
              <h3 className="text-xl font-bold text-white mb-3">Research Phase</h3>
              <p className="text-steel text-[15px] leading-relaxed">
                Built <span className="text-white font-medium">Primo</span> (single-facility simulator) and <span className="text-white font-medium">Singularity</span> (enterprise network simulator). Ran thousands of scenarios to model yard dynamics, detention costs, labor allocation, and network effects.
              </p>
            </div>
            
            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">2023</p>
              <h3 className="text-xl font-bold text-white mb-3">FreightRoll 1.0</h3>
              <p className="text-steel text-[15px] leading-relaxed">
                Launched FreightRoll as a yard execution platform. Check-in/out automation. Carrier coordination. Validated core ROI assumptions: 40-60% cycle time reduction, $200K-$800K detention savings per facility.
              </p>
            </div>
            
            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">2024+</p>
              <h3 className="text-xl font-bold text-white mb-3">YardFlow by FreightRoll</h3>
              <p className="text-steel text-[15px] leading-relaxed">
                Full platform expansion. Cargo security (ID verification, tamper-evident audit). Network orchestration. Enterprise-scale deployment. Same economic engine. Bigger vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Rebrand */}
      <section className="py-16 bg-carbon/20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-ember/70">Why the Rename</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">FreightRoll → YardFlow</h2>
              <p className="mt-4 text-[17px] text-steel leading-8">
                <span className="text-white font-medium">FreightRoll</span> started with yard execution and carrier coordination. We proved the economics with Primo and Singularity simulations.
              </p>
              <p className="text-[17px] text-steel leading-8 mb-4">
                <span className="text-white font-medium">YardFlow by FreightRoll</span> is the full platform vision: every facility becomes an intelligent, secure node in a connected network. Cargo security. Network orchestration. Enterprise deployment at scale.
              </p>
              <p className="text-neon font-semibold">
                New name. Same team. Same simulations. Bigger platform.
              </p>
            </div>
            <div className="rounded-2xl border border-neon/20 bg-neon/5 p-6">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">What We Optimize</p>
              <h3 className="text-xl font-bold text-white mb-4">The Variance Tax</h3>
              <ul className="space-y-2 text-steel text-[15px]">
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>Check-in / check-out throughput</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>Detention reduction with defensible timestamps</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>Cargo theft prevention and ID verification</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>CTPAT/TSA compliance and audit trails</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>Gate labor automation and repeatable execution</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>Network-wide standardization and velocity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Target Operators</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Who It's For</h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">
            Enterprise shippers with 10+ facilities. Operators who see variance as a P&L problem, not a scheduling nuisance.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "VPs Logistics", body: "Multi-site operators running 50-500 yard moves per day. You want network standardization, not more dashboards." },
              { title: "CFOs", body: "You're tired of detention invoices that can't be defended. You want board-ready metrics that prove the investment." },
              { title: "Security Directors", body: "You need CTPAT compliance, ID verification, and audit trails that hold up in court." },
              { title: "Ops Managers", body: "You're running the yard. You need drivers to know where to go without radio calls and yard walks." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
                <div className="text-sm font-semibold text-white mb-2">{item.title}</div>
                <p className="text-xs text-steel leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-carbon/20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">How We Build</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white mb-10">Operating Principles</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <p className="font-semibold text-white mb-2">Simulations First</p>
              <p className="text-sm text-steel leading-relaxed">
                We model before we build. Every feature has an economic thesis. No feature ships without ROI validation.
              </p>
            </div>
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <p className="font-semibold text-white mb-2">Standards Over Features</p>
              <p className="text-sm text-steel leading-relaxed">
                The driver journey must be identical across every yard. Permutations come second. Standardization comes first.
              </p>
            </div>
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <p className="font-semibold text-white mb-2">Control, Not Recording</p>
              <p className="text-sm text-steel leading-relaxed">
                Legacy YMS records what happened. YardFlow enforces what happens next. The system is the control loop.
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
            See the Simulations in Action
          </h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl">
            Run the network diagnostic. See where variance costs you. Get the playbook to fix it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-neon/90 transition"
            >
              Run Network Diagnostic
            </Link>
            <Link
              href="/singularity"
              className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
            >
              View Singularity Simulator
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
