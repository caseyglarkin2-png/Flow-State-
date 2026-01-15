import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ExpandableCard } from '@/components/ExpandableCard';

const archetypes = [
  {
    id: 'gated-guarded',
    title: 'Gated/Guarded',
    kicker: 'High Security',
    desc: 'Perimeter fencing, manned gate, strict access control.',
    modules: 'Digital Guard (full), Digital BOL',
    checkin: 'Kiosk at gate',
    timeline: '6–8 weeks',
    timelineNote: 'Security validation required',
    examples: 'Pharma distribution, high-value goods, government contracts',
  },
  {
    id: 'non-gated',
    title: 'Non-Gated',
    kicker: 'Open Campus',
    desc: 'Open lot, no physical gate, spot-based check-in.',
    modules: 'Digital Guard (lite), Lane Planner',
    checkin: 'Mobile/tablet at designated spots',
    timeline: '3–4 weeks',
    timelineNote: 'Fastest rollout',
    examples: 'Retail DCs, regional distributors',
  },
  {
    id: 'backup-sensitive',
    title: 'Backup-Sensitive',
    kicker: 'Throughput Critical',
    desc: 'Frequent backup, detention costs, seasonal surges.',
    modules: 'Lane Planner (priority), Real-Time Visibility',
    checkin: 'Pre-scheduled slots, dynamic rebalancing',
    timeline: '4–5 weeks',
    timelineNote: 'Calendar integration required',
    examples: 'High-volume DCs, cross-docks, retail peak season',
  },
  {
    id: 'scale-heavy',
    title: 'Scale Heavy',
    kicker: 'High Volume',
    desc: '200+ trucks/day, multiple gates, complex staging.',
    modules: 'Full YNS Suite',
    checkin: 'Multi-gate orchestration',
    timeline: '6–8 weeks',
    timelineNote: 'Phased rollout recommended',
    examples: 'Mega-DCs, Amazon-scale facilities',
  },
  {
    id: 'cross-dock',
    title: 'Cross-Dock',
    kicker: 'Fast Turns',
    desc: 'Minimal dwell, dock-to-dock flow, tight SLAs.',
    modules: 'Digital BOL, Lane Planner',
    checkin: 'Automated dock assignment',
    timeline: '3–4 weeks',
    timelineNote: 'WMS integration helpful',
    examples: 'LTL terminals, transload facilities',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    kicker: 'JIT Sensitive',
    desc: 'JIT delivery, line-down risk, supplier scheduling.',
    modules: 'Lane Planner, Supplier Portal',
    checkin: 'Supplier-facing scheduling',
    timeline: '5–6 weeks',
    timelineNote: 'ERP integration common',
    examples: 'Auto plants, assembly facilities, chemical processing',
  },
];

export default function ImplementationPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-neon/10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Implementation</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
            Site 40 Deploys in 3 Weeks.<br />
            <span className="text-neon">Site 1 Took 8.</span>
          </h1>
          <p className="text-xl text-steel max-w-2xl leading-relaxed mb-10">
            We mapped 6 yard archetypes. Each has a different workflow + config. You get a rollout plan that sequences deployment, resource requirements, and expected ROI curve.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            <div className="rounded-xl border border-neon/20 bg-carbon/50 p-4">
              <p className="text-neon font-bold text-sm mb-1">6 Archetypes</p>
              <p className="text-steel text-sm leading-relaxed">Gated, non-gated, backup-sensitive, scale-heavy, cross-dock, manufacturing</p>
            </div>
            <div className="rounded-xl border border-neon/20 bg-carbon/50 p-4">
              <p className="text-neon font-bold text-sm mb-1">3–8 Weeks</p>
              <p className="text-steel text-sm leading-relaxed">Per facility (depends on archetype complexity)</p>
            </div>
            <div className="rounded-xl border border-neon/20 bg-carbon/50 p-4">
              <p className="text-neon font-bold text-sm mb-1">Standardized Playbooks</p>
              <p className="text-steel text-sm leading-relaxed">Each deployment improves the next</p>
            </div>
          </div>
        </div>
      </section>

      {/* Archetypes */}
      <section className="border-t border-neon/10 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Yard Archetypes</p>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            Your Facilities Aren't Identical. Neither Is the Rollout.
          </h2>
          <p className="text-lg text-steel mb-10 max-w-2xl leading-relaxed">
            Each archetype has different module prioritization, integration requirements, and deployment timeline.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archetypes.map((a, idx) => (
              <ExpandableCard
                key={a.id}
                id={`archetype-${idx + 1}`}
                title={a.title}
                kicker={a.kicker}
                defaultOpen={idx === 0}
              >
                <div className="space-y-3 text-sm">
                  <p className="text-steel leading-relaxed">{a.desc}</p>
                  <div>
                    <p className="text-white font-semibold mb-1">Priority Modules</p>
                    <p className="text-steel">{a.modules}</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Check-in</p>
                    <p className="text-steel">{a.checkin}</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Timeline</p>
                    <p className="text-neon font-bold">{a.timeline}</p>
                    <p className="text-steel/60 text-xs">{a.timelineNote}</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Examples</p>
                    <p className="text-steel">{a.examples}</p>
                  </div>
                </div>
              </ExpandableCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-neon/10 py-16 bg-carbon/20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">The Process</p>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-10">
            How Rollout Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', body: 'Facility mix audit. Map each site to archetype. Identify priority modules per location.' },
              { step: '02', title: 'Pilot', body: 'Deploy at one facility with clear success metrics. Prove the operational loop. Refine config.' },
              { step: '03', title: 'Wave 1', body: '5–10 facilities. Parallel deployment using proven playbook. Each deployment improves the next.' },
              { step: '04', title: 'Scale', body: 'Full network rollout. Site 40 deploys in 3 weeks. Standardized execution across geography.' },
            ].map((item) => (
              <div key={item.step} className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
                <p className="text-neon font-bold text-sm mb-2">{item.step}</p>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-steel leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="border-t border-neon/10 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Deliverables</p>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-10">
            What You Get at Each Phase
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <h3 className="font-bold text-white mb-3">Discovery Output</h3>
              <ul className="text-steel text-sm space-y-2">
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Network audit with archetype mapping</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Module prioritization per facility</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Integration requirements matrix</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Rollout sequence recommendation</li>
              </ul>
            </div>
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <h3 className="font-bold text-white mb-3">Pilot Output</h3>
              <ul className="text-steel text-sm space-y-2">
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Working YNS deployment at one facility</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Baseline metrics + 90-day comparison</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Refined playbook for Wave 1</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Board-ready ROI validation</li>
              </ul>
            </div>
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <h3 className="font-bold text-white mb-3">Wave 1 Output</h3>
              <ul className="text-steel text-sm space-y-2">
                <li className="flex items-start gap-3"><span className="text-neon">→</span>5–10 facilities live</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Network-level visibility dashboard</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Change management playbook</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Deployment velocity metrics</li>
              </ul>
            </div>
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <h3 className="font-bold text-white mb-3">Scale Output</h3>
              <ul className="text-steel text-sm space-y-2">
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Full network deployment</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Enterprise reporting + analytics</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Continuous improvement cadence</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Expansion playbook for acquisitions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neon/10 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Next Step</p>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            Get Your Network Rollout Plan
          </h2>
          <p className="text-lg text-steel mb-8 max-w-2xl mx-auto">
            30 minutes. Facility audit. Archetype mapping. Sequenced deployment plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
            >
              Book the Call
            </Link>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
            >
              Run Network Diagnostic
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
