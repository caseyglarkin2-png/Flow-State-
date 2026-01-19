/**
 * CHAIN OF CUSTODY ANIMATION
 * Shows evidence trail building with timestamps and cryptographic signatures
 * Brand-aligned: Ground Source Truth receipts, verification badges, audit trail
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const CUSTODY_EVENTS = [
  { 
    time: '14:32:18', 
    event: 'Driver Check-In',
    proof: 'Photo + CDL scan',
    signature: '0x8f4a2b9c',
  },
  { 
    time: '14:34:05', 
    event: 'Lane Assignment',
    proof: 'SMS receipt',
    signature: '0x3a7f2c9e',
  },
  { 
    time: '15:12:33', 
    event: 'Dwell Alert',
    proof: 'Timestamp variance',
    signature: '0x9c2e5a7b',
  },
  { 
    time: '15:45:17', 
    event: 'BOL Signature',
    proof: 'Digital signature',
    signature: '0x5d8f3a2c',
  },
];

export default function ChainOfCustodyAnimation() {
  const [visibleEvents, setVisibleEvents] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleEvents((prev) => (prev + 1) % (CUSTODY_EVENTS.length + 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-video bg-gradient-to-br from-void via-carbon to-void overflow-hidden rounded-lg border border-neon/20">
      {/* Title */}
      <div className="absolute top-8 left-0 right-0 text-center z-10">
        <h3 className="text-3xl md:text-4xl font-bold text-neon mb-2">CHAIN OF CUSTODY</h3>
        <p className="text-steel/70">Ground Source Truth Evidence Trail</p>
      </div>

      {/* Timeline */}
      <div className="absolute left-1/2 -translate-x-1/2 top-32 bottom-8 w-1 bg-steel/20">
        <motion.div
          className="absolute top-0 left-0 w-full bg-neon origin-top"
          initial={{ scaleY: 0 }}
          animate={{ 
            scaleY: visibleEvents > 0 ? Math.min(visibleEvents / CUSTODY_EVENTS.length, 1) : 0,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* Events */}
      <div className="absolute left-1/2 -translate-x-1/2 top-32 w-[90%] max-w-2xl space-y-6">
        <AnimatePresence mode="sync">
          {CUSTODY_EVENTS.map((event, index) => (
            index < visibleEvents && (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className={`flex items-start gap-4 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Timeline node */}
                <motion.div
                  className="relative flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <div className="w-4 h-4 rounded-full bg-neon border-2 border-carbon shadow-[0_0_10px_rgba(0,180,255,0.8)]" />
                  {index === visibleEvents - 1 && (
                    <motion.div
                      className="absolute inset-0 w-4 h-4 rounded-full bg-neon"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.div>

                {/* Event card */}
                <motion.div
                  className={`flex-1 bg-carbon/80 border border-neon/20 rounded-lg p-4 backdrop-blur-sm ${
                    index % 2 === 0 ? 'text-left' : 'text-right'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'rgba(0, 180, 255, 0.4)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neon font-mono text-sm">{event.time}</span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-neon text-xs"
                    >
                      ✓
                    </motion.span>
                  </div>
                  <div className="text-white font-semibold mb-1">{event.event}</div>
                  <div className="text-steel/70 text-xs mb-2">{event.proof}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] font-mono text-steel/50">
                      {event.signature}...
                    </div>
                    <div className="ml-auto px-2 py-0.5 bg-neon/10 border border-neon/30 rounded text-[10px] text-neon">
                      VERIFIED
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Ground Source Truth badge */}
      {visibleEvents >= CUSTODY_EVENTS.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="px-4 py-2 bg-neon/10 border border-neon rounded-full text-neon text-sm font-mono flex items-center gap-2">
            <span className="text-lg">🔒</span>
            GROUND SOURCE TRUTH
          </div>
        </motion.div>
      )}
    </div>
  );
}
