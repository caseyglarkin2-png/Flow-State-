# YardFlow Launch Plan: Technical Gaps & Risk Matrix
**For:** Engineering Team (Agents A-E)  
**From:** Architecture Review  
**Date:** January 21, 2026  
**Priority:** P0 (Blocking Items) through P2 (Nice-to-Have)  

---

## P0 BLOCKERS (Must Resolve Before Sprint 0 Ends)

### P0.1: Task 0.9 - Model Reconciliation (8-Category vs 6-Component)

| Aspect | Status | Action Required |
|--------|--------|-----------------|
| **Current State** | Unresolved | DiagnosticCalculator (8 categories) vs Whitepaper (6 components) |
| **Blocking** | Yes | Task 1.1 (Input Types) cannot start until decision made |
| **Owner** | CEO + Economist (A) | Reconciliation decision + mapping document |
| **Timeline Impact** | HIGH | If delayed past Sprint 0 Week 1 → +1 week slip |
| **Effort** | 4-8 hours | Decision (2 hrs) + implementation (2-6 hrs) |
| **Sign-Off** | Required | CEO + CTO approval on mapping doc |

**Current 8 Categories:**
```
1. Detention
2. Cutoffs (missed appointments)
3. Overtime labor
4. Trailer hunting
5. Chargebacks (OTIF)
6. Overflow spend
7. Safety/security
8. Working capital drag
```

**Proposed 6 Components:**
```
A. Recovery Cost (Premium Freight)
B. Detention Cost
C. Labor Variance Cost
D. Chargeback Cost
E. Working Capital Drag
F. Lost Sales Risk
```

**Mapping Required:**
```
[ ] Which old categories map to which new components?
[ ] Are all 8 captured in the 6? Or are some dropped?
[ ] If dropped, why? (document rationale)
[ ] Impact on existing /diagnostic + /roi pages?
[ ] Data migration needed? (existing user scenarios)
```

**Decision Needed (Pick One):**

**Option A: Replace** (Recommended)
- Deprecate 8-category model entirely
- Use only 6-component model
- Break existing /diagnostic + /roi (require refactoring)
- Pros: Cleaner, simpler, aligned with whitepaper
- Cons: Existing pages need updates
- Effort: 12-16 hours (refactor diagnostic + roi pages)

**Option B: Merge**
- Create hybrid model supporting both
- 8-category as "legacy," 6-component as "modern"
- Both calculators coexist (confusing to users)
- Pros: Backward compatible
- Cons: Maintenance burden, confusing UX
- Effort: 20-24 hours (dual code paths)

**Option C: Parallel**
- Keep 8-category for internal use
- Expose 6-component to customers
- Mapping layer between them
- Pros: No breaking changes
- Cons: Complex, technical debt
- Effort: 24-32 hours (mapping + tests)

**Timeline:** Decision by **Wednesday, Jan 24, 2026 EOD**

---

### P0.2: Task 2.0 Spike - Shader Feasibility (Not 1 Day, Needs 3 Days)

| Aspect | Status | Action Required |
|--------|--------|-----------------|
| **Current State** | 1-day spike listed (underestimated) | Actual: 3-day prototype needed |
| **Blocking** | Yes | Sprint 2 cannot start without GO/NO-GO |
| **Owner** | Visualist (B) + CTO | Prototype + performance profiler |
| **Timeline Impact** | CRITICAL | If failed: 1-week delay + fallback activation |
| **Effort** | 48 hours (3 days) | Raymarching (24h) + Particles (16h) + Integration (8h) |
| **Sign-Off** | Required | CTO approves prototype or contingency plan |

**What Needs Proving:**

1. **Raymarched Black Hole Sphere**
   - Compiles without warnings on all GLSL targets
   - Renders grayscale noise-driven distortion
   - Lensing effect visible but not photorealistic
   - Target: 60 FPS on iPhone 12 (16ms budget)
   - Estimated: 24 hours

2. **Particle System Prototype**
   - 5000 instanced cubes on Ultra tier (2500 High, 1000 Medium, 500 Low)
   - Form a loose grid
   - Accept Reynolds score input (0-1 range)
   - Morphing between flat → 3D states
   - Target: <100ms latency from input → visual update
   - Estimated: 16 hours

