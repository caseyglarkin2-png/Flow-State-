"use client";

import { motion, type Variants } from "framer-motion";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

type Finding = {
  headline: string;
  detail: string;
};

type KeyFindingsSectionProps = {
  findings: Finding[];
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const icons = [Lightbulb, TrendingUp, AlertTriangle, CheckCircle2];
const colors = ["text-neon", "text-ember", "text-amber-400", "text-emerald-400"];

export function KeyFindingsSection({ findings }: KeyFindingsSectionProps) {
  return (
    <section id="key-findings" className="py-20 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">
          Insights
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Key Findings
        </h2>
        <p className="text-lg text-steel/80 mb-12 max-w-2xl">
          Critical data points from our research that directly impact yard operations.
        </p>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {findings.map((finding, idx) => {
            const IconComponent = icons[idx % icons.length];
            const iconColor = colors[idx % colors.length];

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="glass-card p-8 group hover:border-neon/40 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-void/80 border border-neon/20 ${iconColor}`}>
                    <IconComponent size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon transition-colors">
                      {finding.headline}
                    </h3>
                    <p className="text-steel/80 leading-relaxed">
                      {finding.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
