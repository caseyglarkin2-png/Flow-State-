'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';
import { SITE_METADATA } from '@/lib/branding';
import { BRAND } from '@/config/brand';
import { appendUtmToUrl } from '@/lib/utm';

export default function Footer() {
  return (
    <footer className="bg-carbon border-t border-neon/20 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* CTA Section */}
        <div className="mb-16 p-8 rounded-xl bg-gradient-to-br from-neon/5 to-ember/5 border border-neon/30 text-center">
          <h3 className="text-2xl font-black text-white mb-3">Ready to Standardize Your Network?</h3>
          <p className="text-steel/80 mb-6 max-w-2xl mx-auto">
            Book a Network Audit to identify pilot sites, or apply for the Co-Development Program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={BRAND.ctas.primary.href}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all"
            >
              {BRAND.ctas.primary.label}
            </Link>
            <Link 
              href={BRAND.ctas.secondary.href}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-steel/40 text-steel hover:border-neon hover:text-neon transition-all"
            >
              {BRAND.ctas.secondary.label}
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-2">
            <BrandLogo size={32} showWordmark={true} showOriginLine={true} className="mb-4" />
            <p className="text-steel text-sm mb-2">{SITE_METADATA.tagline}</p>
            <p className="text-steel/70 text-xs">YardFlow by FreightRoll — the first Yard Network System (YNS). Not a YMS. A standardized operating protocol for deterministic throughput.</p>
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
              <li><Link href="/proof" className="hover:text-neon transition-colors">Proof</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-neon text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 text-sm text-steel">
              <li><Link href="/resources/guides" className="hover:text-neon transition-colors">Guides</Link></li>
              <li><Link href="/resources/field-notes" className="hover:text-neon transition-colors">Field Notes</Link></li>
              <li><Link href="/singularity" className="hover:text-neon transition-colors">Simulations</Link></li>
              <li><Link href="/docs/economics-methodology" className="hover:text-neon transition-colors">Economics Methodology</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-neon text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm text-steel">
              <li><Link href="/co-development" className="hover:text-neon transition-colors">Co-Development</Link></li>
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
          <div className="flex items-center gap-6">
            {/* Social Links with UTM tracking */}
            <div className="flex items-center gap-4">
              <a 
                href={appendUtmToUrl(BRAND.links.linkedin, 'yardflow', 'footer', 'social')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-steel hover:text-neon transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href={appendUtmToUrl(BRAND.links.twitter, 'yardflow', 'footer', 'social')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-steel hover:text-neon transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            <span className="text-steel/30">|</span>
            <Link href="/privacy" className="hover:text-neon transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-neon transition-colors">Terms</Link>
            <a href="mailto:sales@freightroll.com" className="hover:text-neon transition-colors">sales@freightroll.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
