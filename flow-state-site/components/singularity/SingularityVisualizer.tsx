'use client';

/**
 * SingularityVisualizer - Integration layer connecting calculator → visuals
 * 
 * Reads from the varianceTax store and drives the SingularityScene.
 * This is the main integration point for the singularity page.
 */

import { useMemo, useCallback, useState, useEffect } from 'react';
import { SingularityScene } from '@/components/three/SingularityScene';
import { useVarianceTaxStore } from '@/src/lib/varianceTax/store';
import { ClarityReveal } from '@/components/three/DissolveTransition';

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface SingularityVisualizerProps {
  /** Height of the visualization area */
  height?: string | number;
  /** Whether to show debug overlay */
  debug?: boolean;
  /** Content to reveal when clarity is achieved */
  clarityContent?: React.ReactNode;
  /** CSS class for container */
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function SingularityVisualizer({
  height = '600px',
  debug = false,
  clarityContent,
  className = '',
}: SingularityVisualizerProps) {
  // Read from variance tax store
  const outputs = useVarianceTaxStore((s) => s.outputs);
  
  // Track transition state
  const [phase, setPhase] = useState<'singularity' | 'clarity'>('singularity');
  const [dissolveProgress, setDissolveProgress] = useState(0);
  
  // Calculate viscosity from Reynolds score (already 0-1 range)
  const viscosity = useMemo(() => {
    if (!outputs) return 0.5;
    return outputs.reynoldsScore ?? 0.5;
  }, [outputs]);
  
  // Total cost for display
  const totalCost = outputs?.totalVarianceTax ?? 0;
  
  // Smooth viscosity transitions
  const [smoothViscosity, setSmoothViscosity] = useState(viscosity);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setSmoothViscosity((prev) => {
        const diff = viscosity - prev;
        if (Math.abs(diff) < 0.001) return viscosity;
        return prev + diff * 0.1;
      });
    }, 16);
    return () => clearInterval(timer);
  }, [viscosity]);
  
  // Handle transition completion
  const handleTransitionComplete = useCallback((newPhase: 'singularity' | 'clarity') => {
    setPhase(newPhase);
  }, []);
  
  // Trigger dissolve when synthetic capacity is high (good state)
  const shouldDissolve = useMemo(() => {
    if (!outputs) return false;
    // Dissolve when synthetic capacity > 50% (operations improving)
    return outputs.syntheticCapacityPercent > 50;
  }, [outputs]);
  
  return (
    <div 
      className={`relative ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      {/* Main visualization */}
      <SingularityScene
        viscosity={smoothViscosity}
        paused={false}
        triggerDissolve={shouldDissolve}
        onTransitionComplete={handleTransitionComplete}
        debug={debug}
        className="absolute inset-0"
      />
      
      {/* Clarity content overlay */}
      {clarityContent && (
        <ClarityReveal 
          progress={dissolveProgress}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <div className="pointer-events-auto">
            {clarityContent}
          </div>
        </ClarityReveal>
      )}
      
      {/* Viscosity indicator */}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-mono">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">Viscosity:</span>
          <div className="w-24 h-2 bg-zinc-700 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-300"
              style={{
                width: `${smoothViscosity * 100}%`,
                background: `linear-gradient(90deg, 
                  rgb(5, 172, 235) 0%, 
                  rgb(0, 255, 136) 50%, 
                  rgb(217, 20, 17) 100%
                )`,
              }}
            />
          </div>
          <span className="text-white">{(smoothViscosity * 100).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MINI VISUALIZER (for sidebar/cards)
// ═══════════════════════════════════════════════════════════════════

export interface MiniVisualizerProps {
  viscosity?: number;
  size?: number;
  className?: string;
}

export function MiniVisualizer({
  viscosity = 0.5,
  size = 200,
  className = '',
}: MiniVisualizerProps) {
  // Simplified CSS-only version for thumbnails
  const glowColor = viscosity > 0.5 
    ? `rgba(217, 20, 17, ${viscosity})` 
    : `rgba(5, 172, 235, ${1 - viscosity})`;
  
  return (
    <div 
      className={`relative rounded-full bg-void ${className}`}
      style={{ 
        width: size, 
        height: size,
        background: `radial-gradient(circle at center, 
          #000 30%, 
          ${glowColor} 50%, 
          transparent 70%
        )`,
      }}
    >
      {/* Event horizon */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
        style={{ 
          width: size * 0.3, 
          height: size * 0.3,
          boxShadow: `0 0 ${size * 0.2}px ${glowColor}`,
        }}
      />
    </div>
  );
}
