/**
 * CAPABILITY SLICE COMPONENT
 * 
 * Purpose: Headline + colored subhead + bullets + proof visual (phone/desktop/workflow)
 * Design: Left text, right media; alternates per variant
 * Usage: Product module sections, Solutions archetype pages, Procurement capabilities
 * 
 * Maps to operational outcomes: dwell, detention, labor, throughput, compliance
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/motion-presets';

interface CapabilitySliceBullet {
  icon?: React.ReactNode;
  text: string;
}

interface CapabilitySliceProps {
  headline: string;
  subhead?: string;
  bullets: CapabilitySliceBullet[];
  mediaType?: 'phone' | 'desktop' | 'workflow';
  mediaImage: string;
  mediaAlt: string;
  kpiLabel?: string;
  kpiValue?: string;
  align?: 'left' | 'right';
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function CapabilitySlice({
  headline,
  subhead,
  bullets,
  mediaType = 'desktop',
  mediaImage,
  mediaAlt,
  kpiLabel,
  kpiValue,
  align = 'left',
  variant = 'primary',
  className = '',
}: CapabilitySliceProps) {
  // Variant styling
  const variantClasses = {
    primary: 'bg-carbon/30 border-neon/20',
    secondary: 'bg-void border-neon/10',
  };

  const accentClasses = {
    primary: 'text-neon',
    secondary: 'text-steel/70',
  };

  // Media container size based on type
  const mediaContainerClasses = {
    phone: 'aspect-[9/16] max-w-sm',
    desktop: 'aspect-video max-w-2xl',
    workflow: 'aspect-video max-w-3xl',
  };

  // Layout: left-right or right-left
  const contentOrder = align === 'left' ? 'order-1' : 'order-2';
  const mediaOrder = align === 'left' ? 'order-2' : 'order-1';

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`py-16 border-t border-b ${variantClasses[variant]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div variants={staggerItem} className={contentOrder}>
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              {headline}
            </h2>

            {/* Subhead (accent color) */}
            {subhead && (
              <p className={`text-xl font-bold mb-6 ${accentClasses[variant]}`}>
                {subhead}
              </p>
            )}

            {/* Bullets */}
            <ul className="space-y-4 mb-8">
              {bullets.map((bullet, idx) => (
                <motion.li
                  key={idx}
                  variants={staggerItem}
                  className="flex items-start gap-3"
                >
                  {bullet.icon && (
                    <div className="flex-shrink-0 w-6 h-6 text-neon mt-1">
                      {bullet.icon}
                    </div>
                  )}
                  <p className="text-steel text-base leading-relaxed">
                    {bullet.text}
                  </p>
                </motion.li>
              ))}
            </ul>

            {/* KPI Callout */}
            {kpiLabel && kpiValue && (
              <motion.div
                variants={staggerItem}
                className="p-4 rounded-lg bg-neon/10 border border-neon/20"
              >
                <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold">
                  {kpiLabel}
                </p>
                <p className="text-3xl font-black text-neon mt-2">
                  {kpiValue}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Media */}
          <motion.div
            variants={staggerItem}
            className={`${mediaOrder} relative ${mediaContainerClasses[mediaType]} mx-auto`}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-neon/20 shadow-2xl shadow-neon/10">
              {mediaImage.endsWith('.mp4') ? (
                <video
                  src={mediaImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={mediaImage}
                  alt={mediaAlt}
                  fill
                  className="object-cover"
                  quality={90}
                />
              )}
            </div>

            {/* Media type indicator (subtle) */}
            {mediaType === 'phone' && (
              <div className="absolute -inset-1 rounded-3xl border-8 border-carbon/50 pointer-events-none" />
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
