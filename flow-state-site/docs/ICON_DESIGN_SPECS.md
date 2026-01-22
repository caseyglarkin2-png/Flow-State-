# Icon Design Specifications

> **Created:** January 22, 2026  
> **Status:** Ready for Review  
> **Purpose:** Detailed specifications for 4 new ProtocolIcons

---

## Design System Reference

### Brand Principles (from FlowIcons.tsx)

| Property | Value | Example |
|----------|-------|---------|
| ViewBox | 48x48 | `viewBox="0 0 48 48"` |
| Stroke Width | 1.5-2 primary, 1 secondary | `strokeWidth="2"` |
| Stroke Caps | Round | `strokeLinecap="round"` |
| Primary Color | currentColor / #00B4FF (neon) | `stroke={color}` |
| Opacity Layers | 0.3-0.5 for depth | `opacity="0.5"` |
| Fills | Minimal - accent dots only | `fill={color}` for center dots |

### Icon Anatomy

```
┌─────────────────────────────────────────────┐
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │   ○ Primary Geometric Shape         │    │
│  │     (Circle, polygon, grid)         │    │
│  │                                     │    │
│  │   ◌ Secondary Layer (opacity 0.5)   │    │
│  │     (Inner ring, support lines)     │    │
│  │                                     │    │
│  │   ● Accent Point (solid fill)       │    │
│  │     (Center dot, verification)      │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  Padding: 4-6px from viewBox edge           │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Icon 1: ProtocolGuardIcon

### Concept: "Verified Targeting"

**Metaphor:** Concentric circles (precision) + crosshairs (targeting) + checkmark (verified)

**Visual Description:**
```
        ┌──────┐
        │  ↑   │
    ────●──────●────
        │      │
   ┌────┼──────┼────┐
   │    │  ○   │    │  ← Outer ring (r=20)
   │   ┌┼──────┼┐   │
   │   ││  ●   ││   │  ← Inner ring (r=12) + center dot
   │   └┼──────┼┘   │
   │    │  ✓   │    │  ← Checkmark overlay
   └────┼──────┼────┘
        │      │
    ────●──────●────
        │  ↓   │
        └──────┘
```

**SVG Specification:**
```tsx
<svg viewBox="0 0 48 48" fill="none">
  {/* Outer targeting ring */}
  <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="1.5" />
  
  {/* Inner confidence ring */}
  <circle cx="24" cy="24" r="10" stroke={color} strokeWidth="1.5" opacity="0.4" />
  
  {/* Crosshair lines */}
  <path d="M24 4v8 M24 36v8 M4 24h8 M36 24h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  
  {/* Verification checkmark (centered, bold) */}
  <path d="M18 24l4 4 8-8" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
```

**Rationale:**
- Crosshair = precision identity verification ("targeting the right carrier")
- Concentric rings = layers of security
- Checkmark = verified, approved
- Avoids: shields, locks, padlocks (skeuomorphic security metaphors)

**Accessibility:**
- `aria-label="Digital Guard - Verify carrier identity at the gate"`

---

## Icon 2: ProtocolCommsIcon

### Concept: "Bidirectional Pulse"

**Metaphor:** Two-way signal flow with central connection point

**Visual Description:**
```
        ╱─────────╲
       ╱  ←pulse   ╲
      ╱             ╲
     ◀───────●───────▶
      ╲             ╱
       ╲  pulse→   ╱
        ╲─────────╱
```

**SVG Specification:**
```tsx
<svg viewBox="0 0 48 48" fill="none">
  {/* Left signal pulse (incoming) */}
  <path d="M8 16a12 12 0 0 1 0 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  <path d="M14 20a6 6 0 0 1 0 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  
  {/* Right signal pulse (outgoing) */}
  <path d="M40 16a12 12 0 0 0 0 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  <path d="M34 20a6 6 0 0 0 0 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  
  {/* Horizontal connection line */}
  <path d="M18 24h12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  
  {/* Central hub */}
  <circle cx="24" cy="24" r="4" stroke={color} strokeWidth="1.5" />
  <circle cx="24" cy="24" r="1.5" fill={color} />
</svg>
```

**Rationale:**
- Bidirectional pulses = two-way communication
- Central hub = message routing/processing
- Horizontal line = connection/link
- Avoids: speech bubbles, chat dots, phone shapes

**Accessibility:**
- `aria-label="Digital Comms - Real-time two-way messaging"`

---

## Icon 3: ProtocolBOLIcon

### Concept: "Verified Data Grid"

**Metaphor:** Structured data (3x3 grid) with verification overlay

**Visual Description:**
```
     ┌───┬───┬───┐
     │ ▫ │ ▫ │ ▫ │
     ├───┼───┼───┤
     │ ▫ │ ✓ │ ▫ │  ← Checkmark across grid
     ├───┼───┼───┤
     │ ▫ │ ▫ │ ▫ │
     └───┴───┴───┘
