// Primo Singularity Map - Main Page
// /singularity/primo route

'use client';

import React, { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for map to avoid SSR issues with maplibre-gl
const PrimoMapComponent = dynamic(
  () => import('@/components/primo/PrimoMap').then(mod => ({ default: mod.default })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00B4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#888] text-sm">Loading map...</p>
        </div>
      </div>
    ),
  }
);

function MapWrapper() {
  return <PrimoMapComponent className="w-full h-full" />;
}

export default function PrimoSingularityPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-screen h-screen bg-[#050505] overflow-hidden relative">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b border-[#00B4FF]/20 backdrop-blur-md bg-[#0F0F0F]/90">
        <div className="flex items-center gap-4">
          <span className="text-[#00B4FF] font-bold text-lg">Flow State</span>
          <span className="text-[#888] text-sm">Primo Singularity Map</span>
        </div>
        <div className="text-[#00B4FF] text-sm">
          16 Primo Facilities
        </div>
      </div>

      {/* Map */}
      <div className="absolute inset-0 pt-14">
        {mounted ? (
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center bg-[#050505]">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#00B4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[#888] text-sm">Initializing...</p>
              </div>
            </div>
          }>
            <MapWrapper />
          </Suspense>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#00B4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#888] text-sm">Loading...</p>
            </div>
          </div>
        )}
      </div>

      {/* Attribution */}
      <div className="fixed bottom-4 right-4 z-10 text-xs px-2 py-1 rounded bg-[#0F0F0F]/80 text-[#888]">
        Flow State Singularity Map
      </div>
    </div>
  );
}
