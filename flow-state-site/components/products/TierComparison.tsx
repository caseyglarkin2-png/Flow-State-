'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, Zap } from 'lucide-react';
import { 
  PRODUCT_TIERS, 
  CAPABILITIES, 
  isCapabilityIncluded,
  type TierCapability 
} from '@/config/productTiers';
import { staggerContainer, staggerItem } from '@/lib/motion-presets';
import Link from 'next/link';

interface TierComparisonProps {
  /** Whether to show the CTA buttons */
  showCTA?: boolean;
  /** Optional className for styling */
  className?: string;
  /** Compact mode for embedding in other sections */
  compact?: boolean;
}

const getCapabilityIcon = (capability: TierCapability): React.ReactNode => {
  // Enhanced-only capabilities get special icons
  if (capability.includedIn.length === 1 && capability.includedIn[0] === 'enhanced') {
    if (capability.id === 'machine-vision') return <Star className="w-5 h-5" />;
    return <Zap className="w-5 h-5" />;
  }
  return <Check className="w-5 h-5" />;
};

export default function TierComparison({ 
  showCTA = true, 
  className = '',
  compact = false 
}: TierComparisonProps) {
  const core = PRODUCT_TIERS.core;
  const enhanced = PRODUCT_TIERS.enhanced;

  return (
    <motion.div 
      className={`${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {!compact && (
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">
            Deployment Options
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Two Tiers. One Protocol.
          </h2>
          <p className="text-steel max-w-2xl mx-auto text-lg">
            Core pays for itself with paper savings alone. Enhanced adds intelligence for high-complexity yards.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Core Tier */}
        <motion.div 
          variants={staggerItem}
          className="relative p-8 rounded-2xl border-2 border-steel/30 bg-carbon/30 hover:border-steel/50 transition-all"
        >
          <div className="absolute -top-3 left-6">
            <span className="px-3 py-1 bg-steel/20 text-steel text-xs font-semibold rounded-full uppercase tracking-wider">
              Foundation
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mt-4 mb-2">{core.name}</h3>
          <p className="text-steel text-sm mb-4">{core.subheadline}</p>
          
          <div className="mb-6">
            <p className="text-3xl font-black text-white">
              {core.roiAnchor}
            </p>
            <p className="text-xs text-steel/70 mt-1">
              {core.priceLogic}
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {CAPABILITIES.map((capability) => {
              const included = isCapabilityIncluded(capability.id, 'core');
              return (
                <div 
                  key={capability.id}
                  className={`flex items-center gap-3 ${included ? 'text-white' : 'text-steel/40'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    included ? 'bg-flow/20 text-flow' : 'bg-steel/10 text-steel/40'
                  }`}>
                    {included ? getCapabilityIcon(capability) : <X className="w-4 h-4" />}
                  </div>
                  <span className="text-sm">{capability.name}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-steel/20">
            <p className="text-xs text-steel/70 mb-3">Value proposition:</p>
            <p className="text-xs text-steel">{core.headline}</p>
          </div>

          {showCTA && (
            <Link
              href={core.ctaHref}
              className="mt-6 block w-full py-3 px-4 bg-steel/20 hover:bg-steel/30 text-white text-center text-sm font-semibold rounded-lg transition"
            >
              {core.ctaLabel}
            </Link>
          )}
        </motion.div>

        {/* Enhanced Tier */}
        <motion.div 
          variants={staggerItem}
          className="relative p-8 rounded-2xl border-2 border-neon/40 bg-gradient-to-br from-carbon/50 to-neon/5 hover:border-neon/60 transition-all"
        >
          <div className="absolute -top-3 left-6">
            <span className="px-3 py-1 bg-neon/20 text-neon text-xs font-semibold rounded-full uppercase tracking-wider">
              Advanced
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mt-4 mb-2">{enhanced.name}</h3>
          <p className="text-steel text-sm mb-4">{enhanced.subheadline}</p>
          
          <div className="mb-6">
            <p className="text-3xl font-black text-neon">
              {enhanced.roiAnchor}
            </p>
            <p className="text-xs text-steel/70 mt-1">
              {enhanced.priceLogic}
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {CAPABILITIES.map((capability) => {
              const included = isCapabilityIncluded(capability.id, 'enhanced');
              const isEnhancedOnly = !isCapabilityIncluded(capability.id, 'core');
              return (
                <div 
                  key={capability.id}
                  className={`flex items-center gap-3 ${
                    isEnhancedOnly ? 'text-neon' : 'text-white'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isEnhancedOnly 
                      ? 'bg-neon/20 text-neon' 
                      : 'bg-flow/20 text-flow'
                  }`}>
                    {getCapabilityIcon(capability)}
                  </div>
                  <span className="text-sm">
                    {capability.name}
                    {isEnhancedOnly && (
                      <span className="ml-2 text-xs text-neon/70">(Enhanced)</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-neon/20">
            <p className="text-xs text-neon/70 mb-3">Value proposition:</p>
            <p className="text-xs text-steel">{enhanced.headline}</p>
          </div>

          {showCTA && (
            <Link
              href={enhanced.ctaHref}
              className="mt-6 block w-full py-3 px-4 bg-neon/20 hover:bg-neon/30 text-neon text-center text-sm font-semibold rounded-lg transition border border-neon/30"
            >
              {enhanced.ctaLabel}
            </Link>
          )}
        </motion.div>
      </div>

      {/* Paper Savings Callout */}
      {!compact && (
        <motion.div 
          variants={staggerItem}
          className="mt-12 max-w-3xl mx-auto text-center p-6 rounded-xl border border-flow/20 bg-flow/5"
        >
          <p className="text-flow font-semibold text-lg mb-2">
            &quot;Core pays for itself with paper.&quot;
          </p>
          <p className="text-steel text-sm">
            $0.20/shipment in paper, printing, and admin savings. 
            Everything else—detention recovery, dwell reduction, labor optimization—is upside.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * Compact version for embedding in hero sections
 */
export function TierBadges() {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-steel/20 border border-steel/30">
        <Check className="w-4 h-4 text-flow" />
        <span className="text-xs font-semibold text-white">Core</span>
        <span className="text-xs text-steel">4 Modules</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/30">
        <Star className="w-4 h-4 text-neon" />
        <span className="text-xs font-semibold text-neon">Enhanced</span>
        <span className="text-xs text-steel">+AI Vision</span>
      </div>
    </div>
  );
}
