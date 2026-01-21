/**
 * Test fragment shader
 * 
 * Minimal gradient shader to validate the GLSL import pipeline.
 */

uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;

void main() {
  // Simple animated gradient
  float gradient = 0.5 + 0.5 * sin(uTime + vUv.x * 3.14159);
  vec3 color = uColor * gradient;
  gl_FragColor = vec4(color, 1.0);
}
