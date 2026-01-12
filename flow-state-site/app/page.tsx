import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { ExpandableCard } from '@/components/ExpandableCard';
import YardBuilderHook from '@/components/YardBuilderHook';
import NetworkEffectModel from '@/components/NetworkEffectModel';
import YardLeakSection from '@/components/YardLeakSection';
import StickyCTABar from '@/components/StickyCTABar';
import { calcRoiV2, getRoiV2InputsForPreset } from '@/lib/economics';
import { X, Check, DollarSign, Warehouse } from 'lucide-react';
import {
  Agent,
  Cortex,
  Ignite,
  Shield,
  Manifest,
  FlowArrow,
  Metrics,
  Velocity,
  Timeline,
  Crosshair,
} from '@/components/icons/FlowIcons';

export default function Home() {
  // Match ROI calculator defaults: 50 facilities, 5% Year-1 rollout ramp
  // This ensures homepage KPIs match what users see when they click "Build Your Model"
  const cfoBaseline = calcRoiV2({
    ...getRoiV2InputsForPreset('enterprise_50', 'expected'),
    yearOneRampShare: 0.05,
  });

  const dollarsPerFacility = (annual: number) => {
    const per = cfoBaseline.totalFacilities > 0 ? annual / cfoBaseline.totalFacilities : 0;
    return `$${Math.round(per).toLocaleString()}/site (modeled)`;
  };

  return (
    <div className="min-h-screen bg-void">
      <Header />
      <StickyCTABar ctaText="Get Your Network Rollout Plan" ctaUrl="/contact" />

      {/* ═══════════════════════════════════════════════════════════════
          HERO: THE SILO TRAP
          Lead with the category problem, not the product solution
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-neon font-mono text-sm tracking-widest mb-6 uppercase">
            Yard Network System
          </p>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95]">
            <span className="text-white">You don't have 50 yards.</span>
            <br />
            <span className="text-neon drop-shadow-[0_0_30px_rgba(0,180,255,0.5)] mt-4 block">
              You have one network.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-steel/90 mb-6 max-w-3xl mx-auto leading-relaxed">
            Site-by-site yard systems are the hidden tax on your logistics margin. YardFlow is a Yard Network System: one control plane, standardized protocols, network intelligence. Deploy fast. See ROI in weeks, not quarters.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10 text-left">
            <div className="p-4 rounded-lg border border-steel/30 bg-carbon/40">
              <p className="text-neon font-bold text-2xl mb-1">70%</p>
              <p className="text-steel/80 text-sm">Gate labor reduction (automated carrier verification)</p>
            </div>
            <div className="p-4 rounded-lg border border-steel/30 bg-carbon/40">
              <p className="text-neon font-bold text-2xl mb-1">{Math.round(cfoBaseline.yearOneRoiPercent)}%</p>
              <p className="text-steel/80 text-sm">Year-1 ROI on 5% network rollout (modeled)</p>
            </div>
            <div className="p-4 rounded-lg border border-steel/30 bg-carbon/40">
              <p className="text-neon font-bold text-2xl mb-1">8 weeks</p>
              <p className="text-steel/80 text-sm">Avg deployment per facility (standardized playbooks)</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all hover:scale-105"
            >
              Get Your Network Rollout Plan
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold border-2 border-steel/40 text-steel hover:border-neon hover:text-neon transition-all"
            >
              Run ROI in 3 Minutes
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          NARRATIVE BRIDGE: VISCOSITY → LEAK → YNS
          Connect the physics, the economics, and the solution
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 border-b border-neon/20 bg-gradient-to-b from-void to-carbon/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              Category Invention
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
              YNS vs YMS: Why "yard management" doesn't scale
            </h2>
            <p className="text-lg text-steel/80 max-w-3xl mx-auto">
              Traditional YMS treats each facility as an island. YNS orchestrates the network. That's the category. One application. One dataset. Network-wide intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* YNS - The Category */}
            <div className="p-6 rounded-lg border border-neon/50 bg-gradient-to-br from-neon/10 to-transparent hover:border-neon/70 transition-all">
              <div className="text-neon mb-4">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Yard Network System</h3>
              <p className="text-steel/80 text-sm mb-3 leading-relaxed">
                <span className="text-neon font-semibold">The category solution.</span> Instrumentation that makes the yard 
                visible in real-time. Network intelligence that learns across sites. 
                Orchestration that eliminates friction before it becomes a leak.
              </p>
              <p className="text-neon text-xs font-semibold">
                One control plane. Network-wide intelligence.
              </p>
            </div>

            {/* Viscosity - The Physics */}
            <div className="p-6 rounded-lg border border-steel/30 bg-carbon/40 hover:border-steel/50 transition-all">
              <div className="text-steel/60 mb-4">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M2 12h20M6 6l12 12M6 18L18 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Network Friction</h3>
              <p className="text-steel/80 text-sm mb-3 leading-relaxed">
                <span className="text-steel/60 font-semibold">The physics perspective.</span> Friction at every handoff. 
                Trailers waiting for dock assignments. Drivers circling for gatehouse approval. 
                Information siloed across facilities.
              </p>
              <p className="text-steel/60 text-xs">
                High viscosity = slow flow = throughput bottlenecks
              </p>
            </div>

            {/* Network Leak - The Economics */}
            <div className="p-6 rounded-lg border border-ember/50 bg-gradient-to-br from-ember/10 to-transparent hover:border-ember/70 transition-all">
              <div className="text-ember mb-4">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hidden Yard Tax</h3>
              <p className="text-steel/80 text-sm mb-3 leading-relaxed">
                <span className="text-ember font-semibold">The economics perspective.</span> Detention fees you shouldn't pay. 
                Expedite charges for preventable delays. Overtime because you can't predict arrivals. 
                Working capital tied up "just in case."
              </p>
              <p className="text-ember text-xs font-semibold">
                Network friction → margin leak (8 cost categories)
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/yns"
              className="inline-flex items-center gap-2 text-neon hover:underline font-semibold text-lg"
            >
              See the full YNS framework →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          YMS vs YNS COMPARISON
          Make the category distinction clear
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 border-b border-steel/20 bg-carbon/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              Full Comparison
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
              What changes when you shift from site-by-site to network-level
            </h2>
            <p className="text-lg text-steel/80 max-w-3xl mx-auto">
              YMS was built for single facilities. YNS was built for networks. Every capability differs.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-steel/30 bg-void">
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

          <div className="mt-8 p-6 rounded-lg border border-neon/30 bg-gradient-to-r from-neon/5 to-transparent">
            <p className="text-white font-semibold mb-2">The Network Effect</p>
            <p className="text-steel/80 text-sm leading-relaxed">
              Site 1 gives you local efficiency. Site 2 adds benchmarking. Site 5+ unlocks pattern recognition. 
              Site 10+ creates a learning flywheel where each new facility makes the entire network smarter. 
              <Link href="/network-effect" className="text-neon hover:underline ml-1">
                See the math →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE LEAK: HIDDEN COST INVENTORY
          Make the invisible visible before offering the solution
      ═══════════════════════════════════════════════════════════════ */}
      <YardLeakSection />

      {/* ═══════════════════════════════════════════════════════════════
          SOCIAL PROOF - AGGREGATE METRICS
          Enterprise credibility without naming customers
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-carbon/30 border-b border-steel/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-black text-neon">70%</p>
              <p className="text-steel text-sm mt-1">Gate labor reduction</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">65%</p>
              <p className="text-steel text-sm mt-1">Detention recovery rate</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">50%</p>
              <p className="text-steel text-sm mt-1">Dwell time reduction (48 min → 24 min avg)</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">8 weeks</p>
              <p className="text-steel text-sm mt-1">Avg deployment per facility</p>
            </div>
          </div>
          <p className="text-center text-steel/50 text-xs mt-6">Metrics based on Primo/Singularity simulations and validated ROI models. Individual results vary.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PERSONA ROUTER - AFTER PAIN IS ESTABLISHED
          Direct path based on role (for those ready to dive deeper)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-void border-b border-steel/20">
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

      {/* ═══════════════════════════════════════════════════════════════
          YARDBUILDER: FROM DIAGNOSIS TO ACTION
          "Now that you see the cost, map your specific facility"
      ═══════════════════════════════════════════════════════════════ */}
      <section id="yardbuilder" className="py-20 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              From Diagnosis to Action
            </p>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              See the Leak. <span className="text-neon">Fix the Leak.</span>
            </h2>
            <p className="text-xl text-steel/80 max-w-2xl mx-auto">
              Enter any facility address. Get a board-ready yard report showing exactly 
              where the margin is hiding, and how to recover it.
            </p>
          </div>

          <YardBuilderHook />

          <div className="mt-8 text-center">
            <p className="text-steel/60 text-sm">
              ↓ See why the yard is the last black hole in logistics
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE REVEAL: WHY THE LEAK EXISTS
          The root cause is instrumentation, not effort
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-ember font-mono text-sm tracking-widest mb-4 uppercase">
                Why the Leak Exists
              </p>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                You can't cut costs you can't see.
                <br />
                <span className="text-neon">YardFlow by FreightRoll makes the invisible auditable.</span>
              </h2>
              <p className="text-lg text-steel/90 mb-6 leading-relaxed">
                The leak persists because legacy systems record what happened after the fact, 
                based on what someone typed in. No defensible timestamps. No exception capture. No accountability.
              </p>
              <p className="text-lg text-steel/90 mb-8 leading-relaxed">
                YardFlow by FreightRoll establishes <span className="text-neon font-semibold">Ground Source Truth</span>: 
                defensible timestamps from the physical yard that replace reported data with reality.
              </p>

              <div className="space-y-4">
                {[
                  { before: 'Reported arrival', after: 'Gate camera timestamp', delta: '±47 min variance eliminated' },
                  { before: 'Estimated dwell', after: 'Actual spot-to-dock', delta: '48 min → 24 min avg' },
                  { before: 'Guessed detention', after: 'Auditable proof', delta: 'Detention recovery (modeled)' },
                ].map((row, i) => (
                  <div key={i} className="glass-card p-4 flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-steel/60 text-sm line-through">{row.before}</p>
                      <p className="text-white font-medium">{row.after}</p>
                    </div>
                    <div className="text-neon font-mono text-sm font-bold">{row.delta}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maturity Ladder */}
            <div className="space-y-3">
              <p className="text-steel/60 text-sm font-mono mb-4">YARD MATURITY LADDER</p>
              {[
                { level: 1, name: 'Chaos', color: '#FF2A00', desc: 'Clipboards. Radios. Hope.', active: false },
                { level: 2, name: 'Management', color: '#FFB800', desc: 'Software records events. Reactively.', active: false },
                { level: 3, name: 'Orchestration', color: '#00B4FF', desc: 'System directs moves. Proactively.', active: true },
                { level: 4, name: 'YardFlow', color: '#00B4FF', desc: 'Network learns. Autonomously.', active: false },
              ].map((step, i) => (
                <div 
                  key={i} 
                  className={`p-5 rounded-lg flex items-center gap-5 transition-all ${
                    step.active 
                      ? 'bg-neon/10 border border-neon/40 scale-[1.02]' 
                      : 'glass-card opacity-70'
                  }`}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-void flex-shrink-0 text-lg"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.level}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-0.5">{step.name}</h3>
                    <p className="text-steel/70 text-sm">{step.desc}</p>
                  </div>
                  {step.active && (
                    <div className="ml-auto">
                      <span className="text-neon text-xs font-bold uppercase tracking-wider">You are here →</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PROOF: PRIMO BRANDS NETWORK ROLLOUT
          The "If water can flow" story
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              Proof at Scale
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              "If water can flow this fast, <span className="text-neon">anything can.</span>"
            </h2>
            <p className="text-xl text-steel/80">
              Modeled enterprise rollout example (illustrative; not a public customer claim).
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { metric: '260', label: 'Sites deployed', suffix: '' },
              { metric: '50', label: 'Turn time reduction', suffix: '%' },
              { metric: '142', label: 'Velocity gain', suffix: '%' },
              { metric: '90', label: 'Days to network', suffix: '' },
            ].map((item, i) => (
              <Card key={i} className="text-center p-6">
                <p className="text-5xl font-black text-neon mb-2">
                  {item.metric}<span className="text-3xl">{item.suffix}</span>
                </p>
                <p className="text-steel/70 text-sm">{item.label}</p>
              </Card>
            ))}
          </div>

          <div className="glass-card p-8 border border-neon/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  Read Full Case Study
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE COMPOUNDING ARGUMENT: NODE → NETWORK → LEVERAGE
          After you stop the bleeding, the savings compound
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              From Cost Recovery to Compounding Returns
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Stop the Leak at One Site. <span className="text-neon">Then Watch It Compound.</span>
            </h2>
            <p className="text-xl text-steel/80 max-w-3xl mx-auto">
              Each facility you instrument eliminates local friction. But when you connect them, 
              value compounds: standardized playbooks, faster rollouts, network-wide visibility.
            </p>
          </div>

          <NetworkEffectModel />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PRODUCT MODULES: YARDFLOW CAPABILITIES
          Quick scan for IT/Ops validation
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              YardFlow Modules
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Four Modules. <span className="text-neon">One Platform.</span>
            </h2>
            <p className="text-xl text-steel/80">
              Deploy what you need. Scale when ready.
            </p>
          </div>

          <div className="space-y-4">
            <ExpandableCard
              id="digital-guard"
              title="Digital Guard"
              kicker="Automated check-in. Driver verification in seconds. Eliminate the clipboard."
              bullets={[
                "OCR license scan + real-time carrier verification",
                "70% gate labor reduction (kiosk replaces manual guard)",
                "Sub-60 second check-in time",
                "Integrates with existing gate systems"
              ]}
            >
              <div className="space-y-4">
                <p>
                  <strong className="text-white">What it does:</strong> Digital Guard replaces manual gate processes with automated driver check-in, carrier verification, and yard access control.
                </p>
                <p>
                  Drivers scan their license at a kiosk. System cross-references against carrier database, validates credentials, and grants/denies access in under 60 seconds. No guard tower. No clipboard. No radio calls.
                </p>
                <p>
                  <strong className="text-white">Why it matters:</strong> Most facilities spend 2-3 FTE per shift managing gate operations. Digital Guard drops that to 0.5 FTE (exception handling only). The ROI is immediate and measurable.
                </p>
                <div className="mt-6">
                  <Link href="/product#digital-guard" className="text-neon font-semibold hover:text-white transition-colors">
                    Full Digital Guard Spec →
                  </Link>
                </div>
              </div>
            </ExpandableCard>

            <ExpandableCard
              id="digital-comms"
              title="Digital Comms"
              kicker="Direct driver messaging with real-time translation. Zero radio dependency."
              bullets={[
                "SMS + in-app messaging to driver phones",
                "40+ languages with auto-translation",
                "Eliminates radio/PA announcements",
                "Timestamped message delivery confirmation"
              ]}
            >
              <div className="space-y-4">
                <p>
                  <strong className="text-white">What it does:</strong> Digital Comms sends instructions directly to driver phones via SMS or YardFlow mobile app. Real-time translation for multilingual fleets.
                </p>
                <p>
                  Instead of broadcasting "Truck 1234 proceed to Door 12" over a crackling PA system (that the driver may or may not hear), you send a timestamped message with GPS coordinates. Driver acknowledges receipt. You have proof of communication.
                </p>
                <p>
                  <strong className="text-white">Why it matters:</strong> Miscommunication causes 30% of yard dwell variance. Digital Comms eliminates "I never got that message" disputes and cuts average wait time by 15-20 minutes.
                </p>
                <div className="mt-6">
                  <Link href="/product#digital-comms" className="text-neon font-semibold hover:text-white transition-colors">
                    Full Digital Comms Spec →
                  </Link>
                </div>
              </div>
            </ExpandableCard>

            <ExpandableCard
              id="digital-bol"
              title="Digital BOL"
              kicker="Touchless documentation. Timestamped chain of custody for every load."
              bullets={[
                "100% paperless BOL workflow",
                `${dollarsPerFacility(cfoBaseline.paperlessSavings)} annual savings per facility`,
                "Forensic-grade detention proof",
                "3-second BOL capture vs 5-minute paper scan"
              ]}
            >
              <div className="space-y-4">
                <p>
                  <strong className="text-white">What it does:</strong> Digital BOL replaces paper bills of lading with timestamped digital documents. Driver scans QR code, system captures load details, photos, and signatures electronically.
                </p>
                <p>
                  Every BOL has a cryptographic timestamp, GPS coordinates, and photo proof of load condition. This creates an auditable chain of custody from gate-in to gate-out. No lost paperwork. No manual data entry. No detention disputes.
                </p>
                <p>
                  <strong className="text-white">Why it matters:</strong> Paper BOLs cost $8-12 per load (labor + storage + retrieval). Digital BOL costs $0.50. At 50-100 loads/day per facility, that's {dollarsPerFacility(cfoBaseline.paperlessSavings)}/year in hard savings.
                </p>
                <div className="mt-6">
                  <Link href="/product#digital-bol" className="text-neon font-semibold hover:text-white transition-colors">
                    Full Digital BOL Spec →
                  </Link>
                </div>
              </div>
            </ExpandableCard>

            <ExpandableCard
              id="digital-yms"
              title="Digital YMS"
              kicker="Real-time asset tracking with AI-powered move recommendations."
              bullets={[
                "Live GPS tracking of every trailer",
                "AI-powered dock assignment optimization",
                "Sub-5 min average deployment time",
                "WMS/TMS integration via standard APIs"
              ]}
            >
              <div className="space-y-4">
                <p>
                  <strong className="text-white">What it does:</strong> Digital YMS orchestrates all yard moves—trailer positioning, dock assignments, driver routing—using real-time data and AI recommendations.
                </p>
                <p>
                  System knows where every trailer is, what it contains, when it arrived, and what dock it needs. AI engine optimizes dock assignments to minimize deadhead moves and maximize throughput. Average deployment time drops from 45 minutes to under 5 minutes.
                </p>
                <p>
                  <strong className="text-white">Why it matters:</strong> Most yards operate at 60-70% theoretical throughput because dock assignments are reactive, not optimized. Digital YMS lifts throughput to 85-90% without adding capacity.
                </p>
                <div className="mt-6">
                  <Link href="/product#digital-yms" className="text-neon font-semibold hover:text-white transition-colors">
                    Full Digital YMS Spec →
                  </Link>
                </div>
              </div>
            </ExpandableCard>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/product"
              className="inline-flex items-center gap-2 text-neon font-semibold hover:text-white transition-colors"
            >
              Explore Full Product →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CFO CLOSE: BOARD-READY ROI + EVIDENCE VAULT
          The "forward this in 5 minutes" section
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              For the CFO Who Demands Proof
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Board-Ready in <span className="text-neon">5 Minutes.</span>
            </h2>
            <p className="text-xl text-steel/80 max-w-2xl mx-auto">
              Auditable assumptions. Defensible projections. Export-ready for your next board deck.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { metric: `${Math.round(cfoBaseline.yearOneRoiPercent)}%`, label: 'Year‑1 ROI (5% Rollout)', icon: <FlowArrow size={24} /> },
              { metric: cfoBaseline.paybackMonths.toFixed(1), label: 'Month Payback', icon: <Timeline size={24} />, suffix: 'mo' },
              { metric: '65%', label: 'Detention Reduction', icon: <Crosshair size={24} /> },
              { metric: '70%', label: 'Gate Labor Savings', icon: <Agent size={24} /> },
            ].map((item, i) => (
              <Card key={i} className="text-center p-6">
                <div className="flex justify-center mb-3 text-neon">{item.icon}</div>
                <p className="text-4xl font-black text-white mb-1">
                  {item.metric}{item.suffix && <span className="text-2xl text-steel">{item.suffix}</span>}
                </p>
                <p className="text-steel/70 text-sm">{item.label}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 border-neon/30">
              <h3 className="text-2xl font-bold mb-4">ROI Calculator</h3>
              <p className="text-steel/80 mb-6">
                Configure your facility mix. See year-1 realization. Export assumptions as PDF or JSON for finance review.
              </p>
              <Link
                href="/roi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:bg-white transition-all"
              >
                <Metrics size={18} />
                Build Your Model
              </Link>
            </Card>

            <Card className="p-8 border-steel/30">
              <h3 className="text-2xl font-bold mb-4">Evidence Vault</h3>
              <p className="text-steel/80 mb-6">
                Security posture. Implementation timeline. Integration specs. Everything procurement needs in one place.
              </p>
              <Link
                href="/security"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border border-steel/40 text-white hover:border-neon hover:text-neon transition-all"
              >
                <Shield size={18} />
                View Trust Center
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DEPLOYMENT PATH: CRAWL → WALK → RUN
          Clear next steps for procurement
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              Deployment Path
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Crawl. Walk. <span className="text-neon">Run.</span>
            </h2>
            <p className="text-xl text-steel/80">
              Start small. Prove value. Scale with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <Card key={i} hover className="p-8 text-center">
                <div className="w-14 h-14 rounded-full border-2 border-neon flex items-center justify-center mx-auto mb-4 font-bold text-neon text-xl">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.phase}</h3>
                <p className="text-neon font-mono text-sm mb-4">{item.timeline} · {item.price}</p>
                <p className="text-steel/80 mb-2">{item.scope}</p>
                <p className="text-white font-medium">{item.outcome}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/implementation"
              className="inline-flex items-center gap-2 text-neon font-semibold hover:text-white transition-colors"
            >
              View Full Implementation Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA: ASSUME THE SALE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-neon/20 bg-gradient-to-b from-void to-carbon/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to stop managing yards and start orchestrating networks?
          </h2>
          <p className="text-xl text-steel/80 mb-10 max-w-2xl mx-auto">
            Book a call. We'll map your network, show you the rollout plan, and hand you the board-ready ROI model. 30 minutes. Zero fluff.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-lg font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all hover:scale-105"
            >
              Get Your Network Rollout Plan
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center gap-2 px-8 py-5 rounded-lg font-semibold border border-steel/40 text-steel hover:border-neon hover:text-neon transition-all"
            >
              Run ROI First
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
