import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowArrow, Velocity, Shield } from '@/components/icons/FlowIcons';
import Card from '@/components/Card';
import LeadForm from '@/components/LeadForm';
import NextSteps from '@/components/NextSteps';

export const metadata: Metadata = {
  title: 'Contact | YardFlow by FreightRoll',
  description: 'Book a demo, apply for Founding Membership, or get a tailored quote for your yard automation needs.',
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
    <main className="min-h-screen bg-void pt-32 pb-24">
      {/* Hero */}
      <section className="pb-16 border-b border-neon/20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            {isQualify ? (
              <>
                Qualify for <span className="neon-glow">Founding Membership</span>
              </>
            ) : (
              <>
                Contact <span className="neon-glow">YardFlow by FreightRoll</span>
              </>
            )}
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            {isQualify
              ? 'Join the network-first revolution. Submit your details and we\'ll evaluate your network for Founding Member status.'
              : 'For Founding Member applicants and enterprise networks. Book a demo or request a tailored quote.'}
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Demo Booking */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center">
                  <Velocity size={20} className="text-neon" />
                </div>
                <h2 className="text-2xl font-bold">Book a Demo</h2>
              </div>
              <p className="text-steel mb-6">
                Prefer a live walkthrough? Book a time and we&apos;ll tailor the demo to your network.
              </p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all gap-2"
              >
                <FlowArrow size={16} /> Book a Demo
              </a>
              <p className="text-xs text-steel/70 mt-4">
                If you&apos;re behind a firewall, email{' '}
                <a className="text-neon hover:underline" href="mailto:casey@freightroll.com">
                  casey@freightroll.com
                </a>
                .
              </p>
            </Card>

            {/* Lead Form */}
            <Card>
              <LeadForm
                leadType={isQualify ? 'founding' : 'quote'}
                title={isQualify ? 'Apply for Founding Membership' : 'Get a Quote'}
                subtitle={
                  isQualify
                    ? 'Tell us about your multi-facility network and we\'ll assess your fit.'
                    : 'Tell us your network size and we\'ll respond with a tailored plan and ROI view.'
                }
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 border-t border-neon/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <Shield size={28} className="text-neon mx-auto mb-3" />
              <h3 className="font-semibold mb-1">SOC 2 Type II</h3>
              <p className="text-sm text-steel">Roadmap 2026 – Enterprise security controls</p>
            </div>
            <div className="p-6">
              <div className="text-2xl font-bold text-neon mb-1">48hr</div>
              <h3 className="font-semibold mb-1">Response Time</h3>
              <p className="text-sm text-steel">Typical reply for qualified inquiries</p>
            </div>
            <div className="p-6">
              <div className="text-2xl font-bold text-neon mb-1">90-day</div>
              <h3 className="font-semibold mb-1">Pilot Programs</h3>
              <p className="text-sm text-steel">Proof of value before commitment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <NextSteps title="What Happens Next" />
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
  );
}
