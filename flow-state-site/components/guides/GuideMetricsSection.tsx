"use client";

import { motion, type Variants } from "framer-motion";
import { TrendingUp, TrendingDown, Target } from "lucide-react";

type Metric = {
  label: string;
  description: string;
};

type GuideMetricsSectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  intro: string;
  leadingIndicators: Metric[];
  laggingIndicators: Metric[];
  resultsCallout?: {
    title: string;
    description: string;
  };
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function GuideMetricsSection({
  id,
  eyebrow = "Measurement",
  title,
  intro,
  leadingIndicators,
  laggingIndicators,
  resultsCallout,
}: GuideMetricsSectionProps) {
  return (
    <section id={id} className="py-20 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">
          {eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          {title}
        </h2>
        <p className="text-lg text-steel/80 mb-12 max-w-3xl">
          {intro}
        </p>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Leading Indicators */}
          <motion.div variants={cardVariants} className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-neon/10 border border-neon/30">
                <TrendingUp size={22} className="text-neon" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Leading Indicators</h3>
                <p className="text-xs text-steel/60">Predictive metrics</p>
              </div>
            </div>

            <div className="space-y-5">
              {leadingIndicators.map((metric, i) => (
                <div key={i} className="p-4 rounded-lg bg-void/50 border border-neon/10 hover:border-neon/30 transition-colors">
                  <p className="text-sm font-semibold text-white mb-1">{metric.label}</p>
                  <p className="text-sm text-steel/70">{metric.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lagging Indicators */}
          <motion.div variants={cardVariants} className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-ember/10 border border-ember/30">
                <Target size={22} className="text-ember" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Lagging Indicators</h3>
                <p className="text-xs text-steel/60">Outcome metrics</p>
              </div>
            </div>

            <div className="space-y-5">
              {laggingIndicators.map((metric, i) => (
                <div key={i} className="p-4 rounded-lg bg-void/50 border border-neon/10 hover:border-ember/30 transition-colors">
                  <p className="text-sm font-semibold text-white mb-1">{metric.label}</p>
                  <p className="text-sm text-steel/70">{metric.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Results Callout */}
        {resultsCallout && (
          <motion.div
            className="mt-10 glass-card p-8 border-emerald-500/30 bg-emerald-500/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <TrendingUp size={22} className="text-emerald-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">{resultsCallout.title}</h4>
                <p className="text-steel/80 leading-relaxed">{resultsCallout.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
