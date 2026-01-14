/**
 * Modular Branding System
 * Single source of truth for YardFlow visual identity
 *
 * Goals:
 * - Swap logos site-wide in ONE place
 * - Allow env override without code changes
 * - Use a micro mark for <=20px contexts (favicon, tight nav)
 */

export const LOGO_VARIANTS = {
  network: {
    svg: `
      <circle cx="16" cy="16" r="3" fill="currentColor"/>
      <circle cx="8" cy="8" r="2" fill="currentColor"/>
      <circle cx="24" cy="8" r="2" fill="currentColor"/>
      <circle cx="16" cy="26" r="2" fill="currentColor"/>
      <line x1="16" y1="13" x2="9" y2="9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="16" y1="13" x2="23" y2="9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="16" y1="19" x2="16" y2="24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1" opacity="0.28" fill="none"/>
    `,
    description: 'Static hub/network (legacy)'
  },

  flow: {
    svg: `
      <path d="M6 16 L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 16 L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 22 L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 10 L26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="6" cy="16" r="2" fill="currentColor"/>
      <circle cx="12" cy="16" r="2" fill="currentColor"/>
      <circle cx="18" cy="10" r="2" fill="currentColor"/>
      <circle cx="18" cy="22" r="2" fill="currentColor"/>
      <circle cx="26" cy="16" r="2" fill="currentColor"/>
      <path d="M24 15 L26 16 L24 17" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    `,
    description: 'Directional convergence into controllable flow'
  },

  flow_v2: {
    svg: `
      <path d="M7 18 C10 18, 12 16, 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M14 22 C14 18, 14 16, 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M14 14 C16 12, 19 12, 22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M22 14 L26 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="7" cy="18" r="2" fill="currentColor"/>
      <circle cx="14" cy="22" r="2" fill="currentColor"/>
      <circle cx="14" cy="14" r="2.25" fill="currentColor"/>
      <circle cx="26" cy="18" r="2" fill="currentColor"/>
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1" opacity="0.28" fill="none"/>
    `,
    description: 'Industrial Fluidity (primary mark)'
  },

  flow_micro: {
    svg: `
      <path d="M8 18 C11 18, 12 16, 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M14 22 C14 18, 14 16, 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M14 14 C16 12, 18 12, 22 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="8" cy="18" r="2" fill="currentColor"/>
      <circle cx="14" cy="22" r="2" fill="currentColor"/>
      <circle cx="22" cy="16" r="2" fill="currentColor"/>
      <circle cx="14" cy="14" r="2.25" fill="currentColor"/>
    `,
    description: 'Micro fluidity mark'
  },

  nexus: {
    svg: `
      <circle cx="16" cy="8" r="3" fill="currentColor"/>
      <circle cx="8" cy="22" r="3" fill="currentColor"/>
      <circle cx="24" cy="22" r="3" fill="currentColor"/>
      <line x1="14.5" y1="10" x2="9.5" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="17.5" y1="10" x2="22.5" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="11" y1="22" x2="21" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none"/>
    `,
    description: 'Network effect at scale'
  },

  signal: {
    svg: `
      <path d="M4 16 L8 16 L12 8 L16 24 L20 12 L24 16 L28 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"/>
      <circle cx="16" cy="24" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="20" cy="12" r="1.5" fill="currentColor"/>
    `,
    description: 'Live waveform/pulse'
  }
} as const;

export type LogoVariant = keyof typeof LOGO_VARIANTS;

// ✅ your default
export const DEFAULT_VARIANT: LogoVariant = 'flow_v2';

/**
 * Optional override:
 * NEXT_PUBLIC_LOGO_VARIANT=flow_v2 | flow | network | flow_micro | nexus | signal
 */
export function getActiveVariant(): LogoVariant {
  const raw = process.env.NEXT_PUBLIC_LOGO_VARIANT;
  if (raw && raw in LOGO_VARIANTS) return raw as LogoVariant;
  return DEFAULT_VARIANT;
}

export const SITE_METADATA = {
  title: 'YardFlow | Yard Network System (YNS)',
  originLine: 'by FreightRoll',
  ogTitle: "You don't have 50 yards. You have one yard network.",
  ogDescription: 'Stop the Variance Tax. YardFlow standardizes the gate + yard into a deterministic protocol—reducing viscosity and turning chaos into controllable flow.',
  tagline: 'Industrial Fluidity.',
  description: 'Stop the Variance Tax. You don\'t have 50 yards—you have one yard network being managed like 50 disconnected islands. YardFlow standardizes gate + yard execution into a deterministic protocol so your network runs with Industrial Fluidity.',
  shortDescription: 'Industrial Fluidity for facility networks.',
  keywords: [
    'Yard Network System',
    'YNS',
    'Industrial Fluidity',
    'Variance Tax',
    'yard viscosity',
    'yard orchestration',
    'gate automation',
    'real-time visibility',
    'trailer tracking'
  ]
} as const;

/**
 * Returns the active logo config.
 * Auto-switch to micro at <=20px to prevent spaghetti favicon syndrome.
 */
export function getActiveLogo(sizePx = 28) {
  const base = getActiveVariant();
  const variant: LogoVariant = sizePx <= 20 ? 'flow_micro' : base;

  return {
    variant,
    ...LOGO_VARIANTS[variant]
  };
}
