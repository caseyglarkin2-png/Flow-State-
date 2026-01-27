'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { Velocity } from '@/components/icons/FlowIcons';
import { PRIMARY_CTA } from '@/lib/cta';

/**
 * Simplified Header — 5-item IA
 * Routes: /, /product, /solutions, /roi, /procurement, /contact
 * No dropdowns, no Co-Dev banner, clean and focused
 */

const NAV_ITEMS = [
  { href: '/product', label: 'Product' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/roi', label: 'ROI' },
  { href: '/procurement', label: 'Procurement' },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 w-full z-50 bg-void/80 backdrop-blur-md border-b border-neon/20">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Logo size={36} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight neon-glow-hover leading-none">YardFlow</span>
            <span className="text-[10px] text-steel/60 tracking-wider leading-none mt-0.5">by FreightRoll</span>
          </div>
        </Link>

        {/* Desktop Menu — Simple links, no dropdowns */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                isActive(item.href) 
                  ? 'text-neon font-semibold' 
                  : 'text-steel hover:text-neon'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Primary CTA */}
          <Link 
            href={PRIMARY_CTA.href} 
            className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold bg-neon text-void rounded-xl hover:shadow-lg hover:shadow-neon/50 transition-all items-center gap-1" 
            aria-label={PRIMARY_CTA.ariaLabel}
          >
            <Velocity size={16} className="text-void" />
            {PRIMARY_CTA.label}
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-neon"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
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
        <div className="lg:hidden bg-carbon border-t border-neon/20 py-4 px-6 space-y-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-lg transition-colors ${
                isActive(item.href) 
                  ? 'text-neon font-semibold' 
                  : 'text-steel hover:text-neon'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-neon/10">
            <Link
              href={PRIMARY_CTA.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-3 text-sm font-semibold bg-neon text-void rounded-xl"
            >
              {PRIMARY_CTA.label}
            </Link>
          </div>
          
          {/* Utility links */}
          <div className="pt-4 border-t border-neon/10 flex gap-4 text-sm text-steel">
            <Link href="/contact" className="hover:text-neon transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-neon transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-neon transition-colors">Terms</Link>
          </div>
        </div>
      )}
    </header>
  );
}
