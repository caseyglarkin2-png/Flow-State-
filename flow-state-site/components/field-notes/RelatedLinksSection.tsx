"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";

type RelatedLink = {
  label: string;
  href: string;
};

type RelatedLinksSectionProps = {
  links: RelatedLink[];
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function RelatedLinksSection({ links }: RelatedLinksSectionProps) {
  if (!links || links.length === 0) return null;

  return (
    <section className="py-16 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">
          Learn More
        </p>
        <h3 className="text-2xl font-bold text-white mb-8">Related Resources</h3>

        <motion.div
          className="flex flex-wrap gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {links.map((link, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Link
                href={link.href}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-void border border-neon/20 text-steel hover:text-white hover:border-neon/50 transition-all group"
              >
                <span>{link.label}</span>
                <ExternalLink
                  size={14}
                  className="text-neon/50 group-hover:text-neon transition-colors"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
