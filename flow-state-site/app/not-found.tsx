'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void">
      <Header />
      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Page <span className="neon-glow">Not Found</span>
          </h1>
          <p className="text-xl text-steel max-w-2xl mx-auto">
            The route you’re looking for doesn’t exist (or moved).
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="text-center">
            <div className="mb-6 inline-block px-4 py-2 rounded-lg bg-neon/10 border border-neon/30">
              <p className="text-neon font-mono text-sm">
                <span className="font-bold">FreightRoll is now Flow State</span>
              </p>
            </div>
            <p className="text-steel mb-6">
              If you came from an old FreightRoll link, we've rebranded to Flow State and restructured the site.
              Same team, same product — just a bigger vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
              >
                Go Home
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
              >
                About the Rebrand
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
              >
                Contact
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
