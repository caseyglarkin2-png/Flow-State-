'use client';

import React from 'react';
import Card from '../Card';
import { Shield, Metrics } from '@/components/icons/FlowIcons';

interface ProductCardProps {
  className?: string;
}

export default function ProductCard({ className = '' }: ProductCardProps) {
  return (
    <Card hover className={`rounded-2xl border border-neon/20 bg-void/50 ${className}`}>
      <div role="article" aria-label="Product overview" className="flex items-center gap-6">
        <div className="flex flex-col gap-3 text-neon">
          <Shield size={36} />
          <Metrics size={36} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-1">Protocol Modules</p>
          <h3 className="text-xl font-bold text-white">The Product is the Protocol</h3>
          <p className="mt-2 text-steel leading-relaxed">
            Guard, Comms, BOL, YMS — one standardized driver journey. Same steps, same proof, every yard.
          </p>
        </div>
      </div>
    </Card>
  );
}
