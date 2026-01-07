import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import Link from 'next/link';

export default function CompareIndexPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Compare the <span className="neon-glow">operating models</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            This isn't feature-bingo. It's: do you have a control loop, and can you make timestamps defensible?
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card hover>
            <h2 className="text-2xl font-bold text-neon mb-3">YardFlow by FreightRoll vs Legacy YMS</h2>
            <p className="text-steel">
              Legacy systems can record events, but often struggle with workflow adoption, exception truth, and network-wide
              standardization.
            </p>
            <Link href="/compare/legacy-yms" className="mt-5 inline-flex text-neon font-semibold hover:underline">
              Read comparison
            </Link>
          </Card>

          <Card hover>
            <h2 className="text-2xl font-bold text-neon mb-3">YardFlow by FreightRoll vs Spreadsheets + Radio</h2>
            <p className="text-steel">
              Manual tracking creates “visibility” without accountability. You can’t defend detention or improve dwell
              without consistent timestamps and reason codes.
            </p>
            <Link href="/compare/spreadsheets" className="mt-5 inline-flex text-neon font-semibold hover:underline">
              Read comparison
            </Link>
          </Card>

          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-neon mb-3">Want a board-ready artifact?</h2>
            <p className="text-steel">
              Generate a YardBuilder report or export an ROI PDF. These are designed to be forwarded internally.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link
                href="/yardbuilder"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
              >
                YardBuilder
              </Link>
              <Link
                href="/roi"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
              >
                ROI Calculator
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
