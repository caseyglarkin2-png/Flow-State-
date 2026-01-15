// Field Notes detail pages - Premium format with executive summary,
// key findings, benchmarks, implications, and YardFlow connection

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FieldNoteHero,
  ExecutiveSummarySection,
  KeyFindingsSection,
  BenchmarksSection,
  ImplicationsSection,
  YardFlowConnectionSection,
  RelatedLinksSection,
  FieldNoteCTA,
  FieldNoteTOC,
} from "@/components/field-notes";

// Field Note structured content
interface FieldNote {
  title: string;
  subtitle: string;
  updatedDate: string;
  readTime: string;
  audience: string[];

  // Structured content
  executiveSummary: string[];
  keyFindings: Array<{ headline: string; detail: string }>;
  benchmarks?: {
    title: string;
    description: string;
    rows: Array<{
      label: string;
      average: string;
      topQuartile: string;
      bottomQuartile: string;
    }>;
  };
  implications: string[];
  yardflowConnection: {
    headline: string;
    modules: Array<{ name: string; description: string }>;
    kpis: Array<{ label: string; target: string }>;
  };
  relatedLinks: Array<{ href: string; label: string }>;
}

const fieldNotes: Record<string, FieldNote> = {
  "dwell-time-patterns": {
    title: "Dwell Time Patterns Across 50+ Yards",
    subtitle:
      "What Actually Moves the Needle on Trailer Wait Times",
    updatedDate: "2024-01-12",
    readTime: "6 min",
    audience: ["Operations", "Site Managers"],

    executiveSummary: [
      "Gate time has an outsized impact on overall dwell. Fast gates create a virtuous cycle that reduces cascading delays.",
      "Visibility alone doesn't improve efficiency. The difference is having clear escalation triggers and empowered staff.",
      "Appointment compliance is a leading indicator: 80%+ compliance correlates with 15-25% lower dwell times.",
    ],

    keyFindings: [
      {
        headline: "Gate Time Has Outsized Impact",
        detail:
          "Yards that reduced check-in time from 12+ minutes to under 4 minutes saw improvements in overall dwell that exceeded what the gate time reduction alone would suggest. Fast gates create a virtuous cycle: drivers arriving on time get processed quickly, leading to better appointment adherence.",
      },
      {
        headline: "Visibility ≠ Efficiency",
        detail:
          "Some facilities with sophisticated real-time visibility systems still showed poor dwell metrics. Others with simpler setups outperformed. Visibility only helps when it's connected to action. High performers had clear escalation triggers.",
      },
      {
        headline: "Appointment Compliance Is a Leading Indicator",
        detail:
          "Facilities with 80%+ appointment compliance consistently showed 15-25% lower dwell times than facilities at 60% compliance.",
      },
      {
        headline: "Carrier Mix Matters More Than Volume",
        detail:
          "High-volume yards with consistent carrier pools often outperformed lower-volume yards with fragmented carrier bases. Carrier familiarity with facility procedures reduces friction at every step.",
      },
    ],

    benchmarks: {
      title: "Dwell Time by Facility Type",
      description:
        "Network averages comparing manual vs. automated facilities across different yard types.",
      rows: [
        {
          label: "Distribution Center",
          average: "3.2 hrs",
          topQuartile: "1.8 hrs",
          bottomQuartile: "4.8 hrs",
        },
        {
          label: "Intermodal Terminal",
          average: "4.1 hrs",
          topQuartile: "2.4 hrs",
          bottomQuartile: "5.9 hrs",
        },
        {
          label: "Cross-Dock",
          average: "1.8 hrs",
          topQuartile: "0.9 hrs",
          bottomQuartile: "2.8 hrs",
        },
        {
          label: "Manufacturing",
          average: "2.9 hrs",
          topQuartile: "1.6 hrs",
          bottomQuartile: "4.2 hrs",
        },
      ],
    },

    implications: [
      "Invest in gate automation before yard optimization. The upstream benefits compound.",
      "Visibility systems need action frameworks to deliver value.",
      "Appointment compliance programs should precede or accompany automation.",
      "Carrier education and consistency may deliver faster results than technology alone.",
    ],

    yardflowConnection: {
      headline:
        "YardFlow's Digital Guard and Digital Comms modules directly address dwell variance by automating gate processes and connecting visibility to action.",
      modules: [
        {
          name: "Digital Guard",
          description:
            "Eliminates manual gate processes, creating the fast-gate foundation that compounds downstream.",
        },
        {
          name: "Digital Comms",
          description:
            "Connects visibility to alerts and escalation workflows so data drives action.",
        },
      ],
      kpis: [
        { label: "Gate Time", target: "-70%" },
        { label: "Dwell Variance", target: "-40%" },
        { label: "Appointment Compliance", target: "+25 pts" },
      ],
    },

    relatedLinks: [
      {
        href: "/resources/field-notes/gate-throughput-benchmarks",
        label: "Gate Throughput Benchmarks",
      },
      { href: "/solutions/dry-van", label: "Dry Van Solutions" },
      { href: "/diagnostic", label: "Network Leak Calculator" },
    ],
  },

  "gate-throughput-benchmarks": {
    title: "Gate Throughput Benchmarks by Yard Type",
    subtitle:
      "Distribution Centers, Intermodal Terminals, and Cross-Docks Compared",
    updatedDate: "2024-01-08",
    readTime: "5 min",
    audience: ["Site Managers", "Engineering"],

    executiveSummary: [
      "Automated gates achieve 3-4x the throughput of manual gates across all facility types.",
      "Cross-docks see the highest ROI from gate automation due to their turn-time sensitivity.",
      "Documentation complexity and carrier diversity are the biggest factors affecting sustainable throughput.",
    ],

    keyFindings: [
      {
        headline: "Distribution Centers",
        detail:
          "Manual check-in: 8-15 minutes. Automated: 2-4 minutes. Peak throughput improves from 4-6 to 12-18 trucks/hour/gate.",
      },
      {
        headline: "Intermodal Terminals",
        detail:
          "Manual check-in: 6-12 minutes. Automated: 2-3 minutes. Peak throughput improves from 5-8 to 15-25 trucks/hour/gate. Intermodal sees higher gains due to more standardized documentation.",
      },
      {
        headline: "Cross-Docks",
        detail:
          "Manual check-in: 5-10 minutes. Automated: 1.5-3 minutes. Peak throughput improves from 6-10 to 20-30 trucks/hour/gate. Cross-docks benefit most from speed. The entire operation depends on fast turns.",
      },
    ],

    benchmarks: {
      title: "Gate Throughput by Facility Type",
      description:
        "Processing times and peak throughput comparing manual vs. automated gates.",
      rows: [
        {
          label: "Distribution Center",
          average: "8-15 min",
          topQuartile: "2-4 min",
          bottomQuartile: "15+ min",
        },
        {
          label: "Intermodal Terminal",
          average: "6-12 min",
          topQuartile: "2-3 min",
          bottomQuartile: "12+ min",
        },
        {
          label: "Cross-Dock",
          average: "5-10 min",
          topQuartile: "1.5-3 min",
          bottomQuartile: "10+ min",
        },
      ],
    },

    implications: [
      "If your metrics fall significantly below these ranges, gate automation should be a priority.",
      "If you're already within range, focus may shift to yard optimization and dwell reduction.",
      "Physical layout and staging area capacity influence sustainable throughput rates.",
      "Operations with many one-time carriers face more credential verification overhead.",
    ],

    yardflowConnection: {
      headline:
        "YardFlow's Digital Guard module maximizes gate throughput with QR-based check-in and pre-registration capabilities.",
      modules: [
        {
          name: "Digital Guard",
          description:
            "Enables sub-2-minute processing regardless of carrier familiarity through QR check-in.",
        },
        {
          name: "Digital Comms",
          description:
            "Pre-registration captures credentials before arrival, eliminating verification delays.",
        },
      ],
      kpis: [
        { label: "Check-In Time", target: "< 2 min" },
        { label: "Throughput", target: "3x" },
        { label: "Queue Overflow", target: "Eliminated" },
      ],
    },

    relatedLinks: [
      {
        href: "/resources/field-notes/dwell-time-patterns",
        label: "Dwell Time Patterns",
      },
      { href: "/solutions/dry-van", label: "Dry Van Solutions" },
      { href: "/roi", label: "ROI Calculator" },
    ],
  },
};

