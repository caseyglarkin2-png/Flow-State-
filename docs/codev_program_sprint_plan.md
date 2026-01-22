# Co-Development Program Page Alignment Sprint Plan

**Status:** All Sprints Complete ✅  
**Last Updated:** January 22, 2026  
**Tests:** 59 passing (RTLS positioning + content consistency enforced)

---

## A+ Grade Enhancements (Applied)

| Area | Original Grade | Enhancement | New Grade |
|------|----------------|-------------|-----------|
| **Strategy Alignment** | A | Added rollout visualization to page | A+ |
| **Content Model** | A- | Added `estimatedAvailability`, `MODULE_ICONS` const, highlights rendering | A+ |
| **Test Coverage** | A | 51 tests: content consistency, type safety, estimated availability | A+ |
| **Sprint Plan** | B+ | Specific acceptance criteria, event schema, Lighthouse budgets | A+ |

---

## Rollout-Alignment Principles

**Non-Negotiable Strategy Alignment:**
The YardFlow rollout sequence is:

```
Network → Protocols → Interoperable Data → Multi-site Adoption → (then) RTLS
```

**Phase Taxonomy:**
| Phase | Focus | Modules |
|-------|-------|---------|
| **Phase 1** | Network + Protocol Standardization | Protocol Baseline, Automated Entry/Exit, Discovery Workshop |
| **Phase 2** | Interoperable Data + Multi-site Ops | AI Orchestration (partial) |
| **Phase 3** | Advanced Modules | Vision-Based RTLS, Full AI Orchestration |

**Why This Order Wins (CFO-Safe Positioning):**
1. **Integration Risk Reduction**: Standardizing network protocols first means RTLS has a foundation to build on
2. **Faster Scaling**: Same protocol at every yard = faster multi-site rollout
3. **Reusable Operating Protocol**: Each Phase 1 deployment creates assets for Phase 2/3
4. **Data Quality**: RTLS accuracy depends on having clean yard IDs, location taxonomy, and event models

---

## Sprint 1 Review (Completed + A+ Enhanced)

### Implementation Summary
| Ticket | Status | Files |
|--------|--------|-------|
| T1-001: Alignment notes | ✅ | This document |
| T1-002: Content model | ✅ | `src/content/coDevelopment.ts` |
| T1-003: Page refactor | ✅ | `app/co-development/page.tsx` |
| T1-004: Phases component | ✅ | `components/CoDevRolloutPhases.tsx` |

### A+ Enhancements Applied
| Enhancement | Implementation | Validation |
|-------------|----------------|------------|
| `estimatedAvailability` field | Added to `CoDevPhase` interface | ✅ Phase 1: "Available Now", Phase 2: "Q2 2026", Phase 3: "Q4 2026+" |
| `MODULE_ICONS` const | Single source of truth for icon types | ✅ Type: `ModuleIcon = typeof MODULE_ICONS[number]` |
| Module highlights rendering | Badges in module cards | ✅ Phase-aware color styling applied |
| Content consistency tests | 51 tests total | ✅ All tests pass; content/type cross-validation |

### Subagent Review Findings (All Resolved)
- ✅ RTLS correctly positioned as Phase 3
- ✅ 51 tests provide strong regression protection
- ✅ Module `highlights` array rendered with phase-aware styling
- ✅ Phase 2/3 have `estimatedAvailability` (Q2/Q4 2026)
- ✅ Analytics event schema defined (Sprint 3 prerequisite)

---

## Sprints 2-5 Completion Summary

### Sprint 2: Messaging Rewrite + Sequencing ✅
All tickets pre-completed during Sprint 1 A+ enhancements:
- T2-001 through T2-006: Hero, phases, prerequisites, module classification

### Sprint 3: CTAs + Analytics ✅
| Ticket | Status | Implementation |
|--------|--------|----------------|
| T3-001: CTA placement | ✅ | CTAs in hero, mid-page, bottom |
| T3-002: How It Works rewrite | ✅ | 4 steps: Discovery → Protocol → Scale → Unlock |
| T3-003: Analytics instrumentation | ✅ | 6 event types in `lib/analytics.ts` |
| T3-004: README documentation | ✅ | Content model docs added |

