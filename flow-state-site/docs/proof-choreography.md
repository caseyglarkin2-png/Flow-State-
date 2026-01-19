# Proof Choreography Mapping

**Purpose:** Map every major section/component to its proof asset  
**Rule:** Every "big glass card" must have proof media. No blank boxes.  
**Updated:** January 19, 2026

---

## Proof Asset Inventory

### Videos (Silent Loops)
| Filename | Duration | Use Case | Muted | Poster Needed |
|----------|----------|----------|-------|---------------|
| `kiosk-demo.mp4` | ~15s | Digital Guard identity verification | ✓ | ✓ |
| `driver-qr-scan.mp4` | ~3s | Driver journey step 1 (QR scan) | ✓ | ✓ |
| `two-way-comms.mp4` | ~8s | Digital Comms lane assignment | ✓ | ✓ |
| `Smart-bol-kiosk.mp4` | ~10s | Digital BOL signature capture | ✓ | ✓ |
| `chain-of-custody-kiosk.mp4` | ~12s | Evidence Vault chain of custody | ✓ | ✓ |
| `Machine-vision-video.mp4` | ~20s | Ground Source Truth telemetry | ✓ | ✓ |
| `pickup-vs-delivery-video.mp4` | ~15s | Before/After chaos visualization | ✓ | ✓ |
| `outbound-check-in.png` | static | Fallback for outbound flow | N/A | N/A |
| `machine-vision.png` | static | Fallback for machine vision | N/A | N/A |

### Images (Stills)
| Filename | Use Case | Alt Text Required |
|----------|----------|-------------------|
| `real-time-alerts.png` | Enforcement dashboard | ✓ |
| `Real-time-alerts-OS&D.png` | OS&D specific alerts | ✓ |
| `Reefer-driver-journey.png` | Reefer archetype journey | ✓ |
| `Streamlined=receiving.png` | Receiving process flow | ✓ |
| `streamlined-receiving-POD.png` | POD chain of custody | ✓ |
| `pickup-vs-delivery-1/2/3.png` | Multi-step comparison | ✓ |
| `quick-drop.png` | Quick drop archetype | ✓ |
| `roll-out.png` | Network rollout timeline | ✓ |

---

## Section-to-Asset Mapping

### Homepage Sections

#### Hero Section
**Asset:** None (text + CTA only)  
**Proof Element:** StatusPulse + credibility markers (58 drivers, N facilities)

#### The Constraint Section
**Asset:** None (problem framing, no proof yet)  
**Alternative:** Consider adding pickup-vs-delivery-video.mp4 as "typical chaos" visual

#### Before/After Toggle
**Before Visual:** `/proof/pickup-vs-delivery-video.mp4`  
**After Visual:** `/proof/kiosk-demo.mp4`  
**Component:** `BeforeAfterToggle`  
**Auto-play:** ✓ (muted, in viewport)

#### 10 Common Denominators
**Asset:** None (icon grid only)  
**Note:** Icons serve as visual anchors

#### Outcomes Section
**Asset:** None (KPI chips only)  
**Note:** Could add real-time-alerts.png as "enforcement proof"

#### Evidence Vault
**Asset:** ProofStrip component (shows artifact thumbnails)  
**Evidence Artifacts:**
- Digital Guard event log
- Dwell alert notification
- BOL snapshot with timestamp

**Enhancement Opportunity:** Add chain-of-custody-kiosk.mp4 as Evidence Vault hero visual

#### Co-Development
**Asset:** None (text + scarcity frame)

---

### Product Page Sections

#### Hero
**Asset:** None (value prop + 10 common denominators intro)

#### Before/After
**Asset:** Same as homepage (SAMPLE_BEFORE_AFTER)  
**Before Visual:** `/proof/pickup-vs-delivery-video.mp4`  
**After Visual:** `/proof/kiosk-demo.mp4`

#### Variance Taxonomy (4 modules)
**Asset:** None (problem → solution → outcome text grid)  
**Enhancement Opportunity:** Add module-specific proof icons

#### Driver Journey (DemoStepper)
**Current Mapping:**
- Step 1: `/proof/driver-qr-scan.mp4` - "Driver scans QR at gate"
- Step 2: `/proof/two-way-comms.mp4` - "System assigns drop location"
- Step 3: `/proof/real-time-alerts.png` - "Enforcement at every step"
- Step 4: `/proof/Smart-bol-kiosk.mp4` - "Complete evidence trail"

**Enhancement:** Add Evidence Artifact Preview panel alongside stepper

#### CapabilitySlice Deep Dive
**Module 1 - Digital Guard:**
- Asset: `/proof/kiosk-demo.mp4`
- Type: desktop
- Auto-play: ✓

**Module 2 - Digital Comms:**
- Asset: `/proof/two-way-comms.mp4`
- Type: desktop
- Auto-play: ✓

**Module 3 - Digital BOL:**
- Asset: `/proof/Smart-bol-kiosk.mp4`
- Type: desktop
- Auto-play: ✓

**Module 4 - Digital YMS:**
- Asset: `/figma/digital-yms-proof.svg` ❌ (SVG, not proof media)
- **TODO:** Replace with `/proof/real-time-alerts.png` or create YMS dashboard video

#### Outcomes Section
**Asset:** KPI chips + footnote disclaimer  
**Enhancement:** Add ProofMedia component with machine-vision-video.mp4 as "Ground Source Truth" visual

#### Network Effect Section
**Current:** "1 site vs 4 sites" text comparison ❌  
**TODO:** Replace with interactive facility count slider (1, 10, 25, 100, 260, 500)  
**Asset:** Add Machine-vision-video.mp4 as "network intelligence" visual

