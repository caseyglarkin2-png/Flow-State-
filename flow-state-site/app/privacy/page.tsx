'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Legal</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-steel">Last updated: Jan 1, 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <Card>
            <div className="space-y-6 text-steel leading-relaxed">
              <p>
                This Privacy Policy explains how YardFlow by FreightRoll collects and uses information when you visit our website
                or apply for the Founding Member program.
              </p>

              <div>
                <h2 className="text-neon font-bold mb-2">Information we collect</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Information you provide (e.g., name, email, company, and application details).</li>
                  <li>Basic usage information (e.g., pages visited) to improve performance and reliability.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-neon font-bold mb-2">How we use information</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To respond to inquiries and process applications.</li>
                  <li>To operate, maintain, and improve the site and product experience.</li>
                  <li>To communicate product updates relevant to applicants (you can opt out).</li>
                </ul>
              </div>

              <div>
                <h2 className="text-neon font-bold mb-2">Sharing</h2>
                <p>
                  We do not sell personal information. We may share information with service providers who help us run
                  the site and support operations, subject to reasonable confidentiality obligations.
                </p>
              </div>

              <div>
                <h2 className="text-neon font-bold mb-2">Contact</h2>
                <p>
                  Questions? Email{' '}
                  <a className="text-neon hover:underline" href="mailto:privacy@freightroll.com">
                    privacy@freightroll.com
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
