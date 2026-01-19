/**
 * PROTOCOL ROLLUP ANIMATION
 * 
 * Shows: 4 Core Modules → Single Facility YNS → Network Scaling → Advanced Features Unlocked
 * 
 * Narrative:
 * Step 1: Four modules work together at facility level (Digital Guard + Comms + BOL + YMS)
 * Step 2: These standardize protocols at ONE yard - creates foundation
 * Step 3: Replicate across network - intelligence compounds
 * Step 4: Network standardization unlocks RTLS, Machine Vision, Predictive Intelligence
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ProtocolRollupAnimation() {
  const [phase, setPhase] = useState<'modules' | 'facility' | 'network' | 'unlocked'>(
    'modules'
  );

  // Auto-cycle through phases
  useEffect(() => {
    const phases: Array<'modules' | 'facility' | 'network' | 'unlocked'> = [
      'modules',
      'facility',
      'network',
      'unlocked',
    ];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % phases.length;
      setPhase(phases[currentIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-video bg-gradient-to-br from-void via-carbon to-void overflow-hidden rounded-lg border border-neon/20">
      {/* Phase indicator */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <div className="text-xs font-mono text-neon/70 space-y-1">
          <div className={phase === 'modules' ? 'text-neon font-bold' : 'text-steel/60'}>
            ① MODULES
          </div>
          <div className={phase === 'facility' ? 'text-neon font-bold' : 'text-steel/60'}>
            ② FACILITY
          </div>
          <div className={phase === 'network' ? 'text-neon font-bold' : 'text-steel/60'}>
            ③ NETWORK
          </div>
          <div className={phase === 'unlocked' ? 'text-neon font-bold' : 'text-steel/60'}>
            ④ UNLOCKED
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'modules' && (
          <motion.div
            key="modules"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h3 className="text-2xl font-bold text-neon mb-8">Four Modules, One Protocol</h3>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { name: 'Digital Guard', color: 'from-blue-500', symbol: '🔐' },
                { name: 'Digital Comms', color: 'from-cyan-500', symbol: '💬' },
                { name: 'Digital BOL', color: 'from-teal-500', symbol: '📋' },
                { name: 'Digital YMS', color: 'from-green-500', symbol: '📊' },
              ].map((module, i) => (
                <motion.div
                  key={module.name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: i * 0.2,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-16 h-16 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center text-2xl">
                    {module.symbol}
                  </div>
                  <span className="text-xs font-mono text-steel/70">{module.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Convergence arrows */}
            <motion.svg
              className="absolute bottom-20 w-40 h-20"
              viewBox="0 0 160 80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.path
                d="M 20 20 L 80 60"
                stroke="#00B4FF"
                strokeWidth="2"
                fill="none"
                animate={{ pathLength: [0, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.path
                d="M 140 20 L 80 60"
                stroke="#00B4FF"
                strokeWidth="2"
                fill="none"
                animate={{ pathLength: [0, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.path
                d="M 50 40 L 80 60"
                stroke="#00B4FF"
                strokeWidth="2"
                fill="none"
                animate={{ pathLength: [0, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.path
                d="M 110 40 L 80 60"
                stroke="#00B4FF"
                strokeWidth="2"
                fill="none"
                animate={{ pathLength: [0, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.svg>

            <p className="text-steel/70 text-sm mt-24">
              Standardized protocols for every yard = Deterministic control
            </p>
          </motion.div>
        )}

        {phase === 'facility' && (
          <motion.div
            key="facility"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h3 className="text-2xl font-bold text-neon mb-8">Foundation: Single Facility YNS</h3>

            {/* One facility box showing all 4 working together */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="border-2 border-neon/50 rounded-xl p-8 bg-gradient-to-br from-neon/10 to-transparent w-60 h-60 flex flex-col items-center justify-center"
            >
              <div className="text-6xl mb-4">🏭</div>
              <p className="text-neon font-bold text-lg text-center">Facility 1</p>
              <div className="text-xs text-steel/70 mt-4 text-center space-y-1">
                <div>✓ Standardized flow</div>
                <div>✓ Zero variance protocol</div>
                <div>✓ Proof at source</div>
              </div>
            </motion.div>

            <p className="text-steel/70 text-sm mt-12">
              This single facility becomes your playbook template
            </p>
          </motion.div>
        )}

        {phase === 'network' && (
          <motion.div
            key="network"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h3 className="text-2xl font-bold text-neon mb-8">Scale: Network Compounding</h3>

            {/* Multiple facilities in network */}
            <div className="relative w-80 h-40 mb-8">
              {[
                { x: 0, y: 0, size: 14 },
                { x: 50, y: 10, size: 12 },
                { x: 100, y: 5, size: 11 },
                { x: 20, y: 50, size: 13 },
                { x: 60, y: 55, size: 12 },
                { x: 100, y: 48, size: 11 },
              ].map((facility, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: i * 0.15,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  className="absolute"
                  style={{ left: `${facility.x}px`, top: `${facility.y}px` }}
                >
                  <div className="text-sm">🏭</div>
                  <motion.div
                    className="w-6 h-6 rounded-full border-2 border-neon/50 absolute -inset-3"
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(0,180,255,0.3)',
                        '0 0 20px rgba(0,180,255,0.6)',
                        '0 0 10px rgba(0,180,255,0.3)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              ))}

              {/* Network connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {[
                  { x1: 14, y1: 14, x2: 64, y2: 24 },
                  { x1: 64, y1: 24, x2: 114, y2: 19 },
                  { x1: 34, y1: 64, x2: 74, y2: 69 },
                  { x1: 74, y1: 69, x2: 114, y2: 62 },
                  { x1: 14, y1: 14, x2: 34, y2: 64 },
                  { x1: 64, y1: 24, x2: 74, y2: 69 },
                ].map((line, i) => (
                  <motion.line
                    key={i}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#00B4FF"
                    strokeWidth="1.5"
                    opacity="0.4"
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.15,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </svg>
            </div>

            <div className="text-center">
              <p className="text-neon font-bold mb-2">Network Intelligence Compounds</p>
              <p className="text-steel/70 text-sm">
                Each facility adds proof points. Pattern recognition improves across all sites.
              </p>
            </div>
          </motion.div>
        )}

        {phase === 'unlocked' && (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h3 className="text-2xl font-bold text-neon mb-8">Unlocked: Advanced Capabilities</h3>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { name: 'Machine Vision', icon: '👁️', locked: false },
                { name: 'RTLS Tracking', icon: '📡', locked: false },
                { name: 'Predictive AI', icon: '🧠', locked: false },
                { name: 'Auto-Optimization', icon: '⚙️', locked: false },
              ].map((feature, i) => (
                <motion.div
                  key={feature.name}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: i * 0.15,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-neon/10 border border-neon/30"
                >
                  <div className="text-3xl">{feature.icon}</div>
                  <span className="text-xs font-mono text-neon text-center">{feature.name}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-steel/70 text-sm text-center max-w-sm">
              Standardized protocols across the network create the foundation for intelligence and automation
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {(['modules', 'facility', 'network', 'unlocked'] as const).map((p) => (
          <motion.div
            key={p}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor: phase === p ? '#00B4FF' : '#475569',
              scale: phase === p ? 1.3 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
