/**
 * SPINE OVERVIEW - Module Layers Summary Component
 * 
 * Shows high-level module layer overview.
 * Imports from copy.ts for consistency.
 */

import React from 'react';
import { MODULE_LAYERS } from '@/content/copy';

type SpineOverviewProps = {
  variant?: 'cards' | 'compact';
  showModules?: boolean;
  className?: string;
};

export default function SpineOverview({ 
  variant = 'cards',
  showModules = false,
  className = ''
}: SpineOverviewProps) {
  
  const layers = [
    { number: '1', ...MODULE_LAYERS.foundation },
    { number: '2', ...MODULE_LAYERS.execution },
    { number: '3', ...MODULE_LAYERS.intelligence },
  ];

  if (variant === 'compact') {
    return (
      <div className={`space-y-3 ${className}`}>
        {layers.map((layer) => (
          <div key={layer.number} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center">
              <span className="text-neon font-bold text-sm">{layer.number}</span>
            </div>
            <div>
              <h4 className="text-white font-bold">{layer.title}</h4>
              <p className="text-steel/80 text-sm">{layer.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {layers.map((layer, index) => (
        <div 
          key={layer.number}
          className={`p-6 rounded-lg border-2 ${
            index === 0 
              ? 'border-neon/40 bg-neon/5' 
              : 'border-steel/30 bg-carbon/40'
          }`}
        >
          <div className={`font-mono text-xs uppercase tracking-wider mb-2 ${
            index === 0 ? 'text-neon' : 'text-steel/60'
          }`}>
            {layer.subtitle}
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{layer.title}</h3>
          <p className="text-steel/90 mb-3">{layer.fullDescription.split('.')[0]}.</p>
          
          {showModules && layer.modules && layer.modules.length > 0 && (
            <div className="mt-4 pt-4 border-t border-steel/20">
              <p className="text-xs text-steel/60 mb-2">Modules:</p>
              <div className="flex flex-wrap gap-2">
                {layer.modules.map((module) => (
                  <span 
                    key={module}
                    className="text-xs px-2 py-1 rounded bg-carbon/60 text-steel/80 border border-steel/20"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
