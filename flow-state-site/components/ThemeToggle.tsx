'use client';

import React, { useEffect, useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';

/**
 * ThemeToggle — Tactical-styled Day/Night switch.
 * Persists choice to localStorage and applies theme class to html element.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore(
    (onStoreChange) => {
      const handler = () => onStoreChange();
      window.addEventListener('storage', handler);
      window.addEventListener('fs-theme', handler);
      return () => {
        window.removeEventListener('storage', handler);
        window.removeEventListener('fs-theme', handler);
      };
    },
    () => {
      const stored = localStorage.getItem('fs-theme') as Theme | null;
      return stored === 'light' ? 'light' : 'dark';
    },
    () => 'dark',
  );

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('fs-theme', next);
    document.documentElement.classList.toggle('light-mode', next === 'light');
    window.dispatchEvent(new Event('fs-theme'));
  };

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
