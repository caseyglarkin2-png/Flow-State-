"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";

type FieldNoteCTAProps = {
  title?: string;
  description?: string;
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function FieldNoteCTA({
  title = "Ready to Apply These Insights?",
  description = "See how these findings translate into measurable improvements for your specific yard operations.",
}: FieldNoteCTAProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-background opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/95 to-void" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <CalendarCheck className="mx-auto text-neon" size={48} />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-black text-white mb-4"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg text-steel/80 mb-10 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-neon text-void font-semibold hover:bg-neon/90 transition-colors group"
          >
            <span>Request Demo</span>
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/yardbuilder"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-transparent border-2 border-neon/50 text-neon font-semibold hover:bg-neon/10 hover:border-neon transition-colors"
          >
            Start Your Map
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
