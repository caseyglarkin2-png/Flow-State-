/**
 * Black Hole Vertex Shader
 * 
 * Simple passthrough for full-screen quad rendering.
 */

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
