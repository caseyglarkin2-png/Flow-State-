/**
 * BEFORE/AFTER FLOW ANIMATION
 * Shows variance chaos → standardized flow transformation
 * Brand-aligned: visual proof of protocol impact
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function BeforeAfterFlowAnimation() {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAfter((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-video bg-gradient-to-br from-void via-carbon to-void overflow-hidden rounded-lg border border-neon/20">
      {/* Toggle indicator */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        <motion.div
          animate={{ opacity: !showAfter ? 1 : 0.3 }}
          className="text-ember font-mono text-sm"
        >
          BEFORE
        </motion.div>
        <div className="relative w-12 h-6 bg-steel/20 rounded-full">
          <motion.div
            className="absolute top-1 w-4 h-4 bg-neon rounded-full shadow-[0_0_10px_rgba(0,180,255,0.6)]"
            animate={{
              left: showAfter ? 'calc(100% - 20px)' : '4px',
            }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <motion.div
          animate={{ opacity: showAfter ? 1 : 0.3 }}
          className="text-neon font-mono text-sm"
        >
          AFTER
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {!showAfter ? (
          // BEFORE: Chaotic flow
          <motion.div
            key="before"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div className="absolute top-16 left-0 right-0 text-center">
              <h3 className="text-2xl font-bold text-ember mb-2">Manual Chaos</h3>
              <p className="text-steel/70 text-sm">45min avg gate dwell</p>
            </div>

            {/* Chaotic driver paths */}
            <svg className="absolute inset-0 w-full h-full">
              {[...Array(6)].map((_, i) => {
                const startY = 40 + (i * 8);
                const endY = 40 + ((i + Math.random() * 3) * 8);
                return (
                  <motion.path
                    key={i}
                    d={`M 10 ${startY}% Q 30 ${startY + (Math.random() - 0.5) * 20}%, 50 ${endY}% T 90 ${endY + (Math.random() - 0.5) * 10}%`}
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-ember/40"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                );
              })}
            </svg>

            {/* Bottleneck indicators */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-20 h-20 rounded-full bg-ember/20 blur-2xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>

            {/* Stats */}
            <div className="absolute bottom-12 left-8 space-y-1 text-xs font-mono text-ember/80">
              <div>✕ Random queue times</div>
              <div>✕ 18% detention rate</div>
              <div>✕ Manual handoffs</div>
            </div>
          </motion.div>
        ) : (
          // AFTER: Standardized flow
          <motion.div
            key="after"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div className="absolute top-16 left-0 right-0 text-center">
              <h3 className="text-2xl font-bold text-neon mb-2">YardFlow Protocol</h3>
              <p className="text-steel/70 text-sm">8min avg gate dwell</p>
            </div>

            {/* Standardized parallel lanes */}
            <svg className="absolute inset-0 w-full h-full">
              {[...Array(6)].map((_, i) => {
                const yPos = 40 + (i * 8);
                return (
                  <motion.line
                    key={i}
                    x1="10%"
                    y1={`${yPos}%`}
                    x2="90%"
                    y2={`${yPos}%`}
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-neon/60"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                );
              })}
            </svg>

            {/* Flow indicators */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-neon shadow-[0_0_10px_rgba(0,180,255,0.8)]"
                style={{
                  top: `${40 + i * 16}%`,
                  left: '10%',
                }}
                animate={{
                  left: ['10%', '90%'],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.4,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'linear',
                }}
              />
            ))}

            {/* Stats */}
            <div className="absolute bottom-12 right-8 space-y-1 text-xs font-mono text-neon/80">
              <div>✓ Predictable flow</div>
              <div>✓ 3% detention rate</div>
              <div>✓ Automated evidence</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
