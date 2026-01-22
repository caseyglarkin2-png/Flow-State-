'use client';

import React from 'react';
import Card from '../Card';

interface SingularityCardProps {
  className?: string;
}

export default function SingularityCard({ className = '' }: SingularityCardProps) {
  return (
    <Card hover className={`rounded-2xl border border-neon/20 bg-void/50 ${className}`}>
      <div role="article" aria-label="Singularity proof engine" className="flex items-center gap-6">
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          aria-label="Singularity grid"
          role="img"
          className="flex-shrink-0"
        >
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00B4FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00B4FF" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="128" height="128" fill="transparent" />
          {Array.from({ length: 32 }).map((_, i) => {
            const cols = 8;
            const x = (i % cols) * 14 + 12;
            const y = Math.floor(i / cols) * 14 + 12;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={3} fill="#0EA5E9" />
                <circle cx={x} cy={y} r={8} fill="url(#nodeGlow)" />
              </g>
            );
          })}
          {/* subtle connections */}
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={`l-${i}`}
              x1={(i % 6) * 20 + 12}
              y1={Math.floor(i / 6) * 20 + 12}
              x2={(i % 6) * 20 + 22}
              y2={Math.floor(i / 6) * 20 + 22}
              stroke="#0EA5E9"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
          ))}
        </svg>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-1">Proof Engine</p>
          <h3 className="text-xl font-bold text-white">Singularity Simulation</h3>
          <p className="mt-2 text-steel leading-relaxed">
            Deterministic protocol x network scale. Visualizes variance collapse as adoption grows across facilities.
          </p>
        </div>
      </div>
    </Card>
  );
}
