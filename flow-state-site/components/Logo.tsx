'use client';

import React from 'react';
import { BrandLogo } from '@/components/BrandLogo';

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Legacy Logo export for backward compatibility
 * Use <BrandLogo /> directly in new code
 * 
 * Automatically uses the active logo variant from lib/branding.ts
 * Change DEFAULT_VARIANT in branding.ts to switch logos site-wide
 */
export default function Logo({ size = 24, className = '' }: LogoProps) {
  return <BrandLogo size={size} className={className} showWordmark={false} />;
}
