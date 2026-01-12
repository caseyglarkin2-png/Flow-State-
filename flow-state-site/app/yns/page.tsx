'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import StandardizationBand from '@/components/StandardizationBand';
import { Nexus, Shield, Agent, Territory, Metrics, Velocity, Crosshair, FlowArrow, Confirm } from '@/components/icons/FlowIcons';

export default function YNSPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-neon font-mono text-sm tracking-widest mb-6 uppercase">
              The Category YardFlow Invented
            </p>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
              Yard Network System (YNS):<br />
              <span className="text-neon">Network-first, not site-by-site</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-steel/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              Traditional YMS optimizes single facilities. YNS orchestrates multi-site networks through three chapters: standardized driver journey, enforced control loops, compounding network intelligence.
            </p>
          </div>

          {/* Standardization Band Visual */}
          <div className="mb-12">
            <StandardizationBand />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
              <div className="text-neon font-mono text-xs uppercase tracking-wider mb-2">Chapter 1</div>
              <h3 className="text-xl font-bold text-white mb-2">Standardization Band</h3>
              <p className="text-steel/90 mb-2">Same driver journey across all yards</p>
              <p className="text-steel/70 text-sm">QR check-in, timestamps, multilingual comms. Network foundation.</p>
            </div>
            <div className="p-6 rounded-lg border border-steel/30 bg-carbon/40">
              <div className="text-steel/60 font-mono text-xs uppercase tracking-wider mb-2">Chapter 2</div>
              <h3 className="text-xl font-bold text-white mb-2">Control Loop</h3>
              <p className="text-steel/90 mb-2">Enforces what happens next</p>
              <p className="text-steel/70 text-sm">Per-site automation. Active, not passive.</p>
            </div>
            <div className="p-6 rounded-lg border border-steel/30 bg-carbon/40">
              <div className="text-steel/60 font-mono text-xs uppercase tracking-wider mb-2">Chapter 3</div>
              <h3 className="text-xl font-bold text-white mb-2">Network Effect</h3>
              <p className="text-steel/90 mb-2">Intelligence compounds with scale</p>
              <p className="text-steel/70 text-sm">Cross-site learning. Exponential returns.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-neon-fill inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold bg-neon text-void hover:bg-white hover:text-void hover:shadow-lg transition-all">
              Get Your Network Rollout Plan
            </a>
            <a href="#comparison" className="btn-neon inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border-2 border-steel/40 text-steel hover:border-neon hover:text-neon transition-all">
              Compare YMS vs YNS (Full Table)
            </a>
          </div>
        </div>
      </section>

      {/* YMS vs YNS Comparison Table - The Core Differentiation */}
      <section id="comparison" className="py-24 border-b border-neon/20 bg-carbon/30">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase text-center">
            Full Comparison
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center">What changes when you shift from site-by-site to network-level</h2>
          <p className="text-xl text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            YMS was built for single facilities. YNS was built for networks. Every capability differs.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-neon/30">
                  <th className="text-left py-4 px-6 text-steel/60 font-mono text-sm uppercase tracking-wider">Capability</th>
                  <th className="text-left py-4 px-6 text-steel/60 font-mono text-sm uppercase tracking-wider">Traditional YMS</th>
                  <th className="text-left py-4 px-6 text-neon font-mono text-sm uppercase tracking-wider">YardFlow YNS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neon/10">
                {[
                  {
                    capability: 'Scope',
                    yms: 'Single-site optimization',
                    yns: 'Multi-site network orchestration',
                  },
                  {
                    capability: 'Intelligence',
                    yms: 'Local yard data only',
                    yns: 'Cross-network predictive analytics',
                  },
                  {
                    capability: 'Move Coordination',
                    yms: 'Manual dispatch per site',
                    yns: 'AI-powered recommendations across sites',
                  },
                  {
                    capability: 'Carrier Visibility',
                    yms: 'Appointment tracking',
                    yns: 'Real-time ETA + detention prevention',
                  },
                  {
                    capability: 'Security Model',
                    yms: 'Site-by-site access control',
                    yns: 'Unified identity verification + audit trail',
                  },
                  {
                    capability: 'Network Effects',
                    yms: 'None (linear scaling)',
                    yns: 'Exponential value with each added site',
                  },
                  {
                    capability: 'Benchmarking',
                    yms: 'Compare your sites to each other',
                    yns: 'Compare against anonymized network data',
                  },
                  {
                    capability: 'Scaling Cost',
                    yms: 'Cost per site increases',
                    yns: 'Cost per site decreases (network leverage)',
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-neon/5 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">{row.capability}</td>
                    <td className="py-4 px-6 text-steel/70">{row.yms}</td>
                    <td className="py-4 px-6 text-neon font-medium">{row.yns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* The Problem with Site-by-Site Thinking */}
      <section className="py-16 bg-void border-b border-steel/20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            The Problem with Site-by-Site Thinking
          </h2>
          <p className="text-lg text-steel/80 leading-relaxed">
            Your current YMS was architected for managing one yard really well. It has no idea that yard is part of a 40-facility network. Carrier learnings don't transfer. Playbooks don't standardize. Intelligence dies at the property line. You're managing friction one facility at a time. <span className="text-neon font-semibold">That's the tax.</span>
          </p>
        </div>
      </section>

      {/* Network Effect Visualization - Show the Compounding Returns */}
      <section className="py-24 bg-gradient-to-b from-void to-carbon/30 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center">The YNS Network Effect</h2>
          <p className="text-xl text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            Unlike traditional YMS, YNS value grows exponentially. Each new site makes every existing site smarter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Visual */}
            <div className="glass-card p-8">
              <div className="space-y-6">
                {[
                  { sites: '1 Site', value: 'Baseline value', multiplier: '1.0x' },
                  { sites: '3 Sites', value: 'Shared carrier intelligence', multiplier: '1.4x' },
                  { sites: '10 Sites', value: 'Predictive optimization', multiplier: '2.1x' },
                  { sites: '50 Sites', value: 'Network-wide coordination', multiplier: '4.2x' },
                  { sites: '260 Sites', value: 'PRIMO singularity', multiplier: '12.8x' },
                ].map((tier, i) => (
                  <div key={i} className="flex items-center justify-between pb-4 border-b border-neon/10 last:border-0">
                    <div>
                      <p className="font-semibold text-white mb-1">{tier.sites}</p>
                      <p className="text-sm text-steel/70">{tier.value}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-neon">{tier.multiplier}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Explanation */}
            <div>
              <h3 className="text-3xl font-black mb-6">Why Networks Beat Silos</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Metrics size={24} className="text-neon flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-neon">Shared Learning</h4>
                      <p className="text-steel/80">
                        Every truck that enters your network teaches the system. Carrier reliability, 
                      route patterns, seasonal variations - knowledge that compounds across all sites.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Velocity size={24} className="text-neon flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-neon">Coordination Efficiency</h4>
                      <p className="text-steel/80">
                        Transfer a trailer between sites? YNS coordinates pickup/dropoff timing, 
                        eliminating wasted detention hours and empty miles.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <Nexus size={24} className="text-neon flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-neon">Benchmarking Power</h4>
                      <p className="text-steel/80">
                        Compare your dwell times not just across your yards, but against anonymized 
                        network data. See exactly where you stand and how to improve.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a href="/singularity" className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-neon text-neon hover:bg-neon hover:text-void transition-all mt-8">
                <Nexus size={20} />
                Explore Singularity Model
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Persona-Aware CTAs - Direct Path to Value */}
      <section className="py-24 bg-carbon/30 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center">Ready to Build Your Yard Network?</h2>
          <p className="text-xl text-steel/80 mb-16 text-center max-w-3xl mx-auto">
            Choose your path based on what matters most to you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CFO Path */}
            <Card hover className="border-neon/30 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon/10 border border-neon/30 mb-4">
                  <Metrics size={32} className="text-neon" />
                </div>
                <h3 className="text-2xl font-black mb-2">CFO / Finance</h3>
                <p className="text-steel/70 text-sm">Show me the ROI</p>
              </div>

              <p className="text-steel/80 mb-8 leading-relaxed">
                Build a detailed financial model with our CFO-grade ROI calculator. 
                Export to Excel for board presentations.
              </p>

              <a href="/roi" className="btn-neon-fill inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:bg-white hover:shadow-lg transition-all w-full justify-center">
                <Metrics size={20} />
                Build ROI Model
              </a>
            </Card>

            {/* VP Ops Path */}
            <Card hover className="border-ember/30 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ember/10 border border-ember/30 mb-4">
                  <Territory size={32} className="text-ember" />
                </div>
                <h3 className="text-2xl font-black mb-2">VP Operations</h3>
                <p className="text-steel/70 text-sm">Show me the workflow</p>
              </div>

              <p className="text-steel/80 mb-8 leading-relaxed">
                Map your actual yard in YardBuilder. See exactly how orchestration, 
                security, and intelligence work together.
              </p>

              <a href="/yardbuilder" className="btn-neon-fill inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-ember text-white hover:bg-white hover:text-void hover:shadow-lg transition-all w-full justify-center">
                <Territory size={20} />
                Build Your Yard
              </a>
            </Card>

            {/* Security Path */}
            <Card hover className="border-steel/30 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-steel/10 border border-steel/30 mb-4">
                  <Shield size={32} className="text-steel" />
                </div>
                <h3 className="text-2xl font-black mb-2">Security / Risk</h3>
                <p className="text-steel/70 text-sm">Show me the controls</p>
              </div>

              <p className="text-steel/80 mb-8 leading-relaxed">
                Explore our Evidence Vault: compliance roadmap, security controls, 
                audit trails, and procurement-ready documentation.
              </p>

              <a href="/security" className="btn-neon-fill inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-steel text-white hover:bg-white hover:text-void hover:shadow-lg transition-all w-full justify-center">
                <Shield size={20} />
                Review Security
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-neon/20 bg-gradient-to-b from-void to-carbon/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            If you have 10+ facilities, YNS is the category you're buying.
          </h2>
          <p className="text-xl text-steel/90 mb-12">
            The only question is timing. Book a call. We'll show you the rollout plan and the network effect curve for your facility mix.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-neon-fill inline-flex items-center justify-center gap-2 px-10 py-5 rounded-lg font-bold text-lg bg-neon text-void hover:bg-white hover:text-void hover:shadow-lg transition-all">
              Get Your Network Rollout Plan
            </a>
            <a href="/roi" className="btn-neon inline-flex items-center justify-center gap-2 px-8 py-5 rounded-lg font-semibold border border-steel/40 text-steel hover:border-neon hover:text-neon transition-all">
              Run ROI Model
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
