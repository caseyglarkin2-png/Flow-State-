/**
 * CTAGroup Component
 * 
 * Standardized CTA hierarchy for conversion-ready pages.
 * Ensures consistent button styling and messaging across the site.
 * 
 * Usage:
 * <CTAGroup />
 * <CTAGroup showTertiary={false} />
 * <CTAGroup primaryOnly />
 */

import React from 'react';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import { FlowArrow } from '@/components/icons/FlowIcons';

interface CTAGroupProps {
  showTertiary?: boolean;
  primaryOnly?: boolean;
  className?: string;
  variant?: 'horizontal' | 'vertical';
}

export default function CTAGroup({ 
  showTertiary = true,
  primaryOnly = false,
  className = '',
  variant = 'horizontal'
}: CTAGroupProps) {
  const containerClass = variant === 'vertical' 
    ? 'flex flex-col gap-4'
    : 'flex flex-col sm:flex-row gap-4';

  if (primaryOnly) {
    return (
      <div className={`${containerClass} ${className}`}>
        <Link 
          href={BRAND.ctas.primary.href}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all"
        >
          {BRAND.ctas.primary.label}
          <FlowArrow size={16} className="text-void" />
        </Link>
      </div>
    );
  }

  return (
    <div className={`${containerClass} ${className}`}>
      {/* Primary CTA */}
      <Link 
        href={BRAND.ctas.primary.href}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all"
      >
        {BRAND.ctas.primary.label}
        <FlowArrow size={16} className="text-void" />
      </Link>

      {/* Secondary CTA */}
      <Link 
        href={BRAND.ctas.secondary.href}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-steel/40 text-steel hover:border-neon hover:text-neon transition-all"
      >
        {BRAND.ctas.secondary.label}
      </Link>

      {/* Tertiary CTA */}
      {showTertiary && (
        <Link 
          href={BRAND.ctas.tertiary.href}
          className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-base text-steel/80 hover:text-neon transition-all underline"
        >
          {BRAND.ctas.tertiary.label}
        </Link>
      )}
    </div>
  );
}