3. **Integration Test**
   - Black Hole state → Dissolve (3 sec animation) → Network state
   - Color temperature shift (Red → Blue)
   - Audio-reactive parameter updates
   - Reduced-motion fallback (no animation)
   - Tested on: Desktop, iPad, iPhone 12, Galaxy S21
   - Estimated: 8 hours

**Success Criteria:**
```
[ ] Raymarching compiles without warnings
[ ] 60 FPS sustained on target hardware (iPhone 12)
[ ] GPU memory <256MB on Ultra tier
[ ] Particle count scales intelligently per quality tier
[ ] Dissolve animation feels smooth (2-3 sec duration)
[ ] Audio sync <200ms latency
[ ] All device types tested (5+)
```

**Go/No-Go Decision:**
```
IF all success criteria met:
  → GO to Sprint 2 as planned (Week 7)
  
IF any criterion failed:
  → NO-GO: Activate fallback (see below)
     Timeline extends +1 week
     CTO + team approve contingency plan same day
```

**Fallback Contingency (If Spike Fails):**
```
Replace raymarching with:
- Simpler geometry morphing (cube → sphere, no raymarching)
- Flat particles (no instancing complexity)
- 2 quality tiers instead of 5 (Ultra, Low)
- Pre-baked textures instead of procedural

Effort: 16 hours (1 engineer, 2 days)
Timeline: +1 week (still launchable by April)
Message to stakeholders: "Visual hero simplified for performance"
```

**Timeline:** Spike starts **Last 3 Days of Sprint 1 (Week 6)**  
**Decision Point:** **Sprint 2 Kickoff (Week 7)**

---

### P0.3: Database/CMS Content Strategy Undefined

| Aspect | Status | Action Required |
|--------|--------|-----------------|
| **Current State** | Mentioned but not scoped | Task 3.6 says "finalize content" (no plan) |
| **Blocking** | Yes | Affects Sprint 2-3 timeline |
| **Owner** | Marketing Lead + DevOps | Strategy decision + implementation |
| **Timeline Impact** | MEDIUM | Static: 0 hrs, CMS: +20-40 hrs |
| **Effort** | 2 hours (decision) + 0-40 hours (implementation) | Depends on choice |
| **Sign-Off** | Required | CEO + DevOps approval |

**What Content Needs Hosting?**
```
[ ] Blog posts / guides
[ ] Case studies
[ ] Pricing tiers / comparison table
[ ] FAQ entries
[ ] Product updates
[ ] Legal docs (privacy, terms)
```

**Decision Needed (Pick One):**

**Option A: Static Markdown** (Recommended for launch)
- All content in `/content/**/*.md` files
- Deployed with code (no separate CMS)
- Fast: 0 setup time
- Limitation: No admin UI for non-technical users
- Effort: 0 hours
- Timeline: No impact
- Post-Launch: Can add CMS later

**Option B: Vendor CMS** (e.g., Sanity, Contentful, Strapi)
- Separate admin UI
- Non-technical marketing team can edit
- More flexible
- Setup time: 20-40 hours
- Monthly cost: $100-500 depending on vendor
- Timeline: +1-2 weeks (Sprint 2 impact)

**Option C: Hybrid** (Recommended for flexibility)
- Static markdown for launch (faster)
- CMS integration post-launch (easier to add)
- Best of both: Ship fast, add flexibility later
- Effort: 0 hours for launch
- Timeline: No impact

**Timeline:** Decision by **Friday, Jan 24, 2026**

---

### P0.4: No Rollback / Revert Strategy Defined