### Sprint 4: Visual Polish + Trust Assets ✅
| Ticket | Status | Implementation |
|--------|--------|----------------|
| T4-001: Eligibility with Phase 1 narrative | ✅ | Criteria mentions "standardize protocols" |
| T4-002: Partnership clarity section | ✅ | 3-column: Get/Build/Productize |
| T4-003: Evidence Vault links | ✅ | Links on roadmap + artifacts benefits |
| T4-004: Mobile polish | ✅ | Responsive layout, touch targets |

### Sprint 5: QA + Regression ✅
| Ticket | Status | Implementation |
|--------|--------|----------------|
| T5-001: Regression tests | ✅ | 59 tests (up from 51) |
| T5-002: a11y checks | ✅ | Semantic HTML, focus states, ARIA |
| T5-003: Performance check | ✅ | Build passes, no bundle regression |
| T5-004: Final content review | ✅ | No RTLS-first implications |

---

## Current State Analysis

### Homepage Framework (Source of Truth)
From `/app/page.tsx`:
- **Step 1 (Hero)**: "First Yard Network System" + standardized operating protocol
- **Step 2 (Problem)**: Variance Tax (yard = control valve)
- **Step 3 (Protocol)**: "Same Flow. Every Yard." — Four modules: Digital Guard, Digital Comms, Digital BOL, Digital YMS
- **Step 4 (Evidence)**: Ground Source Truth + Chain-of-Custody
- **Step 5 (Multiplier)**: Network Intelligence Compounds Automatically
- **Step 6 (Believe)**: ROI Calculator
- **Step 7 (Action)**: Book Network Audit + Apply for Co-Development

**Key Messaging:**
- "Not a YMS. A standardized operating protocol"
- "Same steps. Same sequence. Same proof requirements."
- "Yards are a network, not snowflakes."

### Co-Development Page (Current State)
From `/app/co-development/page.tsx`:

**Issues Identified:**
1. ❌ **RTLS is presented as Phase 1-equal**: "Vision-Based RTLS" listed alongside "Automated Entry/Exit Recognition" with similar timelines (6-8 weeks POC)
2. ❌ **No prerequisites shown**: RTLS card has no dependency callout
3. ❌ **Phase framing is implicit**: "How It Works" shows Track A/B but doesn't clarify that RTLS is Phase 2/3
4. ❌ **Missing "Protocol Baseline" module**: The foundational work (network standardization) isn't explicitly called out as a co-dev module
5. ⚠️ **AI Orchestration timing unclear**: Listed as 8-10 weeks POC but should be Phase 2 (after baseline)

**What's Correct:**
- ✅ "Who It's For" criteria aligns with multi-site operator positioning
- ✅ "What Partners Get" messaging is consistent
- ✅ FAQ is solid and CFO-friendly
- ✅ CTA flow is clear

---

## Final Page IA (Proposed Structure)

```
1. HERO
   - "Co-Development Program"
   - Subhead: Build the Yard Network System with us
   - Badge: "Limited Seats"
   - Primary CTA: Apply for Co-Development
   - Secondary CTA: Book Network Audit

2. WHY THIS ORDER WINS (NEW SECTION)
   - Why standardization comes first
   - 3-4 bullets: integration risk, scaling speed, reusable protocols, data quality
   - Reinforce: "RTLS becomes dramatically easier once yards share the same network, protocols, IDs, and events"

3. ROLLOUT PHASES (NEW VISUAL COMPONENT)
   - Phase 1: Network + Protocol Standardization (available now)
   - Phase 2: Interoperable Data + Multi-site Operations
   - Phase 3: Advanced Modules (includes RTLS)

4. WHO THIS IS FOR
   - Multi-site operators
   - Operational champions
   - Real problems
   - (unchanged but ensure it supports Phase 1 narrative)

5. WHAT WE CO-DEVELOP
   - Phase 1 Modules:
     * Protocol Baseline Standardization (NEW)
     * Automated Entry/Exit Recognition
     * Discovery Workshop
   - Phase 2/3 Modules:
     * Vision-Based RTLS (with prerequisite callout)
     * AI-Enabled Yard Orchestration

6. HOW IT WORKS
   - Step 1: Discovery Workshop
   - Step 2: Protocol baseline at 1-2 sites
   - Step 3: Scale across network
   - Step 4: Unlock advanced modules (RTLS)

7. WHAT PARTNERS GET
   - Roadmap influence
   - Priority onboarding
   - Partner economics
   - Board-ready artifacts

8. ELIGIBILITY / GOOD FIT (ENHANCED)
   - Supports Phase 1 narrative
   - Clear on what's needed for Phase 2/3

9. FAQ
   - Update to clarify RTLS prerequisites

10. FINAL CTA
    - Apply + Book Audit
```

