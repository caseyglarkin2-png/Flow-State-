"use client";

/**
 * TOC - Table of Contents
 * Sticky on desktop, inline on mobile
 * Highlights current section based on scroll
 */

import React, { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  label: string;
  level?: 1 | 2;
}

interface TOCProps {
  items: TOCItem[];
}

export default function TOC({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -60% 0%', threshold: 0 }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="hidden lg:block sticky top-32 self-start">
      <p className="text-xs uppercase tracking-[0.2em] text-steel/50 mb-4">
        On this page
      </p>
      <ul className="space-y-2 border-l border-neon/10">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollTo(item.id)}
              className={`block w-full text-left text-sm py-1 pl-4 border-l-2 -ml-px transition ${
                activeId === item.id
                  ? 'border-neon text-neon'
                  : 'border-transparent text-steel hover:text-white hover:border-steel/50'
              } ${item.level === 2 ? 'pl-6 text-xs' : ''}`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
