import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  GuideHero,
  GuideAudienceSection,
  GuideTOC,
  GuideCTA,
} from "@/components/guides";
import { GuideProblemSection } from "@/components/guides/GuideProblemSection";
import { GuideVulnerabilitySection } from "@/components/guides/GuideVulnerabilitySection";
import { GuideTechLayersSection } from "@/components/guides/GuideTechLayersSection";
import { GuideProcessSection } from "@/components/guides/GuideProcessSection";
import { GuideMetricsSection } from "@/components/guides/GuideMetricsSection";
import { GuideChecklistSection } from "@/components/guides/GuideChecklistSection";

// Guide definitions with structured data instead of HTML
const guidesContent: Record<string, GuideData> = {
  "cargo-theft-prevention": {
    meta: {
      title: "Cargo Theft Prevention",
      subtitle: "Technology and Process Approaches for Yard Security",
      updatedDate: "2026-01-14",
      readTime: "12 min",
      audience: ["Security Directors", "Procurement", "Operations Managers"],
      whoThisIsFor: [
        "Security leaders evaluating gate and yard automation",
        "Procurement teams building vendor security requirements",
        "Operations managers seeking to reduce unauthorized access risk",
      ],
      whoThisIsNotFor: [
        "Teams looking for OTR security solutions",
        "Organizations without facility access control needs",
      ],
    },
    tableOfContents: [
      { id: "the-problem", title: "The Scale of the Problem" },
      { id: "gate-vulnerabilities", title: "Gate Vulnerabilities" },
      { id: "technology-layers", title: "Technology Layers for Defense" },
      { id: "process-integration", title: "Process Integration" },
      { id: "measuring-outcomes", title: "Measuring Outcomes" },
      { id: "evaluation-checklist", title: "Vendor Evaluation Checklist" },
    ],
    sections: {
      problem: {
        id: "the-problem",
        eyebrow: "The Challenge",
        title: "The Scale of the Problem",
        intro:
          "Cargo theft costs logistics operators billions annually. Theft techniques grow more sophisticated every quarter, and manual gate processes remain the weakest link.",
        stats: [
          {
            icon: "dollar" as const,
            value: "$15B+",
            label: "Annual cargo theft losses",
            source: "FBI / CargoNet 2025",
          },
          {
            icon: "alert" as const,
            value: "41%",
            label: "Increase in fictitious pickups",
            source: "CargoNet 2025",
          },
          {
            icon: "clock" as const,
            value: "72hrs",
            label: "Avg detection time",
            source: "Industry average",
          },
          {
            icon: "users" as const,
            value: "33%",
            label: "Involve facility access",
            source: "FBI cargo theft data",
          },
        ],
        body: "The industry fixates on over-the-road security while ignoring the obvious: one-third of theft incidents start with fraudulent gate access. Your perimeter is only as strong as your weakest checkpoint.",
      },
      vulnerabilities: {
        id: "gate-vulnerabilities",
        eyebrow: "Risk Assessment",
        title: "Gate Vulnerabilities",
        intro:
          "Manual gate processes are an open invitation for bad actors. Every gap in your verification chain is a potential entry point for theft.",
        categories: [
          {
            title: "Identity Verification Gaps",
            icon: "alert" as const,
            items: [
              {
                label: "Paper credential checks",
                detail:
                  "Visual inspection of licenses is error-prone and time-consuming",
              },
              {
                label: "No database validation",
                detail:
                  "Manual processes can't verify credentials against authoritative sources in real-time",
              },
              {
                label: "Inconsistent application",
                detail: "Gate staff may skip steps during peak periods",
              },
            ],
          },
          {
            title: "Carrier Credentialing",
            icon: "shield" as const,
            items: [
              {
                label: "Stale carrier data",
                detail:
                  "Authority changes, insurance lapses, and safety issues emerge between initial vetting and arrival",
              },
              {
                label: "No network visibility",
                detail:
                  "Issues at one facility don't propagate to others in the network",
              },
              {
                label: "Fictitious carrier patterns",
                detail:
                  "Newly created authorities with minimal history are harder to evaluate manually",
              },
            ],
          },
          {
            title: "Documentation Gaps",
            icon: "file" as const,
            items: [
              {
                label: "Incomplete audit trails",
                detail:
                  "Paper logs may be illegible, incomplete, or lost over time",
              },
              {
                label: "Delayed investigations",
                detail:
                  "Reconstructing events after an incident is labor-intensive",
              },
              {
                label: "Dispute resolution",
                detail:
                  "Without timestamps and records, defending against claims is difficult",
              },
            ],
          },
        ],
      },
      techLayers: {
        id: "technology-layers",
        eyebrow: "Defense Architecture",
        title: "Technology Layers for Defense",
        intro:
          "Effective security requires layered defense. Each technology layer reinforces the others. No single point of failure.",
        layers: [
          {
            number: 1,
            title: "Automated ID Capture",
            icon: "scan" as const,
            description:
              "Digital scanning of driver credentials creates a consistent, auditable record that eliminates manual entry errors and provides defensible documentation.",
            capabilities: [
              "OCR capture of license data",
              "Photo documentation for investigations",
              "Timestamp integrity for audit trails",
              "Real-time validation against databases",
            ],
          },
          {
            number: 2,
            title: "Carrier Screening",
            icon: "database" as const,
            description:
              "Connecting to authoritative carrier databases during check-in validates authority status, insurance coverage, and safety certifications in real-time.",
            capabilities: [
              "FMCSA SAFER/SMS data integration",
              "Insurance verification",
              "CTPAT/PIP certification status",
              "Network watchlist propagation",
            ],
          },
          {
            number: 3,
            title: "Audit Trail & Documentation",
            icon: "file" as const,
            description:
              "Comprehensive event logging supports both operations and security with immutable records of every gate transaction.",
            capabilities: [
              "Timestamped records of all gate events",
              "Integration with video systems",
              "Exportable compliance reports",
              "Tamper-evident storage",
            ],
          },
        ],
        yardflowCallout: {
          title: "YardFlow Modules That Address Each Layer",
          items: [
            {
              module: "Digital Guard",
              description:
                "Automated ID capture and carrier screening at every gate event",
            },
            {
              module: "Digital Comms",
              description:
                "Real-time alerts and escalation workflows when issues are flagged",
            },
            {
              module: "Evidence Vault",
              description:
                "Immutable audit trails for compliance and investigation",
            },
          ],
        },
      },
      process: {
        id: "process-integration",
        eyebrow: "Implementation",
        title: "Process Integration",
        intro:
          "Technology without process is expensive decoration. These three integration points determine whether your security investment actually prevents theft.",
        categories: [
          {
            title: "Guard Protocols",
            icon: "users" as const,
            items: [
              "Define clear escalation procedures for flagged carriers or credentials",
              "Establish hold procedures while verification completes",
              "Train staff on recognizing social engineering attempts",
              "Regular protocol compliance audits",
            ],
          },
          {
            title: "Appointment Workflows",
            icon: "workflow" as const,
            items: [
              "Validate carrier and load information before arrival",
              "Flag unexpected or unscheduled pickups for additional scrutiny",
              "Communicate verification requirements to carriers in advance",
              "Integrate with dispatch for real-time coordination",
            ],
          },
          {
            title: "Incident Response",
            icon: "alert" as const,
            items: [
              "Define who to contact when suspicious activity is identified",
              "Preserve evidence (digital and physical) for investigation",
              "Report to law enforcement and industry databases",
              "Post-incident review and protocol updates",
            ],
          },
        ],
      },
      metrics: {
        id: "measuring-outcomes",
        eyebrow: "Measurement Framework",
        title: "Measuring Outcomes",
        intro:
          "Security spend without measurement is just hope. Track leading indicators to predict problems before they happen, lagging indicators to prove your program works.",
        leadingIndicators: [
          {
            label: "Credential flags",
            description:
              "Percentage of arrivals with credential or carrier issues detected",
          },
          {
            label: "Process compliance",
            description:
              "Percentage of gate events following full verification protocol",
          },
          {
            label: "System uptime",
            description:
              "Availability of verification systems during operating hours",
          },
          {
            label: "Screening coverage",
            description:
              "Percentage of arrivals receiving full security screening",
          },
        ],
        laggingIndicators: [
          {
            label: "Security incidents",
            description:
              "Number and severity of unauthorized access or theft events",
          },
          {
            label: "Investigation efficiency",
            description:
              "Time to resolve incidents with audit trail available",
          },
          {
            label: "Dispute outcomes",
            description:
              "Success rate in cargo claims with documentation support",
          },
          {
            label: "Insurance impact",
            description:
              "Premium changes and claims experience over time",
          },
        ],
        resultsCallout: {
          title: "What We See in Production",
          description:
            "Facilities running Digital Guard with full ID verification and carrier screening report 60-80% reduction in security incidents and 90% faster investigation resolution. Your baseline determines your ceiling.",
        },
      },
      checklist: {
        id: "evaluation-checklist",
        eyebrow: "Vendor Selection",
        title: "Vendor Evaluation Checklist",
        intro:
          "Most YMS vendors check the security box without delivering real protection. These questions separate marketing from capability.",
        categories: [
          {
            title: "Identity Verification",
            items: [
              "Does the system capture and store driver ID images?",
              "Does it support OCR/scanning or require manual entry?",
              "Can it integrate with third-party verification services?",
              "What data retention policies are supported?",
              "Is verification logged with tamper-evident timestamps?",
            ],
          },
          {
            title: "Carrier Screening",
            items: [
              "What data sources does the system query (FMCSA, insurance, etc.)?",
              "How frequently is carrier data refreshed?",
              "Can you maintain custom watchlists?",
              "Is cross-facility intelligence sharing supported?",
              "Are historical carrier performance trends available?",
            ],
          },
          {
            title: "Audit & Compliance",
            items: [
              "What event types are logged and for how long?",
              "Can data be exported for audits or legal proceedings?",
              "Does the system support C-TPAT/TSA documentation requirements?",
              "Are timestamps tamper-evident?",
              "Is data stored in compliance with industry standards?",
            ],
          },
          {
            title: "Integration Capabilities",
            items: [
              "Does the system integrate with your existing WMS/TMS?",
              "Can it connect with physical access control systems?",
              "What video system integrations are available?",
              "Is there an API for custom integrations?",
              "What notification channels are supported?",
            ],
          },
        ],
      },
    },
  },
  "network-effect-yard-automation": {
    meta: {
      title: "Network Effects in Yard Automation",
      subtitle: "How Connected Yards Create Compounding Operational Value",
      updatedDate: "2026-01-14",
      readTime: "10 min",
      audience: ["VPs Operations", "CFOs", "Strategy"],
      whoThisIsFor: [
        "Enterprise leaders evaluating multi-site yard automation",
        "CFOs building business cases for network-wide deployments",
        "Strategy teams modeling long-term logistics investments",
      ],
      whoThisIsNotFor: [
        "Single-facility operators",
        "Teams focused solely on immediate per-site ROI",
      ],
    },
    tableOfContents: [
      { id: "what-are-network-effects", title: "What Are Network Effects?" },
      {
        id: "logistics-manifestations",
        title: "How They Manifest in Logistics",
      },
      { id: "quantifying-value", title: "Quantifying Network Value" },
      {
        id: "implementation-sequence",
        title: "Implementation Sequence Matters",
      },
      {
        id: "procurement-considerations",
        title: "Procurement Considerations",
      },
    ],
    sections: {
      problem: {
        id: "what-are-network-effects",
        eyebrow: "Foundational Concept",
        title: "What Are Network Effects?",
        intro:
          "Network effects occur when the value of a system increases disproportionately as more participants join. In telecommunications, each new phone makes the entire network more valuable. The same principle applies to yard automation, at scale.",
        stats: [
          {
            icon: "users" as const,
            value: "1.3x",
            label: "Network multiplier at 50+ sites",
            source: "YardFlow data",
          },
          {
            icon: "dollar" as const,
            value: "$3M+",
            label: "Additional annual savings",
            source: "50-site example",
          },
          {
            icon: "clock" as const,
            value: "40%",
            label: "Faster implementations",
            source: "Template reuse",
          },
          {
            icon: "alert" as const,
            value: "Real-time",
            label: "Intelligence propagation",
            source: "Cross-facility",
          },
        ],
        body: "The question isn't theoretical: does adding the 20th facility create more than 20× the value of the first? With YardFlow, the answer is definitively yes. Shared intelligence, operational learning, and resource optimization compound with every node you add.",
      },
      vulnerabilities: {
        id: "logistics-manifestations",
        eyebrow: "Value Mechanisms",
        title: "How Network Effects Manifest in Logistics",
        intro:
          "Three mechanisms drive network value in yard automation. Each one compounds as your footprint grows.",
        categories: [
          {
            title: "Shared Intelligence",
            icon: "alert" as const,
            items: [
              {
                label: "Security propagation",
                detail:
                  "A carrier flagged for issues at one site can be identified at all sites instantly",
              },
              {
                label: "Performance patterns",
                detail:
                  "Carriers who consistently delay at one facility can be proactively managed at others",
              },
              {
                label: "Benchmarking capability",
                detail:
                  "Understanding 'good' performance requires comparison across sites",
              },
            ],
          },
          {
            title: "Operational Learning",
            icon: "shield" as const,
            items: [
              {
                label: "Configuration templates",
                detail:
                  "Templates from early deployments speed later rollouts by 40%+",
              },
              {
                label: "Edge case handling",
                detail:
                  "Issues discovered at one site improve the system for all",
              },
              {
                label: "Training compounds",
                detail:
                  "Training materials and best practices compound over deployments",
              },
            ],
          },
          {
            title: "Resource Optimization",
            icon: "file" as const,
            items: [
              {
                label: "Labor allocation",
                detail:
                  "Staff can be allocated based on real-time demand across nearby facilities",
              },
              {
                label: "Equipment sharing",
                detail:
                  "Equipment utilization can be balanced across a region",
              },
              {
                label: "Capacity routing",
                detail:
                  "Carrier capacity can be redirected based on network-wide visibility",
              },
            ],
          },
        ],
      },
      techLayers: {
        id: "quantifying-value",
        eyebrow: "Financial Model",
        title: "Quantifying Network Value",
        intro:
          "Conservative multipliers based on production deployments. We don't inflate projections. These ranges represent what we actually see.",
        layers: [
          {
            number: 1,
            title: "1-5 Facilities: Baseline",
            icon: "layers" as const,
            description:
              "Minimal network effects at this scale. Value is primarily per-site savings from automation and standardization.",
            capabilities: [
              "1.0x multiplier (no network bonus)",
              "Foundation for future scale",
              "Template development begins",
              "Initial carrier data collection",
            ],
          },
          {
            number: 2,
            title: "6-15 Facilities: Emerging",
            icon: "database" as const,
            description:
              "Network effects begin to materialize as carrier overlap increases and implementation patterns accelerate.",
            capabilities: [
              "1.05-1.15x multiplier",
              "Carrier intelligence sharing active",
              "Configuration templates reusable",
              "Regional optimization possible",
            ],
          },
          {
            number: 3,
            title: "16-50 Facilities: Substantial",
            icon: "cpu" as const,
            description:
              "Significant network value from shared intelligence, faster implementations, and resource optimization across the network.",
            capabilities: [
              "1.15-1.30x multiplier",
              "Full carrier network visibility",
              "Labor/equipment sharing enabled",
              "Negotiating leverage materializes",
            ],
          },
          {
            number: 4,
            title: "50+ Facilities: Enterprise",
            icon: "shield" as const,
            description:
              "Maximum network effects with comprehensive intelligence, optimized resources, and significant commercial leverage.",
            capabilities: [
              "1.25-1.40x multiplier",
              "Industry-scale carrier data",
              "Market intelligence capability",
              "Enterprise pricing benefits",
            ],
          },
        ],
        yardflowCallout: {
          title: "Example: 50-Facility Network",
          items: [
            {
              module: "Linear Projection",
              description: "50 sites × $200K/year = $10M annual savings",
            },
            {
              module: "With Network Effect",
              description:
                "$10M × 1.30 multiplier = $13M annual savings",
            },
            {
              module: "Network Value",
              description:
                "$3M additional annual value from network effects alone",
            },
          ],
        },
      },
      process: {
        id: "implementation-sequence",
        eyebrow: "Rollout Strategy",
        title: "Implementation Sequence Matters",
        intro:
          "Deploy wrong and you leave money on the table. Strategic sequencing accelerates network value realization by 30-40%.",
        categories: [
          {
            title: "Phase by Complexity",
            icon: "workflow" as const,
            items: [
              "Start with facilities that have manageable complexity",
              "Build templates and processes before tackling edge cases",
              "Early wins generate internal momentum for larger rollout",
              "Document learnings for subsequent phases",
            ],
          },
          {
            title: "Regional Clustering",
            icon: "users" as const,
            items: [
              "Facilities in the same region share carriers, enabling faster intelligence benefits",
              "Labor sharing is only practical within reasonable distance",
              "Regional deployments enable focused training and support",
              "Concentrated rollout reduces travel and support costs",
            ],
          },
          {
            title: "Carrier Concentration",
            icon: "alert" as const,
            items: [
              "Facilities sharing common carrier pools benefit most from shared data",
              "High-volume carrier relationships see fastest performance improvements",
              "Network effects compound where carrier overlap is highest",
              "Prioritize facilities with shared carrier networks",
            ],
          },
        ],
      },
      checklist: {
        id: "procurement-considerations",
        eyebrow: "Vendor Selection",
        title: "Procurement Considerations",
        intro:
          "Most YMS platforms bolt on multi-site as an afterthought. These questions reveal whether network effects are architectural or marketing.",
        categories: [
          {
            title: "Architecture Questions",
            items: [
              "Is the platform designed for multi-site from the ground up?",
              "How is cross-facility data shared and secured?",
              "What's the latency on intelligence propagation across sites?",
              "Is there single-pane-of-glass visibility across all facilities?",
              "How does the system handle facility-specific configurations?",
            ],
          },
          {
            title: "Pricing Structure",
            items: [
              "Does pricing reward network-wide adoption or penalize it?",
              "Are there volume discounts that make network effects accessible?",
              "What's the commercial model for adding facilities over time?",
              "Are network features included or add-on priced?",
              "Is pricing predictable as you scale?",
            ],
          },
          {
            title: "Implementation Support",
            items: [
              "Does the vendor have experience with network-scale deployments?",
              "What's their track record on large rollouts?",
              "Are implementation templates and best practices available?",
              "How is knowledge transferred between deployment phases?",
              "What ongoing support model scales with your network?",
            ],
          },
        ],
      },
    },
  },
  "ctpat-tsa-compliance": {
    meta: {
      title: "C-TPAT & TSA Compliance",
      subtitle: "Operational Readiness for Supply Chain Security Programs",
      updatedDate: "2026-01-14",
      readTime: "8 min",
      audience: ["Compliance Officers", "Security", "Legal"],
      whoThisIsFor: [
        "Compliance officers maintaining security certifications",
        "Security teams preparing for audits",
        "Operations leaders seeking to reduce compliance overhead",
      ],
      whoThisIsNotFor: [
        "Organizations not subject to customs or aviation security requirements",
        "Teams focused solely on domestic, non-bonded operations",
      ],
    },
    tableOfContents: [
      { id: "program-overview", title: "Program Overview" },
      { id: "key-requirements", title: "Key Requirements" },
      { id: "operational-implications", title: "Operational Implications" },
      { id: "technology-support", title: "How Technology Supports Compliance" },
      { id: "audit-preparation", title: "Audit Preparation" },
    ],
    sections: {
      problem: {
        id: "program-overview",
        eyebrow: "Program Introduction",
        title: "Program Overview",
        intro:
          "C-TPAT and TSA security programs are technically voluntary. In practice, they're table stakes for serious logistics operations. Here's what you need to know.",
        stats: [
          {
            icon: "clock" as const,
            value: "70%",
            label: "Fewer border inspections",
            source: "CBP 2025",
          },
          {
            icon: "dollar" as const,
            value: "$2.5K",
            label: "Avg cost per inspection avoided",
            source: "Industry data",
          },
          {
            icon: "users" as const,
            value: "11,000+",
            label: "C-TPAT certified partners",
            source: "CBP 2025",
          },
          {
            icon: "alert" as const,
            value: "Required",
            label: "By major retailers",
            source: "RFP analysis",
          },
        ],
        body: "C-TPAT members skip to the front of the CBP line. Fewer inspections, faster processing, and access to customers who won't work with non-certified partners. TSA programs unlock Known Shipper status and certified cargo screening. The question isn't whether to certify, it's how fast you can get there.",
      },
      vulnerabilities: {
        id: "key-requirements",
        eyebrow: "Compliance Framework",
        title: "Key Requirements",
        intro:
          "Both programs demand documented, repeatable security procedures. Auditors don't want promises. They want evidence. These are the three pillars they'll scrutinize.",
        categories: [
          {
            title: "Physical Security",
            icon: "shield" as const,
            items: [
              {
                label: "Controlled access points",
                detail:
                  "Monitored entry/exit with capability to log all access events",
              },
              {
                label: "Perimeter security",
                detail:
                  "Security measures appropriate to facility risk profile",
              },
              {
                label: "Surveillance coverage",
                detail: "Lighting and monitoring in key operational areas",
              },
            ],
          },
          {
            title: "Personnel Security",
            icon: "alert" as const,
            items: [
              {
                label: "Background verification",
                detail:
                  "Documented process for employees with sensitive area access",
              },
              {
                label: "Access control",
                detail: "Identification protocols and role-based permissions",
              },
              {
                label: "Visitor management",
                detail: "Escort procedures and visitor logging requirements",
              },
            ],
          },
          {
            title: "Procedural Security",
            icon: "file" as const,
            items: [
              {
                label: "Documented processes",
                detail: "Written procedures for key security functions",
              },
              {
                label: "Training programs",
                detail: "Recordkeeping for compliance and certification",
              },
              {
                label: "Continuous improvement",
                detail: "Self-assessment and program enhancement processes",
              },
            ],
          },
        ],
      },
      techLayers: {
        id: "operational-implications",
        eyebrow: "Business Impact",
        title: "Operational Implications",
        intro:
          "Non-certified operations pay the tax every day: more inspections, lost customers, higher insurance. Here's what the gap actually costs.",
        layers: [
          {
            number: 1,
            title: "Inspection Risk",
            icon: "scan" as const,
            description:
              "Non-C-TPAT shipments face significantly more border examinations, adding delays, handling costs, and cargo damage risk with each additional handling.",
            capabilities: [
              "Up to 7x more likely to be inspected",
              "$2,500+ average cost per inspection",
              "2-5 day delays common",
              "Cargo damage risk increases",
            ],
          },
          {
            number: 2,
            title: "Customer Access",
            icon: "database" as const,
            description:
              "Major retailers increasingly require security certifications from suppliers. Loss of certification can trigger contract review clauses.",
            capabilities: [
              "RFPs often require certification",
              "Supplier scorecards include security",
              "Contract clauses may require maintenance",
              "Competitive disadvantage without cert",
            ],
          },
          {
            number: 3,
            title: "Insurance Considerations",
            icon: "shield" as const,
            description:
              "Insurers increasingly differentiate on security program maturity. Robust documentation also supports claims defense.",
            capabilities: [
              "Premium considerations available",
              "Claims documentation simplified",
              "Audit trail supports defense",
              "Risk profile improvement",
            ],
          },
        ],
        yardflowCallout: {
          title: "YardFlow Compliance Support",
          items: [
            {
              module: "Digital Guard",
              description:
                "Automated visitor registration, driver ID verification, and access logging",
            },
            {
              module: "Evidence Vault",
              description:
                "Immutable event logs, exportable reports, timestamp integrity",
            },
            {
              module: "Digital Comms",
              description:
                "System-guided workflows ensure steps aren't skipped",
            },
          ],
        },
      },
      process: {
        id: "technology-support",
        eyebrow: "Technology Role",
        title: "How Technology Supports Compliance",
        intro:
          "Manual compliance is a full-time job. The right yard management system turns audit prep from weeks of scrambling into minutes of report generation.",
        categories: [
          {
            title: "Access Control",
            icon: "users" as const,
            items: [
              "Automated visitor registration and tracking",
              "Driver ID verification and recordkeeping",
              "Role-based access permissions",
              "Audit trails for all access events",
            ],
          },
          {
            title: "Carrier Verification",
            icon: "workflow" as const,
            items: [
              "Integration with FMCSA and authoritative databases",
              "Insurance and authority verification",
              "C-TPAT partner status verification",
              "Automated compliance flag generation",
            ],
          },
          {
            title: "Training Support",
            icon: "alert" as const,
            items: [
              "Consistent process enforcement reduces training burden",
              "System-guided workflows ensure steps aren't skipped",
              "Performance metrics identify training needs",
              "Documentation of completion for audits",
            ],
          },
        ],
      },
      checklist: {
        id: "audit-preparation",
        eyebrow: "Audit Readiness",
        title: "Audit Preparation Checklist",
        intro:
          "Audits shouldn't be fire drills. With the right system, you're always audit-ready. Use this checklist to verify your readiness.",
        categories: [
          {
            title: "Before the Audit",
            items: [
              "Run access event reports for the audit period",
              "Generate carrier verification statistics",
              "Document system uptime and availability",
              "Prepare training completion records",
              "Review and update security procedures documentation",
            ],
          },
          {
            title: "During the Audit",
            items: [
              "Demonstrate live system capabilities to auditors",
              "Show real-time access event logging",
              "Walk through incident response workflows",
              "Export sample documentation packages",
              "Provide evidence of continuous monitoring",
            ],
          },
          {
            title: "Continuous Readiness",
            items: [
              "Monthly access control reviews",
              "Quarterly self-assessment reports",
              "Annual security procedure reviews",
              "Ongoing training and documentation updates",
              "Regular system health monitoring",
            ],
          },
        ],
      },
    },
  },
};

