'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSSRSafeReducedMotion } from '@/lib/ssr-safe-motion';
import { useProtocolSequenceAnalytics } from '@/lib/hooks/useProtocolSequenceAnalytics';
import { PROTOCOL_MODULES, getNextProtocolModule, type ProtocolModuleType } from '@/lib/protocol-modules';
import {
  ProtocolGuardIcon,
  ProtocolCommsIcon,
  ProtocolBOLIcon,
  ProtocolYMSIcon,
} from '@/components/icons/ProtocolIcons';

export interface ProtocolSequenceAnimationProps {
  displayDuration?: number; // Default: 3000ms
  transitionDuration?: number; // Default: 500ms
  autoPlay?: boolean; // Default: true
  trackingEnabled?: boolean; // Default: true
  onStateChange?: (state: ProtocolModuleType) => void;
}

const iconMap = {
  Guard: ProtocolGuardIcon,
  Comms: ProtocolCommsIcon,
  BOL: ProtocolBOLIcon,
  YMS: ProtocolYMSIcon,
};

/**
 * ProtocolSequenceAnimation
 * 
 * Cycles through Guard → Comms → BOL → YMS to showcase the 4 core modules.
 * Respects prefers-reduced-motion by showing a static grid.
 */
export default function ProtocolSequenceAnimation({
  displayDuration = 3000,
  transitionDuration = 500,
  autoPlay = true,
  trackingEnabled = true,
  onStateChange,
}: ProtocolSequenceAnimationProps) {
  const [currentState, setCurrentState] = useState<ProtocolModuleType>('Guard');
  const [isInView, setIsInView] = useState(true); // default true to preserve autoplay server/client parity
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useSSRSafeReducedMotion();
  const trackModuleView = useProtocolSequenceAnalytics(trackingEnabled);

  const cycleToNext = useCallback(() => {
    setCurrentState((prev) => {
      const next = getNextProtocolModule(prev);
      onStateChange?.(next);
      return next;
    });
  }, [onStateChange]);

  useEffect(() => {
    trackModuleView(currentState);
  }, [currentState, trackModuleView]);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    // Basic viewport detection: pause when scrolled out of view by 50%
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsInView(entry.isIntersecting));
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion || !isInView) return undefined;

    const interval = setInterval(cycleToNext, displayDuration + transitionDuration);
    return () => clearInterval(interval);
  }, [autoPlay, displayDuration, transitionDuration, cycleToNext, prefersReducedMotion, isInView]);

  // Reduced-motion fallback: static 2x2 grid
  if (prefersReducedMotion) {
    return (
      <div
        className="w-full rounded-lg border border-neon/20 bg-gradient-to-br from-void via-carbon to-void p-6"
        role="region"
        aria-label="Protocol modules"
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PROTOCOL_MODULES.map((module) => {
            const Icon = iconMap[module.id];
            return (
              <div key={module.id} className="flex flex-col items-center text-center">
                <Icon size={48} color="#00B4FF" className="mb-2" />
                <div className="text-sm font-medium text-neon">{module.label}</div>
                <div className="text-xs text-steel">{module.proof}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Animated cycling mode
  const currentModule = PROTOCOL_MODULES.find((m) => m.id === currentState)!;
  const CurrentIcon = iconMap[currentState];

  return (
    <div
      ref={containerRef}
      className="relative flex aspect-video w-full items-center justify-center rounded-lg border border-neon/20 bg-gradient-to-br from-void via-carbon to-void p-8"
      role="region"
      aria-label="Protocol sequence animation"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentState}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: transitionDuration / 1000, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center text-center"
        >
          <CurrentIcon
            size={64}
            color="#00B4FF"
            className="mb-4 drop-shadow-[0_0_12px_rgba(0,180,255,0.5)] transition-[filter] duration-500"
          />
          <div className="text-2xl font-bold text-neon">{currentModule.label}</div>
          <div className="mt-2 text-sm text-steel">{currentModule.proof}</div>
        </motion.div>
      </AnimatePresence>

      {/* Progress indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
        {PROTOCOL_MODULES.map((module) => (
          <button
            key={module.id}
            onClick={() => setCurrentState(module.id)}
            className={`h-3 w-3 rounded-full border border-neon/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon/50 ${
              module.id === currentState ? 'bg-neon shadow-[0_0_12px_rgba(0,180,255,0.6)]' : 'bg-steel/40 hover:bg-steel/70'
            }`}
            aria-label={`Show ${module.label}`}
          />
        ))}
      </div>
    </div>
  );
}
