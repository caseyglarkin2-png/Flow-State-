'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metrics, Agent, Confirm, Nexus, Shield, Velocity, Crosshair, DryVan, Reefer, Flatbed, Intermodal } from '@/components/icons/FlowIcons';
import Link from 'next/link';
import AnimatedPanel from '@/components/AnimatedPanel';
import { ProductSection } from '@/components/products/ProductSection';
import { DigitalGuardVisual, DigitalCommsVisual, DigitalBOLVisual, DigitalYMSVisual } from '@/components/products/ProductVisualsLite';
import { BRAND } from '@/config/brand';
import CTAGroup from '@/components/CTAGroup';
import CoDevCallout from '@/components/CoDevCallout';
import ArchetypeEpisode from '@/components/ArchetypeEpisode';
import SuitePersonaMap from '@/components/SuitePersonaMap';
import DemoStepper from '@/components/DemoStepper';
import CapabilitySlice from '@/components/sections/CapabilitySlice';
import ProofMedia from '@/components/media/ProofMedia';
import BeforeAfterToggle, { SAMPLE_BEFORE_AFTER } from '@/components/BeforeAfterToggle';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/motion-presets';
import FacilityCountSlider from '@/components/FacilityCountSlider';
import BelieveSection from '@/components/BelieveSection';
import TierComparison, { TierBadges } from '@/components/products/TierComparison';

/**
 * OLD PRODUCT PAGE - Archived Jan 2026
 * Kept for reference. New simplified version in page.tsx
 */

const CAPABILITY_MODULES = [
  {
    headline: "Digital Guard",
    subhead: "Verify every carrier before they enter",
    description: "Kiosks with OCR, photo capture, and real-time authentication.",
    bullets: [
      { text: "Automated carrier ID verification (OCR + photo)" },
      { text: "CDL validation + English proficiency documentation" },
    ],
    mediaImage: "/proof/kiosk-demo.mp4",
    mediaAlt: "Digital Guard kiosk with verification UI",
    mediaType: "desktop" as const,
    kpiLabel: "Verification Success",
    kpiValue: "99.8%",
    align: "left" as const,
  },
];

export default function ProductPageOld() {
  return (
    <div className="min-h-screen bg-void">
      <Header />
      <div className="p-20 text-center">
        <p className="text-white text-2xl">This is the archived product page.</p>
        <p className="text-steel mt-4">The new version is at /product</p>
      </div>
      <Footer />
    </div>
  );
}
