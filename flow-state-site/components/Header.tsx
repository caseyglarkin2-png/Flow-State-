'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FlowArrow, Ignite, Velocity } from '@/components/icons/FlowIcons';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-void/80 backdrop-blur-md border-b border-neon/20">
      {/* Founding Member Banner */}
      <div className="bg-neon/10 border-b border-neon/20 py-2 px-4 text-center text-sm">
        <span className="text-steel inline-flex items-center gap-2">
          <Ignite size={16} className="text-neon" />
          Founding Member Program:
        </span>
        <Link href="/singularity" className="text-neon font-semibold hover:underline inline-flex items-center gap-1">
          Qualify your network <FlowArrow size={12} className="text-neon" />
        </Link>
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Image src="/logo.svg" alt="Flow State" width={36} height={36} className="w-9 h-9" />
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
          <Link href="/pricing" className="text-sm text-steel hover:text-neon transition-colors">
            Pricing
          </Link>
          
          {/* Company Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
              onBlur={() => setTimeout(() => setCompanyMenuOpen(false), 150)}
              className="text-sm text-steel hover:text-neon transition-colors flex items-center gap-1"
            >
              Company
              <svg className={`w-4 h-4 transition-transform ${companyMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {companyMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-carbon border border-neon/20 rounded-lg shadow-lg py-2 z-50">
                <Link href="/about" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  About
                </Link>
                <Link href="/security" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  Security
                </Link>
                <Link href="/integrations" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  Integrations
                </Link>
                <Link href="/press" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  Press
                </Link>
                <Link href="/contact" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  Contact
                </Link>
              </div>
            )}
          </div>
          
          <Link href="/singularity" className="text-sm text-neon font-semibold hover:text-white transition-colors">
            Singularity
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:flex" />
          <Link href="/contact?intent=qualify" className="px-4 py-2 text-sm font-semibold bg-neon text-void rounded-lg hover:shadow-lg hover:shadow-neon/50 transition-all flex items-center gap-1">
            <Velocity size={16} className="text-void" />
            Qualify
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-neon"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
          <Link href="/pricing" className="block text-steel hover:text-neon transition-colors">Pricing</Link>
          
          <div className="border-t border-neon/10 pt-4">
            <p className="text-xs text-steel/60 font-mono mb-2 uppercase">Company</p>
            <Link href="/about" className="block text-steel hover:text-neon transition-colors py-1">About</Link>
            <Link href="/security" className="block text-steel hover:text-neon transition-colors py-1">Security</Link>
            <Link href="/integrations" className="block text-steel hover:text-neon transition-colors py-1">Integrations</Link>
            <Link href="/press" className="block text-steel hover:text-neon transition-colors py-1">Press</Link>
            <Link href="/contact" className="block text-steel hover:text-neon transition-colors py-1">Contact</Link>
          </div>
          
          <Link href="/singularity" className="block text-neon font-semibold">Singularity</Link>
          <ThemeToggle className="sm:hidden" />
        </div>
      )}
    </header>
  );
}
