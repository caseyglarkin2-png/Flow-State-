"use client";

import { motion, type Variants } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { CheckCircle } from "lucide-react";

type RolloutStep = {
  phase: string;
  title: string;
  description: string;
  duration: string;
};

type RolloutPlanSectionProps = {
  title?: string;
  subtitle?: string;
  steps: RolloutStep[];
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function RolloutPlanSection({
  title = "Rollout Plan",
  subtitle = "Three phases. Minimal disruption. Measurable results at each step.",
  steps,
}: RolloutPlanSectionProps) {
  return (
    <AnimatedSection className="py-20 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Implementation</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{title}</h2>
          <p className="text-lg text-steel/90 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Timeline line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-neon/40 via-neon/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.phase}
                variants={stepVariants}
                className="relative grid md:grid-cols-[48px_1fr] gap-4 items-start"
              >
                {/* Step indicator */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-void border-2 border-neon/40 flex items-center justify-center">
                      <span className="text-neon font-bold text-lg">{i + 1}</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-neon/20 blur-lg -z-10" />
                  </div>
                </div>

                {/* Content */}
                <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6 hover:border-neon/40 transition-all duration-300 group">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs uppercase tracking-wider text-neon/70 font-mono">
                      {step.phase}
                    </span>
                    <span className="text-xs text-steel/60 border border-steel/20 rounded-full px-3 py-1">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-steel/80">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
