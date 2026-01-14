"use client";

import { motion, type Variants } from "framer-motion";
import { AlertCircle, Info, Lightbulb, CheckCircle2 } from "lucide-react";

type GuideCalloutProps = {
  variant: "info" | "warning" | "tip" | "success";
  title: string;
  children: React.ReactNode;
  source?: string;
};

const variants = {
  info: {
    icon: Info,
    border: "border-neon/30",
    bg: "bg-neon/5",
    iconColor: "text-neon",
    titleColor: "text-neon",
  },
  warning: {
    icon: AlertCircle,
    border: "border-ember/30",
    bg: "bg-ember/5",
    iconColor: "text-ember",
    titleColor: "text-ember",
  },
  tip: {
    icon: Lightbulb,
    border: "border-amber-400/30",
    bg: "bg-amber-400/5",
    iconColor: "text-amber-400",
    titleColor: "text-amber-400",
  },
  success: {
    icon: CheckCircle2,
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/5",
    iconColor: "text-emerald-400",
    titleColor: "text-emerald-400",
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function GuideCallout({ variant, title, children, source }: GuideCalloutProps) {
  const config = variants[variant];
  const IconComponent = config.icon;

  return (
    <motion.div
      className={`glass-card p-6 ${config.border} ${config.bg}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg bg-void/50 border ${config.border}`}>
          <IconComponent size={20} className={config.iconColor} />
        </div>
        <div className="flex-1">
          <h4 className={`font-bold mb-2 ${config.titleColor}`}>{title}</h4>
          <div className="text-steel/80 text-sm leading-relaxed space-y-2">
            {children}
          </div>
          {source && (
            <p className="text-xs text-steel/50 mt-3">{source}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
