// /lib/solutions.ts

export type SolutionSlug = "dry-van" | "reefer" | "flatbed" | "intermodal" | "tanker";

export type SolutionModuleId =
  | "hero"
  | "varianceThesis"
  | "viscosity"
  | "standardizeFirst"
  | "solution"
  | "proof"
  | "roi"
  | "integrations"
  | "related"
  | "cta";

export interface SolutionFeature {
  name: string;
  description: string;
}

export interface SolutionPageConfig {
  slug: SolutionSlug;
  navLabel: string;
  personaName: string;

  seo: {
    title: string;
    description: string;
  };

  // Consistent page flow across personas
  defaultModuleOrder: SolutionModuleId[];

  hero: {
    kicker: string;
    headline: string;
    subhead: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    visualNote?: string;
  };

  varianceThesis: {
    title: string;
    body: string;
  };

  viscosity: {
    title: string;
    bullets: Array<{ title: string; body: string }>;
  };

  standardizeFirst: {
    title: string;
    microThesis: string;
    bullets: string[];
  };

  solution: {
    title: string;
    features: SolutionFeature[];
    outcomeBullets: string[];
  };

  proof: {
    title: string;
    bullets: string[];
    quote?: { text: string; attribution: string };
  };

  roi: {
    title: string;
    description: string;
    suggestedInputs: string[];
    suggestedOutputs: string[];
    note?: string;
  };

  integrations: {
    title: string;
    badges: Array<{ label: string; note: string }>;
  };

  related: {
    title: string;
    links: Array<{ label: string; href: string; note?: string }>;
  };

  cta: {
    title: string;
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };

  /** Key KPIs that move for this persona */
  kpis: string[];
}

const DEFAULT_MODULE_ORDER: SolutionModuleId[] = [
  "hero",
  "varianceThesis",
  "viscosity",
  "standardizeFirst",
  "solution",
  "proof",
  "roi",
  "integrations",
  "related",
  "cta",
];

const START_YOUR_MAP = { label: "Start Your Map", href: "/start-your-map" };
const REQUEST_DEMO = { label: "Request Demo", href: "/demo" };

