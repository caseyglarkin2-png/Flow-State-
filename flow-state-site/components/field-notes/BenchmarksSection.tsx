"use client";

import { motion, type Variants } from "framer-motion";
import { Table2 } from "lucide-react";

type BenchmarkRow = {
  label: string;
  average: string;
  topQuartile: string;
  bottomQuartile: string;
};

type BenchmarksSectionProps = {
  title: string;
  description: string;
  rows: BenchmarkRow[];
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export function BenchmarksSection({
  title,
  description,
  rows,
}: BenchmarksSectionProps) {
  return (
    <section id="benchmarks" className="py-20 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">
          Data
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          {title}
        </h2>
        <p className="text-lg text-steel/80 mb-12 max-w-2xl">
          {description}
        </p>

        <motion.div
          className="glass-card overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 p-4 md:p-6 bg-neon/5 border-b border-neon/20">
            <div className="flex items-center gap-2">
              <Table2 size={16} className="text-neon/70" />
              <span className="text-xs uppercase tracking-wider text-neon/80 font-medium">
                Metric
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs uppercase tracking-wider text-steel/60 font-medium">
                Average
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs uppercase tracking-wider text-emerald-400/80 font-medium">
                Top Quartile
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs uppercase tracking-wider text-ember/80 font-medium">
                Bottom Quartile
              </span>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-neon/10">
            {rows.map((row, idx) => (
              <motion.div
                key={idx}
                variants={rowVariants}
                className="grid grid-cols-4 gap-4 p-4 md:p-6 hover:bg-neon/5 transition-colors"
              >
                <div className="text-white font-medium text-sm md:text-base">
                  {row.label}
                </div>
                <div className="text-center text-steel text-sm md:text-base">
                  {row.average}
                </div>
                <div className="text-center text-emerald-400 font-semibold text-sm md:text-base">
                  {row.topQuartile}
                </div>
                <div className="text-center text-ember font-semibold text-sm md:text-base">
                  {row.bottomQuartile}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
