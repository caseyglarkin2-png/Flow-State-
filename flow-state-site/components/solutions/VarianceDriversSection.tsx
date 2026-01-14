"use client";

import { motion, type Variants } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

type VarianceDriver = {
  title: string;
  body: string;
  consequence?: string;
};

type VarianceDriversProps = {
  title?: string;
  subtitle?: string;
  drivers: VarianceDriver[];
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function VarianceDriversSection({
  title = "Where Variance Comes From",
  subtitle = "Every manual process is a variance generator. Here is where your yard leaks.",
  drivers,
}: VarianceDriversProps) {
  return (
    <AnimatedSection className="py-20 border-b border-neon/10 bg-carbon/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Root Causes</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{title}</h2>
          <p className="text-lg text-steel/90 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {drivers.map((driver) => (
            <motion.div
              key={driver.title}
              variants={cardVariants}
              className="group rounded-2xl border border-neon/20 bg-void/80 p-6 hover:border-neon/40 hover:bg-carbon/50 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-neon transition-colors">
                {driver.title}
              </h3>
              <p className="text-[15px] text-steel leading-relaxed mb-4">{driver.body}</p>
              {driver.consequence && (
                <p className="text-sm text-ember/90 border-t border-neon/10 pt-4">
                  <span className="font-semibold">Cost:</span> {driver.consequence}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