export const solutionPages: Record<SolutionSlug, SolutionPageConfig> = {
  "dry-van": {
    slug: "dry-van",
    navLabel: "Dry Van",
    personaName: "Dry Van (High Velocity Throughput)",
    seo: {
      title: "Dry Van Yard Automation | YardFlow Solutions",
      description:
        "Eliminate gate bottlenecks, crush dwell variance, and create synthetic capacity across your yard network with YardFlow.",
    },
    defaultModuleOrder: DEFAULT_MODULE_ORDER,
    hero: {
      kicker: "Predictability > Cheap",
      headline: "Turn Volume into Velocity.",
      subhead:
        "Standardize the yard so cost becomes predictable. Then watch throughput go up and surprises go down.",
      primaryCta: START_YOUR_MAP,
      secondaryCta: REQUEST_DEMO,
      visualNote:
        "Split-screen simulation: Chaos vs Flow. Show gate queue collapse when YardFlow toggles on.",
    },
    varianceThesis: {
      title: "The Variance Problem",
      body: "Cheap is nice. Predictable is scalable. When trucking markets swing, the winners are the operators with standardized execution and stable unit economics. Your yard is where volatility becomes a P&L event: detention, rehandles, labor spikes, missed cutoffs. Standards reduce exposure.",
    },
    viscosity: {
      title: "The Viscosity Problem",
      bullets: [
        { title: "The Gate Bottleneck", body: "Manual check-in creates random queues and unpredictable labor needs." },
        { title: "The Ghost Count", body: "You do not know where trailers are, so you pay people to hunt them." },
        { title: "Detention Roulette", body: "FIFO breaks, dwell spikes, and detention becomes a recurring tax." },
      ],
    },
    standardizeFirst: {
      title: "What to Standardize First",
      microThesis:
        "Standards reduce variance. Variance kills forecasting. Forecasting is how grown-ups run supply chains.",
      bullets: [
        "Digital check-in as the default entry event.",
        "Automated routing to coordinates, not tribal knowledge.",
        "FIFO dwell constraints across shifts and sites.",
        "One source of truth for asset location and yard state.",
        "Network-standard events across facilities for true comparability.",
      ],
    },
    solution: {
      title: "The YardFlow Solution",
      features: [
        { name: "Digital Guard", description: "App-less driver check-in, credential capture, and automated entry routing." },
        { name: "Automated Dwell Management", description: "Dwell aging + prioritization logic to protect throughput and reduce detention." },
        { name: "Ground Truth Map", description: "A live digital twin of the yard, slots, assets, and exceptions." },
      ],
      outcomeBullets: [
        "Compress turn time and reduce queue volatility.",
        "Create synthetic capacity without adding doors.",
        "Replace variance with a repeatable operating system.",
      ],
    },
    proof: {
      title: "Proof, Not Promises",
      bullets: [
        "Standardization compounds. The second site is faster than the first.",
        "The network view exposes bottlenecks that local teams normalize.",
      ],
    },
    roi: {
      title: "Calculate Your Throughput Potential",
      description: "Lead with predictability, then translate it into capacity, labor, and detention savings.",
      suggestedInputs: ["Facilities", "Daily truck volume", "Current average turn time (minutes)"],
      suggestedOutputs: ["Synthetic capacity created", "Minutes saved per turn", "Detention exposure reduction"],
      note: "Use this as a CFO bridge: predictable costs beat cheap costs when volatility is high.",
    },
    integrations: {
      title: "Key Platform Hooks",
      badges: [
        { label: "Project Genesis", note: "Address-to-map digital twin in minutes." },
        { label: "Ground Source Truth", note: "Telemetry-driven reality, not manual reporting." },
      ],
    },
    related: {
      title: "Related Resources",
      links: [
        { label: "Field Notes: Dwell Time Patterns", href: "/resources/field-notes/dwell-time-patterns/", note: "What actually moves the needle." },
        { label: "Field Notes: Gate Throughput Benchmarks", href: "/resources/field-notes/gate-throughput-benchmarks/", note: "Know your baseline." },
        { label: "Simulations", href: "/simulations/", note: "Before vs after, from three perspectives." },
      ],
    },
    cta: {
      title: "Map Your Yard Network",
      body:
        "Stop guessing. Build the map, see the constraints, and standardize the flow so costs become predictable and throughput becomes boringly reliable.",
      primaryCta: START_YOUR_MAP,
      secondaryCta: REQUEST_DEMO,
    },
    kpis: ["Gate Time", "Dwell Time", "Detention Cost"],
  },

  "reefer": {
    slug: "reefer",
    navLabel: "Reefer",
    personaName: "Reefer (Cold Chain Integrity)",
    seo: {
      title: "Reefer Yard Automation | YardFlow Solutions",
      description:
        "Reduce spoilage risk, surface exceptions instantly, and standardize cold chain compliance across your yard network.",
    },
    defaultModuleOrder: DEFAULT_MODULE_ORDER,
    hero: {
      kicker: "Integrity is Predictability",
      headline: "The Cold Chain, Unbroken.",
      subhead:
        "Real-time telemetry, dwell alerts, and compliance capture so exceptions stop being silent.",
      primaryCta: START_YOUR_MAP,
      secondaryCta: REQUEST_DEMO,
      visualNote: "Thermal yard view: reefers color-coded by risk state and dwell age.",
    },
    varianceThesis: {
      title: "The Variance Problem",
      body: "Cold chain risk is variance with a lawsuit. Spoilage happens in the dark—fuel drops, setpoints drift, and you find out after the damage. The winners standardize telemetry, make exceptions loud, and treat compliance not as friction but as a competitive advantage.",
    },
    viscosity: {
      title: "The Viscosity Problem",
      bullets: [
        { title: "Silent Spoilage", body: "Fuel drops, set points drift, and you find out after the damage." },
        { title: "Compliance Friction", body: "Manual logs create delays and audit anxiety." },
        { title: "Energy Drain", body: "Shore power adoption is inconsistent without monitoring and accountability." },
      ],
    },
    standardizeFirst: {
      title: "What to Standardize First",
      microThesis: "Cold chain risk is variance with a lawsuit. Make exceptions loud and workflows repeatable.",
      bullets: [
        "Ingress and egress compliance capture with timestamps.",
        "Alert thresholds for fuel, set point, and dwell age.",
        "Telemetry as a first-class yard event.",
        "Carrier identity checks for high-value loads.",
        "Energy management routines that make shore power measurable.",
      ],
    },
    solution: {
      title: "The YardFlow Solution",
      features: [
        { name: "Live Telemetry + Aging Alerts", description: "Fuel and temperature monitored continuously with visible exception states." },
        { name: "Digital Compliance Logs", description: "Immutable evidence packets that make audits boring." },
        { name: "Energy Management", description: "Monitor shore power usage to cut diesel burn and risk." },
      ],
      outcomeBullets: [
        "Reduce load-loss exposure by surfacing exceptions in real time.",
        "Make audits simple with automated evidence capture.",
        "Protect product, brand, and margin simultaneously.",
      ],
    },
    proof: {
      title: "Proof, Not Promises",
      bullets: [
        "Most cold chain failures are visibility failures before they become temperature failures.",
        "Exception time is the cost. Detection speed is the lever.",
      ],
    },
    roi: {
      title: "Calculate Integrity ROI",
      description: "Quantify avoided spoilage exposure, reduced exceptions, and energy savings.",
      suggestedInputs: ["Reefer dwell hours", "Loads per week", "Spoilage risk estimate", "Shore power utilization"],
      suggestedOutputs: ["Avoided spoilage exposure", "Exception response time reduction", "Diesel burn reduction estimate"],
    },
    integrations: {
      title: "Key Platform Hooks",
      badges: [
        { label: "Telemetry", note: "Connect feeds from your current telematics." },
        { label: "Evidence Vault", note: "Build compliance-ready documentation automatically." },
      ],
    },
    related: {
      title: "Related Resources",
      links: [
        { label: "Field Notes: Dwell Time Patterns", href: "/resources/field-notes/dwell-time-patterns/" },
        { label: "Simulations", href: "/simulations/" },
        { label: "Network Leak Diagnostic", href: "/diagnostic/" },
      ],
    },
    cta: {
      title: "Make Exceptions Impossible to Miss",
      body:
        "Map the yard, connect signals, and make deviations obvious before the load becomes an incident report.",
      primaryCta: START_YOUR_MAP,
      secondaryCta: REQUEST_DEMO,
    },
    kpis: ["Spoilage Rate", "Dwell Alerts", "Compliance Score"],
  },

  "flatbed": {
    slug: "flatbed",
    navLabel: "Flatbed",
    personaName: "Flatbed (Safety and Complexity)",
    seo: {
      title: "Flatbed Yard Automation | YardFlow Solutions",
      description:
        "Reduce safety exposure, standardize complex handling, and bring order to open-lot operations with YardFlow.",
    },
    defaultModuleOrder: DEFAULT_MODULE_ORDER,
    hero: {
      kicker: "Safety is Standardization",
      headline: "Secure the Load. Protect the Driver.",
      subhead: "Dynamic zoning and verification workflows designed for irregular freight and high liability.",
      primaryCta: START_YOUR_MAP,
      secondaryCta: REQUEST_DEMO,
    },
    varianceThesis: {
      title: "The Variance Problem",
      body: "Open-lot entropy kills safety and throughput simultaneously. Non-standard loads blow up schedules and create rework. When the yard improvises, safety exposure increases. The winners define zones, standardize complex workflows, and turn exceptions into planned flows.",
    },
    viscosity: {
      title: "The Viscosity Problem",
      bullets: [
        { title: "The Safety Trap", body: "Non-standard verification creates climbing, rework, and incident exposure." },
        { title: "Open Zone Chaos", body: "Undefined space creates traffic, confusion, and wasted motion." },
        { title: "Exception Storms", body: "Oversized and irregular moves break scheduling assumptions." },
      ],
    },
    standardizeFirst: {
      title: "What to Standardize First",
      microThesis: "Flatbed wins by giving the open lot rules and turning exceptions into workflows.",
      bullets: [
        "Digitally define zones and enforce routing.",
        "Replace ad hoc verification with structured checks.",
        "Treat oversized as a planned flow with explicit constraints.",
        "Separate people and equipment by design, not hope.",
        "Measure safety outcomes as system outputs.",
      ],
    },
    solution: {
      title: "The YardFlow Solution",
      features: [
        { name: "Dynamic Zoning", description: "Paint operational zones on the map and route drivers accordingly." },
        { name: "Structured Verification", description: "Standardized check-in and handling steps for irregular freight." },
        { name: "Exception Workflow Engine", description: "Plan non-standard moves with visibility and constraints." },
      ],
      outcomeBullets: [
        "Reduce incident exposure by eliminating chaos behaviors.",
        "Increase throughput by cutting rework and confusion.",
        "Make the open lot predictable across shifts and sites.",
      ],
    },
    proof: {
      title: "Proof, Not Promises",
      bullets: [
        "When zones are explicit, safety compliance becomes natural.",
        "Standard workflows reduce exceptions that create dangerous improvisation.",
      ],
    },
    roi: {
      title: "Calculate Safety and Efficiency ROI",
      description: "Quantify reduced incidents, less rework, and throughput improvements from standard handling.",
      suggestedInputs: ["Daily volume", "Average verification time", "Rework rate", "Incident history (optional)"],
      suggestedOutputs: ["Time saved", "Rework reduction estimate", "Throughput lift estimate"],
    },
    integrations: {
      title: "Key Platform Hooks",
      badges: [
        { label: "YardBuilder", note: "Map and zone fast." },
        { label: "Evidence Vault", note: "Standardize documentation for exceptions." },
      ],
    },
    related: {
      title: "Related Resources",
      links: [
        { label: "Simulations", href: "/simulations/" },
        { label: "Network Leak Diagnostic", href: "/diagnostic/" },
      ],
    },
    cta: {
      title: "Turn Safety Into a System",
      body:
        "Map the lot, define zones, and standardize the complex steps so performance improves without adding risk.",
      primaryCta: START_YOUR_MAP,
      secondaryCta: REQUEST_DEMO,
    },
    kpis: ["Safety Incidents", "Rework Rate", "Zone Compliance"],
  },

  "intermodal": {
    slug: "intermodal",
    navLabel: "Intermodal",
    personaName: "Intermodal (Synchronization)",
    seo: {
      title: "Intermodal Yard Automation | YardFlow Solutions",
      description:
        "Synchronize handoffs across rail, port, and drayage with a single source of ground truth and standardized events.",
    },
    defaultModuleOrder: DEFAULT_MODULE_ORDER,
    hero: {
      kicker: "Synchronization is Predictability",
      headline: "Orchestrate the Handoff. Eliminate the Shuffle.",
      subhead: "Standardize handoffs as events and make inventory visible across the terminal.",
      primaryCta: START_YOUR_MAP,
      secondaryCta: REQUEST_DEMO,
    },
    varianceThesis: {
      title: "The Variance Problem",
      body: "Most terminal delays are coordination failures disguised as capacity problems. Containers disappear once they move. Chassis dislocation kills driver turns. Shuffle rehandles burn labor and time. The winners make inventory visible and standardize the events that synchronize parties across rail, ocean, and drayage.",
    },
    viscosity: {
      title: "The Viscosity Problem",
      bullets: [
        { title: "The Black Hole", body: "Once it moves, it disappears. Visibility breaks and the yard becomes guesswork." },
        { title: "Chassis Dislocation", body: "Drivers waste time searching for compatible equipment." },
        { title: "The Shuffle", body: "Rehandles multiply to access what should have been staged correctly." },
      ],
    },
    standardizeFirst: {
      title: "What to Standardize First",
      microThesis: "Intermodal wins when mode handoffs are standardized and inventory stays visible.",
      bullets: [
        "Chassis visibility as a default view and workflow.",
        "Container location as ground truth down to row and stack.",
        "Sequencing logic aligned to cutoffs, not convenience.",
        "Driver routing that is turn-by-turn, not radio-driven.",
        "Network standard events that make forecasting credible.",
      ],
    },
    solution: {
      title: "The YardFlow Solution",
      features: [
        { name: "Ground Truth Visibility", description: "Inventory location and state become reliable across parties." },
        { name: "Sequencing + Cutoff Alignment", description: "Move the right box at the right time with fewer rehandles." },
        { name: "Driver Workflow Routing", description: "Reduce search time with deterministic instructions." },
      ],
      outcomeBullets: [
        "Reduce rehandles and shuffle overhead.",
        "Increase driver turns and predictability.",
        "Turn the terminal into a synchronized execution layer.",
      ],
    },
    proof: {
      title: "Proof, Not Promises",
      bullets: [
        "Most terminal delays are coordination failures disguised as capacity problems.",
        "Standard events let you diagnose constraints without politics.",
      ],
    },
    roi: {
      title: "Calculate Synchronization ROI",
      description: "Quantify reduced rehandles, faster turns, and better cutoff hit rates.",
      suggestedInputs: ["Moves per day", "Average rehandles per unit", "Average wait time", "Cutoff miss rate (optional)"],
      suggestedOutputs: ["Rehandle reduction estimate", "Time saved", "Cutoff improvement estimate"],
    },
    integrations: {
      title: "Key Platform Hooks",
      badges: [
        { label: "Ground Source Truth", note: "Shared reality across parties." },
        { label: "Digital Twin", note: "Make the terminal visible and deterministic." },
      ],
    },
    related: {
      title: "Related Resources",
      links: [
        { label: "Field Notes: Gate Throughput Benchmarks", href: "/resources/field-notes/gate-throughput-benchmarks/" },
        { label: "Simulations", href: "/simulations/" },
      ],
    },
    cta: {
      title: "Make the Terminal Predictable",
      body:
        "Map it, standardize the events, and eliminate the shuffle. When everyone shares ground truth, flow follows.",
      primaryCta: START_YOUR_MAP,
      secondaryCta: REQUEST_DEMO,
    },
    kpis: ["Turns/Day", "Chassis Dwell", "Rehandle Rate"],
  },

  "tanker": {
    slug: "tanker",
    navLabel: "Tanker",
    personaName: "Tanker (Zero-Error Compliance)",
    seo: {
      title: "Tanker and Hazmat Yard Automation | YardFlow Solutions",
      description:
        "Verify compliance before entry, prevent rack rejections, and standardize safety interlocks with YardFlow.",
    },
    defaultModuleOrder: DEFAULT_MODULE_ORDER,
    hero: {
      kicker: "Compliance is Predictability",
      headline: "Precision is Safety. Visibility is Compliance.",
      subhead: "Pre-gate verification and standardized interlocks for zero-error operations.",
      primaryCta: START_YOUR_MAP,
      secondaryCta: REQUEST_DEMO,
    },
    varianceThesis: {
      title: "The Variance Problem",
      body: "Zero-error operations are built from upstream verification, not downstream heroics. A missing wash cert becomes a rejected load and a wasted day. Manual checks are too fragile for hazmat. Compatibility failures cause rack delays and exposure. Compliance becomes cheap when it is automated and standardized.",
    },
    viscosity: {
      title: "The Viscosity Problem",
      bullets: [
        { title: "The Wash Lag", body: "A missing wash cert turns into a rejected load and wasted day." },
        { title: "Hazmat Paperwork Risk", body: "Manual checks are too fragile for zero-error environments." },
        { title: "Compatibility Failures", body: "Wrong fittings and missing credentials cause rack delays and exposure." },
      ],
    },
    standardizeFirst: {
      title: "What to Standardize First",
      microThesis: "Tanker wins by verifying upstream and enforcing safety interlocks automatically.",
      bullets: [
        "Pre-gate verification for endorsements and wash certificates.",
        "Equipment compatibility checks before entry.",
        "Safety interlocks as enforceable workflow steps.",
        "Telemetry-linked documentation to prevent disputes.",
        "Standard compliance events so audits become a replay.",
      ],
    },
    solution: {
      title: "The YardFlow Solution",
      features: [
        { name: "Pre-Gate Verification", description: "Verify credentials and documents before the driver enters the yard." },
        { name: "Workflow Interlocks", description: "Enforce grounding, bonding, and checklist steps as system gates." },
        { name: "Telemetry-Backed Documentation", description: "Tie events and volumes to evidence-grade documentation." },
      ],
      outcomeBullets: [
        "Prevent rejected-at-rack events by catching issues early.",
        "Reduce compliance exposure and operational delay.",
        "Make billing and documentation defensible by design.",
      ],
    },
    proof: {
      title: "Proof, Not Promises",
      bullets: [
        "Zero-error operations are built from upstream verification, not downstream heroics.",
        "Compliance becomes cheap when it is automated and standardized.",
      ],
    },
    roi: {
      title: "Calculate Zero-Error ROI",
      description: "Quantify avoided rejections, reduced rack delays, and reduced compliance exposure.",
      suggestedInputs: ["Loads per day", "Rejections per month", "Avg delay per rejection", "Labor time on checks"],
      suggestedOutputs: ["Avoided rejection cost estimate", "Recovered utilization time", "Compliance exposure narrative inputs"],
    },
    integrations: {
      title: "Key Platform Hooks",
      badges: [
        { label: "Digital Guard", note: "Credential capture and verification at entry." },
        { label: "Evidence Vault", note: "Compliance-ready evidence packets." },
      ],
    },
    related: {
      title: "Related Resources",
      links: [
        { label: "Network Leak Diagnostic", href: "/diagnostic/" },
        { label: "Simulations", href: "/simulations/" },
      ],
    },
    cta: {
      title: "Stop Rejections Before They Start",
      body:
        "Map the facility and standardize verification upstream. Precision becomes default, not dependent on who is working the gate.",
      primaryCta: START_YOUR_MAP,
      secondaryCta: REQUEST_DEMO,
    },
    kpis: ["Rejection Rate", "Pre-Check Pass %", "Load Time"],
  },
};

