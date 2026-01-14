'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface StickyCTABarProps {
  ctaText: string;
  ctaUrl: string;
  showAfterScroll?: number;
}

export default function StickyCTABar({ 
  ctaText, 
  ctaUrl, 
  showAfterScroll = 800 
}: StickyCTABarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > showAfterScroll;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-void/95 backdrop-blur-lg border-t border-neon/30 shadow-lg shadow-neon/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="text-white font-semibold text-sm">
                Ready to orchestrate your network?
              </p>
              <p className="text-steel/70 text-xs">
                30 min call. Network audit + rollout plan.
              </p>
            </div>
            <Link
              href={ctaUrl}
              className="flex-shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-base bg-neon text-void hover:bg-white hover:text-void transition-all hover:scale-105"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
