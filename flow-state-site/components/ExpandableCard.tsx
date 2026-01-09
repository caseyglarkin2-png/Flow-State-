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
};

export function ExpandableCard({
  id,
  title,
  kicker,
  bullets = [],
  defaultOpen = false,
  children,
  onToggle,
  persona = []
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
      className="group rounded-2xl border border-slate-800/60 bg-slate-950/40 backdrop-blur-sm transition-all"
      onToggle={(e) => {
        const next = (e.currentTarget as HTMLDetailsElement).open;
        setOpen(next);
        onToggle?.(next);
      }}
    >
      <summary className="cursor-pointer list-none px-5 py-4 select-none hover:bg-slate-900/20 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-100">{title}</h3>
            {kicker && <p className="mt-1 text-sm text-slate-300">{kicker}</p>}

            {bulletList.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-slate-300">
                {bulletList.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400/80 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-1 shrink-0 text-xs font-medium text-emerald-300/90">
            <span className="group-open:hidden">Expand</span>
            <span className="hidden group-open:inline">Collapse</span>
          </div>
        </div>
      </summary>

      <div className="px-5 pb-5 pt-0 text-sm text-slate-200">
        <div className="border-t border-slate-800/60 pt-4">
          {children}
        </div>
      </div>
    </details>
  );
}
