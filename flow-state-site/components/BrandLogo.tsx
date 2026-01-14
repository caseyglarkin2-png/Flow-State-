'use client';

import React from 'react';
import { getActiveLogo, LOGO_VARIANTS, SITE_METADATA, type LogoVariant } from '@/lib/branding';

type Props = {
  size?: number;
  variant?: LogoVariant; // optional override
  showWordmark?: boolean;
  showOriginLine?: boolean;
  className?: string;
};

/**
 * Centralized brand logo renderer
 * Automatically uses the active variant from lib/branding.ts
 * Auto-switches to flow_micro when size <= 20px
 */
export function BrandLogo({
  size = 28,
  variant,
  showWordmark = true,
  showOriginLine = true,
  className = ''
}: Props) {
  const active = variant ? { variant, ...LOGO_VARIANTS[variant] } : getActiveLogo(size);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        role="img"
        aria-label="YardFlow"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-neon"
      >
        <g dangerouslySetInnerHTML={{ __html: active.svg }} />
      </svg>

      {showWordmark && (
        <div className="leading-tight">
          <div className="font-semibold text-white">YardFlow</div>
          {showOriginLine && (
            <div className="text-xs opacity-70">{SITE_METADATA.originLine}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default BrandLogo;
