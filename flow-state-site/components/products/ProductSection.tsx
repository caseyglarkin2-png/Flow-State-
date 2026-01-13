"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import Link from "next/link";

type ProductSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  align?: "left" | "right";
  visual?: React.ReactNode;
};

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export function ProductSection({
  eyebrow,
  title,
  description,
  bullets,
  ctaLabel,
  ctaHref,
  align = "left",
  visual,
}: ProductSectionProps) {
  const isRight = align === "right";

  return (
    <AnimatedSection className="py-14 md:py-20 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`grid gap-10 md:grid-cols-2 md:items-center ${isRight ? "md:[&>div:first-child]:order-2" : ""}`}>
          {/* Copy */}
          <div>
            {eyebrow ? (
              <p className="text-xs uppercase tracking-widest text-neon/70 font-mono">
                {eyebrow}
              </p>
            ) : null}

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
              {title}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-steel/90">
              {description}
            </p>

            <motion.ul
              className="mt-7 space-y-3"
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {bullets.map((b) => (
                <motion.li
                  key={b}
                  variants={itemVariants}
                  className="flex gap-3 text-sm text-steel/90"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neon/90" />
                  <span>{b}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-8">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-lg border border-neon/40 bg-neon/10 px-5 py-3 text-sm font-bold text-neon hover:bg-neon hover:text-void transition-all"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* Visual panel */}
          <motion.div
            className="rounded-2xl border border-neon/20 bg-carbon/40 p-6 shadow-[0_0_0_1px_rgba(0,255,255,0.06)]"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {visual || (
              <>
                <div className="h-48 w-full rounded-xl border border-neon/10 bg-gradient-to-b from-carbon/40 to-void/40" />
                <p className="mt-4 text-xs text-steel/60 text-center">
                  Animation placeholder
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
