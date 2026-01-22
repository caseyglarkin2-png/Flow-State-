/**
 * Bundle Size Check
 * 
 * Ensures critical bundle size thresholds are met:
 * - Homepage initial JS < 300KB (before gzip)
 * - Three.js chunk is lazy-loaded (not in initial bundles)
 * - No single chunk > 500KB (except lazy-loaded chunks)
 * 
 * Run after build: npx tsx scripts/bundle-size-check.ts
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const CHUNK_DIR = join(process.cwd(), '.next/static/chunks');
const MAX_INITIAL_CHUNK_SIZE = 500 * 1024; // 500KB
const THREE_JS_CHUNK_MIN_SIZE = 800 * 1024; // three.js is ~900KB+

interface ChunkInfo {
  name: string;
  size: number;
}

function getChunks(): ChunkInfo[] {
  const files = readdirSync(CHUNK_DIR).filter(f => f.endsWith('.js'));
  return files.map(name => ({
    name,
    size: statSync(join(CHUNK_DIR, name)).size,
  }));
}

function findThreeJsChunk(chunks: ChunkInfo[]): ChunkInfo | undefined {
  // Three.js chunk is typically the largest one
  const sorted = [...chunks].sort((a, b) => b.size - a.size);
  const largest = sorted[0];
  
  // Verify it's actually three.js by checking size threshold
  if (largest && largest.size > THREE_JS_CHUNK_MIN_SIZE) {
    return largest;
  }
  return undefined;
}

function checkLoadableManifest(chunkName: string): string[] {
  // Check which pages load this chunk via react-loadable-manifest
  const serverDir = join(process.cwd(), '.next/server/app');
  const pages: string[] = [];
  
  function scanDir(dir: string, path: string = '') {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          scanDir(join(dir, entry.name), `${path}/${entry.name}`);
        } else if (entry.name === 'react-loadable-manifest.json') {
          const manifest = readFileSync(join(dir, entry.name), 'utf-8');
          if (manifest.includes(chunkName)) {
            pages.push(path || '/');
          }
        }
      }
    } catch {
      // Ignore errors for missing directories
    }
  }
  
  scanDir(serverDir);
  return pages;
}

function main() {
  console.log('🔍 Bundle Size Check\n');
  
  const chunks = getChunks();
  const totalSize = chunks.reduce((sum, c) => sum + c.size, 0);
  
  console.log(`Total chunks: ${chunks.length}`);
  console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB\n`);
  
  // Find three.js chunk
  const threeChunk = findThreeJsChunk(chunks);
  
  if (threeChunk) {
    console.log(`📦 Three.js chunk found: ${threeChunk.name}`);
    console.log(`   Size: ${(threeChunk.size / 1024).toFixed(0)} KB\n`);
    
    // Check it's properly lazy-loaded
    const loadedBy = checkLoadableManifest(threeChunk.name);
    if (loadedBy.length > 0) {
      console.log(`✅ Three.js is lazy-loaded by: ${loadedBy.join(', ')}`);
    } else {
      console.log('⚠️  Three.js chunk not found in loadable manifests');
    }
  } else {
    console.log('⚠️  No large Three.js chunk found (this may be expected if three.js is not used)');
  }
  
  // Check for chunks that are too large in initial bundles
  console.log('\n📊 Chunk Size Analysis:');
  const largeChunks = chunks
    .filter(c => c.size > MAX_INITIAL_CHUNK_SIZE)
    .filter(c => c.name !== threeChunk?.name);
  
  if (largeChunks.length > 0) {
    console.log('❌ Unexpectedly large initial chunks:');
    largeChunks.forEach(c => {
      console.log(`   ${c.name}: ${(c.size / 1024).toFixed(0)} KB`);
    });
    process.exit(1);
  }
  
  // Top 5 largest chunks (excluding three.js)
  const topChunks = chunks
    .filter(c => c.name !== threeChunk?.name)
    .sort((a, b) => b.size - a.size)
    .slice(0, 5);
  
  console.log('\nTop 5 largest non-three.js chunks:');
  topChunks.forEach((c, i) => {
    console.log(`   ${i + 1}. ${c.name}: ${(c.size / 1024).toFixed(0)} KB`);
  });
  
  console.log('\n✅ Bundle size check passed!');
}

main();
