# YardFlow Branding System

## Quick Logo Testing

Want to test different logos before the public rebrand launch? Just edit one line:

**File:** `lib/branding.ts`

**Line 11:** Change `ACTIVE_VARIANT` to one of these:

```typescript
export const ACTIVE_VARIANT: LogoVariant = 'network';  // Current (network node with crosshairs)
export const ACTIVE_VARIANT: LogoVariant = 'flow';     // Flow arrows (viscosity → leak → YNS)
export const ACTIVE_VARIANT: LogoVariant = 'nexus';    // Multi-node network (3 facilities)
export const ACTIVE_VARIANT: LogoVariant = 'signal';   // Live signal/pulse (real-time intelligence)
```

Save the file, rebuild, and the new logo appears everywhere:
- Header
- OG images (LinkedIn, Twitter previews)
- Favicons
- All social cards

## Logo Variants

### 1. `network` (Current)
**Concept:** Network node with crosshairs  
**Vibe:** Precision, coordination, targeting the leak  
**Best for:** Emphasizes interconnected facilities

### 2. `flow`
**Concept:** Flow arrows showing movement  
**Vibe:** Reducing friction, optimizing throughput  
**Best for:** Viscosity → Leak → YNS narrative

### 3. `nexus`
**Concept:** 3 nodes connected (triangle formation)  
**Vibe:** Network effect, multiple facilities  
**Best for:** Enterprise scale, compounding returns

### 4. `signal`
**Concept:** Pulse/waveform (real-time activity)  
**Vibe:** Live intelligence, predictive ETA  
**Best for:** Real-time orchestration, AI-powered

## Testing Workflow

1. **Change variant** in `lib/branding.ts`
2. **Rebuild:** `npm run build` (or dev server auto-reloads)
3. **Preview OG image:** Visit `https://flow-state-uqbk.vercel.app/api/og`
4. **Test social share:** Share any page on Slack/LinkedIn to see preview
5. **Repeat** until you find the winner

## Messaging Updates

All messaging now reflects the strategic refactor:

**Old:** "Yard Orchestration & Security"  
**New:** "Yard Network System (YNS)"

**Old:** "Yard orchestration platform with..."  
**New:** "Stop the network leak. You don't have 50 yards—you have one yard network."

**Keywords added:**
- Yard Network System
- YNS
- Network leak diagnostic
- Yard viscosity
- Network effect

## Files Updated

- `lib/branding.ts` - Single source of truth for logos & messaging
- `app/api/og/route.tsx` - OG image generation (uses branding config)
- `app/layout.tsx` - Site-wide metadata (uses branding config)

All messaging is now centralized. Change `SITE_METADATA` in `branding.ts` to update everywhere at once.

## Production URL

**Live site:** https://flow-state-klbt.vercel.app/

(Previously referenced wrong URL - now corrected everywhere)
