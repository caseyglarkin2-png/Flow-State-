# Icon Inventory Audit

> **Generated:** January 22, 2026  
> **Status:** Complete  
> **Purpose:** Document all icons in codebase and assess brand alignment

---

## Summary

| File | Total Icons | ✅ Aligned | ⚠️ Update | ❌ Off-brand |
|------|-------------|-----------|-----------|-------------|
| FlowIcons.tsx | 36 | 36 | 0 | 0 |
| FlowGlyphs.tsx | 4 | 4 | 0 | 0 |
| ProtocolIcons.tsx | 4 | 0 | 0 | 4 |
| **Total** | **44** | **40** | **0** | **4** |

**Action Required:** Redesign 4 ProtocolIcons to match FlowIcons aesthetic.

---

## Brand Alignment Criteria

Icons are evaluated against these FlowIcons design principles:

1. **Geometric Shapes Only** - No realistic/skeuomorphic metaphors
2. **Stroke-Based** - strokeWidth 1-2, strokeLinecap="round"
3. **Minimal Fills** - Fill only for accent dots/emphasis
4. **Opacity Layers** - 0.3-0.5 for depth without clutter
5. **currentColor** - Uses inherited color, not hardcoded
6. **Consistent ViewBox** - 24x24 for FlowIcons, 48x48 for ProtocolIcons

---

## FlowIcons.tsx (36 Icons) ✅

All icons follow brand aesthetic. These serve as the reference standard.

### Directional / Action (4)
| Icon | Line | Status | Notes |
|------|------|--------|-------|
| FlowArrow | 21 | ✅ | Forward arrow + origin dot |
| Pulse | 35 | ✅ | EKG-style heartbeat line |
| Confirm | 48 | ✅ | Circle + checkmark |
| Dismiss | 62 | ✅ | Circle + X |

### Energy / Power (2)
| Icon | Line | Status | Notes |
|------|------|--------|-------|
| Velocity | 79 | ✅ | Lightning bolt, minimal fill |
| Ignite | 87 | ✅ | Radial burst with center |

### Data / Analytics (4)
| Icon | Line | Status | Notes |
|------|------|--------|-------|
| Metrics | 106 | ✅ | Bar chart in rounded box |
| Timeline | 114 | ✅ | Calendar grid |
| Scope | 125 | ✅ | Magnifier with concentric rings |
| Config | 134 | ✅ | Gear with radial lines |

### Location / Network (4)
| Icon | Line | Status | Notes |
|------|------|--------|-------|
| Nexus | 151 | ✅ | Globe with latitude/longitude |
| Beacon | 161 | ✅ | Map pin with pulse center |
| Orbital | 172 | ✅ | Satellite ring with node |
| Territory | 181 | ✅ | Grid map with location dots |

### Security / Verification (2)
| Icon | Line | Status | Notes |
|------|------|--------|-------|
| Shield | 195 | ✅ | Shield outline + checkmark |
| Caution | 209 | ✅ | Triangle warning |

### Intelligence / AI (3)
| Icon | Line | Status | Notes |
|------|------|--------|-------|
| Cortex | 226 | ✅ | Brain silhouette, minimal |
| Agent | 241 | ✅ | Robot face, geometric |
| Crosshair | 254 | ✅ | **Good reference for Guard icon** |

### Logistics / Operations (8)
| Icon | Line | Status | Notes |
|------|------|--------|-------|
| Haul | 270 | ✅ | Truck silhouette |
| Cargo | 283 | ✅ | 3D box with isometric lines |
| Plant | 298 | ✅ | Factory skyline |
| Cart | 308 | ✅ | Shopping cart |
| Anchor | 318 | ✅ | Maritime anchor |
| Cycle | 330 | ✅ | Refresh arrows |
| Genesis | 344 | ✅ | Sparkle/starburst |
| Construct | 356 | ✅ | Pencil tool |

### Communication / Document (6)
| Icon | Line | Status | Notes |
|------|------|--------|-------|
| Signal | 372 | ✅ | **Good reference for Comms icon** |
| Comm | 385 | ✅ | Phone handset |
| Manifest | 396 | ✅ | **Good reference for BOL icon** |
| Waypoint | 407 | ✅ | Navigation arrow |
| Device | 417 | ✅ | Mobile phone |
| Prism | 401 | ✅ | Diamond/gem |

### Archetypes (5)
| Icon | Line | Status | Notes |
|------|------|--------|-------|
| DryVan | 416 | ✅ | Truck + trailer |
| Reefer | 430 | ✅ | Truck + cooling unit |
| Intermodal | 447 | ✅ | Container on rail |
| Flatbed | 461 | ✅ | Flatbed truck |
| Tanker | 476 | ✅ | Cylindrical tanker |

---

## FlowGlyphs.tsx (4 Icons) ✅

All glyphs follow brand aesthetic - monoline, stroke-only, 24x24 grid.

