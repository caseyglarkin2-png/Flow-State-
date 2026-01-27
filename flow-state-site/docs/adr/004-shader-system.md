# ADR-004: GLSL Shader System

## Status
Accepted

## Date
January 2026

## Context

YardFlow features interactive 3D visualizations:
- Variance Tax "singularity" effect
- Particle network representing facility connections
- Phase transitions (chaos → audit → solution)

Requirements:
- Performant across device capabilities
- Consistent with brand colors
- Responsive to user interaction
- Accessible (reduced motion support)

Options considered:
1. **CSS animations** - Limited to 2D, no WebGL effects
2. **Canvas 2D** - Good performance, limited effects
3. **Three.js + R3F** - Full WebGL, React integration
4. **Raw WebGL** - Maximum control, maximum complexity

## Decision

Use **Three.js with React Three Fiber (R3F)** and custom GLSL shaders.

Reasons:
- React integration via R3F
- Custom shaders for brand-specific effects
- Declarative 3D scene management
- Built-in accessibility hooks
- Active community and ecosystem

## Consequences

### Positive
- Full creative control over visuals
- Shader effects match brand identity exactly
- GPU-accelerated performance
- Responsive to quality tier detection

### Negative
- GLSL syntax errors are runtime failures
- Requires shader expertise to modify
- Larger bundle size (~100kb for Three.js)
- Testing shaders is non-trivial

### Implementation

**Directory Structure:**
```
shaders/
├── blackhole/          # Event horizon
│   ├── blackhole.vert
│   └── blackhole.frag
├── network/            # Particle network
│   ├── network.vert
│   └── network.frag
├── common/             # Shared utilities
│   ├── noise.glsl
│   └── color.glsl
└── test.vert           # Pipeline validation
```

**Uniform Contract:**

| Uniform | Type | Description |
|---------|------|-------------|
| `uTime` | float | Elapsed seconds |
| `uVarianceIndex` | float | 0.0 = fluidity, 1.0 = chaos |
| `uQualityTier` | int | 0=low, 1=med, 2=high, 3=ultra |
| `uProgress` | float | Scroll position 0-1 |
| `uPhase` | int | Narrative phase 0-2 |

**Quality Tiers:**

```typescript
// Adapt shader complexity based on device
const qualityTier = usePerformanceStore((s) => s.qualityTier);

if (qualityTier === 'low') {
  // Reduce particle count
  // Skip post-processing
  // Use simpler noise functions
}
```

**Testing:**

```bash
# Validate GLSL syntax before commit
npm run test:shaders
```

### Accessibility

- Check `prefers-reduced-motion` media query
- `usePerformanceStore.reducedMotion` flag
- Fallback to static images when WebGL unavailable
- Never use motion as the only way to convey information
