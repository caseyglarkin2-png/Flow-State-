#!/usr/bin/env node

/**
 * Asset Budget Validator (T2-009)
 * Ensures SVG components stay under 30KB total
 */

import fs from 'fs';
import path from 'path';

interface FileMetrics {
  file: string;
  bytes: number;
  kb: number;
}

function getFileSize(filePath: string): number {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function getSvgContentFromTsx(filePath: string): string {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Extract SVG markup from TSX
  const svgMatch = content.match(/<svg[\s\S]*?<\/svg>/);
  return svgMatch ? svgMatch[0] : '';
}

const metrics: FileMetrics[] = [];
let totalBytes = 0;

// Check card components
const cardsDir = path.join(process.cwd(), 'components/cards');
if (fs.existsSync(cardsDir)) {
  fs.readdirSync(cardsDir).forEach((file) => {
    if (file.endsWith('.tsx')) {
      const filePath = path.join(cardsDir, file);
      const bytes = getFileSize(filePath);
      metrics.push({ file, bytes, kb: bytes / 1024 });
      totalBytes += bytes;
    }
  });
}

// Check icon components
const iconsDir = path.join(process.cwd(), 'components/icons');
if (fs.existsSync(iconsDir)) {
  fs.readdirSync(iconsDir).forEach((file) => {
    if (file.endsWith('.tsx') && file.includes('Icon')) {
      const filePath = path.join(iconsDir, file);
      const bytes = getFileSize(filePath);
      metrics.push({ file, bytes, kb: bytes / 1024 });
      totalBytes += bytes;
    }
  });
}

// Sort and display
metrics.sort((a, b) => b.bytes - a.bytes);

console.log('📊 Asset Budget Report');
console.log('=====================\n');

metrics.forEach((m) => {
  const status = m.bytes < 5000 ? '✅' : m.bytes < 10000 ? '⚠️ ' : '❌';
  console.log(`${status} ${m.file.padEnd(35)} ${m.kb.toFixed(2)} KB`);
});

console.log('\n-----');
const totalKb = (totalBytes / 1024).toFixed(2);
const status = totalBytes < 30720 ? '✅ PASS' : '❌ FAIL';
console.log(`${status} Total: ${totalKb} KB (budget: 30 KB)\n`);

process.exit(totalBytes < 30720 ? 0 : 1);
