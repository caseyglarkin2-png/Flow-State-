'use client';

import React from 'react';

// CSS-only animated visuals for Product sections - lighter than Framer Motion

export function DigitalGuardVisual() {
  return (
    <div className="relative w-full h-64 rounded-lg bg-gradient-to-br from-carbon via-carbon/80 to-neon/10 border border-neon/20 overflow-hidden">
      {/* Gate Scanner Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-40 border-2 border-neon/40 rounded-lg relative overflow-hidden">
          {/* Scanning line */}
          <div className="absolute w-full h-0.5 bg-neon/60 animate-scan" />
          
          {/* ID placeholder */}
          <div className="absolute top-4 left-4 right-4 h-6 bg-neon/10 rounded" />
          <div className="absolute top-14 left-4 right-4 h-3 bg-steel/20 rounded" />
          <div className="absolute top-20 left-4 right-4 h-3 bg-steel/20 rounded" />
          
          {/* Check mark */}
          <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-neon/20 flex items-center justify-center">
            <span className="text-neon text-xs">✓</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-3 left-3 text-xs text-steel/60 font-mono">GATE VERIFY</div>
    </div>
  );
}

export function DigitalCommsVisual() {
  return (
    <div className="relative w-full h-64 rounded-lg bg-gradient-to-br from-carbon via-carbon/80 to-ember/10 border border-ember/20 overflow-hidden">
      {/* Message bubbles */}
      <div className="absolute inset-4 flex flex-col justify-center gap-3">
        <div className="self-start px-3 py-2 bg-ember/20 rounded-lg rounded-bl-none max-w-[70%] animate-fadeIn1">
          <div className="text-xs text-steel/80">Dock 7 ready</div>
        </div>
        <div className="self-end px-3 py-2 bg-neon/20 rounded-lg rounded-br-none max-w-[70%] animate-fadeIn2">
          <div className="text-xs text-steel/80">En route - 2 min</div>
        </div>
        <div className="self-start px-3 py-2 bg-ember/20 rounded-lg rounded-bl-none max-w-[70%] animate-fadeIn3">
          <div className="text-xs text-steel/80">Confirmed ✓</div>
        </div>
      </div>
      
      <div className="absolute bottom-3 left-3 text-xs text-steel/60 font-mono">SMS · 40+ LANGUAGES</div>
    </div>
  );
}

export function DigitalBOLVisual() {
  return (
    <div className="relative w-full h-64 rounded-lg bg-gradient-to-br from-carbon via-carbon/80 to-steel/10 border border-steel/30 overflow-hidden">
      {/* Document */}
      <div className="absolute inset-6 flex items-center justify-center">
        <div className="w-40 bg-white/5 rounded border border-steel/30 p-3">
          <div className="h-2 w-16 bg-steel/30 rounded mb-2" />
          <div className="h-1.5 w-full bg-steel/20 rounded mb-1" />
          <div className="h-1.5 w-full bg-steel/20 rounded mb-1" />
          <div className="h-1.5 w-3/4 bg-steel/20 rounded mb-3" />
          
          {/* Signature line */}
          <div className="border-t border-dashed border-steel/30 pt-2 mt-2">
            <div className="h-4 w-20 bg-neon/20 rounded animate-pulse" />
          </div>
          
          {/* Timestamp */}
          <div className="mt-2 text-[8px] text-steel/40 font-mono">2026-01-14T10:42:18Z</div>
        </div>
      </div>
      
      <div className="absolute bottom-3 left-3 text-xs text-steel/60 font-mono">TOUCHLESS BOL</div>
    </div>
  );
}

export function DigitalYMSVisual() {
  return (
    <div className="relative w-full h-64 rounded-lg bg-gradient-to-br from-carbon via-carbon/80 to-neon/5 border border-neon/20 overflow-hidden">
      {/* Yard grid */}
      <div className="absolute inset-4">
        <div className="grid grid-cols-4 gap-2 h-full">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`rounded border transition-all duration-500 ${
                i === 2 ? 'border-neon bg-neon/20 animate-pulse' :
                i === 5 ? 'border-ember/50 bg-ember/10' :
                'border-steel/30 bg-steel/5'
              }`}
            >
              {i === 2 && (
                <div className="flex items-center justify-center h-full text-[10px] text-neon font-mono">
                  T-142
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-3 left-3 text-xs text-steel/60 font-mono">REAL-TIME YARD</div>
    </div>
  );
}
