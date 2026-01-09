"use client";

import React, { useState } from "react";

export function ExpandAllControls({
  cardIds
}: {
  cardIds: string[];
}) {
  const [, setTrigger] = useState(0);

  const expandAll = () => {
    if (typeof window === "undefined") return;
    cardIds.forEach((id) => {
      const el = document.getElementById(id) as HTMLDetailsElement;
      if (el) el.open = true;
    });
    setTrigger(prev => prev + 1);
  };

  const collapseAll = () => {
    if (typeof window === "undefined") return;
    cardIds.forEach((id) => {
      const el = document.getElementById(id) as HTMLDetailsElement;
      if (el) el.open = false;
    });
    setTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className="rounded-xl border border-slate-800/60 bg-slate-950/40 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900/40 transition-colors"
        onClick={expandAll}
      >
        Expand all
      </button>
      <button
        className="rounded-xl border border-slate-800/60 bg-slate-950/40 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900/40 transition-colors"
        onClick={collapseAll}
      >
        Collapse all
      </button>
    </div>
  );
}
