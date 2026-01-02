import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import YardBuilderHook from '@/components/YardBuilderHook';
import NetworkEffectModel from '@/components/NetworkEffectModel';
import { calcRoiV2, getRoiV2InputsForPreset } from '@/lib/economics';
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
  const cfoBaseline = calcRoiV2({
    ...getRoiV2InputsForPreset('enterprise_50', 'expected'),
    yearOneRampShare: 0.5,
  });

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* ═══════════════════════════════════════════════════════════════
          HERO 1: THE HOOK — CFO INTRIGUE IN 3 SECONDS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-neon font-mono text-sm tracking-widest mb-6 uppercase">
            The yard is the last black hole in logistics
          </p>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
            <span className="text-white">Visibility ≠ control.</span>
            <br />
            <span className="text-neon drop-shadow-[0_0_30px_rgba(0,180,255,0.5)]">
              Flow State makes the yard obey.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-steel/90 mb-4 max-w-3xl mx-auto">
            Turn every facility into an <span className="text-neon font-semibold">intelligent node</span> with 
            defensible timestamps. Watch "soft problems" become <span className="text-white font-semibold">hard savings</span>.
          </p>

          <p className="text-lg text-steel/70 mb-10 max-w-2xl mx-auto">
            260 sites. 50% faster turns. $221M network value. One platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#yardbuilder"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg bg-neon text-void hover:bg-white transition-all hover:scale-105"
            >
              <Ignite size={22} className="text-void" />
              Map Your Yard in 60 Seconds
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold border border-steel/40 text-white hover:border-neon hover:text-neon transition-all"
            >
              <Metrics size={20} />
              See Board-Ready ROI
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
          HERO 2: YARDBUILDER — IMMEDIATE AGENCY
          "Map your yard in 60 seconds" — the IKEA effect hook
      ═══════════════════════════════════════════════════════════════ */}
      <section id="yardbuilder" className="py-20 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              Project Genesis
            </p>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Your Yard. Your Numbers. <span className="text-neon">60 Seconds.</span>
            </h2>
            <p className="text-xl text-steel/80 max-w-2xl mx-auto">
              Enter an address. Get a board-ready yard report with custom ROI projections. 
              No forms. No sales call required.
            </p>
          </div>

          <YardBuilderHook />

          <div className="mt-8 text-center">
            <p className="text-steel/60 text-sm">
              ↓ Scroll to see why 200+ enterprise networks chose Flow State
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE REVEAL: GROUND SOURCE TRUTH
          Why legacy YMS fails — and what changes with instrumentation
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-ember font-mono text-sm tracking-widest mb-4 uppercase">
                The Problem Nobody Talks About
              </p>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Legacy YMS records what happened.
                <br />
                <span className="text-neon">Flow State dictates what happens next.</span>
              </h2>
              <p className="text-lg text-steel/90 mb-6 leading-relaxed">
                Most "visibility" platforms show you dots moving on a screen. They don't change gate behavior. 
                They don't reduce dwell. They don't cut detention.
              </p>
              <p className="text-lg text-steel/90 mb-8 leading-relaxed">
                Flow State establishes <span className="text-neon font-semibold">Ground Source Truth</span>: 
                defensible timestamps from the physical yard that replace reported data with reality.
              </p>

              <div className="space-y-4">
                {[
                  { before: 'Reported arrival', after: 'Gate camera timestamp', delta: '±47 min variance eliminated' },
                  { before: 'Estimated dwell', after: 'Actual spot-to-dock', delta: '48 min → 24 min avg' },
                  { before: 'Guessed detention', after: 'Auditable proof', delta: '$2.1M/yr recovered' },
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
                { level: 4, name: 'Flow State', color: '#00B4FF', desc: 'Network learns. Autonomously.', active: false },
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
              Primo Brands (Poland Spring) deployed Flow State across 260 sites in 90 days.
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
                  <li className="flex items-center gap-2"><span className="text-ember">✗</span> 48-min average dwell</li>
                  <li className="flex items-center gap-2"><span className="text-ember">✗</span> Paper BOLs, lost paperwork</li>
                  <li className="flex items-center gap-2"><span className="text-ember">✗</span> 3 FTE/site at gate</li>
                  <li className="flex items-center gap-2"><span className="text-ember">✗</span> No detention visibility</li>
                </ul>
              </div>
              <div>
                <p className="text-steel/60 text-sm font-mono mb-2">AFTER</p>
                <ul className="space-y-2 text-white">
                  <li className="flex items-center gap-2"><span className="text-neon">✓</span> 24-min average dwell</li>
                  <li className="flex items-center gap-2"><span className="text-neon">✓</span> 100% digital chain-of-custody</li>
                  <li className="flex items-center gap-2"><span className="text-neon">✓</span> 0.5 FTE/site at gate</li>
                  <li className="flex items-center gap-2"><span className="text-neon">✓</span> $2.1M/yr detention recovered</li>
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
          Interactive network effect model
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              The Network Effect
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Every Node You Add <span className="text-neon">Compounds.</span>
            </h2>
            <p className="text-xl text-steel/80 max-w-3xl mx-auto">
              Metcalfe's Law applied to yard orchestration: value grows exponentially with connected facilities. 
              Your competitors' yards become your data advantage.
            </p>
          </div>

          <NetworkEffectModel />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PRODUCT MODULES: YARDOS CAPABILITIES
          Quick scan for IT/Ops validation
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
              YardOS Modules
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
                stat: '$10k/site annual savings',
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
              { metric: `${Math.round(cfoBaseline.yearOneRoiPercent)}%`, label: 'Avg Year 1 ROI', icon: <FlowArrow size={24} /> },
              { metric: cfoBaseline.paybackMonths.toFixed(1), label: 'Month Payback', icon: <Timeline size={24} />, suffix: 'mo' },
              { metric: '65%', label: 'Detention Cut', icon: <Crosshair size={24} /> },
              { metric: '70%', label: 'Gate Labor Saved', icon: <Agent size={24} /> },
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
            Only 3 Founding Member spots remaining
          </p>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Ready to put your yard <span className="text-neon">in Flow?</span>
          </h2>
          <p className="text-xl text-steel/80 mb-10 max-w-2xl mx-auto">
            Join 200+ enterprise networks. Lock in founding rates. 
            Get dedicated implementation support.
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
