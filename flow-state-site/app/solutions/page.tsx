/* ═══════════════════════════════════════════════════════════════
   SOLUTIONS PAGE - With Chapter Mapping
   ═══════════════════════════════════════════════════════════════ */

'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FrameShiftHero from '@/components/FrameShiftHero';
import MissionCard from '@/components/MissionCard';
import { useLaneStore } from '@/store/lane';

export default function SolutionsPage() {
  const lane = useLaneStore((s) => s.lane);

  const missions: Array<{
    title: string;
    trigger: string;
    whatBreaks: string;
    intervention: string;
    outcome: string;
    layer: string;
  }> = [
    {
      title: 'Stop the detention tax',
      trigger: "You're paying detention and nobody trusts the timestamps.",
      whatBreaks: 'Disputes drag. Ops gets blamed. Finance treats it as a tax.',
      intervention: 'Standard check-in/out with defensible time capture and exception handling.',
      outcome: 'Fewer disputes. Clearer accountability. Negotiation leverage improves.',
      layer: 'Foundation: Driver Journey',
    },
    {
      title: 'Cut the security tax',
      trigger: 'Cargo theft, fraudulent carriers, and compliance violations are costing you millions.',
      whatBreaks: 'Manual ID checks miss fraud. Investigations take weeks. Insurance premiums climb.',
      intervention: 'ID scanning + carrier credentialing + tamper-evident audit trail + CTPAT/TSA compliance.',
      outcome: '80% theft reduction, 15% insurance discount, compliant gates with forensic-grade evidence.',
      layer: 'Foundation: Driver Journey',
    },
    {
      title: 'Cut the expedite tax',
      trigger: 'Peak days turn the gate into a queue with no control loop.',
      whatBreaks: 'Drivers stack up. Dock plans drift. Everyone improvises.',
      intervention: 'Instrument the gate, route exceptions, and enforce repeatable workflows.',
      outcome: 'More predictable turns and fewer "surprise" delays.',
      layer: 'Execution: Yard Operations',
    },
    {
      title: 'Eliminate the search tax',
      trigger: "Your network can't answer: \"Where is the trailer right now?\"",
      whatBreaks: 'Teams waste hours searching and rework piles up.',
      intervention: 'Ground-truth yard state + consistent yard map + standardized moves.',
      outcome: 'Less search time and tighter yard execution.',
      layer: 'Execution: Yard Operations',
    },
    {
      title: 'End the variance tax',
      trigger: 'Every facility runs a different process and reporting is unreliable.',
      whatBreaks: "Leadership can't compare performance; improvements don't stick.",
      intervention: 'One network playbook with site-specific configuration and the same measurement layer.',
      outcome: 'Comparable KPIs across the network; ROI compounds as adoption grows.',
      layer: 'Intelligence: Network Orchestration',
    },
  ];

  const shown = lane === 'brief' ? missions.slice(0, 3) : missions;

  return (
    <div className="min-h-screen bg-void">
      <Header />

      <FrameShiftHero
        title={
          <>
            Cut the <span className="neon-glow">leak</span> one mission at a time.
          </>
        }
        reframe={
          <>Detention. Expedites. Search time. Security. Variance. Each one is a leak you're paying. Pick the one that hurts most.</>
        }
        proof={<>Same math. Same posture. No invented metrics.</>}
        primaryCta={{ href: '/diagnostic', label: 'Run the Network Leak Diagnostic' }}
        secondaryCta={{ href: '/roi', label: 'Model Full ROI' }}
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-3">Pick the tax you want to cut first</h2>
          <p className="text-steel max-w-3xl mb-4">
            Each tax has the same pattern: invisible cost → root cause → intervention → measurable recovery.
          </p>
          <p className="text-sm text-steel/70 mb-8">
            Each mission maps to a specific layer of the YardFlow architecture. See which layer solves which problem.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {shown.map((m) => (
              <div key={m.title} className="relative">
                <div className="absolute -top-2 -right-2 z-10 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-neon/10 border border-neon/40 text-neon">
                  {m.layer}
                </div>
                <MissionCard
                  title={m.title}
                  trigger={m.trigger}
                  whatBreaks={m.whatBreaks}
                  intervention={m.intervention}
                  outcome={m.outcome}
                  cta={{ href: '/contact', label: 'Get a quote' }}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-neon/15 bg-carbon/40 p-6">
            <h3 className="text-xl font-bold text-neon">Proof without pretending</h3>
            <p className="text-steel mt-2">
              We don't publish customer logos or exact metrics here. We do provide modeled case study formats you can share
              internally.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link href="/case-studies" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-neon text-void">
                View case studies
              </Link>
              <Link
                href="/compare/legacy-yms"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
              >
                Compare to legacy YMS
              </Link>
            </div>
            <p className="text-xs text-steel/70 mt-3">Modeled examples are labeled. Results vary.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
