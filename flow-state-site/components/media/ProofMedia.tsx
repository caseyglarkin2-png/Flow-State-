/**
 * PROOF MEDIA COMPONENT
 * 
 * Purpose: Product screenshot/phone UI positioned as evidence (not brand showcase)
 * Paired with text explaining what user is seeing + why it matters
 * 
 * Features:
 * - IntersectionObserver lazy loading for videos
 * - Poster images for videos
 * - Conditional rendering (video/image)
 * - Auto-pause when out of viewport (performance optimization)
 * 
 * Usage: Product capabilities, Evidence vault, Network intelligence, Procurement proof
 */

'use client';

import React, { useRef, useEffect, useState } from 'react';
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
  poster?: string; // Poster image for video
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
  poster,
}: ProofMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  // IntersectionObserver for lazy video loading and auto-pause
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          
          if (entry.isIntersecting && autoplay) {
            videoRef.current?.play().catch(() => {
              // Autoplay prevented by browser, ignore
            });
          } else {
            videoRef.current?.pause();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: '50px', // Start loading slightly before visible
      }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [autoplay]);
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
            ref={videoRef}
            loop={loop}
            muted
            playsInline
            poster={poster || videoPath.replace('.mp4', '-poster.webp')}
            preload="none"
            className="w-full h-full object-cover"
            aria-label={alt}
          >
            {/* WebM source for better compression (VP9) */}
            <source src={videoPath.replace('.mp4', '.webm')} type="video/webm" />
            {/* MP4 fallback for Safari/older browsers */}
            <source src={videoPath} type="video/mp4" />
          </video>
        ) : imagePath ? (
          <Image
            src={imagePath}
            alt={alt}
            fill
            className="object-cover"
            quality={90}
            loading="lazy"
          />
        ) : (
          // Placeholder when asset missing
          <div className="w-full h-full bg-carbon/50 border-2 border-ember/30 rounded-xl flex items-center justify-center p-6">
            <div className="text-center">
              <p className="text-ember font-mono text-sm mb-2">⚠ Proof Asset Missing</p>
              <p className="text-steel/70 text-xs font-mono">Expected: {videoPath || imagePath}</p>
              <p className="text-steel/50 text-xs mt-2">Add to /public/proof/</p>
            </div>
          </div>
        )}

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
