/**
 * PERSONA ROUTER
 * Fast self-identification on homepage
 * 8-second path to relevant content
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion-presets';
import { DryVan, Reefer, Flatbed, Intermodal, Tanker } from '@/components/icons/FlowIcons';

interface PersonaOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  href: string;
}

const PERSONAS: PersonaOption[] = [
  {
    id: 'dry-van',
    label: 'Dry Van',
    icon: <DryVan size={24} />,
    description: 'High-velocity throughput',
    href: '/solutions/dry-van',
  },
  {
    id: 'reefer',
    label: 'Reefer',
    icon: <Reefer size={24} />,
    description: 'Cold chain integrity',
    href: '/solutions/reefer',
  },
  {
    id: 'flatbed',
    label: 'Flatbed',
    icon: <Flatbed size={24} />,
    description: 'Safety & complexity',
    href: '/solutions/flatbed',
  },
  {
    id: 'intermodal',
    label: 'Intermodal',
    icon: <Intermodal size={24} />,
    description: 'Synchronization',
    href: '/solutions/intermodal',
  },
  {
    id: 'tanker',
    label: 'Tanker',
    icon: <Tanker size={24} />,
    description: 'Zero-error compliance',
    href: '/solutions/tanker',
  },
];

interface PersonaRouterProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function PersonaRouter({
  title = 'I operate:',
  subtitle = 'Fast-track to your operational reality',
  className = '',
}: PersonaRouterProps) {
  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">Self-Identify</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-steel">{subtitle}</p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        {PERSONAS.map((persona) => (
          <motion.div key={persona.id} variants={staggerItem}>
            <Link
              href={persona.href}
              className="
                group relative block rounded-xl border-2 border-neon/20 bg-carbon/50 p-6 
                hover:border-neon hover:bg-carbon/70 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-neon/50
              "
              aria-label={`View ${persona.label} solutions`}
            >
              <div className="flex flex-col items-center text-center gap-3">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-neon/10 flex items-center justify-center text-neon group-hover:scale-110 transition-transform">
                  {persona.icon}
                </div>

                {/* Label */}
                <div>
                  <p className="font-bold text-white group-hover:text-neon transition-colors">
                    {persona.label}
                  </p>
                  <p className="text-xs text-steel/70 mt-1">{persona.description}</p>
                </div>
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon/0 to-neon/0 group-hover:from-neon/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* All Solutions Link */}
      <div className="mt-6 text-center">
        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 text-sm text-steel hover:text-neon transition-colors"
        >
          <span>View all solutions</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
