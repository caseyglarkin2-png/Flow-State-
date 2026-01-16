/**
 * Co-Development Program Page
 * 
 * HIGH-CONVERTING CONVERSION PAGE
 * Target: Multi-site operators willing to pilot and co-develop advanced features
 * Outcome: Book Network Audit call or apply for co-dev program
 */

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAGroup from '@/components/CTAGroup';
import Card from '@/components/Card';
import { BRAND } from '@/config/brand';
import { 
  Ignite, 
  Cortex, 
  Agent, 
  Velocity, 
  Timeline, 
  Confirm,
  Shield,
  FlowArrow
} from '@/components/icons/FlowIcons';

export const metadata = {
  title: 'Co-Development Program | YardFlow by FreightRoll',
  description: 'Build the Yard Network System with us. Multi-site operators: get roadmap influence, priority onboarding, and co-developed features.',
};

export default function CoDevelopmentPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/30 mb-6">
            <Ignite size={16} className="text-neon" />
            <span className="text-neon text-sm font-semibold font-mono">LIMITED SEATS</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Co-Development Program
          </h1>
          <p className="text-2xl text-steel/90 max-w-3xl leading-relaxed">
            Build the Yard Network System with us. Get roadmap influence, priority onboarding, and features tailored to your operational reality.
          </p>
          
          <div className="mt-10">
            <CTAGroup showTertiary={false} />
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-carbon/30 border-b border-steel/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-3 text-center">Who This Is For</h2>
          <p className="text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            Multi-site operators with complex problems that require more than base deployment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <Agent size={32} className="text-neon mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Multi-Site Operators</h3>
              <ul className="space-y-2 text-steel/90 text-sm">
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span>10+ facilities (ideally 20–50 sites)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span>Mix of complex modes (reefer, flatbed, intermodal)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span>High-volume yards (100+ trucks/day per site)</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <Cortex size={32} className="text-neon mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Operational Champions</h3>
              <ul className="space-y-2 text-steel/90 text-sm">
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span>VP/SVP Operations with exec sponsorship</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span>Willing to pilot at 1–2 sites quickly</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span>Can commit ops + IT resources for integration</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <Velocity size={32} className="text-neon mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Real Problems</h3>
              <ul className="space-y-2 text-steel/90 text-sm">
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span>Dwell {'>'}60 min causing detention hemorrhage</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span>Yard capacity constraints blocking growth</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span>No unified view across facilities</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Co-Develop */}
      <section className="py-20 border-b border-steel/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-3 text-center">What We Co-Develop</h2>
          <p className="text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            Beyond base deployment: advanced features built alongside your operational reality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-neon/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-neon/10 flex-shrink-0">
                  <Agent size={24} className="text-neon" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Automated Entry/Exit Recognition</h3>
                  <p className="text-steel/90 mb-4">
                    Machine vision for license plate + truck ID recognition. Eliminate manual check-in. Instant authentication + yard access control.
                  </p>
                  <p className="text-neon text-sm font-semibold">POC: 4–6 weeks | Scale: 12 weeks</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-neon/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-neon/10 flex-shrink-0">
                  <Velocity size={24} className="text-neon" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Vision-Based RTLS</h3>
                  <p className="text-steel/90 mb-4">
                    Passive trailer location tracking using cameras + ML. No GPS tags. Real-time yard map without hardware per trailer.
                  </p>
                  <p className="text-neon text-sm font-semibold">POC: 6–8 weeks | Scale: 16 weeks</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-neon/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-neon/10 flex-shrink-0">
                  <Cortex size={24} className="text-neon" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">AI-Enabled Yard Orchestration</h3>
                  <p className="text-steel/90 mb-4">
                    Predictive dock assignment, dwell anomaly alerts, auto-rescheduling. System suggests what should happen next based on real-time state.
                  </p>
                  <p className="text-neon text-sm font-semibold">POC: 8–10 weeks | Scale: 20 weeks</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-neon/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-neon/10 flex-shrink-0">
                  <Ignite size={24} className="text-neon" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Discovery Workshop</h3>
                  <p className="text-steel/90 mb-4">
                    Your yard has unique permutations we haven't seen yet. We document, scope, and co-develop. You get a productized feature. We get a reusable module.
                  </p>
                  <p className="text-neon text-sm font-semibold">Scoping: 2 weeks | POC: TBD</p>
                </div>
              </div>
            </Card>
          </div>

          <p className="mt-8 text-center text-steel/60 text-sm max-w-3xl mx-auto">
            Co-developed features become part of the core product. You influence the roadmap. We productize the solution for the network.
          </p>
        </div>
      </section>

      {/* How It Works: 3-Phase Framework */}
      <section className="py-20 bg-gradient-to-b from-carbon/50 to-void border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-3 text-center">How It Works</h2>
          <p className="text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            Three-phase rollout: Innovation POC → Scale Pilot → Network Standardization
          </p>

          <div className="space-y-8">
            {/* Phase 1 */}
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-neon/20 border-2 border-neon flex items-center justify-center">
                    <span className="text-neon font-black text-xl">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Innovation POC (1–2 Sites)</h3>
                  <p className="text-steel/90 mb-6">
                    Parallel tracks: Deploy base platform (Track A) while co-developing advanced features (Track B) at the same site(s).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-void/50 border border-steel/20">
                      <p className="font-semibold text-neon mb-2">Track A: Base Platform</p>
                      <ul className="space-y-1 text-sm text-steel/80">
                        <li>• Digital Guard (QR check-in, driver auth)</li>
                        <li>• Digital BOL (timestamped handoffs)</li>
                        <li>• Dock scheduler + yard map</li>
                        <li>• Detention clock automation</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-void/50 border border-neon/30">
                      <p className="font-semibold text-neon mb-2">Track B: Co-Development</p>
                      <ul className="space-y-1 text-sm text-steel/80">
                        <li>• Selected advanced feature (vision RTLS, AI orchestration, etc.)</li>
                        <li>• POC deployed in parallel</li>
                        <li>• Weekly feedback loops + iteration</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-steel/60">
                    <Timeline size={14} className="inline mr-1" />
                    Duration: 8–12 weeks
                  </p>
                </div>
              </div>
            </Card>

            {/* Phase 2 */}
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-neon/20 border-2 border-neon flex items-center justify-center">
                    <span className="text-neon font-black text-xl">2</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Scale Pilot (~10–20 Sites)</h3>
                  <p className="text-steel/90 mb-4">
                    Roll out proven POC features across pilot cluster. Refine integrations, train ops teams, validate ROI at scale.
                  </p>
                  <ul className="space-y-2 text-steel/90 text-sm">
                    <li className="flex items-start gap-2">
                      <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                      <span>Base platform standardized across all sites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                      <span>Co-developed features productized and deployed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                      <span>Network-level visibility + benchmarking enabled</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-steel/60">
                    <Timeline size={14} className="inline mr-1" />
                    Duration: 16–24 weeks
                  </p>
                </div>
              </div>
            </Card>

            {/* Phase 3 */}
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-neon/20 border-2 border-neon flex items-center justify-center">
                    <span className="text-neon font-black text-xl">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Network Standardization (Full Rollout)</h3>
                  <p className="text-steel/90 mb-4">
                    Remaining facilities onboarded. Full network effect unlocked: cross-site benchmarking, predictive alerts, singularity map.
                  </p>
                  <ul className="space-y-2 text-steel/90 text-sm">
                    <li className="flex items-start gap-2">
                      <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                      <span>Every yard on the same protocol (Standardization Band)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                      <span>Executive dashboard: network-level KPIs + bottleneck detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                      <span>Board-ready artifacts: ROI reports, compliance documentation</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-steel/60">
                    <Timeline size={14} className="inline mr-1" />
                    Duration: Ongoing (12–24 months for full network)
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 p-6 rounded-lg bg-neon/5 border border-neon/30">
            <p className="text-steel/90 text-center">
              <span className="text-white font-semibold">Directional timeline.</span> Actual duration depends on site count, integration complexity, and operational readiness.
            </p>
          </div>
        </div>
      </section>

      {/* What Partners Get */}
      <section className="py-20 border-b border-steel/20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-3 text-center">What Co-Development Partners Get</h2>
          <p className="text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            Roadmap influence, priority access, and partner economics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <Shield size={28} className="text-neon mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Roadmap Influence</h3>
              <p className="text-steel/90 text-sm">
                Co-developed features become part of the core product. Your operational needs drive what we build next.
              </p>
            </Card>

            <Card className="p-6">
              <Velocity size={28} className="text-neon mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Priority Onboarding</h3>
              <p className="text-steel/90 text-sm">
                Dedicated onboarding team. Weekly syncs. Direct access to product + engineering.
              </p>
            </Card>

            <Card className="p-6">
              <Cortex size={28} className="text-neon mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Partner Economics</h3>
              <p className="text-steel/90 text-sm">
                Pricing and terms discussed during Network Audit call. Co-development partners get favorable economics for early commitment.
              </p>
            </Card>

            <Card className="p-6">
              <Agent size={28} className="text-neon mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Board-Ready Artifacts</h3>
              <p className="text-steel/90 text-sm">
                ROI reports, executive dashboards, compliance documentation. Make the business case internally with data-backed proof.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-carbon/30 border-b border-steel/20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: "What if the POC doesn't work?",
                a: "POCs are scoped for fast validation. If a feature doesn't deliver expected outcomes, we pivot or pause. Base platform deployment continues regardless. No sunk cost."
              },
              {
                q: "How do we scope the pilot?",
                a: "Network Audit call identifies 1–2 high-impact sites for Phase 1 POC. We prioritize sites with clean data, exec sponsorship, and measurable baseline KPIs (dwell, detention, throughput)."
              },
              {
                q: "What integrations are required?",
                a: "Minimum: TMS/WMS for appointment data. Ideal: gate system, dock scheduling, carrier database. We handle integration via API or file-based sync. IT resources needed for auth + firewall config."
              },
              {
                q: "Security review process?",
                a: "SOC 2 Type II in progress (Q2 2026 target). Pen test reports available under NDA. Security questionnaire support included. We work with your InfoSec team pre-deployment."
              },
              {
                q: "Timeline to first ROI?",
                a: "Base platform ROI typically visible within 30–60 days post-deployment: reduced dwell, detention recovery, gate labor savings. Co-developed features have longer validation cycles (12–16 weeks)."
              },
              {
                q: "Can we pilot at just one site?",
                a: "Yes, but network effect requires multi-site deployment. Single-site POC validates tech + ROI; 10+ sites unlock cross-site benchmarking and executive dashboards."
              },
            ].map((faq, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-lg font-bold text-neon mb-3">{faq.q}</h3>
                <p className="text-steel/90 text-sm leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-void to-carbon/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Build the Network?
          </h2>
          <p className="text-xl text-steel/90 mb-10 max-w-2xl mx-auto">
            Book a Network Audit call. We'll identify 1–2 pilot sites, scope co-development opportunities, and outline a rollout plan.
          </p>

          <CTAGroup showTertiary={true} className="justify-center" />

          <div className="mt-12 p-6 rounded-lg bg-neon/5 border border-neon/20">
            <p className="text-sm text-steel/80 mb-3 font-semibold">What happens next:</p>
            <ul className="text-sm text-steel/70 space-y-2 text-left max-w-xl mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-neon font-mono">1.</span>
                <span>48-hour response: We review your network size, modes, and operational complexity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon font-mono">2.</span>
                <span>Intro call: 30-min discovery (ops lead + exec sponsor recommended)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon font-mono">3.</span>
                <span>Network Audit: We visit 1–2 pilot sites, document workflows, baseline KPIs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon font-mono">4.</span>
                <span>Rollout Plan + Proposal: Scoped POC, timeline, pricing, co-development roadmap</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
