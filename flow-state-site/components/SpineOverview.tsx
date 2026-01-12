/**
 * SPINE OVERVIEW - 3-Chapter Summary Component
 * 
 * Shows high-level spine overview without interactive switching.
 * Use ChapterSwitcher for full interactive navigation.
 * Imports from copy.ts for consistency.
 */

import React from 'react';
import { SPINE_CHAPTERS } from '@/content/copy';

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
  
  const chapters = [
    SPINE_CHAPTERS.chapter1,
    SPINE_CHAPTERS.chapter2,
    SPINE_CHAPTERS.chapter3,
  ];

  if (variant === 'compact') {
    return (
      <div className={`space-y-3 ${className}`}>
        {chapters.map((chapter) => (
          <div key={chapter.number} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center">
              <span className="text-neon font-bold text-sm">{chapter.number}</span>
            </div>
            <div>
              <h4 className="text-white font-bold">{chapter.title}</h4>
              <p className="text-steel/80 text-sm">{chapter.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {chapters.map((chapter, index) => (
        <div 
          key={chapter.number}
          className={`p-6 rounded-lg border-2 ${
            index === 0 
              ? 'border-neon/40 bg-neon/5' 
              : 'border-steel/30 bg-carbon/40'
          }`}
        >
          <div className={`font-mono text-xs uppercase tracking-wider mb-2 ${
            index === 0 ? 'text-neon' : 'text-steel/60'
          }`}>
            Chapter {chapter.number}
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{chapter.title}</h3>
          <p className="text-steel/90 mb-3">{chapter.fullDescription.split('.')[0]}.</p>
          
          {showModules && chapter.modules.length > 0 && (
            <div className="mt-4 pt-4 border-t border-steel/20">
              <p className="text-xs text-steel/60 mb-2">Modules:</p>
              <div className="flex flex-wrap gap-2">
                {chapter.modules.map((module) => (
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
