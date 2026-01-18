'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { MODULES, type ModuleId, ICON_SIZES } from '@/lib/modules';
import { PRIMARY_CTA, SECONDARY_CTA, FOUNDING_MEMBER } from '@/lib/cta';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">One Suite. No À La Carte.</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            One Price. Full Platform.
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            YardFlow bundles all four modules: Digital Guard, Digital Comms, Digital BOL, and Digital YMS. No picking modules à la carte. Standardization only works when <span className="text-white font-semibold">all four sources of variance are controlled simultaneously.</span> Transparent per-facility pricing. No hidden fees. No per-transaction charges.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-8">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Annual Subscription</p>
              <h2 className="text-3xl font-bold text-white mb-2">$5,000–$15,000</h2>
              <p className="text-steel mb-6">Per facility per year. Price depends on volume, complexity, and network size.</p>
              <div className="rounded-lg border border-neon/10 bg-carbon/30 p-4 mb-6">
                <p className="text-sm text-steel">
                  Example: <span className="text-white font-semibold">$8,000</span>/facility × <span className="text-white font-semibold">100</span> facilities = <span className="text-neon font-semibold">$800K</span>/year
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={PRIMARY_CTA.href}
                  onClick={() => trackEvent('pricing_cta_click', { cta: 'apply_access' })}
                  className="inline-flex items-center justify-center rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-neon/90 transition"
                >
                  {PRIMARY_CTA.label}
                </Link>
                <Link
                  href={SECONDARY_CTA.href}
                  onClick={() => trackEvent('pricing_cta_click', { cta: 'run_roi' })}
                  className="inline-flex items-center justify-center rounded-xl border border-neon/30 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
                >
                  {SECONDARY_CTA.label}
                </Link>
              </div>
              <p className="mt-3 text-xs text-steel/70">{PRIMARY_CTA.microcopy}</p>
            </div>

            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-8">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Implementation</p>
              <h2 className="text-3xl font-bold text-white mb-2">$2,500</h2>
              <p className="text-steel mb-6">Per facility (one-time). Includes rollout planning, configuration, and go-live support.</p>
              <p className="text-[15px] text-steel leading-relaxed">
                No surprises. Flat rate per site. Scales with your network. Typical enterprise rollout is staged, starting with pilot sites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-carbon/20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Variance Control Framework</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Four Sources of Variance. One Integrated Price.</h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">
            Picking modules à la carte creates operational gaps. Guard without Comms = no coordinated flow. Comms without BOL = disputes. BOL without YMS = no learning. All four deploy together to standardize your yard network. No modular pricing. No upsell trap.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                variance: 'Identity Variance',
                module: 'Digital Guard',
                benefit: 'Verified check-in. Secure gate access. No fraudulent carriers.',
              },
              {
                variance: 'Instruction Variance',
                module: 'Digital Comms',
                benefit: 'Read receipts. Coordinated dock flow. No radio chaos.',
              },
              {
                variance: 'Condition Variance',
                module: 'Digital BOL',
                benefit: 'Cryptographic proof. Zero disputes. Court-admissible evidence.',
              },
              {
                variance: 'Positioning Variance',
                module: 'Digital YMS',
                benefit: 'Real-time visibility. Predictable dwell. Network intelligence.',
              },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-neon/20 bg-carbon/50 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-ember/70 font-semibold mb-2">{item.variance}</p>
                <p className="text-sm font-semibold text-neon mb-3">{item.module}</p>
                <p className="text-xs text-steel leading-relaxed">{item.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Scope */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Turnkey Deployment</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Implementation Scope</h2>
              <p className="mt-4 text-[17px] text-steel leading-8 mb-6">
                We don't hand you software and walk away. We deploy, configure, train, and measure.
              </p>
              <ul className="space-y-3 text-steel">
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>Facility rollout planning and enablement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>Configuration per facility and go-live support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>Process design for gate, yard, and dock teams</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>Success metrics and executive reporting setup</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>Training and change management</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-neon/20 bg-neon/5 p-6">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Add-Ons Available</p>
              <h3 className="text-xl font-bold text-white mb-4">Enterprise Extras</h3>
              <ul className="space-y-2 text-steel text-[15px]">
                <li>• TMS/WMS integrations (API or file-based)</li>
                <li>• SSO and enterprise auth (roadmap)</li>
                <li>• Custom reporting and dashboards</li>
                <li>• Premium support / accelerated rollout</li>
                <li>• Hardware / on-site enablement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-carbon/20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Common Questions</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white mb-10">Pricing FAQ</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <p className="font-semibold text-white mb-2">Why is pricing per facility?</p>
              <p className="text-sm text-steel leading-relaxed">
                Implementation and operational value are realized at the facility edge. Per-facility pricing keeps the model transparent and aligns incentives toward full-network standardization.
              </p>
            </div>
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <p className="font-semibold text-white mb-2">What contract term is assumed?</p>
              <p className="text-sm text-steel leading-relaxed">
                Pricing is annual per facility. Enterprise terms and rollout schedules are finalized during procurement.
              </p>
            </div>
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <p className="font-semibold text-white mb-2">Can we pilot before rolling out?</p>
              <p className="text-sm text-steel leading-relaxed">
                Yes, pilots are encouraged. The ROI compounds as adoption expands across the network. Start with 2-3 sites, prove the math, then scale.
              </p>
            </div>
            <div className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
              <p className="font-semibold text-white mb-2">Why does full-network adoption win?</p>
              <p className="text-sm text-steel leading-relaxed">
                Pricing is per facility, but operational leverage compounds across the network. Standardized execution turns each additional facility into incremental ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Development Economics */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Advanced Features</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white mb-4">Co-Development Pricing</h2>
          <p className="text-[17px] text-steel leading-8 max-w-3xl mb-10">
            Multi-site operators with &gt;50 facilities can co-develop custom features with us. Build advanced capabilities tailored to your workflows, influence our roadmap, and deploy ahead of the market.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-neon/20 bg-gradient-to-br from-neon/5 to-ember/5 p-8">
              <div className="flex items-start gap-3 mb-6">
                <div className="rounded-lg bg-neon/10 p-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Partner Pricing Framework</h3>
                  <p className="text-steel text-sm leading-relaxed">
                    Co-development partners get custom features built to their workflow in exchange for strategic partnership: committed network rollout, early adoption, and co-marketing rights.
                  </p>
                </div>
              </div>
              <ul className="space-y-3 text-steel text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>No upfront development fees for qualified partners</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>Standard per-facility pricing applies across your network</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>Custom features deployed to your facilities first</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1">→</span>
                  <span>IP ownership: YardFlow retains platform rights, you own operational know-how</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-8">
              <h3 className="text-xl font-bold text-white mb-4">What Gets Co-Developed</h3>
              <ul className="space-y-3 text-steel text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1 font-bold">•</span>
                  <span><strong className="text-white">Vision RTLS:</strong> Real-time trailer tracking via camera infrastructure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1 font-bold">•</span>
                  <span><strong className="text-white">AI Orchestration:</strong> Dock scheduling, dwell prediction, load sequencing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1 font-bold">•</span>
                  <span><strong className="text-white">Mode-Specific Automation:</strong> Reefer temp tracking, flatbed securement vision, intermodal choreography</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1 font-bold">•</span>
                  <span><strong className="text-white">Custom Integrations:</strong> Proprietary WMS/TMS/ERP connectors, legacy system bridges</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neon mt-1 font-bold">•</span>
                  <span><strong className="text-white">Network Analytics:</strong> Cross-facility insights, dwell benchmarking, predictive alerts</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-neon/10">
                <Link
                  href="/co-development"
                  className="inline-flex items-center gap-2 text-neon hover:text-white transition font-medium"
                >
                  Learn More About Co-Development →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Next Step</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Model Your Network ROI
          </h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl">
            Run your scenario in the ROI Calculator. Adjust facilities, volume, and assumptions. See the payback.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/roi"
              onClick={() => trackEvent('pricing_cta_click', { cta: 'roi_calculator' })}
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-neon/90 transition"
            >
              Open ROI Calculator
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
            >
              Get Your Network Rollout Plan
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
