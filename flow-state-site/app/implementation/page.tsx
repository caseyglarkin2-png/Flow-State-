import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { ExpandableCard } from '@/components/ExpandableCard';

export default function ImplementationPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-neon font-mono text-sm tracking-widest mb-6 uppercase">
            Implementation
          </p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Fast rollout. Repeatable playbooks.<br />
            <span className="text-neon">Yard archetypes that match your network.</span>
          </h1>
          <p className="text-xl text-steel/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            We've mapped 6 yard archetypes. Each has a different workflow + YardFlow config. You get a rollout plan that sequences deployment, resource requirements, and expected ROI curve. No cookie-cutter implementation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10 text-left">
            <div className="p-4 rounded-lg border border-steel/30 bg-carbon/40">
              <p className="text-neon font-bold text-sm mb-1">6 Archetypes</p>
              <p className="text-steel/80 text-sm">Gated/guarded, non-gated, backup-sensitive, scale-heavy, cross-dock, manufacturing</p>
            </div>
            <div className="p-4 rounded-lg border border-steel/30 bg-carbon/40">
              <p className="text-neon font-bold text-sm mb-1">3-8 weeks</p>
              <p className="text-steel/80 text-sm">Deployment per facility (depends on archetype)</p>
            </div>
            <div className="p-4 rounded-lg border border-steel/30 bg-carbon/40">
              <p className="text-neon font-bold text-sm mb-1">Standardized Playbooks</p>
              <p className="text-steel/80 text-sm">Site 40 deploys in 3 weeks vs Site 1's 8 weeks</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all"
            >
              Get Your Network Rollout Plan
            </a>
            <a
              href="#archetypes"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold border-2 border-steel/40 text-steel hover:border-neon hover:text-neon transition-all"
            >
              Download Yard Archetypes Deck
            </a>
          </div>
        </div>
      </section>

      {/* Yard Archetypes Section */}
      <section id="archetypes" className="py-20 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase text-center">
            Yard Archetypes
          </p>
          <h2 className="text-4xl font-black mb-4 text-center">Your facilities aren't identical. Your rollout shouldn't be either.</h2>
          <p className="text-xl text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            We've mapped 6 archetypes based on facility type, security posture, throughput, and workflow complexity. Each archetype has a different module prioritization, integration requirements, and deployment timeline.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Archetype 1: Gated/Guarded */}
            <ExpandableCard
              id="archetype-1"
              title="1. Gated/Guarded"
              kicker="High Security"
              defaultOpen={true}
            >
              <div className="space-y-3 text-sm">
                <p className="text-steel/80 leading-relaxed">
                  Perimeter fencing, manned gate, strict access control
                </p>
                <div>
                  <p className="text-white font-semibold mb-1">Priority Modules:</p>
                  <p className="text-steel/80">Digital Guard (full), Digital BOL</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Check-in:</p>
                  <p className="text-steel/80">Kiosk at gate</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Timeline:</p>
                  <p className="text-neon font-bold">6-8 weeks</p>
                  <p className="text-steel/60 text-xs">(security validation required)</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Examples:</p>
                  <p className="text-steel/80">Pharma distribution, high-value goods, government contracts</p>
                </div>
              </div>
            </ExpandableCard>

            {/* Archetype 2: Non-Gated */}
            <ExpandableCard
              id="archetype-2"
              title="2. Non-Gated"
              kicker="Open Access"
              defaultOpen={false}
            >
              <div className="space-y-3 text-sm">
                <p className="text-steel/80 leading-relaxed">
                  No physical gate, open yard, carrier self-service
                </p>
                <div>
                  <p className="text-white font-semibold mb-1">Priority Modules:</p>
                  <p className="text-steel/80">Geofence + mobile check-in, Digital Comms</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Check-in:</p>
                  <p className="text-steel/80">Mobile app (driver self-check-in)</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Timeline:</p>
                  <p className="text-neon font-bold">3-4 weeks</p>
                  <p className="text-steel/60 text-xs">(lighter infrastructure)</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Examples:</p>
                  <p className="text-steel/80">Regional LTL terminals, cross-dock hubs</p>
                </div>
              </div>
            </ExpandableCard>

            {/* Archetype 3: Backup-Sensitive */}
            <ExpandableCard
              id="archetype-3"
              title="3. Backup-Sensitive"
              kicker="Detention Risk"
              defaultOpen={false}
            >
              <div className="space-y-3 text-sm">
                <p className="text-steel/80 leading-relaxed">
                  High detention exposure, frequent carrier disputes
                </p>
                <div>
                  <p className="text-white font-semibold mb-1">Priority Modules:</p>
                  <p className="text-steel/80">Digital BOL (chain-of-custody proof), Digital Guard</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Check-in:</p>
                  <p className="text-steel/80">Kiosk + mobile (redundant timestamp capture)</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Timeline:</p>
                  <p className="text-neon font-bold">5-6 weeks</p>
                  <p className="text-steel/60 text-xs">(forensic-grade proof setup)</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Examples:</p>
                  <p className="text-steel/80">Food/bev distribution, time-sensitive perishables</p>
                </div>
              </div>
            </ExpandableCard>

            {/* Archetype 4: Scale-Heavy */}
            <ExpandableCard
              id="archetype-4"
              title="4. Scale-Heavy"
              kicker="High Throughput"
              defaultOpen={false}
            >
              <div className="space-y-3 text-sm">
                <p className="text-steel/80 leading-relaxed">
                  100+ daily moves, complex dock scheduling, tight turn windows
                </p>
                <div>
                  <p className="text-white font-semibold mb-1">Priority Modules:</p>
                  <p className="text-steel/80">Digital YMS (orchestration), Digital Comms</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Check-in:</p>
                  <p className="text-steel/80">Hybrid (kiosk + mobile + ALPR)</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Timeline:</p>
                  <p className="text-neon font-bold">7-8 weeks</p>
                  <p className="text-steel/60 text-xs">(AI training + dock integration)</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Examples:</p>
                  <p className="text-steel/80">Major DCs, fulfillment centers, manufacturing receiving</p>
                </div>
              </div>
            </ExpandableCard>

            {/* Archetype 5: Cross-Dock */}
            <ExpandableCard
              id="archetype-5"
              title="5. Cross-Dock"
              kicker="Fast Turns"
              defaultOpen={false}
            >
              <div className="space-y-3 text-sm">
                <p className="text-steel/80 leading-relaxed">
                  &lt;2 hour dwell target, minimal staging, tight coordination
                </p>
                <div>
                  <p className="text-white font-semibold mb-1">Priority Modules:</p>
                  <p className="text-steel/80">Digital Comms (real-time driver instructions), Digital YMS</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Check-in:</p>
                  <p className="text-steel/80">Mobile app (speed priority)</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Timeline:</p>
                  <p className="text-neon font-bold">4-5 weeks</p>
                  <p className="text-steel/60 text-xs">(real-time comms critical)</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Examples:</p>
                  <p className="text-steel/80">LTL break-bulk, transload facilities</p>
                </div>
              </div>
            </ExpandableCard>

            {/* Archetype 6: Manufacturing */}
            <ExpandableCard
              id="archetype-6"
              title="6. Manufacturing"
              kicker="Complex Workflows"
              defaultOpen={false}
            >
              <div className="space-y-3 text-sm">
                <p className="text-steel/80 leading-relaxed">
                  Just-in-time delivery, ERP integration, production scheduling dependencies
                </p>
                <div>
                  <p className="text-white font-semibold mb-1">Priority Modules:</p>
                  <p className="text-steel/80">Digital YMS (orchestration + WMS/ERP integration), Digital BOL</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Check-in:</p>
                  <p className="text-steel/80">Kiosk + ERP pre-validation</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Timeline:</p>
                  <p className="text-neon font-bold">8-10 weeks</p>
                  <p className="text-steel/60 text-xs">(custom integration work)</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Examples:</p>
                  <p className="text-steel/80">Automotive plants, assembly operations, raw material receiving</p>
                </div>
              </div>
            </ExpandableCard>
          </div>
        </div>
      </section>

      {/* Deployment Timeline Section */}
      <section className="py-20 border-b border-neon/20 bg-carbon/30">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase text-center">
            Deployment Timeline
          </p>
          <h2 className="text-4xl font-black mb-4 text-center">Crawl, walk, run: POC to full network</h2>
          <p className="text-xl text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            Typical path: POC at 1 gate lane (Week 1), Pilot at full facility (Week 4-8), Network rollout (Week 12+). Prove value small. Scale fast.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-14 h-14 rounded-full border-2 border-neon flex items-center justify-center mx-auto mb-4 font-bold text-neon text-xl">
                1
              </div>
              <h3 className="text-2xl font-bold mb-3">POC</h3>
              <div className="space-y-2 text-sm text-left">
                <div className="flex justify-between">
                  <span className="text-steel/70">Scope:</span>
                  <span className="text-white font-medium">Single gate lane</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel/70">Timeline:</span>
                  <span className="text-neon font-bold">Week 1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel/70">Investment:</span>
                  <span className="text-white font-medium">$15k</span>
                </div>
                <div className="mt-4">
                  <p className="text-steel/70 text-xs mb-1">Goal:</p>
                  <p className="text-white text-sm">Prove timestamp accuracy + carrier verification</p>
                </div>
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-14 h-14 rounded-full border-2 border-neon flex items-center justify-center mx-auto mb-4 font-bold text-neon text-xl">
                2
              </div>
              <h3 className="text-2xl font-bold mb-3">Pilot</h3>
              <div className="space-y-2 text-sm text-left">
                <div className="flex justify-between">
                  <span className="text-steel/70">Scope:</span>
                  <span className="text-white font-medium">All gate lanes + modules</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel/70">Timeline:</span>
                  <span className="text-neon font-bold">Week 4-8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel/70">Investment:</span>
                  <span className="text-white font-medium">Custom</span>
                </div>
                <div className="mt-4">
                  <p className="text-steel/70 text-xs mb-1">Goal:</p>
                  <p className="text-white text-sm">Measure dwell reduction, gate labor savings</p>
                </div>
              </div>
            </Card>

            <Card className="text-center">
              <div className="w-14 h-14 rounded-full border-2 border-neon flex items-center justify-center mx-auto mb-4 font-bold text-neon text-xl">
                3
              </div>
              <h3 className="text-2xl font-bold mb-3">Network</h3>
              <div className="space-y-2 text-sm text-left">
                <div className="flex justify-between">
                  <span className="text-steel/70">Scope:</span>
                  <span className="text-white font-medium">Multi-site (5-50+)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel/70">Timeline:</span>
                  <span className="text-neon font-bold">Week 12+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel/70">Investment:</span>
                  <span className="text-white font-medium">Enterprise</span>
                </div>
                <div className="mt-4">
                  <p className="text-steel/70 text-xs mb-1">Goal:</p>
                  <p className="text-white text-sm">Unlock network effects, compounding ROI</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-neon/20 bg-gradient-to-b from-void to-carbon/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            We map your network. You get the rollout plan. Move forward.
          </h2>
          <p className="text-xl text-steel/90 mb-12">
            Book a call. We'll audit your facilities, assign archetypes, and hand you the sequenced deployment plan. 30 minutes. Zero fluff.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all"
            >
              Get Your Network Rollout Plan
            </a>
            <a
              href="#archetypes"
              className="inline-flex items-center justify-center px-8 py-5 rounded-xl font-semibold border border-steel/40 text-steel hover:border-neon hover:text-neon transition-all"
            >
              Download Archetypes Deck
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
