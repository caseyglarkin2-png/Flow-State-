/**
 * Dissolve Transition Fragment Shader
 * 
 * Noise-based dissolve effect that transitions from singularity to clarity.
 * Uses layered noise for organic edge patterns and brand-colored glow.
 * 
 * Uniforms:
 *   uProgress   - Dissolve progress (0 = solid, 1 = fully dissolved)
 *   uTime       - Animation time for edge shimmer
 *   uDirection  - Dissolve direction (1 = outward, -1 = inward)
 *   uColor      - Edge glow color
 *   uNoiseScale - Scale of dissolve noise pattern
 */

precision highp float;

uniform float uProgress;
uniform float uTime;
uniform float uDirection;
uniform vec3 uColor;
uniform float uNoiseScale;
uniform sampler2D uTexture;

varying vec2 vUv;

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const float EDGE_WIDTH = 0.08;
const float GLOW_INTENSITY = 2.0;

// Brand colors
const vec3 COLOR_NEON = vec3(0.0, 1.0, 0.533);
const vec3 COLOR_CERULEAN = vec3(0.02, 0.675, 0.922);

// ═══════════════════════════════════════════════════════════════════
// NOISE FUNCTIONS
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
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, 
                        -0.577350269189626, 0.024390243902439);
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
// DISSOLVE PATTERN
// ═══════════════════════════════════════════════════════════════════

float getDissolveNoise(vec2 uv) {
    // Multi-layered noise for organic edge
    float noise1 = fbm(uv * uNoiseScale, 4);
    float noise2 = fbm(uv * uNoiseScale * 2.0 + 100.0, 3);
    
    // Combine layers
    float noise = noise1 * 0.7 + noise2 * 0.3;
    
    // Remap to 0-1
    return noise * 0.5 + 0.5;
}

float getRadialFactor(vec2 uv) {
    // Distance from center for radial dissolve
    vec2 center = vec2(0.5);
    float dist = length(uv - center) * 2.0;
    return dist;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════

void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Get dissolve pattern
    float noise = getDissolveNoise(vUv);
    
    // Add radial component if dissolving outward/inward
    float radial = getRadialFactor(vUv);
    float pattern = mix(noise, radial * 0.5 + noise * 0.5, 0.3);
    
    // Invert pattern based on direction
    if (uDirection < 0.0) {
        pattern = 1.0 - pattern;
    }
    
    // Calculate alpha based on progress
    float dissolve = smoothstep(uProgress - 0.02, uProgress + 0.02, pattern);
    
    // Edge detection for glow
    float edge = 0.0;
    if (uProgress > 0.01 && uProgress < 0.99) {
        edge = smoothstep(uProgress - EDGE_WIDTH, uProgress, pattern) 
             - smoothstep(uProgress, uProgress + EDGE_WIDTH * 0.5, pattern);
    }
    
    // Animated edge shimmer
    float shimmer = sin(uTime * 10.0 + pattern * 20.0) * 0.5 + 0.5;
    edge *= (0.7 + shimmer * 0.3);
    
    // Blend edge color
    vec3 edgeColor = mix(COLOR_CERULEAN, COLOR_NEON, shimmer);
    edgeColor = mix(edgeColor, uColor, 0.5);
    
    // Final color with edge glow
    vec3 finalColor = texColor.rgb + edgeColor * edge * GLOW_INTENSITY;
    float finalAlpha = texColor.a * dissolve;
    
    gl_FragColor = vec4(finalColor, finalAlpha);
}
