import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

const faqs = [
  {
    q: 'What is YardFlow by FreightRoll, in one sentence?',
    a: 'YardFlow by FreightRoll is a yard orchestration control loop: standardized workflows that produce defensible timestamps and network-level operational truth.',
  },
  {
    q: 'Do you support pilots?',
    a: 'Yes. We recommend a pilot focused on a clear operational loop (dwell/detention/labor/throughput) and one facility with strong ownership, then scale once the loop is proven.',
  },
  {
    q: 'How do you handle security and vendor reviews?',
    a: 'We support security questionnaires during procurement and can provide formal documents (policies, DPAs, etc.) as part of the evaluation. See the Security & Trust page for posture and roadmap.',
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

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            FAQ for <span className="neon-glow">buyers</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            Short answers you can forward internally. If you want procurement artifacts, open the Evidence Vault.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 gap-6">
            {faqs.map((f) => (
              <Card key={f.q}>
                <h2 className="text-xl font-bold text-neon">{f.q}</h2>
                <p className="text-steel mt-3">{f.a}</p>
              </Card>
            ))}

            <Card className="border-neon/30">
              <h2 className="text-xl font-bold text-neon">Still have a blocker?</h2>
              <p className="text-steel mt-3">
                Send your questions (security, privacy, implementation, integrations) and we’ll respond with a procurement-ready
                answer.
              </p>
              <a
                href="/contact"
                className="mt-5 inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
              >
                Contact sales
              </a>
            </Card>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Footer />
    </div>
  );
}
