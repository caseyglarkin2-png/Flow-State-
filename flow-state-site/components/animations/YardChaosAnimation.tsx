/**
 * YARD CHAOS ANIMATION
 * Inspired by yard-chaos.svg - shows variance/chaos before standardization
 * Brand-aligned: neon glow, carbon background, grid overlay
 */

'use client';

import { motion } from 'framer-motion';
import { Dismiss } from '@/components/icons/FlowIcons';

export default function YardChaosAnimation() {
  // Chaotic movement patterns for problem indicators
  const chaosAnimation = {
    y: [0, -10, 5, -8, 0],
    opacity: [0.6, 0.8, 0.5, 0.9, 0.6],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  const pulseAnimation = {
    scale: [1, 1.1, 0.95, 1.05, 1],
    opacity: [0.3, 0.5, 0.2, 0.4, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  return (
    <div className="relative w-full aspect-video bg-gradient-to-br from-void via-carbon to-void overflow-hidden rounded-lg border border-steel/20">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="yard-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neon" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#yard-grid)" />
        </svg>
      </div>

      {/* Title */}
      <div className="absolute top-8 left-0 right-0 text-center z-10">
        <h3 className="text-3xl md:text-4xl font-bold text-neon mb-2">VARIANCE TAX</h3>
        <p className="text-steel/70">Before Standardization</p>
      </div>

      {/* Chaotic geometric pulses (brand-aligned) */}
      <motion.div
        animate={pulseAnimation}
        className="absolute top-1/4 left-[10%] w-32 h-32 rotate-6 bg-ember/10 border border-ember/30 shadow-[0_0_40px_rgba(255,42,0,0.25)]"
      />
      <motion.div
        animate={{
          ...pulseAnimation,
          transition: { ...pulseAnimation.transition, delay: 1 },
        }}
        className="absolute top-1/2 right-[15%] w-40 h-32 -rotate-3 bg-ember/8 border border-ember/25 shadow-[0_0_50px_rgba(255,42,0,0.2)]"
      />
      <motion.div
        animate={{
          ...pulseAnimation,
          transition: { ...pulseAnimation.transition, delay: 2 },
        }}
        className="absolute bottom-1/4 left-[35%] w-28 h-28 rotate-12 bg-ember/12 border border-ember/30 shadow-[0_0_32px_rgba(255,42,0,0.22)]"
      />

      {/* Problem indicators */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-4">
        <motion.div
          animate={chaosAnimation}
          className="flex items-center gap-2 text-ember"
        >
          <Dismiss size={18} className="text-ember" />
          <span className="text-sm font-mono">45min gate dwell</span>
        </motion.div>
        <motion.div
          animate={{
            ...chaosAnimation,
            transition: { ...chaosAnimation.transition, delay: 0.5 },
          }}
          className="flex items-center gap-2 text-ember"
        >
          <Dismiss size={18} className="text-ember" />
          <span className="text-sm font-mono">18% detention rate</span>
        </motion.div>
        <motion.div
          animate={{
            ...chaosAnimation,
            transition: { ...chaosAnimation.transition, delay: 1 },
          }}
          className="flex items-center gap-2 text-ember"
        >
          <Dismiss size={18} className="text-ember" />
          <span className="text-sm font-mono">Manual documentation</span>
        </motion.div>
        <motion.div
          animate={{
            ...chaosAnimation,
            transition: { ...chaosAnimation.transition, delay: 1.5 },
          }}
          className="flex items-center gap-2 text-ember"
        >
          <Dismiss size={18} className="text-ember" />
          <span className="text-sm font-mono">80+ disputes/month</span>
        </motion.div>
      </div>

      {/* Scattered random lines to show disconnected processes */}
      <svg className="absolute inset-0 pointer-events-none opacity-30">
        <motion.line
          x1="20%" y1="30%" x2="40%" y2="50%"
          stroke="currentColor"
          strokeWidth="2"
          className="text-steel"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.line
          x1="60%" y1="40%" x2="80%" y2="60%"
          stroke="currentColor"
          strokeWidth="2"
          className="text-steel"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.line
          x1="30%" y1="70%" x2="50%" y2="80%"
          stroke="currentColor"
          strokeWidth="2"
          className="text-steel"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3.5,
            delay: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
}
