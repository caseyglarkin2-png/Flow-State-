"use client";

import React, { useState, useEffect } from 'react';

type StandardizationBandProps = {
  animated?: boolean;
  compact?: boolean;
};

/**
 * STANDARDIZATION BAND MOTIF
 * 
 * Visual representation of Flow State's core thesis:
 * - Top row: Every yard is different (chaos, unique workflows, local optimizations)
 * - Middle band: The standardized driver journey (QR check-in, defensible timestamps, reason codes)
 * - Bottom row: Network becomes possible (shared intelligence, benchmarking, control)
 * 
 * This is the operating model. This is why we're network-first.
 */
export default function StandardizationBand({ animated = true, compact = false }: StandardizationBandProps) {
  const [phase, setPhase] = useState<'chaos' | 'standardized'>('chaos');

  useEffect(() => {
    if (!animated) {
      setPhase('standardized');
      return;
    }

    const timer = setTimeout(() => {
      setPhase('standardized');
    }, 2000);

    return () => clearTimeout(timer);
  }, [animated]);

  const facilities = [
    { name: 'DC-1', chaos: 'Clipboard', height: compact ? 60 : 80 },
    { name: 'DC-2', chaos: 'Guard tower', height: compact ? 50 : 70 },
    { name: 'DC-3', chaos: 'Radio calls', height: compact ? 70 : 90 },
    { name: 'DC-4', chaos: 'Paper BOL', height: compact ? 55 : 75 },
    { name: 'DC-5', chaos: 'Manual entry', height: compact ? 65 : 85 },
  ];

  const standardLayer = {
    label: 'DRIVER JOURNEY',
    items: ['QR Check-in', 'Timestamp', 'Reason Code', 'Instructions', 'Check-out'],
  };

  return (
    <div className="w-full">
      {/* Before State (Chaos) */}
      <div className={`grid grid-cols-5 gap-2 mb-4 transition-opacity duration-1000 ${phase === 'standardized' ? 'opacity-40' : 'opacity-100'}`}>
        {facilities.map((facility, i) => (
          <div key={i} className="flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-b from-ember/20 to-ember/5 border border-ember/30 rounded-lg flex items-center justify-center text-center p-2 transition-all duration-500"
              style={{ height: `${facility.height}px` }}
            >
              <div>
                <p className="text-ember text-xs font-mono mb-1">{facility.name}</p>
                <p className="text-steel/60 text-[10px]">{facility.chaos}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow Down */}
      {animated && (
        <div className={`flex justify-center mb-4 transition-opacity duration-500 ${phase === 'standardized' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-neon text-2xl font-black">↓</div>
        </div>
      )}

      {/* Standardization Band */}
      <div className={`mb-4 transition-all duration-1000 ${phase === 'standardized' ? 'scale-105 opacity-100' : 'scale-100 opacity-60'}`}>
        <div className="bg-gradient-to-r from-neon/20 via-neon/30 to-neon/20 border-2 border-neon rounded-xl p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-neon font-mono text-xs font-bold tracking-wider">
              {standardLayer.label}
            </div>
            <div className="flex gap-1 flex-1 justify-end">
              {standardLayer.items.map((item, i) => (
                <div 
                  key={i} 
                  className="px-2 py-1 bg-neon/10 border border-neon/40 rounded text-[10px] text-neon/90 font-medium whitespace-nowrap"
                  style={{
                    animationDelay: `${i * 150}ms`,
                    animation: phase === 'standardized' ? 'pulse-subtle 2s ease-in-out infinite' : 'none'
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* After State (Standardized) */}
      <div className={`grid grid-cols-5 gap-2 transition-opacity duration-1000 ${phase === 'standardized' ? 'opacity-100' : 'opacity-40'}`}>
        {facilities.map((facility, i) => (
          <div key={i} className="flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-b from-neon/10 to-carbon/50 border border-neon/40 rounded-xl flex items-center justify-center text-center p-2 transition-all duration-500"
              style={{ height: `${compact ? 60 : 80}px` }}
            >
              <div>
                <p className="text-neon text-xs font-mono mb-1">{facility.name}</p>
                <p className="text-steel/80 text-[10px]">Network ready</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-full bg-ember/40 mt-1 flex-shrink-0"></div>
          <div>
            <p className="text-white font-semibold mb-1">Before: Chaos</p>
            <p className="text-steel/70 text-xs">Every yard has unique processes. No standardization. No network intelligence.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-full bg-neon mt-1 flex-shrink-0"></div>
          <div>
            <p className="text-neon font-semibold mb-1">The Band: Standardized Driver Journey</p>
            <p className="text-steel/70 text-xs">Same check-in, timestamps, reason codes, instructions at every facility. Ground Source Truth.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-3 h-3 rounded-full bg-neon/40 mt-1 flex-shrink-0"></div>
          <div>
            <p className="text-white font-semibold mb-1">After: Network Control</p>
            <p className="text-steel/70 text-xs">Shared intelligence, cross-site benchmarking, predictive alerts. The network wakes up.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
