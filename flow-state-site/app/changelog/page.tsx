import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Change<span className="neon-glow">log</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            We share detailed release notes with customers (including rollout notes and operational impact). Public
            changelog is available on request.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Request release notes</h2>
            <p className="text-steel">
              If you’re in evaluation and need a product velocity artifact for internal review, we’ll share the appropriate
              release notes and roadmap context.
            </p>
            <a
              href="mailto:contact@freightroll.com?subject=Changelog%20request"
              className="mt-5 inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
            >
              Request changelog
            </a>
          </Card>

          <Card className="border-neon/30">
            <h2 className="text-2xl font-bold text-neon mb-3">Why it’s gated</h2>
            <p className="text-steel">
              We avoid publishing claims that can’t be verified and we don’t publish customer-specific details without
              approval. Changelog artifacts are shared in context.
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
