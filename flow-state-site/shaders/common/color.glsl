/**
 * GLSL Color Utilities
 * 
 * Color space conversions and brand color constants.
 */

// ═══════════════════════════════════════════════════════════════════
// BRAND COLORS
// ═══════════════════════════════════════════════════════════════════

// Primary palette
const vec3 COLOR_NEON = vec3(0.0, 1.0, 0.533);        // #00FF88 - Success, flow state
const vec3 COLOR_VOID = vec3(0.051, 0.059, 0.071);    // #0D0F12 - Deep background
const vec3 COLOR_CARBON = vec3(0.098, 0.106, 0.118);  // #191B1E - Surface

// Variance Tax specific
const vec3 COLOR_FREIGHTROLL_RED = vec3(0.851, 0.078, 0.067);  // #D91411 - Turbulence
const vec3 COLOR_CERULEAN = vec3(0.02, 0.675, 0.922);          // #05ACEB - Laminar
const vec3 COLOR_EMBER = vec3(1.0, 0.408, 0.063);              // #FF6810 - Warning

// Neutral
const vec3 COLOR_EBONY_CLAY = vec3(0.137, 0.165, 0.208);  // #232A35 - Borders
const vec3 COLOR_SLATE = vec3(0.392, 0.431, 0.502);        // #646E80 - Text secondary

// ═══════════════════════════════════════════════════════════════════
// COLOR SPACE CONVERSIONS
// ═══════════════════════════════════════════════════════════════════

/**
 * Convert RGB to HSL
 * RGB input: 0-1 range
 * HSL output: H (0-1), S (0-1), L (0-1)
 */
vec3 rgb2hsl(vec3 c) {
    float maxC = max(c.r, max(c.g, c.b));
    float minC = min(c.r, min(c.g, c.b));
    float delta = maxC - minC;
    
    float l = (maxC + minC) * 0.5;
    
    if (delta < 0.00001) {
        return vec3(0.0, 0.0, l);
    }
    
    float s = l > 0.5 
        ? delta / (2.0 - maxC - minC)
        : delta / (maxC + minC);
    
    float h;
    if (c.r >= maxC) {
        h = (c.g - c.b) / delta + (c.g < c.b ? 6.0 : 0.0);
    } else if (c.g >= maxC) {
        h = (c.b - c.r) / delta + 2.0;
    } else {
        h = (c.r - c.g) / delta + 4.0;
    }
    h /= 6.0;
    
    return vec3(h, s, l);
}

/**
 * Helper for HSL to RGB conversion
 */
float hue2rgb(float p, float q, float t) {
    if (t < 0.0) t += 1.0;
    if (t > 1.0) t -= 1.0;
    if (t < 1.0/6.0) return p + (q - p) * 6.0 * t;
    if (t < 1.0/2.0) return q;
    if (t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
    return p;
}

/**
 * Convert HSL to RGB
 * HSL input: H (0-1), S (0-1), L (0-1)
 * RGB output: 0-1 range
 */
vec3 hsl2rgb(vec3 hsl) {
    if (hsl.y < 0.00001) {
        return vec3(hsl.z);
    }
    
    float q = hsl.z < 0.5 
        ? hsl.z * (1.0 + hsl.y) 
        : hsl.z + hsl.y - hsl.z * hsl.y;
    float p = 2.0 * hsl.z - q;
    
    float r = hue2rgb(p, q, hsl.x + 1.0/3.0);
    float g = hue2rgb(p, q, hsl.x);
    float b = hue2rgb(p, q, hsl.x - 1.0/3.0);
    
    return vec3(r, g, b);
}

/**
 * Convert RGB to HSV
 */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Convert HSV to RGB
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// ═══════════════════════════════════════════════════════════════════
// COLOR INTERPOLATION
// ═══════════════════════════════════════════════════════════════════

/**
 * Smooth color interpolation in HSL space
 * Better for perceptually uniform blending
 */
vec3 lerpColorHSL(vec3 a, vec3 b, float t) {
    vec3 hslA = rgb2hsl(a);
    vec3 hslB = rgb2hsl(b);
    
    // Handle hue wrap-around (take shortest path)
    float hueDiff = hslB.x - hslA.x;
    if (hueDiff > 0.5) hslB.x -= 1.0;
    if (hueDiff < -0.5) hslB.x += 1.0;
    
    vec3 hslResult = mix(hslA, hslB, t);
    hslResult.x = fract(hslResult.x); // Wrap hue to 0-1
    
    return hsl2rgb(hslResult);
}

/**
 * Simple RGB lerp (faster but less perceptually uniform)
 */
vec3 lerpColorRGB(vec3 a, vec3 b, float t) {
    return mix(a, b);
}

/**
 * Variance state color
 * Maps viscosity (0-1) to color gradient
 * 0 = Cerulean (laminar), 1 = FreightRoll Red (turbulent)
 */
vec3 varianceColor(float viscosity) {
    return lerpColorHSL(COLOR_CERULEAN, COLOR_FREIGHTROLL_RED, viscosity);
}

/**
 * Accretion disk color based on velocity/temperature
 * Fast regions are blue-white, slow regions are red
 */
vec3 accretionColor(float velocity) {
    vec3 cold = vec3(1.0, 0.2, 0.1);    // Red-orange
    vec3 warm = vec3(1.0, 0.7, 0.3);    // Yellow-orange
    vec3 hot = vec3(0.8, 0.9, 1.0);     // Blue-white
    
    if (velocity < 0.5) {
        return mix(cold, warm, velocity * 2.0);
    } else {
        return mix(warm, hot, (velocity - 0.5) * 2.0);
    }
}

// ═══════════════════════════════════════════════════════════════════
// COLOR EFFECTS
// ═══════════════════════════════════════════════════════════════════

/**
 * Add glow effect to color
 */
vec3 addGlow(vec3 color, float intensity) {
    return color + color * intensity;
}

/**
 * Darken edges (vignette)
 */
float vignette(vec2 uv, float radius, float softness) {
    float dist = length(uv - 0.5) * 2.0;
    return 1.0 - smoothstep(radius - softness, radius + softness, dist);
}

/**
 * Gamma correction
 */
vec3 gammaCorrect(vec3 color, float gamma) {
    return pow(color, vec3(1.0 / gamma));
}

/**
 * Apply contrast
 */
vec3 applyContrast(vec3 color, float contrast) {
    return (color - 0.5) * contrast + 0.5;
}

/**
 * Desaturate towards grayscale
 */
vec3 desaturate(vec3 color, float amount) {
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    return mix(color, vec3(gray), amount);
}
