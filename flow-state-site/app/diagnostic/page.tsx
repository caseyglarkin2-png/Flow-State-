'use client';

import React, { useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiagnosticCalculator from '@/components/DiagnosticCalculator';
import { Timeline } from '@/components/icons/FlowIcons';

export default function DiagnosticPage() {
  useEffect(() => {
    analytics.viewDiagnostic();
  }, []);

  return (
    <div className="min-h-screen bg-void">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-12 border-b border-ember/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-ember font-mono text-sm tracking-widest mb-4 uppercase">
            60-Second Assessment
          </p>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">Yard Tax</span>{' '}
            <span className="text-ember">Diagnostic</span>
          </h1>
          <p className="text-xl text-steel/80 max-w-2xl mx-auto mb-8">
            Answer 9 questions about your truckload operations. 
            See your hidden yard costs, top leak drivers, and cost of delay, instantly.
          </p>
          <div className="inline-flex items-center gap-2 text-steel/60 text-sm">
            <Timeline size={16} />
            <span>No forms. No sales call. Just numbers.</span>
          </div>
        </div>
      </section>
      
      {/* Diagnostic Calculator */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <DiagnosticCalculator />
        </div>
      </section>
      
      {/* Methodology Note */}
      <section className="py-12 bg-carbon/30 border-t border-steel/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-lg font-bold text-white mb-3">How We Calculate Your Yard Tax</h3>
          <p className="text-steel/70 text-sm leading-relaxed">
            The diagnostic uses industry benchmarks and your operational inputs to model hidden costs. 
            Detention rates assume $75/occurrence based on dwell time thresholds. 
            OT calculations use $45/hr loaded cost. Exception handling assumes 15 min extra per exception load. 
            All outputs are estimates. Your actual results depend on carrier mix, facility layout, and operational maturity.
          </p>
          <p className="text-steel/50 text-xs mt-4">
            For detailed methodology, see our{' '}
            <a href="/docs/economics-methodology" className="text-neon hover:underline">
              Economics Methodology
            </a>{' '}
            documentation.
          </p>

          {/* Post-Diagnostic CTAs */}
          <div className="mt-12 pt-8 border-t border-neon/10">
            <h4 className="text-xl font-bold mb-4">See the full picture</h4>
            <p className="text-steel/70 mb-6">
              This diagnostic shows single-site costs. See how YNS reduces yard tax across your entire network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/product"
                className="px-6 py-3 rounded-lg bg-neon text-void font-semibold hover:bg-white transition-all"
              >
                Explore the Product →
              </a>
              <a 
                href="/roi"
                className="px-6 py-3 rounded-lg border-2 border-neon text-neon font-semibold hover:bg-neon hover:text-void transition-all"
              >
                Build ROI Model
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
