import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ExpandableCard } from '@/components/ExpandableCard';
import { ARCHETYPES, type ArchetypeId, ICON_SIZES } from '@/lib/modules';

const archetypes = [
  {
    id: 'gated-guarded' as ArchetypeId,
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
    id: 'non-gated' as ArchetypeId,
    title: 'Non-Gated',
    kicker: 'Open Access',
    desc: 'No physical gate, open yard, carrier self-service.',
    modules: 'Geofence + mobile check-in, Digital Comms',
    checkin: 'Mobile app (driver self-check-in)',
    timeline: '3–4 weeks',
    timelineNote: 'Lighter infrastructure',
    examples: 'Regional LTL terminals, cross-dock hubs',
  },
  {
    id: 'backup-sensitive' as ArchetypeId,
    title: 'Backup-Sensitive',
    kicker: 'Detention Risk',
    desc: 'High detention exposure, frequent carrier disputes.',
    modules: 'Digital BOL (chain-of-custody proof), Digital Guard',
    checkin: 'Kiosk + mobile (redundant timestamp capture)',
    timeline: '5–6 weeks',
    timelineNote: 'Forensic-grade proof setup',
    examples: 'Food/bev distribution, time-sensitive perishables',
  },
  {
    id: 'scale-heavy' as ArchetypeId,
    title: 'Scale-Heavy',
    kicker: 'High Throughput',
    desc: '100+ daily moves, complex dock scheduling, tight turn windows.',
    modules: 'Digital YMS (orchestration), Digital Comms',
    checkin: 'Hybrid (kiosk + mobile + ALPR)',
    timeline: '7–8 weeks',
    timelineNote: 'AI training + dock integration',
    examples: 'Major DCs, fulfillment centers, manufacturing receiving',
  },
  {
    id: 'cross-dock' as ArchetypeId,
    title: 'Cross-Dock',
    kicker: 'Fast Turns',
    desc: 'Under 2-hour dwell target, minimal staging, tight coordination.',
    modules: 'Digital Comms (real-time driver instructions), Digital YMS',
    checkin: 'Mobile app (speed priority)',
    timeline: '4–5 weeks',
    timelineNote: 'Real-time comms critical',
    examples: 'LTL break-bulk, transload facilities',
  },
  {
    id: 'manufacturing' as ArchetypeId,
    title: 'Manufacturing',
    kicker: 'Complex Workflows',
    desc: 'Just-in-time delivery, ERP integration, production scheduling dependencies.',
    modules: 'Digital YMS (orchestration + WMS/ERP integration), Digital BOL',
    checkin: 'Kiosk + ERP pre-validation',
    timeline: '8–10 weeks',
    timelineNote: 'Custom integration work',
    examples: 'Automotive plants, assembly facilities, material receiving',
  },
];

export default function ImplementationPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Implementation</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            Site 40 Deploys in 3 Weeks.<br />
            <span className="text-neon">Site 1 Took 8.</span>
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed mb-10">
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
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Yard Archetypes</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Your Facilities Aren't Identical. Neither Is the Rollout.
          </h2>
          <p className="mt-4 text-[17px] text-steel leading-8 mb-10 max-w-2xl">
            Each archetype has different module prioritization, integration requirements, and deployment timeline.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archetypes.map((a, idx) => {
              const archetypeData = ARCHETYPES[a.id];
              const ArchetypeIcon = archetypeData?.icon;
              return (
                <ExpandableCard
                  key={a.id}
                  id={a.id}
                  title={`${idx + 1}. ${a.title}`}
                  kicker={a.kicker}
                  defaultOpen={idx === 0}
                  icon={ArchetypeIcon && <ArchetypeIcon size={ICON_SIZES.md} />}
                >
                  <div className="space-y-3 text-sm">
                    <p className="text-steel leading-relaxed">{a.desc}</p>
                    <div>
                      <p className="text-white font-semibold mb-1">Priority Modules:</p>
                      <p className="text-steel">{a.modules}</p>
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Check-in:</p>
                      <p className="text-steel">{a.checkin}</p>
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Timeline:</p>
                      <p className="text-neon font-bold">{a.timeline}</p>
                      <p className="text-steel/60 text-xs">({a.timelineNote})</p>
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Examples:</p>
                      <p className="text-steel">{a.examples}</p>
                    </div>
                  </div>
                </ExpandableCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-carbon/20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">The Process</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white mb-10">
            How Rollout Works
          </h2>

          {/* Rollout Visual */}
          <div className="mb-12 rounded-xl overflow-hidden border-2 border-neon/20 bg-carbon/50">
            <img src="/proof/roll-out.png" alt="Network rollout timeline visualization" className="w-full h-auto" />
          </div>

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

      {/* Co-Development Callout */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl border border-neon/20 bg-gradient-to-br from-neon/5 to-ember/5 p-8 md:p-12">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-neon/10 p-3 flex-shrink-0">
                <svg className="w-6 h-6 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Need Features Beyond the Base Platform?
                </h2>
                <p className="text-[17px] text-steel leading-8 mb-6">
                  Complex multi-site rollouts often reveal advanced workflow needs: custom integrations with proprietary WMS/TMS systems, mode-specific automation (reefer temp tracking, flatbed securement vision, intermodal container choreography), or network-level analytics tailored to your operations.
                </p>
                <p className="text-sm text-steel/70 mb-6">
                  Multi-site operators with &gt;20 facilities: co-develop features with us, influence our roadmap, and deploy custom capabilities ahead of the market.
                </p>
                <Link
                  href="/co-development"
                  className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
                >
                  Apply for Co-Development
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Deliverables</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white mb-10">
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
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Next Step</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Get Your Network Rollout Plan
          </h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl">
            30 minutes. Facility audit. Archetype mapping. Sequenced deployment plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
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
