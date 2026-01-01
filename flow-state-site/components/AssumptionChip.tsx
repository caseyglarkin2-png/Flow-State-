'use client';

import React, { useState } from 'react';

type Props = {
  label: string;
  detail: string;
};

export default function AssumptionChip({ label, detail }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        className="px-3 py-1.5 rounded-full border border-neon/20 text-xs text-steel hover:border-neon/40 transition-colors"
      >
        {label}
      </button>
      {open ? <span className="text-xs text-steel/80">{detail}</span> : null}
    </div>
  );
}
