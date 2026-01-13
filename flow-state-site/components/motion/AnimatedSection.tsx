"use client";

import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

const baseVariants = (y: number, delay: number): Variants => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay,
    },
  },
});

export function AnimatedSection({
  children,
  className,
  delay = 0,
  y = 18,
  once = true,
}: AnimatedSectionProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });

  return (
    <motion.section
      ref={ref as any}
      className={className}
      variants={baseVariants(y, delay)}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {children}
    </motion.section>
  );
}
