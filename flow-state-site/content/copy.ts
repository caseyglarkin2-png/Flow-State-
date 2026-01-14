/**
 * ═══════════════════════════════════════════════════════════════
 * CANONICAL COPY REGISTRY - SINGLE SOURCE OF TRUTH
 * ═══════════════════════════════════════════════════════════════
 * 
 * All repeated phrases, value props, and narrative blocks live here.
 * Pages import from this file to prevent content drift and redundancy.
 * 
 * When adding new copy:
 * 1. Check if similar concept exists before creating new string
 * 2. Use semantic const names (SPINE_CHAPTERS not COPY_123)
 * 3. Add brief comment explaining where it's used
 * 
 * Run `npm run content:scan-duplicates` to catch violations.
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// HERO HOOK (Non-Negotiable Network-First Message)
// ═══════════════════════════════════════════════════════════════

export const HERO_HEADLINES = {
  main: "You don't have 50 yards. You have one network.",
  subMain: "Stop managing sites. Start running a system.",
  altSub: "Stop buying yard tools. Start running a yard network.",
  tagline: "Yard Network System (YNS)",
} as const;

// ═══════════════════════════════════════════════════════════════
// CORE POSITIONING (Unified YNS Messaging)
// Single source of truth for category positioning
// ═══════════════════════════════════════════════════════════════

export const CORE_POSITIONING = {
  hero: {
    problem: "You don't have 50 yards. You have one yard network.",
    breakdown: "But your software treats them like islands.",
  },
  category: {
    yms: "YMS optimizes sites.",
    yns: "YNS orchestrates networks.",
    ymsLong: "Traditional Yard Management Systems (YMS) treat each facility as an island.",
    ynsLong: "YardFlow's Yard Network System (YNS) enables network-wide orchestration with standardized protocols and shared intelligence.",
  },
  tagline: "Yard Network System (YNS)",
} as const;

// ═══════════════════════════════════════════════════════════════
// MODULE LAYERS (Network-First Architecture)
// Used on: Product, Solutions, ROI, Singularity
// ═══════════════════════════════════════════════════════════════

export const MODULE_LAYERS = {
  foundation: {
    title: "Driver Journey Standardization",
    subtitle: "Foundation Layer",
    shortDescription: "QR check-in, timestamps, reason codes. Network foundation.",
    fullDescription: "Every yard is different. But the driver journey must be identical. QR check-in (no app), touchless timestamps, exception reason codes, multilingual instructions. This is Ground Source Truth: defensible time capture that replaces 'what someone typed in'.",
    outcome: "70% gate labor reduction, 50% dwell reduction (48→24 min), 65% detention recovery",
    modules: ["Digital Guard", "Digital Comms"],
  },
  execution: {
    title: "Yard Control Loop",
    subtitle: "Execution Layer",
    shortDescription: "Asset tracking, dwell alerts, operational clarity.",
    fullDescription: "Powered by the standardized driver layer. Real-time asset state, yard map, dwell anomalies, alerts, operational clarity. Not 'more visibility.' It's a control loop: system enforces what happens next.",
    outcome: "Control enforcement, not just visibility",
    modules: ["Digital BOL", "Digital YMS"],
  },
  intelligence: {
    title: "Network Intelligence",
    subtitle: "Intelligence Layer",
    shortDescription: "Cross-site intelligence, predictions, bottlenecks.",
    fullDescription: "Built on standardized inputs across all facilities. Cross-site benchmarking, predictive alerts, bottleneck detection, network-level intelligence. Singularity map: drill down from network anomaly to root cause facility.",
    outcome: "Compounding intelligence with every facility added",
    modules: ["Singularity"],
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// CATEGORY DEFINITION (YNS vs YMS)
// Used on: Homepage, Compare, About
// ═══════════════════════════════════════════════════════════════

export const CATEGORY_DEFINITION = {
  yms: "Traditional Yard Management Systems (YMS) optimize each site in isolation.",
  yns: "YardFlow is a Yard Network System (YNS): orchestrating assets, intelligence, and security across your entire network.",
  difference: "The difference between managing isolated yards and orchestrating an intelligent network.",
  recordingVsEnforcing: {
    legacy: "Legacy YMS records events after they happen.",
    yardflow: "YardFlow enforces what happens next (control loop).",
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// CANONICAL METRICS (From economics.ts)
// Display these values consistently across all pages
// ═══════════════════════════════════════════════════════════════

export const PROOF_METRICS = {
  gateLabor: {
    value: "70%",
    label: "Gate labor reduction",
    context: "QR check-in eliminates manual guard processing",
  },
  detention: {
    value: "65%",
    label: "Detention recovery rate",
    context: "Defensible timestamps win disputes",
  },
  dwell: {
    value: "50%",
    label: "Dwell time reduction",
    detail: "48 min → 24 min average",
    context: "Control loop prevents delays before they happen",
  },
  deployment: {
    value: "8 weeks",
    label: "Avg deployment per facility",
    context: "Faster rollout with network standardization",
  },
  facilities: {
    value: "200+",
    label: "Facilities modeled",
    context: "Primo/Singularity simulations and validated ROI models",
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// VALUE PROPOSITIONS (Key Benefits)
// ═══════════════════════════════════════════════════════════════

export const VALUE_PROPS = {
  visibility: "See exactly what your network is costing you in detention, expedites, and lost throughput. Then stop paying it.",
  groundTruth: "Defensible timestamps from the physical yard that replace reported data with reality.",
  networkEffect: "Site 1 gives you local efficiency. Site 2 adds benchmarking. Site 5+ unlocks pattern recognition. Site 10+ creates a learning flywheel.",
  controlLoop: "Not 'more visibility.' A control loop that enforces what happens next.",
  defensibleTimestamps: "Cryptographically signed, QR-verified timestamps that withstand legal scrutiny. Every driver check-in becomes forensic-grade evidence.",
} as const;

// ═══════════════════════════════════════════════════════════════
// ECONOMIC LENS (The "Leak" Metaphor)
// ═══════════════════════════════════════════════════════════════

export const ECONOMIC_LENS = {
  headline: "The leak persists because you can't cut costs you can't see.",
  explanation: "Legacy systems record what happened after the fact, based on what someone typed in. No defensible timestamps. No exception capture. No accountability.",
  categories: [
    "Detention fees you shouldn't pay",
    "Expedite charges for preventable delays",
    "Overtime because you can't predict arrivals",
    "Working capital tied up 'just in case'",
    "Search time (where is that trailer?)",
    "Variance (every facility does it differently)",
    "Security gaps (who is on your property?)",
    "Compliance risk (are drivers qualified?)",
  ],
} as const;

// ═══════════════════════════════════════════════════════════════
// OPERATING MODEL (Core Differentiation)
// ═══════════════════════════════════════════════════════════════

export const OPERATING_MODEL = {
  legacy: {
    approach: "Records events after they happen",
    problem: "Truck has been waiting 2 hours.' Great. Now what? No enforcement. No control loop. Just visibility into problems you can't solve.",
    architecture: "Site-by-site selling, site-by-site data, no network intelligence",
  },
  yardflow: {
    approach: "Enforces what happens next",
    solution: "System detects dwell anomaly → auto-escalates → assigns priority dock → notifies driver in their language. Loop closes.",
    architecture: "Network-first: standardize driver journey, then solve per-yard permutations",
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// CTAs (Call-to-Action Hierarchy)
// Primary → Secondary → Tertiary (Prevent CTA competition)
// ═══════════════════════════════════════════════════════════════

export const CTAS = {
  primary: {
    yardbuilder: {
      label: "Generate Yard Report",
      shortLabel: "Yard Report",
      description: "Map your facility, identify bottlenecks, export board-ready PDF",
      href: "/yardbuilder",
    },
  },
  secondary: {
    roi: {
      label: "Model ROI in 3 Minutes",
      shortLabel: "Run ROI",
      description: "Conservative/base/aggressive scenarios, PDF export",
      href: "/roi",
    },
  },
  tertiary: {
    contact: {
      label: "Get Network Rollout Plan",
      shortLabel: "Contact",
      description: "Talk to someone about your specific network",
      href: "/contact",
    },
    evidenceVault: {
      label: "Evidence Vault",
      shortLabel: "Procurement Docs",
      description: "Security posture, compliance, integration specs",
      href: "/resources/procurement",
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// PROOF STATEMENTS (Social Proof Without Customer Logos)
// ═══════════════════════════════════════════════════════════════

export const PROOF = {
  scale: "Enterprise scale deployment: 50 facilities, 12,500 trucks/day, $47M annual detention recovery modeled.",
  credibility: "Metrics based on Primo/Singularity simulations and validated ROI models. Individual results vary.",
  noInventedMetrics: "Same math. Same posture. No invented metrics.",
  boardReady: "Board-ready artifacts: YardBuilder report, ROI PDF, Evidence Vault link.",
} as const;

// ═══════════════════════════════════════════════════════════════
// MISSIONS (Solution Categories - Used on /solutions)
// ═══════════════════════════════════════════════════════════════

export const MISSIONS = {
  detention: {
    title: "Stop the detention tax",
    chapter: "1",
    trigger: "You're paying detention and nobody trusts the timestamps.",
  },
  security: {
    title: "Cut the security tax",
    chapter: "1",
    trigger: "Cargo theft, fraudulent carriers, and compliance violations.",
  },
  expedite: {
    title: "Cut the expedite tax",
    chapter: "2",
    trigger: "Peak days turn the gate into a queue with no control loop.",
  },
  search: {
    title: "Eliminate the search tax",
    chapter: "2",
    trigger: "Your network can't answer: 'Where is the trailer right now?'",
  },
  variance: {
    title: "End the variance tax",
    chapter: "3",
    trigger: "Every facility runs a different process and reporting is unreliable.",
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// OBJECTION HANDLING (CFO Proof, Reality Checks)
// ═══════════════════════════════════════════════════════════════

export const OBJECTIONS = {
  tooGoodToBeTrue: {
    objection: "ROI looks too aggressive",
    response: "We show Conservative/Base/Aggressive scenarios. Conservative assumes 30% adoption in year 1. Base assumes 50%. Aggressive assumes 70%. You can adjust every input.",
  },
  whyNow: {
    objection: "Why hasn't this been solved before?",
    response: "It has, site-by-site. But network-level orchestration requires standardizing the driver journey first. That's the unlock.",
  },
  implementation: {
    objection: "How long does this actually take?",
    response: "8 weeks average per facility. Faster with network rollout because standardization compounds.",
  },
} as const;
