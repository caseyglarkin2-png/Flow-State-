/**
 * Black Hole Raymarching Fragment Shader
 * 
 * Schwarzschild-inspired black hole with gravitational lensing
 * and animated accretion disk.
 * 
 * Uniforms:
 *   uTime       - Animation time in seconds
 *   uViscosity  - Variance state (0 = laminar, 1 = turbulent)
 *   uResolution - Canvas resolution
 *   uProgress   - Dissolve progress (0 = visible, 1 = dissolved)
 *   uMouse      - Mouse position (0-1)
 *   uQuality    - Quality tier (0-3)
 */

precision highp float;

// Uniforms
uniform float uTime;
uniform float uViscosity;
uniform vec2 uResolution;
uniform float uProgress;
uniform vec2 uMouse;
uniform int uQuality; // 0=low, 1=medium, 2=high, 3=ultra

// Varyings
varying vec2 vUv;

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

// Black hole parameters
const float EVENT_HORIZON_RADIUS = 0.15;
const float PHOTON_SPHERE_RADIUS = 0.225;
const float ACCRETION_INNER = 0.2;
const float ACCRETION_OUTER = 0.6;

// Brand colors
const vec3 COLOR_VOID = vec3(0.051, 0.059, 0.071);
const vec3 COLOR_NEON = vec3(0.0, 1.0, 0.533);
const vec3 COLOR_RED = vec3(0.851, 0.078, 0.067);
const vec3 COLOR_CERULEAN = vec3(0.02, 0.675, 0.922);

