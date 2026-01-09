"use client";

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import YardBuilderHook from '@/components/YardBuilderHook';
import NetworkEffectModel from '@/components/NetworkEffectModel';
import { ExpandableCard } from '@/components/ExpandableCard';
import { ExpandAllControls } from '@/components/ExpandAllControls';
import { PersonaFilter } from '@/components/PersonaFilter';
import { calcRoiV2, getRoiV2InputsForPreset } from '@/lib/economics';
import { X, Check, DollarSign, Warehouse } from 'lucide-react';
import {
  Agent,
  Cortex,
  Shield,
  Manifest,
  FlowArrow,
  Metrics,
  Velocity,
  Timeline,
  Crosshair,
} from '@/components/icons/FlowIcons';

export default function Home() {
  const cfoBaseline = calcRoiV2({
    ...getRoiV2InputsForPreset('enterprise_50', 'expected'),
    yearOneRampShare: 0.05,
  });

  const dollarsPerFacility = (annual: number) => {
    const per = cfoBaseline.totalFacilities > 0 ? annual / cfoBaseline.totalFacilities : 0;
    return `$${Math.round(per).toLocaleString()}/site`;
  };

  const allCardIds = [
    'yms-vs-yns',
    'network-leak',
    'proof-metrics',
    'yardbuilder',
    'ground-truth',
    'primo-proof',
    'network-effect',
    'product-modules',
    'cfo-proof',
    'deployment-path'
  ];

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* HERO: Network Thesis (always visible) */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-ember font-mono text-sm tracking-widest mb-6 uppercase">
            The Silo Trap
          </p>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95]">
            <span className="text-white">You don't have 50 yards.</span>
            <br />
            <span className="text-steel/70 text-4xl md:text-5xl">You have one yard network.</span>
            <br />
            <span className="text-neon drop-shadow-[0_0_30px_rgba(0,180,255,0.5)] mt-4 block">
              But your software treats them like islands.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-steel/90 mb-4 max-w-3xl mx-auto">
            Traditional Yard Management Systems (YMS) optimize each site in isolation. 
            YardFlow is a <span className="text-neon font-semibold">Yard Network System (YNS)</span>: 
            orchestrating assets, intelligence, and security across your entire network.
          </p>

          <p className="text-lg text-steel/70 mb-10 max-w-2xl mx-auto">
            See exactly what your network is costing you in detention, expedites, and lost throughput. 
            Then stop paying it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostic"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg bg-ember text-white hover:bg-white hover:text-void transition-all hover:scale-105"
            >
              <Crosshair size={22} />
              Run the Network Leak Diagnostic
            </Link>
            <Link
              href="/yns"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold border-2 border-neon text-neon hover:bg-neon hover:text-void transition-all"
            >
              YMS vs YNS: See the Difference
            </Link>
          </div>
        </div>
      </section>

      {/* FRAMEWORK: Viscosity → Leak → YNS (always visible - core mental model) */}
      <section className="py-16 border-b border-neon/20 bg-gradient-to-b from-void to-carbon/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              The Framework
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
              Network is the product. Leak is the scoreboard.
            </h2>
            <p className="text-lg text-steel/80 max-w-3xl mx-auto">
              Three lenses on the same problem. Understanding all three is how you fix it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-neon/50 bg-gradient-to-br from-neon/10 to-transparent hover:border-neon/70 transition-all">
              <div className="text-neon mb-4">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Yard Network System</h3>
              <p className="text-steel/80 text-sm mb-3 leading-relaxed">
                <span className="text-neon font-semibold">The category solution.</span> One application across all facilities. 
                Standardized driver + yard protocols. Data that flows across the network.
              </p>
              <p className="text-neon text-xs font-semibold">
                YMS optimizes sites. YNS orchestrates networks.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-steel/30 bg-carbon/40 hover:border-steel/50 transition-all">
              <div className="text-ember mb-4">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M2 12h20M6 6l12 12M6 18L18 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Yard Viscosity</h3>
              <p className="text-steel/80 text-sm mb-3 leading-relaxed">
                <span className="text-neon font-semibold">The symptom.</span> Friction at every handoff because every yard runs 
                a different playbook, produces incompatible data, and creates blind spots.
              </p>
              <p className="text-steel/60 text-xs">
                Network fragmentation creates operational drag
              </p>
            </div>

            <div className="p-6 rounded-lg border border-ember/50 bg-gradient-to-br from-ember/10 to-transparent hover:border-ember/70 transition-all">
              <div className="text-ember mb-4">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Network Leak</h3>
              <p className="text-steel/80 text-sm mb-3 leading-relaxed">
                <span className="text-neon font-semibold">The cost metric.</span> Detention, expedites, overtime, working capital. 
                Leak exists because the network is fragmented.
              </p>
              <p className="text-ember text-xs font-semibold">
                Use leak as the diagnostic, not the product
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-steel/60 text-sm mb-4">
              YMS vendors solve leak at big facilities. YNS standardizes the whole network.
            </p>
            <Link
              href="/yns"
              className="inline-flex items-center gap-2 text-neon hover:underline font-semibold"
            >
              See the full YNS framework →
            </Link>
          </div>
        </div>
      </section>

      {/* CONTROLS: Expand/Collapse + Persona Filter */}
      <section className="py-8 bg-carbon/20 border-b border-steel/20 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <p className="text-steel/60 text-sm">Deep dive into any section below, or filter by your role</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <PersonaFilter cardIds={allCardIds} />
              <ExpandAllControls cardIds={allCardIds} />
            </div>
          </div>
        </div>
      </section>

      {/* CARD CABINET: All major sections as collapsible cards */}
      <section className="py-12 bg-void">
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          
          {/* YMS vs YNS */}
          <ExpandableCard
            id="yms-vs-yns"
            title="YMS vs YNS: The Critical Difference"
            kicker="YMS optimizes individual sites. YNS orchestrates your entire network."
            bullets={[
              "Single facility vs. entire network optimization",
              "Isolated data vs. cross-site intelligence",
              "Linear ROI vs. compounding network value"
            ]}
            persona={["CFO", "Ops"]}
          >
            <div className="overflow-hidden rounded-lg border border-steel/30 bg-void mb-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-steel/30">
                    <th className="py-4 px-6 text-left text-steel/60 font-mono text-xs uppercase tracking-wider">
                      Capability
                    </th>
                    <th className="py-4 px-6 text-center text-steel/60 font-mono text-xs uppercase tracking-wider border-l border-steel/20">
                      Traditional YMS
                    </th>
                    <th className="py-4 px-6 text-center text-neon font-mono text-xs uppercase tracking-wider border-l border-neon/30 bg-neon/5">
                      YNS (YardFlow)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel/20">
                  <tr className="hover:bg-carbon/30 transition-colors">
                    <td className="py-4 px-6 text-sm text-white font-semibold">Optimization Scope</td>
                    <td className="py-4 px-6 text-center text-steel/70 text-sm border-l border-steel/20">Single facility</td>
                    <td className="py-4 px-6 text-center text-neon text-sm border-l border-neon/30 bg-neon/5">Entire network</td>
                  </tr>
                  <tr className="hover:bg-carbon/30 transition-colors">
                    <td className="py-4 px-6 text-sm text-white font-semibold">Data Sharing</td>
                    <td className="py-4 px-6 text-center text-steel/70 text-sm border-l border-steel/20">Isolated per site</td>
                    <td className="py-4 px-6 text-center text-neon text-sm border-l border-neon/30 bg-neon/5">Cross-site intelligence</td>
                  </tr>
                  <tr className="hover:bg-carbon/30 transition-colors">
                    <td className="py-4 px-6 text-sm text-white font-semibold">Carrier Intelligence</td>
                    <td className="py-4 px-6 text-center text-steel/70 text-sm border-l border-steel/20">Local history only</td>
                    <td className="py-4 px-6 text-center text-neon text-sm border-l border-neon/30 bg-neon/5">Network benchmarking</td>
                  </tr>
                  <tr className="hover:bg-carbon/30 transition-colors">
                    <td className="py-4 px-6 text-sm text-white font-semibold">Predictive ETA</td>
                    <td className="py-4 px-6 text-center text-steel/70 text-sm border-l border-steel/20">Manual updates</td>
                    <td className="py-4 px-6 text-center text-neon text-sm border-l border-neon/30 bg-neon/5">AI-powered, learns from network</td>
                  </tr>
                  <tr className="hover:bg-carbon/30 transition-colors">
                    <td className="py-4 px-6 text-sm text-white font-semibold">ROI Pattern</td>
                    <td className="py-4 px-6 text-center text-steel/70 text-sm border-l border-steel/20">Linear per facility</td>
                    <td className="py-4 px-6 text-center text-neon text-sm border-l border-neon/30 bg-neon/5">Compounds with scale</td>
                  </tr>
                  <tr className="hover:bg-carbon/30 transition-colors">
                    <td className="py-4 px-6 text-sm text-white font-semibold">Deployment Model</td>
                    <td className="py-4 px-6 text-center text-steel/70 text-sm border-l border-steel/20">Custom per site</td>
                    <td className="py-4 px-6 text-center text-neon text-sm border-l border-neon/30 bg-neon/5">Standardized, faster rollout</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-6 rounded-lg border border-neon/30 bg-gradient-to-r from-neon/5 to-transparent">
              <p className="text-white font-semibold mb-2">The Network Effect</p>
              <p className="text-steel/80 text-sm leading-relaxed">
                Site 1 gives you local efficiency. Site 2 adds benchmarking. Site 5+ unlocks pattern recognition. 
                Site 10+ creates a learning flywheel where each new facility makes the entire network smarter. 
                <Link href="/network-effect" className="text-neon hover:underline ml-1">
                  See the math →
                </Link>
              </p>
            </div>
          </ExpandableCard>

          {/* Network Leak Diagnostic */}
          <ExpandableCard
            id="network-leak"
            title="The Network Leak: 8 Hidden Cost Categories"
            kicker="Leak exists because the network is fragmented. Measure it, then stop it."
            bullets={[
              "Detention fees you shouldn't pay",
              "Expedite charges for preventable delays",
              "Working capital tied up 'just in case'"
            ]}
            persona={["CFO", "Ops"]}
          >
            <div className="space-y-6">
              <p className="text-steel/80 leading-relaxed">
                Network leak is not a product feature. It's an <span className="text-neon font-semibold">outcome of network variance</span>. 
                Every yard runs a different playbook, produces incompatible data, and creates blind spots. 
                The result: margin disappears into 8 categories of hidden cost.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { cat: 'Detention fees', ex: '$180/event × 340 events' },
                  { cat: 'Expedite charges', ex: 'Premium freight on delays' },
                  { cat: 'Gate overtime', ex: '3 FTE × $28/hr × 4hr/week' },
                  { cat: 'Dwell inefficiency', ex: '48min avg → opportunity cost' },
                  { cat: 'Safety buffer inventory', ex: 'Working capital tied up' },
                  { cat: 'Lost throughput', ex: 'Dock utilization <70%' },
                  { cat: 'Compliance exposure', ex: 'Driver qualification gaps' },
                  { cat: 'Data labor', ex: 'Manual reconciliation' }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg border border-steel/30 bg-carbon/40">
                    <p className="text-white font-semibold mb-1">{item.cat}</p>
                    <p className="text-steel/60 text-sm">{item.ex}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/diagnostic"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-ember text-white hover:bg-white hover:text-void transition-all"
              >
                <Crosshair size={18} />
                Run the Network Leak Diagnostic
              </Link>
            </div>
          </ExpandableCard>

          {/* Proof Metrics */}
          <ExpandableCard
            id="proof-metrics"
            title="Aggregate Network Metrics"
            kicker="200+ facilities modeled. 50% dwell reduction. 8-week deployments."
            bullets={[
              `${Math.round(cfoBaseline.yearOneRoiPercent)}% ROI at enterprise scale (modeled)`,
              "50% dwell time reduction",
              "8 weeks avg. time to production"
            ]}
            persona={["CFO", "Ops"]}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-neon">200+</p>
                <p className="text-steel text-sm mt-1">Facilities modeled</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-white">{Math.round(cfoBaseline.yearOneRoiPercent)}%</p>
                <p className="text-steel text-sm mt-1">ROI (enterprise scale)</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-white">50%</p>
                <p className="text-steel text-sm mt-1">Dwell time reduction</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-white">8 weeks</p>
                <p className="text-steel text-sm mt-1">Avg. time to production</p>
              </div>
            </div>
            <p className="text-steel/50 text-xs">Metrics based on Primo/Singularity simulations and validated ROI models. Individual results vary.</p>
          </ExpandableCard>

          {/* YardBuilder */}
          <ExpandableCard
            id="yardbuilder"
            title="YardBuilder: From Diagnosis to Action"
            kicker="Enter any facility address. Get a board-ready yard report in minutes."
            bullets={[
              "Satellite imagery + AI yard mapping",
              "Identifies throughput bottlenecks",
              "Board-ready report in 5 minutes"
            ]}
            persona={["Ops"]}
          >
            <div className="mb-6">
              <p className="text-steel/80 leading-relaxed mb-4">
                Enter any facility address. YardBuilder uses satellite imagery + AI to map your facility, 
                identify bottlenecks, and generate a board-ready report showing exactly where the margin is hiding.
              </p>
              <YardBuilderHook />
            </div>
          </ExpandableCard>

          {/* Ground Truth */}
          <ExpandableCard
            id="ground-truth"
            title="Why the Leak Exists: Instrumentation, Not Effort"
            kicker="You can't cut costs you can't see. YardFlow makes the invisible auditable."
            bullets={[
              "Gate camera timestamps replace guesswork",
              "±47 min variance eliminated",
              "Auditable proof for detention recovery"
            ]}
            persona={["CFO", "Ops"]}
          >
            <div className="space-y-6">
              <p className="text-steel/80 leading-relaxed">
                The leak persists because legacy systems record what happened <span className="text-ember font-semibold">after the fact</span>, 
                based on what someone typed in. No defensible timestamps. No exception capture. No accountability.
              </p>
              <p className="text-steel/80 leading-relaxed">
                YardFlow establishes <span className="text-neon font-semibold">Ground Source Truth</span>: 
                defensible timestamps from the physical yard that replace reported data with reality.
              </p>

              <div className="space-y-4">
                {[
                  { before: 'Reported arrival', after: 'Gate camera timestamp', delta: '±47 min variance eliminated' },
                  { before: 'Estimated dwell', after: 'Actual spot-to-dock', delta: '48 min → 24 min avg' },
                  { before: 'Guessed detention', after: 'Auditable proof', delta: 'Detention recovery (modeled)' },
                ].map((row, i) => (
                  <div key={i} className="p-4 flex items-center gap-4 rounded-lg border border-steel/30 bg-carbon/40">
                    <div className="flex-1">
                      <p className="text-steel/60 text-sm line-through">{row.before}</p>
                      <p className="text-white font-medium">{row.after}</p>
                    </div>
                    <div className="text-neon font-mono text-sm font-bold">{row.delta}</div>
                  </div>
                ))}
              </div>
            </div>
          </ExpandableCard>

          {/* Primo Proof */}
          <ExpandableCard
            id="primo-proof"
            title="Proof at Scale: Enterprise Network Rollout"
            kicker="260 sites. 50% turn time reduction. 90 days to network effect."
            bullets={[
              "260 sites deployed",
              "142% velocity gain",
              "Modeled enterprise rollout example"
            ]}
            persona={["CFO", "Ops"]}
          >
            <div className="space-y-6">
              <p className="text-steel/80 leading-relaxed italic">
                "If water can flow this fast, anything can."
              </p>
              <p className="text-steel/60 text-sm">
                Modeled enterprise rollout example (illustrative; not a public customer claim).
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                {[
                  { metric: '260', label: 'Sites deployed', suffix: '' },
                  { metric: '50', label: 'Turn time reduction', suffix: '%' },
                  { metric: '142', label: 'Velocity gain', suffix: '%' },
                  { metric: '90', label: 'Days to network', suffix: '' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-lg border border-steel/30 bg-carbon/40">
                    <p className="text-4xl font-black text-neon mb-2">
                      {item.metric}<span className="text-2xl">{item.suffix}</span>
                    </p>
                    <p className="text-steel/70 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-lg border border-neon/20 bg-gradient-to-r from-neon/5 to-transparent">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-steel/60 text-sm font-mono mb-2">BEFORE</p>
                    <ul className="space-y-2 text-steel/80">
                      <li className="flex items-center gap-2"><X size={16} className="text-ember" /> 48-min average dwell</li>
                      <li className="flex items-center gap-2"><X size={16} className="text-ember" /> Paper BOLs, lost paperwork</li>
                      <li className="flex items-center gap-2"><X size={16} className="text-ember" /> 3 FTE/site at gate</li>
                      <li className="flex items-center gap-2"><X size={16} className="text-ember" /> No detention visibility</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-steel/60 text-sm font-mono mb-2">AFTER</p>
                    <ul className="space-y-2 text-white">
                      <li className="flex items-center gap-2"><Check size={16} className="text-neon" /> 24-min average dwell</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-neon" /> 100% digital chain-of-custody</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-neon" /> 0.5 FTE/site at gate</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-neon" /> Detention recovered (modeled)</li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center">
                    <Link
                      href="/case-studies/primo-network"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border border-neon text-neon hover:bg-neon hover:text-void transition-all"
                    >
                      <FlowArrow size={18} />
                      Read Full Case
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ExpandableCard>

          {/* Network Effect */}
          <ExpandableCard
            id="network-effect"
            title="From Cost Recovery to Compounding Returns"
            kicker="Stop the leak at one site. Then watch it compound."
            bullets={[
              "Each facility eliminates local friction",
              "Network-wide visibility at scale",
              "Standardized playbooks = faster rollouts"
            ]}
            persona={["CFO", "Ops"]}
          >
            <div className="space-y-6">
              <p className="text-steel/80 leading-relaxed">
                Each facility you instrument eliminates local friction. But when you connect them, 
                value compounds: standardized playbooks, faster rollouts, network-wide visibility.
              </p>
              <NetworkEffectModel />
            </div>
          </ExpandableCard>

          {/* Product Modules */}
          <ExpandableCard
            id="product-modules"
            title="YardFlow Modules: Four Modules, One Platform"
            kicker="Deploy what you need. Scale when ready."
            bullets={[
              "Digital Guard: 70% gate labor reduction",
              "Digital BOL: Touchless documentation",
              "Digital Comms: 40+ languages supported"
            ]}
            persona={["Ops", "IT"]}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Shield size={36} className="text-neon" />,
                  name: 'Digital Guard',
                  desc: 'Automated check-in. Driver verification in seconds. Eliminate the clipboard.',
                  stat: '70% gate labor reduction',
                },
                {
                  icon: <Agent size={36} className="text-neon" />,
                  name: 'Digital Comms',
                  desc: 'Direct driver messaging with real-time translation. Zero radio dependency.',
                  stat: '40+ languages supported',
                },
                {
                  icon: <Manifest size={36} className="text-neon" />,
                  name: 'Digital BOL',
                  desc: 'Touchless documentation. Timestamped chain of custody for every load.',
                  stat: dollarsPerFacility(cfoBaseline.paperlessSavings),
                },
                {
                  icon: <Cortex size={36} className="text-neon" />,
                  name: 'Digital YMS',
                  desc: 'Real-time asset tracking with AI-powered move recommendations.',
                  stat: 'Sub-5 min deployment time',
                },
              ].map((module, i) => (
                <div key={i} className="p-6 rounded-lg border border-steel/30 bg-carbon/40 hover:border-neon/50 transition-all">
                  <div className="flex items-start gap-5">
                    <div className="p-3 rounded-lg bg-neon/10 flex-shrink-0">
                      {module.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                      <p className="text-steel/80 mb-4 leading-relaxed">{module.desc}</p>
                      <p className="text-neon font-mono text-sm font-bold">{module.stat}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/product"
                className="inline-flex items-center gap-2 text-neon font-semibold hover:text-white transition-colors"
              >
                Explore Full Product →
              </Link>
            </div>
          </ExpandableCard>

          {/* CFO Proof */}
          <ExpandableCard
            id="cfo-proof"
            title="Board-Ready ROI in 5 Minutes"
            kicker="Auditable assumptions. Defensible projections. Export-ready for your board deck."
            bullets={[
              `${Math.round(cfoBaseline.yearOneRoiPercent)}% Year-1 ROI (5% Rollout)`,
              `${cfoBaseline.paybackMonths.toFixed(1)} month payback`,
              "65% detention reduction"
            ]}
            persona={["CFO"]}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                {[
                  { metric: `${Math.round(cfoBaseline.yearOneRoiPercent)}%`, label: 'Year-1 ROI (5% Rollout)', icon: <FlowArrow size={24} /> },
                  { metric: cfoBaseline.paybackMonths.toFixed(1), label: 'Month Payback', icon: <Timeline size={24} />, suffix: 'mo' },
                  { metric: '65%', label: 'Detention Reduction', icon: <Crosshair size={24} /> },
                  { metric: '70%', label: 'Gate Labor Savings', icon: <Agent size={24} /> },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-lg border border-steel/30 bg-carbon/40">
                    <div className="flex justify-center mb-3 text-neon">{item.icon}</div>
                    <p className="text-3xl font-black text-white mb-1">
                      {item.metric}{item.suffix && <span className="text-xl text-steel">{item.suffix}</span>}
                    </p>
                    <p className="text-steel/70 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg border border-neon/30 bg-gradient-to-br from-neon/10 to-transparent">
                  <h3 className="text-xl font-bold mb-4">ROI Calculator</h3>
                  <p className="text-steel/80 mb-6 text-sm">
                    Configure your facility mix. See year-1 realization. Export assumptions as PDF or JSON for finance review.
                  </p>
                  <Link
                    href="/roi"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:bg-white transition-all"
                  >
                    <Metrics size={18} />
                    Build Your Model
                  </Link>
                </div>

                <div className="p-6 rounded-lg border border-steel/30 bg-carbon/40">
                  <h3 className="text-xl font-bold mb-4">Evidence Vault</h3>
                  <p className="text-steel/80 mb-6 text-sm">
                    Security posture. Implementation timeline. Integration specs. Everything procurement needs in one place.
                  </p>
                  <Link
                    href="/security"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border border-steel/40 text-white hover:border-neon hover:text-neon transition-all"
                  >
                    <Shield size={18} />
                    View Trust Center
                  </Link>
                </div>
              </div>
            </div>
          </ExpandableCard>

          {/* Deployment Path */}
          <ExpandableCard
            id="deployment-path"
            title="Deployment Path: Crawl, Walk, Run"
            kicker="Start small. Prove value. Scale with confidence."
            bullets={[
              "POC: $15k, Week 1, Single gate lane",
              "Pilot: Custom, Day 30, Full facility",
              "Network: Enterprise, Day 90, Multi-site rollout"
            ]}
            persona={["Ops", "CFO"]}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {[
                {
                  phase: 'POC',
                  timeline: 'Week 1',
                  price: '$15k',
                  scope: 'Single gate lane',
                  outcome: 'Prove timestamp accuracy',
                },
                {
                  phase: 'Pilot',
                  timeline: 'Day 30',
                  price: 'Custom',
                  scope: 'Full facility',
                  outcome: 'Measure dwell reduction',
                },
                {
                  phase: 'Network',
                  timeline: 'Day 90',
                  price: 'Enterprise',
                  scope: 'Multi-site rollout',
                  outcome: 'Unlock network effect',
                },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-lg border border-steel/30 bg-carbon/40 hover:border-neon/50 transition-all text-center">
                  <div className="w-14 h-14 rounded-full border-2 border-neon flex items-center justify-center mx-auto mb-4 font-bold text-neon text-xl">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.phase}</h3>
                  <p className="text-neon font-mono text-sm mb-4">{item.timeline} · {item.price}</p>
                  <p className="text-steel/80 mb-2">{item.scope}</p>
                  <p className="text-white font-medium">{item.outcome}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/implementation"
                className="inline-flex items-center gap-2 text-neon font-semibold hover:text-white transition-colors"
              >
                View Full Implementation Guide →
              </Link>
            </div>
          </ExpandableCard>

        </div>
      </section>

      {/* FINAL CTA (always visible) */}
      <section className="py-24 border-t border-neon/20 bg-gradient-to-b from-void to-carbon/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-ember font-mono text-sm tracking-widest mb-6 uppercase">
            Enterprise-Ready Deployment
          </p>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Ready to put your yard <span className="text-neon">in YardFlow?</span>
          </h2>
          <p className="text-xl text-steel/80 mb-10 max-w-2xl mx-auto">
            Proven economics. Defensible proof path. Enterprise deployment support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-lg font-bold text-lg bg-neon text-void hover:bg-white transition-all hover:scale-105"
            >
              <Velocity size={22} className="text-void" />
              Apply for Membership
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-5 rounded-lg font-semibold border border-steel/40 text-white hover:border-neon hover:text-neon transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* PERSONA ROUTER */}
      <section className="py-16 bg-carbon/30 border-t border-steel/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-neon font-mono text-sm tracking-widest mb-3 uppercase">Go Deeper</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Choose Your Entry Point</h2>
            <p className="text-steel/70 mt-2">Different roles need different proof paths</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/roi"
              className="group p-8 rounded-lg border-2 border-steel/30 hover:border-neon transition-all hover:shadow-lg hover:shadow-neon/20 bg-carbon/30"
            >
              <DollarSign size={40} className="text-neon mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Finance</h3>
              <p className="text-steel mb-4">Build your ROI model. Board-ready PDF in 5 minutes.</p>
              <span className="text-neon font-semibold group-hover:underline">Calculate ROI →</span>
            </Link>

            <Link
              href="/yardbuilder"
              className="group p-8 rounded-lg border-2 border-steel/30 hover:border-neon transition-all hover:shadow-lg hover:shadow-neon/20 bg-carbon/30"
            >
              <Warehouse size={40} className="text-neon mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Operations</h3>
              <p className="text-steel mb-4">Map your facility. Identify throughput bottlenecks.</p>
              <span className="text-neon font-semibold group-hover:underline">Audit Your Yard →</span>
            </Link>

            <Link
              href="/security"
              className="group p-8 rounded-lg border-2 border-steel/30 hover:border-neon transition-all hover:shadow-lg hover:shadow-neon/20 bg-carbon/30"
            >
              <Shield size={40} className="text-neon mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Security/Compliance</h3>
              <p className="text-steel mb-4">Evidence vault. Procurement-ready proof.</p>
              <span className="text-neon font-semibold group-hover:underline">View Security →</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