// Type definitions
type GuideMeta = {
  title: string;
  subtitle: string;
  updatedDate: string;
  readTime: string;
  audience: string[];
  whoThisIsFor: string[];
  whoThisIsNotFor: string[];
};

type TOCItem = { id: string; title: string };

type ProblemSectionData = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  stats: Array<{
    icon: "alert" | "dollar" | "clock" | "users";
    value: string;
    label: string;
    source?: string;
  }>;
  body: string;
};

type VulnerabilitySectionData = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  categories: Array<{
    title: string;
    icon: "alert" | "shield" | "file";
    items: Array<{ label: string; detail: string }>;
  }>;
};

type TechLayersSectionData = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  layers: Array<{
    number: number;
    title: string;
    icon: "scan" | "database" | "file" | "shield" | "cpu" | "layers";
    description: string;
    capabilities: string[];
  }>;
  yardflowCallout?: {
    title: string;
    items: Array<{ module: string; description: string }>;
  };
};

type ProcessSectionData = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  categories: Array<{
    title: string;
    icon: "workflow" | "users" | "alert";
    items: string[];
  }>;
};

type MetricsSectionData = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  leadingIndicators: Array<{ label: string; description: string }>;
  laggingIndicators: Array<{ label: string; description: string }>;
  resultsCallout?: { title: string; description: string };
};

