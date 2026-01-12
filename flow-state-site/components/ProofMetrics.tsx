/**
 * PROOF METRICS - Canonical Metrics Display
 * 
 * Shows the 70%/65%/50%/8 weeks metrics consistently.
 * Imports from copy.ts to prevent contradictions.
 */

import React from 'react';
import { PROOF_METRICS, PROOF } from '@/content/copy';

type ProofMetricsProps = {
  variant?: 'hero' | 'grid' | 'compact';
  showDisclaimer?: boolean;
  className?: string;
};

export default function ProofMetrics({ 
  variant = 'grid',
  showDisclaimer = true,
  className = ''
}: ProofMetricsProps) {
  
  if (variant === 'hero') {
    // Compact version for hero section (3 metrics inline)
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
        <div className="p-4 rounded-lg border border-steel/30 bg-carbon/40 text-center">
          <p className="text-neon font-bold text-3xl mb-1">{PROOF_METRICS.gateLabor.value}</p>
          <p className="text-steel/80 text-sm">{PROOF_METRICS.gateLabor.label}</p>
        </div>
        <div className="p-4 rounded-lg border border-steel/30 bg-carbon/40 text-center">
          <p className="text-neon font-bold text-3xl mb-1">{PROOF_METRICS.dwell.value}</p>
          <p className="text-steel/80 text-sm">{PROOF_METRICS.dwell.label}</p>
          <p className="text-steel/60 text-xs mt-1">{PROOF_METRICS.dwell.detail}</p>
        </div>
        <div className="p-4 rounded-lg border border-steel/30 bg-carbon/40 text-center">
          <p className="text-neon font-bold text-3xl mb-1">{PROOF_METRICS.detention.value}</p>
          <p className="text-steel/80 text-sm">{PROOF_METRICS.detention.label}</p>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    // Single-line compact version
    return (
      <div className={`flex gap-8 justify-center text-center ${className}`}>
        <div>
          <p className="text-2xl font-black text-neon">{PROOF_METRICS.gateLabor.value}</p>
          <p className="text-steel text-xs">{PROOF_METRICS.gateLabor.label}</p>
        </div>
        <div>
          <p className="text-2xl font-black text-white">{PROOF_METRICS.detention.value}</p>
          <p className="text-steel text-xs">{PROOF_METRICS.detention.label}</p>
        </div>
        <div>
          <p className="text-2xl font-black text-white">{PROOF_METRICS.dwell.value}</p>
          <p className="text-steel text-xs">{PROOF_METRICS.dwell.label}</p>
        </div>
      </div>
    );
  }

  // Default: Full grid with all metrics
  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <p className="text-3xl md:text-4xl font-black text-neon">{PROOF_METRICS.gateLabor.value}</p>
          <p className="text-steel text-sm mt-1">{PROOF_METRICS.gateLabor.label}</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-black text-white">{PROOF_METRICS.detention.value}</p>
          <p className="text-steel text-sm mt-1">{PROOF_METRICS.detention.label}</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-black text-white">{PROOF_METRICS.dwell.value}</p>
          <p className="text-steel text-sm mt-1">
            {PROOF_METRICS.dwell.label}
            <span className="block text-xs text-steel/60 mt-0.5">{PROOF_METRICS.dwell.detail}</span>
          </p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-black text-white">{PROOF_METRICS.deployment.value}</p>
          <p className="text-steel text-sm mt-1">{PROOF_METRICS.deployment.label}</p>
        </div>
      </div>
      
      {showDisclaimer && (
        <p className="text-center text-steel/50 text-xs mt-6">
          {PROOF.credibility}
        </p>
      )}
    </div>
  );
}
