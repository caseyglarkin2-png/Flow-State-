/**
 * PROOF MEDIA COMPONENT
 * 
 * Purpose: Product screenshot/phone UI positioned as evidence (not brand showcase)
 * Paired with text explaining what user is seeing + why it matters
 * 
 * Usage: Product capabilities, Evidence vault, Network intelligence, Procurement proof
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/motion-presets';

interface ProofMediaAnnotation {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
}

interface ProofMediaProps {
  type?: 'phone' | 'desktop' | 'dashboard';
  imagePath?: string;
  videoPath?: string;
  alt: string;
  caption?: string;
  annotations?: ProofMediaAnnotation[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
}

export default function ProofMedia({
  type = 'desktop',
  imagePath,
  videoPath,
  alt,
  caption,
  annotations,
  className = '',
  autoplay = true,
  loop = true,
}: ProofMediaProps) {
  const containerClasses = {
    phone: 'aspect-[9/16] max-w-sm',
    desktop: 'aspect-video max-w-2xl',
    dashboard: 'aspect-video max-w-3xl',
  };

  return (
    <motion.figure
      variants={fadeIn}
      className={`relative ${containerClasses[type]} mx-auto ${className}`}
    >
      {/* Media container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-neon/20 shadow-2xl shadow-neon/10 bg-carbon">
        {videoPath ? (
          <video
            src={videoPath}
            autoPlay={autoplay}
            loop={loop}
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : imagePath ? (
          <Image
            src={imagePath}
            alt={alt}
            fill
            className="object-cover"
            quality={90}
            priority={false}
          />
        ) : null}

        {/* Phone frame (optional) */}
        {type === 'phone' && (
          <div className="absolute inset-0 rounded-[3rem] border-8 border-carbon/60 pointer-events-none">
            {/* Notch indicator */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-carbon rounded-b-2xl" />
          </div>
        )}

        {/* Annotations */}
        {annotations && annotations.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {annotations.map((anno, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2, duration: 0.4 }}
                className="absolute"
                style={{ left: `${anno.x}%`, top: `${anno.y}%` }}
              >
                {/* Dot indicator */}
                <div className="w-3 h-3 bg-neon rounded-full shadow-lg shadow-neon/50" />
                
                {/* Label callout */}
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-neon text-void px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                    {anno.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <motion.figcaption
          variants={fadeIn}
          className="mt-4 text-center text-steel text-sm italic"
        >
          {caption}
        </motion.figcaption>
      )}
    </motion.figure>
  );
}
