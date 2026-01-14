"use client";

import { motion, type Variants } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

type KpiTile = {
  metric: string;
  label: string;
  context?: string;
};

type KpiGridSectionProps = {
  title?: string;
  subtitle?: string;
  kpis: KpiTile[];
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export function KpiGridSection({
  title = "KPIs That Move",
  subtitle = "Metrics operators actually track. Improvements measured in weeks, not quarters.",
  kpis,
}: KpiGridSectionProps) {
  return (
    <AnimatedSection className="py-20 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Measurable Impact</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{title}</h2>
          <p className="text-lg text-steel/90 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {kpis.map((kpi) => (
            <motion.div
              key={kpi.label}
              variants={tileVariants}
              className="glass-card p-6 text-center group hover:border-neon/40 transition-all duration-300"
            >
              <p className="text-4xl md:text-5xl font-black text-neon mb-2 group-hover:scale-105 transition-transform">
                {kpi.metric}
              </p>
              <p className="text-sm font-semibold text-white mb-1">{kpi.label}</p>
              {kpi.context && (
                <p className="text-xs text-steel/70">{kpi.context}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
