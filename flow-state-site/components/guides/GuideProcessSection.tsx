"use client";

import { motion, type Variants } from "framer-motion";
import { Workflow, Users, AlertCircle } from "lucide-react";

type ProcessCategory = {
  title: string;
  icon: "workflow" | "users" | "alert";
  items: string[];
};

type GuideProcessSectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  intro: string;
  categories: ProcessCategory[];
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const icons = {
  workflow: Workflow,
  users: Users,
  alert: AlertCircle,
};

export function GuideProcessSection({
  id,
  eyebrow = "Process Framework",
  title,
  intro,
  categories,
}: GuideProcessSectionProps) {
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
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {categories.map((category, idx) => {
            const IconComponent = icons[category.icon];

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="glass-card p-6 group hover:border-neon/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-neon/10 border border-neon/20">
                    <IconComponent size={20} className="text-neon" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-neon transition-colors">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neon/70 flex-shrink-0" />
                      <span className="text-sm text-steel/80 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
