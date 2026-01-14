"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronRight } from "lucide-react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

type StandardGroup = {
  category: string;
  items: string[];
};

type StandardizationMapProps = {
  title?: string;
  microThesis?: string;
  groups: StandardGroup[];
  showToggle?: boolean;
};

export function StandardizationMapSection({
  title = "What We Standardize First",
  microThesis = "Standards create predictability. Predictability beats cheap.",
  groups,
  showToggle = true,
}: StandardizationMapProps) {
  const [viewMode, setViewMode] = useState<"before" | "after">("after");

  return (
    <AnimatedSection className="py-20 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">The Playbook</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{title}</h2>
            <p className="text-lg text-steel/90 max-w-xl">{microThesis}</p>
          </div>

          {showToggle && (
            <div className="flex items-center gap-2 bg-carbon/60 border border-neon/20 rounded-xl p-1.5">
              <button
                onClick={() => setViewMode("before")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === "before"
                    ? "bg-ember/20 text-ember border border-ember/30"
                    : "text-steel hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <X size={14} />
                  Before
                </span>
              </button>
              <button
                onClick={() => setViewMode("after")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === "after"
                    ? "bg-neon/20 text-neon border border-neon/30"
                    : "text-steel hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Check size={14} />
                  After
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {groups.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.05 }}
                className={`rounded-2xl border p-6 transition-all duration-300 ${
                  viewMode === "after"
                    ? "border-neon/30 bg-carbon/50"
                    : "border-ember/20 bg-ember/5"
                }`}
              >
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${
                  viewMode === "after" ? "text-neon" : "text-ember/80"
                }`}>
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      {viewMode === "after" ? (
                        <Check size={16} className="mt-0.5 shrink-0 text-neon" />
                      ) : (
                        <X size={16} className="mt-0.5 shrink-0 text-ember/60" />
                      )}
                      <span className={viewMode === "after" ? "text-steel" : "text-steel/60 line-through"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-sm text-steel/70">
          <ChevronRight size={14} className="inline mr-1" />
          Standards compound across the network. The second site is faster than the first.
        </p>
      </div>
    </AnimatedSection>
  );
}
