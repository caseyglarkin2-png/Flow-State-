/**
 * DRIVER JOURNEY SCROLLYTELLING COMPONENT
 * 
 * Purpose: Unified "truth animation" showing Before vs After driver experience
 * Usage: 
 *   - Homepage: Full scrollytelling with segmented playback
 *   - Solutions: Compact reuse (same asset, archetype framing)
 *   - ROI/Procurement: Small reinforcement modules
 * 
 * Design: Lottie animation synchronized to scroll position
 * Supports: prefers-reduced-motion, lazy loading
 */

'use client';

import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Dynamically import Lottie to avoid SSR issues
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);
const PlayerAny = Player as unknown as any;

interface DriverJourneyProps {
  mode?: 'scrollytelling' | 'compact' | 'reinforcement';
  title?: string;
  description?: string;
  className?: string;
}

// Story beats aligned with Lottie markers
const STORY_BEATS = [
  {
    frame: [0, 45],
    title: 'BEFORE: Manual Check-in',
    description: 'Driver waits in line. Guard writes down truck number. Dispatcher calls around to find a dock. 12–45 minutes wasted.',
    timestamp: '0:00',
  },
  {
    frame: [45, 95],
    title: 'QR Scan → Instant Authorization',
    description: 'Driver scans QR at kiosk. System verifies identity, checks appointment, opens gate. 2.4 seconds average.',
    timestamp: '1:30',
  },
  {
    frame: [95, 150],
    title: 'AFTER: Automated Enforcement',
    description: 'SMS with dock assignment + drop rules. System enforces compliance. Evidence vault records every timestamp. Zero disputes.',
    timestamp: '3:10',
  },
];

export default function DriverJourney({
  mode = 'scrollytelling',
  title,
  description,
  className = '',
}: DriverJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  const [currentBeat, setCurrentBeat] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Scroll-driven animation for scrollytelling mode
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress to Lottie frame (0-150)
  const frame = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Update Lottie playback based on scroll
  useEffect(() => {
    if (mode !== 'scrollytelling' || !playerRef.current || prefersReducedMotion) return;

    const unsubscribe = frame.on('change', (latest) => {
      if (playerRef.current) {
        playerRef.current.seek(latest);
        
        // Determine which story beat is active
        const beat = STORY_BEATS.findIndex(
          (b) => latest >= b.frame[0] && latest < b.frame[1]
        );
        if (beat !== -1 && beat !== currentBeat) {
          setCurrentBeat(beat);
        }
      }
    });

    return () => unsubscribe();
  }, [frame, mode, currentBeat, prefersReducedMotion]);

  // Autoplay for compact/reinforcement modes
  useEffect(() => {
    if (mode === 'compact' || mode === 'reinforcement') {
      if (isInView && playerRef.current && !prefersReducedMotion) {
        playerRef.current.play();
      }
    }
  }, [isInView, mode, prefersReducedMotion]);

  // Render modes
  if (mode === 'reinforcement') {
    return (
      <div className={`inline-block ${className}`}>
        <PlayerAny
          ref={playerRef}
          autoplay={!prefersReducedMotion}
          loop
          src="/animations/driver-journey.json"
          style={{ height: '120px', width: '200px' }}
        />
      </div>
    );
  }

  if (mode === 'compact') {
    return (
      <div className={`bg-carbon/50 border border-neon/20 rounded-2xl p-8 ${className}`}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {title || 'Before vs After'}
            </h3>
            <p className="text-steel leading-relaxed">
              {description || 'Manual chaos → automated flow. Same driver journey, standardized across your network.'}
            </p>
            <div className="mt-6 space-y-3">
              {STORY_BEATS.map((beat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-neon font-mono text-sm mt-1">{beat.timestamp}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{beat.title}</p>
                    <p className="text-steel/70 text-xs">{beat.description.split('.')[0]}.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-video bg-void/50 rounded-xl border border-neon/10 overflow-hidden">
            <PlayerAny
              ref={playerRef}
              autoplay={!prefersReducedMotion}
              loop
              src="/animations/driver-journey.json"
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Full scrollytelling mode (homepage)
  return (
    <div ref={containerRef} className={`relative min-h-[200vh] ${className}`}>
      {/* Sticky container for animation */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Story beats sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">
                  The Driver Experience
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Before vs After
                </h2>
                <p className="mt-4 text-steel text-lg">
                  Manual chaos compounds into detention disputes. Standards create predictable throughput.
                </p>
              </div>

              {/* Active story beat */}
              <div className="space-y-4">
                {STORY_BEATS.map((beat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: currentBeat === idx ? 1 : 0.3 }}
                    className={`border-l-4 pl-6 py-4 transition-all ${
                      currentBeat === idx
                        ? 'border-neon bg-neon/5'
                        : 'border-steel/20 bg-transparent'
                    }`}
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-neon font-mono text-sm">{beat.timestamp}</span>
                      <h3 className="text-white font-bold text-lg">{beat.title}</h3>
                    </div>
                    <p className="text-steel text-sm leading-relaxed">{beat.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Lottie animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-video bg-void/50 rounded-2xl border-2 border-neon/20 overflow-hidden shadow-2xl shadow-neon/10"
            >
              {prefersReducedMotion ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-steel text-sm text-center px-8">
                    Animation paused (reduced motion preference)
                  </p>
                </div>
              ) : (
                <PlayerAny
                  ref={playerRef}
                  autoplay={false}
                  loop={false}
                  src="/animations/driver-journey.json"
                  style={{ height: '100%', width: '100%' }}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
