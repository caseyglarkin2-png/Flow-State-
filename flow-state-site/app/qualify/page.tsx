import type { Metadata } from 'next';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import LeadForm from '@/components/LeadForm';
import { BRAND, getBrandedTitle } from '@/config/brand';
import { Shield, DollarSign, Warehouse, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: getBrandedTitle('Qualify for Founding Membership'),
  description: 'Join the network-first revolution. Apply for Founding Member status and lock in preferential terms.',
};

interface QualifyContentProps {
  intent?: string | null;
}

const INTENT_CONFIG = {
  founding: {
    icon: Users,
    title: 'Apply for Founding Membership',
    subtitle: 'Join the network-first revolution. Limited spots for multi-facility operators.',
    bullets: [
      'Lock in founding member pricing (never increases)',
      'Priority implementation queue (30-day deployment SLA)',
      'Direct influence on roadmap priorities',
      'Quarterly executive briefings + network benchmarks',
    ],
    formTitle: 'Founding Member Application',
    formSubtitle: 'Tell us about your network and we\'ll evaluate your fit.',
    leadType: 'founding' as const,
  },
  security: {
    icon: Shield,
    title: 'Security & Compliance Assessment',
    subtitle: 'Cargo theft, fraudulent pickups, and compliance exposure assessment.',
    bullets: [
      'Threat model analysis (fraudulent carriers, ID spoofing, credential misuse)',
      'Control gap assessment (verify → authorize → record → alert → audit)',
      'CTPAT/TSA compliance roadmap',
      'ROI on theft prevention, insurance discounts, compliance cost avoidance',
    ],
    formTitle: 'Request Security Assessment',
    formSubtitle: 'Share your facility count and current security posture.',
    leadType: 'quote' as const,
  },
  roi: {
    icon: DollarSign,
    title: 'Executive ROI Review',
    subtitle: 'Board-ready economics model and 5-year value projection.',
    bullets: [
      'Custom ROI model based on your facility count and throughput',
      'Detention recovery analysis (defensible timestamps)',
      'Labor savings projection (gate automation)',
      'Network effect multiplier (cross-site standardization)',
    ],
    formTitle: 'Request Executive Briefing',
    formSubtitle: 'Provide your network size and we\'ll build a tailored ROI view.',
    leadType: 'quote' as const,
  },
  ops: {
    icon: Warehouse,
    title: 'Yard Readiness Assessment',
    subtitle: 'Operational audit and implementation roadmap.',
    bullets: [
      'Yard readiness score (exceptions, dwell, detention, throughput)',
      'Process gap analysis vs. industry benchmarks',
      'Prioritized implementation roadmap',
      'Integration requirements (TMS, WMS, carrier portals)',
    ],
    formTitle: 'Request Yard Audit',
    formSubtitle: 'Tell us your current state and we\'ll map a deployment path.',
    leadType: 'quote' as const,
  },
};

function QualifyContent({ intent }: QualifyContentProps) {
  const intentKey = (intent as keyof typeof INTENT_CONFIG) || 'founding';
  const config = INTENT_CONFIG[intentKey] || INTENT_CONFIG.founding;
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Qualification</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            {config.title}
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            {config.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What You Get */}
            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Deliverables</p>
              <h2 className="text-xl font-bold text-white mb-6">What You Get</h2>
              <ul className="space-y-3">
                {config.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-neon mt-1">→</span>
                    <span className="text-steel text-[15px] leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lead Form */}
            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
              <LeadForm
                leadType={config.leadType}
                title={config.formTitle}
                subtitle={config.formSubtitle}
              />
            </div>
          </div>

          {/* Alternative CTAs */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/roi"
              className="inline-flex flex-col items-center justify-center px-6 py-4 rounded-xl font-semibold border border-neon/20 bg-carbon/50 text-white hover:border-neon/40 transition-all text-center"
            >
              <DollarSign size={24} className="text-neon mb-2" />
              <span>Calculate ROI</span>
            </a>
            <a
              href="/yardbuilder"
              className="inline-flex flex-col items-center justify-center px-6 py-4 rounded-xl font-semibold border-2 border-steel/30 text-white hover:border-neon/40 transition-all text-center"
            >
              <Warehouse size={24} className="text-neon mb-2" />
              <span>Yard Audit</span>
            </a>
            <a
              href="/contact"
              className="inline-flex flex-col items-center justify-center px-6 py-4 rounded-xl font-semibold border-2 border-steel/30 text-white hover:border-neon/40 transition-all text-center"
            >
              <Users size={24} className="text-neon mb-2" />
              <span>Book Demo</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

interface PageProps {
  searchParams: Promise<{ intent?: string }>;
}

export default async function QualifyPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const intent = params.intent;

  // Validate intent parameter
  const validIntents = ['founding', 'security', 'roi', 'ops'];
  if (intent && !validIntents.includes(intent)) {
    redirect('/qualify?intent=founding');
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-void">
          <Header />
          <div className="pt-32 pb-16 flex items-center justify-center">
            <div className="text-steel">Loading...</div>
          </div>
        </div>
      }
    >
      <QualifyContent intent={intent} />
    </Suspense>
  );
}
