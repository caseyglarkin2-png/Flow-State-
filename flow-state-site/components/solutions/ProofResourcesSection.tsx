"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { FileText, PlayCircle, Calculator, ArrowRight } from "lucide-react";

type ProofLink = {
  type: "field-note" | "simulation" | "calculator" | "case-study";
  title: string;
  description: string;
  href: string;
};

type ProofResourcesSectionProps = {
  title?: string;
  subtitle?: string;
  links: ProofLink[];
};

const typeConfig: Record<string, { icon: React.ElementType; tag: string; color: string }> = {
  "field-note": { icon: FileText, tag: "Field Note", color: "text-neon" },
  simulation: { icon: PlayCircle, tag: "Simulation", color: "text-ember" },
  calculator: { icon: Calculator, tag: "Calculator", color: "text-neon" },
  "case-study": { icon: FileText, tag: "Case Study", color: "text-neon" },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ProofResourcesSection({
  title = "Go Deeper",
  subtitle = "Explore the evidence. Run the numbers. See the simulations.",
  links,
}: ProofResourcesSectionProps) {
  return (
    <AnimatedSection className="py-20 border-b border-neon/10 bg-carbon/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Proof & Resources</p>
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
          {links.map((link) => {
            const config = typeConfig[link.type];
            const Icon = config.icon;
            return (
              <motion.div key={link.href} variants={cardVariants}>
                <Link
                  href={link.href}
                  className="block h-full rounded-2xl border border-neon/20 bg-void/80 p-6 hover:border-neon/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`h-4 w-4 ${config.color}`} />
                    <span className={`text-xs uppercase tracking-wider ${config.color}/70`}>
                      {config.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-steel/80 mb-4">{link.description}</p>
                  <div className="flex items-center gap-1 text-neon text-sm font-medium">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
