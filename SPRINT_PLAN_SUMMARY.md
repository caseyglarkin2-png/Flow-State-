# YardFlow Launch: Sprint Plan Summary (Quick Reference)

**Status:** ✅ **READY TO EXECUTE** (Post-Subagent Review)  
**Timeline:** 9 weeks (6 sprints + UAT + code freeze)  
**Team:** 5 agents (Economist, Visualist, Architect, Gatekeeper, Closer)  
**Date:** January 21, 2026

---

## Strategic Thesis

| Component | Detail |
|-----------|--------|
| **Narrative Spine** | Adoption % (Network Coverage): 5% Year 1 (Deep Model default) → 50% transformation |
| **Formula Math** | FROZEN. Golden tests lock all econ outputs; no regressions allowed. |
| **Adoption %** | NARRATIVE-ONLY (per S0.5a). Does NOT change calcRoiV2() inputs or outputs. |
| **Animation Strategy** | Heavy animation work (Lab, Lottie, MP4) deferred to Wave 2 (post-launch). S2 = Reduced Motion + Performance only. |
| **Brand + IA** | One naming system ("YardFlow by FreightRoll"), one CTA ladder, zero orphaned pages. |

---

## Sprint Structure (6 Sprints, 9 Weeks)

| Sprint | Focus | Duration | Tickets | Demo |
|--------|-------|----------|---------|------|
| **S0** | Guardrails | 1 wk | 5a (Adoption Semantics NEW) | CI green; golden tests locked; adoption % semantics documented |
| **S1** | Adoption Slider | 1 wk | 5 | CoverageSlider works; adoption presets on ROI + Diagnostic; outputs stable |
| **S2** | Presets + Performance | 1 wk | 5 | Presets unified; reduced-motion framework; performance baselines set |
| **S3** | Brand + IA | 1 wk | 5 | Brand normalized; CTAs unified; link walk green; orphaned content cleaned |
| **S4** | Premium UI | 1 wk | 5 | Home + ROI refactored with primitives; mobile responsive |
| **S5** | ROI Hardening | 1 wk | 5 | ROI deterministic; validation robust; adoption compounding chart; PDF locked |
| **S6** | Diagnostic + CTA | 1 wk | 5 | Diagnostic clearer; CTAs wire to audit + ROI with adoption presets |

---

## Critical Blockers Resolved (Subagent Review)

### ✅ Resolved

1. **S0.5a (Adoption % Semantics)** – NEW TICKET
   - Document: adoption % is narrative-only; does NOT alter formula inputs
   - Golden test: confirm outputs unchanged when adoption % varies
   - Sign-off: Economist + CTO (required)
   - Owner: Economist
   - Effort: 1 day

2. **S2 Deferred to Wave 2** – SAVES 1 WEEK
   - Animation Lab, Lottie integration, MP4 preview → post-launch
   - S2 reframed: Reduced Motion + Performance guardrails only
   - Refocuses on adoption narrative (not animations)

3. **S1.2 Mobile CoverageSlider** – REFINEMENT
   - Decision: (A) Migrate to Radix Slider for touch, or (B) Preset-chips-primary on mobile
   - Add Playwright touch interaction tests
   - Visual regression at mobile size

4. **S1.5 Visual Regression SOP** – PROCESS CLARITY
   - Document: baseline approval, regression detection, intentional changes
   - Visualist approves baselines; Gatekeeper enforces CI gate
   - Prevents snapshot approval stall

5. **seedrandom Dependency** – INSTALL NOW
   - `npm install seedrandom @types/seedrandom` (needed for S5+ deterministic sim)

---

## Key Decisions (Owner + Sign-Off)

| Decision | Owner | Timeline | Recommendation |
|----------|-------|----------|-----------------|
| Adoption % = narrative-only? | Economist + CTO | S0 (Day 1-2) | **YES** – per S0.5a |
| Defer Animation Lab to Wave 2? | Product Lead | S0 (Day 1) | **YES** – saves 1 week |
| CoverageSlider: Radix or preset-primary? | Visualist | S1 (Day 1) | Preset-primary = faster (1-2h vs 3-4h) |
| Visual regression threshold? | Gatekeeper | S1 (Day 1) | **2% pixel diff** – auto-fail in CI |

