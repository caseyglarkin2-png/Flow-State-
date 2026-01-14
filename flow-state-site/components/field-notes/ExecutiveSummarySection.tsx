"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle } from "lucide-react";

type ExecutiveSummarySectionProps = {
  points: string[];
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function ExecutiveSummarySection({
  points,
}: ExecutiveSummarySectionProps) {
  return (
    <section id="executive-summary" className="py-20 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">
          Overview
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-12">
          Executive Summary
        </h2>

        <motion.div
          className="glass-card p-8 md:p-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <ol className="space-y-6">
            {points.map((point, idx) => (
              <motion.li
                key={idx}
                variants={itemVariants}
                className="flex gap-4 items-start"
              >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-neon/20 text-neon font-bold text-sm border border-neon/30">
                  {idx + 1}
                </span>
                <p className="text-steel/90 text-lg leading-relaxed pt-1">
                  {point}
                </p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
