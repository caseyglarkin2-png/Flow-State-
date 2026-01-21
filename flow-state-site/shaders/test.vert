/**
 * Test vertex shader
 * 
 * Minimal passthrough vertex shader to validate the GLSL import pipeline.
 */

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
