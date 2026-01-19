/**
 * DEMO STEPPER / PROOF-OF-FLOW
 * Shows the 15-second "this is how it works" experience
 * Mobile-first, swipeable, lazy-loaded images
 * 
 * Usage:
 * <DemoStepper />
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { slideUp, fadeIn } from '@/lib/motion-presets';
import { FlowArrow } from '@/components/icons/FlowIcons';

export interface DemoStep {
  title: string;
  description: string;
  image?: string; // Path to image in /public/
  video?: string; // Path to video in /public/
  caption?: string;
}

interface DemoStepperProps {
  steps?: DemoStep[];
  className?: string;
}

const DEFAULT_STEPS: DemoStep[] = [
  {
    title: 'Driver scans QR at gate',
    description: 'No app required. Kiosk instantly verifies credentials, checks BOL, captures photo.',
    video: '/proof/driver-qr-scan.mp4',
    caption: '~2.4 seconds average',
  },
  {
    title: 'System assigns drop location',
    description: 'Real-time yard visibility. Driver receives SMS with lane assignment and drop rules.',
    video: '/proof/two-way-comms.mp4',
    caption: 'Automated dock assignment',
  },
  {
    title: 'Enforcement at every step',
    description: 'System tracks compliance. Alerts fire if driver deviates. Timestamps lock automatically.',
    image: '/proof/real-time-alerts.png',
    caption: 'Audit-ready by design',
  },
  {
    title: 'Complete evidence trail',
    description: 'Every event captured. BOL signed cryptographically. Detention proof is defensible.',
    video: '/proof/Smart-bol-kiosk.mp4',
    caption: 'Evidence Vault ready',
  },
];

export default function DemoStepper({ 
  steps = DEFAULT_STEPS,
  className = '' 
}: DemoStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className={`relative ${className}`}>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentStep 
                ? 'w-8 bg-neon' 
                : 'w-2 bg-steel/30 hover:bg-steel/50'
            }`}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>

      {/* Content Area */}
      <div className="relative min-h-[400px] rounded-2xl border border-neon/20 bg-gradient-to-br from-carbon/80 to-carbon/40 p-6 md:p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            {/* Image/Video placeholder */}
            {(currentStepData.image || currentStepData.video) && (
              <div className="relative aspect-video w-full rounded-lg border border-neon/10 bg-carbon/50 overflow-hidden">
                {currentStepData.video ? (
                  <video
                    src={currentStepData.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : currentStepData.image ? (
                  <Image
                    src={currentStepData.image}
                    alt={currentStepData.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>
            )}

            {/* Text Content */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-neon/10 border border-neon/30 text-neon text-sm font-bold">
                  {currentStep + 1}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {currentStepData.title}
                </h3>
              </div>
              
              <p className="text-steel text-lg leading-relaxed mb-2">
                {currentStepData.description}
              </p>

              {currentStepData.caption && (
                <p className="text-sm text-neon/70 font-mono">
                  → {currentStepData.caption}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-steel/30 text-steel hover:border-neon hover:text-neon disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <FlowArrow size={12} className="rotate-180" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <span className="text-sm text-steel/50 font-mono">
            {currentStep + 1} / {steps.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-steel/30 text-steel hover:border-neon hover:text-neon disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <span className="text-sm font-medium">Next</span>
            <FlowArrow size={12} />
          </button>
        </div>
      </div>

      {/* Mobile swipe hint */}
      <div className="mt-4 text-center">
        <p className="text-xs text-steel/50">
          Use arrows or tap dots to navigate
        </p>
      </div>
    </div>
  );
}

export { DEFAULT_STEPS };
