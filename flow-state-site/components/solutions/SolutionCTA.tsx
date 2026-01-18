"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { ArrowRight, Calendar } from "lucide-react";
import { BRAND } from "@/config/brand";

type SolutionCTAProps = {
  headline?: string;
  subhead?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tertiaryCta?: { label: string; href: string };
  showTertiary?: boolean;
};

export function SolutionCTA({
  headline = "Ready to eliminate variance?",
  subhead = "Book a Network Audit to identify pilot sites, or apply for the Co-Development Program to influence the roadmap.",
  primaryCta = { label: BRAND.ctas.primary.label, href: BRAND.ctas.primary.href },
  secondaryCta = { label: BRAND.ctas.secondary.label, href: BRAND.ctas.secondary.href },
  tertiaryCta = { label: BRAND.ctas.utility.roi.label, href: BRAND.ctas.utility.roi.href },
  showTertiary = true,
}: SolutionCTAProps) {
  return (
    <AnimatedSection className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-background opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-4">Get Started</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            <span className="neon-glow-static">{headline}</span>
          </h2>
          <p className="text-lg text-steel/90 max-w-2xl mx-auto mb-10">
            {subhead}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-neon px-8 py-4 text-base font-semibold text-void hover:bg-neon/90 hover:shadow-[0_0_30px_rgba(0,180,255,0.4)] transition-all duration-300"
            >
              <Calendar className="h-5 w-5" />
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neon/40 bg-void/50 px-8 py-4 text-base font-semibold text-neon hover:bg-neon/10 hover:border-neon/60 transition-all duration-300"
            >
              {secondaryCta.label}
              <ArrowRight className="h-5 w-5" />
            </Link>
            {showTertiary && (
              <Link
                href={tertiaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium text-steel/80 hover:text-neon transition-all underline"
              >
                {tertiaryCta.label}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
