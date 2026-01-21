# S0-S1 Task Index & Quick Start

**Generated:** January 21, 2026  
**Status:** Ready for Sprint 0 Execution  
**Total Tasks:** 10 (S0) + 6 (S1) = 16 atomic tickets

---

## Sprint 0: Guardrails (10 Tasks)

| Task ID | Title | Effort | Dependencies | Merge Criteria |
|---------|-------|--------|--------------|-----------------|
| **S0-001** | Golden Test Harness Setup | 4h | None | Vitest + snapshot config working |
| **S0-002** | Golden Test Fixtures (5 scenarios) | 2h | S0-001 | Preset JSON locked with 5 scenarios |
| **S0-003** | Golden Test: calcRoiV2 | 3h | S0-001, S0-002 | All 5 scenarios snapshot + adoption invariance test |
| **S0-004** | Golden Test: Diagnostic | 2h | S0-001 | 3 diagnostic scenarios snapshot |
| **S0-005** | Golden Test: Network Multiplier | 1.5h | S0-001 | Multiplier behavior locked |
| **S0-006** | CI Pipeline (GitHub Actions) | 2h | None | `.github/workflows/ci.yml` active on PR |
| **S0-007** | Smoke Tests (Playwright) | 2h | S0-006 | 4 routes tested (home, ROI, diagnostic, singularity) |
| **S0-008** | Adoption % Semantics Doc | 1h | S0-003 | `docs/ADOPTION_SEMANTICS.md` committed |
| **S0-009** | Economics Audit Report | 1h | S0-003, S0-004, S0-005 | `docs/ECONOMICS_AUDIT.md` + tables populated |
| **S0-010** | README Update (CI + Tests) | 0.5h | All S0 | README links to adoption + econ docs |

**S0 Total Effort:** ~18.5 hours  
**S0 Demoable Output:** Build passes, all tests green, econ math locked, CI enforces quality gates

---

## Sprint 1: Adoption Slider (6 Tasks)

| Task ID | Title | Effort | Dependencies | Merge Criteria |
|---------|-------|--------|--------------|-----------------|
| **S1-001** | NetworkCoverageModel + Adoption Presets | 2h | S0 complete | Types + `facilitiesInScope()` helper + unit tests |
| **S1-002** | Build CoverageSlider Component | 3h | S1-001 | Component renders, interactive, accessible, unit tested |
| **S1-003** | Wire to ROI Page | 4h | S1-001, S1-002, S0 | Slider interactive, adoption copy updates, math frozen |
| **S1-004** | Adoption Context on Diagnostic | 1.5h | S1-001, S1-003 | Diagnostic shows adoption preset + CTA to ROI |
| **S1-005** | Visual Regression Tests + SOP | 2h | S1-001 through S1-004 | Playwright visual tests, baselines captured + reviewed |
| **S1-006** | Mobile Interaction Tests | 2h | S1-002 | Touch interaction verified, button sizing >44×44px |

**S1 Total Effort:** ~14.5 hours  
**S1 Demoable Output:** Interactive adoption slider, facilities input (unlimited), UI copy updates, visual baselines locked

---

## Key Technical Decisions (Locked)

### Facility Network Scalability
✅ **NO upper cap** – Support 1 to 10,000,000+ facilities  
✅ **Formula:** `facilitiesInScope(total, percent) = Math.round(total * percent / 100)`  
✅ **Test at:** 1, 10, 260 (Primo), 10,000, 1,000,000  
✅ **UI formatting:** `toLocaleString()` (e.g., "1,000,000" not "1000000")  

### Adoption % Semantics
✅ **NARRATIVE-ONLY** – Does NOT map to formula inputs  
✅ **Golden test proves:** `calcRoiV2({...}) === calcRoiV2({...adoptionPercent: 50})`  
✅ **UI copy only:** "Modeling XX of YY facilities in scope"  
✅ **Presets:** 5% (Year 1), 10%, 25%, 50%  

### Golden Tests (Economics Locked)
✅ **Snapshots committed to git** – Any change visible in PR  
✅ **CI blocks merge** if snapshot modified without approval  
✅ **5 scenarios locked:** Micro (1), MidMarket (10), Enterprise (260), Enterprise+ (10k), Massive (1M)  
✅ **Adoption invariance test:** Proves adoption % doesn't change formula outputs  

