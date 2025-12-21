// YardBuilder AI - Facility Digital Twin Generator
// /singularity/primo route

'use client';

import React, { useEffect, useState } from 'react';

export default function YardBuilderPage() {
  const [mounted, setMounted] = useState(false);
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setMounted(true);
    
    import('@/components/yardbuilder/YardBuilderAI')
      .then((mod) => {
        setComponent(() => mod.default);
      })
      .catch((err) => {
        console.error('Failed to load YardBuilder:', err);
        setError(err?.message || 'Failed to load component');
      });
  }, []);

  return (
    <div className="w-screen h-screen bg-[#050505] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex-none flex items-center justify-between px-4 py-3 border-b border-[#00B4FF]/20 bg-[#0F0F0F]">
        <div className="flex items-center gap-4">
          <span className="text-[#00B4FF] font-bold text-lg">Flow State</span>
          <span className="text-[#888] text-sm">YardBuilder AI</span>
        </div>
        <div className="text-[#00B4FF] text-sm">
          Digital Twin Generator
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {!mounted ? (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#00B4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#888] text-sm">Loading...</p>
            </div>
          </div>
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <div className="text-center max-w-md p-6">
              <p className="text-red-500 text-lg mb-2">Error</p>
              <p className="text-[#888] text-sm">{error}</p>
            </div>
          </div>
        ) : Component ? (
          <Component />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#00B4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#888] text-sm">Loading YardBuilder AI...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
