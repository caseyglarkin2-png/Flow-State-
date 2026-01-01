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

  const missions = [
    {
      title: 'Stop detention arguments',
      trigger: 'You’re paying detention and nobody trusts the timestamps.',
      whatBreaks: 'Disputes drag. Ops gets blamed. Finance treats it as a tax.',
      intervention: 'Standard check-in/out with defensible time capture and exception handling.',
      outcome: 'Fewer disputes. Clearer accountability. Negotiation leverage improves.',
    },
    {
      title: 'Fix gate throughput during peaks',
      trigger: 'Peak days turn the gate into a queue with no control loop.',
      whatBreaks: 'Drivers stack up. Dock plans drift. Everyone improvises.',
      intervention: 'Instrument the gate, route exceptions, and enforce repeatable workflows.',
      outcome: 'More predictable turns and fewer “surprise” delays.',
    },
    {
      title: 'Eliminate trailer blindness',
      trigger: 'Your network can’t answer: “Where is the trailer right now?”',
      whatBreaks: 'Teams waste hours searching and rework piles up.',
      intervention: 'Ground-truth yard state + consistent yard map + standardized moves.',
      outcome: 'Less search time and tighter yard execution.',
    },
    {
      title: 'Standardize a multi-site network',
      trigger: 'Every facility runs a different process and reporting is unreliable.',
      whatBreaks: 'Leadership can’t compare performance; improvements don’t stick.',
      intervention: 'One network playbook with site-specific configuration and the same measurement layer.',
      outcome: 'Comparable KPIs across the network; ROI compounds as adoption grows.',
    },
  ];

  const shown = lane === 'brief' ? missions.slice(0, 3) : missions;

  return (
    <div className="min-h-screen bg-void">
      <Header />

      <FrameShiftHero
        title={
          <>
            Use cases as <span className="neon-glow">missions</span>.
          </>
        }
        reframe={
          <>When the yard has a control loop, you stop debating “what happened” and start enforcing “what happens next.”</>
        }
        proof={<>Quick lane for execs. Deep lane for ops. Same math. Same posture.</>}
        primaryCta={{ href: '/yardbuilder', label: 'Generate Yard Report (PDF)' }}
        secondaryCta={{ href: '/roi', label: 'Model ROI' }}
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-3">Pick the mission you’re already fighting</h2>
          <p className="text-steel max-w-3xl">
            Each mission follows the same pattern: trigger → break → intervention → measurable outcome.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {shown.map((m) => (
              <MissionCard
                key={m.title}
                title={m.title}
                trigger={m.trigger}
                whatBreaks={m.whatBreaks}
                intervention={m.intervention}
                outcome={m.outcome}
                cta={{ href: '/contact', label: 'Get a quote' }}
              />
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-neon/15 bg-carbon/40 p-6">
            <h3 className="text-xl font-bold text-neon">Proof without pretending</h3>
            <p className="text-steel mt-2">
              We don’t publish customer logos or exact metrics here. We do provide modeled case study formats you can share
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
