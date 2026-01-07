'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Terms of <span className="neon-glow">Service</span>
          </h1>
          <p className="text-steel">Last updated: Jan 1, 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <Card>
            <div className="space-y-6 text-steel leading-relaxed">
              <p>
                These Terms govern your use of the YardFlow by FreightRoll website and any associated application forms.
                By using the site, you agree to these Terms.
              </p>

              <div>
                <h2 className="text-neon font-bold mb-2">No guarantees</h2>
                <p>
                  The ROI Calculator provides estimates based on the inputs and assumptions you provide.
                  Results are illustrative and may not reflect actual outcomes.
                </p>
              </div>

              <div>
                <h2 className="text-neon font-bold mb-2">Acceptable use</h2>
                <p>
                  You agree not to misuse the site, attempt to disrupt services, or access systems without authorization.
                </p>
              </div>

              <div>
                <h2 className="text-neon font-bold mb-2">Contact</h2>
                <p>
                  Questions? Email{' '}
                  <a className="text-neon hover:underline" href="mailto:legal@freightroll.com">
                    legal@freightroll.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
