"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { FileText, Clock, Users, Calendar } from "lucide-react";

type FieldNoteHeroProps = {
  title: string;
  subtitle: string;
  readTime: string;
  audience: string[];
  updatedDate: string;
  backLink?: { label: string; href: string };
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function FieldNoteHero({
  title,
  subtitle,
  readTime,
  audience,
  updatedDate,
  backLink = { label: "← Back to Field Notes", href: "/resources/field-notes" },
}: FieldNoteHeroProps) {
  const formattedDate = new Date(updatedDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden pt-32 pb-16">
      {/* Background grid */}
      <div className="absolute inset-0 grid-background opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void" />

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Back link */}
        <motion.div variants={itemVariants}>
          <Link
            href={backLink.href}
            className="inline-flex items-center gap-2 text-sm text-neon hover:text-neon/80 transition mb-8"
          >
            {backLink.label}
          </Link>
        </motion.div>

        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/30 text-neon text-xs uppercase tracking-wider font-medium">
            <FileText size={14} />
            Field Note
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 max-w-5xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-steel/90 max-w-3xl mb-10 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Meta info */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-6 pt-8 border-t border-neon/10"
        >
          <div className="flex items-center gap-2 text-steel">
            <Clock size={16} className="text-neon/70" />
            <span className="text-sm">{readTime} read</span>
          </div>
          <div className="flex items-center gap-2 text-steel">
            <Users size={16} className="text-neon/70" />
            <span className="text-sm">{audience.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2 text-steel">
            <Calendar size={16} className="text-neon/70" />
            <span className="text-sm">Updated {formattedDate}</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
