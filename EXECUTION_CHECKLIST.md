# YardFlow Launch: Ready-to-Execute Checklist

**Status:** ✅ READY (after 5 decisions approved)  
**Last Updated:** January 21, 2026  
**Owner:** Chief Product Officer + CTO

---

## PRE-EXECUTION CHECKLIST (This Week)

### 🎯 Decision Approval (by EOW Friday, Jan 24)

- [ ] **Decision 1:** Repurpose existing ROI/Singularity pages (not rebuild)
- [ ] **Decision 2:** Approve 3-day shader spike to de-risk performance
- [ ] **Decision 3:** CEO owns copy approval with 2-day turnaround
- [ ] **Decision 4:** Commit to April 15, 2026 launch date
- [ ] **Decision 5:** Use Markdown + Git for content (not CMS)

**Owner:** CEO  
**Escalation:** If not all approved by EOW, escalate to Board Friday AM.

---

### 👥 Team Assignment (by Mon, Jan 27)

- [ ] **Agent A (Economist):** Assigned (must have TS/Node expertise + domain knowledge)
- [ ] **Agent B (Visualist):** Assigned (GLSL/R3F expertise required)
- [ ] **Agent C (Architect):** Assigned (full-stack, performance-minded)
- [ ] **Agent D (Gatekeeper):** Assigned (QA lead, CI/CD expert)
- [ ] **Agent E (Closer):** Assigned (product marketing, copywriting)

**Owner:** CTO + Head of Product  
**Validation:** Each agent has read COPILOT_LAUNCH_PROMPT.md in full.

---

### 🏗️ Infrastructure Setup (by Wed, Jan 29)

- [ ] **Staging Environment:** staging.flow-state-klbt.vercel.app ready
- [ ] **CI/CD Pipeline:** Merge gating enabled (typecheck, lint, tests, build, perf)
- [ ] **Analytics:** GA4 + Sentry configured for prod
- [ ] **Monitoring:** Vercel Analytics dashboard set up
- [ ] **Repo Hygiene:** CODEOWNERS file created, PR template added
- [ ] **Documentation:** Master prompt (COPILOT_LAUNCH_PROMPT.md) in root of repo

**Owner:** Gatekeeper  
**Validation:** All green lights in Vercel dashboard.

---

### 📋 Kick-Off Meeting (by Fri, Jan 31)

Attendees: All 5 agents + CEO/Product + CTO

