# SITE AUDIT: Flow & Messaging Cohesiveness
**Date:** January 19, 2026  
**Scope:** Full site narrative structure, visual proof integration, CTA clarity, YNS positioning

---

## EXECUTIVE SUMMARY

**Status:** STRONG foundation with minor friction points  
**Core Narrative:** ✅ Consistent "first YNS" positioning  
**Visual Proof:** ✅ Upgraded to video assets (show, not tell)  
**CTAs:** ✅ Standardized (Primary: Book Network Audit / Secondary: Apply for Co-Development)  
**Claim Defensibility:** ✅ All KPIs labeled "Illustrative examples"  

**Priority Fixes Needed:**
1. Homepage hero needs explicit "first YNS" line (currently buried)
2. Product deep-dive sections could use more proof assets
3. Solutions archetype pages lack visual proof differentiation

---

## HOMEPAGE AUDIT

### ✅ STRENGTHS

**Narrative Spine (8 sections):**
1. Hero: Clear value prop + "Predictable Throughput is the Product"
2. Constraint: "Yard is Where Throughput Dies" (visceral problem framing)
3. Before/After: NOW USING VIDEO (pickup-vs-delivery chaos → kiosk-demo standards)
4. Standards: 10 common denominators grid (Identity, Instruction, Condition, Positioning, etc.)
5. Outcomes: KPI chips with illustrative disclaimers (dwell 6-12%, detention 2-4%, labor 8-15%)
6. Evidence Vault: Artifacts with UTC timestamps + ProofStrip
7. Co-Development: Scarcity frame + roadmap control
8. Final CTA: "Ready to Standardize?" with both CTAs

**Visual Proof Integration:**
- Before/After toggle: ✅ Uses real video loops (manual chaos → automated standards)
- Evidence artifacts: ✅ Sample logs (Digital Guard, Dwell Alert, BOL Snapshot)
- Credibility markers: ✅ "58 drivers | N facilities | live systems"

**YNS Positioning:**
- Header logo: ✅ "by FreightRoll"
- Footer: ✅ "YardFlow by FreightRoll — the first YNS"
- Hero eyebrow: ✅ "YardFlow by FreightRoll" + "The first Yard Network System (YNS)"

### ⚠️ FRICTION POINTS

1. **Hero YNS line is small/subtle**  
   - Current: 14px font-mono below eyebrow  
   - Recommendation: Make this prominent (larger font, bold, or headline integration)

2. **10 Common Denominators could use visual anchors**  
   - Currently: Text-only grid  
   - Recommendation: Add icon for each standard (Shield for Identity, Message for Instruction, etc.)

3. **Evidence Vault proof strip could show actual artifact previews**  
   - Currently: Generic proof strip component  
   - Recommendation: Wire real screenshots (BOL signature, timestamp log, alert UI)

---

## PRODUCT PAGE AUDIT

### ✅ STRENGTHS

**Hero:**
- ✅ YNS positioning: "YardFlow by FreightRoll + first YNS clarifier"
- ✅ Headline: "Yards Create Variance. Standards Kill It."
- ✅ 10 common denominators intro

**Before/After:**
- ✅ Uses SAMPLE_BEFORE_AFTER (same as homepage)
- ✅ Visceral proof visualization

**Variance Taxonomy:**
- ✅ 4-module grid (Identity→Guard, Instruction→Comms, Condition→BOL, Positioning→YMS)
- ✅ Clear problem→solution→outcome per module

**Driver Journey (DemoStepper):**
- ✅ NOW USING VIDEOS:
  - Step 1: driver-qr-scan.mp4 (kiosk verification)
  - Step 2: two-way-comms.mp4 (lane assignment)
  - Step 3: real-time-alerts.png (enforcement dashboard)
  - Step 4: Smart-bol-kiosk.mp4 (BOL signature)

**Deep Dive (CapabilitySlice modules):**
- ✅ Each module has mediaImage + bullets + KPI
- ✅ Uses local SVG proof assets (/figma/)

### ⚠️ FRICTION POINTS

1. **CapabilitySlice could upgrade to video**  
   - Currently: Static SVGs (digital-guard-proof.svg, etc.)  
   - Available: kiosk-demo.mp4, two-way-comms.mp4, Smart-bol-kiosk.mp4  
   - Recommendation: Swap SVGs for videos in deep-dive sections

2. **Outcomes section KPI footnote placement**  
   - Currently: Footnote inside each KPI chip (cluttered)  
   - Recommendation: Move to single footnote below grid

3. **Network effect example feels small**  
   - "1 site vs 4 sites" framing too modest  
   - Recommendation: Add slider/input for N facilities (1, 10, 25, 100, 260, 500) per whitepaper

