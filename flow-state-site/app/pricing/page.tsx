'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import NextSteps from '@/components/NextSteps';
import { trackEvent } from '@/lib/analytics';

export default function PricingPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/';

  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-ember font-mono text-sm mb-4 tracking-wider uppercase">
            Cost to cut the network leak
          </p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Transparent <span className="neon-glow">Pricing</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl mx-auto">
            Simple, facility-based pricing. The subscription costs less than the network leak it eliminates.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-2xl font-bold mb-3 text-neon">Subscription</h2>
              <p className="text-steel mb-4">
                <span className="text-white font-semibold">$5,000-$15,000</span> per facility per year.
              </p>
              <p className="text-sm text-steel/80">
                Illustrative example: <span className="text-white">$8,000</span>/facility/year across <span className="text-white">100</span> facilities is
                ~<span className="text-white">$800k</span>/year.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  onClick={() => {
                    trackEvent('pricing_cta_click', { cta: 'get_quote' });
                    trackEvent('quote_requested', { source: 'pricing' });
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
                >
                  Get a quote
                </a>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackEvent('pricing_demo_click', { source: 'pricing', calendlyUrl });
                    trackEvent('demo_booked', { source: 'pricing', calendlyUrl });
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
                >
                  Book a demo
                </a>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-3 text-neon">Implementation</h2>
              <p className="text-steel mb-4">
                <span className="text-white font-semibold">$2,500</span> per facility (one-time).
              </p>
              <p className="text-sm text-steel/80">
                Upfront implementation is modeled per facility across the applicant network.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card>
              <h3 className="text-xl font-bold text-neon mb-3">What’s included</h3>
              <ul className="text-steel space-y-2 list-disc pl-5">
                <li>Network-wide standard check-in/out workflows</li>
                <li>Real-time ground-truth visibility for operations</li>
                <li>Operational reporting and ROI measurement</li>
                <li>Admin controls and facility onboarding tools</li>
              </ul>
              <p className="text-xs text-steel/70 mt-4">
                Contract terms and support SLAs vary by enterprise requirements.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-neon mb-3">Implementation scope</h3>
              <ul className="text-steel space-y-2 list-disc pl-5">
                <li>Facility rollout planning and enablement</li>
                <li>Configuration per facility and go-live support</li>
                <li>Process design for gate, yard, and dock teams</li>
                <li>Success metrics and executive reporting setup</li>
              </ul>
              <p className="text-xs text-steel/70 mt-4">
                Typical enterprise rollout is staged, starting with pilot sites.
              </p>
            </Card>
          </div>

          <div className="mt-10">
            <Card className="border-neon/30">
              <h3 className="text-xl font-bold text-neon mb-3">Add-ons</h3>
              <ul className="text-steel space-y-2 list-disc pl-5">
                <li>Enterprise integrations (TMS/WMS/YMS), SSO (roadmap), and custom reporting</li>
                <li>Premium support / accelerated rollout</li>
                <li>Hardware / on-site enablement (if required)</li>
              </ul>
            </Card>
          </div>

          <div className="mt-10">
            <Card>
              <h3 className="text-xl font-bold text-neon mb-3">Pricing FAQ</h3>
              <div className="space-y-4 text-steel">
                <div>
                  <p className="font-semibold text-white">Why is pricing per facility?</p>
                  <p className="text-sm text-steel/80">
                    Implementation and operational value are realized at the facility edge. Per-facility pricing keeps the model
                    transparent and aligns incentives toward full-network standardization.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-white">What contract term is assumed?</p>
                  <p className="text-sm text-steel/80">
                    Pricing is annual per facility. Enterprise terms and rollout schedules are finalized during procurement.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-white">Can we pilot before rolling out?</p>
                  <p className="text-sm text-steel/80">
                    Yes, pilots are encouraged. The ROI compounds as adoption expands across the network.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-10">
            <Card className="border-neon/30">
              <h3 className="text-xl font-bold text-neon mb-3">Why full-network adoption wins</h3>
              <p className="text-steel">
                Pricing is per facility, but operational leverage compounds across the network. Standardized check-in/out,
                shared ground-truth, and consistent execution turn each additional facility into incremental ROI.
              </p>
              <p className="text-steel mt-4">
                Run your network scenario in the ROI Calculator and adjust pricing directly in Pro Mode.
              </p>
              <div className="mt-6">
                <a
                  href="/roi"
                  onClick={() => trackEvent('pricing_cta_click', { cta: 'roi_calculator' })}
                  className="btn-neon-fill inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
                >
                  Open ROI Calculator
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <NextSteps title="Next best step" personaOverride="procurement" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
