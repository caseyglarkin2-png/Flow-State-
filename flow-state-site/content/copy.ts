/**
 * Reusable copy snippets
 * Canonical phrases used across multiple pages
 */

export const HERO_HEADLINES = {
  main: "You don't have 50 yards. You have one yard network.",
  sub: "But your software treats them like islands.",
  tagline: "Yard Network System (YNS)",
} as const;

export const CATEGORY_DEFINITION = {
  yms: "Traditional Yard Management Systems (YMS) optimize each site in isolation.",
  yns: "YardFlow is a Yard Network System (YNS): orchestrating assets, intelligence, and security across your entire network.",
  difference: "The difference between managing isolated yards and orchestrating an intelligent network.",
} as const;

export const VALUE_PROPS = {
  visibility: "See exactly what your network is costing you in detention, expedites, and lost throughput. Then stop paying it.",
  groundTruth: "YardFlow establishes Ground Source Truth: defensible timestamps from the physical yard that replace reported data with reality.",
  networkEffect: "Site 1 gives you local efficiency. Site 2 adds benchmarking. Site 5+ unlocks pattern recognition. Site 10+ creates a learning flywheel.",
} as const;

export const PROOF_METRICS = {
  timeToProduction: {
    value: "8 weeks",
    label: "Avg. time to production",
  },
  dwellReduction: {
    value: "50%",
    label: "Dwell time reduction",
  },
  facilitiesModeled: {
    value: "200+",
    label: "Facilities modeled",
  },
} as const;

export const ECONOMIC_LENS = {
  headline: "The leak persists because you can't cut costs you can't see.",
  explanation: "Legacy systems record what happened after the fact, based on what someone typed in. No defensible timestamps. No exception capture. No accountability.",
} as const;
