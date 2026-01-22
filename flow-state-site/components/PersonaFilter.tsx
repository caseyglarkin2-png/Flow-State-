"use client";

import React, { useState, useEffect } from "react";
import { Portfolio, Config, Shield, Server } from "@/components/icons/FlowIcons";

type Persona = "CFO" | "Ops" | "Security" | "IT" | "All";

const personas: { value: Persona; label: string; icon: React.ReactNode }[] = [
  { value: "All", label: "All", icon: null },
  { value: "CFO", label: "Finance", icon: <Portfolio className="h-4 w-4" /> },
  { value: "Ops", label: "Operations", icon: <Config className="h-4 w-4" /> },
  { value: "Security", label: "Security", icon: <Shield className="h-4 w-4" /> },
  { value: "IT", label: "IT", icon: <Server className="h-4 w-4" /> }
];

export function PersonaFilter({ cardIds }: { cardIds: string[] }) {
  const [active, setActive] = useState<Persona>("All");

  useEffect(() => {
    if (typeof window === "undefined") return;

    cardIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const cardPersonas = el.getAttribute("data-persona")?.split(",") || [];
      
      if (active === "All") {
        el.style.display = "";
        el.style.order = "";
      } else {
        if (cardPersonas.includes(active)) {
          el.style.display = "";
          el.style.order = "-1"; // Move to top
        } else {
          el.style.opacity = "0.4";
          el.style.order = "999";
        }
      }
    });
  }, [active, cardIds]);

  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-sm text-slate-400 self-center mr-2">Filter by:</span>
      {personas.map((p) => (
        <button
          key={p.value}
          onClick={() => setActive(p.value)}
          className={`
            rounded-xl border px-3 py-2 text-sm transition-all flex items-center gap-2
            ${active === p.value
              ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
              : "border-slate-800/60 bg-slate-950/40 text-slate-300 hover:bg-slate-900/40"
            }
          `}
        >
          {p.icon}
          {p.label}
        </button>
      ))}
    </div>
  );
}
