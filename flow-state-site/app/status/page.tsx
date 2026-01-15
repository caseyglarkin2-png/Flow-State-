import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">System Health</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            Service Status
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            We provide incident communication and uptime details directly to customers and prospects during evaluation.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Incident communications</h2>
            <p className="text-steel">
              If you’re an active customer, your incident channel and escalation contacts are defined in your support
              agreement.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Need a status update?</h2>
            <p className="text-steel">Email us and we’ll respond with the appropriate details for your evaluation.</p>
            <a
              href="mailto:status@freightroll.com?subject=Status%20request"
              className="mt-5 inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
            >
              Request status details
            </a>
          </Card>

          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-neon mb-3">Note</h2>
            <p className="text-steel">
              This page intentionally avoids making public uptime claims. Formal uptime targets and support SLAs are
              contract-defined.
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
