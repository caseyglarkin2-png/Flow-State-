"use client";

import React from 'react';

export type Chapter = '1' | '2' | '3';

type ChapterSwitcherProps = {
  activeChapter: Chapter;
  onChapterChange: (chapter: Chapter) => void;
  compact?: boolean;
};

const CHAPTERS = [
  {
    id: '1' as Chapter,
    title: 'Standardization Band',
    subtitle: 'Driver Journey',
    description: 'QR check-in, timestamps, reason codes. Network foundation.',
  },
  {
    id: '2' as Chapter,
    title: 'Yard Control Loop',
    subtitle: 'Per-Site Execution',
    description: 'Asset tracking, dwell alerts, operational clarity.',
  },
  {
    id: '3' as Chapter,
    title: 'Network Effect',
    subtitle: 'Executive Layer',
    description: 'Cross-site intelligence, predictions, bottlenecks.',
  },
];

export default function ChapterSwitcher({ activeChapter, onChapterChange, compact = false }: ChapterSwitcherProps) {
  return (
    <div className="w-full">
      {/* Mobile: Segmented Control */}
      <div className="md:hidden">
        <div className="flex gap-1 bg-carbon/60 border border-steel/30 rounded-lg p-1">
          {CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onChapterChange(chapter.id)}
              className={`flex-1 px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeChapter === chapter.id
                  ? 'bg-neon text-void'
                  : 'text-steel/70 hover:text-neon'
              }`}
            >
              {chapter.id}
            </button>
          ))}
        </div>
        {/* Active chapter description */}
        {!compact && (
          <div className="mt-3 text-center">
            <p className="text-white font-semibold text-sm">
              {CHAPTERS.find(c => c.id === activeChapter)?.title}
            </p>
            <p className="text-steel/70 text-xs mt-1">
              {CHAPTERS.find(c => c.id === activeChapter)?.description}
            </p>
          </div>
        )}
      </div>

      {/* Desktop: Full Cards */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {CHAPTERS.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => onChapterChange(chapter.id)}
            className={`text-left p-5 rounded-lg border-2 transition-all ${
              activeChapter === chapter.id
                ? 'border-neon bg-neon/10 shadow-lg shadow-neon/20'
                : 'border-steel/30 bg-carbon/30 hover:border-neon/40'
            }`}
          >
            <div className="flex items-baseline gap-2 mb-2">
              <span className={`text-2xl font-black ${activeChapter === chapter.id ? 'text-neon' : 'text-steel/60'}`}>
                {chapter.id}
              </span>
              <span className="text-sm font-mono text-steel/60 uppercase tracking-wider">
                {chapter.subtitle}
              </span>
            </div>
            <h3 className={`text-lg font-bold mb-2 ${activeChapter === chapter.id ? 'text-white' : 'text-steel'}`}>
              {chapter.title}
            </h3>
            {!compact && (
              <p className="text-sm text-steel/70 leading-relaxed">
                {chapter.description}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
