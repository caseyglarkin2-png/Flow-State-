# Logo Variants Preview

## How to Test

**File:** `lib/branding.ts`  
**Line 11:** Change `ACTIVE_VARIANT` value

```typescript
export const ACTIVE_VARIANT: LogoVariant = 'network';  // ← Change this
```

**Options:** `'network'` | `'flow'` | `'nexus'` | `'signal'`

After changing, rebuild (`npm run build`) and view OG preview at:
https://flow-state-uqbk.vercel.app/api/og

---

## Variant 1: NETWORK (Current Default)

**Concept:** Network node with crosshairs  
**Icon:** ⊕ (circle with cross)

```
     ○
    ╱│╲
   ○─┼─○
    ╲│╱
     ○
```

**Symbolizes:**
- Precision targeting (crosshairs on the leak)
- Interconnected facilities (network node)
- Central coordination point

**Best for:** Emphasizing the "network" in YNS, precision in solving the leak

**Vibe:** Technical, precise, coordinated

---

## Variant 2: FLOW

**Concept:** Directional arrows showing movement  
**Icon:** →○→○

```
○ ──→ ○ ──→ ○
```

**Symbolizes:**
- Viscosity → Leak → YNS narrative
- Reducing friction
- Throughput optimization
- Flow from problem to solution

**Best for:** The narrative bridge (physics → economics → solution)

**Vibe:** Dynamic, motion, progress

---

## Variant 3: NEXUS

**Concept:** 3 nodes in triangle formation  
**Icon:** Network constellation

```
    ○
   ╱ ╲
  ○───○
```

**Symbolizes:**
- Multiple facilities connected
- Network effect (3+ sites = compounding value)
- Enterprise scale
- Distributed intelligence

**Best for:** Emphasizing network effect, multi-site deployments

**Vibe:** Enterprise, scalable, interconnected

---

## Variant 4: SIGNAL

**Concept:** Waveform/pulse pattern  
**Icon:** ~∿~ (live signal)

```
    ╱╲╱╲╱╲
   ╱  ╲  ╲
  ╱    ╲  ╲
```

**Symbolizes:**
- Real-time intelligence
- Live yard activity
- Predictive ETA
- AI-powered orchestration
- "Pulse" of the yard

**Best for:** Emphasizing real-time, AI, live intelligence

**Vibe:** Tech-forward, real-time, intelligent

---

## Decision Framework

**Choose NETWORK if:**
- You want to emphasize precision (finding the leak)
- "Network coordination" is the key message
- You like the crosshair targeting aesthetic

**Choose FLOW if:**
- The Viscosity → Leak → YNS narrative is core
- You want to emphasize reducing friction
- Motion/progress resonates with customers

**Choose NEXUS if:**
- Enterprise multi-site deployments are the focus
- Network effect is the primary differentiator
- You want to show "the more you connect, the smarter it gets"

**Choose SIGNAL if:**
- Real-time intelligence is the killer feature
- AI/predictive capabilities are the main pitch
- You want a tech-forward, cutting-edge vibe

---

## Current Messaging (All Variants)

**Title:** YardFlow by FreightRoll | Yard Network System (YNS)

**OG Tagline:** Yard Network System (YNS)

**Description:**  
You don't have 50 yards. You have one yard network.  
Stop the leak.

**Keywords:** YNS, network leak diagnostic, yard viscosity, network effect

---

## Testing Checklist

- [ ] View OG preview: `/api/og`
- [ ] Share on Slack (see preview card)
- [ ] Share on LinkedIn (see preview card)
- [ ] Test on mobile (header logo)
- [ ] Check favicon in browser tab
- [ ] Screenshot for team review

**Winner gets locked in before public rebrand launch.**

---

## Technical Notes

All variants are SVG-based for:
- Perfect scaling at any size
- Tiny file size
- Color flexibility (changes with theme)
- OG image generation compatibility

Logo appears in:
- Header (24x24)
- OG images (80x80 on 1200x630 canvas)
- Social cards (Twitter, LinkedIn, Slack)
- Favicon (auto-generated)

All controlled from single config: `lib/branding.ts`
