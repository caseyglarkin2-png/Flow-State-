// /app/solutions/page.tsx
import Link from "next/link";
import { solutionNav, solutionPages } from "@/lib/solutions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CompareStrip } from "@/components/content";

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
        <section className="border-t border-neon/10 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-ember/70 mb-3">The Problem</p>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
                  The Volatility Tax
                </h2>
                <p className="text-lg text-steel leading-relaxed mb-6">
                  Your yard is where trucking market swings become P&L events. Detention spikes. Labor scrambles. Missed cutoffs. Carrier penalties. Every manual process is a variance generator.
                </p>
                <p className="text-[17px] text-steel leading-8">
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
        <section className="border-t border-neon/10 py-16 bg-carbon/20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">By Operating Context</p>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Five Archetypes. Same Standards.
            </h2>
            <p className="text-lg text-steel mb-10 max-w-2xl">
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
        <section className="border-t border-neon/10 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-3">Core Standards</p>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Standards That Apply Everywhere
            </h2>
            <p className="text-lg text-steel mb-10 max-w-2xl">
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

        {/* What Procurement Needs */}
        <section className="border-t border-neon/10 py-16 bg-carbon/20">
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

        {/* CTA */}
        <section className="border-t border-neon/10 py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Stop Paying the Volatility Tax
            </h2>
            <p className="text-lg text-steel mb-8 max-w-2xl mx-auto">
              Run the diagnostic. See where variance costs you. Get the playbook to fix it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-neon/90 transition"
              >
                Run Network Diagnostic
              </Link>
              <Link
                href="/roi"
                className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
              >
                Model ROI in 3 Minutes
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
