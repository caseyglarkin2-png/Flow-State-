/**
 * TypeScript declarations for GLSL shader file imports
 * 
 * These declarations allow importing .glsl, .vert, .frag, .vs, .fs files
 * as raw strings for use with Three.js ShaderMaterial.
 */

declare module '*.glsl' {
  const content: string;
  export default content;
}

declare module '*.vert' {
  const content: string;
  export default content;
}

declare module '*.frag' {
  const content: string;
  export default content;
}

declare module '*.vs' {
  const content: string;
  export default content;
}

declare module '*.fs' {
  const content: string;
  export default content;
}
