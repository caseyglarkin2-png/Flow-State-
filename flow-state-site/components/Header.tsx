'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { FlowArrow, Ignite, Velocity, Shield } from '@/components/icons/FlowIcons';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const closeAllDropdowns = () => {
    setSolutionsOpen(false);
    setResourcesOpen(false);
    setCompanyOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-void/80 backdrop-blur-md border-b border-neon/20">
      {/* Founding Member Banner */}
      <div className="bg-neon/10 border-b border-neon/20 py-2 px-4 text-center text-sm">
        <span className="text-steel inline-flex items-center gap-2">
          <Ignite size={16} className="text-neon" />
          Founding Member Program:
        </span>
        <Link href="/contact?intent=qualify" className="text-neon font-semibold hover:underline inline-flex items-center gap-1 ml-1">
          Apply now <FlowArrow size={12} className="text-neon" />
        </Link>
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Logo size={36} />
          </div>
          <span className="font-bold text-lg tracking-tight neon-glow-hover">YARDFLOW</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {/* YNS - Featured link */}
          <Link href="/yns" className="text-sm text-neon hover:text-white transition-colors font-semibold">
            YNS
          </Link>

          {/* Product - Direct link */}
          <Link href="/product" className="text-sm text-steel hover:text-neon transition-colors">
            Product
          </Link>

          {/* Solutions Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { closeAllDropdowns(); setSolutionsOpen(!solutionsOpen); }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  closeAllDropdowns();
                  setSolutionsOpen(!solutionsOpen);
                }
                if (e.key === 'Escape') setSolutionsOpen(false);
              }}
              onBlur={() => setTimeout(() => setSolutionsOpen(false), 150)}
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
              aria-label="Solutions menu"
              className="text-sm text-steel hover:text-neon transition-colors flex items-center gap-1"
            >
              Solutions
              <svg className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {solutionsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-carbon border border-neon/20 rounded-lg shadow-lg py-2 z-50">
                <Link href="/solutions" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  <span className="font-medium text-white">Yard Orchestration</span>
                  <span className="block text-xs text-steel/70">Gate automation, dwell reduction, throughput</span>
                </Link>
                <Link href="/security" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  <span className="font-medium text-white">Identity & Cargo Security</span>
                  <span className="block text-xs text-steel/70">ID verification, audit trails, compliance</span>
                </Link>
                <Link href="/singularity" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  <span className="font-medium text-white">Network Intelligence</span>
                  <span className="block text-xs text-steel/70">Multi-site optimization, network effects</span>
                </Link>
              </div>
            )}
          </div>

          {/* ROI - Direct link */}
          <Link href="/roi" className="text-sm text-steel hover:text-neon transition-colors">
            ROI
          </Link>

          {/* YardBuilder - Direct link */}
          <Link href="/yardbuilder" className="text-sm text-steel hover:text-neon transition-colors">
            YardBuilder
          </Link>

          {/* Resources Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { closeAllDropdowns(); setResourcesOpen(!resourcesOpen); }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  closeAllDropdowns();
                  setResourcesOpen(!resourcesOpen);
                }
                if (e.key === 'Escape') setResourcesOpen(false);
              }}
              onBlur={() => setTimeout(() => setResourcesOpen(false), 150)}
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
              aria-label="Resources menu"
              className="text-sm text-steel hover:text-neon transition-colors flex items-center gap-1"
            >
              Resources
              <svg className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {resourcesOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-carbon border border-neon/20 rounded-lg shadow-lg py-2 z-50">
                <Link href="/resources/guides" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  <span className="font-medium text-white">Guides</span>
                  <span className="block text-xs text-steel/70">Deep dives on yard operations</span>
                </Link>
                <Link href="/resources/field-notes" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  <span className="font-medium text-white">Field Notes</span>
                  <span className="block text-xs text-steel/70">Operational insights & patterns</span>
                </Link>
                <Link href="/resources/simulations" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  <span className="font-medium text-white">Simulations</span>
                  <span className="block text-xs text-steel/70">Primo & Singularity models</span>
                </Link>
                <div className="border-t border-neon/10 my-2"></div>
                <Link href="/docs/economics-methodology" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  Economics Methodology
                </Link>
                <Link href="/case-studies" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  Case Studies
                </Link>
              </div>
            )}
          </div>

          {/* Company Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { closeAllDropdowns(); setCompanyOpen(!companyOpen); }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  closeAllDropdowns();
                  setCompanyOpen(!companyOpen);
                }
                if (e.key === 'Escape') setCompanyOpen(false);
              }}
              onBlur={() => setTimeout(() => setCompanyOpen(false), 150)}
              aria-expanded={companyOpen}
              aria-haspopup="true"
              aria-label="Company menu"
              className="text-sm text-steel hover:text-neon transition-colors flex items-center gap-1"
            >
              Company
              <svg className={`w-4 h-4 transition-transform ${companyOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {companyOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-carbon border border-neon/20 rounded-lg shadow-lg py-2 z-50">
                <Link href="/security" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  <span className="font-medium text-white flex items-center gap-2">
                    <Shield size={14} className="text-neon" /> Evidence Vault
                  </span>
                  <span className="block text-xs text-steel/70">Security & compliance proof</span>
                </Link>
                <Link href="/implementation" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  Implementation
                </Link>
                <Link href="/integrations" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  Integrations
                </Link>
                <Link href="/pricing" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  Pricing
                </Link>
                <div className="border-t border-neon/10 my-2"></div>
                <Link href="/about" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  About
                </Link>
                <Link href="/faq" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  FAQ
                </Link>
                <Link href="/press" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  Press
                </Link>
                <Link href="/status" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  Status
                </Link>
                <Link href="/changelog" className="block px-4 py-2 text-sm text-steel hover:text-neon hover:bg-neon/5 transition-colors">
                  Changelog
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link href="/contact?intent=qualify" className="px-4 py-2 text-sm font-semibold bg-neon text-void rounded-lg hover:shadow-lg hover:shadow-neon/50 transition-all flex items-center gap-1">
            <Velocity size={16} className="text-void" />
            Request Access
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-neon"
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
        <div className="lg:hidden bg-carbon border-t border-neon/20 py-4 px-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <Link href="/yns" className="block text-neon hover:text-white transition-colors font-semibold">YNS (Yard Network System)</Link>
          <Link href="/product" className="block text-steel hover:text-neon transition-colors font-medium">Product</Link>
          
          <div className="border-t border-neon/10 pt-4">
            <p className="text-xs text-steel/60 font-mono mb-2 uppercase">Solutions</p>
            <Link href="/solutions" className="block text-steel hover:text-neon transition-colors py-1">Yard Orchestration</Link>
            <Link href="/security" className="block text-steel hover:text-neon transition-colors py-1">Identity & Cargo Security</Link>
            <Link href="/singularity" className="block text-steel hover:text-neon transition-colors py-1">Network Intelligence</Link>
          </div>

          <div className="flex gap-4">
            <Link href="/roi" className="block text-steel hover:text-neon transition-colors font-medium">ROI</Link>
            <Link href="/yardbuilder" className="block text-steel hover:text-neon transition-colors font-medium">YardBuilder</Link>
          </div>
          
          <div className="border-t border-neon/10 pt-4">
            <p className="text-xs text-steel/60 font-mono mb-2 uppercase">Resources</p>
            <Link href="/resources/guides" className="block text-steel hover:text-neon transition-colors py-1">Guides</Link>
            <Link href="/resources/field-notes" className="block text-steel hover:text-neon transition-colors py-1">Field Notes</Link>
            <Link href="/resources/simulations" className="block text-steel hover:text-neon transition-colors py-1">Simulations</Link>
            <Link href="/case-studies" className="block text-steel hover:text-neon transition-colors py-1">Case Studies</Link>
          </div>

          <div className="border-t border-neon/10 pt-4">
            <p className="text-xs text-steel/60 font-mono mb-2 uppercase">Company</p>
            <Link href="/security" className="block text-steel hover:text-neon transition-colors py-1">Evidence Vault</Link>
            <Link href="/implementation" className="block text-steel hover:text-neon transition-colors py-1">Implementation</Link>
            <Link href="/integrations" className="block text-steel hover:text-neon transition-colors py-1">Integrations</Link>
            <Link href="/pricing" className="block text-steel hover:text-neon transition-colors py-1">Pricing</Link>
            <Link href="/about" className="block text-steel hover:text-neon transition-colors py-1">About</Link>
            <Link href="/faq" className="block text-steel hover:text-neon transition-colors py-1">FAQ</Link>
            <Link href="/press" className="block text-steel hover:text-neon transition-colors py-1">Press</Link>
            <Link href="/status" className="block text-steel hover:text-neon transition-colors py-1">Status</Link>
            <Link href="/changelog" className="block text-steel hover:text-neon transition-colors py-1">Changelog</Link>
          </div>
        </div>
      )}
    </header>
  );
}
