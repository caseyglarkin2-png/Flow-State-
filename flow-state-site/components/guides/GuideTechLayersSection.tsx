"use client";

import { motion, type Variants } from "framer-motion";
import { Layers, Scan, Database, FileText, Shield, Cpu } from "lucide-react";
import Link from "next/link";
import { getModuleByName, ICON_SIZES } from "@/lib/modules";

type TechLayer = {
  number: number;
  title: string;
  description: string;
  capabilities: string[];
  icon: "scan" | "database" | "file" | "shield" | "cpu" | "layers";
};

type GuideTechLayersSectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  intro: string;
  layers: TechLayer[];
  yardflowCallout?: {
    title: string;
    items: Array<{ module: string; description: string }>;
  };
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const icons = {
  scan: Scan,
  database: Database,
  file: FileText,
  shield: Shield,
  cpu: Cpu,
  layers: Layers,
};

export function GuideTechLayersSection({
  id,
  eyebrow = "Technology Stack",
  title,
  intro,
  layers,
  yardflowCallout,
}: GuideTechLayersSectionProps) {
  return (
    <section id={id} className="py-20 border-b border-neon/10 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
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
          className="space-y-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {layers.map((layer) => {
            const IconComponent = icons[layer.icon];

            return (
              <motion.div
                key={layer.number}
                variants={cardVariants}
                className="glass-card p-6 md:p-8 group hover:border-neon/40 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Layer number & icon */}
                  <div className="flex items-center gap-4 md:flex-col md:items-center md:w-24 flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-neon/20 border border-neon/30 flex items-center justify-center">
                      <span className="text-2xl font-black text-neon">{layer.number}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-void border border-neon/20">
                      <IconComponent size={20} className="text-neon/70" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon transition-colors">
                      {layer.title}
                    </h3>
                    <p className="text-steel/80 mb-5 leading-relaxed">
                      {layer.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {layer.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neon flex-shrink-0" />
                          <span className="text-sm text-steel/70">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* YardFlow Callout */}
        {yardflowCallout && (
          <motion.div
            className="mt-12 glass-card p-8 border-neon/30 bg-neon/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="text-neon" size={24} />
              <h4 className="text-lg font-bold text-white">{yardflowCallout.title}</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {yardflowCallout.items.map((item, i) => {
                const moduleData = getModuleByName(item.module);
                const ModuleIcon = moduleData?.icon;
                
                if (moduleData) {
                  return (
                    <Link
                      key={i}
                      href={moduleData.route}
                      aria-label={`View ${moduleData.name} product page`}
                      className="group p-4 rounded-lg bg-void/50 border border-neon/20 hover:border-neon/40 hover:bg-void/70 transition-all focus:outline-none focus:ring-2 focus:ring-neon/50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {ModuleIcon && <ModuleIcon size={ICON_SIZES.sm} className="text-neon/70 group-hover:text-neon transition-colors" />}
                        <p className="text-sm font-semibold text-neon group-hover:text-white transition-colors">{item.module}</p>
                      </div>
                      <p className="text-sm text-steel/70">{item.description}</p>
                    </Link>
                  );
                }
                
                return (
                  <div key={i} className="p-4 rounded-lg bg-void/50 border border-neon/20">
                    <p className="text-sm font-semibold text-neon mb-2">{item.module}</p>
                    <p className="text-sm text-steel/70">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
