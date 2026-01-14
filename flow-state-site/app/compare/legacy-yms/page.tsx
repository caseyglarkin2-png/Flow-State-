import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function CompareLegacyYmsPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            YardFlow by FreightRoll vs <span className="neon-glow">Legacy YMS</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            Legacy YMS can be a record system. YardFlow by FreightRoll is built as a control loop: standard workflows, defensible
            timestamps, and network-level operational truth.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Where legacy often breaks</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Data entry is inconsistent under pressure</li>
              <li>Exceptions become free-text (no reason-code truth)</li>
              <li>Visibility is retrospective, not operational</li>
              <li>Multi-site rollout becomes a config swamp</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">What YardFlow by FreightRoll optimizes for</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Repeatable check-in/out with minimal friction</li>
              <li>Defensible timestamps (audit trail mindset)</li>
              <li>Exception workflow that produces usable truth</li>
              <li>Network standardization (the multiplier)</li>
            </ul>
          </Card>

          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-neon mb-3">If you already have a YMS</h2>
            <p className="text-steel">
              The question isn’t “rip and replace.” It’s: where does your current system fail under operational load?
              We’ll focus a pilot on the failures that create detention, labor waste, or throughput collapse.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
              >
                Talk to an operator
              </a>
              <a
                href="/roi"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
              >
                Model ROI
              </a>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