// ═══════════════════════════════════════════════════════════════════
// NOISE FUNCTIONS (Inlined for single-file shader)
// ═══════════════════════════════════════════════════════════════════

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289v2(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        value += amplitude * snoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// ═══════════════════════════════════════════════════════════════════
// COLOR UTILITIES
// ═══════════════════════════════════════════════════════════════════

vec3 rgb2hsl(vec3 c) {
    float maxC = max(c.r, max(c.g, c.b));
    float minC = min(c.r, min(c.g, c.b));
    float l = (maxC + minC) * 0.5;
    if (maxC == minC) return vec3(0.0, 0.0, l);
    float d = maxC - minC;
    float s = l > 0.5 ? d / (2.0 - maxC - minC) : d / (maxC + minC);
    float h;
    if (c.r == maxC) h = (c.g - c.b) / d + (c.g < c.b ? 6.0 : 0.0);
    else if (c.g == maxC) h = (c.b - c.r) / d + 2.0;
    else h = (c.r - c.g) / d + 4.0;
    return vec3(h / 6.0, s, l);
}

float hue2rgb(float p, float q, float t) {
    if (t < 0.0) t += 1.0;
    if (t > 1.0) t -= 1.0;
    if (t < 1.0/6.0) return p + (q - p) * 6.0 * t;
    if (t < 1.0/2.0) return q;
    if (t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
    return p;
}

vec3 hsl2rgb(vec3 hsl) {
    if (hsl.y < 0.001) return vec3(hsl.z);
    float q = hsl.z < 0.5 ? hsl.z * (1.0 + hsl.y) : hsl.z + hsl.y - hsl.z * hsl.y;
    float p = 2.0 * hsl.z - q;
    return vec3(hue2rgb(p, q, hsl.x + 1.0/3.0), hue2rgb(p, q, hsl.x), hue2rgb(p, q, hsl.x - 1.0/3.0));
}

vec3 lerpHSL(vec3 a, vec3 b, float t) {
    vec3 hslA = rgb2hsl(a);
    vec3 hslB = rgb2hsl(b);
    float hueDiff = hslB.x - hslA.x;
    if (hueDiff > 0.5) hslB.x -= 1.0;
    if (hueDiff < -0.5) hslB.x += 1.0;
    vec3 result = mix(hslA, hslB, t);
    result.x = fract(result.x);
    return hsl2rgb(result);
}

// ═══════════════════════════════════════════════════════════════════
// GRAVITATIONAL LENSING
// ═══════════════════════════════════════════════════════════════════

vec2 gravitationalLens(vec2 uv, vec2 center, float mass) {
    vec2 toCenter = center - uv;
    float dist = length(toCenter);
    
    // Prevent division by zero
    if (dist < 0.001) return uv;
    
    // Einstein ring effect - stronger bending near center
    float deflection = mass / (dist * dist + 0.01);
    deflection = min(deflection, 0.8); // Clamp to prevent extreme distortion
    
    vec2 offset = normalize(toCenter) * deflection;
    return uv + offset;
}

// ═══════════════════════════════════════════════════════════════════
// ACCRETION DISK
// ═══════════════════════════════════════════════════════════════════

vec3 accretionDisk(vec2 uv, vec2 center, float time) {
    vec2 toCenter = uv - center;
    float dist = length(toCenter);
    float angle = atan(toCenter.y, toCenter.x);
    
    // Disk mask
    float innerMask = smoothstep(ACCRETION_INNER, ACCRETION_INNER + 0.05, dist);
    float outerMask = smoothstep(ACCRETION_OUTER, ACCRETION_OUTER - 0.1, dist);
    float diskMask = innerMask * outerMask;
    
    if (diskMask < 0.001) return vec3(0.0);
    
    // Rotation animation
    float rotationSpeed = 0.3;
    float rotatedAngle = angle + time * rotationSpeed;
    
    // Spiral arms using noise
    int noiseOctaves = uQuality >= 2 ? 4 : 2;
    float spiral = fbm(vec2(rotatedAngle * 3.0, dist * 10.0 - time * 0.5), noiseOctaves);
    
    // Radial brightness (brighter near center)
    float radialBrightness = 1.0 - smoothstep(ACCRETION_INNER, ACCRETION_OUTER, dist);
    radialBrightness = pow(radialBrightness, 1.5);
    
    // Turbulence based on viscosity
    float turbulence = 0.0;
    if (uQuality >= 1) {
        turbulence = fbm(toCenter * 8.0 + time * 0.2, noiseOctaves) * uViscosity;
    }
    
    // Final disk intensity
    float intensity = diskMask * radialBrightness * (0.5 + spiral * 0.5 + turbulence * 0.3);
    intensity = clamp(intensity, 0.0, 1.0);
    
    // Color based on viscosity (red = turbulent, blue = laminar)
    vec3 turbulentColor = vec3(1.0, 0.3, 0.1);
    vec3 laminarColor = vec3(0.3, 0.6, 1.0);
    vec3 diskColor = lerpHSL(laminarColor, turbulentColor, uViscosity);
    
    // Add hot spots
    vec3 hotColor = vec3(1.0, 0.9, 0.7);
    float hotSpots = pow(spiral * 0.5 + 0.5, 4.0) * radialBrightness;
    diskColor = mix(diskColor, hotColor, hotSpots * 0.5);
    
    return diskColor * intensity;
}

// ═══════════════════════════════════════════════════════════════════
// EVENT HORIZON
// ═══════════════════════════════════════════════════════════════════

float eventHorizon(vec2 uv, vec2 center) {
    float dist = length(uv - center);
    
    // Sharp cutoff at event horizon
    float horizon = smoothstep(EVENT_HORIZON_RADIUS, EVENT_HORIZON_RADIUS - 0.02, dist);
    
    return horizon;
}

// ═══════════════════════════════════════════════════════════════════
// PHOTON SPHERE GLOW
// ═══════════════════════════════════════════════════════════════════

vec3 photonSphereGlow(vec2 uv, vec2 center) {
    float dist = length(uv - center);
    
    // Glow ring at photon sphere
    float glowRing = 1.0 - abs(dist - PHOTON_SPHERE_RADIUS) * 10.0;
    glowRing = max(0.0, glowRing);
    glowRing = pow(glowRing, 2.0);
    
    // Color matches viscosity state
    vec3 glowColor = lerpHSL(COLOR_CERULEAN, COLOR_NEON, 1.0 - uViscosity);
    
    return glowColor * glowRing * 0.5;
}

// ═══════════════════════════════════════════════════════════════════
// STARFIELD BACKGROUND
// ═══════════════════════════════════════════════════════════════════

vec3 starfield(vec2 uv, float time) {
    vec3 stars = vec3(0.0);
    
    // Only render stars in high+ quality
    if (uQuality < 2) return stars;
    
    // Multiple star layers
    for (int i = 0; i < 3; i++) {
        float scale = 50.0 + float(i) * 30.0;
        vec2 grid = floor(uv * scale);
        vec2 gridUv = fract(uv * scale);
        
        // Random star position within cell
        float rand = fract(sin(dot(grid, vec2(127.1, 311.7))) * 43758.5453);
        vec2 starPos = vec2(fract(rand * 12.34), fract(rand * 56.78));
        
        float starDist = length(gridUv - starPos);
        float starSize = 0.02 + rand * 0.02;
        float star = smoothstep(starSize, 0.0, starDist);
        
        // Twinkle
        float twinkle = sin(time * (2.0 + rand * 3.0) + rand * TAU) * 0.3 + 0.7;
        
        stars += vec3(star * twinkle * (0.3 + rand * 0.7));
    }
    
    return stars * 0.3;
}

// ═══════════════════════════════════════════════════════════════════
// DISSOLVE EFFECT
// ═══════════════════════════════════════════════════════════════════

float dissolvePattern(vec2 uv, float progress) {
    if (progress < 0.001) return 1.0;
    if (progress > 0.999) return 0.0;
    
    // Noise-based dissolve
    float noise = fbm(uv * 4.0, 3);
    noise = noise * 0.5 + 0.5; // Remap to 0-1
    
    // Edge glow
    float edge = smoothstep(progress - 0.1, progress, noise) - smoothstep(progress, progress + 0.1, noise);
    
    // Main dissolve
    float dissolve = smoothstep(progress - 0.05, progress + 0.05, noise);
    
    return dissolve;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════

void main() {
    // Aspect ratio correction
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;
    
    vec2 center = vec2(0.5 * aspect, 0.5);
    
    // Apply gravitational lensing to background
    float lensMass = 0.02 * (1.0 + uViscosity * 0.5);
    vec2 lensedUv = gravitationalLens(uv, center, lensMass);
    
    // Start with void background
    vec3 color = COLOR_VOID;
    
    // Add starfield (lensed)
    color += starfield(lensedUv, uTime);
    
    // Add accretion disk
    vec3 disk = accretionDisk(uv, center, uTime);
    color += disk;
    
    // Add photon sphere glow
    color += photonSphereGlow(uv, center);
    
    // Apply event horizon (blackness)
    float horizon = eventHorizon(uv, center);
    color = mix(color, vec3(0.0), horizon);
    
    // Apply dissolve transition
    float dissolve = dissolvePattern(uv, uProgress);
    
    // Edge glow during dissolve
    float edgeGlow = 0.0;
    if (uProgress > 0.01 && uProgress < 0.99) {
        float noise = fbm(uv * 4.0, 3) * 0.5 + 0.5;
        edgeGlow = smoothstep(uProgress - 0.1, uProgress, noise) - smoothstep(uProgress, uProgress + 0.05, noise);
        edgeGlow *= 2.0;
    }
    color += COLOR_NEON * edgeGlow;
    
    // Final alpha based on dissolve
    float alpha = dissolve;
    
    // Vignette
    float vignette = 1.0 - length(vUv - 0.5) * 0.8;
    color *= vignette;
    
    gl_FragColor = vec4(color, alpha);
}
