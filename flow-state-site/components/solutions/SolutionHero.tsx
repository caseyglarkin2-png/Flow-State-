"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Crosshair } from "lucide-react";

type KpiTile = {
  label: string;
  value: string;
  subtext?: string;
};

type SolutionHeroProps = {
  eyebrow: string;
  headline: string;
  subhead: string;
  kpis: KpiTile[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backLink?: { label: string; href: string };
  personaTag?: string;
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function SolutionHero({
  eyebrow,
  headline,
  subhead,
  kpis,
  primaryCta,
  secondaryCta,
  backLink = { label: "← Back to Solutions", href: "/solutions" },
  personaTag,
}: SolutionHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-32 pb-16">
      {/* Background grid */}
      <div className="absolute inset-0 grid-background opacity-20" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void" />

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Navigation row */}
        <motion.div variants={itemVariants} className="flex items-center justify-between gap-4 mb-12">
          <Link href={backLink.href} className="text-sm text-neon hover:text-neon/80 transition">
            {backLink.label}
          </Link>
          {personaTag && (
            <span className="text-xs text-steel/70 uppercase tracking-wider">{personaTag}</span>
          )}
        </motion.div>

        {/* Main hero content */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.p
            variants={itemVariants}
            className="text-neon font-mono text-sm tracking-widest mb-6 uppercase"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight"
          >
            {headline}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-steel/90 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {subhead}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-neon text-void hover:shadow-lg hover:shadow-neon/30 transition-all"
            >
              <Crosshair size={20} />
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold border border-neon/30 text-white hover:border-neon/60 hover:bg-neon/5 transition-all"
              >
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        </div>

        {/* KPI Tiles */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="glass-card p-6 text-center border border-neon/20 hover:border-neon/40 transition-colors"
            >
              <p className="text-xs text-steel uppercase tracking-wider mb-2">{kpi.label}</p>
              <p className="text-3xl font-black text-neon mb-1">{kpi.value}</p>
              {kpi.subtext && (
                <p className="text-sm text-steel/70">{kpi.subtext}</p>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