---

## SOLUTIONS OVERVIEW AUDIT

### ✅ STRENGTHS

**Hero:**
- ✅ YNS positioning: "YardFlow by FreightRoll + first YNS clarifier"
- ✅ Headline: "Standardize the Yard. Kill Variance."
- ✅ NarrativeLadder (compact) + DriverJourney (compact)

**Volatility Tax Section:**
- ✅ Problem framing (variance compounds vs. standards compound)
- ✅ CompareStrip (status quo vs. standards)

**Archetypes Grid:**
- ✅ 5 archetypes (Dry Van, Reefer, Flatbed, Intermodal, Tanker)
- ✅ Each card shows variance driver + standardization approach

### ⚠️ FRICTION POINTS

1. **Archetypes lack visual differentiation**  
   - All cards text-only  
   - Available assets: Reefer-driver-journey.png, pickup-vs-delivery images  
   - Recommendation: Add archetype-specific proof asset to each card

2. **NarrativeLadder + DriverJourney redundant here**  
   - Both appear on homepage in fuller form  
   - Recommendation: Remove compact versions, link to homepage or product

---

## PROCUREMENT/EVIDENCE VAULT AUDIT

### ✅ STRENGTHS

**Hero:**
- ✅ YNS positioning: "YardFlow by FreightRoll + first YNS + Audit-grade evidence from day one"
- ✅ Clear procurement CTAs (Download Trust Packet + Explore Evidence Vault)

**Security Posture:**
- ✅ SOC 2 Type II (in progress Q2 2026)
- ✅ Unified Carrier ID + Driver Qualification compliance

### ⚠️ FRICTION POINTS

1. **Evidence Vault section lacks actual proof artifacts**  
   - Currently: Conceptual description  
   - Available: chain-of-custody-kiosk.mp4, Smart-bol-kiosk.mp4, streamlined-receiving-POD.png  
   - Recommendation: Embed actual evidence artifacts (BOL signature UI, timestamp log, audit trail)

2. **Download Trust Packet is a placeholder button**  
   - No PDF wired yet  
   - Recommendation: Create procurement PDF or link to /resources/procurement

---

## CTA CONSISTENCY AUDIT

### ✅ STRENGTHS

**Primary CTA:** "Book a Network Audit"
- ✅ Consistent across all pages (Homepage, Product, Solutions, Procurement)
- ✅ Header sticky bar
- ✅ Footer CTA block
- ✅ Section-level CTAs

**Secondary CTA:** "Apply for Co-Development"
- ✅ Consistent across all pages
- ✅ Header banner ("Co-Development Program: Early Adopter Pricing")
- ✅ Positioned as secondary action

### ⚠️ FRICTION POINTS

1. **ROI Calculator + YardBuilder compete with primary CTAs**  
   - Currently: Nav items at same level as Product/Solutions  
   - Recommendation: Move to Resources dropdown (utility tools, not conversion)

2. **"Evidence Vault" link in footer goes to /resources/procurement**  
   - Naming inconsistency (Evidence Vault vs. Procurement Resources)  
   - Recommendation: Standardize on "Procurement Resources" or create dedicated /evidence-vault route

---

## CLAIM DEFENSIBILITY AUDIT

### ✅ STRENGTHS

**All KPI chips labeled "Illustrative examples":**
- Homepage outcomes: ✅ "Illustrative examples. Results vary by facility layout, appointment discipline, inbound mix."
- Product outcomes: ✅ "Illustrative example."
- No absolute claims ("always," "never," "100%")

**Whitepaper Alignment:**
- ✅ "Variance is the villain. Flow is the advantage."
- ✅ "The yard is the control valve for the supply chain network."
- ✅ YNS vs. YMS distinction clear
- ✅ Synthetic capacity framed as headroom, not immediate doubling

### ⚠️ FRICTION POINTS

1. **BeforeAfter metrics lack "example" label**  
   - "4-6 FTE → 1-2 FTE" presented as absolute  
   - Recommendation: Add footnote: "Example facility. Results vary."

2. **10 Common Denominators section lacks illustrative label**  
   - Currently: Presented as universal standards  
   - Recommendation: Add subhead: "Core protocol. Implementation adapts to facility context."

---

## VISUAL PROOF INTEGRATION AUDIT

### ✅ STRENGTHS

**Homepage:**
- Before/After: ✅ pickup-vs-delivery-video.mp4 → kiosk-demo.mp4
- Evidence artifacts: ✅ Sample logs with timestamps

**Product:**
- DemoStepper: ✅ 3 videos + 1 image (driver journey)
- CapabilitySlice: ✅ SVG proof assets (4 modules)

