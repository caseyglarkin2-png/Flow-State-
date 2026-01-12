"use client";

import React from 'react';

/**
 * Visual representation of the Standardization Band concept:
 * 5 different facilities (varied colored blocks) with a common standardized layer
 * running horizontally through all of them - representing the driver journey standardization
 */
export default function StandardizationBandVisual() {
  // Each facility has unique characteristics (represented by different block patterns)
  const facilities = [
    { name: 'Retail DC', blocks: ['#FF2A00', '#0088FF', '#444', '#00FF88', '#FFB800', '#444', '#FF2A00', '#0088FF', '#8B4789', '#0088FF', '#FF2A00', '#0088FF'] },
    { name: 'Port Terminal', blocks: ['#0055BB', '#001133', '#0088FF', '#8B8B8B', '#444', '#001133', '#FF2A00', '#8B8B8B', '#0088FF', '#FFB800', '#0088FF', '#001133', '#00472B'] },
    { name: 'Mfg Plant', blocks: ['#FFB800', '#0088FF', '#FF2A00', '#0088FF', '#FFB800', '#00472B', '#FF2A00', '#88DD88', '#00472B', '#8B8B8B', '#0088FF', '#FFB800', '#FFB800'] },
    { name: 'Cross-Dock', blocks: ['#00884F', '#0088FF', '#444', '#0088FF', '#00884F', '#FF2A00', '#0088FF', '#FFB800', '#00884F', '#FFB800', '#0088FF', '#FF2A00', '#0088FF', '#FFB800'] },
    { name: '3PL Warehouse', blocks: ['#FFD700', '#0088FF', '#FFD700', '#8B8B8B', '#0088FF', '#FFB800', '#00472B', '#001133', '#0088FF', '#88DD88', '#FFB800', '#FFD700', '#00884F', '#FFB800', '#8B8B8B', '#00FF88'] },
  ];

  // The standardization band (row index 5-6) - this is the common layer
  const standardBandRow = 5;

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <p className="text-steel/80 text-sm font-mono uppercase tracking-wider mb-2">Before</p>
        <p className="text-steel/60 text-xs max-w-2xl mx-auto">Every facility operates differently. No common data layer.</p>
      </div>

      {/* Before: Scattered blocks */}
      <div className="flex justify-center gap-8 mb-8">
        {facilities.map((facility, i) => (
          <div key={i} className="flex flex-col gap-1">
            {facility.blocks.slice(0, 12).map((color, j) => (
              <div 
                key={j}
                className="w-8 h-4"
                style={{ backgroundColor: color }}
              />
            ))}
            <p className="text-xs text-steel/40 text-center mt-2 font-mono">{facility.name}</p>
          </div>
        ))}
      </div>

      {/* Arrow */}
      <div className="flex justify-center my-6">
        <svg className="w-16 h-16 text-neon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="text-center mb-8">
        <p className="text-neon text-sm font-mono uppercase tracking-wider mb-2">After: Standardized Driver Journey</p>
        <p className="text-steel/80 text-xs max-w-2xl mx-auto">
          The middle band (rows 5-7) is identical across all facilities: QR check-in → timestamps → instructions
        </p>
      </div>

      {/* After: With standardization band */}
      <div className="relative">
        {/* Highlight box for the standardization band */}
        <div 
          className="absolute left-0 right-0 border-2 border-neon bg-neon/5 pointer-events-none"
          style={{ 
            top: `${(standardBandRow / 12) * 100}%`, 
            height: `${(3 / 12) * 100}%` 
          }}
        >
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-full bg-neon"></div>
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-full bg-neon"></div>
        </div>

        <div className="flex justify-center gap-8">
          {facilities.map((facility, i) => (
            <div key={i} className="flex flex-col gap-1 relative">
              {facility.blocks.slice(0, 12).map((color, j) => {
                const isStandardBand = j >= standardBandRow && j < standardBandRow + 3;
                return (
                  <div 
                    key={j}
                    className={`w-8 h-4 transition-all ${isStandardBand ? 'ring-1 ring-neon/40' : ''}`}
                    style={{ 
                      backgroundColor: isStandardBand ? '#8B8B8B' : color,
                    }}
                  />
                );
              })}
              <p className="text-xs text-steel/40 text-center mt-2 font-mono">{facility.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-12 max-w-4xl mx-auto grid grid-cols-3 gap-4 text-sm">
        <div className="glass-card p-4 border-steel/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-red-500"></div>
            <span className="text-white font-semibold">Facility-Specific</span>
          </div>
          <p className="text-steel/70 text-xs">Unique workflows, equipment, layouts per site</p>
        </div>
        <div className="glass-card p-4 border-neon/40 bg-neon/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-steel"></div>
            <span className="text-neon font-semibold">Standardized Band</span>
          </div>
          <p className="text-steel/80 text-xs">Driver journey identical across all facilities</p>
        </div>
        <div className="glass-card p-4 border-steel/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-green-500"></div>
            <span className="text-white font-semibold">Facility-Specific</span>
          </div>
          <p className="text-steel/70 text-xs">Dock doors, jockeys, warehouse ops</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-neon font-semibold text-sm">
          Result: <span className="text-white">Network-wide data interoperability</span> without sacrificing facility autonomy
        </p>
      </div>
    </div>
  );
}