---

## Teams + Roles

| Agent | Sprints | Key Tickets |
|-------|---------|-----------|
| **Economist** | S0, S1, S5 | S0.1-0.3, S0.5a, S5.1 |
| **Visualist** | S1, S2, S4, S6 | S1.2, S2.4-5, S4.2-4 |
| **Architect** | S1, S2, S3, S5 | S1.1, S1.3, S2.1, S3.1, S5.2, S5.4 |
| **Gatekeeper** | S0, S2, S3, S4 | S0.4-5, S2.2, S2.5, S3.3, S3.5, S4.5 |
| **Closer** | S3, S5, S6 | S3.4, S5.5, S6.2 |

---

## Testing Strategy

| Type | Scope | Target | Tools |
|------|-------|--------|-------|
| **Golden Tests** | ROI, Diagnostic, Network Multiplier | 0 regressions | Vitest + snapshots |
| **Unit Tests** | Validation, components, utilities | >80% coverage | Vitest |
| **E2E Tests** | Smoke, link walk, diagnostic flow, singularity | 20+ tests | Playwright |
| **Visual Regression** | Home, ROI, Diagnostic, Singularity | <2% diff | Playwright screenshot |
| **A11y** | WCAG AA, reduced-motion, keyboard nav | >95 Lighthouse | Lighthouse + axe-core |
| **Performance** | LCP <2.5s, CLS <0.1, FPS >55 | Launch-ready | Lighthouse CI, DevTools |

---

## Deliverables Per Sprint

| Sprint | Demoable Increment | Tests | Documentation |
|--------|-------------------|-------|-----------------|
| **S0** | CI green; golden tests locked | 5 golden tests + smoke | `docs/ADOPTION_SEMANTICS.md`, `docs/ECONOMICS_AUDIT.md` |
| **S1** | Adoption slider on ROI + Diagnostic | 5 unit + 2 E2E + visual snapshot | `docs/ADOPTION_PRESETS.md` |
| **S2** | Reduced motion + performance framework | 4 unit + performance baseline | `docs/PERFORMANCE_BASELINES.md`, `docs/VISUAL_REGRESSION_SOP.md` |
| **S3** | Brand + IA normalized | 4 E2E (link walk, brand audit) | `docs/BRAND_AUDIT.md`, `docs/CTA_HIERARCHY.md` |
| **S4** | Home + ROI refactored with primitives | 5 unit + visual snapshots | `components/primitives/` (4 components) |
| **S5** | ROI deterministic; adoption compounding | 5 unit + 2 E2E + golden tests | `docs/PDF_EXPORT_SPEC.md` |
| **S6** | Diagnostic flow clear; CTAs wired | 5 E2E + visual snapshots | CTA wiring verified |

---

## Success Criteria (Launch Gate)

### Pre-Launch Checklist
- [ ] **CI Green:** All tests pass (lint, typecheck, unit, E2E, visual)
- [ ] **Econ Locked:** Golden tests unchanged; no formula regressions
- [ ] **Adoption Narrative:** 5% Year 1 default explicit; presets work on all pages
- [ ] **Brand Unified:** One name, one CTA ladder, zero dead links
- [ ] **Performance:** Lighthouse >75, LCP <2.5s, CLS <0.1, <200KB JS
- [ ] **A11y:** WCAG AA compliant; reduced-motion respected; >95 Lighthouse
- [ ] **User Stories:** Diagnostic → ROI flow works; PDF deterministic; Singularity stable

### Business Outcomes (Wave 1 Success)
- Conversion rate: CTA click-through increases 10%+
- Engagement: ROI calc usage increases
- Credibility: No "pooched elements"; all claims data-backed
- Launch: On-time to market (Week 9)

### Wave 2 Decision Point
- If adoption flow CTAs show >25% click-through: invest in Animation Lab + Lottie
- If Singularity page drives conversion: invest in shader polish + audio
- Otherwise: defer Wave 2 indefinitely

---

