/**
 * PageShell - Global container for long-form content pages
 * Provides consistent max-width, padding, and vertical rhythm
 */

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageShellProps {
  children: React.ReactNode;
  /** Remove header/footer for embedded use */
  bare?: boolean;
}

export default function PageShell({ children, bare = false }: PageShellProps) {
  return (
    <>
      {!bare && <Header />}
      <main className="min-h-screen bg-void pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          {children}
        </div>
      </main>
      {!bare && <Footer />}
    </>
  );
}
