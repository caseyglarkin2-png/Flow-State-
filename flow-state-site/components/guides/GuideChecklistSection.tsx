"use client";

import { motion, type Variants } from "framer-motion";
import { ClipboardCheck, CircleDot } from "lucide-react";

type ChecklistCategory = {
  title: string;
  items: string[];
};

type GuideChecklistSectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  intro: string;
  categories: ChecklistCategory[];
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export function GuideChecklistSection({
  id,
  eyebrow = "Evaluation",
  title,
  intro,
  categories,
}: GuideChecklistSectionProps) {
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
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="glass-card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-neon/10 border border-neon/20">
                  <ClipboardCheck size={20} className="text-neon" />
                </div>
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
              </div>

              <motion.ul
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {category.items.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={itemVariants}
                    className="flex items-start gap-3 group"
                  >
                    <div className="mt-1 w-5 h-5 rounded border border-neon/30 flex items-center justify-center flex-shrink-0 group-hover:border-neon/60 group-hover:bg-neon/10 transition-colors">
                      <CircleDot size={12} className="text-neon/50 group-hover:text-neon transition-colors" />
                    </div>
                    <span className="text-sm text-steel/80 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
