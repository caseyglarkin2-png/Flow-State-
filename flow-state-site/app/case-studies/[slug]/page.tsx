import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  disclaimer: string;
  highlights: Array<{ label: string; value: string }>;
  narrative: string[];
};

const CASE_STUDIES: Record<string, CaseStudy> = {
  'primo-network': {
    slug: 'primo-network',
    title: 'Primo — Network Standardization at Scale',
    subtitle: 'A 260-facility network scenario (modeled) to illustrate enterprise leverage.',
    disclaimer:
      'Disclaimer: This is a representative case study format using modeled assumptions (not a public customer claim). Procurement and implementation details vary by network.',
    highlights: [
      { label: 'Network size', value: '260 facilities' },
      { label: 'Subscription example', value: '$8,000 / facility / year (illustrative)' },
      { label: 'Primary value levers', value: 'Detention reduction, labor automation, throughput' },
      { label: 'Implementation', value: '$2,500 / facility (one-time)' },
    ],
    narrative: [
      'At enterprise scale, the yard is not a single facility problem — it is a network execution problem. Flow State is designed to standardize the ground-truth layer across every gate and every dock.',
      'When a network aligns on check-in/out, timestamps, and repeatable workflows, operational velocity compounds. The ROI becomes more defensible and more predictable as adoption broadens.',
      'This scenario uses the ROI calculator’s Pro Mode to model a network-wide deployment and show how per-facility pricing aligns incentives toward full adoption.',
    ],
  },
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = CASE_STUDIES[slug];
  if (!cs) notFound();

  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            {cs.title.split('—')[0].trim()} — <span className="neon-glow">{cs.title.split('—')[1]?.trim()}</span>
          </h1>
          <p className="text-xl text-steel max-w-4xl">{cs.subtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-4">Highlights</h2>
            <div className="space-y-3 text-sm">
              {cs.highlights.map((h) => (
                <div key={h.label} className="flex justify-between gap-4">
                  <span className="text-steel">{h.label}</span>
                  <span className="text-white font-semibold text-right">{h.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-4">What changed</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Standardized execution at every gate</li>
              <li>Defensible timestamps for detention reduction</li>
              <li>Less manual work for guards and dock clerks</li>
              <li>Network visibility via a shared ground-truth layer</li>
            </ul>
          </Card>

          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-neon mb-4">Narrative</h2>
            <div className="space-y-4 text-steel">
              {cs.narrative.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="text-sm text-steel/70">{cs.disclaimer}</p>
            </div>

            <div className="mt-6">
              <a
                href="/roi"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
              >
                Model your network ROI
              </a>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