## Risk Summary

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Econ drift during refactor | Medium | High | Golden tests (S0); paired review |
| Adoption % changes outputs (not narrative) | Medium | High | S0.5a doc + golden test verification |
| Animation performance <55 FPS | Low | High | Deferred to Wave 2; S2 guards via performance baseline |
| Brand name inconsistency | Low | Medium | Grep audit (S3); CI lint rule (optional) |
| Snapshot baseline approval stall | Medium | Medium | SOP documented (S2.5); Visualist owns approval |
| 5-person team capacity | Medium | Medium | 9-week timeline (not 10); 20% interrupt buffer |

**Escalation Path:** Developer → Gatekeeper → CTO (technical) or Product Lead (scope) or CEO (strategic)

---

## Parallel Work Windows

**Week 1:** S0 only (gatekeeping work; blocks everything)

**Weeks 2-3:** S1 + S2 + S3 can overlap
- S1 (Economist + Architect): adoption model + slider
- S2 (Gatekeeper): performance baselines
- S3 (Architect + Closer): brand + IA (no code collision)

**Weeks 4-6:** S4 + S5 + S6 sequential (depend on prior sprints)
- S4: UI primitives foundation
- S5: ROI hardening (waits for S4 + S1)
- S6: Diagnostic + CTA wiring (waits for S5)

**Week 7:** Integration + final testing

**Weeks 8-9:** UAT + code freeze + launch

---

## Next Steps (Immediate)

**By EOD Today (Jan 21):**
- [ ] Verify subagent review (✅ done)
- [ ] Update sprint plan with revisions (✅ done)
- [ ] Commit to main: `LAUNCH_SPRINT_PLAN.md` + `SPRINT_PLAN_SUMMARY.md`

**By Start of S0 (Jan 22):**
- [ ] Install `seedrandom` + `@types/seedrandom`
- [ ] Economist clarifies adoption % semantics in S0.5a doc
- [ ] CTO reviews + approves S0.5a interpretation
- [ ] Create CI pipeline skeleton (GitHub Actions)

**S0 Week 1 (Jan 22-28):**
- [ ] Execute S0.1-0.5a (guardrails + adoption semantics)
- [ ] Team kickoff: all agents understand adoption thesis + S0 blockers
- [ ] Golden tests pass locally
- [ ] Adoption % semantics locked (no ambiguity)

**S1 Week 2 (Jan 29-Feb 4):**
- [ ] Begin CoverageSlider component (S1.2)
- [ ] Adoption model types defined (S1.1)
- [ ] Wire to ROI page (S1.3)

---

## Key Contacts + Escalation

| Role | Responsibility | Escalation |
|------|---------------|-------------|
| **Economist** | Econ lock + adoption % semantics | CTO if decision blocked |
| **Visualist** | UI + brand polish | Product if scope unclear |
| **Architect** | System design + integration | CTO if technical blocker |
| **Gatekeeper** | CI/CD + quality gates | CTO if tooling missing |
| **Closer** | Copy + positioning | CEO if narrative shift needed |
| **Product Lead** | Prioritization + Wave 2 decisions | CEO if strategic change |
| **CTO** | Technical final authority | CEO if architecture escalation |
| **CEO** | Final sign-off + launch decision | Board if strategic escalation |

---

## Document Map

| Document | Purpose | Owner | Location |
|----------|---------|-------|----------|
| LAUNCH_SPRINT_PLAN.md | Full sprint details (2000+ lines) | Architect | Repo root |
| SPRINT_PLAN_SUMMARY.md | This doc – quick reference | Architect | Repo root |
| docs/ADOPTION_SEMANTICS.md | Adoption % = narrative-only interpretation | Economist | docs/ |
| docs/ECONOMICS_AUDIT.md | What's locked + why | Economist | docs/ |
| docs/PERFORMANCE_BASELINES.md | Current + target metrics | Gatekeeper | docs/ |
| docs/VISUAL_REGRESSION_SOP.md | Snapshot approval process | Gatekeeper | docs/ |
| docs/BRAND_AUDIT.md | Brand name + CTA normalization | Closer | docs/ |
| docs/CTA_HIERARCHY.md | Primary / Secondary / Tertiary CTAs | Closer | docs/ |

---

**Version:** 2.1 (Post-Subagent Review)  
**Status:** ✅ Ready to Commit + Execute  
**Last Updated:** January 21, 2026

