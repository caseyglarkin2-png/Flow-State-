/**
 * ClaimsFootnote Component
 * 
 * Reusable disclaimer for ROI, metrics, and projections.
 * Ensures we maintain "claims discipline" throughout the site.
 * 
 * Usage:
 * <ClaimsFootnote />
 * <ClaimsFootnote text="Custom disclaimer text" />
 */

import React from 'react';

interface ClaimsFootnoteProps {
  text?: string;
  className?: string;
}

const DEFAULT_ROI_DISCLAIMER = "Modeled estimate; results vary by site mix, appointment discipline, and adoption.";

export default function ClaimsFootnote({ 
  text = DEFAULT_ROI_DISCLAIMER,
  className = ''
}: ClaimsFootnoteProps) {
  return (
    <p className={`text-xs text-steel/50 italic mt-4 max-w-2xl ${className}`}>
      * {text}
    </p>
  );
}

export { DEFAULT_ROI_DISCLAIMER };
