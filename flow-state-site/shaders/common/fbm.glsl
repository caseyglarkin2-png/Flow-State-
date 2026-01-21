/**
 * GLSL Fractal Brownian Motion (FBM)
 * 
 * Layered noise for natural-looking effects.
 * Requires: noise.glsl (snoise2, snoise3)
 */

// ═══════════════════════════════════════════════════════════════════
// FBM 2D
// ═══════════════════════════════════════════════════════════════════

/**
 * 2D Fractal Brownian Motion
 * 
 * @param p Position
 * @param octaves Number of noise layers (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0)
 * @param gain Amplitude multiplier per octave (typically 0.5)
 */
float fbm2(vec2 p, int octaves, float lacunarity, float gain) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        value += amplitude * snoise2(p * frequency);
        frequency *= lacunarity;
        amplitude *= gain;
    }
    
    return value;
}

/**
 * Simplified 2D FBM with default parameters
 */
float fbm2Simple(vec2 p, int octaves) {
    return fbm2(p, octaves, 2.0, 0.5);
}

/**
 * 2D FBM with domain warping
 * Creates more organic, swirling patterns
 */
float fbm2Warped(vec2 p, int octaves) {
    vec2 q = vec2(
        fbm2Simple(p, octaves),
        fbm2Simple(p + vec2(5.2, 1.3), octaves)
    );
    
    vec2 r = vec2(
        fbm2Simple(p + 4.0 * q + vec2(1.7, 9.2), octaves),
        fbm2Simple(p + 4.0 * q + vec2(8.3, 2.8), octaves)
    );
    
    return fbm2Simple(p + 4.0 * r, octaves);
}

// ═══════════════════════════════════════════════════════════════════
// FBM 3D
// ═══════════════════════════════════════════════════════════════════

/**
 * 3D Fractal Brownian Motion
 */
float fbm3(vec3 p, int octaves, float lacunarity, float gain) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        value += amplitude * snoise3(p * frequency);
        frequency *= lacunarity;
        amplitude *= gain;
    }
    
    return value;
}

/**
 * Simplified 3D FBM with default parameters
 */
float fbm3Simple(vec3 p, int octaves) {
    return fbm3(p, octaves, 2.0, 0.5);
}

// ═══════════════════════════════════════════════════════════════════
// TURBULENCE
// ═══════════════════════════════════════════════════════════════════

/**
 * Turbulence (absolute value FBM)
 * Creates sharper, more chaotic patterns
 */
float turbulence2(vec2 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        value += amplitude * abs(snoise2(p * frequency));
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    
    return value;
}

float turbulence3(vec3 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        value += amplitude * abs(snoise3(p * frequency));
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    
    return value;
}

// ═══════════════════════════════════════════════════════════════════
// RIDGED NOISE
// ═══════════════════════════════════════════════════════════════════

/**
 * Ridged Multi-Fractal
 * Creates sharp ridges, good for terrain or energy effects
 */
float ridgedMF2(vec2 p, int octaves, float lacunarity, float gain) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    float weight = 1.0;
    
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        
        float signal = 1.0 - abs(snoise2(p * frequency));
        signal = signal * signal * weight;
        weight = clamp(signal * 2.0, 0.0, 1.0);
        
        value += signal * amplitude;
        frequency *= lacunarity;
        amplitude *= gain;
    }
    
    return value;
}

float ridgedMF3(vec3 p, int octaves, float lacunarity, float gain) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    float weight = 1.0;
    
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        
        float signal = 1.0 - abs(snoise3(p * frequency));
        signal = signal * signal * weight;
        weight = clamp(signal * 2.0, 0.0, 1.0);
        
        value += signal * amplitude;
        frequency *= lacunarity;
        amplitude *= gain;
    }
    
    return value;
}
