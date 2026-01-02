'use client';

import React, { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

/**
 * ThemeToggle — Tactical-styled Day/Night switch.
 * Persists choice to localStorage and applies theme class to html element.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('fs-theme') as Theme | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('light-mode', stored === 'light');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('fs-theme', next);
    document.documentElement.classList.toggle('light-mode', next === 'light');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono border border-steel/30 text-steel ${className}`}
        disabled
      >
        <span className="w-3 h-3 rounded-full bg-steel/30"></span>
        LOADING
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono border transition-colors ${
        theme === 'dark'
          ? 'border-neon/30 text-neon hover:border-neon/60'
          : 'border-amber-500/30 text-amber-500 hover:border-amber-500/60'
      } ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'day' : 'night'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <span className="w-3 h-3 rounded-full bg-neon shadow-[0_0_6px_rgba(0,180,255,0.5)]"></span>
          <span className="hidden sm:inline">THERMAL</span>
        </>
      ) : (
        <>
          <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]"></span>
          <span className="hidden sm:inline">DAY</span>
        </>
      )}
    </button>
  );
}
