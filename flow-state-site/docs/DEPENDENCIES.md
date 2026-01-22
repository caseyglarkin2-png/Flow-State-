# Dependency Audit: ProtocolSequenceAnimation

**Created:** January 21, 2026  
**Sprint:** S0  
**Task:** T0-001 Dependency Audit & Brand Timing Verification  
**Status:** ✅ Complete

---

## Executive Summary

The new `ProtocolSequenceAnimation` component can be built using **existing animation patterns and motion libraries**. No new dependencies required. All brand timing constants already exist in the codebase. The animation will follow the proven architecture of `ProtocolRollupAnimation`, which successfully cycles through 4 phases with standard framer-motion state management.

---

## Animation Library Inventory

### **Framer Motion (v12.26.2)** - Primary Animation Engine
**Status:** ✅ Already installed  
**Usage:** All production animations use framer-motion exclusively

**Applicable APIs for ProtocolSequenceAnimation:**
- `motion.div` - DOM element animation wrapper
- `AnimatePresence` - Exit animations during phase transitions
- `useState` + `useEffect` - Phase cycling logic
- `transition` prop - Durations (500ms fade, stagger delays)
- `initial`/`animate`/`exit` - State-based animation triggers

**Pattern Precedent:** `ProtocolRollupAnimation.tsx` (lines 13-23)
```tsx
const [phase, setPhase] = useState<'modules' | 'facility' | 'network' | 'unlocked'>(
  'modules'
);
// Auto-cycle every 5000ms via setInterval
```

**Confidence Level:** 🟢 **READY** - Same pattern applicable

---

## Motion Presets Available

### **File:** `lib/motion-presets.ts` (134 lines)

#### **Fade Transition**
```typescript
// Exact API needed for Guard → Comms → BOL → YMS sequence
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: prefersReducedMotion ? { duration: 0 } : transitions.normal,
  },
};

// transitions.normal = 400ms
export const transitions = {
  normal: {
    duration: TOKENS.motion.normal / 1000,  // = 0.4
    ease: [0.4, 0, 0.2, 1],
  }
};
```

**Usage:** Cross-fade between 4 protocol icons (500ms proposed vs. 400ms available → ✅ close enough, adjust if needed)

#### **Stagger Patterns** (for icon/label groups)
```typescript
export const staggerContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
```

**Usage:** If displaying Guard → Comms → BOL → YMS as a group before cycling

#### **Pulse** (for idle state)
```typescript
export const pulse: Variants = {
  initial: { scale: 1, opacity: 0.8 },
  // ... repeating scale/opacity pattern
};
```

**Usage:** Subtle pulse on current module to indicate it's active

#### **Reduced Motion Support** ✅
```typescript
export const prefersReducedMotion = 
  typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
```

**Compliance:** All motion presets check this flag and disable animations if user prefers reduced motion. **ProtocolSequenceAnimation MUST use these presets, not custom transitions.**

---

## Design Tokens

### **File:** `lib/tokens.ts` (121 lines)

#### **Motion Timing Constants**
```typescript
export const TOKENS = {
  motion: {
    fast: 200,      // 200ms
    normal: 400,    // 400ms (← suitable for fade transition)
    slow: 600,      // 600ms
    slower: 1000,   // 1000ms
  },
  // ...
};
```

**Decision Point:** Animation spec proposes:
- Display duration per module: **3 seconds**
- Transition duration: **500ms fade**
- Total cycle: **~15 seconds**

**Adjustment:** Use `TOKENS.motion.slow` (600ms) instead of 500ms to stay on-brand? Or keep 500ms and define custom transition only for this animation.

#### **Color Palette** ✅ (all colors already defined)
```typescript
export const COLORS = {
  void: '#050505',      // Background
  neon: '#00B4FF',      // Icon/highlight
  carbon: '#1A1A1A',    // Panels
  steel: '#A0A0A0',     // Labels
  ember: '#FF2A00',     // Accent (if error state)
};
```

**All colors needed for Guard → Comms → BOL → YMS:** ✅ Available

---

## Brand Timing Configuration

