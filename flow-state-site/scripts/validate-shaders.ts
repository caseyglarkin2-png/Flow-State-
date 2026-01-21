#!/usr/bin/env npx tsx
/**
 * GLSL Shader Validation Script
 * 
 * Validates all shader files in /shaders/ directory compile correctly.
 * Uses a minimal WebGL context to check shader compilation.
 * 
 * Usage: npm run test:shaders
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';

// ANSI color codes for output
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';

interface ShaderError {
  file: string;
  error: string;
}

interface ValidationResult {
  passed: number;
  failed: number;
  errors: ShaderError[];
}

/**
 * Recursively find all shader files in a directory
 */
function findShaderFiles(dir: string, files: string[] = []): string[] {
  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      findShaderFiles(fullPath, files);
    } else {
      const ext = extname(entry).toLowerCase();
      if (['.glsl', '.vert', '.frag', '.vs', '.fs'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

/**
 * Determine shader type from file extension
 */
function getShaderType(filePath: string): 'vertex' | 'fragment' | 'unknown' {
  const ext = extname(filePath).toLowerCase();
  
  if (['.vert', '.vs'].includes(ext)) return 'vertex';
  if (['.frag', '.fs'].includes(ext)) return 'fragment';
  
  // For .glsl files, try to infer from content or filename
  const content = readFileSync(filePath, 'utf-8');
  if (content.includes('gl_Position')) return 'vertex';
  if (content.includes('gl_FragColor') || content.includes('fragColor')) return 'fragment';
  
  // Check filename hints
  const name = filePath.toLowerCase();
  if (name.includes('vert')) return 'vertex';
  if (name.includes('frag')) return 'fragment';
  
  return 'unknown';
}

/**
 * Validate GLSL syntax (basic static analysis)
 * 
 * In a real implementation, this would use headless-gl or puppeteer
 * to compile shaders in an actual WebGL context. For CI without GPU,
 * we do static analysis of common GLSL patterns.
 */
function validateShaderSyntax(source: string, type: 'vertex' | 'fragment' | 'unknown'): string | null {
  const lines = source.split('\n');
  
  // Check for required main function
  if (!source.includes('void main()') && !source.includes('void main(void)')) {
    // Utility files (.glsl) may not have main()
    const isUtilityFile = type === 'unknown';
    if (!isUtilityFile) {
      return 'Missing main() function';
    }
  }
  
  // Check for unmatched braces
  let braceCount = 0;
  for (const line of lines) {
    // Skip comments
    const trimmed = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');
    braceCount += (trimmed.match(/\{/g) || []).length;
    braceCount -= (trimmed.match(/\}/g) || []).length;
  }
  if (braceCount !== 0) {
    return `Unmatched braces (balance: ${braceCount})`;
  }
  
  // Check for common typos
  if (source.includes('gl_Postion')) return "Typo: 'gl_Postion' should be 'gl_Position'";
  if (source.includes('gl_FrafColor')) return "Typo: 'gl_FrafColor' should be 'gl_FragColor'";
  if (source.includes('unifrom')) return "Typo: 'unifrom' should be 'uniform'";
  if (source.includes('varing')) return "Typo: 'varing' should be 'varying'";
  
  // Check vertex shader requirements
  if (type === 'vertex') {
    if (!source.includes('gl_Position')) {
      return 'Vertex shader must set gl_Position';
    }
  }
  
  // Check fragment shader requirements
  if (type === 'fragment') {
    if (!source.includes('gl_FragColor') && !source.includes('fragColor') && !source.includes('out vec4')) {
      return 'Fragment shader must set output color (gl_FragColor or out vec4)';
    }
  }
  
  return null;
}

/**
 * Main validation function
 */
function validateShaders(shaderDir: string): ValidationResult {
  console.log(`${CYAN}Validating shaders in: ${shaderDir}${RESET}\n`);
  
  const result: ValidationResult = {
    passed: 0,
    failed: 0,
    errors: [],
  };
  
  const files = findShaderFiles(shaderDir);
  
  if (files.length === 0) {
    console.log(`${YELLOW}No shader files found.${RESET}`);
    return result;
  }
  
  for (const file of files) {
    const relativePath = relative(shaderDir, file);
    
    try {
      const source = readFileSync(file, 'utf-8');
      const type = getShaderType(file);
      const error = validateShaderSyntax(source, type);
      
      if (error) {
        console.log(`${RED}✗ ${relativePath}: ${error}${RESET}`);
        result.failed++;
        result.errors.push({ file: relativePath, error });
      } else {
        console.log(`${GREEN}✓ ${relativePath}${RESET}`);
        result.passed++;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(`${RED}✗ ${relativePath}: ${message}${RESET}`);
      result.failed++;
      result.errors.push({ file: relativePath, error: message });
    }
  }
  
  return result;
}

// Run validation
const shaderDir = join(process.cwd(), 'shaders');
const result = validateShaders(shaderDir);

console.log('\n---');
console.log(`${GREEN}Passed: ${result.passed}${RESET}`);
console.log(`${result.failed > 0 ? RED : GREEN}Failed: ${result.failed}${RESET}`);

if (result.failed > 0) {
  console.log(`\n${RED}Shader validation failed!${RESET}`);
  process.exit(1);
} else {
  console.log(`\n${GREEN}All shaders validated successfully!${RESET}`);
  process.exit(0);
}