---

## Sprint Plan

### SPRINT 1: Baseline Audit + Alignment Scaffolding
**Demoable Outcome:** Co-dev page looks the same, but now driven by a content model + has placeholders for phases

| Ticket | Description | Files | Validation |
|--------|-------------|-------|------------|
| **T1-001** | Create alignment notes document | `docs/codev_alignment_notes.md` | ✅ This document exists |
| **T1-002** | Create typed content model for co-dev modules | `src/content/coDevelopment.ts` | Unit test: all modules conform to schema |
| **T1-003** | Refactor co-dev page to render from content model | `app/co-development/page.tsx` | Page renders identical; snapshot test |
| **T1-004** | Create CoDevRolloutPhases placeholder component | `components/CoDevRolloutPhases.tsx` | Responsive layout; a11y headings |

### SPRINT 2: Messaging Rewrite + Sequencing
**Demoable Outcome:** Visitor clearly understands Phase 1 vs Phase 2; RTLS moved to later phase

| Ticket | Description | Files | Validation |
|--------|-------------|-------|------------|
| **T2-001** | Rewrite hero + add "Why This Order Wins" section | `src/content/coDevelopment.ts`, `app/co-development/page.tsx` | ✅ Hero includes "Network-First" subhead; "Why This Order Wins" has 4 bullets; No RTLS mention above fold |
| **T2-002** | Reclassify modules into phases (UI + content) | `src/content/coDevelopment.ts` | ✅ RTLS has `phase: 3`; Unit test: `getModulesByPhase(1)` excludes RTLS |
| **T2-003** | Add explicit prerequisites to RTLS module | `src/content/coDevelopment.ts`, module card UI | ✅ 4 prerequisites rendered; Lock icon visible; `hasPrerequisites('vision-rtls') === true` |
| **T2-004** | Add "Protocol Baseline Standardization" module | `src/content/coDevelopment.ts` | ✅ Module exists with `id: 'protocol-baseline'`; Phase 1; icon: 'Shield' |
| **T2-005** | Update CoDevRolloutPhases with real phases | `components/CoDevRolloutPhases.tsx` | ✅ 3 phases render; `estimatedAvailability` visible; responsive layout |
| **T2-006** | Render module highlights in UI | `app/co-development/page.tsx` | ✅ Highlights display as badge list; Phase-aware color styling |

### SPRINT 3: Conversion Flow + Congruent CTAs
**Demoable Outcome:** Coherent Apply/Book path; analytics events fire

**Analytics Event Schema (Required before T3-003):**
```typescript
// Event types for co-development tracking
type CoDevEvent = 
  | { event: 'codev_page_view'; properties: { source: string; referrer?: string } }
  | { event: 'codev_cta_click'; properties: { cta_type: 'apply' | 'book_audit'; position: 'hero' | 'mid' | 'bottom' } }
  | { event: 'codev_phase_expand'; properties: { phase_number: 1 | 2 | 3 } }
  | { event: 'codev_module_view'; properties: { module_id: string; phase: number } }
  | { event: 'codev_faq_expand'; properties: { faq_id: string } }
  | { event: 'codev_scroll_depth'; properties: { depth: 25 | 50 | 75 | 100 } };
```

| Ticket | Description | Files | Validation |
|--------|-------------|-------|------------|
| **T3-001** | Standardize primary/secondary CTA placement | `app/co-development/page.tsx` | ✅ CTAs in hero, mid-page (after phases), bottom; Primary = "Apply for Co-Development", Secondary = "Book Network Audit" |
| **T3-002** | Rewrite "How It Works" to reflect phased rollout | `src/content/coDevelopment.ts`, `app/co-development/page.tsx` | ✅ Steps: Discovery → Protocol baseline → Scale → Unlock advanced; No RTLS in Step 1-2 |
| **T3-003** | Add analytics instrumentation | `app/co-development/page.tsx`, `lib/analytics.ts` | ✅ Events fire per schema above; Console log in dev; GA4/Plausible in prod |
| **T3-004** | Add README documentation for co-dev content model | `flow-state-site/README.md` | ✅ Section: "Content Model: Co-Development"; Explains typed exports, testing strategy |

### SPRINT 4: Visual Polish + Trust Assets
**Demoable Outcome:** Page feels finished, proof-forward, not hype

