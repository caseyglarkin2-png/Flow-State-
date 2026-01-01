import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function CompareSpreadsheetsPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Flow State vs <span className="neon-glow">Spreadsheets + Radio</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            Spreadsheets can track. They can’t enforce. Flow State standardizes the workflow so your timestamps and
            exception reasons are actually defensible.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">What manual tracking gets wrong</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Timestamps are delayed, approximate, or missing</li>
              <li>Exception reasons are inconsistent and hard to analyze</li>
              <li>Knowledge lives in people, not systems</li>
              <li>Network reporting becomes a reconciliation project</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">What changes with a control loop</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Standard check-in/out and exception workflow</li>
              <li>Reason codes that power analytics and action</li>
              <li>Operational truth that can be shared cross-site</li>
              <li>Board-ready reporting: assumptions + defensibility</li>
            </ul>
          </Card>

          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-neon mb-3">Fast next step</h2>
            <p className="text-steel">
              If you want something you can forward internally, generate a YardBuilder report. It produces a concrete
              readiness snapshot and recommended next steps.
            </p>
            <a
              href="/yardbuilder"
              className="mt-5 inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
            >
              Generate Yard Readiness Report
            </a>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
