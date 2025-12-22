'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FlowArrow, Ignite, Velocity } from '@/components/icons/FlowIcons';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-void/80 backdrop-blur-md border-b border-neon/20">
      {/* Founding Member Banner */}
      <div className="bg-neon/10 border-b border-neon/20 py-2 px-4 text-center text-sm">
        <span className="text-steel inline-flex items-center gap-2">
          <Ignite size={16} className="text-neon" />
          Founding Member Program Closing:
        </span>
        <Link href="/singularity" className="text-neon font-semibold hover:underline inline-flex items-center gap-1">
          Only 3 spots left <FlowArrow size={12} className="text-neon" />
        </Link>
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 36 36" className="w-9 h-9">
              {/* Outer glow ring */}
              <circle cx="18" cy="18" r="16" fill="none" stroke="url(#nodeGlow)" strokeWidth="1" opacity="0.4" />
              
              {/* Orbital path */}
              <ellipse cx="18" cy="18" rx="12" ry="12" fill="none" stroke="#00FF88" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 5" />
              
              {/* Connection lines radiating outward */}
              <line x1="18" y1="18" x2="4" y2="8" stroke="url(#lineGrad)" strokeWidth="1.2" opacity="0.7" />
              <line x1="18" y1="18" x2="32" y2="8" stroke="url(#lineGrad)" strokeWidth="1.2" opacity="0.7" />
              <line x1="18" y1="18" x2="4" y2="28" stroke="url(#lineGrad)" strokeWidth="1" opacity="0.5" />
              <line x1="18" y1="18" x2="32" y2="28" stroke="url(#lineGrad)" strokeWidth="1" opacity="0.5" />
              <line x1="18" y1="18" x2="18" y2="2" stroke="url(#lineGrad)" strokeWidth="1.2" opacity="0.8" />
              <line x1="18" y1="18" x2="18" y2="34" stroke="url(#lineGrad)" strokeWidth="0.8" opacity="0.4" />
              
              {/* Satellite nodes - the network */}
              <circle cx="4" cy="8" r="2.5" fill="#00FF88" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="32" cy="8" r="2.5" fill="#00FF88" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="4" cy="28" r="2" fill="#00FF88" opacity="0.45" />
              <circle cx="32" cy="28" r="2" fill="#00FF88" opacity="0.45" />
              <circle cx="18" cy="2" r="2" fill="#00FF88" opacity="0.7">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="18" cy="34" r="1.5" fill="#00FF88" opacity="0.35" />
              
              {/* Central core node - THE FLOW STATE */}
              <circle cx="18" cy="18" r="6" fill="url(#coreGrad)" />
              <circle cx="18" cy="18" r="4.5" fill="#0A0A0A" />
              <circle cx="18" cy="18" r="2.5" fill="#00FF88">
                <animate attributeName="r" values="2.5;3;2.5" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.8;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
              
              {/* Gradients */}
              <defs>
                <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00FF88" />
                  <stop offset="100%" stopColor="#00AA55" />
                </radialGradient>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF88" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#00FF88" stopOpacity="0.15" />
                </linearGradient>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00FF88" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
                </radialGradient>
              </defs>
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
            Singularity
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
            <Velocity size={16} className="text-void" />
            Apply Now
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
          <Link href="/singularity" className="block text-neon font-semibold">Singularity</Link>
          <Link href="/roi" className="block text-steel hover:text-neon transition-colors">ROI Calculator</Link>
          <button className="w-full px-4 py-2 text-sm font-semibold text-neon border border-neon rounded-lg hover:bg-neon hover:text-void transition-all">
            Login
          </button>
        </div>
      )}
    </header>
  );
}
