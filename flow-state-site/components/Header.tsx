'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-void/80 backdrop-blur-md border-b border-neon/20">
      {/* Founding Member Banner */}
      <div className="bg-neon/10 border-b border-neon/20 py-2 px-4 text-center text-sm">
        <span className="text-steel">🚀 Founding Member Program Open — </span>
        <Link href="/singularity" className="text-neon font-semibold hover:underline">
          Only 23 spots left →
        </Link>
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full border-2 border-neon flex items-center justify-center group-hover:neon-glow-hover">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-neon">
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <circle cx="6" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="18" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="6" cy="18" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="18" cy="18" r="1.5" fill="currentColor" opacity="0.6" />
              <line x1="12" y1="12" x2="6" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="12" y1="12" x2="18" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="12" y1="12" x2="6" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <line x1="12" y1="12" x2="18" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight neon-glow-hover">FLOW STATE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/product" className="text-sm text-steel hover:text-neon transition-colors">
            Product
          </Link>
          <Link href="/solutions" className="text-sm text-steel hover:text-neon transition-colors">
            Solutions
          </Link>
          <Link href="/yardbuilder" className="text-sm text-steel hover:text-neon transition-colors">
            YardBuilder
          </Link>
          <Link href="/singularity" className="text-sm text-neon font-semibold hover:text-white transition-colors">
            Singularity ✨
          </Link>
          <Link href="/roi" className="text-sm text-steel hover:text-neon transition-colors">
            ROI Calculator
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:block px-4 py-2 text-sm font-semibold text-neon border border-neon rounded-lg hover:bg-neon hover:text-void transition-all">
            Login
          </button>
          <Link href="/singularity" className="px-4 py-2 text-sm font-semibold bg-neon text-void rounded-lg hover:shadow-lg hover:shadow-neon/50 transition-all flex items-center gap-1">
            <span>⚡</span> Book Demo
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-neon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-carbon border-t border-neon/20 py-4 px-6 space-y-4">
          <Link href="/product" className="block text-steel hover:text-neon transition-colors">Product</Link>
          <Link href="/solutions" className="block text-steel hover:text-neon transition-colors">Solutions</Link>
          <Link href="/yardbuilder" className="block text-steel hover:text-neon transition-colors">YardBuilder</Link>
          <Link href="/singularity" className="block text-neon font-semibold">Singularity ✨</Link>
          <Link href="/roi" className="block text-steel hover:text-neon transition-colors">ROI Calculator</Link>
          <button className="w-full px-4 py-2 text-sm font-semibold text-neon border border-neon rounded-lg hover:bg-neon hover:text-void transition-all">
            Login
          </button>
        </div>
      )}
    </header>
  );
}
