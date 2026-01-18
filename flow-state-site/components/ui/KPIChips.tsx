/**
 * KPI CHIPS COMPONENT
 * 
 * Purpose: Small metric indicators (outcome-focused, not feature-focused)
 * Design: Icon + number + label, arranged in grid or row
 * 
 * Usage: Proof stacks (network scale), outcome summary (operational impact), network status
 * 
 * Guidance: Use conservative metrics, sourced from BRAND.proof or case studies
 * Examples: "200K+ drivers", "58 facilities", "2.4 sec avg check-in"
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion-presets';

interface KPIChip {
  icon?: React.ReactNode;
  label: string;
  value: string;
  context?: string; // e.g., "typical deployment", "average across network"
}

interface KPIChipsProps {
  chips: KPIChip[];
  layout?: 'grid' | 'row';
  columns?: number;
  className?: string;
}

export default function KPIChips({
  chips,
  layout = 'grid',
  columns = 3,
  className = '',
}: KPIChipsProps) {
  const layoutClasses = {
    grid: `grid grid-cols-1 md:grid-cols-${columns} gap-4`,
    row: 'flex flex-wrap justify-center gap-4',
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`${layoutClasses[layout]} ${className}`}
    >
      {chips.map((chip, idx) => (
        <motion.div
          key={idx}
          variants={staggerItem}
          className="p-6 rounded-xl border border-neon/20 bg-carbon/50 hover:border-neon/40 hover:bg-carbon/70 transition-all text-center"
        >
          {/* Icon */}
          {chip.icon && (
            <div className="flex justify-center mb-3 text-neon">
              {chip.icon}
            </div>
          )}

          {/* Value */}
          <p className="text-3xl md:text-4xl font-black text-neon leading-tight">
            {chip.value}
          </p>

          {/* Label */}
          <p className="text-sm text-steel mt-2 font-semibold">
            {chip.label}
          </p>

          {/* Context (optional) */}
          {chip.context && (
            <p className="text-xs text-steel/60 mt-2 italic">
              {chip.context}
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
