/**
 * Network Particle Vertex Shader
 * 
 * GPU-driven particle animation for the variance network visualization.
 * Particles flow inward toward the singularity with turbulence based on viscosity.
 */

attribute float aPhase;
attribute float aLifetime;
attribute float aAge;
attribute float aSpeed;

uniform float uTime;
uniform float uViscosity;
uniform float uInwardPull;

varying float vPhase;
varying float vLifetime;
varying float vAge;
varying float vDistance;
varying float vSpeed;

// ═══════════════════════════════════════════════════════════════════
// NOISE (for GPU-side position updates)
// ═══════════════════════════════════════════════════════════════════

float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

vec3 noise3(float t) {
    return vec3(
        hash(t),
        hash(t + 100.0),
        hash(t + 200.0)
    ) * 2.0 - 1.0;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════

void main() {
    vPhase = aPhase;
    vLifetime = aLifetime;
    vAge = aAge;
    vSpeed = aSpeed;
    
    // Get instance position from instance matrix
    vec4 worldPos = instanceMatrix * vec4(position, 1.0);
    
    // Apply turbulence based on viscosity
    float turbulenceAmount = uViscosity * 0.1;
    vec3 turbulence = noise3(uTime * 2.0 + aPhase * 100.0) * turbulenceAmount;
    worldPos.xyz += turbulence;
    
    // Calculate distance from center
    vDistance = length(worldPos.xyz);
    
    // Transform to view space
    vec4 mvPosition = modelViewMatrix * worldPos;
    
    // Size attenuation based on age and distance
    float lifeFraction = aAge / aLifetime;
    float sizeFromLife = 1.0 - lifeFraction;
    float sizeFromDist = clamp(1.0 / vDistance, 0.2, 2.0);
    
    float baseSize = 3.0;
    float size = baseSize * sizeFromLife * sizeFromDist;
    
    // Add pulse based on phase
    float pulse = sin(uTime * 3.0 + aPhase) * 0.2 + 1.0;
    size *= pulse;
    
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
