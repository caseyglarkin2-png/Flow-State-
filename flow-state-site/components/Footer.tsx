'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';
import { SITE_METADATA } from '@/lib/branding';

export default function Footer() {
  return (
    <footer className="bg-carbon border-t border-neon/20 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-2">
            <BrandLogo size={32} showWordmark={true} showOriginLine={true} className="mb-4" />
            <p className="text-steel text-sm mb-2">{SITE_METADATA.tagline}</p>
            <p className="text-steel/60 text-xs">A FreightRoll product</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-neon text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-2 text-sm text-steel">
              <li><Link href="/product" className="hover:text-neon transition-colors">Overview</Link></li>
              <li><Link href="/roi" className="hover:text-neon transition-colors">ROI Calculator</Link></li>
              <li><Link href="/yardbuilder" className="hover:text-neon transition-colors">YardBuilder</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4 text-neon text-sm uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-2 text-sm text-steel">
              <li><Link href="/solutions" className="hover:text-neon transition-colors">Solutions Overview</Link></li>
              <li><Link href="/solutions/dry-van" className="hover:text-neon transition-colors">Dry Van</Link></li>
              <li><Link href="/solutions/reefer" className="hover:text-neon transition-colors">Reefer</Link></li>
              <li><Link href="/solutions/flatbed" className="hover:text-neon transition-colors">Flatbed</Link></li>
              <li><Link href="/case-studies" className="hover:text-neon transition-colors">Case Studies</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-neon text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 text-sm text-steel">
              <li><Link href="/resources/guides" className="hover:text-neon transition-colors">Guides</Link></li>
              <li><Link href="/resources/field-notes" className="hover:text-neon transition-colors">Field Notes</Link></li>
              <li><Link href="/resources/simulations" className="hover:text-neon transition-colors">Simulations</Link></li>
              <li><Link href="/docs/economics-methodology" className="hover:text-neon transition-colors">Economics Methodology</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-neon text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm text-steel">
              <li><Link href="/resources/procurement" className="hover:text-neon transition-colors">Evidence Vault</Link></li>
              <li><Link href="/implementation" className="hover:text-neon transition-colors">Implementation</Link></li>
              <li><Link href="/integrations" className="hover:text-neon transition-colors">Integrations</Link></li>
              <li><Link href="/pricing" className="hover:text-neon transition-colors">Pricing</Link></li>
              <li><Link href="/about" className="hover:text-neon transition-colors">About</Link></li>
              <li><Link href="/faq" className="hover:text-neon transition-colors">FAQ</Link></li>
              <li><Link href="/press" className="hover:text-neon transition-colors">Press</Link></li>
              <li><Link href="/status" className="hover:text-neon transition-colors">Status</Link></li>
              <li><Link href="/changelog" className="hover:text-neon transition-colors">Changelog</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neon/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-steel">
          <p>&copy; 2026 YardFlow by FreightRoll. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-neon transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-neon transition-colors">Terms</Link>
            <a href="mailto:sales@freightroll.com" className="hover:text-neon transition-colors">sales@freightroll.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
