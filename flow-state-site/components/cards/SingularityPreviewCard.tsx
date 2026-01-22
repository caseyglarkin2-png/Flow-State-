'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSSRSafeReducedMotion } from '@/lib/ssr-safe-motion';
import clsx from 'clsx';

const NODE_POSITIONS = [
  { cx: 10, cy: 12, delay: 0 },
  { cx: 22, cy: 8, delay: 0.1 },
  { cx: 34, cy: 14, delay: 0.2 },
  { cx: 46, cy: 10, delay: 0.3 },
  { cx: 58, cy: 16, delay: 0.4 },
  { cx: 70, cy: 12, delay: 0.5 },
  { cx: 82, cy: 18, delay: 0.6 },
  { cx: 94, cy: 14, delay: 0.7 },
  { cx: 12, cy: 32, delay: 0.4 },
  { cx: 24, cy: 28, delay: 0.5 },
  { cx: 36, cy: 34, delay: 0.6 },
  { cx: 48, cy: 30, delay: 0.7 },
  { cx: 60, cy: 36, delay: 0.8 },
  { cx: 72, cy: 32, delay: 0.9 },
  { cx: 84, cy: 38, delay: 1.0 },
  { cx: 96, cy: 34, delay: 1.1 },
  { cx: 14, cy: 52, delay: 0.8 },
  { cx: 26, cy: 48, delay: 0.9 },
  { cx: 38, cy: 54, delay: 1.0 },
  { cx: 50, cy: 50, delay: 1.1 },
  { cx: 62, cy: 56, delay: 1.2 },
  { cx: 74, cy: 52, delay: 1.3 },
  { cx: 86, cy: 58, delay: 1.4 },
  { cx: 98, cy: 54, delay: 1.5 },
  { cx: 16, cy: 72, delay: 1.2 },
  { cx: 28, cy: 68, delay: 1.3 },
  { cx: 40, cy: 74, delay: 1.4 },
  { cx: 52, cy: 70, delay: 1.5 },
  { cx: 64, cy: 76, delay: 1.6 },
  { cx: 76, cy: 72, delay: 1.7 },
  { cx: 88, cy: 78, delay: 1.8 },
  { cx: 100, cy: 74, delay: 1.9 },
];

const CONNECTIONS = [
  [10, 12, 22, 8],
  [22, 8, 34, 14],
  [34, 14, 46, 10],
  [46, 10, 58, 16],
  [58, 16, 70, 12],
  [70, 12, 82, 18],
  [12, 32, 24, 28],
  [24, 28, 36, 34],
  [36, 34, 48, 30],
  [48, 30, 60, 36],
  [60, 36, 72, 32],
  [72, 32, 84, 38],
  [14, 52, 26, 48],
  [26, 48, 38, 54],
  [38, 54, 50, 50],
  [50, 50, 62, 56],
  [62, 56, 74, 52],
  [74, 52, 86, 58],
  [16, 72, 28, 68],
  [28, 68, 40, 74],
  [40, 74, 52, 70],
  [52, 70, 64, 76],
  [64, 76, 76, 72],
  [76, 72, 88, 78],
];

interface SingularityPreviewCardProps {
  className?: string;
}

export default function SingularityPreviewCard({ className = '' }: SingularityPreviewCardProps) {
  const prefersReducedMotion = useSSRSafeReducedMotion();

  return (
    <Link
      href="/singularity"
      aria-label="Launch the Singularity variance tax simulation"
      className={clsx(
        'group relative block overflow-hidden rounded-xl border border-neon/20 bg-gradient-to-br from-void via-carbon to-void shadow-inner',
        'transition-all duration-300 hover:border-neon/40 hover:shadow-lg hover:shadow-neon/20',
        'focus:outline-none focus:ring-2 focus:ring-neon/40 focus:ring-offset-2 focus:ring-offset-void',
        'aspect-video',
        className,
      )}
    >
      <div className="absolute inset-0 opacity-70 blur-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(0,180,255,0.25),transparent_35%),radial-gradient(circle_at_70%_70%,rgba(0,180,255,0.18),transparent_35%)]" />

      <svg
        viewBox="0 0 110 90"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        data-animated={!prefersReducedMotion}
        aria-hidden
      >
        <g stroke="#00B4FF" strokeWidth="0.4" opacity="0.35">
          {CONNECTIONS.map(([x1, y1, x2, y2], idx) => (
            <line key={`line-${idx}`} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </g>
        <g>
          {NODE_POSITIONS.map((node, idx) => {
            const circleProps = {
              cx: node.cx,
              cy: node.cy,
              r: 1.8,
              fill: '#00B4FF',
              'data-testid': 'particle-node',
            } as const;

            if (prefersReducedMotion) {
              return <circle key={`node-${idx}`} {...circleProps} opacity={0.75} />;
            }

            return (
              <motion.circle
                key={`node-${idx}`}
                {...circleProps}
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
                transition={{
                  duration: 2.4,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </g>
      </svg>

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neon/70">Singularity</span>
          <span className="rounded-full border border-neon/30 bg-carbon/70 px-3 py-1 text-[11px] font-mono text-white shadow-[0_0_20px_rgba(0,180,255,0.2)]">
            Re* = 0.72
          </span>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Variance Tax Protocol</h3>
          <p className="text-sm md:text-base text-steel/80 max-w-2xl">
            Ordered particle grid preview that mirrors the physics-based singularity simulation. See how variance collapses as your protocol standardizes every yard.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-neon text-void px-5 py-3 text-sm font-bold transition-transform duration-300 group-hover:scale-105">
          Launch Singularity Simulation →
        </div>
      </div>
    </Link>
  );
}
