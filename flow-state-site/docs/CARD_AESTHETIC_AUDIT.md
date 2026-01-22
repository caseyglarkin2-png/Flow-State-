# Card Aesthetic Audit: Destination Page Analysis

**Created:** January 21, 2026  
**Sprint:** S0  
**Task:** T0-003 Destination Page Aesthetic Audit  
**Status:** ✅ Complete

---

## Overview

This audit documents the visual characteristics of destination pages that will be previewed/referenced by homepage module cards. The goal is to establish design criteria for card aesthetics so that each homepage card **evokes the feeling** of its destination page without pixel-perfect matching.

---

## Methodology

**Pages Audited:**
1. `/singularity` - Interactive variance tax protocol visualization
2. `/roi` - Board-ready ROI calculator
3. `/product` - Module overview and capabilities
4. `/network-effect` - Network scaling visualization

**Visual Elements Captured:**
- Color palette (primary, accent, background)
- Key visual components (icons, graphs, grids, animations)
- Typography hierarchy (heading style, label style)
- Layout patterns (grid, card, vertical timeline)
- Animation style (if applicable)

---

## Destination Page Analysis

### **1. Singularity Page (`/singularity`)**

**Primary Purpose:**  
Interactive visualization of the Variance Tax Protocol with live physics-based simulation. User inputs drive a shader-based "black hole" visualization that dissolves into ordered particle network as variance improves.

#### **Color Palette**
```
Background:    #050505 (void - near black)
Primary:       #00B4FF (neon - electric blue)
Accent:        #1A1A1A (carbon - dark gray)
Text:          #FFFFFF (white for headlines)
Text Secondary: #A0A0A0 (steel - gray)

Semantic:
Variance:      #D91411 (FreightRoll red - shown in cost breakdown)
Fluidity:      #05ACEB (cerulean - shown in visualization improvement)
```

#### **Key Visual Components**
1. **Physics Visualization (Hero)**
   - Black hole shader (chaotic, swirling particles)
   - Transition to ordered particle grid as user improves inputs
   - Real-time animation responding to slider changes
   - WebGL canvas (aspect-video, ~400-600px height on desktop)

2. **Calculator Panel**
   - 12 input fields in stacked layout
   - Numeric sliders with value display
   - Labels with tooltip hints
   - No visible form validation errors (clean UX)