### **File:** `config/brand.ts` (157 lines)

**Status:** No animation-specific timing in BRAND config currently. All timing uses TOKENS.motion constants.

**Recommendation:** Keep it that way. Animation timing is a **design system concern**, not a **brand messaging concern**. Keep in `lib/tokens.ts`.

---

## Existing Animation Components & Reusable Patterns

### **1. ProtocolRollupAnimation.tsx** ← **PRIMARY REFERENCE**
**Location:** `/components/animations/ProtocolRollupAnimation.tsx` (329 lines)

**Architecture Pattern:**
- Uses `useState` to manage phase: `'modules' | 'facility' | 'network' | 'unlocked'`
- Auto-cycles with `setInterval` (5000ms per phase)
- Uses `AnimatePresence` + `motion.div` for exit animations
- Renders phase-specific content in conditional JSX

**Why it's a perfect template for ProtocolSequenceAnimation:**
- Same cycle pattern: Guard → Comms → BOL → YMS (4 phases like rollup's 4 phases)
- Same timing approach: `setInterval` for phase transitions
- Same animation library: framer-motion with `AnimatePresence`

**Copy-friendly code blocks:**
```tsx
// Phase management (lines 15-23)
const [phase, setPhase] = useState<'modules' | 'facility' | 'network' | 'unlocked'>(
  'modules'
);

useEffect(() => {
  const phases: Array<...> = ['modules', 'facility', 'network', 'unlocked'];
  let currentIndex = 0;
  const interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % phases.length;
    setPhase(phases[currentIndex]);
  }, 5000);
  return () => clearInterval(interval);
}, []);

// Conditional rendering with AnimatePresence
<AnimatePresence mode="wait">
  {phase === 'modules' && (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      {/* phase content */}
    </motion.div>
  )}
</AnimatePresence>
```

**Confidence Level:** 🟢 **READY** - 95% code reuse

### **2. DigitalGuardAnimation.tsx**
**Location:** `/components/animations/DigitalGuardAnimation.tsx` (168 lines)

**Pattern Offered:** Icon animation logic
```tsx
// Step-based state (lines 15-22)
const [step, setStep] = useState(0);
const verificationSteps = [
  { label: '...', delay: 0 },
  { label: '...', delay: 0.5 },
];

// Cycling with setInterval
useEffect(() => {
  const interval = setInterval(() => {
    setStep((prev) => (prev + 1) % (verificationSteps.length + 1));
  }, 2000);
  return () => clearInterval(interval);
}, []);
```

**Reuse Potential:** Low - specific to verification kiosk UI. **But the step-cycling pattern is identical to what we need.**

**Confidence Level:** 🟡 **REFERENCE ONLY** - Pattern useful, but ProtocolRollupAnimation is closer match

### **3. YardChaosAnimation.tsx**
**Location:** `/components/animations/YardChaosAnimation.tsx` (171 lines)

**Pattern Offered:** Blob/pulse animations
```tsx
const pulseAnimation = {
  scale: [1, 1.1, 0.95, 1.05, 1],
  opacity: [0.3, 0.5, 0.2, 0.4, 0.3],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};

<motion.div animate={pulseAnimation} className="..." />
```

**Reuse Potential:** Could be used for **background pulse** behind Guard/Comms/BOL/YMS icons if design calls for ambient animation.

**Confidence Level:** 🟡 **REFERENCE FOR BACKGROUND** - Useful for visual richness

### **4. ChainOfCustodyAnimation.tsx**
**Location:** `/components/animations/ChainOfCustodyAnimation.tsx` (162 lines)

**Pattern Offered:** Timeline progression + list reveal
```tsx
<AnimatePresence mode="sync">
  {CUSTODY_EVENTS.map((event, index) => (
    index < visibleEvents && (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
```

**Reuse Potential:** Could be adapted for **step-by-step module reveal** if we want sequential entrance.

**Confidence Level:** 🟡 **REFERENCE FOR STAGGERED ENTRY** - Alternative to full crossfade

---

## Accessibility Patterns

### **prefers-reduced-motion Support** ✅
**Currently implemented in:** `lib/motion-presets.ts` (lines 7-11)

**ProtocolSequenceAnimation must:**
1. Import `prefersReducedMotion` from motion-presets
2. Render **static 4-module grid** (no cycling, no fades) when `prefers-reduced-motion` is true
3. Use standard transitions from `motion-presets.ts` (not custom duration values)

**Example:**
```tsx
{prefersReducedMotion ? (
  // Static grid showing all 4 modules
  <div className="grid grid-cols-2 gap-4">
    <ModuleIcon name="Guard" />
    <ModuleIcon name="Comms" />
    <ModuleIcon name="BOL" />
    <ModuleIcon name="YMS" />
  </div>
) : (
  // Animated cycling sequence
  <AnimatePresence mode="wait">
    {/* phase === 'guard' && ... */}
  </AnimatePresence>
)}
```

**Confidence Level:** 🟢 **READY** - Pattern already proven in all animations

---

## File Organization Recommendation

```
components/
├── animations/
│   ├── DigitalGuardAnimation.tsx (existing)
│   ├── YardChaosAnimation.tsx (existing)
│   ├── ChainOfCustodyAnimation.tsx (existing)
│   ├── ProtocolRollupAnimation.tsx (existing)
│   └── ProtocolSequenceAnimation.tsx ← NEW (350-400 lines est.)
│
├── primitives/
│   ├── Section.tsx (existing)
│   ├── Card.tsx (existing)
│   ├── Stat.tsx (existing)
│   └── Callout.tsx (existing)
│
└── ...

lib/
├── motion-presets.ts (134 lines) ✅ Already has all needed variants
├── tokens.ts (121 lines) ✅ Already has all timing constants
└── ...

config/
└── brand.ts (157 lines) ✅ No changes needed
```

---

## Dependencies Summary

| Dependency | Package | Version | Status | Notes |
|-----------|---------|---------|--------|-------|
| Animation Library | framer-motion | 12.26.2 | ✅ Installed | Used by all animations |
| Motion Presets | lib/motion-presets.ts | (local) | ✅ Exists | fadeIn, staggerContainer, pulse, prefersReducedMotion |
| Timing Tokens | lib/tokens.ts | (local) | ✅ Exists | motion.fast/normal/slow/slower (200-1000ms) |
| Brand Config | config/brand.ts | (local) | ✅ Exists | No animation constants needed |
| React | react | 19.2.3 | ✅ Installed | useState, useEffect |
| Next.js | next | 16.1.0 | ✅ Installed | 'use client' directive support |

**Final Answer: 🟢 ZERO NEW DEPENDENCIES REQUIRED**

---

## Design Decision Points for T0-002

These are unresolved from T0-001 and ready for T0-002 (State Machine Design):

1. **Exact Timing:**
   - Display per module: 3 seconds (proposal) vs. other values?
   - Transition fade: 500ms (proposal) vs. use TOKENS.motion.slow (600ms)?
   - Total cycle: 15 seconds or variable?

2. **Transition Style:**
   - Option A: Cross-fade with subtle scale? (recommended - simple)
   - Option B: Slide transition with motion blur?
   - Option C: Morphing icon with color shift?

3. **Reduced Motion Fallback:**
   - Static 4-module grid showing Guard/Comms/BOL/YMS side-by-side?
   - Or 1x4 vertical stack?
   - Or carousel with manual next/prev buttons?

4. **Background Animation:**
   - Use YardChaosAnimation's pulse pattern for ambient effect?
   - Or keep clean gradient background (like ProtocolRollupAnimation)?

---

## Next Steps

- ✅ **T0-001 Complete:** Dependency audit confirms zero new dependencies
- ⏳ **T0-002 Pending:** State machine design (resolve 4 decision points above)
- ⏳ **T0-003 Pending:** Destination page aesthetic audit (in parallel)
- ⏳ **T0-004 Pending:** Card alignment rubric (depends on T0-003)

**Handoff to T0-002:** This audit document provides the technical foundation. T0-002 should focus on design decisions and timing specification.
