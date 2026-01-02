/**
 * FlowGlyph Icon System
 * 
 * Monoline, rounded caps, 24x24 grid, stroke=currentColor, no fills.
 * Purpose-built to replace emojis in network effect cards and other marketing contexts.
 * 
 * Usage:
 * ```tsx
 * import { FlowGlyphPredictiveIntelligence } from '@/components/icons/FlowGlyphs';
 * <FlowGlyphPredictiveIntelligence className="w-6 h-6 text-neon" />
 * ```
 */

import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { title?: string };

export function FlowGlyphPredictiveIntelligence({ title = "Predictive Intelligence", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} {...props}>
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="12" cy="12" r="1" />
      <path d="M12 2.5V5" />
      <path d="M12 19V21.5" />
      <path d="M2.5 12H5" />
      <path d="M19 12H21.5" />
      <path d="M18 6l1.5-1.5" />
      <path d="M18 6h2" />
      <path d="M18 6v2" />
    </svg>
  );
}

export function FlowGlyphCarrierBenchmarking({ title = "Carrier Benchmarking", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M4 20V10" />
      <path d="M4 20H21" />
      <rect x="6" y="12" width="3" height="8" rx="1" />
      <rect x="11" y="8" width="3" height="12" rx="1" />
      <rect x="16" y="14" width="3" height="6" rx="1" />
      <path d="M7 6h10" />
      <path d="M7 6l2-2" />
      <path d="M17 6l-2-2" />
    </svg>
  );
}

export function FlowGlyphCoordinationEfficiency({ title = "Coordination Efficiency", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} {...props}>
      {title ? <title>{title}</title> : null}
      <circle cx="7" cy="7" r="2" />
      <circle cx="17" cy="7" r="2" />
      <circle cx="12" cy="17" r="2" />
      <path d="M9 7h6" />
      <path d="M8.5 8.5l2.5 6" />
      <path d="M15.5 8.5l-2.5 6" />
      <path d="M12 11v2" />
      <path d="M11 13h2" />
    </svg>
  );
}

export function FlowGlyphSharedLearning({ title = "Shared Learning", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M4 6.5c2.7-1.6 5.3-1.6 8 0v14c-2.7-1.6-5.3-1.6-8 0z" />
      <path d="M20 6.5c-2.7-1.6-5.3-1.6-8 0v14c2.7-1.6 5.3-1.6 8 0z" />
      <circle cx="9" cy="4.5" r="1" />
      <circle cx="15" cy="4.5" r="1" />
      <path d="M10 4.5h4" />
    </svg>
  );
}
