import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExpandableCard } from '@/components/ExpandableCard';
import Link from 'next/link';

const faqs = [
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
] as const;

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((f, idx) => (
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
            Security, privacy, implementation, integrations—we respond with procurement-ready answers.
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
