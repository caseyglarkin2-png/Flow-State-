"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Manifest,
  Timeline,
  Team,
  FlowArrow,
  Shield,
  Nexus,
  Confirm,
} from "@/components/icons/FlowIcons";

const guides = [
  {
    slug: "cargo-theft-prevention",
    title: "Cargo Theft Prevention",
    subtitle: "Technology & Process Approaches",
    description:
      "How leading logistics operators reduce theft exposure through identity verification, visibility, and layered security protocols.",
    audience: ["Security Directors", "Procurement", "Operations Managers"],
    readTime: "12 min",
    icon: Shield,
    highlight: "Digital Guard automates ID verification and carrier screening",
  },
  {
    slug: "network-effect-yard-automation",
    title: "Network Effects in Yard Automation",
    subtitle: "Multi-Site Value Creation",
    description:
      "Understanding how connected yards create compounding operational advantages and the economics behind multi-site adoption.",
    audience: ["VPs Operations", "CFOs", "Strategy"],
    readTime: "10 min",
    icon: Nexus,
    highlight: "50+ facilities see 1.25-1.40x network multiplier on savings",
  },
  {
    slug: "ctpat-tsa-compliance",
    title: "C-TPAT & TSA Compliance",
    subtitle: "Operational Readiness",
    description:
      "A practical framework for maintaining supply chain security certification while minimizing compliance overhead.",
    audience: ["Compliance Officers", "Security", "Legal"],
    readTime: "8 min",
    icon: Confirm,
    highlight: "Evidence Vault provides audit-ready documentation",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const heroVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function GuidesIndexPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void">
        {/* Premium Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20">
          {/* Background grid */}
          <div className="absolute inset-0 grid-background opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void" />

          <motion.div
            className="relative z-10 mx-auto max-w-6xl px-6"
            variants={heroVariants}
            initial="hidden"
            animate="show"
          >
            {/* Back link */}
            <motion.div variants={heroItemVariants}>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-sm text-neon hover:text-neon/80 transition mb-8"
              >
                ← Back to Resources
              </Link>
            </motion.div>

            {/* Badge */}
            <motion.div variants={heroItemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/30 text-neon text-xs uppercase tracking-wider font-medium">
                <Manifest size={14} />
                Deep-Dive Frameworks
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={heroItemVariants}
              className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6"
            >
              Guides
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={heroItemVariants}
              className="text-xl md:text-2xl text-steel/90 max-w-3xl leading-relaxed"
            >
              Deep-dive frameworks for specific operational challenges. Written
              for enterprise buyers and operators evaluating yard automation,
              security, and network optimization.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={heroItemVariants}
              className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-neon/10"
            >
              <div className="text-center">
                <p className="text-3xl font-black text-neon">3</p>
                <p className="text-sm text-steel/70">Published Guides</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-neon">30 min</p>
                <p className="text-sm text-steel/70">Total Read Time</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-neon">Enterprise</p>
                <p className="text-sm text-steel/70">Buyer Focused</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Guides Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {guides.map((guide) => {
                const IconComponent = guide.icon;
                return (
                  <motion.div key={guide.slug} variants={itemVariants}>
                    <Link
                      href={`/resources/guides/${guide.slug}`}
                      className="group flex flex-col h-full glass-card p-8 hover:border-neon/40 transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2.5 rounded-lg bg-neon/10 border border-neon/20 group-hover:bg-neon/20 transition-colors">
                          <IconComponent size={20} className="text-neon" />
                        </div>
                        <div className="flex items-center gap-2 text-steel/60">
                          <Timeline size={14} />
                          <span className="text-xs">{guide.readTime}</span>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-neon/70 mb-3">
                        {guide.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-steel/80 text-sm mb-4 leading-relaxed flex-grow">
                        {guide.description}
                      </p>

                      {/* Highlight */}
                      <p className="text-xs text-neon/80 mb-6 border-l-2 border-neon/40 pl-3 italic">
                        {guide.highlight}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-neon/10 mt-auto">
                        <div className="flex flex-wrap gap-1.5">
                          {guide.audience.slice(0, 2).map((a) => (
                            <span
                              key={a}
                              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-void border border-neon/20 text-steel/70"
                            >
                              {a}
                            </span>
                          ))}
                          {guide.audience.length > 2 && (
                            <span className="text-xs text-steel/50">
                              +{guide.audience.length - 2}
                            </span>
                          )}
                        </div>
                        <FlowArrow
                          size={18}
                          className="text-neon/50 group-hover:text-neon group-hover:translate-x-1 transition-all"
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