```

**SVG Specification:**
```tsx
<svg viewBox="0 0 48 48" fill="none">
  {/* 3x3 data grid - 9 cells */}
  <rect x="8" y="8" width="10" height="10" stroke={color} strokeWidth="1" opacity="0.4" />
  <rect x="19" y="8" width="10" height="10" stroke={color} strokeWidth="1" opacity="0.4" />
  <rect x="30" y="8" width="10" height="10" stroke={color} strokeWidth="1" opacity="0.4" />
  <rect x="8" y="19" width="10" height="10" stroke={color} strokeWidth="1" opacity="0.4" />
  <rect x="19" y="19" width="10" height="10" stroke={color} strokeWidth="1" opacity="0.4" />
  <rect x="30" y="19" width="10" height="10" stroke={color} strokeWidth="1" opacity="0.4" />
  <rect x="8" y="30" width="10" height="10" stroke={color} strokeWidth="1" opacity="0.4" />
  <rect x="19" y="30" width="10" height="10" stroke={color} strokeWidth="1" opacity="0.4" />
  <rect x="30" y="30" width="10" height="10" stroke={color} strokeWidth="1" opacity="0.4" />
  
  {/* Verification checkmark overlay (spans grid diagonally) */}
  <path d="M14 26l8 8 16-18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
```

**Rationale:**
- 3x3 grid = structured data fields (BOL has many data points)
- Checkmark overlay = verified, validated, immutable
- Grid opacity = data is backdrop, verification is foreground
- Avoids: document shapes, paper folds, clipboard metaphors

**Accessibility:**
- `aria-label="Digital BOL - Verified proof of lading and delivery"`

---

## Icon 4: ProtocolYMSIcon

### Concept: "Network Orchestration"

**Metaphor:** 3-node triangular network with central control pulse

**Visual Description:**
```
           ●
          ╱ ╲
         ╱   ╲
        ╱  ◎  ╲  ← Central orchestration pulse
       ╱   │   ╲
      ●────┼────●
           │
        (pulse)
```

**SVG Specification:**
```tsx
<svg viewBox="0 0 48 48" fill="none">
  {/* Three yard nodes (triangular layout) */}
  <circle cx="24" cy="8" r="4" stroke={color} strokeWidth="1.5" />
  <circle cx="24" cy="8" r="1.5" fill={color} />
  
  <circle cx="10" cy="38" r="4" stroke={color} strokeWidth="1.5" />
  <circle cx="10" cy="38" r="1.5" fill={color} />
  
  <circle cx="38" cy="38" r="4" stroke={color} strokeWidth="1.5" />
  <circle cx="38" cy="38" r="1.5" fill={color} />
  
  {/* Connection lines between nodes */}
  <path d="M24 12L12 34 M24 12L36 34 M14 38h20" stroke={color} strokeWidth="1.5" opacity="0.4" />
  
  {/* Central orchestration hub */}
  <circle cx="24" cy="26" r="6" stroke={color} strokeWidth="1.5" />
  <circle cx="24" cy="26" r="2" fill={color} />
  
  {/* Pulse rings from center */}
  <circle cx="24" cy="26" r="10" stroke={color} strokeWidth="1" opacity="0.3" />
</svg>
```

**Rationale:**
- 3 nodes = yard locations being orchestrated
- Central hub = YardFlow as the orchestration layer
- Pulse rings = real-time visibility radiating out
- Triangle = stability, control structure
- Avoids: grid/chart combinations, arrow overlays, dashboard metaphors

**Accessibility:**
- `aria-label="Digital YMS - Yard orchestration and visibility"`

---

## Size Variants

All icons must render correctly at these sizes:

| Size | Use Case | Stroke Scaling |
|------|----------|----------------|
| 24px | Inline text, small UI | strokeWidth × 0.5 |
| 32px | Button icons, nav | strokeWidth × 0.67 |
| 48px | Default, cards | strokeWidth × 1.0 |
| 64px | Hero sections | strokeWidth × 1.33 |

**Implementation:**
```tsx
const strokeScale = size / 48;
// Apply to all strokeWidth values
```

---

## Color Variants

| Variant | Color | Use Case |
|---------|-------|----------|
| Neon | #00B4FF | Active, highlighted states |
| Steel | #888888 | Inactive, disabled states |
| White | #FFFFFF | Dark background contexts |
| Ember | #FF2A00 | Error/alert states |

**Implementation:**
```tsx
color = defaultProps.color || '#00B4FF';
// Pass to stroke and fill attributes
```

---

## Side-by-Side Comparison

### Current vs Proposed

| Module | Current Aesthetic | Proposed Aesthetic |
|--------|-------------------|-------------------|
| Guard | Shield with padlock | Crosshair + concentric rings + checkmark |
| Comms | Chat bubble with waves | Bidirectional pulses + central hub |
| BOL | Document with fold | 3x3 data grid + checkmark overlay |
| YMS | Grid + bar chart | Triangular network + orchestration pulse |

---

## Validation Checklist

Before implementation, verify each icon meets:

- [ ] No skeuomorphic elements (shields, documents, chat bubbles)
- [ ] Stroke-based with minimal fills
- [ ] Uses opacity layers for depth
- [ ] Visually distinct from other 3 icons at glance
- [ ] Maintains clarity at 24px size
- [ ] Matches FlowIcons aesthetic when placed side-by-side

---

## Approval

**Design Status:** Ready for stakeholder review

| Reviewer | Date | Status | Notes |
|----------|------|--------|-------|
| Stakeholder | — | ⏳ Pending | — |

**Sign-off:** ___________________________ Date: ___________

---

## Next Steps

1. Present designs for stakeholder approval
2. If approved, proceed to T1B-001 through T1B-004
3. If revisions needed, document feedback and iterate
