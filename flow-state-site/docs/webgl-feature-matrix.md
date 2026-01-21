# WebGL Feature Matrix

## Overview

This document defines the WebGL features used by the Variance Tax Singularity visualization and how they map to quality tiers.

---

## WebGL Version Requirements

| Feature | WebGL1 | WebGL2 | Fallback |
|---------|--------|--------|----------|
| Basic Rendering | ✅ | ✅ | Static image |
| Instanced Particles | Extension | Native | Reduced count |
| Float Textures | Extension | Native | Simplified effects |
| Vertex Array Objects | Extension | Native | Per-draw binding |
| Depth Textures | Extension | Native | No shadow effects |

---

## Feature Detection

### Required Features (No Fallback)
These features must be available or the fallback static image is shown:

1. **Basic WebGL Context** - Either WebGL1 or WebGL2
2. **Shader Compilation** - Must compile vertex/fragment shaders
3. **Texture Support** - At least 2048x2048 max size

### Optional Features (Graceful Degradation)
These features enhance quality but have fallbacks:

| Feature | Extension Name | Used For | Fallback |
|---------|---------------|----------|----------|
| Float Textures | `OES_texture_float` | Particle positions | Byte textures |
| Instancing | `ANGLE_instanced_arrays` | Particle rendering | Draw calls loop |
| Anisotropic Filtering | `EXT_texture_filter_anisotropic` | Texture quality | Bilinear |
| Depth Texture | `WEBGL_depth_texture` | Shadow effects | No shadows |
| VAO | `OES_vertex_array_object` | Performance | Per-call binding |

---

## Quality Tier Mapping

### Ultra Tier (Score ≥70)
- **GPU Examples:** RTX 3000/4000, RX 6000/7000, M2/M3/M4
- **Particle Count:** 5,000
- **Raymarch Steps:** 64
- **Effects:** Full bloom, dissolve transition, high shadows

### High Tier (Score 50-69)
- **GPU Examples:** GTX 1000/2000, RX 5000, M1, Intel Iris Xe
- **Particle Count:** 2,500
- **Raymarch Steps:** 48
- **Effects:** Bloom, dissolve, low shadows

### Medium Tier (Score 30-49)
- **GPU Examples:** Intel UHD, Mali-G77+, Adreno 600+
- **Particle Count:** 1,000
- **Raymarch Steps:** 32
- **Effects:** No bloom, dissolve enabled, no shadows

### Low Tier (Score 10-29)
- **GPU Examples:** Intel HD 4000/5000, Mali-G52, Adreno 500
- **Particle Count:** 500
- **Raymarch Steps:** 16
- **Effects:** Simplified, no animations

### Fallback (Score <10)
- **GPU Examples:** WebGL unavailable, Intel GMA, very old mobile
- **Display:** Static gradient image
- **Note:** Calculator remains fully functional

---

## Scoring Algorithm

```typescript
// Base score from WebGL version
if (version === 2) score += 20;

// Texture capabilities
if (maxTextureSize >= 16384) score += 15;
else if (maxTextureSize >= 8192) score += 10;
else if (maxTextureSize >= 4096) score += 5;

// Feature support
if (floatTextures) score += 10;
if (instancing) score += 15;
if (vao) score += 5;
if (anisotropicFiltering && maxAnisotropy >= 8) score += 5;

// Platform adjustments
if (isAppleSilicon) score += 20;
if (isMobile) score -= 15;

// GPU-specific scoring based on renderer string
```

---

## Browser-Specific Notes

### Chrome/Edge (Chromium)
- Best WebGL2 support
- ANGLE layer provides consistent behavior
- Generally highest performance tier

### Firefox
- Good WebGL2 support
- Some shader compilation differences
- Test precision qualifiers

### Safari
- WebGL2 support varies by version
- Metal backend on macOS
- **Requires explicit `highp` precision qualifiers**
- Test dissolve transition specifically

### Mobile Safari (iOS)
- WebGL2 on iOS 15+
- Memory pressure can cause context loss
- Aggressive quality tier reduction recommended

---

## Context Loss Handling

WebGL contexts can be lost due to:
- GPU driver reset
- Too many WebGL contexts
- Memory pressure on mobile
- Tab backgrounding

**Handling Strategy:**
1. Listen for `webglcontextlost` event
2. Prevent default to allow restoration
3. Listen for `webglcontextrestored` event
4. Reinitialize all WebGL resources
5. Show loading indicator during recovery

---

## Performance Budget

| Metric | Target | Degradation Action |
|--------|--------|-------------------|
| FPS | ≥55 | Reduce quality tier |
| Frame Time | <18ms | Reduce particles |
| GPU Memory | <256MB | Reduce texture sizes |
| Draw Calls | <50 | Enable instancing |

---

## Files

- **Detection:** `/src/lib/webgl/capabilities.ts`
- **Performance Store:** `/src/lib/performance/performanceStore.ts`
- **Quality Manager:** `/components/three/QualityManager.tsx`
