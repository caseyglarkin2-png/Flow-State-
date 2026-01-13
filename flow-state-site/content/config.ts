export type Persona = 'finance' | 'ops' | 'it' | 'procurement';

export const PERSONAS: Array<{ id: Persona; label: string; blurb: string }> = [
  { id: 'finance', label: 'Finance', blurb: 'Model the network, defend payback, get board-ready.' },
  { id: 'ops', label: 'Ops', blurb: 'Standardize the yard playbook and stabilize execution.' },
  { id: 'it', label: 'IT/Security', blurb: 'De-risk rollout: posture, integrations, timelines.' },
  { id: 'procurement', label: 'Procurement', blurb: 'Make buying predictable: pricing, terms, trust.' },
];

export const ROUTES = {
  home: '/',
  networkEffect: '/network-effect',
  roi: '/roi',
  implementation: '/implementation',
  pricing: '/pricing',
  security: '/resources/procurement',
  integrations: '/integrations',
  solutions: '/solutions',
  product: '/product',
  contact: '/contact',
  terms: '/terms',
  privacy: '/privacy',
  compare: '/compare',
  faq: '/faq',
  press: '/press',
  status: '/status',
  changelog: '/changelog',
} as const;

export const DEFINITIONS = {
  dwell:
    'Dwell is the time an asset sits waiting in your yard, between arrival, assignment, and completion. In practice: it shows up as variability, surprise labor, and missed turns.',
  detention:
    'Detention is paid time when trucks wait beyond allowed free time. It becomes expensive when timestamps are weak and exceptions can’t be defended.',
  throughput:
    'Throughput is how many turns you can complete with the same footprint. Small reductions in gate and exception time compound into more outbound moves.',
  orchestration:
    'Orchestration is repeatable execution: standardized check-in/out, exceptions, and assignments, with timestamps you can defend across facilities.',
  networkEffect:
    'The network effect here is compounding operational advantage: each added facility reduces onboarding friction, tightens variability, and improves decision quality across the network.',
} as const;

export const NEXT_STEPS = {
  finance: {
    primary: { href: ROUTES.networkEffect, label: 'See the network effect' },
    secondary: { href: ROUTES.roi, label: 'Run ROI (board-ready)' },
    extras: [
      { href: ROUTES.implementation, label: 'Get rollout plan' },
      { href: ROUTES.pricing, label: 'How buying works' },
    ],
  },
  ops: {
    primary: { href: ROUTES.solutions, label: 'Pick your operator mission' },
    secondary: { href: ROUTES.product, label: 'See the workflows' },
    extras: [
      { href: ROUTES.implementation, label: 'Rollout plan' },
      { href: ROUTES.roi, label: 'Quantify savings' },
    ],
  },
  it: {
    primary: { href: ROUTES.security, label: 'Review security posture' },
    secondary: { href: ROUTES.integrations, label: 'See integration paths' },
    extras: [
      { href: ROUTES.implementation, label: 'Rollout plan' },
      { href: ROUTES.contact, label: 'Loop in your security lead' },
    ],
  },
  procurement: {
    primary: { href: ROUTES.pricing, label: 'Pricing & buying flow' },
    secondary: { href: ROUTES.terms, label: 'Terms' },
    extras: [
      { href: ROUTES.privacy, label: 'Privacy' },
      { href: ROUTES.security, label: 'Security & trust' },
    ],
  },
} as const;

export const SHARE_LINKS = {
  finance: [
    { href: ROUTES.networkEffect, label: 'Share with Finance → Network Effect' },
    { href: ROUTES.roi, label: 'Share with Finance → ROI' },
  ],
  it: [{ href: ROUTES.security, label: 'Share with IT → Security' }],
  ops: [{ href: ROUTES.implementation, label: 'Share with Ops → Implementation' }],
  procurement: [
    { href: ROUTES.pricing, label: 'Share with Procurement → Pricing' },
    { href: ROUTES.terms, label: 'Share with Procurement → Terms' },
  ],
} as const;