**Agenda:**
- [ ] Review sprint goals (1 slide each agent's scope).
- [ ] Confirm Quality Gates & merge rules.
- [ ] Confirm decision approvals.
- [ ] Baseline metrics (FPS, bundle size, accessibility score as of today).
- [ ] Weekly standup cadence locked (M/W/F, 30min).
- [ ] Demo schedule confirmed (Sprints 1/2/3 demos in calendar).

**Owner:** Chief Product Officer

---

## SPRINT 0: SHADER SPIKE (Feb 1-7)

**Goal:** De-risk Black Hole ↔ Network shader. Confirm 60Hz performance on target hardware.

### Deliverables

- [ ] **Schwarzschild Raymarching Prototype:** Fragment shader compiles, renders, no errors.
- [ ] **Particle Network Transition:** Instanced mesh with 5000 particles, smooth flow vectors.
- [ ] **Dissolve Effect:** Perlin noise-based alpha map, smooth 2-3s transition from Black Hole → Network.
- [ ] **Performance Validation:** 
  - [ ] Desktop (MacBook Air): 60+ FPS sustained.
  - [ ] Tablet (iPad Pro): 55+ FPS.
  - [ ] Mobile (iPhone 12): 50+ FPS.
  - [ ] Low-end Android: 30+ FPS (acceptable with quality downgrade).
- [ ] **GPU Memory:** <256MB on Ultra tier.
- [ ] **Shader Compile Time:** <500ms first render.

### Sign-Off

- [ ] **Visualist:** Prototype meets fidelity + performance targets.
- [ ] **CTO:** No architectural blockers identified.
- [ ] **Gatekeeper:** Performance budgets confirmed feasible.

**Owner:** Agent B (Visualist)  
**Blocker Escalation:** If 60Hz not achievable, escalate to CTO by EOD Feb 7. Fallback: Simpler dissolve effect.

---

## SPRINT 1: LOGIC CORE (Feb 8 - Mar 1)

**Goal:** Economic engine + narrative spine. Tests passing. Ready for visuals.

### Task 1.1: Variance Tax State Audit & Refactor

- [ ] **All 6 Components Validated:**
  - [ ] Recovery (Spot premium on missed appointments).
  - [ ] Detention (Hours over free time × rate).
  - [ ] Labor (Manual vs. digital time cost).
  - [ ] Chargeback (OTIF penalty rate).
  - [ ] Working Capital (Safety stock holding cost).
  - [ ] Lost Sales (Stockout revenue risk).
- [ ] **Golden Tests:** All 4 presets (mid-market, enterprise, high-velocity, low-tech) snapshot-matching.
- [ ] **Data Sources Cited:** Every default value has inline comment with source.
- [ ] **Zustand Store:** Exports clean API (updateInput, selectOutputs, selectBreakdown).
- [ ] **TypeScript:** Strict mode, zero `any`, all types exported.

**Owner:** Agent A (Economist)  
**Validation:** Snapshot test passes + Gatekeeper code review.

---

### Task 1.2: Homepage Content Deck & Wireframe

- [ ] **7-Section Structure Approved:**
  1. Hero: "The Variance Tax"
  2. Problem: "Stochastic Capacity"
  3. Thesis: "Operational Reynolds Number"
  4. Proof: "Your Hidden Costs" (Calculator preview)
  5. Protocol: "3 Primitives" (Cards: digitalGUARD, Digital Yard, digitalBOL)
  6. Singularity: "2026 Demands Fluidity"
  7. CTA: "Co-Development Program"
- [ ] **Copy Tone:** All sections use "Protocol/Standardization/System" language. Zero "easy/simple/app."
- [ ] **Wireframe:** Desktop + mobile layouts locked in Figma.
- [ ] **CEO Approval:** Copy deck reviewed + signed off.

**Owner:** Agent E (Closer)  
**Validation:** CEO signature + Gatekeeper tone audit.

---

### Task 1.3: Content Contract Tests

- [ ] **Forbidden Words Test:** Never use "easy," "simple," "app," "blockchain," "2024 rates."
- [ ] **Required Phrases Test:** "12 questions," "Variance Tax," "Standardization," "First YNS."
- [ ] **CTA Consistency Test:** All "Apply for Co-Development" CTAs use exact same text.
- [ ] **Question Count Test:** Always "Question 1 of 12" (not "9 questions").
- [ ] **Test Passing:** E2E smoke test suite in CI.

**Owner:** Agent D (Gatekeeper)  
**Validation:** All tests green before Sprint 2.

---

### Task 1.4: CTA Hierarchy & Conversion Flow Audit

- [ ] **CTA Audit Matrix Completed:**
  | Page | Primary | Secondary | Tertiary |
  | / | Apply | Explore ROI | See Variance |
  | /roi | Apply | Calculate Variance | Contact |
  | /singularity | Apply | Explore Economics | Try Diagnostic |
  | /diagnostic | Apply | Model ROI | Learn Protocol |
- [ ] **No More Than 3 CTAs Above Fold:** Every page audited.
- [ ] **CTA Color Consistent:** Primary = #05ACEB (Cerulean), Secondary = Ghost.
- [ ] **Mobile CTA Reachable:** Minimum 44px target size.

**Owner:** Agent E (Closer)  
**Validation:** Manual audit + screenshot comparison to matrix.

---

### Sprint 1 Demo (Fri, Mar 1)

**Presenters:** Agent A + Agent E  
**Attendees:** Full team + CEO/Product

**Show & Tell:**
- [ ] Calculator running live with test inputs.
- [ ] Breakdown report exporting to PDF.
- [ ] Content deck read-through (copy tone review).
- [ ] Tests passing (green CI).

**Sign-Off:** Gatekeeper gates merge. No merge without ✅.

---

## SPRINT 2: VISUAL COHESION (Mar 2 - Mar 23)

**Goal:** Unify aesthetic. Polish animations. Singularity canvas stunning.

### Task 2.1: Brand Color Enforcement

- [ ] **Tailwind Config Updated:**
  - [ ] `void: '#232A35'` (Ebony Clay - background)
  - [ ] `neon: '#D91411'` (FreightRoll Red - danger/variance)
  - [ ] `flow: '#05ACEB'` (Cerulean - order/success)
  - [ ] `steel: '#8892A8'` (Neutral text)
- [ ] **No Inline Hex Colors:** Grep audit returns zero.
- [ ] **All Components Updated:** Every page using Tailwind classes only.
- [ ] **Visual Regression Test:** Screenshot all pages, compare to brand guidelines.
- [ ] **Color Contrast Audit:** All text ≥4.5:1 contrast ratio (WCAG AA).

**Owner:** Agent C (Architect)  
**Validation:** Grep audit passes + visual regression test.

---

### Task 2.2: Black Hole ↔ Network Shader Polish

- [ ] **Black Hole State (High Viscosity):**
  - [ ] Red accretion disk, chaotic Perlin noise.
  - [ ] Raymarched gravitational lensing.
  - [ ] Violent rotation (uTime-driven).
- [ ] **Network State (Low Viscosity):**
  - [ ] Cyan/blue structured particle grid.
  - [ ] Laminar flow vectors (no turbulence).
  - [ ] Smooth, deterministic particle paths.
- [ ] **Transition (2-3 seconds):**
  - [ ] Dissolve noise rips apart black hole.
  - [ ] Color temperature Red → Blue.
  - [ ] Particles emerge from chaos.
- [ ] **Performance Validated:**
  - [ ] Desktop: 60+ FPS sustained.
  - [ ] Mobile (iPhone 12): 50+ FPS.
  - [ ] GPU memory: <256MB.
  - [ ] Shader compile: <500ms.
- [ ] **Reduced Motion Path:** Static transition (instant, no animation).

**Owner:** Agent B (Visualist)  
**Validation:** Performance trace + visual regression + accessibility audit.

---

### Task 2.3: Responsive Calculator Overlay

- [ ] **Desktop (≥1024px):** Side-by-side layout (calc 40%, viz 60%).
- [ ] **Tablet (768-1023px):** Stacked layout (calc above, viz below).
- [ ] **Mobile (<768px):** Drawer layout (collapsible bottom sheet).
- [ ] **Touch UX:**
  - [ ] Slider targets ≥44px tall.
  - [ ] Numeric inputs accept mobile keyboard.
  - [ ] No horizontal scroll.
- [ ] **Tested On:** iPhone 12, iPad Pro, Galaxy S21, Chrome DevTools.

**Owner:** Agent C (Architect)  
**Validation:** Device testing + visual regression + touch interaction audit.

---

### Task 2.4: Audio Cohesion

- [ ] **Variance State Audio:** Low-frequency hum (60Hz, LFO modulation, 0.3 volume).
- [ ] **Transition Audio:** Cross-fade (2s) + pitch glide.
- [ ] **Flow State Audio:** Rhythmic synth pulse (120 BPM, arpeggiated minor thirds).
- [ ] **Implementation:**
  - [ ] Audio optional (toggle in settings).
  - [ ] No auto-play (user gesture required).
  - [ ] Volume normalized to -6dB (not peaky).
  - [ ] Works in Safari, Chrome, Firefox, mobile.
  - [ ] Respects `prefers-reduced-motion`.

**Owner:** Agent B (Visualist)  
**Validation:** Audio test suite (cross-browser) + screen reader compatibility.

---

### Sprint 2 Demo (Sun, Mar 23)

**Presenters:** Agent B + Agent C  
**Attendees:** Full team + CTO

**Show & Tell:**
- [ ] Black Hole ↔ Network transition (desktop + mobile).
- [ ] Calculator responsive demo (resize browser).
- [ ] Audio demo (unmuted, then muted, then reduced-motion).
- [ ] Performance metrics (60 FPS live).

**Sign-Off:** Gatekeeper gates merge.

---

## SPRINT 3: INTEGRATION & LAUNCH (Mar 24 - Apr 8)

**Goal:** End-to-end journey. Ship to production.

### Task 3.1: Homepage → Singularity Journey

- [ ] **Scrollytelling Implemented:**
  - [ ] Section 1: Hero (full-screen).
  - [ ] Section 2: Problem (parallax text).
  - [ ] Section 3: Thesis (formula SVG animation).
  - [ ] Section 4: Proof (Calculator static preview, numbers animate in).
  - [ ] Section 5: Protocol (3-card grid, hover effects).
  - [ ] Section 6: Singularity (2-col, text left + viz preview right).
  - [ ] Section 7: CTA (Co-Dev program, primary button).
- [ ] **Mobile Responsive:** Single column, stacked sections.
- [ ] **Performance:** Load time <3s on 4G, Lighthouse ≥85.

**Owner:** Agent C (Architect)  
**Validation:** Performance trace + accessibility audit + visual regression.

---

### Task 3.2: /singularity Full Experience

- [ ] **Split-Screen Desktop:** Calculator (left 40%) + Viz (right 60%).
- [ ] **Real-Time Binding:** <100ms latency from slider → shader update.
- [ ] **Breakdown Panel:** Toggle to show 6-component cost breakdown.
- [ ] **Export Button:** Download Variance Tax report as PDF.
- [ ] **Share Button:** Pre-filled URL with scenario encoded (e.g., `?preset=enterprise&viscosity=0.65`).

**Owner:** Agent C (Architect)  
**Validation:** Integration test + performance trace + UX audit.

---

### Task 3.3: /roi Repurposing

- [ ] **New Intro Section Added:** "Variance Tax measures downside, ROI measures upside."
- [ ] **Links Updated:** No orphaned pages.
- [ ] **CTAs Consistent:** Primary = "Apply for Co-Development."
- [ ] **Existing Formulas:** Unchanged (no regression).

**Owner:** Agent E (Closer) + Agent C (Architect)  
**Validation:** Link audit + smoke test.

---

### Task 3.4: Accessibility & SEO Audit

**Accessibility (WCAG AA):**
- [ ] All images have alt text.
- [ ] Color contrast ≥4.5:1.
- [ ] Keyboard navigation: All interactive elements reachable via Tab.
- [ ] Screen reader: Tested with NVDA/JAWS (3+ key pages).
- [ ] Reduced motion: All animations respect `prefers-reduced-motion`.
- [ ] Touch targets: ≥44px.

**SEO:**
- [ ] Meta title/description (60/160 chars) on every page.
- [ ] H1 unique per page.
- [ ] Open Graph + Twitter cards.
- [ ] Canonical tags.
- [ ] XML sitemap updated.
- [ ] robots.txt allows crawling.

**Owner:** Agent D (Gatekeeper)  
**Validation:** Lighthouse audit (Accessibility ≥90, SEO ≥90) + axe accessibility tool.

---

### Task 3.5: Performance Budget Enforcement

**Budgets (All Must Be Green):**
- [ ] **First Contentful Paint (FCP):** <1.5s
- [ ] **Largest Contentful Paint (LCP):** <2.5s
- [ ] **Cumulative Layout Shift (CLS):** <0.1
- [ ] **Time to Interactive (TTI):** <3.5s
- [ ] **JavaScript Bundle:** <200KB (gzipped)
- [ ] **Shader Compilation:** <500ms
- [ ] **GPU Memory:** <256MB (Ultra)
- [ ] **FPS Target:** 55+ sustained

**Owner:** Agent D (Gatekeeper)  
**Validation:** Perf budget test suite in CI. Fail if exceeded.

---

### Task 3.6: Deployment Readiness

**Pre-Deploy Checklist:**
- [ ] All Sprints 1-3 merged (no pending PRs).
- [ ] All tests passing (unit, E2E, visual, accessibility).
- [ ] Staging tested (staging.flow-state-klbt.vercel.app).
- [ ] Stakeholder UAT sign-off (CEO, PMO, Sales).
- [ ] Database/CMS content finalized.
- [ ] Analytics instrumented (GA4, Mixpanel events).
- [ ] Support docs ready (FAQ, troubleshooting).
- [ ] Rollback plan documented.
- [ ] Sentry + Vercel monitoring enabled.

**Owner:** Agent D (Gatekeeper) + Agent C (Architect)  
**Validation:** Deployment checklist 100% complete.

---

### Sprint 3 Demo & UAT (Wed, Apr 8)

**Presenters:** All 5 agents  
**Attendees:** Full team + CEO/Product + Sales

**Show & Tell:**
- [ ] Full end-to-end journey (homepage → singularity → /contact).
- [ ] Mobile responsive demo.
- [ ] All performance budgets met (live metrics).
- [ ] Accessibility features highlighted (keyboard nav, screen reader).
- [ ] Live dashboard preview (post-launch monitoring setup).

**Sign-Off:** CEO + Sales approve for production deploy.

---

## LAUNCH (Tue, Apr 15)

- [ ] **Deployment Window:** Tuesday 10 AM PT (low-traffic window).
- [ ] **Rollback Standby:** On-call engineer monitoring first 2 hours.
- [ ] **Stakeholder Comms:**
  - [ ] Launch email to customer list.
  - [ ] Social media post (LinkedIn, Twitter).
  - [ ] Sales one-pager (positioning, CTA flow).
- [ ] **Monitoring:** GA4 dashboard + Sentry error tracking live.
- [ ] **Post-Launch Review:** Daily metrics review for 7 days.

**Owner:** Agent D (Gatekeeper) + Agent E (Closer)

---

## POST-LAUNCH (Apr 16 - May 31)

**Metrics Review (Daily, First Week):**
- [ ] Sessions, bounce rate, conversion (apply CTAs).
- [ ] Error rate (Sentry).
- [ ] Performance (LCP, FCP, TTI).
- [ ] Accessibility issues reported.

**Weekly Sync (Weeks 2+):**
- [ ] Feature requests vs. bugs triaged.
- [ ] Performance regressions monitored.
- [ ] Content updates (if any copy changes needed).

**Sprint 4 Planning (Post-Launch):**
- [ ] Prioritize v2 features based on user feedback.
- [ ] Onboard first Co-Dev partners.
- [ ] Iterate based on real-world usage.

---

## Sign-Offs Required

| Gate | Owner | Target Date | Status |
|------|-------|-------------|--------|
| **5 Decisions Approved** | CEO + Board | Jan 24 | ⬜ |
| **Team Assigned** | CTO + HOP | Jan 27 | ⬜ |
| **Infrastructure Ready** | Gatekeeper | Jan 29 | ⬜ |
| **Sprint 0 Complete** | CTO | Feb 7 | ⬜ |
| **Sprint 1 Demo** | Gatekeeper | Mar 1 | ⬜ |
| **Sprint 2 Demo** | Gatekeeper | Mar 23 | ⬜ |
| **Sprint 3 Demo + UAT** | CEO + Sales | Apr 8 | ⬜ |
| **Deploy to Prod** | Gatekeeper | Apr 15 | ⬜ |

---

## Quick Reference: Master Prompt Location

**For detailed task breakdown, see:** `/COPILOT_LAUNCH_PROMPT.md` (in repo root)

This document is the **checklist**. The master prompt is the **playbook**.

---

## Questions?

- **Strategy/Timeline:** Head of Product
- **Technical/Arch:** CTO
- **Copy/Narrative:** Closer
- **QA/Perf/A11y:** Gatekeeper

**Next Exec Sync:** TBD (post-approval)

---

**YardFlow. The First Yard Network System. April 2026.** 🚀

