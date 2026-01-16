import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExpandableCard } from '@/components/ExpandableCard';
import Link from 'next/link';

const faqs: Array<{
  q: string;
  a: string;
  category?: string;
}> = [
  {
    q: 'What is YardFlow by FreightRoll, in one sentence?',
    a: 'A yard orchestration control loop: standardized workflows that produce defensible timestamps and network-level operational truth.',
  },
  {
    q: 'Do you support pilots?',
    a: 'Yes. We recommend a pilot focused on a clear operational loop (dwell/detention/labor/throughput) and one facility with strong ownership, then scale once the loop is proven.',
  },
  {
    q: 'How do you handle security and vendor reviews?',
    a: 'We support security questionnaires during procurement and provide formal documents (policies, DPAs, etc.) as part of the evaluation. See the Security & Trust page for posture and roadmap.',
  },
  {
    q: 'Do you require integrations to start?',
    a: 'Not always. Many pilots start with minimal integration and expand as the workflow proves value. Integration scope depends on your current systems and operational constraints.',
  },
  {
    q: 'Is the ROI calculator guaranteed?',
    a: 'No. ROI outputs are modeled estimates based on your inputs and assumptions. Results vary by facility, adoption, and operating conditions.',
  },
  {
    q: 'What is your pricing model?',
    a: 'Facility-based annual subscription plus one-time implementation per facility. Enterprise terms and support SLAs are finalized during procurement.',
  },
  {
    q: 'Can we export data?',
    a: 'Yes. Export formats and retention policies are defined by contract and enterprise requirements. We support customer-owned data access and export workflows.',
  },
  {
    q: 'Where can I get a board-ready artifact?',
    a: 'Use YardBuilder to generate a readiness PDF, or export your ROI summary as a PDF for internal forwarding.',
  },
  {
    q: 'What is the Co-Development Program?',
    a: 'Multi-site operators (>50 facilities) can co-develop custom features with us: vision RTLS, AI orchestration, mode-specific automation, or custom integrations. You influence our roadmap, we build to your workflow, and you deploy ahead of the market.',
    category: 'Co-Development',
  },
  {
    q: 'Who qualifies for co-development?',
    a: 'Multi-site operators with >50 facilities, committed network rollout plans, and strategic partnership appetite. We prioritize partners who can validate features at scale and participate in co-marketing.',
    category: 'Co-Development',
  },
  {
    q: 'What does co-development cost?',
    a: 'No upfront development fees for qualified partners. Standard per-facility pricing applies across your network. We retain platform IP; you own operational know-how and deploy custom features first.',
    category: 'Co-Development',
  },
  {
    q: 'How long does co-development take?',
    a: 'Typical custom feature: 8-16 weeks from scoping to pilot deployment. Timeline depends on complexity, integration requirements, and testing cycles. We use a 3-phase framework: Discovery → Build → Deploy.',
    category: 'Co-Development',
  },
  {
    q: 'What features can be co-developed?',
    a: 'Examples: vision RTLS for real-time trailer tracking, AI dock scheduling, reefer temperature compliance automation, flatbed securement vision, intermodal container choreography, proprietary WMS/TMS integrations, network-level analytics dashboards.',
    category: 'Co-Development',
  },
];

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Buyer FAQ</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            Short Answers. Forward Internally.
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            The questions procurement asks. The answers that unblock deals. Need artifacts? Open the Evidence Vault.
          </p>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {faqs.filter((f) => !f.category).map((f, idx) => (
              <ExpandableCard
                key={f.q}
                id={`faq-${idx + 1}`}
                title={f.q}
                defaultOpen={idx === 0}
              >
                <p className="text-steel leading-relaxed">{f.a}</p>
              </ExpandableCard>
            ))}
          </div>

          {/* Co-Development Section */}
          <div className="pt-12 border-t border-neon/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-lg bg-neon/10 p-2">
                <svg className="w-5 h-5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Co-Development Program</h2>
            </div>
            <p className="text-steel mb-8 max-w-3xl">
              Build custom features with us. Multi-site operators with &gt;50 facilities can influence our roadmap and deploy advanced capabilities ahead of the market.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.filter((f) => f.category === 'Co-Development').map((f, idx) => (
                <ExpandableCard
                  key={f.q}
                  id={`codev-faq-${idx + 1}`}
                  title={f.q}
                  defaultOpen={idx === 0}
                >
                  <p className="text-steel leading-relaxed">{f.a}</p>
                </ExpandableCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-carbon/20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-ember/70">Still Blocked?</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Send Your Questions
          </h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl">
            Security, privacy, implementation, integrations. We respond with procurement-ready answers.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
          >
            Contact Sales
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Footer />
    </div>
  );
}
