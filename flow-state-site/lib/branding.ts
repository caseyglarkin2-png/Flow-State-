/**
 * MODULAR BRANDING SYSTEM
 * 
 * Switch between logo variants for internal testing.
 * Change ACTIVE_VARIANT to test different options before public launch.
 */

export type LogoVariant = 'network' | 'flow' | 'nexus' | 'signal';

// ==========================================
// CONFIGURATION - Change this to test logos
// ==========================================
export const ACTIVE_VARIANT: LogoVariant = 'network';

// ==========================================
// LOGO VARIANTS
// ==========================================

export const LOGO_VARIANTS = {
  // Original: Network node with crosshairs
  network: {
    name: 'Network Node',
    description: 'Emphasizes interconnected facilities',
    svg: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.4" />
      </svg>
    `,
    ogSvg: (size = 80) => `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#00FFA3" strokeWidth="1.5" opacity="0.3" />
        <path d="M8 12h8M12 8v8" stroke="#00FFA3" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="#00FFA3" opacity="0.4" />
      </svg>
    `,
  },

  // Option 2: Flow arrows (viscosity → leak → YNS)
  flow: {
    name: 'Flow System',
    description: 'Represents friction reduction and flow optimization',
    svg: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 12h16m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="4" cy="12" r="2" fill="currentColor" opacity="0.6"/>
        <circle cx="20" cy="12" r="2" fill="currentColor" opacity="0.6"/>
      </svg>
    `,
    ogSvg: (size = 80) => `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
        <path d="M4 12h16m0 0l-4-4m4 4l-4 4" stroke="#00FFA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="4" cy="12" r="2" fill="#00FFA3" opacity="0.6"/>
        <circle cx="20" cy="12" r="2" fill="#00FFA3" opacity="0.6"/>
      </svg>
    `,
  },

  // Option 3: Multi-node network (3+ facilities connected)
  nexus: {
    name: 'Network Nexus',
    description: 'Shows multiple facilities as connected nodes',
    svg: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="6" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="18" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 8l-4 6m7-6l4 6" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
        <circle cx="12" cy="6" r="1" fill="currentColor"/>
        <circle cx="6" cy="16" r="1" fill="currentColor"/>
        <circle cx="18" cy="16" r="1" fill="currentColor"/>
      </svg>
    `,
    ogSvg: (size = 80) => `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="6" r="2.5" stroke="#00FFA3" strokeWidth="1.5"/>
        <circle cx="6" cy="16" r="2.5" stroke="#00FFA3" strokeWidth="1.5"/>
        <circle cx="18" cy="16" r="2.5" stroke="#00FFA3" strokeWidth="1.5"/>
        <path d="M11 8l-4 6m7-6l4 6" stroke="#00FFA3" strokeWidth="1.5" opacity="0.4"/>
        <circle cx="12" cy="6" r="1" fill="#00FFA3"/>
        <circle cx="6" cy="16" r="1" fill="#00FFA3"/>
        <circle cx="18" cy="16" r="1" fill="#00FFA3"/>
      </svg>
    `,
  },

  // Option 4: Signal/pulse (real-time intelligence)
  signal: {
    name: 'Live Signal',
    description: 'Real-time intelligence and predictive ETA',
    svg: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 4v16" stroke="currentColor" strokeWidth="1.5" opacity="0.2"/>
        <path d="M4 12l3-3 3 6 3-9 3 6 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      </svg>
    `,
    ogSvg: (size = 80) => `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
        <path d="M12 4v16" stroke="#00FFA3" strokeWidth="1.5" opacity="0.2"/>
        <path d="M4 12l3-3 3 6 3-9 3 6 3-3" stroke="#00FFA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="1.5" fill="#00FFA3"/>
      </svg>
    `,
  },
} as const;

// ==========================================
// ACTIVE LOGO (based on variant)
// ==========================================
export const getActiveLogo = () => LOGO_VARIANTS[ACTIVE_VARIANT];

// ==========================================
// SITE MESSAGING
// ==========================================
export const SITE_METADATA = {
  title: {
    default: 'YardFlow by FreightRoll | Yard Network System (YNS)',
    template: '%s | YardFlow',
  },
  tagline: 'Yard Network System (YNS)',
  description: 'Stop the network leak. You don\'t have 50 yards - you have one yard network. YNS orchestrates assets, intelligence, and security across your entire network.',
  shortDescription: 'Yard Network System cutting detention, expedites, and lost throughput across your entire network.',
  
  // OG-specific (Twitter, LinkedIn, etc.)
  ogTitle: 'YardFlow by FreightRoll | Yard Network System (YNS)',
  ogDescription: 'You don\'t have 50 yards. You have one yard network. Stop the leak with YNS - orchestrating assets, intelligence, and security across facilities.',
  
  keywords: [
    'yard network system',
    'YNS',
    'yard management system',
    'YMS alternative',
    'network leak diagnostic',
    'detention reduction',
    'yard orchestration',
    'logistics automation',
    'freight visibility',
    'supply chain optimization',
    'yard viscosity',
    'network effect',
  ],
};
