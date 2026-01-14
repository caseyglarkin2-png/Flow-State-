"use client";

import { motion, type Variants } from "framer-motion";
import { AlertCircle, ArrowRight } from "lucide-react";

type ImplicationsSectionProps = {
  implications: string[];
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function ImplicationsSection({
  implications,
}: ImplicationsSectionProps) {
  return (
    <section id="implications" className="py-20 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-ember/70 mb-3">
          Strategic Impact
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Implications for Your Yard
        </h2>
        <p className="text-lg text-steel/80 mb-12 max-w-2xl">
          What these findings mean for your operations and where to focus improvement efforts.
        </p>

        <motion.div
          className="glass-card p-8 md:p-10 border-ember/30 bg-ember/5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <div className="flex items-center gap-3 mb-8">
            <AlertCircle className="text-ember" size={24} />
            <span className="text-ember font-semibold uppercase tracking-wider text-sm">
              Key Implications
            </span>
          </div>

          <ul className="space-y-5">
            {implications.map((implication, idx) => (
              <motion.li
                key={idx}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <ArrowRight
                  size={20}
                  className="text-ember flex-shrink-0 mt-1"
                />
                <p className="text-steel/90 text-lg leading-relaxed">
                  {implication}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