**Proof folder assets cataloged:**
- Videos (8): Machine-vision-video.mp4, Smart-bol-kiosk.mp4, chain-of-custody-kiosk.mp4, driver-qr-scan.mp4, kiosk-demo.mp4, pickup-vs-delivery-video.mp4, two-way-comms.mp4
- Images (11): Real-time-alerts-OS&D.png, Reefer-driver-journey.png, Streamlined=receiving.png, machine-vision.png, outbound-check-in.png, pickup-vs-delivery-1/2/3.png, quick-drop.png, real-time-alerts.png, roll-out.png, streamlined-receiving-POD.png

### ⚠️ UNDERUTILIZED ASSETS

1. **Machine-vision-video.mp4** — Not used  
   - Potential: Network effect section, Singularity page

2. **Reefer-driver-journey.png** — Not used  
   - Potential: /solutions/reefer page hero

3. **roll-out.png** — Not used  
   - Potential: Implementation page, Co-Development roadmap

4. **quick-drop.png** — Not used  
   - Potential: Solutions archetype episodes

5. **streamlined-receiving-POD.png** — Not used  
   - Potential: Procurement evidence vault, Product BOL section

---

## NAVIGATION & IA AUDIT

### ✅ STRENGTHS

**Header Nav:**
- ✅ Clean hierarchy: Product, Solutions, ROI, YardBuilder, Resources, Company
- ✅ Solutions dropdown shows archetypes
- ✅ Resources dropdown organized (Guides, Field Notes, Simulations, Case Studies)
- ✅ Primary CTA prominent

**Footer:**
- ✅ Organized: Product, Solutions, Resources, Company
- ✅ YNS positioning in brand column
- ✅ CTA block above footer nav

### ⚠️ FRICTION POINTS

1. **ROI + YardBuilder should move to Resources**  
   - Currently: Top-level nav items  
   - Issue: Utility tools competing with conversion paths  
   - Recommendation: Resources > Calculators > ROI / YardBuilder

2. **"Evidence Vault" mismatch**  
   - Header Company dropdown: "Evidence Vault" → /resources/procurement  
   - Footer Company: "Evidence Vault" → /resources/procurement  
   - Page title: "Procurement Resources"  
   - Recommendation: Pick one name and enforce globally

---

## RECOMMENDATIONS (PRIORITY ORDER)

### 🔴 HIGH PRIORITY

1. **Upgrade CapabilitySlice to use video assets**  
   - Swap SVGs for videos: kiosk-demo.mp4 (Guard), two-way-comms.mp4 (Comms), Smart-bol-kiosk.mp4 (BOL)

2. **Add BeforeAfter metrics footnote**  
   - "Example facility. Results vary by layout, appointment discipline, inbound mix."

3. **Standardize Evidence Vault naming**  
   - Pick: "Procurement Resources" OR "Evidence Vault" (not both)

4. **Move ROI/YardBuilder to Resources dropdown**  
   - Reduces nav cognitive load
   - Positions as utility tools, not primary conversion

### 🟡 MEDIUM PRIORITY

5. **Enhance 10 Common Denominators with icons**  
   - Add visual anchors (Shield for Identity, Message for Instruction, etc.)

6. **Wire underutilized proof assets**  
   - Reefer-driver-journey.png → /solutions/reefer
   - roll-out.png → /implementation
   - streamlined-receiving-POD.png → /resources/procurement evidence section

7. **Add network effect slider/input**  
   - Replace "1 site vs 4 sites" with N facility slider (1, 10, 25, 100, 260, 500)

### 🟢 LOW PRIORITY (POLISH)

8. **Homepage hero YNS line prominence**  
   - Increase font size or integrate into headline

9. **Remove redundant NarrativeLadder/DriverJourney from Solutions**  
   - Link to homepage or product instead

10. **Create downloadable Trust Packet PDF**  
    - Wire to "Download Trust Packet" button on /resources/procurement

---

## VERDICT

**Overall Grade: A-**

✅ **Narrative Cohesion:** Excellent. YNS positioning consistent, variance → standards → evidence flow clear.  
✅ **Visual Proof:** Strong. Video assets now show the product in action.  
✅ **Claim Defensibility:** Good. Illustrative disclaimers present, aligned with whitepaper.  
⚠️ **Minor Gaps:** CapabilitySlice still using SVGs instead of videos, some proof assets underutilized, nav IA could simplify.

**Next Session Focus:**
1. Upgrade CapabilitySlice to video
2. Wire underutilized proof assets to archetype pages
3. Simplify nav (move ROI/YardBuilder to Resources)
4. Add network effect slider

---

**End of Audit**
