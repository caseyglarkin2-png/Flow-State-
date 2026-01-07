'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-carbon border-t border-neon/20 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 flex items-center justify-center">
                <Image src="/favicon.svg" alt="YardFlow by FreightRoll" width={28} height={28} className="w-7 h-7" />
              </div>
              <span className="font-bold text-neon">YARDFLOW</span>
            </div>
            <p className="text-steel text-sm mb-2">Industrial fluidity. Yard orchestration. Ground source truth.</p>
            <p className="text-steel/60 text-xs">A FreightRoll product</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-neon">Product</h3>
            <ul className="space-y-2 text-sm text-steel">
              <li><Link href="/product" className="hover:text-neon transition-colors">Product Overview</Link></li>
              <li><Link href="/yardbuilder" className="hover:text-neon transition-colors">YardBuilder</Link></li>
              <li><Link href="/roi" className="hover:text-neon transition-colors">ROI Calculator</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4 text-neon">Solutions</h3>
            <ul className="space-y-2 text-sm text-steel">
              <li><Link href="/solutions" className="hover:text-neon transition-colors">Solutions Overview</Link></li>
              <li><Link href="/singularity" className="hover:text-neon transition-colors">Founding Member Program</Link></li>
              <li><Link href="/case-studies/primo-network" className="hover:text-neon transition-colors">Case Studies</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-neon">Company</h3>
            <ul className="space-y-2 text-sm text-steel">
              <li><Link href="/about" className="hover:text-neon transition-colors">About</Link></li>
              <li><Link href="/pricing" className="hover:text-neon transition-colors">Pricing</Link></li>
              <li><Link href="/security" className="hover:text-neon transition-colors">Security</Link></li>
              <li><Link href="/integrations" className="hover:text-neon transition-colors">Integrations</Link></li>
              <li><Link href="/implementation" className="hover:text-neon transition-colors">Implementation</Link></li>
              <li><Link href="/compare" className="hover:text-neon transition-colors">Compare</Link></li>
              <li><Link href="/faq" className="hover:text-neon transition-colors">FAQ</Link></li>
              <li><Link href="/press" className="hover:text-neon transition-colors">Press</Link></li>
              <li><Link href="/status" className="hover:text-neon transition-colors">Status</Link></li>
              <li><Link href="/changelog" className="hover:text-neon transition-colors">Changelog</Link></li>
              <li><Link href="/privacy" className="hover:text-neon transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-neon transition-colors">Terms</Link></li>
              <li><Link href="/contact" className="hover:text-neon transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neon/10 pt-8 flex items-center justify-between text-sm text-steel">
          <p>&copy; 2026 YardFlow by FreightRoll. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="mailto:casey@freightroll.com" className="hover:text-neon transition-colors">Email</a>
            <Link href="/pricing" className="hover:text-neon transition-colors">Pricing</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
