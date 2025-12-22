'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Anchor, FlowArrow, Confirm, Dismiss, Plant, Cargo, Cart, Haul, Crosshair } from '@/components/icons/FlowIcons';

export default function SolutionsPage() {
  const archetypes = [
    {
      name: 'Retail & Grocery DC',
      icon: <Cart size={48} className="text-neon" />,
      pain: 'Spoilage, detention fees, peak season chaos',
      flow: 'Synthetic Capacity. Process 142% more throughput during peak season without expanding your yard.',
    },
    {
      name: '3PL & Contract Logistics',
      icon: <Cargo size={48} className="text-neon" />,
      pain: '"Ghost trailers," multi-client complexity, billing leakage',
      flow: 'Total Visibility. A single source of truth across multi-building campuses. Never lose a trailer again.',
    },
    {
      name: 'Port & Marine Terminal',
      icon: <Anchor size={48} className="text-neon" />,
      pain: 'Drayage congestion, chassis dislocation, "The Shuffle"',
      flow: 'Intermodal Fluidity. Synchronize gate moves with vessel cut-offs. Optimize chassis utilization.',
    },
    {
      name: 'LTL Terminal',
      icon: <Haul size={48} className="text-neon" />,
      pain: 'Linehaul cut times, cross-dock congestion',
      flow: 'Network Velocity. Ensure linehaul trucks depart on time, every time. Optimize cross-dock flows.',
    },
    {
      name: 'Industrial & Manufacturing',
      icon: <Plant size={48} className="text-neon" />,
      pain: 'Raw material shortages stopping the line, finished goods bottleneck',
      flow: 'Production Synchronization. Align yard movements with production schedules. Just-In-Time becomes reality.',
    },
  ];

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6 text-center py-20">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-tight">
            Solved for Your <span className="text-neon">Physics.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-steel mb-12 max-w-3xl mx-auto">
            Tailored orchestration for the specific fluid dynamics of your sector.
          </p>
        </div>
      </section>

      {/* Archetypes Grid */}
      <section className="py-24 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {archetypes.map((archetype, i) => (
              <Card key={i} hover className="flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">{archetype.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-neon">{archetype.name}</h3>
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold text-steel/60 mb-2">THE PAIN</h4>
                  <p className="text-steel/90 leading-relaxed">{archetype.pain}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-neon mb-2">THE FLOW</h4>
                  <p className="text-steel/80 leading-relaxed">{archetype.flow}</p>
                </div>

                <a href="/singularity" className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-neon hover:bg-neon/10 transition-all">
                  Apply for Access <FlowArrow size={16} />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-carbon/50 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-12">Case Studies</h2>
          
          <div className="space-y-12">
            {[
              {
                title: 'Primo Brands',
                subtitle: 'Poland Spring',
                metric: '142% velocity gain',
                desc: 'Deployed across 260 sites in 90 days. Reduced turn times by 50%.',
              },
              {
                title: 'J.B. Hunt',
                subtitle: '3PL Operations',
                metric: '$8.2M annual savings',
                desc: 'Eliminated ghost trailers and reduced detention fees across 15 facilities.',
              },
              {
                title: 'Port of LA',
                subtitle: 'Marine Terminal',
                metric: '40% throughput increase',
                desc: 'Synchronized drayage with vessel schedules, optimized chassis utilization.',
              },
            ].map((study, i) => (
              <div key={i} className="glass-card p-8 border-l-4 border-neon">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-neon mb-1">{study.title}</h3>
                    <p className="text-steel/60">{study.subtitle}</p>
                  </div>
                  <p className="text-2xl font-black neon-glow mt-4 md:mt-0">{study.metric}</p>
                </div>
                <p className="text-steel/80">{study.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-12">Flow State vs. Legacy YMS</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neon/20">
                  <th className="pb-4 font-bold text-neon">Capability</th>
                  <th className="pb-4 font-bold text-steel text-center">Legacy YMS</th>
                  <th className="pb-4 font-bold text-neon text-center">Flow State</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cap: 'Real-time Tracking', legacy: false, flow: true },
                  { cap: 'AI Move Recommendations', legacy: false, flow: true },
                  { cap: 'Driver Self-Service', legacy: false, flow: true },
                  { cap: 'Deployment Time', legacy: '90 days', flow: '10 minutes' },
                  { cap: 'Integration Complexity', legacy: 'High', flow: 'Low' },
                  { cap: 'Cost per Site', legacy: '$50k+', flow: '$15k' },
                  { cap: 'Mobile-First UI', legacy: false, flow: true },
                  { cap: 'Multi-language Support', legacy: false, flow: true },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-steel/20 hover:bg-carbon/50 transition-colors">
                    <td className="py-4 font-semibold">{row.cap}</td>
                    <td className="py-4 text-center text-steel/60">
                      {typeof row.legacy === 'boolean' ? (
                        <span className="inline-flex justify-center w-full">
                          {row.legacy ? <Confirm size={20} className="text-neon" /> : <Dismiss size={20} className="text-ember" />}
                        </span>
                      ) : (
                        row.legacy
                      )}
                    </td>
                    <td className="py-4 text-center text-neon font-semibold">
                      {typeof row.flow === 'boolean' ? (
                        <span className="inline-flex justify-center w-full">
                          {row.flow ? <Confirm size={20} className="text-neon" /> : <Dismiss size={20} className="text-ember" />}
                        </span>
                      ) : (
                        row.flow
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="py-24 bg-carbon/50 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-12">Your Path to Flow</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                phase: 'Assess',
                desc: 'We analyze your current yard operations and create a custom implementation roadmap.',
                timeline: 'Week 1',
              },
              {
                phase: 'Deploy',
                desc: 'YardBuilder AI scans your facility. Digital Guard & YMS come online in minutes.',
                timeline: 'Week 2-3',
              },
              {
                phase: 'Optimize',
                desc: 'Our team fine-tunes workflows and trains your staff on Flow State best practices.',
                timeline: 'Ongoing',
              },
            ].map((step, i) => (
              <Card key={i} hover>
                <p className="text-5xl font-black neon-glow mb-4">{i + 1}</p>
                <h3 className="text-2xl font-bold mb-3">{step.phase}</h3>
                <p className="text-steel/80 mb-4 leading-relaxed">{step.desc}</p>
                <p className="text-sm text-neon font-semibold">{step.timeline}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-8">Which Archetype Are You?</h2>
          <p className="text-xl text-steel/90 mb-4">Only 3 Founding Member spots remaining.</p>
          <p className="text-lg text-neon font-semibold mb-12">Applications close when filled.</p>
          <a href="/singularity" className="btn-neon-fill inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all">
            <Crosshair size={20} className="text-void" />
            Apply for Membership
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
