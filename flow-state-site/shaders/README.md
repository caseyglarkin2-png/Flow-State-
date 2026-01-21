# Shaders Directory

This directory contains GLSL shaders for the Variance Tax singularity experience.

## Directory Structure

```
shaders/
├── blackhole/      # Event horizon / variance visualization
│   ├── blackhole.vert
│   └── blackhole.frag
├── network/        # Particle network / fluidity visualization
│   ├── network.vert
│   └── network.frag
├── transition/     # Phase transition effects (dissolve, morph)
│   ├── dissolve.vert
│   └── dissolve.frag
├── common/         # Shared utilities (noise, color, math)
│   ├── noise.glsl
│   ├── color.glsl
│   └── math.glsl
├── test.vert       # Pipeline validation shader
└── test.frag       # Pipeline validation shader
```

## Conventions

### Naming
- Vertex shaders: `*.vert`
- Fragment shaders: `*.frag`
- Utility includes: `*.glsl`

### Uniforms
All shaders should use consistent uniform naming:

| Uniform | Type | Description |
|---------|------|-------------|
| `uTime` | `float` | Elapsed time in seconds |
| `uVarianceIndex` | `float` | 0.0 = fluidity, 1.0 = chaos |
| `uResolution` | `vec2` | Canvas resolution |
| `uMouse` | `vec2` | Normalized mouse position |
| `uProgress` | `float` | Scroll progress 0-1 |
| `uQualityTier` | `int` | 0=low, 1=medium, 2=high, 3=ultra |

### Colors (Brand Palette)
```glsl
const vec3 COLOR_VOID = vec3(0.02, 0.02, 0.02);        // #050505
const vec3 COLOR_NEON = vec3(0.0, 0.706, 1.0);         // #00B4FF
const vec3 COLOR_EMBER = vec3(1.0, 0.165, 0.0);        // #FF2A00
const vec3 COLOR_EBONY_CLAY = vec3(0.137, 0.165, 0.208); // #232A35
const vec3 COLOR_FREIGHTROLL = vec3(0.851, 0.078, 0.067); // #D91411
const vec3 COLOR_CERULEAN = vec3(0.02, 0.675, 0.922);  // #05ACEB
```

### Performance Guidelines
1. Use `uQualityTier` to branch shader complexity
2. Avoid texture lookups in favor of procedural generation when possible
3. Minimize `if` branches in fragment shaders
4. Use `smoothstep` instead of custom easing

### Testing
Run shader compilation validation:
```bash
npm run test:shaders
```

## Shader Import Usage

```typescript
import vertexShader from '@/shaders/blackhole/blackhole.vert';
import fragmentShader from '@/shaders/blackhole/blackhole.frag';

<shaderMaterial
  vertexShader={vertexShader}
  fragmentShader={fragmentShader}
  uniforms={{
    uTime: { value: 0 },
    uVarianceIndex: { value: 0.5 },
  }}
/>
```
