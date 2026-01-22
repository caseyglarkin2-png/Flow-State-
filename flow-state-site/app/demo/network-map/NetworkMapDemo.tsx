'use client';

import React, { useState } from 'react';
import NetworkMap from '@/components/NetworkMap';
import { sampleFacilities, sampleConnections } from '../../../data/sampleNetwork';
import type { Facility } from '@/components/NetworkMap/types';

/**
 * Demo wrapper for NetworkMap with controls and state display.
 */
export default function NetworkMapDemo() {
  const [lastClicked, setLastClicked] = useState<Facility | null>(null);
  const [showTooltips, setShowTooltips] = useState(true);
  const [showDetailPanel, setShowDetailPanel] = useState(true);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        <label className="flex items-center gap-2 text-sm text-steel">
          <input
            type="checkbox"
            checked={showTooltips}
            onChange={(e) => setShowTooltips(e.target.checked)}
            className="w-4 h-4 rounded border-steel/30 bg-carbon text-neon focus:ring-neon"
          />
          Show Tooltips
        </label>
        <label className="flex items-center gap-2 text-sm text-steel">
          <input
            type="checkbox"
            checked={showDetailPanel}
            onChange={(e) => setShowDetailPanel(e.target.checked)}
            className="w-4 h-4 rounded border-steel/30 bg-carbon text-neon focus:ring-neon"
          />
          Show Detail Panel
        </label>
      </div>

      {/* Map Container */}
      <div className="bg-carbon/30 border border-neon/20 rounded-2xl p-4 md:p-6 min-h-[400px] md:min-h-[500px]">
        <NetworkMap
          facilities={sampleFacilities}
          connections={sampleConnections}
          onFacilityClick={(facility) => {
            setLastClicked(facility);
            console.log('Clicked facility:', facility);
          }}
          onFacilityHover={(facility) => {
            if (facility) {
              console.log('Hovering:', facility.name);
            }
          }}
          showTooltips={showTooltips}
          showDetailPanel={showDetailPanel}
          className="h-full"
        />
      </div>

      {/* Last Clicked Info */}
      {lastClicked && (
        <div className="bg-carbon/50 border border-neon/10 rounded-xl p-4 text-center">
          <p className="text-sm text-steel">
            Last clicked: <span className="text-neon font-semibold">{lastClicked.name}</span>
            {lastClicked.location && (
              <span className="text-steel/70"> ({lastClicked.location})</span>
            )}
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-sm text-steel/70 space-y-1">
        <p>
          <kbd className="px-2 py-1 bg-carbon rounded border border-steel/20 text-xs">Tab</kbd> to navigate between facilities
        </p>
        <p>
          <kbd className="px-2 py-1 bg-carbon rounded border border-steel/20 text-xs">Enter</kbd> or click to select
        </p>
        <p>
          <kbd className="px-2 py-1 bg-carbon rounded border border-steel/20 text-xs">Esc</kbd> to close detail panel
        </p>
      </div>
    </div>
  );
}