### No Timeline Language
✅ **Removed:** "Duration: 1 week", "Weeks 1-9", sprint schedule references  
✅ **Focus:** Task completion criteria, not dates  
✅ **Each ticket:** Independently mergeable, fully testable, demoable within sprint  

---

## Atomic Task Breakdown Principles

### Each ticket must include:
1. **Objective** – Clear, one-sentence goal
2. **Acceptance Criteria** – Checkbox list ([ ] items)
3. **Technical Details** – Implementation specifics
4. **Validation** – How to verify completion
5. **Effort Estimate** – Hours (conservative)
6. **Dependencies** – Other tickets that must complete first
7. **Owner** – Team member responsible
8. **Sign-off** – Who approves merge
9. **PR Title** – Clear, follows convention

### Example PR Flow:
```
1. Developer creates feature branch: git checkout -b S0-001-golden-test-harness
2. Implements code + tests
3. Runs local checks:
   npm run lint
   npm run typecheck
   npm run test:unit
   npm run test:e2e:smoke
4. Pushes to remote
5. GitHub Actions runs: lint → typecheck → unit → E2E smoke
6. If all green: PR mergeable
7. Review: CTO + relevant owner approve
8. Merge to main
9. Vercel auto-deploy (if repo linked)
```

---

## Success Criteria (S0 + S1)

**S0 Success:**
- [ ] `npm run build` → succeeds
- [ ] `npm run test:unit` → all tests pass (golden tests locked)
- [ ] `npm run test:e2e:smoke` → all routes render
- [ ] `git push` → CI green (lint, typecheck, unit, E2E)
- [ ] Team understands: adoption % = narrative-only
- [ ] Economics math frozen in snapshots

**S1 Success:**
- [ ] CoverageSlider renders + is interactive
- [ ] Adoption presets (5%, 10%, 25%, 50%) work
- [ ] Facilities input accepts 1 to 1,000,000+ (no upper cap)
- [ ] UI copy updates: "Modeling XX of YY facilities"
- [ ] ROI outputs identical to S0 golden tests (adoption % math-neutral ✅)
- [ ] Visual regression baselines captured
- [ ] Mobile touch interaction verified
- [ ] Diagnostic page shows adoption context + CTA to ROI

---

## Next Steps (Post S0-S1 Merge)

- **S2:** Performance baselines + reduced-motion support
- **S3:** Brand + IA consistency (naming, CTAs, links)
- **S4:** Primo-specific case study integration
- **S5:** Advanced presets + optional diagnostics
- **S6:** Wave 2 planning (post-launch animations, etc.)

---

## Quick Links

📄 **Full Breakdown:** [S0_S1_DETAILED_BREAKDOWN.md](S0_S1_DETAILED_BREAKDOWN.md)  
🗺️ **Sprint Plan:** [LAUNCH_SPRINT_PLAN.md](LAUNCH_SPRINT_PLAN.md)  
🏗️ **Architecture:** [FACILITY_NETWORK_AND_ANIMATION_STRATEGY.md](FACILITY_NETWORK_AND_ANIMATION_STRATEGY.md)  
📊 **Economics Lock:** [LAUNCH_SPRINT_PLAN.md#S0 Subsection](LAUNCH_SPRINT_PLAN.md)  

---

## Commands Reference

**Local Development:**
```bash
npm run lint                    # ESLint
npm run typecheck              # TypeScript strict
npm run test:unit              # Vitest (includes golden tests)
npm run test:unit -- -u        # Update golden test snapshots (after approval)
npm run test:e2e:smoke         # Playwright smoke tests
npm run test:e2e:visual        # Visual regression tests
npm run build                  # Production build
npm run dev                    # Dev server (localhost:3000)
```

**Git Workflow:**
```bash
git checkout -b S0-001-golden-test-harness
# ... code ...
git add -A
git commit -m "feat(test): Add golden test harness (S0-001)"
git push origin S0-001-golden-test-harness
# → Open PR
# → CI runs automatically
# → Merge when all checks pass
```

---

**Status:** ✅ Ready for Sprint 0 Execution  
**Last Updated:** January 21, 2026  
**Committed:** commit 153654d

