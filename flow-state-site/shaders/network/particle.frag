/**
 * Network Particle Fragment Shader
 * 
 * Renders particles with soft edges and viscosity-based coloring.
 * Color transitions from Cerulean (laminar) to FreightRoll Red (turbulent).
 */

precision highp float;

uniform float uTime;
uniform float uViscosity;
uniform vec3 uColorLow;
uniform vec3 uColorHigh;

varying float vPhase;
varying float vLifetime;
varying float vAge;
varying float vDistance;
varying float vSpeed;

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const vec3 COLOR_NEON = vec3(0.0, 1.0, 0.533);
const float CORE_SIZE = 0.3;

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════

void main() {
    // Circular particle shape
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    // Discard outside circle
    if (dist > 0.5) discard;
    
    // Soft edge falloff
    float alpha = smoothstep(0.5, 0.2, dist);
    
    // Bright core
    float core = smoothstep(CORE_SIZE, 0.0, dist);
    
    // Fade out with age
    float lifeFraction = vAge / vLifetime;
    float lifeFade = 1.0 - lifeFraction;
    alpha *= lifeFade;
    
    // Color based on viscosity (lerp between low and high)
    vec3 color = mix(uColorLow, uColorHigh, uViscosity);
    
    // Add brightness to core
    color = mix(color, vec3(1.0), core * 0.5);
    
    // Pulse based on phase
    float pulse = sin(uTime * 2.0 + vPhase) * 0.2 + 0.8;
    color *= pulse;
    
    // Glow effect near singularity center
    float glowFactor = 1.0 / (vDistance * vDistance + 0.5);
    color += COLOR_NEON * glowFactor * 0.1 * lifeFade;
    
    // Higher opacity for core
    alpha = alpha * 0.7 + core * 0.3;
    
    gl_FragColor = vec4(color, alpha);
}