#### Archetypes Grid
**Current:** Text-only cards ❌  
**TODO:** Add archetype-specific proof assets:
- Dry Van: pickup-vs-delivery-1.png
- Reefer: Reefer-driver-journey.png
- Flatbed: quick-drop.png
- Intermodal: outbound-check-in.png
- Tanker: (use generic kiosk-demo.mp4)

---

### Implementation Page

#### Rollout Process Section
**Asset:** `/proof/roll-out.png` ✓ (already wired)  
**Type:** Static timeline visualization

---

### Procurement Page

#### Evidence Vault Section
**Asset:** `/proof/streamlined-receiving-POD.png` ✓ (already wired)  
**Type:** Chain of custody proof

**Enhancement:** Add chain-of-custody-kiosk.mp4 as interactive proof loop

---

## Proof Media Component Spec

### ProofMedia.tsx Enhancements Needed

**Current Capabilities:**
- ✓ Image support (next/image)
- ✓ Video support (HTML5 video)
- ✓ Auto-play, loop, muted
- ✓ Conditional rendering (video vs image)

**Missing Features:**
- ❌ Lazy loading (defer out-of-viewport media)
- ❌ Poster images for videos
- ❌ Visible placeholder when asset missing
- ❌ IntersectionObserver for video start/stop
- ❌ Annotations overlay support (for evidence artifacts)

### Placeholder Behavior

**When asset path invalid or missing:**
```tsx
<div className="w-full h-full bg-carbon/50 border-2 border-ember/30 rounded-xl flex items-center justify-center p-6">
  <div className="text-center">
    <p className="text-ember font-mono text-sm mb-2">⚠ Proof Asset Missing</p>
    <p className="text-steel/70 text-xs font-mono">Expected: {assetPath}</p>
    <p className="text-steel/50 text-xs mt-2">Add to /public/proof/</p>
  </div>
</div>
```

**Never render:** Blank/white box, broken image icon, or nothing

---

## Evidence Artifact Preview Component (NEW)

**Purpose:** Show "receipt-style" timestamp record alongside Driver Journey steps  
**Design:** Narrow vertical card with UTC timestamps, event type, verification status

**Example Data:**
```tsx
{
  timestamp: "2026-01-19T14:32:18.427Z",
  event: "Driver Check-In",
  verification: "✓ Verified",
  driver: "J. Smith",
  carrier: "ACME Transport",
  trailer: "TRL-8492",
  proof: "Photo + CDL scan",
  signature: "0x8f4a2b..."
}
```

**Visual Style:**
- Monospace font (font-mono)
- Subtle border (border-neon/20)
- Dark background (bg-carbon/50)
- Green checkmarks for verified events
- Cryptographic hash abbreviated (first 8 chars)

---

## Interactive Facility Count Component (NEW)

**Purpose:** Replace "4 sites network" with reality-based facility count selector  
**UI:** Slider with preset buttons: 1, 10, 25, 100, 260, 500

**Output Display:**
- Proof points collected: `facilityCount × 58 drivers × 365 days`
- Pattern library size: `facilityCount × variance scenarios`
- Network intelligence: "Cross-facility learning enabled at N+ facilities"

**Canon Language:**
"Network effect is not marketing fluff. It is statistical reality. More proof points → tighter variance bands. More pattern data → better predictive models. Standards create the foundation. The network amplifies the signal."

**Disclaimer Required:**
"Illustrative example. Network effect magnitude varies by facility mix, operating hours, and data quality."

---

## ROI Calculator + Singularity Placement

### Current State
- ROI calculator: `/roi` route (standalone page)
- Singularity simulation: `/singularity` route (standalone page)

### Recommended Placement

#### Homepage: Add "Believe" Section (NEW)
**Position:** After Evidence Vault, before Co-Development  
**Content:**
1. Headline: "See It for Yourself. Ground Source Truth."
2. Two-column layout:
   - Left: ROI Calculator (click-to-open modal or inline iframe)
   - Right: Singularity Simulation (click-to-start, poster image fallback)

**Lazy Load Strategy:**
- Defer iframe/simulation load until section in viewport
- Click-to-start interaction required
- Static poster image shows preview of calculator/sim
- Use IntersectionObserver to detect viewport entry

#### Product Page: Add After Network Effect Section
**Title:** "Proof Engines: Run the Numbers Yourself"  
**Same two-column layout as homepage**

---

## Performance Optimization Checklist

### Video Loading
- [ ] Add `loading="lazy"` attribute
- [ ] Generate poster images for all videos (first frame extraction)
- [ ] Use IntersectionObserver to pause out-of-viewport videos
- [ ] Muted + playsInline required for silent loops
- [ ] Preload="metadata" for above-fold videos

### Image Loading
- [ ] next/image with `loading="lazy"` for below-fold images
- [ ] Priority=true for hero/above-fold images
- [ ] Optimize WebP format for proof assets (if not already)

### Heavy Simulations
- [ ] ROI calculator: Defer component mount until user clicks
- [ ] Singularity: Static poster → click-to-start → then load Three.js
- [ ] Use dynamic import() for simulation code

---

## Missing Assets TODO

1. **Digital YMS proof video** - Currently using SVG, need actual dashboard recording
2. **Poster images** - Extract first frame from all MP4s for poster attribute
3. **Archetype-specific visuals** - Need 5 unique assets for archetype cards
4. **Evidence artifact UI screenshots** - For Evidence Artifact Preview component

---

**End of Proof Choreography Mapping**
