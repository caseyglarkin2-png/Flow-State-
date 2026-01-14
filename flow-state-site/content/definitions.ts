/**
 * Canonical definitions and assumptions for YardFlow
 * Single source of truth - link to this rather than duplicating
 */

export const NETWORK_LEAK_CATEGORIES = [
  {
    id: 'detention',
    name: 'Detention & Demurrage',
    description: 'Carrier charges for delays beyond free time windows.',
    impact: 'Direct cost per incident; compounds with scale.',
    typical: '$75-150/hour per incident',
  },
  {
    id: 'expedite',
    name: 'Expedite Freight',
    description: 'Premium shipping to recover from preventable delays.',
    impact: '2-3x standard freight rates when time-critical.',
    typical: '$500-2,000 per expedite',
  },
  {
    id: 'labor',
    name: 'Gate Labor Overhead',
    description: 'Manual check-in, paperwork verification, parking direction.',
    impact: '2-3 FTE per facility on manual processes.',
    typical: '$120K-180K per site annually',
  },
  {
    id: 'search',
    name: 'Trailer Search Time',
    description: 'Yard jockeys hunting for misplaced or undocumented assets.',
    impact: '15-45 minutes per search event.',
    typical: '8-12 searches per day per site',
  },
  {
    id: 'working-capital',
    name: 'Working Capital Drag',
    description: 'Inventory sitting idle due to poor visibility and coordination.',
    impact: 'Days of inventory tied up unnecessarily.',
    typical: '5-10% inventory reduction opportunity',
  },
  {
    id: 'security',
    name: 'Security & Fraud Risk',
    description: 'Unverified drivers, cargo theft, unauthorized access.',
    impact: 'Catastrophic when it hits; prevention cost is orders of magnitude lower.',
    typical: '$100K+ per cargo theft incident',
  },
  {
    id: 'throughput',
    name: 'Lost Throughput',
    description: 'Network capacity constrained by yard bottlenecks.',
    impact: 'Revenue opportunity cost from inability to process more volume.',
    typical: '10-20% throughput increase possible',
  },
  {
    id: 'variance',
    name: 'Operational Variance',
    description: 'Unpredictable dwell times force buffer inventory and labor.',
    impact: 'Variance kills efficiency; consistency unlocks optimization.',
    typical: '±30-50% variance in current state',
  },
] as const;

export const CORE_DISCLAIMERS = {
  modeled: 'Modeled figures based on industry benchmarks and simulations. Individual results vary by operation, rollout pace, and baseline efficiency.',
  illustrative: 'Illustrative example. Not a customer testimonial or public reference.',
  validation: 'All economic assumptions documented in methodology. Model is directional; validate with your operational data.',
  boardReady: 'Summary metrics suitable for board presentation. Full methodology available for finance validation.',
} as const;

export const YNS_PILLARS = [
  {
    id: 'orchestration',
    name: 'Orchestration',
    shortDesc: 'Direct moves across your network, not just within one yard.',
    icon: 'Territory',
    benefits: [
      'Real-time asset visibility',
      'AI-powered move recommendations',
      'Cross-site optimization',
    ],
  },
  {
    id: 'security',
    name: 'Security',
    shortDesc: 'Verified identity at every gate, unified across all facilities.',
    icon: 'Shield',
    benefits: [
      'Automated driver verification',
      'Blockchain-backed audit trail',
      'Cargo theft prevention',
    ],
  },
  {
    id: 'intelligence',
    name: 'Intelligence',
    shortDesc: 'Network learns from every move, every site, every carrier.',
    icon: 'Cortex',
    benefits: [
      'Predictive ETA accuracy',
      'Pattern recognition across sites',
      'Benchmarking against network data',
    ],
  },
] as const;

export const METHODOLOGY_LINK = '/docs/economics-methodology';
export const SECURITY_LINK = '/resources/procurement';
export const YNS_FRAMEWORK_LINK = '/solutions'; // YNS framework now integrated into Solutions page
