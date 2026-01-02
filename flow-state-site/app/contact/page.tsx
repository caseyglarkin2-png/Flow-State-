'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import LeadForm from '@/components/LeadForm';
import NextSteps from '@/components/NextSteps';
import { trackEvent } from '@/lib/analytics';

export default function ContactPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/';

  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Contact <span className="neon-glow">Flow State</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            For Founding Member applicants and enterprise networks.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-2xl font-bold text-neon mb-3">Book a demo</h2>
              <p className="text-steel mb-6">
                Prefer a live walkthrough? Book a time and we’ll tailor the demo to your network.
              </p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  trackEvent('pricing_demo_click', { source: 'contact', calendlyUrl });
                  trackEvent('demo_booked', { source: 'contact', calendlyUrl });
                }}
                className="inline-flex items-center justify-center w-full px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
              >
                Book a demo
              </a>
              <p className="text-xs text-steel/70 mt-3">
                If you’re behind a firewall, email{' '}
                <a className="text-neon hover:underline" href="mailto:founding@flow-state.ai">
                  founding@flow-state.ai
                </a>
                .
              </p>
            </Card>

            <Card>
              <LeadForm
                leadType="quote"
                title="Get a quote"
                subtitle="Tell us your network size and we’ll respond with a tailored plan and ROI view."
              />
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <NextSteps title="Next best step" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
