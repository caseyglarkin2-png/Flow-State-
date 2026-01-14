"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle2, XCircle, Target, AlertCircle } from "lucide-react";

type GuideAudienceSectionProps = {
  whoThisIsFor: string[];
  whoThisIsNotFor: string[];
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function GuideAudienceSection({
  whoThisIsFor,
  whoThisIsNotFor,
}: GuideAudienceSectionProps) {
  return (
    <section className="py-12 border-b border-neon/10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Who This Is For */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-6 md:p-8 border-neon/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-neon/20 border border-neon/30">
                <Target className="text-neon" size={20} />
              </div>
              <h4 className="font-semibold text-neon uppercase tracking-wider text-sm">
                Who This Is For
              </h4>
            </div>

            <ul className="space-y-4">
              {whoThisIsFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-neon flex-shrink-0 mt-0.5"
                  />
                  <span className="text-steel/90 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Who This Is Not For */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-6 md:p-8 border-steel/20 bg-void/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-steel/10 border border-steel/20">
                <AlertCircle className="text-steel/60" size={20} />
              </div>
              <h4 className="font-semibold text-steel/60 uppercase tracking-wider text-sm">
                Who This Is Not For
              </h4>
            </div>

            <ul className="space-y-4">
              {whoThisIsNotFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <XCircle
                    size={18}
                    className="text-steel/40 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-steel/60 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
