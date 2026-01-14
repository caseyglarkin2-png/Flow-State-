"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { DigitalGuardVisual, DigitalCommsVisual, DigitalBOLVisual, DigitalYMSVisual } from "@/components/products/ProductVisualsLite";

type ModuleCard = {
  id: "guard" | "comms" | "bol" | "yms";
  name: string;
  enforces: string[];
  prevents: string;
};

type ModulesSectionProps = {
  title?: string;
  subtitle?: string;
  modules: ModuleCard[];
};

const moduleVisuals: Record<string, React.ReactNode> = {
  guard: <DigitalGuardVisual />,
  comms: <DigitalCommsVisual />,
  bol: <DigitalBOLVisual />,
  yms: <DigitalYMSVisual />,
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ModulesSection({
  title = "The YardFlow Solution",
  subtitle = "Four modules. Same standards. Network-wide enforcement.",
  modules,
}: ModulesSectionProps) {
  return (
    <AnimatedSection className="py-20 border-b border-neon/10 bg-carbon/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">The Platform</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{title}</h2>
          <p className="text-lg text-steel/90 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              variants={cardVariants}
              className="group rounded-2xl border border-neon/20 bg-void/80 overflow-hidden hover:border-neon/40 transition-all duration-300"
            >
              <div className="grid md:grid-cols-[1fr_180px] gap-0">
                {/* Content */}
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-neon/70 font-mono mb-2">
                    Module {i + 1}
                  </p>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon transition-colors">
                    {mod.name}
                  </h3>

                  <div className="space-y-3 mb-4">
                    <p className="text-xs uppercase tracking-wider text-steel/60">Enforces</p>
                    {mod.enforces.map((e) => (
                      <div key={e} className="flex gap-2 text-sm text-steel">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                        <span>{e}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-neon/10">
                    <p className="text-xs uppercase tracking-wider text-ember/70 mb-1">Prevents</p>
                    <p className="text-sm text-steel">{mod.prevents}</p>
                  </div>
                </div>

                {/* Visual */}
                <div className="hidden md:block bg-carbon/50 p-4">
                  {moduleVisuals[mod.id]}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-neon hover:text-neon/80 text-sm font-medium transition"
          >
            See the full platform →
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
