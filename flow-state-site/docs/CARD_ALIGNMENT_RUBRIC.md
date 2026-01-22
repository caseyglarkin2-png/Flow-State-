# Card Alignment Rubric: Visual Matching Criteria

**Created:** January 21, 2026  
**Sprint:** S0  
**Task:** T0-004 Define Card Alignment Criteria  
**Status:** ✅ Complete

---

## Purpose

This rubric defines what it means for a homepage module card to "match" its destination page aesthetic. It prevents scope creep (pixel-perfect = impossible) while ensuring visual coherence (cards should evoke their destinations).

---

## Visual Hierarchy Levels

### **Level 1: CRITICAL (Must Have)**
**Description:** Without these elements, the card fails to communicate which destination it previews.

**Criteria:**
- ✅ Color palette matches (primary color + background treatment)
- ✅ Key visual element is recognizable (icon, graph, or dominant shape)
- ✅ Typography weight/style signals the destination tone (professional vs. experimental)

**Examples:**
- **ROI Card:** Blue calculator grid on dark background = ✅ PASS (clearly a finance tool)
- **Singularity Card (current):** Generic network diagram = ❌ FAIL (could be any network-related page)
- **Product Card:** 4-module icons in neon = ✅ PASS (matches product page's 4-module layout)

---

### **Level 2: HIGH (Should Have)**
**Description:** These elements significantly improve the preview experience but aren't dealbreakers if missing.

**Criteria:**
- ✅ Icon/graphic style is consistent with destination (line vs. filled, monochrome vs. colorful)
- ✅ Layout pattern echoes destination (grid vs. timeline vs. centered hero)
- ✅ Interactive hint present if destination is interactive (slight glow, hover prompt, or label)

**Examples:**
- **Singularity Card:** Animated particle pulse + "Variance Tax Protocol" label = ✅ GOOD (signals interactive + topic)
- **ROI Card:** Static grid + "Board Ready" label = ✅ GOOD (clear topic + tone)
- **Singularity Card (current):** Static network, no label = ⚠️ MEDIOCRE (topic unclear)

---

### **Level 3: MEDIUM (Nice to Have)**
**Description:** Aesthetic polish that elevates the preview without functional impact.

**Criteria:**
- ✅ Subtle animation on hover (reveal effect, pulse, glow intensification)
- ✅ Typography style matches destination tone (monospace for Singularity, headline bold for Product)
- ✅ Spacing/padding reflects destination's visual rhythm

**Examples:**
- **Premium:** Singularity card + particle animation on hover
- **Standard:** Static card with hover scale effect

---

### **Level 4: Nice-to-Have (Optional)**
**Description:** High-effort polish with minimal user impact.

**Criteria:**
- ✅ Responsive breakpoint adaptations (layout shift on mobile)
- ✅ Accessibility enhancements (ARIA labels for icon meanings)
- ✅ Dark mode / light mode variants (if brand supports both)

**Examples:**
- Singularity card shows fewer particles on mobile (performance)
- ROI calculator grid becomes single column on mobile (readability)

---

## Card-by-Card Alignment Criteria

### **Singularity Card**

**Destination:** `/singularity` - Physics-based variance tax visualization

**Critical Level (MUST HAVE):**
- [ ] Background: Dark gradient (void → carbon) matching destination
- [ ] Primary visual: Ordered particle/node network pattern (32-node grid recommended)
- [ ] Color: Neon (#00B4FF) nodes/edges on dark background
- [ ] Label: "Variance Tax Protocol" or "Singularity" heading
- [ ] Typography: Bold headline + smaller supporting text
- [ ] Size: Minimum 280px width, 200px height (aspect ratio TBD)

**High Level (SHOULD HAVE):**
- [ ] Subtle visual change on hover (glow intensity increase, opacity shift)
- [ ] Optional Reynolds number badge ("Re* = 0.XX")
- [ ] Icon: Prism or similar to signify physics/optics concept
- [ ] Monochrome neon style matching destination (not colorful)

**Medium Level (NICE TO HAVE):**
- [ ] Gentle particle animation (pulse, float) on hover
- [ ] Responsive grid that adjusts node count for mobile (fewer nodes = smaller file)
- [ ] Clickable area clearly signified (border glow on hover)

**Medium Level (OPTIONAL):**
- [ ] Tooltip on hover: "Interactive variance tax visualization"
- [ ] Loading skeleton while destination page loads

**Validation Success Criteria:**
```
✅ PASS if:
- User sees card
- User thinks: "That looks like an interactive physics simulation"
- User clicks → arrives at /singularity with similar visual treatment
- No visual jarring (color/typography shift is minor)

❌ FAIL if:
- User can't tell what the card previews
- User confused by mismatch (generic network ≠ physics simulation)
- Color/typography completely different from destination
```

**Bundle Size Target:** <50KB (including all SVG/CSS for card)
**Complexity Rating:** HIGH (physics simulation preview is complex)

---

### **ROI Card**

**Destination:** `/roi` - Board-ready ROI calculator

**Critical Level (MUST HAVE):**
- [x] Background: Dark (void) with minimal gradient
- [x] Primary visual: Calculator grid pattern (cells/rows/columns)
- [x] Color: Neon accents on dark background
- [x] Label: "ROI Calculator" or "Board Ready" heading
- [x] Typography: Professional bold headline + supporting text
- [x] Size: Matches other module cards (same dimensions)

**High Level (SHOULD HAVE):**
- [x] Grid appearance (visibly structured, spreadsheet-like)
- [x] Professional tone (no playful animations, clean layout)
- [x] "Board Ready" or export icon hint (paper/download symbol)
- [x] Color coding optional (green success highlight acceptable)

**Medium Level (NICE TO HAVE):**
- [ ] Hover effect: subtle lift or shadow increase
- [ ] Responsive: Single column on mobile (vs. grid)
- [ ] Tooltip: "Run financial projections"

**Validation Success Criteria:**
```
✅ PASS if:
- User sees calculator-like interface
- Professional tone aligns with destination
- "Board Ready" positioning is clear
- User trusts this is a financial tool

❌ FAIL if:
- Visual doesn't suggest "calculator"
- Tone is playful/casual (undermines credibility)
- Misalignment with actual ROI page design
```

**Bundle Size Target:** <30KB
**Complexity Rating:** MEDIUM

**Current Status:** ✅ ALREADY GOOD (existing card passes all criteria)

---

### **Product Card**

**Destination:** `/product` - 4-module product overview

**Critical Level (MUST HAVE):**
- [ ] Primary visual: 4 module icons (Guard, Comms, BOL, YMS)
- [ ] Color: Neon variants (blue shades) matching destination
- [ ] Label: "4 Core Modules" or "Product" heading
- [ ] Typography: Bold headline + concise description
- [ ] Layout: Grid or inline arrangement suggesting 4 equal components

**High Level (SHOULD HAVE):**
- [ ] Icons consistent with destination page icons
- [ ] Monochrome neon style (not filled/colorful)
- [ ] Spacing suggests "balanced quartet" composition
- [ ] Optional: Module name labels below icons

**Medium Level (NICE TO HAVE):**
- [ ] Subtle stagger animation on module reveal (on hover or load)
- [ ] Hover effect per module (highlight one module, dim others)
- [ ] Responsive: 2×2 grid on desktop, 2×2 stack on mobile

**Validation Success Criteria:**
```
✅ PASS if:
- User immediately sees "4 modules"
- Icons match product page icons
- Composition suggests "integrated ecosystem"
- User thinks: "I want to explore these modules"

❌ FAIL if:
- Less than 4 elements visible
- Icons don't match destination
- Layout suggests hierarchy (one dominant module) when page shows equality
```

**Bundle Size Target:** <30KB
**Complexity Rating:** LOW

---

### **Network Effect Card** (If Shown on Homepage)

**Destination:** `/network-effect` - Exponential value from network density

**Critical Level (MUST HAVE):**
- [ ] Primary visual: Exponential curve (hockey stick shape)
- [ ] Color: Neon line on dark background
- [ ] Label: "Network Effect" or "Scaling Value" heading
- [ ] Typography: Bold + supporting text
- [ ] Chart appearance: Recognizable as graph/chart

**High Level (SHOULD HAVE):**
- [ ] Upward trajectory is clear (no ambiguity about value increasing)
- [ ] X/Y axis labels subtle but present (e.g., "Facilities" vs. "Value")
- [ ] Monochrome neon style (not colorful)
- [ ] Optional: Green accent for "growth" (emerald color acceptable)

**Medium Level (NICE TO HAVE):**
- [ ] Hover effect: tooltip showing example values
- [ ] Responsive: Aspect ratio maintained on mobile
- [ ] Animation: Subtle curve draw on load (path animation)

**Validation Success Criteria:**
```
✅ PASS if:
- User sees exponential curve
- Curve clearly goes upward
- User understands "value compounds with more facilities"
- Matches destination graph style

❌ FAIL if:
- Chart is ambiguous (could be any metric)
- Downward or flat curve (wrong meaning)
- Color/style doesn't match destination
```

**Bundle Size Target:** <25KB
**Complexity Rating:** MEDIUM

---

## Scoring Matrix

### **Per-Card Assessment**

**Singularity Card Example:**
```
Level 1 Critical:     3/5 ✅ (missing badge, has pattern, color OK)
Level 2 High:         2/4 ⚠️ (animation TBD, needs label)
Level 3 Medium:       0/3 ❌ (no hover effect yet)
Level 4 Optional:     0/3

Overall Score: 5/15 = 33% → NEEDS WORK

Recommendation: Implement particle grid + label + badge (critical path)
Then add hover animation (high priority)
```

**ROI Card Example:**
```
Level 1 Critical:     5/5 ✅ (all present)
Level 2 High:         4/4 ✅ (all present)
Level 3 Medium:       2/3 ⚠️ (hover not yet designed)
Level 4 Optional:     1/3 (tooltip missing)

Overall Score: 12/15 = 80% → GOOD, MINOR POLISH NEEDED

Recommendation: Maintain current approach
Add hover scale effect (quick win)
Optional: Add tooltip
```

---

## Alignment Variance Guidelines

### **Acceptable Deviations**

**Color Variance:**
- ✅ Hue can shift ±15% (neon #00B4FF → #00C4FF acceptable)
- ✅ Brightness can shift for card readability (destination uses neon text on white? Card can use neon on dark for contrast)
- ❌ Completely different color (e.g., red instead of neon) = FAIL

**Scale/Sizing:**
- ✅ Element proportions can change for card real estate (full page chart → thumbnail acceptable)
- ✅ Typography sizes scale to fit card (destination 72px headline → card 24px headline acceptable)
- ❌ Key elements removed entirely (ROI calculator → empty card) = FAIL

**Layout:**
- ✅ Elements can rearrange for space (vertical → horizontal acceptable if content is same)
- ✅ Less complex version acceptable (full interactive simulation → static preview OK)
- ❌ Completely different layout concept (chart card → list card) = FAIL

**Animation:**
- ✅ Simpler animation acceptable (destination has complex 3D → card has 2D pulse acceptable)
- ✅ Static version acceptable (destination has animation → card can be static)
- ❌ Contrary animation (destination flows upward → card animates downward) = FAIL

---

## Implementation Checklist (Per Card)

### **Singularity Card**

- [ ] **Graphic Asset Creation** (T2-002)
  - [ ] SVG particle grid (32 nodes, 4×8 or 8×4 layout)
  - [ ] Node styling: 3-4px radius, neon color, subtle glow
  - [ ] Edge styling: 1px stroke, neon color, 50% opacity
  - [ ] File size: <10KB (optimized SVG)

- [ ] **Component Development** (T2-002)
  - [ ] React component: `<SingularityPreviewCard />`
  - [ ] Props: `size?: 'sm' | 'md' | 'lg'`
  - [ ] Conditional rendering: static vs. animated per `prefers-reduced-motion`
  - [ ] Hover state: glow intensity increase
  - [ ] Link: `/singularity` destination

- [ ] **Styling** (T2-002)
  - [ ] Background gradient (void → carbon)
  - [ ] Border: `border border-neon/20`
  - [ ] Padding: Consistent with other cards
  - [ ] Responsive: Adapt particle count on mobile (reduce complexity)

- [ ] **Testing** (T2-003, T2-004)
  - [ ] Visual regression baseline (static state)
  - [ ] Hover state baseline (glow effect)
  - [ ] Accessibility: Color contrast checked, tooltip added
  - [ ] Mobile responsiveness: Grid renders correctly at <768px
  - [ ] Bundle size: Confirm <50KB total

- [ ] **Documentation** (T2-005)
  - [ ] JSDoc comments explaining purpose + variant options
  - [ ] Storybook story (if applicable)
  - [ ] Design rationale comment (why this design mirrors destination)

---

### **ROI Card** (Already Good, Polish Only)

- [ ] **Polish** (Optional, low priority)
  - [ ] Add hover scale effect
  - [ ] Confirm responsive behavior (single column on mobile)
  - [ ] Optional: Tooltip on hover

---

### **Product Card** (TBD in T2-002)

- [ ] **Graphic Assets**
  - [ ] 4 module icons (Guard, Comms, BOL, YMS)
  - [ ] Consistent sizing (24-32px)
  - [ ] Monochrome neon
  - [ ] File size: <5KB

- [ ] **Component Development**
  - [ ] React component: `<ProductPreviewCard />`
  - [ ] Display: 2×2 grid or inline layout
  - [ ] Hover: Optional per-module highlight

- [ ] **Testing**
  - [ ] Visual regression
  - [ ] Mobile layout (ensure 4 icons fit)
  - [ ] Icon sizing correct

---

## Approval Workflow

**Before implementation, each card design must be approved via:**

1. **Design Review** (Product + Design team)
   - [ ] Visual matches destination page intent
   - [ ] No accessibility regressions
   - [ ] Color contrast compliant

2. **Engineering Review** (Tech lead)
   - [ ] Bundle size within limit
   - [ ] Performance impact assessed
   - [ ] Responsive design plan confirmed

3. **Product Sign-Off** (Product manager)
   - [ ] Card messaging aligns with destination
   - [ ] Navigation/CTA clear
   - [ ] Analytics tracking plan (if applicable)

---

## Success Metrics

### **Quantitative**
- All cards score ≥70% on alignment rubric
- Zero accessibility violations (axe scan)
- Bundle size within targets (Singularity <50KB, ROI <30KB, Product <30KB)
- Mobile rendering: All cards render legibly at <768px viewport

### **Qualitative**
- Stakeholder feedback: "Cards effectively preview destinations"
- User testing: "I could guess where each card links to"
- No visual jarring when navigating from card → destination page

---

## Next Steps

- ✅ **T0-004 Complete:** Rubric defines alignment criteria and approval workflow
- ⏳ **Sprint 0 Complete:** Ready for Sprint 1/2 execution
- ⏳ **T1-001 → T1-008** (Sprint 1): Build ProtocolSequenceAnimation
- ⏳ **T2-001 → T2-008** (Sprint 2): Implement card aesthetic updates (Singularity, Product, etc.)

---

## Revision History

| Date | Version | Author | Change |
|------|---------|--------|--------|
| 2026-01-21 | 1.0 | Engineering | Initial rubric - 4-level framework, per-card criteria, scoring matrix |