export const solutionNav = (Object.keys(solutionPages) as SolutionSlug[]).map((slug) => ({
  slug,
  label: solutionPages[slug].navLabel,
  href: `/solutions/${slug}`,
}));

export function isSolutionSlug(value: string): value is SolutionSlug {
  return value in solutionPages;
}

/**
 * Validate a solution page config for required fields
 * Throws loudly in development if required fields are missing
 */
export function validateSolutionConfig(slug: SolutionSlug): void {
  const cfg = solutionPages[slug];
  const errors: string[] = [];

  // Check required top-level fields
  if (!cfg.slug) errors.push(`Missing: slug`);
  if (!cfg.navLabel) errors.push(`Missing: navLabel`);
  if (!cfg.personaName) errors.push(`Missing: personaName`);
  if (!cfg.seo?.title) errors.push(`Missing: seo.title`);
  if (!cfg.seo?.description) errors.push(`Missing: seo.description`);
  if (!cfg.defaultModuleOrder?.length) errors.push(`Missing: defaultModuleOrder`);

  // Check hero section
  if (!cfg.hero?.kicker) errors.push(`Missing: hero.kicker`);
  if (!cfg.hero?.headline) errors.push(`Missing: hero.headline`);
  if (!cfg.hero?.subhead) errors.push(`Missing: hero.subhead`);
  if (!cfg.hero?.primaryCta?.label || !cfg.hero?.primaryCta?.href) {
    errors.push(`Missing: hero.primaryCta (label or href)`);
  }

  // Check other sections exist
  if (!cfg.viscosity?.title || !cfg.viscosity?.bullets?.length) {
    errors.push(`Missing or empty: viscosity section`);
  }
  if (!cfg.standardizeFirst?.title || !cfg.standardizeFirst?.bullets?.length) {
    errors.push(`Missing or empty: standardizeFirst section`);
  }
  if (!cfg.solution?.title || !cfg.solution?.features?.length) {
    errors.push(`Missing or empty: solution section`);
  }
  if (!cfg.proof?.title || !cfg.proof?.bullets?.length) {
    errors.push(`Missing or empty: proof section`);
  }
  if (!cfg.roi?.title) errors.push(`Missing: roi.title`);
  if (!cfg.integrations?.title || !cfg.integrations?.badges?.length) {
    errors.push(`Missing or empty: integrations section`);
  }
  if (!cfg.related?.title || !cfg.related?.links?.length) {
    errors.push(`Missing or empty: related section`);
  }
  if (!cfg.cta?.title) errors.push(`Missing: cta.title`);

  if (errors.length > 0 && process.env.NODE_ENV === 'development') {
    console.warn(
      `⚠️  Solution config validation failed for "${slug}":\n${errors.map((e) => `  - ${e}`).join('\n')}`
    );
  }
}
