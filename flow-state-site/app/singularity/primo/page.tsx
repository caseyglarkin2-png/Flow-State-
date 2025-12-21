// Primo Singularity Map - Main Page
// /singularity/primo route

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PrimoSingularityPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-screen h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00B4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#888] text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#050505] overflow-hidden relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b border-[#00B4FF]/20 backdrop-blur-md bg-[#0F0F0F]/90"
      >
        <div className="flex items-center gap-4">
          <span className="text-[#00B4FF] font-bold text-lg">Flow State</span>
          <span className="text-[#888] text-sm">Primo Singularity Map</span>
        </div>
        <div className="text-[#00B4FF] text-sm">
          16 Primo Facilities
        </div>
      </motion.div>

      {/* Placeholder for map - temporarily removed for debugging */}
      <div className="absolute inset-0 pt-14 flex items-center justify-center">
        <div className="text-center p-8 rounded-lg bg-[#0F0F0F]/80 border border-[#00B4FF]/20">
          <h2 className="text-[#00B4FF] text-xl font-bold mb-4">Primo Singularity Map</h2>
          <p className="text-[#888] mb-4">Digital Twin Generator for 16 Primo Facilities</p>
          <div className="grid grid-cols-2 gap-4 text-left text-sm">
            <div className="text-[#00B4FF]">✓ Atlanta, GA</div>
            <div className="text-[#00B4FF]">✓ Chicago, IL</div>
            <div className="text-[#00B4FF]">✓ Dallas, TX</div>
            <div className="text-[#00B4FF]">✓ Denver, CO</div>
            <div className="text-[#00B4FF]">✓ Houston, TX</div>
            <div className="text-[#00B4FF]">✓ Los Angeles, CA</div>
            <div className="text-[#00B4FF]">✓ Miami, FL</div>
            <div className="text-[#00B4FF]">✓ Minneapolis, MN</div>
          </div>
          <p className="text-[#666] text-xs mt-4">Map loading... Please wait</p>
        </div>
      </div>

      {/* Attribution */}
      <div className="fixed bottom-4 right-4 z-10 text-xs px-2 py-1 rounded bg-[#0F0F0F]/80 text-[#888]">
        Flow State Singularity Map
      </div>
    </div>
  );
}