type ChecklistSectionData = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  categories: Array<{ title: string; items: string[] }>;
};

type GuideSections = {
  problem: ProblemSectionData;
  vulnerabilities: VulnerabilitySectionData;
  techLayers: TechLayersSectionData;
  process: ProcessSectionData;
  metrics?: MetricsSectionData;
  checklist: ChecklistSectionData;
};

type GuideData = {
  meta: GuideMeta;
  tableOfContents: TOCItem[];
  sections: GuideSections;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesContent[slug];

  if (!guide) {
    return { title: "Guide Not Found | YardFlow" };
  }

  return {
    title: `${guide.meta.title} | Guides | YardFlow`,
    description: guide.meta.subtitle,
    openGraph: {
      title: `${guide.meta.title} | YardFlow Guides`,
      description: guide.meta.subtitle,
      type: 'article',
      images: [
        {
          url: `${siteUrl}/api/og?page=guide/${slug}`,
          width: 1200,
          height: 630,
          alt: guide.meta.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(guidesContent).map((slug) => ({ slug }));
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guidesContent[slug];

  if (!guide) {
    notFound();
  }

  const { meta, tableOfContents, sections } = guide;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-void">
        {/* Premium Hero */}
        <GuideHero
          title={meta.title}
          subtitle={meta.subtitle}
          readTime={meta.readTime}
          audience={meta.audience}
          updatedDate={meta.updatedDate}
        />

        {/* Audience Section */}
        <GuideAudienceSection
          whoThisIsFor={meta.whoThisIsFor}
          whoThisIsNotFor={meta.whoThisIsNotFor}
        />

        {/* Problem/Overview Section */}
        <GuideProblemSection
          id={sections.problem.id}
          eyebrow={sections.problem.eyebrow}
          title={sections.problem.title}
          intro={sections.problem.intro}
          stats={sections.problem.stats}
          body={sections.problem.body}
        />

        {/* Vulnerability/Key Requirements Section */}
        <GuideVulnerabilitySection
          id={sections.vulnerabilities.id}
          eyebrow={sections.vulnerabilities.eyebrow}
          title={sections.vulnerabilities.title}
          intro={sections.vulnerabilities.intro}
          categories={sections.vulnerabilities.categories}
        />

        {/* Tech Layers Section */}
        <GuideTechLayersSection
          id={sections.techLayers.id}
          eyebrow={sections.techLayers.eyebrow}
          title={sections.techLayers.title}
          intro={sections.techLayers.intro}
          layers={sections.techLayers.layers}
          yardflowCallout={sections.techLayers.yardflowCallout}
        />

        {/* Process Section */}
        <GuideProcessSection
          id={sections.process.id}
          eyebrow={sections.process.eyebrow}
          title={sections.process.title}
          intro={sections.process.intro}
          categories={sections.process.categories}
        />

        {/* Metrics Section (conditional - only for cargo-theft-prevention) */}
        {sections.metrics && (
          <GuideMetricsSection
            id={sections.metrics.id}
            eyebrow={sections.metrics.eyebrow}
            title={sections.metrics.title}
            intro={sections.metrics.intro}
            leadingIndicators={sections.metrics.leadingIndicators}
            laggingIndicators={sections.metrics.laggingIndicators}
            resultsCallout={sections.metrics.resultsCallout}
          />
        )}

        {/* Checklist Section */}
        <GuideChecklistSection
          id={sections.checklist.id}
          eyebrow={sections.checklist.eyebrow}
          title={sections.checklist.title}
          intro={sections.checklist.intro}
          categories={sections.checklist.categories}
        />

        {/* CTA */}
        <GuideCTA />

        {/* Sticky TOC */}
        <GuideTOC items={tableOfContents} />
      </main>
      <Footer />
    </>
  );
}
