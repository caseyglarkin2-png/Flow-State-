"use client";

import { motion, type Variants } from "framer-motion";
import { Cpu, BarChart3 } from "lucide-react";

type Module = {
  name: string;
  description: string;
};

type Kpi = {
  label: string;
  target: string;
};

type YardFlowConnectionSectionProps = {
  headline: string;
  modules: Module[];
  kpis: Kpi[];
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function YardFlowConnectionSection({
  headline,
  modules,
  kpis,
}: YardFlowConnectionSectionProps) {
  return (
    <section id="yardflow-connection" className="py-20 border-b border-neon/10 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">
          Platform Connection
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          YardFlow Solution
        </h2>
        <p className="text-lg text-steel/80 mb-12 max-w-3xl">
          {headline}
        </p>

        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Modules Card */}
          <motion.div variants={cardVariants} className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-neon/20 border border-neon/30">
                <Cpu className="text-neon" size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Relevant Modules</h3>
            </div>

            <ul className="space-y-4">
              {modules.map((mod, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-lg bg-void/50 border border-neon/10 hover:border-neon/30 transition-colors"
                >
                  <h4 className="text-white font-semibold mb-1">{mod.name}</h4>
                  <p className="text-steel/70 text-sm">{mod.description}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* KPIs Card */}
          <motion.div variants={cardVariants} className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-ember/20 border border-ember/30">
                <BarChart3 className="text-ember" size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Target KPIs</h3>
            </div>

            <div className="grid gap-4">
              {kpis.map((kpi, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg bg-void/50 border border-neon/10"
                >
                  <span className="text-steel/80">{kpi.label}</span>
                  <span className="text-xl font-bold text-neon">{kpi.target}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
