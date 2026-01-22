'use client';

import React from 'react';
import Card from '../Card';

interface NetworkEffectCardProps {
  className?: string;
}

export default function NetworkEffectCard({ className = '' }: NetworkEffectCardProps) {
  return (
    <Card hover className={`rounded-2xl border border-neon/20 bg-void/50 ${className}`}>
      <div role="article" aria-label="Network effect" className="flex items-center gap-6">
        <div className="flex-shrink-0 h-24 w-24 rounded-lg bg-gradient-to-br from-neon/20 to-neon/5 border border-neon/30 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-4 w-4 rounded-full bg-neon/70" />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-1">Network Compounding</p>
          <h3 className="text-xl font-bold text-white">Scale Across All Facilities</h3>
          <p className="mt-2 text-steel leading-relaxed">
            Protocol adoption compounds across the network — throughput becomes predictable and margin returns.
          </p>
        </div>
      </div>
    </Card>
  );
}
