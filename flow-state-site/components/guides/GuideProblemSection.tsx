"use client";

import { motion, type Variants } from "framer-motion";
import { AlertTriangle, DollarSign, Clock, Users } from "lucide-react";

type StatItem = {
  icon: "alert" | "dollar" | "clock" | "users";
  value: string;
  label: string;
  source?: string;
};

type GuideProblemSectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  intro: string;
  stats?: StatItem[];
  body: string;
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const icons = {
  alert: AlertTriangle,
  dollar: DollarSign,
  clock: Clock,
  users: Users,
};

export function GuideProblemSection({
  id,
  eyebrow = "The Challenge",
  title,
  intro,
  stats,
  body,
}: GuideProblemSectionProps) {
  return (
    <section id={id} className="py-20 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-ember/70 mb-3">
          {eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          {title}
        </h2>
        <p className="text-lg text-steel/80 mb-10 max-w-3xl leading-relaxed">
          {intro}
        </p>

        {stats && stats.length > 0 && (
          <motion.div
            className="glass-card p-6 md:p-8 mb-10 border-ember/20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => {
                const IconComponent = icons[stat.icon];
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="text-center p-4 rounded-lg bg-void/50"
                  >
                    <IconComponent size={24} className="mx-auto text-ember mb-2" />
                    <p className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-steel/70">{stat.label}</p>
                    {stat.source && (
                      <p className="text-[10px] text-steel/50 mt-1">{stat.source}</p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        <motion.div
          className="glass-card p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-steel/90 leading-relaxed text-lg">{body}</p>
        </motion.div>
      </div>
    </section>
  );
}
