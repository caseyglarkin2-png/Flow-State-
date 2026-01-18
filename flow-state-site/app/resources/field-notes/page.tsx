"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Clock, Users, ArrowRight, Sparkles } from "lucide-react";

const fieldNotes = [
  {
    slug: "dwell-time-patterns",
    title: "Dwell Time Patterns Across 50+ Yards",
    description:
      "Anonymized analysis of dwell contributors from our network. What actually moves the needle.",
    audience: ["Operations"],
    readTime: "6 min",
    highlight: "Key insight: Gate time has outsized impact on overall dwell",
  },
  {
    slug: "gate-throughput-benchmarks",
    title: "Gate Throughput Benchmarks by Yard Type",
    description:
      "Distribution centers, intermodal terminals, and cross-docks compared. Where are the gaps?",
    audience: ["Site Managers", "Engineering"],
    readTime: "5 min",
    highlight: "Key insight: Cross-docks see highest ROI from gate automation",
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

export default function FieldNotesIndexPage() {
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
                <FileText size={14} />
                Research Library
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={heroItemVariants}
              className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6"
            >
              Field Notes
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={heroItemVariants}
              className="text-xl md:text-2xl text-steel/90 max-w-3xl leading-relaxed"
            >
              Operational patterns and insights from our network. Real
              observations, anonymized data, and lessons learned from yards
              across the industry.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={heroItemVariants}
              className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-neon/10"
            >
              <div className="text-center">
                <p className="text-3xl font-black text-neon">50+</p>
                <p className="text-sm text-steel/70">Yards Analyzed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-neon">2</p>
                <p className="text-sm text-steel/70">Published Notes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-neon">Monthly</p>
                <p className="text-sm text-steel/70">New Research</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Field Notes Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              className="grid md:grid-cols-2 gap-6 mb-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {fieldNotes.map((note) => (
                <motion.div key={note.slug} variants={itemVariants}>
                  <Link
                    href={`/resources/field-notes/${note.slug}`}
                    className="group block h-full glass-card p-8 hover:border-neon/40 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2.5 rounded-lg bg-neon/10 border border-neon/20 group-hover:bg-neon/20 transition-colors">
                        <FileText
                          size={20}
                          className="text-neon"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-steel/60">
                        <Clock size={14} />
                        <span className="text-xs">{note.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon transition-colors">
                      {note.title}
                    </h3>

                    {/* Description */}
                    <p className="text-steel/80 mb-4 leading-relaxed">
                      {note.description}
                    </p>

                    {/* Highlight */}
                    <p className="text-sm text-neon/80 mb-6 border-l-2 border-neon/40 pl-3 italic">
                      {note.highlight}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-neon/10">
                      <div className="flex flex-wrap gap-2">
                        {note.audience.map((a) => (
                          <span
                            key={a}
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-void border border-neon/20 text-steel/80"
                          >
                            <Users size={12} />
                            {a}
                          </span>
                        ))}
                      </div>
                      <ArrowRight
                        size={18}
                        className="text-neon/50 group-hover:text-neon group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* More Coming CTA */}
            <motion.div
              className="glass-card p-8 md:p-10 border-neon/30 relative overflow-hidden"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-neon/10 to-transparent rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                <motion.div
                  variants={itemVariants}
                  className="p-4 rounded-xl bg-neon/10 border border-neon/30"
                >
                  <Sparkles size={32} className="text-neon" />
                </motion.div>

                <div className="flex-1">
                  <motion.h3
                    variants={itemVariants}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    More Field Notes Coming
                  </motion.h3>
                  <motion.p
                    variants={itemVariants}
                    className="text-steel/80 max-w-xl"
                  >
                    Join the network to access our full research library and
                    contribute your own operational insights. New field notes
                    published monthly.
                  </motion.p>
                </div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/contact?intent=qualify"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-void font-semibold rounded-lg hover:bg-neon/90 transition-colors group"
                  >
                    <span>Apply for Co-Development</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