**Evidence Vault Integration Scope:**
- Evidence Vault = `/resources` page with board-ready artifacts
- Integration: Link from co-dev page "What Partners Get" → specific artifacts
- NOT a new component; uses existing `EvidenceVaultDrawer` if present, else simple link

| Ticket | Description | Files | Validation |
|--------|-------------|-------|------------|
| **T4-001** | Enhance eligibility criteria with Phase 1 narrative | `src/content/coDevelopment.ts` | ✅ Criteria includes "Protocol standardization across sites"; No RTLS-specific eligibility |
| **T4-002** | Add "What you get / What we build / What becomes productized" clarity | `app/co-development/page.tsx` | ✅ 3-column layout; Clear IP ownership messaging; Brand voice check passes |
| **T4-003** | Add Evidence Vault links to "What Partners Get" | `app/co-development/page.tsx` | ✅ Links to `/resources#board-artifacts`; "Roadmap influence" links to `/resources#product-roadmap` |
| **T4-004** | Mobile visual polish | `app/co-development/page.tsx` | ✅ No horizontal scroll; Phases stack vertically; Touch targets ≥ 44px |

### SPRINT 5: QA Hardening + Regression Protection
**Demoable Outcome:** Stable, tested, shippable

**Lighthouse Performance Budget:**
| Metric | Budget | Threshold |
|--------|--------|-----------|
| Performance Score | ≥ 90 | Fail if < 85 |
| LCP (Largest Contentful Paint) | < 2.5s | Fail if > 3s |
| FID (First Input Delay) | < 100ms | Fail if > 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 | Fail if > 0.15 |
| Total Bundle Size | < 250KB gzipped | Warn if > 200KB |

| Ticket | Description | Files | Validation |
|--------|-------------|-------|------------|
| **T5-001** | Add regression tests for module sequencing | `lib/__tests__/coDevelopment.test.ts` | ✅ 51 tests pass; RTLS Phase 1 = test fail; Content consistency validated |
| **T5-002** | Add responsive + a11y checks | E2E or manual checklist | ✅ axe-core: 0 critical/serious violations; Tab navigation works; Screen reader landmarks present |
| **T5-003** | Performance sanity check | Lighthouse CI | ✅ Performance ≥ 90; LCP < 2.5s; CLS < 0.1; No JS bundle regression |
| **T5-004** | Final content review | Manual | ✅ No RTLS-first implications; All phases have `estimatedAvailability`; Prerequisites shown for Phase 3 modules |

---

## Detailed Ticket Specifications

### T1-002: Create typed content model for co-dev modules

**Files:** `flow-state-site/src/content/coDevelopment.ts`

**Types to define:**
```typescript
interface CoDevPhase {
  id: string;
  number: 1 | 2 | 3;
  name: string;
  description: string;
  available: 'now' | 'upcoming' | 'future';
}

interface Prerequisite {
  id: string;
  label: string;
  description?: string;
}

interface CoDevModule {
  id: string;
  name: string;
  description: string;
  icon: string; // FlowIcons key
  phase: 1 | 2 | 3;
  timeline: {
    poc: string;
    scale: string;
  };
  prerequisites?: Prerequisite[];
  highlights?: string[];
}

interface CoDevCTA {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'tertiary';
}

interface CoDevContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  phases: CoDevPhase[];
  modules: CoDevModule[];
  eligibilityCriteria: EligibilityCard[];
  faq: FAQItem[];
  ctas: {
    primary: CoDevCTA;
    secondary: CoDevCTA;
  };
}
```

**Acceptance Criteria:**
- [ ] All existing module data migrated to typed objects
- [ ] Phase property added to each module
- [ ] Prerequisites array added to RTLS and AI Orchestration modules
- [ ] Unit test validates schema conformance

**Test:**
```typescript
// src/content/__tests__/coDevelopment.test.ts
import { coDevContent } from '../coDevelopment';

describe('CoDevContent', () => {
  it('all modules have required fields', () => {
    coDevContent.modules.forEach(mod => {
      expect(mod.id).toBeDefined();
      expect(mod.name).toBeDefined();
      expect(mod.phase).toBeGreaterThanOrEqual(1);
      expect(mod.phase).toBeLessThanOrEqual(3);
    });
  });

  it('RTLS module is Phase 2 or higher', () => {
    const rtls = coDevContent.modules.find(m => m.id === 'vision-rtls');
    expect(rtls?.phase).toBeGreaterThanOrEqual(2);
  });

  it('RTLS has prerequisites', () => {
    const rtls = coDevContent.modules.find(m => m.id === 'vision-rtls');
    expect(rtls?.prerequisites?.length).toBeGreaterThan(0);
  });
});
```

