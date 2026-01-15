"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type ExpandableCardProps = {
  id: string; // stable slug for deep-linking: "evidence-vault", "alpr", etc.
  title: string;
  kicker?: string; // 1-line summary
  bullets?: string[]; // quick scan points
  defaultOpen?: boolean;
  children: React.ReactNode;
  onToggle?: (open: boolean) => void; // analytics hook
  persona?: string[]; // ["CFO", "Ops", "Security", "IT"]
  icon?: React.ReactNode; // optional icon to display next to title
};

export function ExpandableCard({
  id,
  title,
  kicker,
  bullets = [],
  defaultOpen = false,
  children,
  onToggle,
  persona = [],
  icon
}: ExpandableCardProps) {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const [open, setOpen] = useState(defaultOpen);

  // Deep-link support: /security#evidence-vault opens the card
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    if (hash && hash === id) {
      setOpen(true);
      // scroll into view after open
      requestAnimationFrame(() => detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, [id]);

  // Keep <details> in sync with state
  useEffect(() => {
    if (detailsRef.current) detailsRef.current.open = open;
  }, [open]);

  // Analytics + localStorage persistence
  useEffect(() => {
    if (open && onToggle) {
      onToggle(true);
      // Log to analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "card_expand", {
          card_id: id,
          card_title: title
        });
      }
    }
    
    // Persist to localStorage
    if (typeof window !== "undefined") {
      const key = `card_${id}_open`;
      localStorage.setItem(key, String(open));
    }
  }, [open, id, title, onToggle]);

  // Restore from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined" && !defaultOpen) {
      const key = `card_${id}_open`;
      const saved = localStorage.getItem(key);
      if (saved === "true") {
        setOpen(true);
      }
    }
  }, [id, defaultOpen]);

  const bulletList = useMemo(() => bullets.filter(Boolean).slice(0, 4), [bullets]);

  return (
    <details
      ref={detailsRef}
      id={id}
      data-persona={persona.join(",")}
      className="group rounded-lg border border-steel/30 bg-carbon/30 backdrop-blur-sm transition-all hover:border-neon/40 hover:shadow-lg hover:shadow-neon/10"
      onToggle={(e) => {
        const next = (e.currentTarget as HTMLDetailsElement).open;
        setOpen(next);
        onToggle?.(next);
      }}
    >
      <summary className="cursor-pointer list-none px-6 py-5 select-none hover:bg-carbon/50 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="shrink-0 p-2 rounded-lg bg-neon/10 border border-neon/20 text-neon">
                  {icon}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                {kicker && <p className="text-steel/80 leading-relaxed">{kicker}</p>}
              </div>
            </div>

            {bulletList.length > 0 && (
              <ul className="mt-3 space-y-2 text-sm text-steel/90">
                {bulletList.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neon shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-1 shrink-0 text-xs font-bold text-neon uppercase tracking-wider">
            <span className="group-open:hidden">+</span>
            <span className="hidden group-open:inline">−</span>
          </div>
        </div>
      </summary>

      <div className="px-6 pb-6 pt-0 text-steel/90 leading-relaxed">
        <div className="border-t border-steel/20 pt-5">
          {children}
        </div>
      </div>
    </details>
  );
}
