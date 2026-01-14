// /app/solutions/page.tsx
import Link from "next/link";
import { solutionNav, solutionPages } from "@/lib/solutions";

export const metadata = {
  title: "Solutions | YardFlow",
  description: "Five operational archetypes. One network-first yard operating system.",
};

export default function SolutionsOverviewPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/70">Solutions</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Standardize the Yard. Reduce Variance.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Pick your operating context. The playbook stays consistent, the constraints change.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {solutionNav.map((item) => {
            const cfg = solutionPages[item.slug];
            return (
              <Link
                key={item.slug}
                href={item.href}
                className="group rounded-2xl border border-slate-800/60 bg-slate-950/40 p-6 hover:border-cyan-400/40 hover:bg-slate-950/60 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-400">{cfg.personaName}</div>
                    <div className="mt-2 text-2xl font-semibold text-white">{cfg.navLabel}</div>
                    <p className="mt-3 text-sm text-slate-300">{cfg.hero.subhead}</p>
                  </div>
                  <div className="mt-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                    View
                  </div>
                </div>
                <div className="mt-5 text-xs text-slate-400">
                  <span className="text-slate-300">Kicker:</span> {cfg.hero.kicker}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