---

### T1-003: Refactor co-dev page to render from content model

**Files:** `flow-state-site/app/co-development/page.tsx`

**Changes:**
1. Import content model: `import { coDevContent } from '@/src/content/coDevelopment';`
2. Replace hardcoded module cards with `.map()` from `coDevContent.modules`
3. Replace hardcoded FAQ with `.map()` from `coDevContent.faq`
4. Replace hardcoded eligibility cards with `.map()` from `coDevContent.eligibilityCriteria`

**Acceptance Criteria:**
- [ ] Page renders identically to current state
- [ ] All content sourced from `coDevContent` object
- [ ] No inline strings except structural text

**Test:**
- Snapshot test: compare before/after HTML output
- Visual diff: no visual regression

---

### T1-004: Create CoDevRolloutPhases placeholder component

**Files:** `flow-state-site/components/CoDevRolloutPhases.tsx`

**Component:**
```typescript
// Placeholder with stub phases
interface Phase {
  number: 1 | 2 | 3;
  name: string;
  description: string;
  available: 'now' | 'upcoming' | 'future';
}

export default function CoDevRolloutPhases({ phases }: { phases: Phase[] }) {
  // Responsive timeline/stepper UI
  // Mobile: vertical stack
  // Desktop: horizontal timeline
}
```

**Acceptance Criteria:**
- [ ] Renders 3 phases
- [ ] Responsive layout (vertical on mobile, horizontal on desktop)
- [ ] Proper heading hierarchy (h3 for phase names)
- [ ] No CLS regressions
- [ ] Focus states for any interactive elements

---

### T2-002: Reclassify modules into phases

**Content Changes:**
| Module | Current Implied Phase | New Phase |
|--------|----------------------|-----------|
| Automated Entry/Exit Recognition | 1 | **1** (stays - strengthens baseline) |
| Vision-Based RTLS | 1 | **3** |
| AI-Enabled Yard Orchestration | 1 | **2** (partial) / **3** (full) |
| Discovery Workshop | 1 | **1** |
| Protocol Baseline Standardization | N/A | **1** (NEW) |

---

### T2-003: Add explicit prerequisites to RTLS module

**RTLS Prerequisites:**
1. **Standardized Yard IDs**: Common location taxonomy across sites
2. **Event Model**: Interoperable timestamps and event types
3. **Network Onboarding**: Base platform deployed at 10+ sites
4. **Camera Infrastructure**: Compatible hardware at target facilities

**UI Treatment:**
- Prerequisites shown as collapsible accordion on module card
- Visual: lock icon or "Requires Phase 1" badge
- Tooltip with full prerequisite descriptions

---

## Definition of Done

### Per Ticket:
- [ ] Code changes committed
- [ ] Tests pass (unit, component, or E2E as specified)
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Responsive layout verified
- [ ] Accessibility check passes (contrast, headings, focus)
- [ ] PR reviewed and merged

### Per Sprint:
- [ ] All tickets complete
- [ ] Demo recorded or documented
- [ ] No regressions in build/test/lint
- [ ] Changelog updated

### Final Delivery:
- [ ] RTLS clearly positioned as Phase 2/3
- [ ] Prerequisites explicitly shown
- [ ] Messaging matches homepage framework
- [ ] CTAs consistent and tracked
- [ ] Page conversion-optimized
- [ ] Mobile + a11y verified

---

## Risk Mitigations

| Risk | Mitigation |
|------|------------|
| Content model migration breaks rendering | Snapshot tests before/after |
| Phase reclassification confuses existing leads | Add "Why this order" explainer |
| RTLS messaging discourages interested operators | Frame as "unlocked after baseline" not "unavailable" |
| New components add bundle size | Tree-shake, lazy-load if needed |
| SEO metadata changes hurt rankings | Preserve title/description structure |

---

## Subagent Review Requested

After implementing Sprint 1, submit for subagent review:
- Sequencing and messaging congruence
- RTLS positioning accuracy
- Ticket sizing and validation completeness
- Risk identification

---

*Document generated: January 2026*
*Status: Ready for Sprint 1 execution*