// TOC items
const tocItems = [
  { id: "executive-summary", label: "Executive Summary" },
  { id: "key-findings", label: "Key Findings" },
  { id: "benchmarks", label: "Benchmarks" },
  { id: "implications", label: "Implications" },
  { id: "yardflow-connection", label: "YardFlow Connection" },
];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = fieldNotes[slug];

  if (!note) {
    return { title: "Field Note Not Found | YardFlow" };
  }

  return {
    title: `${note.title} | Field Notes | YardFlow`,
    description: note.subtitle,
  };
}

export async function generateStaticParams() {
  return Object.keys(fieldNotes).map((slug) => ({ slug }));
}

export default async function FieldNotePage({ params }: Props) {
  const { slug } = await params;
  const note = fieldNotes[slug];

  if (!note) {
    notFound();
  }

  // Filter TOC items based on content availability
  const activeTocItems = tocItems.filter((item) => {
    if (item.id === "benchmarks") return !!note.benchmarks;
    return true;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-void">
        {/* Premium Hero */}
        <FieldNoteHero
          title={note.title}
          subtitle={note.subtitle}
          readTime={note.readTime}
          audience={note.audience}
          updatedDate={note.updatedDate}
        />

        {/* Executive Summary */}
        <ExecutiveSummarySection points={note.executiveSummary} />

        {/* Key Findings */}
        <KeyFindingsSection findings={note.keyFindings} />

        {/* Benchmarks */}
        {note.benchmarks && (
          <BenchmarksSection
            title={note.benchmarks.title}
            description={note.benchmarks.description}
            rows={note.benchmarks.rows}
          />
        )}

        {/* Implications */}
        <ImplicationsSection implications={note.implications} />

        {/* YardFlow Connection */}
        <YardFlowConnectionSection
          headline={note.yardflowConnection.headline}
          modules={note.yardflowConnection.modules}
          kpis={note.yardflowConnection.kpis}
        />

        {/* Related Links */}
        <RelatedLinksSection links={note.relatedLinks} />

        {/* CTA */}
        <FieldNoteCTA
          title="Ready to Apply These Insights?"
          description="See how these findings translate into measurable improvements for your specific yard operations."
        />

        {/* Sticky TOC */}
        <FieldNoteTOC items={activeTocItems} />
      </main>
      <Footer />
    </>
  );
}
