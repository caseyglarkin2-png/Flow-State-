import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import YardBuilderHook from '@/components/YardBuilderHook';
import NetworkEffectModel from '@/components/NetworkEffectModel';
import YardTaxSection from '@/components/YardTaxSection';
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

      {/* ═══════════════════════════════════════════════════════════════
          HERO: THE SILO TRAP
          Lead with the category problem, not the product solution
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24">
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
            YardFlow is a <span className="text-neon font-semibold">Yard Network System (YNS)</span> — 
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
              Calculate Your Network Tax
            </Link>
            <Link
              href="/yns"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold border-2 border-neon text-neon hover:bg-neon hover:text-void transition-all"
            >
              YMS vs YNS: See the Difference
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-steel/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-neon rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PERSONA ROUTER - ABOVE FOLD
          Direct path based on role
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-void border-b border-steel/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-neon font-mono text-sm tracking-widest mb-3 uppercase">Choose Your Path</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">What's Your Role?</h2>
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
          SOCIAL PROOF - AGGREGATE METRICS
          Enterprise credibility without naming customers
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-carbon/30 border-b border-steel/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-black text-neon">200+</p>
              <p className="text-steel text-sm mt-1">Facilities modeled</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">{Math.round(cfoBaseline.yearOneRoiPercent)}%</p>
              <p className="text-steel text-sm mt-1">ROI (modeled, enterprise scale)</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">50%</p>
              <p className="text-steel text-sm mt-1">Dwell time reduction</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-white">8 weeks</p>
              <p className="text-steel text-sm mt-1">Avg. time to production</p>
            </div>
          </div>
          <p className="text-center text-steel/50 text-xs mt-6">Metrics based on Primo/Singularity simulations and validated ROI models. Individual results vary.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE YARD TAX: HIDDEN COST INVENTORY
          Make the invisible visible before offering the solution
      ═══════════════════════════════════════════════════════════════ */}
      <YardTaxSection />

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
          THE REVEAL: WHY THE YARD TAX EXISTS
          The root cause is instrumentation, not effort
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-ember font-mono text-sm tracking-widest mb-4 uppercase">
                Why the Yard Tax Exists
              </p>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                You can't cut costs you can't see.
                <br />
                <span className="text-neon">YardFlow by FreightRoll makes the invisible auditable.</span>
              </h2>
              <p className="text-lg text-steel/90 mb-6 leading-relaxed">
                The yard tax persists because legacy systems record what happened after the fact, 
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
              Stop the Yard Tax at One Site. <span className="text-neon">Then Watch It Compound.</span>
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
              <Card key={i} hover className="p-8">
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
              </Card>
            ))}
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
          FINAL CTA: APPLY FOR MEMBERSHIP
      ═══════════════════════════════════════════════════════════════ */}
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

      <Footer />
    </div>
  );
}
