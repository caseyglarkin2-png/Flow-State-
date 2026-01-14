"use client";

import { motion, type Variants } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

type VolatilityTaxProps = {
  title?: string;
  subtitle?: string;
  bullets: string[];
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function VolatilityTaxSection({
  title = "The Volatility Tax",
  subtitle = "Your operation is paying it every day. Most teams just call it 'normal.'",
  bullets,
}: VolatilityTaxProps) {
  return (
    <AnimatedSection className="py-20 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-ember/30 bg-gradient-to-br from-ember/10 via-carbon/50 to-void p-10 md:p-14">
          <div className="flex items-start gap-6">
            <div className="hidden md:flex shrink-0 h-14 w-14 items-center justify-center rounded-2xl bg-ember/20 border border-ember/30">
              <AlertTriangle className="h-7 w-7 text-ember" />
            </div>
            
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.25em] text-ember/80 mb-3">The Problem</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{title}</h2>
              <p className="text-lg text-steel/90 mb-8 max-w-[68ch]">{subtitle}</p>

              <motion.ul
                className="space-y-4"
                variants={listVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {bullets.map((bullet) => (
                  <motion.li
                    key={bullet}
                    variants={itemVariants}
                    className="flex gap-4 items-start"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ember" />
                    <span className="text-base text-steel leading-relaxed">{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
