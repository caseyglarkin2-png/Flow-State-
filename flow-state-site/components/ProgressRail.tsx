/**
 * PROGRESS RAIL
 * Shows journey: Problem → Standards → Proof → Action
 * Subtle, updates on scroll
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from './motion/ReducedMotion';

interface ProgressStep {
  id: string;
  label: string;
  threshold: number; // scroll percentage (0-1)
}

interface ProgressRailProps {
  steps: ProgressStep[];
  className?: string;
}

export default function ProgressRail({ 
  steps, 
  className = '' 
}: ProgressRailProps) {
  const { scrollYProgress } = useScroll();
  const { prefersReducedMotion } = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const newStep = steps.findIndex((step, index) => {
        const nextThreshold = steps[index + 1]?.threshold ?? 1;
        return latest >= step.threshold && latest < nextThreshold;
      });
      if (newStep !== -1 && newStep !== activeStep) {
        setActiveStep(newStep);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, steps, activeStep]);

  return (
    <div className={`fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block ${className}`}>
      <div className="flex flex-col gap-6">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isPast = index < activeStep;

          return (
            <div key={step.id} className="flex items-center gap-3">
              {/* Dot */}
              <motion.div
                className={`
                  w-3 h-3 rounded-full border-2 transition-all duration-300
                  ${isActive 
                    ? 'border-neon bg-neon shadow-lg shadow-neon/50' 
                    : isPast 
                      ? 'border-neon/50 bg-neon/30' 
                      : 'border-steel/30 bg-carbon'
                  }
                `}
                animate={
                  !prefersReducedMotion && isActive
                    ? { scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Label */}
              <span
                className={`
                  text-xs font-medium transition-colors duration-300
                  ${isActive ? 'text-neon' : isPast ? 'text-steel' : 'text-steel/50'}
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Connecting line */}
      <div className="absolute left-[5px] top-0 bottom-0 w-px bg-steel/20" style={{ zIndex: -1 }} />
    </div>
  );
}

// Default steps for most pages
export const DEFAULT_STEPS: ProgressStep[] = [
  { id: 'problem', label: 'Problem', threshold: 0 },
  { id: 'standards', label: 'Standards', threshold: 0.25 },
  { id: 'proof', label: 'Proof', threshold: 0.5 },
  { id: 'action', label: 'Action', threshold: 0.75 },
];