| Aspect | Status | Action Required |
|--------|--------|-----------------|
| **Current State** | Mentioned in 3.6 but no plan | "Rollback plan documented" (checklist item) |
| **Blocking** | Yes (for production readiness) | Cannot deploy without revert strategy |
| **Owner** | Gatekeeper (D) + DevOps | Strategy documentation + rehearsal |
| **Timeline Impact** | LOW (doesn't block sprints) | But critical for launch day |
| **Effort** | 4 hours (documentation) + 2 hours (rehearsal) | 6 hours total |
| **Sign-Off** | Required | Gatekeeper + DevOps approval |

**Template Needed:**

```markdown
# Rollback Plan for YardFlow Launch

## Pre-Deployment (Before Going Live)
- [ ] All Sprints 1-3 merged to main
- [ ] Staging environment ≥95% mirrors production
- [ ] Smoke test on staging: All critical paths work
- [ ] Team trained on rollback procedure
- [ ] Incident commander assigned
- [ ] Sentry + Vercel dashboards monitored
- [ ] Slack #ops channel on alert

## Deployment Process
- [ ] Branch: `release/yardflow-v1.0`
- [ ] Deploy to Vercel (auto-build + deploy)
- [ ] Wait for Vercel deployment status ✓
- [ ] Smoke test production (5 min)
- [ ] Monitor error rate (15 min post-deploy)

## If Deployment Succeeds (Error Rate <1%)
- [ ] Celebration ✓
- [ ] Stakeholder notification (all systems green)
- [ ] Begin 7-day monitoring period

## If Deployment Fails (Error Rate >5% or known issue)
- [ ] **DECISION POINT (Within 5 min):**
  - Gatekeeper + On-Call Engineer + DevOps discuss severity
  - Is it rollback-worthy? (Usually: YES for critical paths broken)
  - Is it fixable in <30 min? (Sometimes: YES for minor bug)

### ROLLBACK (Complete Revert)
```bash
# Get previous stable commit
git log --oneline | head -5
# (Find last known-good commit, e.g., abc1234)

# Revert to previous version
git revert HEAD  # Creates revert commit
# OR
git reset --hard abc1234 && git push --force

# Vercel auto-deploys the revert commit
# Expected time: 2-3 min

# Verify rollback worked:
- Error rate drops to <1%
- Homepage loads
- Key pages functional
```

### HOTFIX (Targeted Fix)
```bash
# Create hotfix branch
git checkout -b hotfix/critical-issue

# Make minimal fix (1-2 changes max)
git commit -m "hotfix: [brief description]"

# Test on staging
npm run build && npm run test

# Deploy hotfix
git push && create PR → merge → Vercel auto-deploys
```

## Rollback Success Criteria
- [ ] Homepage loads in <2s
- [ ] ROI calculator initializes
- [ ] Singularity page loads (even if shader degraded)
- [ ] Contact form submits
- [ ] No console 500 errors
- [ ] Sentry error rate <1%
- [ ] Google Analytics shows traffic (not spike)

## Post-Rollback Actions
1. [ ] War room: What went wrong?
2. [ ] Root cause identified and documented
3. [ ] Fix created and tested on staging
4. [ ] Retry deployment (with fix) the next day
5. [ ] Stakeholder communication sent
```

**Timeline:** Develop by **Sprint 3 Week 10** (before deployment)  
**Rehearsal:** **Staging deploy Day 1** (practice rollback)

---

## P1 CRITICAL ISSUES (Address Before Sprint 3)

### P1.1: Task 2.2 Acceptance Criteria Too Vague

**Current AC (Problematic):**
```
- [ ] Transition tested on 5+ device types
- [ ] Performance trace: GPU time < 16ms per frame
- [ ] No console warnings or shader compile errors
- [ ] Reduced-motion path: Static transition
- [ ] Screenshot progression captured
```

**Problem:** "Tested on 5+ device types" = what does that mean? Pass/fail criteria?

**Revised AC (Specific):**
```
- [ ] FPS Performance
    - [ ] Measured on iPhone 12: 60 FPS sustained (not dipping below 55)
    - [ ] Measured on MacBook Air: 60 FPS sustained
    - [ ] Measured on Galaxy S21: 50+ FPS sustained
    - [ ] GPU time measured with Chrome DevTools: <16ms per frame

- [ ] Device Coverage (Tested, Documented)
    - [ ] Desktop: Chrome, Firefox, Safari
    - [ ] Mobile: iOS Safari, Android Chrome
    - [ ] Tablet: iPad, Android tablet
    - [ ] Low-end: Older device (>3 years old)
    - [ ] Results: Screenshot + FPS trace for each

- [ ] Visual Regression
    - [ ] Black Hole state: Screenshot matches reference
    - [ ] Mid transition (50% progress): Screenshot matches reference
    - [ ] Network state: Screenshot matches reference
    - [ ] All 3 states visually approved by designer

- [ ] Audio Sync
    - [ ] Reynolds score input → Audio update latency: <200ms
    - [ ] Measured with performance profiler
    - [ ] Tested on: Chrome, Safari, mobile browser

- [ ] Reduced-Motion Path
    - [ ] `prefers-reduced-motion: reduce` detected
    - [ ] Animation duration: <500ms (instant dissolve)
    - [ ] User sees same end state, no animation
    - [ ] Tested with accessibility inspector

- [ ] Quality Tier Degradation
    - [ ] Ultra (5000 particles): FPS ≥55
    - [ ] High (2500 particles): FPS ≥55
    - [ ] Medium (1000 particles): FPS ≥55
    - [ ] Low (500 particles): FPS ≥50
    - [ ] Tier auto-selection works correctly
```

**Owner:** Visualist (B) + Gatekeeper (D)  
**Effort:** 4 hours (refine AC)  
**Timeline:** Before Sprint 2 Week 1

---

### P1.2: Task 3.1 (Homepage) Severely Underestimated (20h vs 80h)

**Current:** Lumped as single task in Sprint 3  
**Revised:** Break into 5 subtasks with clear ownership

| Subtask | Estimated Hours | Owner | Dependencies |
|---------|---|---|---|
| 3.1a: Wireframe + Content | 12 | Closer (E) | CEO approves copy (Task 1.2.5) |
| 3.1b: Section Components | 40 | Architect (C) | Wireframe locked (3.1a) |
| 3.1c: Scroll Animations | 16 | Visualist (B) | Components built (3.1b) |
| 3.1d: Copy Final + Images | 8 | Closer (E) | Components ready (3.1b) |
| 3.1e: QA + Testing | 8 | Gatekeeper (D) | All above completed |
| **TOTAL** | **84 hours** | Team | 5-week sprint (Weeks 7-11) |

**Key Dependency:** Task 1.2.5 (CEO Copy Review) must be done before 3.1a starts.

**Owner:** Architect (C) - coordination  
**Effort:** 4 hours (break down task)  
**Timeline:** Before Sprint 1 completion

---

### P1.3: Missing CEO Copy/Narrative Approval Gate (Task 1.2.5)

**Current State:** Copy is developed by Closer in Task 1.2, but no CEO review gate mentioned.  
**Risk:** Team ships 100+ hours of design work, CEO rejects messaging.

**New Task Required:**

```
### Task 1.2.5: CEO Narrative Approval Gate (NEW)
**Objective:** Lock copy before Sprint 2 visual design begins
**Owner:** Closer (E) + CEO
**Effort:** 12 hours (4h deck + 2h review + 6h revisions)
**Timeline:** Week 3 of Sprint 1 (end of Sprint 1)
**Depends On:** Task 1.2 (Homepage copy complete)
**Blocks:** Sprint 2 kickoff (can't start until copy approved)

**Deliverables:**
1. Copy deck (Figma or Google Doc)
   - 7 sections with full copy
   - All CTAs labeled (Primary/Secondary/Tertiary)
   - Claims with sources cited
   - Forbidden word check passed

2. Sign-off document (1 page)
   - CEO signature
   - Approval date
   - List of approved sections (no changes permitted)

3. Frozen spec document
   - Copy finalized
   - Changes after this point = post-launch sprint
   - Gatekeeper enforces freeze

**AC:**
- [ ] Deck created and shared 48h before review
- [ ] CEO review meeting scheduled (2 hours)
- [ ] All sections reviewed and approved
- [ ] Sign-off document signed (email OK)
- [ ] No major changes permitted after approval
- [ ] Gatekeeper notified of approved copy (for contract tests)

**If Copy Rejected:**
- Task repeats with revisions
- Timeline slip: +1 week (copy rework + re-review)
- No design work starts until approved
```

**Owner:** Closer (E)  
**Effort:** 12 hours  
**Timeline:** Week 3 of Sprint 1  
**Impact:** Prevents mid-sprint narrative pivots

---

### P1.4: /roi Repurposing Feels Tacked-On

**Current State (Task 3.3):** Add intro + CTAs to /roi. Existing formulas unchanged.  
**Risk:** Two calculators (singularity + roi) confuse users. No clear differentiation.

**Question for CEO:** 
- Are /roi and /singularity complementary? (ROI upside vs Variance downside)
- Or is /roi deprecated in favor of /singularity?

**Required Decision:**

**Option A: Complementary**
```
Position them as two sides of the business case:
- /singularity: "Variance Tax" (cost of inaction)
- /roi: "ROI Model" (upside of standardization)

Update:
- /singularity intro: "See what you're losing (Variance Tax)"
  CTA: "Now see what you can gain" → /roi
- /roi intro: "See what you can gain (ROI)"
  CTA: "First understand the risk" → /singularity
- Homepage: Link to /singularity first, mention /roi as complement

Effort: 8 hours (copy + CTAs + navigation updates)
```

**Option B: Replacement**
```
Deprecate /roi in favor of /singularity:
- Single calculation center (less confusing)
- /roi becomes redirect to /singularity
- Simpler narrative ("Here's your number")

Update:
- Remove /roi from navigation
- Remove /roi from homepage
- Create /roi → /singularity redirect
- Message to existing /roi users (if any)

Effort: 4 hours (redirect + cleanup)
Timeline: No impact
Risk: Lower if users never used /roi
```

**Decision Needed:** A or B?  
**Owner:** CEO  
**Effort:** 1 hour (decision) + 4-8 hours (implementation)  
**Timeline:** By Sprint 3 Week 1

---

## P2 NICE-TO-HAVE (Post-Launch)

| Gap | Effort | Impact | Timeline |
|-----|--------|--------|----------|
| Detailed budget spreadsheet (FCP/LCP/CLS all budgets tracked) | 4 hours | Medium | Sprint 3 |
| Acceptance testing script (UAT step-by-step checklist) | 4 hours | Medium | Sprint 2 |
| Monitoring dashboard (Grafana or DataDog) | 8 hours | Medium | Post-launch |
| Per-environment deployment guide | 4 hours | Low | Sprint 3 |
| Stakeholder communication schedule | 2 hours | Low | Sprint 0 |
| Feature flag strategy (for partial rollback) | 6 hours | High | Post-launch |

---

## DEPENDENCY MATRIX

```
Pre-Sprint 0 Decisions (BLOCKING)
  ├─ P0.1: Model reconciliation (8→6)
  ├─ P0.2: Shader spike approval
  ├─ P0.3: Content strategy
  └─ P0.4: Rollback plan

Sprint 0 (Infrastructure)
  └─ Task 0.9: Implement model decision

Sprint 1 (Economics)
  ├─ Task 1.1-1.8: Formulas (depends on 0.9)
  ├─ Task 1.2: Copy writing
  ├─ Task 1.2.5: CEO review (NEW, BLOCKING)
  ├─ Task 1.99: Shader spike (NEW, last 3 days)
  └─ [Gate: Copy approved before Sprint 2]

Sprint 2 (Visuals)
  ├─ Task 2.0: Raymarching spike (depends on 1.99 approval)
  ├─ Tasks 2.1-2.13: Shaders + components
  └─ [Refined AC for 2.2-2.4]

Sprint 3 (Integration)
  ├─ Task 3.0: Audit
  ├─ Task 3.1a-3.1e: Homepage (5 subtasks, depends on 1.2.5)
  ├─ Task 3.2: /singularity binding
  ├─ Task 3.3: /roi repurposing (pending CEO decision)
  ├─ Task 3.4: Accessibility
  ├─ Task 3.5: Performance gate
  └─ Task 3.6: Deployment (depends on P0.4 rollback plan)
```

---

## SIGN-OFF CHECKLIST

**For Engineering Team to Confirm:**

- [ ] All P0 blockers understood and assigned owners
- [ ] P1 issues acknowledged (will address before Sprint 3)
- [ ] P2 items noted (defer post-launch)
- [ ] Dependency matrix clear (no surprises)
- [ ] New tasks (1.2.5, 1.99, 3.1a-e) added to sprint plans
- [ ] Effort estimates for new tasks incorporated
- [ ] Timeline adjusted to 14-15 weeks (instead of 10)
- [ ] Gatekeeper to track P0/P1 status in weekly risk review

**For Executive Team to Confirm:**

- [ ] P0 decisions delegated to owners (CEO/CTO/Marketing)
- [ ] Timeline commitment: Q2 2026 (April)
- [ ] Budget approval: ~500 hours, 5-person team
- [ ] Risk mitigation strategy endorsed
- [ ] Copy approval authority assigned (CEO)

---

**Prepared by:** Architecture Review Team  
**Status:** Ready for Team Kickoff (pending P0 decisions)  
**Next Checkpoint:** Pre-Sprint 0 decision meeting (this week)
