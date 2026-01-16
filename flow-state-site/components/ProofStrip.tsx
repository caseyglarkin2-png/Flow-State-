/**
 * ProofStrip Component
 * 
 * Displays credibility/proof points (e.g., "200K+ drivers | Built by FreightRoll")
 * Used to bridge the gap between "smart narrative" and "real product."
 * 
 * Usage:
 * <ProofStrip />
 * <ProofStrip variant="compact" />
 */

import React from 'react';
import { BRAND } from '@/config/brand';
import { Shield } from '@/components/icons/FlowIcons';

interface ProofStripProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export default function ProofStrip({ variant = 'default', className = '' }: ProofStripProps) {
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-3 text-sm ${className}`}>
        <span className="text-steel/60">{BRAND.proof.tagline}</span>
        <span className="text-neon font-mono font-bold">{BRAND.proof.drivers}</span>
        <span className="text-steel/60">{BRAND.proof.label}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-8 py-6 px-6 bg-carbon/40 border-y border-steel/20 ${className}`}>
      <div className="flex items-center gap-3">
        <Shield size={20} className="text-neon/60" />
        <span className="text-steel/70 text-sm">{BRAND.proof.tagline}</span>
      </div>
      <div className="h-6 w-px bg-steel/30"></div>
      <div className="flex items-center gap-2">
        <span className="text-3xl font-black text-neon font-mono">{BRAND.proof.drivers}</span>
        <span className="text-steel/70 text-sm">{BRAND.proof.label}</span>
      </div>
    </div>
  );
}
