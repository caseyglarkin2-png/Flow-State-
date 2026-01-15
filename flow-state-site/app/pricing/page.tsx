'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export default function PricingPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/';

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Stop the Variance Tax</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            Transparent Pricing
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            Facility-based pricing. The subscription costs less than the variance it eliminates. No hidden fees. No per-transaction charges.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="border-t border-neon/10 py-16">
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
                <a
                  href="/contact"
                  onClick={() => trackEvent('pricing_cta_click', { cta: 'get_quote' })}
                  className="inline-flex items-center justify-center rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-neon/90 transition"
                >
                  Get a Quote
                </a>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('pricing_demo_click', { source: 'pricing' })}
                  className="inline-flex items-center justify-center rounded-xl border border-neon/30 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
                >
                  Book a Demo
                </a>
              </div>
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
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">What You Get</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Full Platform. No Surprises.</h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">
            One subscription. All modules. Network-wide standardization out of the box.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Digital Guard", body: "Carrier verification, ID capture, credential validation at every gate." },
              { title: "Digital Comms", body: "Lane-level driver messaging. Read receipts. No more excuses." },
              { title: "Digital BOL", body: "Touchless documentation with forensic-grade timestamps." },
              { title: "Digital YMS", body: "Real-time yard visibility. Dwell alerts. Network intelligence." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
                <div className="text-sm font-semibold text-white mb-2">{item.title}</div>
                <p className="text-xs text-steel leading-relaxed">{item.body}</p>
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
