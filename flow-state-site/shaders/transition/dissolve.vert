/**
 * Dissolve Transition Vertex Shader
 * 
 * Passthrough vertex shader for full-screen quad transition effect.
 */

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
