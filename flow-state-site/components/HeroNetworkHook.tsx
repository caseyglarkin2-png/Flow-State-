/**
 * HERO NETWORK HOOK - Canonical Hero Component
 * 
 * The non-negotiable network-first message used across key pages.
 * Imports from copy.ts to ensure consistency.
 */

import React from 'react';
import Link from 'next/link';
import { HERO_HEADLINES, CTAS } from '@/content/copy';

type HeroNetworkHookProps = {
  variant?: 'main' | 'alt';
  showCTAs?: boolean;
  className?: string;
};

export default function HeroNetworkHook({ 
  variant = 'main',
  showCTAs = true,
  className = ''
}: HeroNetworkHookProps) {
  const subheadline = variant === 'main' 
    ? HERO_HEADLINES.subMain 
    : HERO_HEADLINES.altSub;

  return (
    <div className={`text-center ${className}`}>
      <p className="text-neon font-mono text-sm tracking-widest mb-6 uppercase">
        {HERO_HEADLINES.tagline}
      </p>
      
      <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95]">
        <span className="text-white">You don't have 50 yards.</span>
        <br />
        <span className="text-neon drop-shadow-[0_0_30px_rgba(0,180,255,0.5)] mt-4 block">
          You have one network.
        </span>
      </h1>
      
      <p className="text-xl md:text-2xl text-steel/90 mb-10 max-w-3xl mx-auto leading-relaxed">
        {subheadline}
      </p>

      {showCTAs && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={CTAS.primary.yardbuilder.href}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all"
          >
            {CTAS.primary.yardbuilder.label}
          </Link>
          <Link
            href={CTAS.secondary.roi.href}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 border-steel/40 text-steel hover:border-neon hover:text-neon transition-all"
          >
            {CTAS.secondary.roi.label}
          </Link>
        </div>
      )}
    </div>
  );
}
