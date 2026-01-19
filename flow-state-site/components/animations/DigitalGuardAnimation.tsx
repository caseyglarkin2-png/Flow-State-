/**
 * DIGITAL GUARD ANIMATION
 * Inspired by digital-guard-proof.svg - shows automated verification flow
 * Brand-aligned: neon checkmarks, kiosk UI, verification progress
 */

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function DigitalGuardAnimation() {
  const [step, setStep] = useState(0);
  
  const verificationSteps = [
    { label: 'Driver identity verified', delay: 0 },
    { label: 'CDL valid + current', delay: 0.5 },
    { label: 'Carrier authorization confirmed', delay: 1 },
    { label: 'Audit trail created', delay: 1.5 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % (verificationSteps.length + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-video bg-gradient-to-br from-carbon via-void to-carbon overflow-hidden rounded-lg border border-neon/20">
      {/* Title */}
      <div className="absolute top-8 left-0 right-0 text-center z-10">
        <h3 className="text-3xl md:text-4xl font-bold text-neon mb-2">DIGITAL GUARD</h3>
        <p className="text-steel/70">Automated Carrier Verification</p>
      </div>

      {/* Gate Kiosk */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2">
        <motion.div 
          className="relative w-40 h-56 bg-carbon rounded-xl border-4 border-neon shadow-[0_0_20px_rgba(0,180,255,0.3)]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Screen */}
          <div className="absolute top-10 left-3 right-3 h-28 bg-void rounded-lg border-2 border-neon/50 overflow-hidden">
            <motion.div
              className="w-full h-full flex items-center justify-center"
              animate={{
                backgroundColor: step === 0 ? '#000' : '#0a3d33',
              }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-neon font-mono text-xs"
                >
                  READY
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 360] }}
                  transition={{ duration: 0.5 }}
                  className="text-neon text-2xl"
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Scan Button */}
          <motion.div 
            className="absolute bottom-6 left-3 right-3 h-12 rounded bg-neon flex items-center justify-center font-bold text-void cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VERIFY
          </motion.div>

          {/* Scanning indicator */}
          {step > 0 && (
            <motion.div
              className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-neon"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Verification Checkmarks */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 space-y-4">
        {verificationSteps.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: step > index ? 1 : 0.3,
              x: step > index ? 0 : 20,
            }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                step > index 
                  ? 'border-neon bg-neon/20' 
                  : 'border-steel/40'
              }`}
              animate={{
                scale: step === index + 1 ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {step > index && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-neon text-sm"
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
            <span className={`text-sm font-mono ${
              step > index ? 'text-neon' : 'text-steel/50'
            }`}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Flow indicator arrow */}
      {step === verificationSteps.length && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-neon">
            <div className="h-0.5 w-20 bg-neon" />
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
            <span className="text-xs font-mono text-steel/70">Gate Opens</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