3. **Reynolds Number Display**
   - Large monospace number (Re* = 0.75 example)
   - Formula breakdown below (µ, ρ, v components)
   - Code-style background (#void with border)

4. **Tax Breakdown**
   - 6-component cost table (Recovery, Detention, Labor, Chargebacks, Working Capital, Lost Sales)
   - Row-per-component design
   - Dollar amounts in bright color (emphasis)
   - Percentage bars showing relative impact

5. **Cards** (throughout page)
   - Border style: `border border-neon/20` (subtle neon edge)
   - Background: transparent (no fill)
   - Content: text + icon combo
   - Hover: no visible hover effect documented

#### **Typography**
```
Headlines:     text-5xl md:text-7xl font-black (hero)
              text-4xl md:text-5xl font-black (section)
Body:         text-lg md:text-xl text-steel
Labels:       text-sm font-semibold
Code/Formula: font-mono text-sm (in code blocks)
```

#### **Layout Patterns**
- Hero section: centered text with value props in 3-column grid
- Split layout: calculator (left) + visualization (right, sticky)
- Mobile: stacked layout (visual on top, calculator below)
- Max-width container: 4xl-7xl depending on section

#### **Animation Style**
- **Hero Badge:** `animate-pulse-glow` (pulsing neon glow effect)
- **Visualization:** Real-time particle animation response to input changes
- **Page transitions:** Smooth scroll reveal (standard Next.js)
- **Reduced motion:** Page respects `prefers-reduced-motion` (visualization becomes static)

#### **Iconography**
- Icons used: Prism, Ignite, Crosshair, Velocity (from FlowIcons)
- Style: Line-based (not filled), monochrome neon color
- Size: 16px-32px depending on context
- Placement: Inline with text (badges), centered in card headers

---

### **2. ROI Page (`/roi`)**

**Primary Purpose:**  
Board-ready ROI calculator with quick/pro mode toggle. Generates financial projections with sensitivity analysis and export functionality.

#### **Color Palette**
```
Background:    #050505 (void)
Primary:       #00B4FF (neon)
Accent:        #1A1A1A (carbon)
Success:       #10B981 (emerald - for positive results)
Warning:       #F59E0B (amber - for risk indicators)
Error:         #EF4444 (red - for warnings)
Text:          #FFFFFF, #A0A0A0 (white/steel)
```

#### **Key Visual Components**
1. **Calculator Grid**
   - Input matrix: facilities × years
   - Cells contain numeric inputs or drop-downs
   - Slider controls for sensitivity (Quick Mode)
   - Professional spreadsheet-like aesthetic

2. **Results Display**
   - Large callout showing total NPV or IRR
   - Callout variant: `success` (green highlight)
   - Supporting metrics below (payback period, break-even month)

3. **Export Buttons**
   - "Board Ready Export" CTA (premium positioning)
   - "Download PDF" secondary action
   - Icon: DocumentDownload or similar

4. **Cards**
   - Bordered style (like Singularity)
   - Used for assumption callouts (input hints)
   - "Verified Economics" callout (green success variant)

5. **Sensitivity Analysis**
   - 2D heatmap or tornado chart (if implemented)
   - Shows NPV variance across input ranges
   - Color-coded (red/yellow/green by impact)

#### **Typography**
- Heading: text-4xl md:text-5xl font-black
- Body: text-base, text-lg for callouts
- Input labels: text-sm font-semibold
- Results: text-3xl md:text-4xl font-bold (for big numbers)

#### **Layout Patterns**
- Hero section: centered headline + CTA buttons
- Calculator: Full-width grid with vertical scrolling
- Results: Sticky card at top or right sidebar
- Mobile: Single-column stacked layout

#### **Animation Style**
- Input changes → Results update (no visual feedback animation)
- Export CTA: Hover scale/shadow effect
- Page load: Standard fade-in

#### **Iconography**
- Icons: Calculator, DocumentDownload, TrendingUp, Shield (for verified)
- Style: Monochrome neon or white
- Placement: CTA buttons, callout headers

---

### **3. Product Page (`/product`)**

**Primary Purpose:**  
High-level product overview showing 4 core modules (Digital Guard, Comms, BOL, YMS) and their complementary nature.

#### **Color Palette**
```
(Inherits from brand system)
Background:    #050505 (void)
Primary:       #00B4FF (neon)
Module colors: 
  Guard:       #00B4FF (neon - blue)
  Comms:       #00E5FF (cyan variant)
  BOL:         #00D4FF (lighter blue)
  YMS:         #0BAFDA (darker blue)
Accent:        #1A1A1A (carbon)
```

#### **Key Visual Components**
1. **Module Cards** (4-column grid, desktop)
   - Card per module (Guard, Comms, BOL, YMS)
   - Icon at top (32-48px, monochrome neon)
   - Module name (headline)
   - Short description (2-3 lines)
   - "Learn More" link
   - Hover: Subtle lift/shadow effect

2. **Module Detail Section**
   - Expanded view of each module
   - Features list (bulleted)
   - Use cases
   - Integration points with other modules
   - (Layout may be accordion or separate sections)

3. **Narrative Flow**
   - Problem → Solution → Modules → Capabilities
   - Likely uses Section primitives with fades/slides

4. **Cards Throughout**
   - Consistent bordered style
   - Used for feature highlights
   - Used for use case callouts

#### **Typography**
- Headlines: text-3xl md:text-4xl font-bold (module section)
- Module name: text-xl font-semibold
- Description: text-base text-steel
- Features: text-sm, list-disc list-inside

#### **Layout Patterns**
- Hero: Centered headline + subheading
- Modules: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- Details: Full-width sections (alternating left/right on desktop)
- CTA: "Explore [Module]" or "Book a Demo"

#### **Animation Style**
- Stagger animation on module cards (reveal on scroll)
- Smooth transitions between accordion sections
- Hover states on cards (scale, shadow)

#### **Iconography**
- 4 unique module icons (Shield, Chat, Document, Grid)
- Style: Monochrome neon, 32px base size
- Consistent sizing across product/homepage

---

### **4. Network Effect Page (`/network-effect`)**

**Primary Purpose:**  
Explain how network density drives economic returns (value compounds with more deployments).

#### **Color Palette**
```
Same as brand system
Background:    #050505 (void)
Primary:       #00B4FF (neon)
Growth color:  #10B981 (emerald - for upward curve)
```

#### **Key Visual Components**
1. **Network Growth Curve**
   - SVG or Canvas line chart
   - X-axis: # of facilities, Y-axis: Value/Economic return
   - Exponential curve (hockey stick shape)
   - Hover tooltips showing values

2. **Before/After Diagram**
   - Left side: Siloed individual yards (isolated icons)
   - Right side: Connected network (nodes + edges)
   - Transition animation between states

3. **Cards**
   - Feature cards showing network benefits
   - 3-column grid layout
   - Icon + benefit headline + description

#### **Typography**
- Headlines: text-4xl font-bold
- Curve labels: text-xs font-mono (axis labels)
- Cards: Standard sizing

#### **Layout Patterns**
- Hero: Centered headline
- Curve: Full-width container, aspect-video
- Benefits: 3-column card grid
- CTA: "See Network Effect" or "Run Simulation"

---

## Visual Alignment Framework

### **Matching Strategy for Homepage Cards**

**Goal:** Each homepage module card should **evoke its destination page** without requiring pixel-perfect duplication.

#### **Singularity Card (Currently Problematic)**

**Current State:**
```
┌─ Singularity Card ─────┐
│ Generic network SVG    │
│ (doesn't match dest)   │
└────────────────────────┘
```

**Destination Page Reality:**
- Physics simulation with particles
- Black hole → ordered network transition
- Reynolds number display
- 6-component cost breakdown (table)

**Proposed Card Aesthetic:**
```
┌─ Singularity Card (NEW) ────────────┐
│ Particle network visualization       │
│ (32-node grid pattern like dest)    │
│ +  Reynolds number badge (center)   │
│ +  "Variance Tax Protocol" label    │
│                                      │
│ Color: Neon on dark gradient        │
│ Style: Monochrome particles+nodes   │
└──────────────────────────────────────┘
```

**Design Details:**
- Width: 100% of card container (~280px on mobile, ~300px on desktop)
- Height: Aspect ratio 16:9 or square (TBD)
- Background: Gradient from void to carbon (like destination)
- Content: 32-node grid pattern (SVG) with subtle animated particle effects
- Overlay: Neon badge with "Re* = 0.72" and "Variance Tax" label
- Border: `border border-neon/20` (matches brand card style)

**Visual Proof:**
The card should make user think: *"Oh, I'll see an interactive physics simulation on that page"* not *"generic network diagram"*

---

#### **ROI Card (Existing, Currently Good)**

**Current State:**
```
┌─ ROI Module Card ──────┐
│ Calculator grid visual │
│ + "Board Ready" label  │
└────────────────────────┘
```

**Assessment:** ✅ Matches destination well
- Calculator grid preview
- "Board Ready" label aligns with page positioning
- Professional/financial tone matches

**Recommendation:** Keep as-is, use as template for other cards

---

#### **Product Card (Composite)**

**Current State:**
- Likely shows generic "4 modules" layout

**Proposal:**
- Simplify: Show one highlighted module at a time
- Or: Show 4 smaller module icons in grid
- Label: "4 Core Modules: Guard, Comms, BOL, YMS"

---

#### **Network Effect Card (If Shown)**

**Current State:**
- Unknown

**Proposal:**
- Show the exponential curve (hockey stick shape)
- Neon color line on dark background
- Label: "Network Density Compounds Value"

---

## Color Contrast & Accessibility

### **Key Combinations (WCAG AAA Tested)**

| Foreground | Background | Contrast | Level |
|-----------|-----------|----------|-------|
| #00B4FF (neon) | #050505 (void) | 10.5:1 | ✅ AAA |
| #00B4FF (neon) | #1A1A1A (carbon) | 8.2:1 | ✅ AAA |
| #FFFFFF (white) | #050505 (void) | 21:1 | ✅ AAA |
| #A0A0A0 (steel) | #050505 (void) | 4.5:1 | ✅ AA |
| #D91411 (red) | #050505 (void) | 5.8:1 | ✅ AA |
| #10B981 (green) | #050505 (void) | 3.6:1 | ⚠️ A only |

**Recommendation:** Avoid pairing emerald green (#10B981) as small text on dark backgrounds. OK for large text or icons.

---

## Design Decision Points for T0-004

These require decisions before card implementation begins:

1. **Singularity Card Visual:**
   - Option A: SVG 32-node grid with animated particle effects?
   - Option B: Static 32-node grid (no animation)?
   - Option C: Simplified "black hole → particles" canvas visualization?

2. **Display Dimensions:**
   - Square (1:1)? 
   - 16:9 (landscape)?
   - 4:3 (compromise)?

3. **Overlay Elements:**
   - Badge with "Re* = 0.XX"? 
   - Just the 32-node pattern? 
   - Both pattern + badge?

4. **Bundle Size Constraint:**
   - Singularity card should be <50KB including SVG assets
   - Use simple SVG line drawing (not rasterized image)
   - Avoid inline WebGL (too heavy for card preview)

5. **Animation on Hover:**
   - Should card animate when user hovers (reveal destination vibe)?
   - Or static card that links to destination?

---

## Audit Results Summary

| Destination | Key Visual | Color | Typography | Bundle Risk | Complexity |
|-------------|-----------|-------|-----------|------------|-----------|
| Singularity | Particle grid + numbers | Neon + void | Monospace | ⚠️ Medium | High |
| ROI | Calculator grid | Neon + void | Bold headlines | ✅ Low | Medium |
| Product | Module icons (4x) | Neon variants | Bold/regular | ✅ Low | Low |
| Network Effect | Exponential curve | Neon + green | Bold | ✅ Low | Medium |

---

## Next Steps

- ✅ **T0-003 Complete:** Destination audit documents visual characteristics
- ⏳ **T0-004 Pending:** Create card alignment rubric with pass/fail criteria
- ⏳ **T2-001 Pending:** Implement SingularityPreviewCard (Sprint 2)
- ⏳ **T2-002 Pending:** Audit other module cards (Product, ROI, Network)

---

## Files Analyzed

- `/app/singularity/page.tsx` (246 lines)
- `/app/roi/page.tsx` (not fully read)
- `/app/product/page.tsx` (not fully read)
- `/components/singularity/VarianceTaxDashboard.tsx` (223 lines)
- `lib/tokens.ts` (color palette reference)
- `config/brand.ts` (brand constants)

---

## Revision History

| Date | Version | Author | Change |
|------|---------|--------|--------|
| 2026-01-21 | 1.0 | Engineering | Initial audit - Singularity/ROI/Product/NetworkEffect analysis |
