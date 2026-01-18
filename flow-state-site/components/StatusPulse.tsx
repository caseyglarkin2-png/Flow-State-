/**
 * STATUS PULSE
 * Subtle indicator showing "system is live"
 * Conveys operational reality
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from './motion/ReducedMotion';

interface StatusPulseProps {
  status?: 'active' | 'warning' | 'inactive';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

const colorMap = {
  active: {
    dot: 'bg-neon',
    ring: 'ring-neon/30',
    text: 'text-neon',
  },
  warning: {
    dot: 'bg-ember',
    ring: 'ring-ember/30',
    text: 'text-ember',
  },
  inactive: {
    dot: 'bg-steel',
    ring: 'ring-steel/30',
    text: 'text-steel',
  },
};

export default function StatusPulse({
  status = 'active',
  label,
  size = 'md',
  className = '',
}: StatusPulseProps) {
  const { prefersReducedMotion } = useReducedMotion();
  const colors = colorMap[status];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        {/* Dot */}
        <motion.div
          className={`rounded-full ${sizeMap[size]} ${colors.dot}`}
          animate={
            !prefersReducedMotion && status === 'active'
              ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Pulse ring */}
        {!prefersReducedMotion && status === 'active' && (
          <motion.div
            className={`absolute inset-0 rounded-full ring-4 ${colors.ring}`}
            animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </div>

      {label && (
        <span className={`text-sm font-medium ${colors.text}`}>
          {label}
        </span>
      )}
    </div>
  );
}
