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
  title: 'Book a Call | YardFlow by FreightRoll',
  description: '30 minutes. Network audit + rollout plan. Zero fluff.',
};

type Props = {
  searchParams: Promise<{ intent?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const intent = params?.intent;
  const isQualify = intent === 'qualify';
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-void pt-32 pb-24">
      {/* Hero */}
      <section className="pb-16 border-b border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            30 minutes. Network audit + rollout plan.
          </h1>
          <p className="text-xl text-steel/90 max-w-2xl mx-auto leading-relaxed">
            We'll map your facilities to archetypes, show you the deployment sequence, and hand you the board-ready ROI model. Zero fluff. Zero pitch. Just the plan.
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
              <h2 className="text-2xl font-bold mb-6">What Happens Next</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-neon flex items-center justify-center font-bold text-neon">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Network Audit (15 min)</h3>
                    <p className="text-steel text-sm">
                      We review your facility mix, throughput, current pain points. Map each facility to a yard archetype.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-neon flex items-center justify-center font-bold text-neon">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Rollout Plan (10 min)</h3>
                    <p className="text-steel text-sm">
                      We show you the deployment sequence, timeline, and resource requirements. Which facilities first. Which modules. Expected ROI curve.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-neon flex items-center justify-center font-bold text-neon">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Board-Ready ROI (5 min)</h3>
                    <p className="text-steel text-sm">
                      We export the ROI model with your assumptions. PDF for finance review. Next steps if assumptions validate.
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
      <section className="py-12 border-t border-neon/10">
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
