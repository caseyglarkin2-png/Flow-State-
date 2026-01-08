/**
 * Modular Branding System
 * Single source of truth for YardFlow visual identity
 */

export type LogoVariant = 'network' | 'flow' | 'nexus' | 'signal';

/**
 * Active logo variant - change this to switch logos site-wide
 * Options: 'network' | 'flow' | 'nexus' | 'signal'
 */
export const ACTIVE_VARIANT: LogoVariant = 'network';

export const LOGO_VARIANTS = {
  network: {
    svg: `
      <circle cx="16" cy="16" r="3" fill="currentColor"/>
      <circle cx="8" cy="8" r="2" fill="currentColor"/>
      <circle cx="24" cy="8" r="2" fill="currentColor"/>
      <circle cx="16" cy="26" r="2" fill="currentColor"/>
      <line x1="16" y1="13" x2="9" y2="9.5" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="16" y1="13" x2="23" y2="9.5" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="16" y1="19" x2="16" y2="24" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    `,
    description: 'Hub with 3 connected nodes representing unified yard network (original logo)'
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
    description: 'Directional flow arrows showing Viscosity → Network Leak → YNS transformation'
  },
  nexus: {
    svg: `
      <circle cx="16" cy="8" r="3" fill="currentColor"/>
      <circle cx="8" cy="22" r="3" fill="currentColor"/>
      <circle cx="24" cy="22" r="3" fill="currentColor"/>
      <line x1="14.5" y1="10" x2="9.5" y2="20" stroke="currentColor" strokeWidth="2"/>
      <line x1="17.5" y1="10" x2="22.5" y2="20" stroke="currentColor" strokeWidth="2"/>
      <line x1="11" y1="22" x2="21" y2="22" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none"/>
    `,
    description: 'Triangle of 3 interconnected facilities representing network effect at scale'
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
    description: 'Live waveform/pulse representing real-time yard intelligence and responsiveness'
  }
} as const;

export const SITE_METADATA = {
  title: 'YardFlow powered by FreightRoll | Yard Network System (YNS)',
  ogTitle: 'You don't have 50 yards. You have one yard network.',
  ogDescription: 'Traditional YMS treats your facilities like disconnected islands. YardFlow's Yard Network System (YNS) orchestrates assets, intelligence, and security across your entire network in real-time.',
  tagline: 'Yard Network System (YNS)',
  description: "Stop the network leak. You don't have 50 yards – you have one yard network being treated like 50 disconnected islands. Traditional YMS creates isolation silos. YardFlow's Yard Network System (YNS) prevents yard viscosity by making every trailer visible across your entire network in real-time. YNS enables orchestration, security, and scale. See what your network is actually doing, not just what your individual yards report.",
  shortDescription: 'Unified yard network visibility. YNS enables orchestration, security, and scale.',
  keywords: [
    'Yard Network System',
    'YNS', 
    'network leak',
    'yard viscosity',
    'yard orchestration',
    'yard security',
    'real-time visibility',
    'trailer tracking',
    'freight network',
    'supply chain visibility',
    'network scale'
  ]
};

/**
 * Get the currently active logo configuration
 */
export function getActiveLogo() {
  return {
    variant: ACTIVE_VARIANT,
    ...LOGO_VARIANTS[ACTIVE_VARIANT]
  };
}
