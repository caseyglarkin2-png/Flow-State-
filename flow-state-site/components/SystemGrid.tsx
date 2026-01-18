/**
 * SYSTEM GRID BACKGROUND
 * Subtle animated grid suggesting "digital twin / live system"
 * Respects prefers-reduced-motion
 */

'use client';

import React from 'react';
import { useReducedMotion } from './motion/ReducedMotion';

interface SystemGridProps {
  opacity?: number;
  pulsing?: boolean;
  className?: string;
}

export default function SystemGrid({
  opacity = 0.15,
  pulsing = true,
  className = '',
}: SystemGridProps) {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 180, 255, ${opacity * 0.3}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 180, 255, ${opacity * 0.3}) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation:
            !prefersReducedMotion && pulsing
              ? 'grid-move 20s linear infinite'
              : 'none',
        }}
      />

      {/* Radial fade */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, #050505 100%)',
        }}
      />

      {/* Pulse overlay (subtle) */}
      {!prefersReducedMotion && pulsing && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(0, 180, 255, ${
              opacity * 0.1
            }), transparent 70%)`,
            animation: 'pulse-grid 4s ease-in-out infinite',
          }}
        />
      )}

      <style jsx>{`
        @keyframes pulse-grid {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