| Icon | Line | Status | Notes |
|------|------|--------|-------|
| FlowGlyphPredictiveIntelligence | 18 | ✅ | Concentric circles + crosshairs |
| FlowGlyphCarrierBenchmarking | 36 | ✅ | Bar chart comparison |
| FlowGlyphCoordinationEfficiency | 52 | ✅ | 3-node network |
| FlowGlyphSharedLearning | 68 | ✅ | Open book with connection |

---

## ProtocolIcons.tsx (4 Icons) ❌

**All icons need complete redesign.** Current icons use skeuomorphic metaphors inconsistent with brand.

| Icon | Line | Status | Current Design | Problem |
|------|------|--------|----------------|---------|
| ProtocolGuardIcon | 19 | ❌ | Shield with lock inside | Skeuomorphic lock, realistic shield shape |
| ProtocolCommsIcon | 70 | ❌ | Chat bubble with signal waves | Skeuomorphic speech bubble, dot indicators |
| ProtocolBOLIcon | 118 | ❌ | Document with folded corner + checkmark | Realistic document metaphor |
| ProtocolYMSIcon | 166 | ❌ | Grid + bar chart overlay | Busy composition, inconsistent stroke weights |

### Current ProtocolIcons Analysis

#### ProtocolGuardIcon (Lines 19-67)
```tsx
// CURRENT - Skeuomorphic shield + lock
<path d="M24 4L10 10v10c0 8.84..." />  // Realistic shield shape
<rect x="18" y="22" width="12" height="10" />  // Lock body
<path d="M20 22v-4a4 4 0 0 1 8 0v4" />  // Lock shackle
<circle cx="24" cy="27" r="1.5" />  // Keyhole
```
**Problem:** Looks like a security app icon, not logistics-tech

#### ProtocolCommsIcon (Lines 70-116)
```tsx
// CURRENT - Chat bubble + signal waves
<path d="M12 8h24a4 4 0 0 1 4 4v16..." />  // Chat bubble with tail
<path d="M30 14c2 1 3 2.5 3 4s..." />  // Radio waves
<circle cx="18" cy="18" r="1.5" />  // Typing dots
```
**Problem:** Generic messaging app icon aesthetic

#### ProtocolBOLIcon (Lines 118-164)
```tsx
// CURRENT - Document with fold + checkmark
<path d="M12 6h18l8 8v26a2 2 0..." />  // Document with folded corner
<path d="M30 6v8h8" />  // Corner fold
<path d="M17 26l4 4 8-8" />  // Checkmark overlay
```
**Problem:** Standard "file" icon, no logistics identity

#### ProtocolYMSIcon (Lines 166-211)
```tsx
// CURRENT - 2x2 grid + bar chart + arrow
<rect x="6" y="6" width="12" height="12" />  // Grid squares
<rect x="36" y="28" width="4" height="8" />  // Bar chart bars
<path d="M36 14l4-4 4 4M40 10v8" />  // Upward arrow
```
**Problem:** Too busy, overlapping metaphors

---

## Reference Examples for Redesign

### For ProtocolGuardIcon → Use Crosshair Pattern
From FlowIcons.tsx Line 254:
```tsx
export const Crosshair: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);
```
**Adaptation:** Concentric circles + crosshairs + checkmark overlay = "verified targeting"

### For ProtocolCommsIcon → Use Signal Pattern
From FlowIcons.tsx Line 372:
```tsx
export const Signal: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="18" r="2" fill="currentColor" />
    <path d="M8.5 14.5a5 5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 11a9 9 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 7.5a13 13 0 0 1 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);
```
**Adaptation:** Bidirectional signal pulses = "two-way communication"

### For ProtocolBOLIcon → Use Manifest + Grid Pattern
From FlowIcons.tsx Line 396:
```tsx
export const Manifest: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12..." stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
);
```
**Adaptation:** Data grid (3x3) + verification stroke = "verified data structure"

### For ProtocolYMSIcon → Use Nexus + Coordination Pattern
From FlowGlyphs.tsx Line 52:
```tsx
export function FlowGlyphCoordinationEfficiency({ title = "Coordination Efficiency", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"...>
      <circle cx="7" cy="7" r="2" />
      <circle cx="17" cy="7" r="2" />
      <circle cx="12" cy="17" r="2" />
      <path d="M9 7h6" />
      <path d="M8.5 8.5l2.5 6" />
      <path d="M15.5 8.5l-2.5 6" />
    </svg>
  );
}
```
**Adaptation:** 3-node network + central orchestration pulse = "yard orchestration"

---

## Validation

```bash
# Count icons by file
grep -c "export const\|export function" components/icons/FlowIcons.tsx  # 36
grep -c "export function" components/icons/FlowGlyphs.tsx  # 4
grep -c "export const Protocol" components/icons/ProtocolIcons.tsx  # 4

# Total: 44 icons
# Off-brand: 4 (ProtocolIcons)
```

---

## Next Steps

1. **T1A-002:** Create design specifications for 4 new ProtocolIcons
2. **T1A-003:** Get stakeholder approval on designs
3. **T1B-001-004:** Implement approved designs
