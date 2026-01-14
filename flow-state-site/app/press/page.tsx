import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function PressPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Press <span className="neon-glow">kit</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            Logos, boilerplate, and product description available on request so we keep assets accurate and up to date.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Boilerplate</h2>
            <p className="text-steel">
              YardFlow by FreightRoll builds yard orchestration software for enterprise logistics networks. We focus on repeatable
              workflows that produce defensible timestamps and operational truth, so teams can reduce detention, improve
              throughput, and standardize execution across sites.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Brand assets</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Logo (SVG/PNG)</li>
              <li>Product screenshots (approved set)</li>
              <li>Founder bio + headshot (optional)</li>
            </ul>
            <a
              href="mailto:press@freightroll.com?subject=Press%20kit%20request"
              className="mt-5 inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
            >
              Request press kit
            </a>
          </Card>

          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-neon mb-3">Accuracy note</h2>
            <p className="text-steel">
              We don’t publish customer logos, compliance attestations, or performance metrics on this site unless they are
              explicitly approved and verifiable. If you need validation materials, use the Evidence Vault or contact us.
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
