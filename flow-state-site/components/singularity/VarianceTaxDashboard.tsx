'use client';

/**
 * VarianceTaxDashboard - Unified calculator + visualization experience
 * 
 * Combines the CalculatorPanel with SingularityVisualizer for a 
 * cohesive experience where inputs drive visual feedback in real-time.
 * 
 * SingularityVisualizer is dynamically imported to avoid loading
 * three.js (~950KB) in the main bundle.
 */

import { useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import CalculatorPanel from '@/components/singularity/CalculatorPanel';
import TaxBreakdown from '@/components/singularity/TaxBreakdown';
import { useVarianceTaxStore } from '@/src/lib/varianceTax/store';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

// Dynamic import to avoid loading three.js in main bundle
const SingularityVisualizer = dynamic(
  () => import('@/components/singularity/SingularityVisualizer').then((mod) => mod.SingularityVisualizer),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-carbon/50 rounded-2xl flex items-center justify-center">
        <div className="text-steel text-sm">Loading visualization...</div>
      </div>
    ),
  }
);

const MiniVisualizer = dynamic(
  () => import('@/components/singularity/SingularityVisualizer').then((mod) => mod.MiniVisualizer),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-carbon/50 rounded-lg flex items-center justify-center">
        <div className="text-steel text-xs">Loading...</div>
      </div>
    ),
  }
);

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface VarianceTaxDashboardProps {
  /** Layout mode */
  layout?: 'split' | 'stacked' | 'overlay';
  /** Show the breakdown component */
  showBreakdown?: boolean;
  /** Debug mode */
  debug?: boolean;
  /** CSS class for container */
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════
// LAYOUT: SPLIT (side-by-side)
// ═══════════════════════════════════════════════════════════════════

function SplitLayout({ 
  showBreakdown, 
  debug 
}: { 
  showBreakdown: boolean; 
  debug: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Calculator */}
      <div className="space-y-6">
        <CalculatorPanel />
        {showBreakdown && <TaxBreakdown />}
      </div>
      
      {/* Right: Visualization */}
      <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
        <SingularityVisualizer 
          height="100%"
          debug={debug}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LAYOUT: STACKED (vertical)
// ═══════════════════════════════════════════════════════════════════

function StackedLayout({ 
  showBreakdown, 
  debug 
}: { 
  showBreakdown: boolean; 
  debug: boolean;
}) {
  return (
    <div className="space-y-8">
      {/* Visualization */}
      <SingularityVisualizer 
        height="400px"
        debug={debug}
        className="rounded-2xl overflow-hidden"
      />
      
      {/* Calculator */}
      <CalculatorPanel />
      
      {/* Breakdown */}
      {showBreakdown && <TaxBreakdown />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LAYOUT: OVERLAY (visualization as background)
// ═══════════════════════════════════════════════════════════════════

function OverlayLayout({ 
  showBreakdown, 
  debug 
}: { 
  showBreakdown: boolean; 
  debug: boolean;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Visualization as background */}
      <div className="absolute inset-0">
        <SingularityVisualizer 
          height="100%"
          debug={debug}
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-2xl space-y-6">
          <div className="bg-void/80 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800">
            <CalculatorPanel />
          </div>
          
          {showBreakdown && (
            <div className="bg-void/80 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800">
              <TaxBreakdown />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function VarianceTaxDashboard({
  layout = 'split',
  showBreakdown = true,
  debug = false,
  className = '',
}: VarianceTaxDashboardProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Force stacked layout on mobile
  const effectiveLayout = isMobile ? 'stacked' : layout;
  
  return (
    <div className={className}>
      {effectiveLayout === 'split' && (
        <SplitLayout showBreakdown={showBreakdown} debug={debug} />
      )}
      {effectiveLayout === 'stacked' && (
        <StackedLayout showBreakdown={showBreakdown} debug={debug} />
      )}
      {effectiveLayout === 'overlay' && (
        <OverlayLayout showBreakdown={showBreakdown} debug={debug} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COMPACT VERSION (for embedding)
// ═══════════════════════════════════════════════════════════════════

export interface CompactDashboardProps {
  /** Initial viscosity preview */
  initialViscosity?: number;
  /** Show expand button */
  expandable?: boolean;
  /** Called when expand is clicked */
  onExpand?: () => void;
  /** CSS class */
  className?: string;
}

export function CompactDashboard({
  initialViscosity = 0.5,
  expandable = true,
  onExpand,
  className = '',
}: CompactDashboardProps) {
  const viscosity = useVarianceTaxStore((s) => {
    if (!s.outputs) return initialViscosity;
    return s.outputs.reynoldsScore ?? initialViscosity;
  });
  
  const totalCost = useVarianceTaxStore((s) => s.outputs?.totalVarianceTax ?? 0);
  
  return (
    <div className={`bg-void border border-zinc-800 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center gap-6">
        {/* Mini visualization */}
        <MiniVisualizer 
          viscosity={viscosity}
          size={120}
        />
        
        {/* Summary */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            Variance Tax Impact
          </h3>
          <p className="text-3xl font-bold text-neon mb-2">
            ${totalCost.toLocaleString()}
          </p>
          <p className="text-sm text-zinc-400">
            Annual recoverable cost
          </p>
        </div>
        
        {/* Expand button */}
        {expandable && (
          <button
            onClick={onExpand}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Expand
          </button>
        )}
      </div>
    </div>
  );
}
