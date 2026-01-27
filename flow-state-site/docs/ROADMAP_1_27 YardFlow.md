\# YardFlow Site Rebuild Plan (High-Conviction, CFO-Safe)

\#\# Objective  
Refactor the YardFlow marketing site into a simplified, story-driven experience:  
Problem (network chaos) → Unique solve (standard protocol across yard network) → Facility install (modules) → Network rollout → ROI experience → Procurement enablement.

\#\# Non-Negotiables  
\- Top-level routes: \`/\`, \`/product\`, \`/solutions\`, \`/roi\`, \`/procurement\` (optional \`/about\`)  
\- Remove from live site (archive ok): proof engine, protocol adoption section, variance tax animation  
\- Remove: emojis, audit-grade framing, iPhone animation, 4-slide modules/facility/network/unlocked sequence  
\- Core product framing: "The protocol is the product" with clear Core vs Enhanced separation  
\- Core modules: Digital Gate, Digital Comms, Digital BOL/Docs, Digital Yard Orchestration  
\- ROI page: deep model default, inputs in top row, basic mode toggle, Singularity node map header  
\- Canonical ROI math in \`lib/roi.ts\` with unit tests; build fails if drift

\#\# Sprints (Each must be demoable)  
\#\#\# Sprint 0: Repo Guardrails  
\- CI (lint/typecheck/unit)  
\- Playwright smoke tests for main routes  
\- Lighthouse reporting (soft gate initially)

\#\#\# Sprint 1: IA Simplification  
\- Implement route shells \+ nav  
\- Archive old pages or move to \`/archive/\*\`  
\- Add redirects

\#\#\# Sprint 2: Homepage Rebuild  
\- Remove non-defensible sections  
\- Add Standardization Map (Chaos ↔ Standardized)  
\- Add Control Valve section (no variance-tax fluff)  
\- Add Core Modules section  
\- Add Proof stats block (factual outcomes)

\#\#\# Sprint 3: Product Page  
\- "Four modules, one network" layout  
\- Replace placeholder animations with real assets \+ fallbacks

\#\#\# Sprint 4-5: ROI Experience  
\- \`lib/roi.ts\` typed engine \+ tests  
\- Deep model UI default \+ top-row inputs  
\- Singularity node map header  
\- Sync rollout slider to node map \+ ROI outputs

\#\#\# Sprint 6: Solutions Hub  
\- Single page with archetype tabs:  
  \- Dry Van \+ Reefer  
  \- Intermodal  
  \- Flatbed / Industrial  
  \- Tanker / Hazmat  
\- Template layout per archetype: Leaks → Standardize → Instrument → Payoff → Proof → CTA

\#\#\# Sprint 7: Procurement / Evidence Vault  
\- Procurement packet request flow  
\- Evidence assets \+ credibility library

\#\#\# Sprint 8: Launch Polish  
\- Perf pass (lazy load heavy visuals)  
\- a11y pass  
\- analytics \+ conversion events

