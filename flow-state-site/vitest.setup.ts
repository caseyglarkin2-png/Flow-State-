/**
 * Vitest Setup File
 * 
 * Configures test environment with WebGL mocks for Three.js/R3F testing.
 */

import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock WebGL context for Three.js
const mockWebGLContext = {
  getExtension: vi.fn(() => null),
  getParameter: vi.fn(() => 0),
  getShaderPrecisionFormat: vi.fn(() => ({ precision: 23, rangeMin: 127, rangeMax: 127 })),
  createShader: vi.fn(() => ({})),
  shaderSource: vi.fn(),
  compileShader: vi.fn(),
  getShaderParameter: vi.fn(() => true),
  getShaderInfoLog: vi.fn(() => ''),
  createProgram: vi.fn(() => ({})),
  attachShader: vi.fn(),
  linkProgram: vi.fn(),
  getProgramParameter: vi.fn(() => true),
  getProgramInfoLog: vi.fn(() => ''),
  useProgram: vi.fn(),
  createBuffer: vi.fn(() => ({})),
  bindBuffer: vi.fn(),
  bufferData: vi.fn(),
  createTexture: vi.fn(() => ({})),
  bindTexture: vi.fn(),
  texImage2D: vi.fn(),
  texParameteri: vi.fn(),
  viewport: vi.fn(),
  clearColor: vi.fn(),
  clear: vi.fn(),
  enable: vi.fn(),
  disable: vi.fn(),
  blendFunc: vi.fn(),
  depthFunc: vi.fn(),
  cullFace: vi.fn(),
  frontFace: vi.fn(),
  activeTexture: vi.fn(),
  generateMipmap: vi.fn(),
  pixelStorei: vi.fn(),
  uniformMatrix4fv: vi.fn(),
  uniform1f: vi.fn(),
  uniform2fv: vi.fn(),
  uniform3fv: vi.fn(),
  uniform4fv: vi.fn(),
  uniform1i: vi.fn(),
  getUniformLocation: vi.fn(() => ({})),
  getAttribLocation: vi.fn(() => 0),
  enableVertexAttribArray: vi.fn(),
  vertexAttribPointer: vi.fn(),
  drawArrays: vi.fn(),
  drawElements: vi.fn(),
  createFramebuffer: vi.fn(() => ({})),
  bindFramebuffer: vi.fn(),
  framebufferTexture2D: vi.fn(),
  checkFramebufferStatus: vi.fn(() => 36053), // FRAMEBUFFER_COMPLETE
  createRenderbuffer: vi.fn(() => ({})),
  bindRenderbuffer: vi.fn(),
  renderbufferStorage: vi.fn(),
  framebufferRenderbuffer: vi.fn(),
  deleteShader: vi.fn(),
  deleteProgram: vi.fn(),
  deleteBuffer: vi.fn(),
  deleteTexture: vi.fn(),
  deleteFramebuffer: vi.fn(),
  deleteRenderbuffer: vi.fn(),
  isContextLost: vi.fn(() => false),
};

// Mock canvas getContext for WebGL
HTMLCanvasElement.prototype.getContext = vi.fn((contextType: string) => {
  if (contextType === 'webgl' || contextType === 'webgl2') {
    return mockWebGLContext;
  }
  return null;
}) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((callback) => {
  return setTimeout(callback, 16) as unknown as number;
});

global.cancelAnimationFrame = vi.fn((id) => {
  clearTimeout(id);
});

// Mock matchMedia
global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock ResizeObserver for component tests
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

// Suppress console.warn for specific Three.js warnings in tests
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  const msg = args[0];
  if (typeof msg === 'string' && msg.includes('THREE')) {
    return; // Suppress Three.js warnings in tests
  }
  originalWarn.apply(console, args);
};
