/**
 * CompareStrip - Status Quo vs YardFlow comparison
 * Quick visual showing the before/after
 */

import React from 'react';
import { X, Check } from 'lucide-react';

interface CompareItem {
  statusQuo: string;
  yardFlow: string;
}

interface CompareStripProps {
  items: CompareItem[];
  /** Optional title */
  title?: string;
}

export default function CompareStrip({ items, title = 'Status Quo vs YardFlow' }: CompareStripProps) {
  return (
    <div className="rounded-2xl border border-neon/20 bg-carbon/30 overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-neon/10 bg-carbon/50">
          <h3 className="text-base font-semibold text-white">{title}</h3>
        </div>
      )}
      <div className="divide-y divide-neon/10">
        {/* Header */}
        <div className="grid grid-cols-2">
          <div className="px-6 py-3 bg-ember/5">
            <span className="text-xs uppercase tracking-[0.15em] text-ember/70 font-semibold">Status Quo</span>
          </div>
          <div className="px-6 py-3 bg-neon/5">
            <span className="text-xs uppercase tracking-[0.15em] text-neon/70 font-semibold">YardFlow</span>
          </div>
        </div>
        {/* Rows */}
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-2">
            <div className="px-6 py-4 flex items-start gap-3">
              <X className="w-4 h-4 text-ember/70 shrink-0 mt-0.5" />
              <span className="text-sm text-steel">{item.statusQuo}</span>
            </div>
            <div className="px-6 py-4 flex items-start gap-3 bg-neon/5">
              <Check className="w-4 h-4 text-neon shrink-0 mt-0.5" />
              <span className="text-sm text-white">{item.yardFlow}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
