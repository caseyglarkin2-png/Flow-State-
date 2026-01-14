'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Animated Digital Guard Visual - Gate Security & ID Verification
export const DigitalGuardVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative aspect-video bg-gradient-to-br from-carbon via-void to-carbon rounded-xl border border-neon/30 overflow-hidden ${className}`}>
    {/* Scanning grid background */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />
    </div>
    
    {/* Animated scan line */}
    <motion.div 
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent"
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />
    
    {/* Gate visualization */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-64 h-40">
        {/* Gate frame */}
        <div className="absolute inset-0 border-2 border-neon/40 rounded-xl" />
        
        {/* ID Card scanning animation */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-14 bg-gradient-to-br from-neon/20 to-ember/10 rounded border border-neon/60"
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: ['0 0 0px rgba(0,255,136,0)', '0 0 20px rgba(0,255,136,0.5)', '0 0 0px rgba(0,255,136,0)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="p-2">
            <div className="w-6 h-6 rounded-full bg-neon/30 mb-1" />
            <div className="w-full h-1 bg-neon/40 rounded mb-1" />
            <div className="w-2/3 h-1 bg-neon/30 rounded" />
          </div>
        </motion.div>
        
        {/* Verification checkmark */}
        <motion.div 
          className="absolute -right-4 -top-4 w-10 h-10 bg-neon/20 rounded-full flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.5, delay: 1.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <svg className="w-5 h-5 text-neon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        
        {/* Status indicators */}
        <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-4">
          <motion.div 
            className="flex items-center gap-1 text-xs font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-neon" />
            <span className="text-neon/80">ID Verified</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-1 text-xs font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-ember" />
            <span className="text-ember/80">Photo Captured</span>
          </motion.div>
        </div>
      </div>
    </div>
    
    {/* Corner accents */}
    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-neon/60" />
    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-neon/60" />
    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-neon/60" />
    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-neon/60" />
  </div>
);

// Animated Digital Comms Visual - Multi-Language Messaging
export const DigitalCommsVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative aspect-video bg-gradient-to-br from-carbon via-void to-carbon rounded-xl border border-neon/30 overflow-hidden ${className}`}>
    {/* Phone mockup */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-36 h-64 bg-carbon border-2 border-steel/40 rounded-2xl overflow-hidden">
        {/* Screen */}
        <div className="absolute inset-2 bg-void rounded-xl overflow-hidden">
          {/* Header */}
          <div className="px-3 py-2 bg-neon/10 border-b border-neon/20">
            <div className="text-xs font-mono text-neon">YardFlow</div>
          </div>
          
          {/* Messages */}
          <div className="p-2 space-y-2">
            <motion.div 
              className="w-3/4 p-2 bg-neon/10 rounded-xl rounded-bl-none text-[8px] text-steel/80"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              Dock 14 ready. Pull forward.
            </motion.div>
            
            <motion.div 
              className="w-3/4 ml-auto p-2 bg-steel/10 rounded-lg rounded-br-none text-[8px] text-steel/80"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.2 }}
            >
              En camino - 2 min
            </motion.div>
            
            <motion.div 
              className="w-3/4 p-2 bg-neon/10 rounded-xl rounded-bl-none text-[8px] text-steel/80"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 2 }}
            >
              ✓ Checked in. Bay assigned.
            </motion.div>
          </div>
        </div>
        
        {/* Home button */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-steel/30 rounded-full" />
      </div>
      
      {/* Language bubbles around phone */}
      {['EN', 'ES', 'PT', 'FR', 'ZH'].map((lang, i) => (
        <motion.div
          key={lang}
          className="absolute w-8 h-8 rounded-full bg-neon/10 border border-neon/40 flex items-center justify-center text-[10px] font-bold text-neon/80"
          style={{
            left: `${50 + 35 * Math.cos((i * 72 - 90) * Math.PI / 180)}%`,
            top: `${50 + 35 * Math.sin((i * 72 - 90) * Math.PI / 180)}%`,
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
        >
          {lang}
        </motion.div>
      ))}
    </div>
    
    {/* Signal waves */}
    <motion.div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-neon/10"
      animate={{ scale: [0.5, 1.5], opacity: [0.5, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </div>
);

// Animated Digital BOL Visual - Touchless Documentation
export const DigitalBOLVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative aspect-video bg-gradient-to-br from-carbon via-void to-carbon rounded-xl border border-neon/30 overflow-hidden ${className}`}>
    {/* Document grid background */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,255,136,0.3) 20px)',
        backgroundSize: '100% 20px'
      }} />
    </div>
    
    {/* BOL Document */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div 
        className="relative w-48 h-60 bg-white/5 rounded-lg border border-steel/30 shadow-2xl overflow-hidden"
        animate={{ 
          boxShadow: ['0 0 0px rgba(0,255,136,0)', '0 0 30px rgba(0,255,136,0.2)', '0 0 0px rgba(0,255,136,0)']
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Document header */}
        <div className="p-3 bg-neon/10 border-b border-neon/20">
          <div className="text-xs font-bold text-neon">BILL OF LADING</div>
          <div className="text-[8px] text-steel/60 font-mono mt-1">#BOL-2026-00142</div>
        </div>
        
        {/* Document content */}
        <div className="p-3 space-y-2">
          <div className="space-y-1">
            <div className="h-1.5 bg-steel/20 rounded w-full" />
            <div className="h-1.5 bg-steel/20 rounded w-3/4" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 bg-steel/20 rounded w-full" />
            <div className="h-1.5 bg-steel/20 rounded w-5/6" />
            <div className="h-1.5 bg-steel/20 rounded w-2/3" />
          </div>
          
          {/* Signature area */}
          <div className="mt-4 pt-2 border-t border-steel/20">
            <div className="text-[8px] text-steel/50 mb-1">SIGNATURE</div>
            <motion.div 
              className="h-6 bg-neon/5 rounded border border-dashed border-neon/30 flex items-center justify-center"
              animate={{ borderColor: ['rgba(0,255,136,0.3)', 'rgba(0,255,136,0.6)', 'rgba(0,255,136,0.3)'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.svg 
                className="w-16 h-4 text-neon/60"
                viewBox="0 0 60 16"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <motion.path 
                  d="M2 12 Q10 2 20 10 T40 8 T58 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 2 }}
                />
              </motion.svg>
            </motion.div>
          </div>
        </div>
        
        {/* Timestamp watermark */}
        <motion.div 
          className="absolute bottom-2 right-2 text-[6px] font-mono text-neon/40"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          2026-01-13 14:32:07 UTC
        </motion.div>
      </motion.div>
      
      {/* Floating verification badges */}
      <motion.div 
        className="absolute top-8 right-12 px-2 py-1 bg-neon/20 rounded text-[8px] font-mono text-neon border border-neon/40"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✓ Cryptographically Signed
      </motion.div>
      
      <motion.div 
        className="absolute bottom-12 left-12 px-2 py-1 bg-ember/20 rounded text-[8px] font-mono text-ember border border-ember/40"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        📷 Photo Proof Attached
      </motion.div>
    </div>
  </div>
);

// Animated Digital YMS Visual - Real-Time Yard Orchestration
export const DigitalYMSVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative aspect-video bg-gradient-to-br from-carbon via-void to-carbon rounded-xl border border-neon/30 overflow-hidden ${className}`}>
    {/* Grid background */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
    </div>
    
    {/* Yard visualization */}
    <div className="absolute inset-4">
      {/* Dock bays - top row */}
      <div className="absolute top-0 left-1/4 right-1/4 h-8 flex gap-1">
        {[1, 2, 3, 4, 5, 6].map((bay, i) => (
          <motion.div
            key={bay}
            className={`flex-1 rounded-t border-2 ${i === 2 ? 'border-neon bg-neon/20' : 'border-steel/40 bg-steel/10'}`}
            animate={i === 2 ? { borderColor: ['rgba(0,255,136,0.6)', 'rgba(0,255,136,1)', 'rgba(0,255,136,0.6)'] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="text-[6px] text-center mt-1 font-mono text-steel/60">{bay}</div>
          </motion.div>
        ))}
      </div>
      
      {/* Parking spots - grid */}
      <div className="absolute top-16 left-4 right-4 bottom-16 grid grid-cols-4 grid-rows-3 gap-2">
        {Array.from({ length: 12 }).map((_, i) => {
          const isOccupied = [0, 2, 4, 5, 7, 9, 11].includes(i);
          const isMoving = i === 5;
          return (
            <motion.div
              key={i}
              className={`rounded border ${isOccupied ? 'border-steel/60 bg-steel/20' : 'border-steel/20'}`}
              animate={isMoving ? { 
                x: [0, 80, 80],
                y: [0, 0, -60],
                opacity: [1, 1, 0]
              } : {}}
              transition={isMoving ? { duration: 3, repeat: Infinity, repeatDelay: 2 } : {}}
            >
              {isOccupied && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className={`w-3/4 h-2/3 rounded-sm ${isMoving ? 'bg-neon/40' : 'bg-steel/40'}`} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Gate */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-6 border-2 border-neon/40 rounded-b bg-neon/10 flex items-center justify-center">
        <span className="text-[6px] font-mono text-neon/60">GATE</span>
      </div>
      
      {/* Moving trailer indicator */}
      <motion.div 
        className="absolute left-8 top-1/2 flex items-center gap-1"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      >
        <div className="w-2 h-2 rounded-full bg-neon animate-ping" />
        <span className="text-[8px] font-mono text-neon/80">Moving to Dock 3</span>
      </motion.div>
    </div>
    
    {/* Stats overlay */}
    <div className="absolute top-2 right-2 text-right">
      <div className="text-[8px] font-mono text-steel/60">YARD CAPACITY</div>
      <div className="text-sm font-bold text-neon">58%</div>
    </div>
    
    <div className="absolute bottom-2 left-2">
      <motion.div 
        className="flex items-center gap-1 text-[8px] font-mono"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-neon" />
        <span className="text-neon/80">Live</span>
      </motion.div>
    </div>
  </div>
);

export default {
  DigitalGuardVisual,
  DigitalCommsVisual,
  DigitalBOLVisual,
  DigitalYMSVisual,
};
