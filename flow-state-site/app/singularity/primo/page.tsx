// Primo Singularity Map - Main Page
// /singularity/primo route

'use client';

import React, { useEffect, useState } from 'react';

export default function PrimoSingularityPage() {
  const [mounted, setMounted] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [MapComponent, setMapComponent] = useState<React.ComponentType<any> | null>(null);
  
  useEffect(() => {
    setMounted(true);
    
    // First try the simple map to test basic rendering
    import('@/components/primo/SimpleMap')
      .then((mod) => {
        setMapComponent(() => mod.default);
      })
      .catch((err) => {
        console.error('Failed to load map:', err);
        setMapError(err?.message || 'Failed to load map component');
      });
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
        {!mounted ? (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#00B4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#888] text-sm">Loading...</p>
            </div>
          </div>
        ) : mapError ? (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <div className="text-center max-w-md p-6">
              <p className="text-red-500 text-lg mb-2">Error Loading Map</p>
              <p className="text-[#888] text-sm">{mapError}</p>
            </div>
          </div>
        ) : MapComponent ? (
          <MapComponent className="w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#00B4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#888] text-sm">Loading map...</p>
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
