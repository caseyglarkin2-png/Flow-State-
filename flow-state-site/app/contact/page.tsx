import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowArrow, Velocity, Shield } from '@/components/icons/FlowIcons';
import Card from '@/components/Card';
import LeadForm from '@/components/LeadForm';
import NextSteps from '@/components/NextSteps';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Book a Network Audit | YardFlow by FreightRoll',
  description: 'Network audit: map facilities to archetypes, scope pilot sites, and outline rollout with board-ready ROI.',
};

type Props = {
  searchParams: Promise<{ intent?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const intent = params?.intent;
  const isQualify = intent === 'qualify';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-void pt-32 pb-24">
      {/* Hero */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Network Audit</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            Book a Network Audit
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            We map your facilities to archetypes, show the deployment sequence, and hand you a board-ready ROI model. That's it.
          </p>
        </div>
      </section>

      {/* Contact Form + What Happens Next */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Lead Form */}
            <div>
              <Card>
                <LeadForm
                  leadType={isQualify ? 'founding' : 'quote'}
                  title="Book Your Network Audit"
                  subtitle="Minimal info required. We'll follow up within 24 hours."
                />
              </Card>
              <p className="text-xs text-steel/70 mt-4 text-center">
                Behind a firewall? Email{' '}
                <a className="text-neon hover:underline" href="mailto:casey@freightroll.com">
                  casey@freightroll.com
                </a>
              </p>
            </div>

            {/* What Happens Next */}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70">The Call</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white mb-6">What Happens Next</h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-neon/20 bg-carbon/50 p-4 flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon/10 flex items-center justify-center font-bold text-neon text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Network Audit (15 min)</h3>
                    <p className="text-steel text-sm leading-relaxed">
                      Facility mix. Throughput. Pain points. Each facility mapped to a yard archetype.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-neon/20 bg-carbon/50 p-4 flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon/10 flex items-center justify-center font-bold text-neon text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Rollout Plan (10 min)</h3>
                    <p className="text-steel text-sm leading-relaxed">
                      Deployment sequence. Timeline. Resource requirements. Which facilities first. Expected ROI curve.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-neon/20 bg-carbon/50 p-4 flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon/10 flex items-center justify-center font-bold text-neon text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Board-Ready ROI (5 min)</h3>
                    <p className="text-steel text-sm leading-relaxed">
                      PDF export with your assumptions. Ready for finance review. Next steps if assumptions validate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-lg border border-neon/30 bg-neon/5">
                <p className="text-white font-semibold mb-2">If you have 10+ facilities and the ROI model shows positive returns, this call is the next step.</p>
                <p className="text-steel/80 text-sm">Book it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-lg font-semibold mb-4">Other Ways to Reach Us</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="mailto:sales@freightroll.com" className="text-neon hover:underline">
              sales@freightroll.com
            </a>
            <span className="text-steel/30">|</span>
            <a href="mailto:security@freightroll.com" className="text-neon hover:underline">
              security@freightroll.com
            </a>
            <span className="text-steel/30">|</span>
            <Link href="/press" className="text-neon hover:underline">
              Press Inquiries
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
