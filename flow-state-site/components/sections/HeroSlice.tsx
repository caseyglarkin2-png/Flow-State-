/**
 * HERO SLICE COMPONENT
 * 
 * Purpose: Full-bleed hero section with headline, subhead, CTA
 * Design: gradient overlay + background image/video + oversized headline hierarchy
 * Usage: Homepage hero, Product page hero, Solutions archetype heroes
 * 
 * Props are flexible to support multiple contexts (CFO-friendly, product-focused, archetype-specific)
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/motion-presets';

interface HeroSliceProps {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: 'dark' | 'light';
  minHeight?: 'screen' | 'min' | 'lg';
  className?: string;
}

export default function HeroSlice({
  eyebrow,
  headline,
  subhead,
  description,
  backgroundImage,
  backgroundVideo,
  primaryCta,
  secondaryCta,
  variant = 'dark',
  minHeight = 'screen',
  className = '',
}: HeroSliceProps) {
  const heightClasses = {
    screen: 'min-h-screen',
    min: 'min-h-[600px]',
    lg: 'min-h-[800px]',
  };

  const overlayOpacity = variant === 'dark' ? 'from-void/80 via-void/60 to-void/40' : 'from-void/40 via-void/20 to-transparent';

  return (
    <section className={`relative w-full ${heightClasses[minHeight]} flex items-center justify-center overflow-hidden bg-void ${className}`}>
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={headline}
          fill
          className="absolute inset-0 object-cover"
          priority
          quality={85}
        />
      )}

      {/* Background Video (fallback) */}
      {backgroundVideo && !backgroundImage && (
        <video
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayOpacity}`} />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Eyebrow */}
        {eyebrow && (
          <motion.p
            variants={fadeIn}
            className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-4"
          >
            {eyebrow}
          </motion.p>
        )}

        {/* Main Headline */}
        <motion.h1
          variants={fadeIn}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none mb-6"
        >
          {headline}
        </motion.h1>

        {/* Subhead (colored accent) */}
        {subhead && (
          <motion.p
            variants={fadeIn}
            className="text-2xl md:text-3xl font-bold text-neon mb-6"
          >
            {subhead}
          </motion.p>
        )}

        {/* Description */}
        {description && (
          <motion.p
            variants={fadeIn}
            className="text-lg md:text-xl text-steel leading-relaxed max-w-3xl mx-auto mb-10"
          >
            {description}
          </motion.p>
        )}

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all shadow-lg shadow-neon/20"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-neon/30 bg-carbon/50 text-white hover:border-neon/50 transition-all"
              >
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
