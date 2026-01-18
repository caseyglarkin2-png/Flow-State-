// /app/solutions/page.tsx
import Link from "next/link";
import { solutionNav, solutionPages } from "@/lib/solutions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CompareStrip } from "@/components/content";
import { BRAND } from "@/config/brand";
import CTAGroup from "@/components/CTAGroup";
import CoDevCallout from "@/components/CoDevCallout";
import MicroCaseStudy from "@/components/MicroCaseStudy";

export const metadata = {
  title: "Solutions | YardFlow",
  description: "Five operational archetypes. One network-first yard operating system. Variance is the villain.",
};

export default function SolutionsOverviewPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void">
        {/* Hero Section */}
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Yard Network System</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-white md:text-7xl">
            Standardize the Yard. Kill Variance.
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-steel leading-relaxed">
            Cheap is nice. Predictable is scalable. When trucking markets swing, the winners have standardized execution and stable unit economics.
          </p>
        </div>

        {/* The Volatility Tax */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-ember/70">The Problem</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                  The Volatility Tax
                </h2>
                <p className="mt-4 text-[17px] text-steel leading-8">
                  Your yard is where trucking market swings become P&L events. Detention spikes. Labor scrambles. Missed cutoffs. Carrier penalties. Every manual process is a variance generator.
                </p>
                <p className="mt-4 text-[17px] text-steel leading-8">
                  Most operators accept this as the cost of doing business. They optimize around the chaos instead of eliminating it. That works until spot rates flip, volume surges, or your best shift lead quits.
                </p>
                <p className="text-[17px] text-steel leading-8 mt-4">
                  The alternative: standards. Same driver journey at every site. Same events. Same data. Same enforcement. When the yard is predictable, costs stabilize and forecasting becomes real.
                </p>
              </div>
              <div>
                <CompareStrip
                  title="Status Quo vs Standards"
                  items={[
                    { statusQuo: "Gate time varies by who's working", yardFlow: "Same check-in flow everywhere" },
                    { statusQuo: "Dwell depends on tribal knowledge", yardFlow: "FIFO enforced by system" },
                    { statusQuo: "Detention surprises on invoices", yardFlow: "Real-time alerts before thresholds" },
                    { statusQuo: "Each site runs its own playbook", yardFlow: "One operating system, one truth" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Archetypes Grid */}
        <section className="py-16 bg-carbon/20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70">By Operating Context</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Five Archetypes. Same Standards.
            </h2>
            <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">
              Pick your context. The constraints differ. The playbook stays consistent.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {solutionNav.map((item) => {
                const cfg = solutionPages[item.slug];
                const varianceDriver = cfg.viscosity.bullets[0]?.body || "Reduce variance";
                const standardizeFirst = cfg.standardizeFirst.bullets[0] || "Standardize operations";
                
                return (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className="group rounded-2xl border border-neon/20 bg-carbon/50 p-6 hover:border-neon/40 hover:bg-carbon/70 transition"
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-4">
                      <h3 className="text-2xl font-semibold text-white group-hover:text-neon transition">{cfg.navLabel}</h3>
                      <span className="text-xs uppercase tracking-[0.15em] text-neon/70">{cfg.hero.kicker}</span>
                    </div>
                    
                    <p className="text-[15px] text-steel leading-relaxed mb-4">{cfg.hero.subhead}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="rounded-lg border border-ember/20 bg-ember/5 p-3">
                        <div className="text-xs uppercase tracking-[0.1em] text-ember/70 font-semibold">Variance Driver</div>
                        <p className="mt-1 text-sm text-steel">{varianceDriver}</p>
                      </div>
                      
                      <div className="rounded-lg border border-neon/20 bg-neon/5 p-3">
                        <div className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold">Standardize First</div>
                        <p className="mt-1 text-sm text-steel">{standardizeFirst}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {cfg.kpis.map((kpi) => (
                        <span key={kpi} className="px-2.5 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs">
                          {kpi}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neon/10">
                      <span className="text-sm text-steel/70">View playbook</span>
                      <span className="text-neon group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Standards that Apply Everywhere */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Core Standards</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Standards That Apply Everywhere
            </h2>
            <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">
              Regardless of archetype, YardFlow enforces the same foundation.
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {[
                { title: "Standardized Check-In Event", body: "Digital entry that works the same across every site and carrier. No app required." },
                { title: "Location Ground Truth", body: "Live digital twin of the yard. Everyone sees the same reality." },
                { title: "Event Telemetry", body: "Every movement is a typed event with timestamps. Not a radio call." },
                { title: "Evidence Trail", body: "Compliance-ready documentation that builds itself. Admissible in disputes." },
                { title: "Enforcement Loop", body: "System tells drivers what to do next. Not just visibility. Control." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-neon/10 bg-carbon/50 p-4">
                  <div className="text-sm font-semibold text-white mb-2">{item.title}</div>
                  <p className="text-xs text-steel leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-World Impact */}
        <section className="py-20 bg-carbon/20 border-y border-neon/20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-4">Proof by Archetype</p>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Standardization Delivers Measurable Outcomes
            </h2>
            <p className="text-[17px] text-steel leading-8 max-w-3xl mb-12">
              Same modules, different constraints. We standardize the driver journey, not the context. Here's what that means for operations.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <MicroCaseStudy
                title="Dry Van: Gate Labor Efficiency"
                archetype="Dry Van Operations"
                baseline={{ metric: "Gate Staff", value: "6 FTE/site", problem: "Manual check-in requires 6 FTE per shift" }}
                intervention={{ module: "Digital Guard", action: "Automated check-in + FIFO enforcement + Real-time dock assignment" }}
                outcome={{ metric: "Optimized Staff", value: "2 FTE/site", improvement: "67% reduction" }}
                evidenceLink="/resources/procurement#dry-van-evidence"
              />
              <MicroCaseStudy
                title="Reefer: Rejection Rate Collapse"
                archetype="Reefer Operations"
                baseline={{ metric: "Rejections", value: "12%", problem: "Temperature alerts ignored, no condition capture" }}
                intervention={{ module: "Digital BOL", action: "Pre-arrival validation + Temperature alerts + Cryptographic BOL lock" }}
                outcome={{ metric: "Defect Rate", value: "2%", improvement: "83% improvement" }}
                evidenceLink="/resources/procurement#reefer-evidence"
              />
              <MicroCaseStudy
                title="Flatbed: Tarping Cycle Time"
                archetype="Flatbed Operations"
                baseline={{ metric: "Avg Tarp Time", value: "40 min", problem: "Manual verification, driver coordination delays" }}
                intervention={{ module: "Digital Comms", action: "Pre-dock weight verification + Photo evidence + Dispatcher loop" }}
                outcome={{ metric: "Optimized Cycle", value: "8 min", improvement: "80% reduction" }}
                evidenceLink="/resources/procurement#flatbed-evidence"
              />
              <MicroCaseStudy
                title="Intermodal: Demurrage Elimination"
                archetype="Intermodal Operations"
                baseline={{ metric: "Demurrage Cost", value: "$24K/mo", problem: "Manual rail coordination, dwell on rails" }}
                intervention={{ module: "Digital YMS", action: "Automated rail alerts + Checkpoint notifications + Live positioning" }}
                outcome={{ metric: "Optimized Costs", value: "$3.8K/mo", improvement: "84% savings" }}
                evidenceLink="/resources/procurement#intermodal-evidence"
              />
            </div>
          </div>
        </section>

        {/* What Procurement Needs */}
        <section className="py-16 bg-carbon/20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border border-neon/20 bg-void/50 p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">For Procurement & Legal</p>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Evidence Vault
                  </h3>
                  <p className="text-steel max-w-xl">
                    Every timestamp, every credential check, every exception. Forensic-grade documentation ready for audits, disputes, and compliance reviews.
                  </p>
                </div>
                <Link
                  href="/resources/procurement"
                  className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-neon/10 px-5 py-2.5 text-sm font-medium text-neon hover:bg-neon/20 transition shrink-0"
                >
                  View Evidence Vault →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Co-Development Callout */}
        <section className="py-12 bg-carbon/30 border-y border-neon/20">
          <div className="max-w-5xl mx-auto px-6">
            <CoDevCallout 
              title="Complex Operations? Consider Co-Development"
              description="Multi-site operators with unique mode requirements (reefer staging, flatbed securement, intermodal coordination): co-develop features tailored to your operational reality. Influence the roadmap and get priority access."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Ready to Eliminate Yard Variance?
            </h2>
            <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl">
              Book a Network Audit to identify high-impact pilot sites, or explore the Co-Development Program for advanced features.
            </p>
            <div className="mt-8">
              <CTAGroup />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
